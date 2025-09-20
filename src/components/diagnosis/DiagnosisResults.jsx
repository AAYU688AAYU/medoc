
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
    CheckCircle, 
    AlertTriangle, 
    AlertCircle, 
    Eye, 
    FileText, 
    Stethoscope,
    Download,
    RefreshCw,
    BarChart3,
    Activity,
    TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";

import AnalysisCharts from "./AnalysisCharts";
import PDFReport from "./PDFReport";

const getSeverityColor = (severity) => {
    switch (severity) {
        case "mild": return "bg-cyan-100 text-cyan-800 border-cyan-200";
        case "moderate": return "bg-blue-100 text-blue-800 border-blue-200";
        case "severe": return "bg-indigo-100 text-indigo-800 border-indigo-200";
        case "critical": return "bg-red-100 text-red-800 border-red-200";
        default: return "bg-slate-100 text-slate-800 border-slate-200";
    }
};

const getSeverityIcon = (severity) => {
    switch (severity) {
        case "mild": return <CheckCircle className="w-5 h-5 text-cyan-600" />;
        case "moderate": return <AlertTriangle className="w-5 h-5 text-blue-600" />;
        case "severe": return <AlertCircle className="w-5 h-5 text-indigo-600" />;
        case "critical": return <AlertCircle className="w-5 h-5 text-red-600" />;
        default: return <Eye className="w-5 h-5 text-slate-600" />;
    }
};

export default function DiagnosisResults({ result, imageUrl, onNewDiagnosis, patientData }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
        >
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <Card className="shadow-xl border-0 bg-gradient-to-r from-blue-600 via-teal-600 to-indigo-600 text-white overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-teal-600/80"></div>
                    <CardHeader className="relative text-center pb-6">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <Eye className="w-10 h-10 text-white" />
                        </div>
                        <CardTitle className="text-3xl font-bold mb-2">Diagnosis Complete</CardTitle>
                        <p className="text-blue-100 text-lg">AI Analysis Results for {result.patient_name}</p>
                        <div className="mt-4 flex justify-center gap-4">
                            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                <span className="text-sm font-medium">Report ID: {result.report_id}</span>
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                <span className="text-sm font-medium">{new Date().toLocaleDateString()}</span>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
            </motion.div>

            {/* Tabs for different views */}
            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm shadow-lg">
                    <TabsTrigger value="overview" className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        Overview
                    </TabsTrigger>
                    <TabsTrigger value="analytics" className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        Analytics
                    </TabsTrigger>
                    <TabsTrigger value="detailed" className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Detailed Report
                    </TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Card className="shadow-xl border-0 overflow-hidden">
                                <CardHeader>
                                    <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                        <Activity className="w-5 h-5 text-blue-600" />
                                        Analyzed Fundus Image
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="relative group">
                                        <img 
                                            src={imageUrl} 
                                            alt="Fundus Analysis" 
                                            className="w-full h-auto rounded-b-lg shadow-md transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Results Overview */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <Card className="shadow-xl border-0 bg-gradient-to-br from-slate-50 to-blue-50">
                                <CardHeader>
                                    <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5 text-teal-600" />
                                        Quick Analysis Summary
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                                            <div className="text-3xl font-bold text-blue-600 mb-1">
                                                {Math.round(result.confidence_score || 85)}%
                                            </div>
                                            <div className="text-sm text-slate-600">Confidence</div>
                                        </div>
                                        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                                            <Badge className={`text-lg px-3 py-1 ${getSeverityColor(result.severity)}`}>
                                                {getSeverityIcon(result.severity)}
                                                <span className="ml-2 capitalize">{result.severity}</span>
                                            </Badge>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-slate-700 mb-3">Detected Conditions:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {result.detected_conditions?.map((condition, index) => (
                                                <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-700 px-3 py-1">
                                                    {condition}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <PDFReport 
                                            result={result} 
                                            patientData={patientData} 
                                            imageUrl={imageUrl} 
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Quick Diagnosis */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Card className="shadow-xl border-0 bg-gradient-to-r from-blue-50 to-indigo-50">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold text-slate-900">AI Diagnosis Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="prose max-w-none text-slate-700 leading-relaxed">
                                    {result.diagnosis?.split('\n').slice(0, 3).map((paragraph, index) => (
                                        <p key={index} className="mb-3">{paragraph}</p>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </TabsContent>

                {/* Analytics Tab */}
                <TabsContent value="analytics" className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <AnalysisCharts result={{...result, age: patientData?.age}} />
                    </motion.div>
                </TabsContent>

                {/* Detailed Report Tab */}
                <TabsContent value="detailed" className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        {/* Full Diagnosis */}
                        <Card className="shadow-lg border-0">
                            <CardHeader>
                                <CardTitle className="text-lg font-bold text-slate-900">Complete AI Analysis</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="prose max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap">
                                    {result.diagnosis}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recommendations */}
                        <Card className="shadow-lg border-0 bg-gradient-to-br from-teal-50 to-cyan-50">
                            <CardHeader>
                                <CardTitle className="text-lg font-bold text-slate-900">Clinical Recommendations</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="prose max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap">
                                    {result.recommendations}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Detailed Findings */}
                        {result.detailed_findings && (
                            <Card className="shadow-lg border-0">
                                <CardHeader>
                                    <CardTitle className="text-lg font-bold text-slate-900">Detailed Clinical Findings</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="prose max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap">
                                        {result.detailed_findings}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </motion.div>
                </TabsContent>
            </Tabs>

            {/* Doctor Review Alert */}
            {result.doctor_review_required && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <Alert className="bg-blue-50 border-blue-200 shadow-lg">
                        <Stethoscope className="h-5 w-5 text-blue-600" />
                        <AlertDescription className="text-blue-800 text-base">
                            <strong>Professional Review Recommended:</strong> Based on the AI analysis, we recommend 
                            consulting with a qualified ophthalmologist for comprehensive evaluation and personalized treatment planning.
                        </AlertDescription>
                    </Alert>
                </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center pt-6"
            >
                <Link to={createPageUrl("Doctors")}>
                    <Button className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-200">
                        <Stethoscope className="w-4 h-4 mr-2" />
                        Find Specialist
                    </Button>
                </Link>
                
                <Link to={createPageUrl("Reports")}>
                    <Button variant="outline" className="border-2 border-slate-300 hover:border-blue-300 px-6 py-3 shadow-md hover:shadow-lg transition-all duration-200">
                        <FileText className="w-4 h-4 mr-2" />
                        View All Reports
                    </Button>
                </Link>
                
                <Button 
                    onClick={onNewDiagnosis}
                    variant="outline" 
                    className="border-2 border-slate-300 hover:border-slate-400 px-6 py-3 shadow-md hover:shadow-lg transition-all duration-200"
                >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    New Analysis
                </Button>
            </motion.div>
        </motion.div>
    );
}
