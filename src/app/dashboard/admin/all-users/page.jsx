"use client";
import React, { useEffect, useState } from 'react';
import { getAllUsers, updateUserRole } from '@/lib/actions/admin';

const AllUsersPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/immutability
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const data = await getAllUsers();
        setUsers(data);
    };

    const handleRoleChange = async (id, newRole) => {
        await updateUserRole(id, newRole);
        loadUsers();
    };

    return (
        <div className="p-8 bg-zinc-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-6 text-zinc-900">All Users</h1>
            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-zinc-50 border-b">
                        <tr>
                            <th className="p-4 text-sm font-semibold text-zinc-600">Name</th>
                            <th className="p-4 text-sm font-semibold text-zinc-600">Email</th>
                            <th className="p-4 text-sm font-semibold text-zinc-600">Account Created</th> 
                            <th className="p-4 text-sm font-semibold text-zinc-600">Role</th>
                            <th className="p-4 text-sm font-semibold text-zinc-600">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} className="border-b hover:bg-zinc-50">
                                <td className="p-4 text-zinc-800 font-medium">{user.name}</td>
                                <td className="p-4 text-zinc-600">{user.email}</td>
                                
                                <td className="p-4 text-zinc-600 text-sm">
                                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                </td>
                                <td className="p-4">
                                    <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold capitalize">
                                        {user.role}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <select
                                        className="border border-zinc-200 rounded-lg p-1 text-sm bg-white"
                                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                        value={user.role}
                                    >
                                        <option value="user">User</option>
                                        <option value="owner">Owner</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsersPage;