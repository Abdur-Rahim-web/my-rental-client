"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import DeleteConfirmModal from "@/components/dashboard/DeleteConfirmModal";
import { deleteProperty } from "@/lib/actions/property";

export default function MyPropertiesTable({ properties, onDelete, onUpdate }) {

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [loading, setLoading] = useState(false);

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