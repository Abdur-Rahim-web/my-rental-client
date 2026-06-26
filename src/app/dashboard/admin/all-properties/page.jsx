"use client";
import React, { useEffect, useState } from 'react';
import { getAllProperties, updatePropertyStatus, deleteProperty } from '@/lib/actions/property';

export default function AllPropertiesPage() {
    const [properties, setProperties] = useState([]);
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
    const [rejectModal, setRejectModal] = useState({ isOpen: false, id: null, feedback: "" });

    // eslint-disable-next-line react-hooks/immutability
    useEffect(() => { loadProperties(); }, []);

    const loadProperties = async () => {
        const data = await getAllProperties();
        setProperties(data);
    };

    
    const handleConfirmDelete = async () => {
        await deleteProperty(deleteModal.id);
        setDeleteModal({ isOpen: false, id: null });
        loadProperties();
    };

    
    const handleConfirmReject = async () => {
        await updatePropertyStatus(rejectModal.id, 'Rejected', rejectModal.feedback);
        setRejectModal({ isOpen: false, id: null, feedback: "" });
        loadProperties();
    };

    return (
        <div className="p-8 bg-zinc-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Manage All Properties</h1>

            <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-x-auto">
                <table className="w-full text-left whitespace-nowrap">
                    <thead className="bg-zinc-50 border-b">
                        <tr>
                            <th className="p-4 text-sm font-semibold text-zinc-600">Title</th>
                            <th className="p-4 text-sm font-semibold text-zinc-600">Location</th>
                            <th className="p-4 text-sm font-semibold text-zinc-600">Rent</th>
                            <th className="p-4 text-sm font-semibold text-zinc-600">Owner Name</th>
                            <th className="p-4 text-sm font-semibold text-zinc-600">Owner Email</th>
                            <th className="p-4 text-sm font-semibold text-zinc-600">Status</th>
                            <th className="p-4 text-sm font-semibold text-zinc-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {properties.map(prop => (
                            <tr key={prop._id} className="border-t hover:bg-zinc-50">
                                <td className="p-4 font-medium">{prop.title}</td>
                                <td className="p-4 text-zinc-600">{prop.location}</td>
                                <td className="p-4 text-zinc-600">${prop.rent}</td>
                                <td className="p-4 text-zinc-600">{prop.ownerName || "N/A"}</td>
                                <td className="p-4 text-zinc-600">{prop.ownerEmail}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold 
                                        ${prop.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                            prop.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {prop.status || 'Pending'}
                                    </span>
                                </td>
                                <td className="p-4 space-x-2">
                                    <button onClick={() => updatePropertyStatus(prop._id, 'Approved').then(loadProperties)} className="bg-green-600 text-white px-2 py-1 rounded-lg text-xs">Approve</button>
                                    <button onClick={() => setRejectModal({ isOpen: true, id: prop._id, feedback: "" })} className="bg-red-600 text-white px-2 py-1 rounded-lg text-xs">Reject</button>
                                    <button onClick={() => setDeleteModal({ isOpen: true, id: prop._id })} className="bg-zinc-800 text-white px-2 py-1 rounded-lg text-xs">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Delete Modal */}
            {deleteModal.isOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-3xl w-96">
                        <h2 className="text-lg font-bold mb-4">Confirm Delete?</h2>
                        <div className="flex gap-4">
                            <button onClick={() => setDeleteModal({ isOpen: false, id: null })} className="flex-1 p-2 bg-zinc-100 rounded-xl">Cancel</button>
                            <button onClick={handleConfirmDelete} className="flex-1 p-2 bg-red-600 text-white rounded-xl">Delete</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Rejection Modal */}
            {rejectModal.isOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-3xl w-96">
                        <h2 className="text-lg font-bold mb-4">Enter Rejection Reason</h2>
                        <textarea
                            className="w-full border p-2 rounded-xl mb-4"
                            onChange={(e) => setRejectModal({ ...rejectModal, feedback: e.target.value })}
                        />
                        <div className="flex gap-4">
                            <button onClick={() => setRejectModal({ isOpen: false, id: null, feedback: "" })} className="flex-1 p-2 bg-zinc-100 rounded-xl">Cancel</button>
                            <button onClick={handleConfirmReject} className="flex-1 p-2 bg-red-600 text-white rounded-xl">Submit</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


