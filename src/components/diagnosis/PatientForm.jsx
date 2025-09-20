import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Phone, Calendar, FileText } from "lucide-react";

export default function PatientForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        full_name: "",
        age: "",
        gender: "",
        phone: "",
        medical_history: "",
        symptoms: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-slate-900">Patient Information</CardTitle>
                <p className="text-slate-600">Please provide patient details for accurate diagnosis</p>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="full_name" className="text-sm font-semibold text-slate-700">
                                Full Name *
                            </Label>
                            <Input
                                id="full_name"
                                value={formData.full_name}
                                onChange={(e) => handleChange("full_name", e.target.value)}
                                placeholder="Enter patient's full name"
                                required
                                className="border-slate-200 focus:border-blue-500"
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="age" className="text-sm font-semibold text-slate-700">
                                Age *
                            </Label>
                            <Input
                                id="age"
                                type="number"
                                value={formData.age}
                                onChange={(e) => handleChange("age", parseInt(e.target.value))}
                                placeholder="Age"
                                required
                                min="1"
                                max="120"
                                className="border-slate-200 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="gender" className="text-sm font-semibold text-slate-700">
                                Gender
                            </Label>
                            <Select onValueChange={(value) => handleChange("gender", value)}>
                                <SelectTrigger className="border-slate-200 focus:border-blue-500">
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-sm font-semibold text-slate-700">
                                Phone Number
                            </Label>
                            <Input
                                id="phone"
                                value={formData.phone}
                                onChange={(e) => handleChange("phone", e.target.value)}
                                placeholder="Phone number"
                                className="border-slate-200 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="medical_history" className="text-sm font-semibold text-slate-700">
                            Medical History
                        </Label>
                        <Textarea
                            id="medical_history"
                            value={formData.medical_history}
                            onChange={(e) => handleChange("medical_history", e.target.value)}
                            placeholder="Previous conditions, medications, surgeries..."
                            rows={3}
                            className="border-slate-200 focus:border-blue-500 resize-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="symptoms" className="text-sm font-semibold text-slate-700">
                            Current Symptoms
                        </Label>
                        <Textarea
                            id="symptoms"
                            value={formData.symptoms}
                            onChange={(e) => handleChange("symptoms", e.target.value)}
                            placeholder="Describe any vision problems, pain, or other symptoms..."
                            rows={3}
                            className="border-slate-200 focus:border-blue-500 resize-none"
                        />
                    </div>

                    <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white py-3 text-lg font-semibold shadow-lg"
                    >
                        Continue to Image Upload
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}