import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Star, MapPin, Award, MessageSquare } from "lucide-react";
import { Doctor } from "@/api/entities";

const specializationColors = {
    "Retina Specialist": "bg-blue-100 text-blue-800",
    "Glaucoma Expert": "bg-green-100 text-green-800",
    "Cataract Surgeon": "bg-purple-100 text-purple-800",
    "General Ophthalmologist": "bg-slate-100 text-slate-800"
};

const DoctorCard = ({ doctor }) => (
    <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-shrink-0 text-center">
                    <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-white shadow-md">
                        <AvatarImage src={doctor.profile_image || `https://avatar.vercel.sh/${doctor.full_name}.png`} />
                        <AvatarFallback>{doctor.full_name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center justify-center gap-1">
                        <Star className="w-5 h-5 text-yellow-400" />
                        <span className="font-bold text-slate-700">{doctor.rating?.toFixed(1) || '4.5'}</span>
                    </div>
                </div>
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{doctor.full_name}</h3>
                    <p className="font-semibold text-blue-600 mb-3">{doctor.specialization}</p>
                    <div className="text-sm text-slate-600 space-y-2 mb-4">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-slate-400" />
                            <span>{doctor.hospital_affiliation || 'Global Telehealth'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-slate-400" />
                            <span>{doctor.experience_years || '10+'} years of experience</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <p className="text-lg font-bold text-slate-800">${doctor.consultation_fee || '150'}</p>
                        <Button className="medical-gradient hover:opacity-90">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Book Consult
                        </Button>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
);

export default function Doctors() {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [specializationFilter, setSpecializationFilter] = useState("all");
    const [ratingFilter, setRatingFilter] = useState("all");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const data = await Doctor.list();
                setDoctors(data);
                setFilteredDoctors(data);
            } catch (error) {
                console.error("Failed to load doctors:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctors();
    }, []);

    useEffect(() => {
        let filtered = doctors;

        if (searchTerm) {
            filtered = filtered.filter(doc =>
                doc.full_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (specializationFilter !== "all") {
            filtered = filtered.filter(doc => doc.specialization === specializationFilter);
        }

        if (ratingFilter !== "all") {
            filtered = filtered.filter(doc => (doc.rating || 4.5) >= parseFloat(ratingFilter));
        }

        setFilteredDoctors(filtered);
    }, [searchTerm, specializationFilter, ratingFilter, doctors]);

    const uniqueSpecializations = ["all", ...new Set(doctors.map(doc => doc.specialization))];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-900 mb-3">Find a Specialist</h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Connect with our network of certified ophthalmologists and retinal specialists for expert consultation.
                    </p>
                </div>

                <Card className="p-6 mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <div className="relative md:col-span-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <Input
                                placeholder="Search by doctor's name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 h-12 text-slate-900"
                            />
                        </div>
                        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <Select value={specializationFilter} onValueChange={setSpecializationFilter}>
                                <SelectTrigger className="h-12 text-slate-700">
                                    <Filter className="w-4 h-4 mr-2" />
                                    <SelectValue placeholder="All Specializations" />
                                </SelectTrigger>
                                <SelectContent>
                                    {uniqueSpecializations.map(spec => (
                                        <SelectItem key={spec} value={spec}>
                                            {spec === 'all' ? 'All Specializations' : spec}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select value={ratingFilter} onValueChange={setRatingFilter}>
                                <SelectTrigger className="h-12 text-slate-700">
                                    <Star className="w-4 h-4 mr-2" />
                                    <SelectValue placeholder="All Ratings" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Ratings</SelectItem>
                                    <SelectItem value="4.5">4.5+ Stars</SelectItem>
                                    <SelectItem value="4.0">4.0+ Stars</SelectItem>
                                    <SelectItem value="3.5">3.5+ Stars</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button 
                                variant="ghost" 
                                className="h-12 text-slate-600 hover:text-slate-900"
                                onClick={() => {
                                    setSearchTerm('');
                                    setSpecializationFilter('all');
                                    setRatingFilter('all');
                                }}
                            >
                                Clear Filters
                            </Button>
                        </div>
                    </div>
                </Card>

                {loading ? (
                    <div className="text-center p-12">
                        <p>Loading specialists...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {filteredDoctors.map(doctor => (
                            <DoctorCard key={doctor.id} doctor={doctor} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}