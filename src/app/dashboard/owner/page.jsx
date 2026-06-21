'use client';
import React from 'react';
import { useSession } from "@/lib/auth-client";
import { Briefcase, FileDollar, Calendar, Person } from '@gravity-ui/icons';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { EarningsChart } from '@/components/dashboard/EarningsChart';

const OwnerDashboardHomePage = () => {
    const { data: session, isPending } = useSession();

    if (isPending) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-zinc-500 animate-pulse">Loading Owner Dashboard...</p>
            </div>
        );
    }

    const user = session?.user;

    // Assignment Requirements: Owner-specific statistics
    const ownerStats = [
        { title: "Total Earnings", value: "$12,450", icon: FileDollar },
        { title: "Total Properties", value: "12", icon: Briefcase },
        { title: "Total Bookings", value: "85", icon: Calendar },
    ];

    const monthlyData = [
        { month: 'Jan', earnings: 1200 },
        { month: 'Feb', earnings: 1900 },
        { month: 'Mar', earnings: 3000 },
        { month: 'Apr', earnings: 2400 },
        { month: 'May', earnings: 2800 },
        { month: 'Jun', earnings: 3500 },
        { month: 'Jul', earnings: 3100 },
        { month: 'Aug', earnings: 4200 },
        { month: 'Sep', earnings: 3800 },
        { month: 'Oct', earnings: 4500 },
        { month: 'Nov', earnings: 4800 },
        { month: 'Dec', earnings: 5200 },
    ];

    return (
        <div className="p-8 bg-zinc-50 dark:bg-zinc-950 min-h-screen">
            {/* Header Section */}
            <header className="mb-10 flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                        Welcome back, {user?.name || "Owner"}
                    </h1>
                    <p className="text-zinc-500 mt-2 flex items-center gap-2">
                        <Person size={16} /> Owner Dashboard
                    </p>
                </div>
            </header>

            {/* Dashboard Content */}
            <section className="space-y-8">
                <DashboardStats statsData={ownerStats} />

                {/* Placeholder for future Charts or Tables */}
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                        Analytics Overview
                    </h3>
                    <section>
                        <EarningsChart data={monthlyData} />
                    </section>
                </div>
            </section>
        </div>
    );
};

export default OwnerDashboardHomePage;