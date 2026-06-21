
import React from 'react';
import { StatCard } from './StatCard';

export const DashboardStats = ({ statsData = [] }) => {
    
    if (statsData.length === 0) {
        return (
            <div className="text-center p-8 text-zinc-500">
                No statistics available at the moment.
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto py-6">
            {/* card */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {statsData.map((stat, index) => (
                    <div key={stat.id || index} className="transition-transform duration-200 hover:scale-105">
                        <StatCard
                            title={stat.title}
                            value={stat.value}
                            icon={stat.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};