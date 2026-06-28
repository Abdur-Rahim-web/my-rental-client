"use client";
import { getAllBookings } from '@/lib/actions/admin';
import React, { useEffect, useState } from 'react';

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/immutability
        loadTransactions();
    }, []);

    const loadTransactions = async () => {
        const data = await getAllBookings();

        const approvedTransactions = data.filter(item => item.status === 'Approved');
        setTransactions(approvedTransactions);
    };

    return (
        <div>
            <h1 className=" p-2 text-2xl font-bold mb-6">Transactions Info</h1>
            <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">

                <table className="w-full text-left border-collapse">
                    <thead className="hidden md:table-header-group bg-zinc-50 border-b">
                        <tr>
                            <th className="p-4 text-sm font-semibold text-zinc-600">Transaction ID</th>
                            <th className="p-4 text-sm font-semibold text-zinc-600">Property</th>
                            <th className="p-4 text-sm font-semibold text-zinc-600">Tenant</th>
                            <th className="p-4 text-sm font-semibold text-zinc-600">Owner</th>
                            <th className="p-4 text-sm font-semibold text-zinc-600">Amount</th>
                            <th className="p-4 text-sm font-semibold text-zinc-600">Date</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-zinc-300">
                        {transactions.map(tr => (
                            //'table-row'
                            <tr key={tr._id} className="block md:table-row p-4 border-b last:border-b-0 hover:bg-zinc-50/50">

                                {/* Transaction ID */}
                                <td className="flex justify-between md:table-cell p-2 md:p-4">
                                    <span className="md:hidden font-bold text-zinc-400 text-xs uppercase">ID</span>
                                    <span className="font-mono text-xs text-zinc-600 bg-zinc-100 px-2 py-1 rounded">{tr._id}</span>
                                </td>

                                {/* Property */}
                                <td className="flex justify-between md:table-cell p-2 md:p-4">
                                    <span className="md:hidden font-bold text-zinc-400 text-xs uppercase">Property</span>
                                    <span className="font-medium text-zinc-800">{tr.propertyTitle}</span>
                                </td>

                                {/* Tenant */}
                                <td className="flex justify-between md:table-cell p-2 md:p-4">
                                    <span className="md:hidden font-bold text-zinc-400 text-xs uppercase">Tenant</span>
                                    <span className="text-zinc-600 text-sm">{tr.userName}</span>
                                </td>

                                {/* Owner */}
                                <td className="flex justify-between md:table-cell p-2 md:p-4">
                                    <span className="md:hidden font-bold text-zinc-400 text-xs uppercase">Owner</span>
                                    <span className="text-zinc-600 text-sm">{tr.ownerName}</span>
                                </td>

                                {/* Amount */}
                                <td className="flex justify-between md:table-cell p-2 md:p-4">
                                    <span className="md:hidden font-bold text-zinc-400 text-xs uppercase">Amount</span>
                                    <span className="font-bold text-zinc-900">${tr.amountPaid}</span>
                                </td>

                                {/* Date */}
                                <td className="flex justify-between md:table-cell p-2 md:p-4">
                                    <span className="md:hidden font-bold text-zinc-400 text-xs uppercase">Date</span>
                                    <span className="text-zinc-600 text-sm">{new Date(tr.createdAt).toLocaleDateString()}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}