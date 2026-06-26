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
        <div className="p-8 bg-zinc-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">All Bookings Activity</h1>
            <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-x-auto">
                <table className="w-full text-left whitespace-nowrap">
                    <thead className="bg-zinc-50 border-b">
                        <tr>
                            <th className="p-4 text-sm font-semibold text-zinc-600">Property</th>
                            <th className="p-4 text-sm font-semibold text-zinc-600">Tenant Name</th>
                            <th className="p-4 text-sm font-semibold text-zinc-600">Owner Name</th>
                            <th className="p-4 text-sm font-semibold text-zinc-600">Amount</th>
                            <th className="p-4 text-sm font-semibold text-zinc-600">Date</th>
                            <th className="p-4 text-sm font-semibold text-zinc-600">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(bk => (
                            <tr key={bk._id} className="border-t hover:bg-zinc-50">
                                <td className="p-4">{bk.propertyTitle}</td>
                                <td className="p-4">{bk.userName}</td>
                                <td className="p-4">{bk.ownerName}</td>
                                <td className="p-4 font-bold">${bk.amountPaid}</td>
                                <td className="p-4">{new Date(bk.createdAt).toLocaleDateString()}</td>
                                <td className="p-4">
                                    <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                                        {bk.status}
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