"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { getOwnerBookingRequests, updateBookingStatus } from "@/lib/api/property";
import { toast } from "react-toastify";

export default function BookingRequestsPage() {
    const { data: session } = useSession();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session?.user?.email) {
            // eslint-disable-next-line react-hooks/immutability
            loadBookings();
        }
    }, [session]);

    const loadBookings = async () => {
        setLoading(true);
        const data = await getOwnerBookingRequests(session.user.email);
        setBookings(data);
        setLoading(false);
    };

    const handleStatusChange = async (id, status) => {
        const result = await updateBookingStatus(id, status);
        if (result && !result.error) {
            toast.success(`Booking ${status} successfully!`);
            loadBookings();
        } else {
            toast.error("Failed to update status.");
        }
    };

    if (loading) return <div className="p-10 text-center">Loading requests...</div>;

    return (
        <div className="md:p-8 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-black">Booking Requests</h1>

            <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    
                    <thead className="hidden md:table-header-group bg-zinc-50 border-b">
                        <tr>
                            <th className="p-4 font-semibold text-zinc-600">Tenant Info</th>
                            <th className="p-4 font-semibold text-zinc-600">Property</th>
                            <th className="p-4 font-semibold text-zinc-600">Amount</th>
                            <th className="p-4 font-semibold text-zinc-600">Status</th>
                            <th className="p-4 font-semibold text-zinc-600">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-zinc-300">
                        {bookings.length > 0 ? (
                            bookings.map((booking) => (
                                <tr key={booking._id} className="block md:table-row border-b last:border-b-0 p-4 md:p-0 hover:bg-zinc-50">

                                    {/* Tenant Info */}
                                    <td className="flex justify-between md:table-cell p-2 md:p-4">
                                        <span className="md:hidden font-bold text-zinc-400 text-xs uppercase">Tenant</span>
                                        <span className="text-zinc-800">{booking.userEmail}</span>
                                    </td>

                                    {/* Property */}
                                    <td className="flex justify-between md:table-cell p-2 md:p-4">
                                        <span className="md:hidden font-bold text-zinc-400 text-xs uppercase">Property</span>
                                        <span className="text-zinc-600 font-medium">{booking.propertyTitle}</span>
                                    </td>

                                    {/* Amount */}
                                    <td className="flex justify-between md:table-cell p-2 md:p-4">
                                        <span className="md:hidden font-bold text-zinc-400 text-xs uppercase">Amount</span>
                                        <span className="font-bold text-zinc-900">${booking.amountPaid}</span>
                                    </td>

                                    {/* Status */}
                                    <td className="flex justify-between md:table-cell p-2 md:p-4">
                                        <span className="md:hidden font-bold text-zinc-400 text-xs uppercase">Status</span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${booking.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                                booking.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                                    'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="flex justify-end gap-2 md:table-cell p-2 md:p-4">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleStatusChange(booking._id, 'Approved')}
                                                className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 text-xs font-semibold"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleStatusChange(booking._id, 'Rejected')}
                                                className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 text-xs font-semibold"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="p-10 text-center text-zinc-500">No booking requests found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}