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


export const getAllBookings = async () => {
    try {
        const res = await fetch(`${baseUrl}/api/admin/bookings`, { cache: 'no-store' });
        return await res.json();
    } catch (error) {
        console.error("Error in getAllBookings:", error);
        return [];
    }
};


export const getOverviewData = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/overview`, { cache: 'no-store' });
    return await res.json();
};