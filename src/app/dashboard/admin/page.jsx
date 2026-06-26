"use client";
import React, { useEffect, useState } from 'react';
import { getOverviewData } from '@/lib/actions/admin';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Home, CalendarDays, DollarSign, Loader2 } from 'lucide-react';

export default function OverviewPage() {
    const [stats, setStats] = useState(null); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/immutability
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            setLoading(true);
            const data = await getOverviewData();
            setStats(data);
        } catch (error) {
            console.error("Error loading overview data:", error);
        } finally {
            setLoading(false);
        }
    };

    
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
            </div>
        );
    }

    const statItems = [
        { title: 'Total Users', value: stats?.totalUsers || 0, icon: <Users className="text-blue-500 w-6 h-6" /> },
        { title: 'Total Properties', value: stats?.totalProperties || 0, icon: <Home className="text-orange-500 w-6 h-6" /> },
        { title: 'Total Bookings', value: stats?.totalBookings || 0, icon: <CalendarDays className="text-purple-500 w-6 h-6" /> },
        { title: 'Total Earnings', value: `$${(stats?.totalEarnings || 0).toLocaleString()}`, icon: <DollarSign className="text-green-500 w-6 h-6" /> },
    ];

    const chartData = [
        { name: 'Jan', earnings: 0 },
        { name: 'Feb', earnings: 0 },
        { name: 'Mar', earnings: 0 },
        { name: 'Apr', earnings: 0 },
        { name: 'May', earnings: 0 },
        { name: 'Jun', earnings: stats?.totalEarnings || 0 },
    ];

    return (
        <div className="p-8 bg-zinc-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-8">Overview</h1>

            {/* Stats Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {statItems.map((item, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-zinc-500 font-medium">{item.title}</p>
                            <h2 className="text-2xl font-bold mt-1">{item.value}</h2>
                        </div>
                        <div className="p-3 bg-zinc-100 rounded-xl">{item.icon}</div>
                    </div>
                ))}
            </div>

            {/* Chart Section */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100">
                <h2 className="text-lg font-bold mb-6">Monthly Earnings</h2>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="earnings" fill="#18181b" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}