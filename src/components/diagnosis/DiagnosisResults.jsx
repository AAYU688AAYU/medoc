import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
    CheckCircle, 
    AlertTriangle, 
    AlertCircle, 
    Eye, 
    FileText, 
    Stethoscope,
    Download,
    RefreshCw
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const getSeverityColor = (severity) => {
    switch (severity) {
        case "mild": return "bg-green-100 text-green-800 border-green-200";
        case "moderate": return "bg-yellow-100 text-yellow-800 border-yellow-200";
        case "severe": return "bg-orange-100 text-orange-800 border-orange-200";
        case "critical": return "bg-red-100 text-red-800 border-red-200";
        default: return "bg-slate-100 text-slate-800 border-slate-200";
    }
};

const getSeverityIcon = (severity) => {
    switch (severity) {
        case "mild": return <CheckCircle className="w-5 h-5 text-green-600" />;
        case "moderate": return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
        case "severe": return <AlertCircle className="w-5 h-5 text-orange-600" />;
        case "critical": return <AlertCircle className="w-5 h-5 text-red-600" />;
        default: return <Eye className="w-5 h-5 text-slate-600" />;
    }
};

export default function DiagnosisResults({ result, imageUrl, onNewDiagnosis }) {
    return (
        <div className="space-y-6">
            {/* Header */}
            <Card className="shadow-xl border-0 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
                <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Eye className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Diagnosis Complete</CardTitle>
                    <p className="text-blue-100">AI Analysis Results for {result.patient_name}</p>
                </CardHeader>
            </Card>

            {/* Main Results */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Image */}
                <Card className="shadow-lg border-0">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-slate-900">Analyzed Image</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <img 
                            src={imageUrl} 
                            alt="Fundus Analysis" 
                            className="w-full rounded-lg shadow-md"
                        />
                    </CardContent>
                </Card>

                {/* Results Overview */}
                <Card className="shadow-lg border-0">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-slate-900">Analysis Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="font-medium text-slate-700">Confidence Level:</span>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                {Math.round(result.confidence_score || 85)}%
                            </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <span className="font-medium text-slate-700">Severity Level:</span>
                            <Badge className={getSeverityColor(result.severity)}>
                                {getSeverityIcon(result.severity)}
                                <span className="ml-1 capitalize">{result.severity}</span>
                            </Badge>
                        </div>

                        <div>
                            <span className="font-medium text-slate-700 block mb-2">Detected Conditions:</span>
                            <div className="flex flex-wrap gap-2">
                                {result.detected_conditions?.map((condition, index) => (
                                    <Badge key={index} variant="secondary" className="bg-slate-100 text-slate-700">
                                        {condition}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Detailed Findings */}
            <Card className="shadow-lg border-0">
                <CardHeader>
                    <CardTitle className="text-lg font-bold text-slate-900">Detailed Diagnosis</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="prose max-w-none">
                        <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                            {result.diagnosis}
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="shadow-lg border-0">
                <CardHeader>
                    <CardTitle className="text-lg font-bold text-slate-900">Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="prose max-w-none">
                        <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                            {result.recommendations}
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Next Steps */}
            {result.detailed_findings && (
                <Card className="shadow-lg border-0">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-slate-900">Detailed Findings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="prose max-w-none">
                            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                                {result.detailed_findings}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Doctor Review Alert */}
            {result.doctor_review_required && (
                <Alert className="bg-amber-50 border-amber-200">
                    <Stethoscope className="h-4 w-4 text-amber-600" />
                    <AlertDescription className="text-amber-800">
                        <strong>Doctor Review Recommended:</strong> Based on the AI analysis, we recommend 
                        consulting with a qualified ophthalmologist for further evaluation and treatment planning.
                    </AlertDescription>
                </Alert>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={createPageUrl("Doctors")}>
                    <Button className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white">
                        <Stethoscope className="w-4 h-4 mr-2" />
                        Find Doctor
                    </Button>
                </Link>
                
                <Link to={createPageUrl("Reports")}>
                    <Button variant="outline" className="border-2 border-slate-300 hover:border-blue-300">
                        <FileText className="w-4 h-4 mr-2" />
                        View All Reports
                    </Button>
                </Link>
                
                <Button 
                    onClick={onNewDiagnosis}
                    variant="outline" 
                    className="border-2 border-slate-300 hover:border-slate-400"
                >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    New Diagnosis
                </Button>
            </div>
        </div>
    );
}