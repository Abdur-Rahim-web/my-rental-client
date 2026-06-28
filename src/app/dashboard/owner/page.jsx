'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from "@/lib/auth-client";
import { getOwnerDashboardStats } from "@/lib/api/property";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Briefcase, FileDollar, Calendar, Person } from '@gravity-ui/icons';

const OwnerOverviewPage = () => {
    const { data: session } = useSession();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session?.user?.email) {
            // eslint-disable-next-line react-hooks/immutability
            loadDashboardData();
        }
    }, [session]);

    const loadDashboardData = async () => {
        const data = await getOwnerDashboardStats(session.user.email);
        setStats(data);
        setLoading(false);
    };

    if (loading) return <div className="p-10 text-center">Loading Dashboard...</div>;

    return (
        <div className="p-4 md:p-8 bg-zinc-50 min-h-screen">
            {/* Header */}
            <header className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-zinc-900">Welcome back, {session?.user?.name}</h1>
                <p className="text-sm md:text-base text-zinc-500">Overview of your property business</p>
            </header>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {[
                    { label: "Total Earnings", value: `$${stats?.totalEarnings?.toLocaleString()}`, icon: <FileDollar size={20} />, color: "blue" },
                    { label: "Total Properties", value: stats?.totalProperties, icon: <Briefcase size={20} />, color: "green" },
                    { label: "Total Bookings", value: stats?.totalBookings, icon: <Calendar size={20} />, color: "purple" }
                ].map((item, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-zinc-100 flex items-center gap-4">
                        <div className={`p-3 bg-${item.color}-50 text-${item.color}-600 rounded-xl`}>{item.icon}</div>
                        <div>
                            <p className="text-xs text-zinc-500 uppercase tracking-wide">{item.label}</p>
                            <h3 className="text-xl font-bold">{item.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Monthly Earnings Chart */}
            <div className="bg-white p-4 md:p-8 rounded-2xl shadow-sm border border-zinc-100">
                <h3 className="text-lg md:text-xl font-semibold mb-6 text-zinc-800">Monthly Earnings</h3>
                
                <div className="w-full h-[250px] md:h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={stats?.monthlyData}>
                            <defs>
                                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
                            
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                            <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
                            <Area type="monotone" dataKey="earnings" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorEarnings)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default OwnerOverviewPage;