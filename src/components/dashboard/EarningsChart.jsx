'use client';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

export const EarningsChart = ({ data }) => {
    return (
        <div className="w-full h-[400px] bg-accent-soft border-zinc-800 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-blue-500 mb-6">Monthly Earnings Overview</h3>
            <ResponsiveContainer width="100%" height="90%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" vertical={false} />
                    <XAxis dataKey="month" stroke="#a1a1aa" fontSize={12} />
                    <YAxis stroke="#a1a1aa" fontSize={12} />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46', color: '#fff' }} 
                    />
                    <Area 
                        type="monotone" 
                        dataKey="earnings" 
                        stroke="#3b82f6" 
                        strokeWidth={3} 
                        fillOpacity={1} 
                        fill="url(#colorEarnings)" 
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};