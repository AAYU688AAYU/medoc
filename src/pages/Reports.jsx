
import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
    FileText, 
    Search, 
    Filter, 
    Eye,
    Calendar,
    User,
    Download,
    ArrowRight,
    BarChart3,
    TrendingUp,
    Clock,
    AlertTriangle
} from "lucide-react";
import { DiagnosisReport } from "@/api/entities";
import { Patient } from "@/api/entities";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";

const getSeverityColor = (severity) => {
    switch (severity) {
        case "mild": return "bg-cyan-100 text-cyan-800";
        case "moderate": return "bg-blue-100 text-blue-800";
        case "severe": return "bg-indigo-100 text-indigo-800";
        case "critical": return "bg-red-100 text-red-800";
        default: return "bg-slate-100 text-slate-800";
    }
};

export default function Reports() {
    const [reports, setReports] = useState([]);
    const [patients, setPatients] = useState([]);
    const [filteredReports, setFilteredReports] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [severityFilter, setSeverityFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        try {
            const [reportsData, patientsData] = await Promise.all([
                DiagnosisReport.list('-created_date'),
                Patient.list()
            ]);
            
            setReports(reportsData);
            setPatients(patientsData);
            setLoading(false);
        } catch (error) {
            console.error("Failed to load reports:", error);
            setLoading(false);
        }
    };

    const filterReports = useCallback(() => {
        let filtered = reports;

        if (searchTerm) {
            filtered = filtered.filter(report => {
                const patient = patients.find(p => p.id === report.patient_id);
                return patient?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       report.diagnosis?.toLowerCase().includes(searchTerm.toLowerCase());
            });
        }

        if (severityFilter !== "all") {
            filtered = filtered.filter(report => report.severity === severityFilter);
        }

        if (statusFilter !== "all") {
            filtered = filtered.filter(report => report.status === statusFilter);
        }

        setFilteredReports(filtered);
    }, [reports, patients, searchTerm, severityFilter, statusFilter]);

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        filterReports();
    }, [filterReports]);

    const getPatientName = (patientId) => {
        const patient = patients.find(p => p.id === patientId);
        return patient?.full_name || "Unknown Patient";
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-lg text-slate-600">Loading diagnostic reports...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                                Diagnostic Reports
                            </h1>
                            <p className="text-lg text-slate-600">
                                View and manage all AI-generated retinal analysis reports
                            </p>
                        </div>
                        <Link to={createPageUrl("Diagnosis")}>
                            <Button className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white shadow-lg">
                                <Eye className="w-4 h-4 mr-2" />
                                New Analysis
                            </Button>
                        </Link>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-blue-100 text-sm">Total Reports</p>
                                        <p className="text-2xl font-bold">{reports.length}</p>
                                    </div>
                                    <FileText className="w-8 h-8 text-blue-200" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-r from-green-500 to-cyan-600 text-white shadow-lg">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-cyan-100 text-sm">Normal/Mild</p>
                                        <p className="text-2xl font-bold">
                                            {reports.filter(r => r.severity === 'mild').length}
                                        </p>
                                    </div>
                                    <TrendingUp className="w-8 h-8 text-cyan-200" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-blue-100 text-sm">Moderate/Severe</p>
                                        <p className="text-2xl font-bold">
                                            {reports.filter(r => ['moderate', 'severe'].includes(r.severity)).length}
                                        </p>
                                    </div>
                                    <AlertTriangle className="w-8 h-8 text-blue-200" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-purple-100 text-sm">Unique Patients</p>
                                        <p className="text-2xl font-bold">{patients.length}</p>
                                    </div>
                                    <User className="w-8 h-8 text-purple-200" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Filters */}
                <Card className="mb-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                    <Input
                                        placeholder="Search by patient name or diagnosis..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 border-slate-200 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            
                            <Select value={severityFilter} onValueChange={setSeverityFilter}>
                                <SelectTrigger className="w-48">
                                    <Filter className="w-4 h-4 mr-2" />
                                    <SelectValue placeholder="Filter by severity" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Severities</SelectItem>
                                    <SelectItem value="mild">Mild</SelectItem>
                                    <SelectItem value="moderate">Moderate</SelectItem>
                                    <SelectItem value="severe">Severe</SelectItem>
                                    <SelectItem value="critical">Critical</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-48">
                                    <Filter className="w-4 h-4 mr-2" />
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="reviewed">Reviewed</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Reports List */}
                <div className="space-y-4">
                    {filteredReports.length === 0 ? (
                        <Card className="shadow-lg border-0 text-center py-12">
                            <CardContent>
                                <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-slate-900 mb-2">No Reports Found</h3>
                                <p className="text-slate-600 mb-6">
                                    {reports.length === 0 
                                        ? "No diagnostic reports have been generated yet."
                                        : "No reports match your current filters."
                                    }
                                </p>
                                <Link to={createPageUrl("Diagnosis")}>
                                    <Button className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white">
                                        <Eye className="w-4 h-4 mr-2" />
                                        Start New Analysis
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ) : (
                        filteredReports.map((report, index) => (
                            <motion.div
                                key={report.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <Card className="shadow-lg border-0 hover:shadow-xl transition-all duration-200 bg-white/90 backdrop-blur-sm">
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <h3 className="text-lg font-semibold text-slate-900">
                                                        {getPatientName(report.patient_id)}
                                                    </h3>
                                                    <Badge className={getSeverityColor(report.severity)}>
                                                        {(report.severity || 'N/A').toUpperCase()}
                                                    </Badge>
                                                    <Badge variant="outline" className="bg-slate-50">
                                                        {Math.round(report.confidence_score || 85)}% Confidence
                                                    </Badge>
                                                </div>
                                                
                                                <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        {formatDate(report.created_date)}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="w-4 h-4" />
                                                        Report ID: {report.id?.slice(-8)}
                                                    </div>
                                                </div>

                                                <p className="text-slate-700 mb-4 line-clamp-2">
                                                    {report.diagnosis?.substring(0, 200)}...
                                                </p>

                                                <div className="flex flex-wrap gap-2">
                                                    {report.detected_conditions?.slice(0, 3).map((condition, i) => (
                                                        <Badge key={i} variant="secondary" className="bg-blue-50 text-blue-700">
                                                            {condition}
                                                        </Badge>
                                                    ))}
                                                    {report.detected_conditions?.length > 3 && (
                                                        <Badge variant="secondary" className="bg-slate-100 text-slate-600">
                                                            +{report.detected_conditions.length - 3} more
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-2 ml-4">
                                                <Button 
                                                    size="sm" 
                                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                                    onClick={() => {
                                                        // View detailed report functionality
                                                        console.log("View report:", report.id);
                                                    }}
                                                >
                                                    <ArrowRight className="w-4 h-4 mr-1" />
                                                    View Details
                                                </Button>
                                                
                                                {report.doctor_review_required && (
                                                    <Badge className="bg-blue-100 text-blue-800 text-xs">
                                                        Review Required
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
