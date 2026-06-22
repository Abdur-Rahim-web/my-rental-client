"use client";

import React from "react";
import { toast } from "react-toastify";

export default function MyPropertiesTable({ properties, onDelete, onUpdate }) {

    // ডিলিট করার ফাংশন
    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this property?")) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/properties/${id}`, {
                method: "DELETE"
            });
            if (res.ok) {
                toast.success("Property deleted successfully!");
                onDelete(id); // প্যারেন্ট কম্পোনেন্টকে ডাটা আপডেট করার জন্য কল করা
            } else {
                toast.error("Failed to delete.");
            }
        } catch (error) {
            toast.error("Error occurred!");
        }
    };

    return (
        <div className="overflow-x-auto w-full bg-white shadow rounded-lg border border-zinc-200">
            <table className="w-full text-left border-collapse">
                <thead className="bg-zinc-50 border-b border-zinc-200">
                    <tr>
                        <th className="p-4 font-semibold text-zinc-700">Property Name</th>
                        <th className="p-4 font-semibold text-zinc-700">Rent</th>
                        <th className="p-4 font-semibold text-zinc-700">Status</th>
                        <th className="p-4 font-semibold text-zinc-700 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {properties?.map((property) => (
                        <tr key={property._id} className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">
                            <td className="p-4 text-zinc-800 font-medium">{property.title}</td>
                            <td className="p-4 text-zinc-600">${property.rent}</td>
                            <td className="p-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold 
                  ${property.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                        property.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                                    {property.status}
                                </span>
                            </td>
                            <td className="p-4 flex gap-3 justify-center">
                                <button
                                    onClick={() => onUpdate(property)}
                                    className="text-blue-600 hover:text-blue-800 font-medium transition-all"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDelete(property._id)}
                                    className="text-red-600 hover:text-red-800 font-medium transition-all"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}