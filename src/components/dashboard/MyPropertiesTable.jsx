'use client';

import React, { useState } from "react";
import { toast } from "react-toastify";
import DeleteConfirmModal from "@/components/dashboard/DeleteConfirmModal";
import { deleteProperty } from "@/lib/actions/property";

export default function MyPropertiesTable({ properties, onDelete, onUpdate }) {

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [loading, setLoading] = useState(false);

    // নতুন স্টেট: রিজেকশন ফিডব্যাক দেখানোর জন্য
    const [selectedFeedback, setSelectedFeedback] = useState(null);

    const openDeleteModal = (id) => {
        setDeleteId(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        setLoading(true);
        const result = await deleteProperty(deleteId);

        if (!result.error) {
            toast.success("Property deleted!");
            onDelete(deleteId);
            setIsDeleteModalOpen(false);
        } else {
            toast.error(result.error || "Failed to delete.");
        }
        setLoading(false);
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
                                <div className="flex items-center gap-2">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold 
                                        ${property.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                            property.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                                        {property.status}
                                    </span>

                                    {/* রিজেকশন ফিডব্যাক আইকন (শুধুমাত্র রিজেক্ট হলে দেখাবে) */}
                                    {property.status === 'Rejected' && (
                                        <button
                                            onClick={() => setSelectedFeedback(property.rejectionFeedback)}
                                            className="text-red-600 hover:text-red-800 transition-all text-lg"
                                            title="View Rejection Feedback"
                                        >
                                            👁️
                                        </button>
                                    )}
                                </div>
                            </td>
                            <td className="p-4 flex gap-3 justify-center">
                                <button
                                    onClick={() => onUpdate(property)}
                                    className="text-blue-600 hover:text-blue-800 font-medium transition-all"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => openDeleteModal(property._id)}
                                    className="text-red-600 hover:text-red-800 font-medium transition-all"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* রিজেকশন ফিডব্যাক দেখার মোডাল */}
            {selectedFeedback && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
                        <h3 className="text-lg font-bold mb-3 text-red-600">Rejection Feedback</h3>
                        <p className="text-zinc-700 mb-6">{selectedFeedback || "No reason provided."}</p>
                        <button
                            onClick={() => setSelectedFeedback(null)}
                            className="w-full bg-zinc-800 text-white py-2 rounded hover:bg-zinc-700"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {isDeleteModalOpen && (
                <DeleteConfirmModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={confirmDelete}
                    loading={loading}
                />
            )}
        </div>
    );
}