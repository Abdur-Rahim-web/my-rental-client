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
        <table className="w-full text-left">
            <thead className="bg-zinc-50">
                <tr>
                    <th className="p-4">Transaction ID</th>
                    <th className="p-4">Property Name</th>
                    <th className="p-4">Tenant Name</th>
                    <th className="p-4">Owner Name</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Date</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map(tr => (
                    <tr key={tr._id} className="border-t">
                        <td className="p-4 font-mono text-xs">{tr._id}</td>
                        <td className="p-4">{tr.propertyTitle}</td>
                        <td className="p-4">{tr.userName}</td>
                        <td className="p-4">{tr.ownerName}</td>
                        <td className="p-4 font-bold">${tr.amountPaid}</td>
                        <td className="p-4">{new Date(tr.createdAt).toLocaleDateString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}