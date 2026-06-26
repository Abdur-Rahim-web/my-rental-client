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
        <div className="p-8 bg-zinc-50 min-h-screen">
            {/* Header */}
            <header className="mb-10">
                <h1 className="text-3xl font-bold text-zinc-900">Welcome back, {session?.user?.name}</h1>
                <p className="text-zinc-500">Overview of your property business</p>
            </header>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 flex items-center gap-4">
                    <div className="p-4 bg-blue-50 text-blue-600 rounded-xl"><FileDollar size={24} /></div>
                    <div>
                        <p className="text-sm text-zinc-500">Total Earnings</p>
                        <h3 className="text-2xl font-bold">${stats?.totalEarnings?.toLocaleString()}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 flex items-center gap-4">
                    <div className="p-4 bg-green-50 text-green-600 rounded-xl"><Briefcase size={24} /></div>
                    <div>
                        <p className="text-sm text-zinc-500">Total Properties</p>
                        <h3 className="text-2xl font-bold">{stats?.totalProperties}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 flex items-center gap-4">
                    <div className="p-4 bg-purple-50 text-purple-600 rounded-xl"><Calendar size={24} /></div>
                    <div>
                        <p className="text-sm text-zinc-500">Total Bookings</p>
                        <h3 className="text-2xl font-bold">{stats?.totalBookings}</h3>
                    </div>
                </div>
            </div>

            {/* Monthly Earnings Chart */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100">
                <h3 className="text-xl font-semibold mb-8 text-zinc-800">Monthly Earnings (Last 12 Months)</h3>
                <div className="w-full h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={stats?.monthlyData}>
                            <defs>
                                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} />
                            <YAxis axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ borderRadius: '8px' }} />
                            <Area type="monotone" dataKey="earnings" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorEarnings)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default OwnerOverviewPage;