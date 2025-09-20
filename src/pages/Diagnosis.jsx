import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { 
    Upload, 
    Camera, 
    FileText, 
    Eye, 
    AlertCircle, 
    CheckCircle, 
    Loader2,
    User,
    Phone,
    Calendar
} from "lucide-react";
import { Patient } from "@/api/entities";
import { DiagnosisReport } from "@/api/entities";
import { UploadFile, InvokeLLM } from "@/api/integrations";
import { User as UserEntity } from "@/api/entities";

import ImageUpload from "../components/diagnosis/ImageUpload";
import PatientForm from "../components/diagnosis/PatientForm";
import DiagnosisResults from "../components/diagnosis/DiagnosisResults";

export default function Diagnosis() {
    const [currentStep, setCurrentStep] = useState(1);
    const [patientData, setPatientData] = useState({});
    const [uploadedImage, setUploadedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisProgress, setAnalysisProgress] = useState(0);
    const [diagnosisResult, setDiagnosisResult] = useState(null);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    React.useEffect(() => {
        const loadUser = async () => {
            try {
                const currentUser = await UserEntity.me();
                setUser(currentUser);
            } catch (error) {
                // User not authenticated - they can still use the platform
            }
        };
        loadUser();
    }, []);

    const handlePatientSubmit = (data) => {
        setPatientData(data);
        setCurrentStep(2);
        setError(null);
    };

    const handleImageUpload = async (file) => {
        try {
            setError(null);
            const { file_url } = await UploadFile({ file });
            setUploadedImage(file);
            setImageUrl(file_url);
            setCurrentStep(3);
        } catch (error) {
            setError("Failed to upload image. Please try again.");
        }
    };

    const performDiagnosis = async () => {
        if (!imageUrl) return;

        setIsAnalyzing(true);
        setAnalysisProgress(0);
        setError(null);

        const progressInterval = setInterval(() => {
            setAnalysisProgress(prev => Math.min(prev + 10, 90));
        }, 200);

        try {
            // Create patient record
            const patient = await Patient.create(patientData);

            // Analyze image with AI
            const prompt = `
            You are an expert ophthalmologist analyzing a fundus camera image for retinal disorders. 
            Please analyze this retinal image and provide a detailed medical assessment focusing on:

            1. Detection of Age-related Macular Edema (AME)
            2. Detection of Diabetic Macular Edema (DME) 
            3. Other macular and retinal disorders
            4. Severity assessment
            5. Clinical recommendations

            Patient Information:
            - Name: ${patientData.full_name}
            - Age: ${patientData.age}
            - Medical History: ${patientData.medical_history || 'None provided'}
            - Symptoms: ${patientData.symptoms || 'None provided'}

            Please provide your analysis in a professional medical format.
            `;

            const result = await InvokeLLM({
                prompt,
                file_urls: [imageUrl],
                response_json_schema: {
                    type: "object",
                    properties: {
                        diagnosis: { type: "string" },
                        detected_conditions: {
                            type: "array",
                            items: { type: "string" }
                        },
                        severity: {
                            type: "string",
                            enum: ["mild", "moderate", "severe", "critical"]
                        },
                        confidence_score: { type: "number" },
                        recommendations: { type: "string" },
                        doctor_review_required: { type: "boolean" },
                        detailed_findings: { type: "string" },
                        next_steps: { type: "string" }
                    }
                }
            });

            clearInterval(progressInterval);
            setAnalysisProgress(100);

            // Save diagnosis report
            const report = await DiagnosisReport.create({
                patient_id: patient.id,
                fundus_image_url: imageUrl,
                diagnosis: result.diagnosis,
                confidence_score: result.confidence_score,
                detected_conditions: result.detected_conditions,
                severity: result.severity,
                recommendations: result.recommendations,
                doctor_review_required: result.doctor_review_required
            });

            setDiagnosisResult({
                ...result,
                patient_name: patientData.full_name,
                report_id: report.id
            });

            setCurrentStep(4);

        } catch (error) {
            clearInterval(progressInterval);
            setError("Failed to analyze image. Please try again.");
            console.error("Diagnosis error:", error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const resetDiagnosis = () => {
        setCurrentStep(1);
        setPatientData({});
        setUploadedImage(null);
        setImageUrl(null);
        setDiagnosisResult(null);
        setError(null);
        setAnalysisProgress(0);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-blue-100/80 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <Eye className="w-4 h-4" />
                        AI-Powered Diagnosis
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                        Retinal Disease Diagnosis
                    </h1>
                    <p className="text-lg text-slate-600">
                        Upload a fundus image for instant AI analysis of retinal conditions
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="flex justify-center mb-8">
                    <div className="flex items-center space-x-4">
                        {[1, 2, 3, 4].map((step) => (
                            <React.Fragment key={step}>
                                <div className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold transition-all duration-200 ${
                                    currentStep >= step 
                                        ? 'bg-blue-600 text-white shadow-lg' 
                                        : 'bg-slate-200 text-slate-500'
                                }`}>
                                    {step}
                                </div>
                                {step < 4 && (
                                    <div className={`w-12 h-0.5 transition-colors duration-200 ${
                                        currentStep > step ? 'bg-blue-600' : 'bg-slate-200'
                                    }`} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {error && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {/* Step Content */}
                {currentStep === 1 && (
                    <PatientForm onSubmit={handlePatientSubmit} />
                )}

                {currentStep === 2 && (
                    <ImageUpload onImageUpload={handleImageUpload} />
                )}

                {currentStep === 3 && (
                    <Card className="shadow-xl border-0">
                        <CardHeader>
                            <CardTitle className="text-center text-xl font-bold text-slate-900">
                                Ready to Analyze
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="text-center">
                                <img 
                                    src={imageUrl} 
                                    alt="Fundus" 
                                    className="max-w-md mx-auto rounded-lg shadow-lg"
                                />
                                <p className="text-slate-600 mt-4">
                                    Patient: <span className="font-semibold">{patientData.full_name}</span>
                                </p>
                            </div>

                            {isAnalyzing && (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-blue-600">
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span className="font-medium">Analyzing retinal image...</span>
                                    </div>
                                    <Progress value={analysisProgress} className="h-2" />
                                    <p className="text-sm text-slate-600 text-center">
                                        AI is examining the fundus image for signs of retinal disorders
                                    </p>
                                </div>
                            )}

                            <div className="flex justify-center gap-4">
                                <Button 
                                    variant="outline" 
                                    onClick={() => setCurrentStep(2)}
                                    disabled={isAnalyzing}
                                >
                                    Change Image
                                </Button>
                                <Button 
                                    onClick={performDiagnosis}
                                    disabled={isAnalyzing}
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    {isAnalyzing ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Analyzing...
                                        </>
                                    ) : (
                                        <>
                                            <Eye className="w-4 h-4 mr-2" />
                                            Start Analysis
                                        </>
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {currentStep === 4 && diagnosisResult && (
                    <DiagnosisResults 
                        result={diagnosisResult}
                        imageUrl={imageUrl}
                        onNewDiagnosis={resetDiagnosis}
                    />
                )}
            </div>
        </div>
    );
}