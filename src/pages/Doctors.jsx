
import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
    Search, 
    Star, 
    MapPin, 
    Phone, 
    Mail, 
    Calendar,
    Stethoscope,
    Eye,
    Award,
    Clock,
    DollarSign,
    Filter
} from "lucide-react";
import { Doctor } from "@/api/entities";
import { motion } from "framer-motion";

export default function Doctors() {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [specializationFilter, setSpecializationFilter] = useState("all");
    const [ratingFilter, setRatingFilter] = useState("all");
    const [loading, setLoading] = useState(true);

    const loadDoctors = async () => {
        try {
            const doctorsData = await Doctor.list('-rating');
            setDoctors(doctorsData);
            setLoading(false);
        } catch (error) {
            console.error("Failed to load doctors:", error);
            setLoading(false);
        }
    };

    const filterDoctors = useCallback(() => {
        let filtered = doctors;

        if (searchTerm) {
            filtered = filtered.filter(doctor => 
                doctor.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                doctor.specialization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                doctor.hospital_affiliation?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (specializationFilter !== "all") {
            filtered = filtered.filter(doctor => 
                doctor.specialization?.toLowerCase().includes(specializationFilter.toLowerCase())
            );
        }

        if (ratingFilter !== "all") {
            const minRating = parseFloat(ratingFilter);
            filtered = filtered.filter(doctor => (doctor.rating || 0) >= minRating);
        }

        setFilteredDoctors(filtered);
    }, [doctors, searchTerm, specializationFilter, ratingFilter]); // Dependencies for useCallback

    useEffect(() => {
        loadDoctors();
    }, []); // Empty dependency array means this runs once on mount

    useEffect(() => {
        filterDoctors();
    }, [filterDoctors]); // filterDoctors is now memoized by useCallback, so this is correct

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating || 0);
        const hasHalfStar = (rating || 0) % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star key={i} className="w-4 h-4 fill-blue-400 text-blue-400" />);
        }

        if (hasHalfStar) {
            stars.push(<Star key="half" className="w-4 h-4 fill-blue-200 text-blue-400" />);
        }

        const remainingStars = 5 - Math.ceil(rating || 0);
        for (let i = 0; i < remainingStars; i++) {
            stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
        }

        return stars;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-sky-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-lg text-slate-600">Loading eye specialists...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-sky-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-sky-100 text-blue-700 px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-md">
                        <Stethoscope className="w-5 h-5" />
                        Expert Ophthalmologists
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        Find Eye Care <span className="bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">Specialists</span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        Connect with qualified ophthalmologists and retinal specialists for comprehensive eye care and treatment
                    </p>
                </div>

                {/* Filters */}
                <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                    <Input
                                        placeholder="Search doctors by name, specialization, or hospital..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 border-slate-200 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            
                            <Select value={specializationFilter} onValueChange={setSpecializationFilter}>
                                <SelectTrigger className="w-56">
                                    <Filter className="w-4 h-4 mr-2" />
                                    <SelectValue placeholder="Specialization" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Specializations</SelectItem>
                                    <SelectItem value="ophthalmology">Ophthalmology</SelectItem>
                                    <SelectItem value="retinal">Retinal Specialist</SelectItem>
                                    <SelectItem value="glaucoma">Glaucoma Specialist</SelectItem>
                                    <SelectItem value="corneal">Corneal Specialist</SelectItem>
                                    <SelectItem value="pediatric">Pediatric Ophthalmology</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={ratingFilter} onValueChange={setRatingFilter}>
                                <SelectTrigger className="w-48">
                                    <Star className="w-4 h-4 mr-2" />
                                    <SelectValue placeholder="Min Rating" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Ratings</SelectItem>
                                    <SelectItem value="4.5">4.5+ Stars</SelectItem>
                                    <SelectItem value="4.0">4.0+ Stars</SelectItem>
                                    <SelectItem value="3.5">3.5+ Stars</SelectItem>
                                    <SelectItem value="3.0">3.0+ Stars</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Doctors Grid */}
                {filteredDoctors.length === 0 ? (
                    <Card className="shadow-lg border-0 text-center py-16">
                        <CardContent>
                            <Stethoscope className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-slate-900 mb-2">No Doctors Found</h3>
                            <p className="text-slate-600">
                                {doctors.length === 0 
                                    ? "No doctors are currently available."
                                    : "No doctors match your search criteria."
                                }
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredDoctors.map((doctor, index) => (
                            <motion.div
                                key={doctor.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <Card className="shadow-xl border-0 hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-sm group cursor-pointer overflow-hidden">
                                    <CardHeader className="text-center pb-4 relative">
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-sky-50 opacity-50"></div>
                                        <div className="relative">
                                            {doctor.profile_image ? (
                                                <img 
                                                    src={doctor.profile_image} 
                                                    alt={doctor.full_name}
                                                    className="w-20 h-20 rounded-full mx-auto mb-4 shadow-lg"
                                                />
                                            ) : (
                                                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-sky-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                    <Eye className="w-10 h-10 text-white" />
                                                </div>
                                            )}
                                            
                                            <CardTitle className="text-xl font-bold text-slate-900 mb-2">
                                                {doctor.full_name}
                                            </CardTitle>
                                            
                                            <Badge className="bg-blue-100 text-blue-700 mb-3">
                                                {doctor.specialization}
                                            </Badge>
                                            
                                            <div className="flex justify-center items-center gap-1 mb-2">
                                                {renderStars(doctor.rating)}
                                                <span className="ml-2 text-sm text-slate-600">
                                                    {(doctor.rating || 0).toFixed(1)}
                                                </span>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <Award className="w-4 h-4 text-blue-500" />
                                                <span>{doctor.experience_years || 0}+ Years</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <DollarSign className="w-4 h-4 text-green-500" />
                                                <span>${doctor.consultation_fee || 150}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-slate-600 text-sm">
                                                <MapPin className="w-4 h-4 text-red-500" />
                                                <span className="truncate">{doctor.hospital_affiliation || 'Private Practice'}</span>
                                            </div>
                                            
                                            {doctor.availability && (
                                                <div className="flex items-center gap-2 text-slate-600 text-sm">
                                                    <Clock className="w-4 h-4 text-orange-500" />
                                                    <span className="truncate">{doctor.availability}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="pt-4 border-t border-slate-100">
                                            <div className="flex gap-2">
                                                <Button 
                                                    size="sm" 
                                                    className="flex-1 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white"
                                                >
                                                    <Calendar className="w-4 h-4 mr-1" />
                                                    Book Appointment
                                                </Button>
                                                
                                                {doctor.contact_email && (
                                                    <Button 
                                                        size="sm" 
                                                        variant="outline"
                                                        className="border-slate-300 hover:border-blue-300"
                                                    >
                                                        <Mail className="w-4 h-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        </div>

                                        {doctor.license_number && (
                                            <div className="text-xs text-slate-500 text-center pt-2 border-t border-slate-100">
                                                License: {doctor.license_number}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
