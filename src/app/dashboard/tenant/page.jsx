"use client";
import React, { useEffect, useState } from 'react';
import { useSession } from "@/lib/auth-client";
import { getTenantStats } from "@/lib/actions/tenant"; 
import { Calendar, Heart, Home, User, Loader2 } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, colorClass }) => (
    <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-zinc-400">{title}</span>
            <div className={`p-3 rounded-2xl ${colorClass}`}>
                <Icon className="w-6 h-6" />
            </div>
        </div>
        <div className="mt-4">
            <span className="text-3xl font-extrabold text-zinc-900">{value ?? "0"}</span>
        </div>
    </div>
);

export default function OverviewPage() {
    const { data: session } = useSession();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            if (session?.user?.email) {
                setLoading(true);
                const data = await getTenantStats(session.user.email);
                setStats(data);
                setLoading(false);
            }
        };
        loadData();
    }, [session?.user?.email]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="animate-spin text-blue-600 w-10 h-10" />
        </div>
    );

    return (
        <div className="p-6 md:p-8 bg-zinc-50 min-h-screen">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl p-8 mb-8 shadow-lg">
                <h1 className="text-3xl font-bold mb-2">Hello, {session?.user?.name?.split(' ')[0]} 👋</h1>
                <p className="text-blue-100 opacity-90">Welcome back to your dashboard. Here is your latest property activity.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Bookings" value={stats?.totalBookings} icon={Calendar} colorClass="bg-blue-100 text-blue-600" />
                <StatCard title="Favorites" value={stats?.favoritesCount} icon={Heart} colorClass="bg-rose-100 text-rose-600" />
                <StatCard title="Active Rentals" value={stats?.activeRentals} icon={Home} colorClass="bg-emerald-100 text-emerald-600" />
                <StatCard title="Profile Status" value="Completed" icon={User} colorClass="bg-amber-100 text-amber-600" />
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-3xl border border-zinc-100 p-8 shadow-sm">
                <h2 className="text-xl font-bold text-zinc-900 mb-6">Recent Activity</h2>
                {stats?.recentActivities?.length > 0 ? (
                    <div className="space-y-4">
                        {stats.recentActivities.map((act, index) => (
                            <div key={index} className="flex items-center p-4 rounded-2xl bg-zinc-50 hover:bg-zinc-100 transition-colors">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-4"></div>
                                <div className="flex-1">
                                    <p className="font-semibold text-zinc-800">Booked {act.propertyTitle}</p>
                                    <p className="text-xs text-zinc-400">{new Date(act.createdAt).toLocaleDateString()}</p>
                                </div>
                                <span className="text-xs font-medium px-3 py-1 bg-white border border-zinc-200 rounded-full text-zinc-600">Pending</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-zinc-400 italic">No recent activity.</p>
                )}
            </div>
        </div>
    );
}