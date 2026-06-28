"use client";
import React, { useEffect, useState } from 'react';
import { getAllBookings } from '@/lib/actions/admin';


export default function AllBookingsPage() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/immutability
        loadBookings();
    }, []);

    const loadBookings = async () => {
        const data = await getAllBookings
            ();
        setBookings(data);
    };

    return (
        <div className=" md:p-8 bg-zinc-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">All Bookings Activity</h1>

            <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                   
                    <thead className="hidden md:table-header-group bg-zinc-50 border-b">
                        <tr>
                            <th className="p-4 text-sm font-semibold text-zinc-600">Property</th>
                            <th className="p-4 text-sm font-semibold text-zinc-600">Tenant</th>
                            <th className="p-4 text-sm font-semibold text-zinc-600">Owner</th>
                            <th className="p-4 text-sm font-semibold text-zinc-600">Amount</th>
                            <th className="p-4 text-sm font-semibold text-zinc-600">Date</th>
                            <th className="p-4 text-sm font-semibold text-zinc-600">Status</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-zinc-300">
                        {bookings.map(bk => (
                            <tr key={bk._id} className="block md:table-row p-4 border-b last:border-b-0 hover:bg-zinc-50/50">

                                {/* Property */}
                                <td className="flex justify-between md:table-cell p-2 md:p-4">
                                    <span className="md:hidden font-bold text-zinc-400 text-xs uppercase">Property</span>
                                    <span className="font-medium text-zinc-800">{bk.propertyTitle}</span>
                                </td>

                                {/* Tenant */}
                                <td className="flex justify-between md:table-cell p-2 md:p-4">
                                    <span className="md:hidden font-bold text-zinc-400 text-xs uppercase">Tenant</span>
                                    <span className="text-zinc-600 text-sm">{bk.userName}</span>
                                </td>

                                {/* Owner */}
                                <td className="flex justify-between md:table-cell p-2 md:p-4">
                                    <span className="md:hidden font-bold text-zinc-400 text-xs uppercase">Owner</span>
                                    <span className="text-zinc-600 text-sm">{bk.ownerName}</span>
                                </td>

                                {/* Amount */}
                                <td className="flex justify-between md:table-cell p-2 md:p-4">
                                    <span className="md:hidden font-bold text-zinc-400 text-xs uppercase">Amount</span>
                                    <span className="font-bold text-zinc-900">${bk.amountPaid}</span>
                                </td>

                                {/* Date */}
                                <td className="flex justify-between md:table-cell p-2 md:p-4">
                                    <span className="md:hidden font-bold text-zinc-400 text-xs uppercase">Date</span>
                                    <span className="text-zinc-600 text-sm">{new Date(bk.createdAt).toLocaleDateString()}</span>
                                </td>

                                
                                <td className="flex justify-between md:table-cell p-2 md:p-4">
                                    <span className="md:hidden font-bold text-zinc-400 text-xs uppercase">Status</span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                                ${bk.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                            bk.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                                'bg-yellow-100 text-yellow-700'}`}>
                                        {bk.status || 'Pending'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}