"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

export const getTenantStats = async (email) => {
    const res = await fetch(`${baseUrl}/api/user/dashboard-stats/${email}`);
    if (!res.ok) return null;
    return res.json();
};