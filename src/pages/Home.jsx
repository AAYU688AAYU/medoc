import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
    Eye, 
    Brain, 
    Shield, 
    Zap, 
    ArrowRight, 
    Upload,
    FileText,
    Stethoscope,
    CheckCircle,
    Star
} from "lucide-react";

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-teal-600/10"></div>
                <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-blue-100/80 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
                            <Brain className="w-4 h-4" />
                            AI-Powered Medical Diagnostics
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                            Advanced <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Retinal Disease</span> Detection
                        </h1>
                        <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-3xl mx-auto">
                            Revolutionizing eye care with cutting-edge AI technology. Detect AME, DME, and macular disorders 
                            instantly using fundus camera images with clinical-grade accuracy.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to={createPageUrl("Diagnosis")}>
                                <Button className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                                    <Upload className="w-5 h-5 mr-2" />
                                    Start Diagnosis
                                </Button>
                            </Link>
                            <Link to={createPageUrl("About")}>
                                <Button variant="outline" className="border-2 border-slate-300 hover:border-blue-300 px-8 py-3 text-lg font-semibold">
                                    Learn More
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            Why Choose RetinAI?
                        </h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Our advanced AI platform combines medical expertise with cutting-edge technology
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                            <CardHeader>
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <Brain className="w-6 h-6 text-white" />
                                </div>
                                <CardTitle className="text-xl font-bold text-slate-900">AI-Powered Analysis</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-600 leading-relaxed">
                                    Advanced machine learning algorithms trained on thousands of fundus images 
                                    for precise diagnosis of retinal conditions.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                            <CardHeader>
                                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <Zap className="w-6 h-6 text-white" />
                                </div>
                                <CardTitle className="text-xl font-bold text-slate-900">Instant Results</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-600 leading-relaxed">
                                    Get comprehensive diagnostic reports in seconds, not days. 
                                    Immediate analysis of AME, DME, and macular disorders.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                            <CardHeader>
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <Shield className="w-6 h-6 text-white" />
                                </div>
                                <CardTitle className="text-xl font-bold text-slate-900">Clinical Grade</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-600 leading-relaxed">
                                    HIPAA-compliant platform with medical-grade security. 
                                    Trusted by healthcare professionals worldwide.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            Simple 3-Step Process
                        </h2>
                        <p className="text-xl text-slate-600">
                            From upload to diagnosis in minutes
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Connection lines for desktop */}
                        <div className="hidden md:block absolute top-24 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-blue-200 to-teal-200"></div>

                        <div className="text-center group">
                            <div className="relative">
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <Upload className="w-8 h-8 text-white" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Upload Image</h3>
                            <p className="text-slate-600">
                                Upload your fundus camera image securely to our platform
                            </p>
                        </div>

                        <div className="text-center group">
                            <div className="relative">
                                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <Eye className="w-8 h-8 text-white" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">AI Analysis</h3>
                            <p className="text-slate-600">
                                Our AI analyzes the image for signs of retinal disorders
                            </p>
                        </div>

                        <div className="text-center group">
                            <div className="relative">
                                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <FileText className="w-8 h-8 text-white" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Get Results</h3>
                            <p className="text-slate-600">
                                Receive detailed diagnostic report and recommendations
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to Transform Eye Care?
                    </h2>
                    <p className="text-xl mb-8 text-blue-100">
                        Join thousands of healthcare professionals using RetinAI for accurate retinal diagnosis
                    </p>
                    <Link to={createPageUrl("Diagnosis")}>
                        <Button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                            Start Free Diagnosis
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}