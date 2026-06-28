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
        <div className=" bg-zinc-50 min-h-screen">
            
            <div className=" md:p-8 bg-zinc-50 min-h-screen">
                <h1 className=" p-2 text-2xl font-bold mb-6">Manage All Properties</h1>

                <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        {/* header */}
                        <thead className="hidden md:table-header-group bg-zinc-50 border-b">
                            <tr>
                                <th className="p-4 text-sm font-semibold text-zinc-600">Title</th>
                                <th className="p-4 text-sm font-semibold text-zinc-600">Location</th>
                                <th className="p-4 text-sm font-semibold text-zinc-600">Rent</th>
                                <th className="p-4 text-sm font-semibold text-zinc-600">Owner</th>
                                <th className="p-4 text-sm font-semibold text-zinc-600">Status</th>
                                <th className="p-4 text-sm font-semibold text-zinc-600">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-zinc-300">
                            {properties.map(prop => (
                                <tr key={prop._id} className="block md:table-row p-4 border-b last:border-b-0 hover:bg-zinc-50/50">

                                    {/* Title & Location */}
                                    <td className="flex justify-between md:table-cell p-2 md:p-4">
                                        <span className="md:hidden font-bold text-zinc-400 text-xs uppercase">Title</span>
                                        <span className="font-medium text-zinc-800">{prop.title}</span>
                                    </td>

                                    <td className="flex justify-between md:table-cell p-2 md:p-4">
                                        <span className="md:hidden font-bold text-zinc-400 text-xs uppercase">Location</span>
                                        <span className="text-zinc-600 text-sm">{prop.location}</span>
                                    </td>

                                    <td className="flex justify-between md:table-cell p-2 md:p-4">
                                        <span className="md:hidden font-bold text-zinc-400 text-xs uppercase">Rent</span>
                                        <span className="text-zinc-600 text-sm font-semibold">${prop.rent}</span>
                                    </td>

                                    <td className="flex justify-between md:table-cell p-2 md:p-4">
                                        <span className="md:hidden font-bold text-zinc-400 text-xs uppercase">Owner</span>
                                        <div className="text-right md:text-left text-sm text-zinc-600">
                                            <div>{prop.ownerName || "N/A"}</div>
                                            <div className="text-xs text-zinc-400">{prop.ownerEmail}</div>
                                        </div>
                                    </td>

                                    {/* Status */}
                                    <td className="flex justify-between md:table-cell p-2 md:p-4">                                        <span className="md:hidden font-bold text-zinc-400 text-xs uppercase">Status</span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase
                                ${prop.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                                prop.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {prop.status || 'Pending'}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="flex justify-end gap-1.5 md:table-cell p-2 md:p-4 pt-4 md:pt-4">
                                        <div className="flex flex-wrap gap-1.5 justify-end md:justify-start">
                                            <button onClick={() => updatePropertyStatus(prop._id, 'Approved').then(loadProperties)} className="bg-green-600 text-white px-3 py-1 rounded-lg text-xs hover:bg-green-700">Approve</button>
                                            <button onClick={() => setRejectModal({ isOpen: true, id: prop._id, feedback: "" })} className="bg-red-600 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-700">Reject</button>
                                            <button onClick={() => setDeleteModal({ isOpen: true, id: prop._id })} className="bg-zinc-800 text-white px-3 py-1 rounded-lg text-xs hover:bg-black">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
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

