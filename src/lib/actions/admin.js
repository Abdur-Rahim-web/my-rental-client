"use server";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

export const getAllUsers = async () => {
    const res = await fetch(`${baseUrl}/api/users`, { cache: 'no-store' });
    return res.json();
};

export const updateUserRole = async (id, role) => {
    const res = await fetch(`${baseUrl}/api/users/role/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role })
    });
    return res.json();
};