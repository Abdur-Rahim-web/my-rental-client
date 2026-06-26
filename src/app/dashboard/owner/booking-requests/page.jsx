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
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-black">Booking Requests</h1>

            <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-zinc-200">
                <table className="w-full text-left">
                    <thead className="bg-zinc-50 border-b">
                        <tr>
                            <th className="p-4 font-semibold text-zinc-600">Tenant Info</th>
                            <th className="p-4 font-semibold text-zinc-600">Property</th>
                            <th className="p-4 font-semibold text-zinc-600">Amount</th>
                            <th className="p-4 font-semibold text-zinc-600">Status</th>
                            <th className="p-4 font-semibold text-zinc-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length > 0 ? (
                            bookings.map((booking) => (
                                <tr key={booking._id} className="border-b">
                                    <td className="p-4">{booking.userEmail}</td>
                                    <td className="p-4">{booking.propertyTitle}</td>
                                    <td className="p-4">${booking.amountPaid}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-sm ${booking.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                            booking.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="p-4 flex gap-2">
                                        
                                        <button
                                            onClick={() => handleStatusChange(booking._id, 'Approved')}
                                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleStatusChange(booking._id, 'Rejected')}
                                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                                        >
                                            Reject
                                        </button>
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