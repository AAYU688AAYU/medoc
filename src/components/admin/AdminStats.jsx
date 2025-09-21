import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, FileText, Stethoscope, Bug } from 'lucide-react';
import { User as UserEntity } from '@/api/entities';
import { DiagnosisReport } from '@/api/entities';
import { Doctor } from '@/api/entities';
import { DiseaseInfo } from '@/api/entities';

const StatCard = ({ title, value, icon: Icon, color }) => (
    <Card className="shadow-sm border-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">{title}</CardTitle>
            <Icon className={`h-5 w-5 ${color}`} />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
        </CardContent>
    </Card>
);

export default function AdminStats() {
    const [stats, setStats] = useState({
        users: 0,
        reports: 0,
        doctors: 0,
        diseases: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [users, reports, doctors, diseases] = await Promise.all([
                    UserEntity.list(),
                    DiagnosisReport.list(),
                    Doctor.list(),
                    DiseaseInfo.list(),
                ]);
                setStats({
                    users: users.length,
                    reports: reports.length,
                    doctors: doctors.length,
                    diseases: diseases.length,
                });
            } catch (error) {
                console.error("Failed to fetch admin stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <p>Loading stats...</p>;
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Total Users" value={stats.users} icon={User} color="text-blue-500" />
            <StatCard title="Total Reports" value={stats.reports} icon={FileText} color="text-green-500" />
            <StatCard title="Managed Doctors" value={stats.doctors} icon={Stethoscope} color="text-purple-500" />
            <StatCard title="Disease Entries" value={stats.diseases} icon={Bug} color="text-red-500" />
        </div>
    );
}