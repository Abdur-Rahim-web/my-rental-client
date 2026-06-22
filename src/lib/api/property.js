'use server'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

export const getOwnerProperties = async (email) => {
    try {
        const res = await fetch(`${baseUrl}/api/properties?ownerEmail=${email}`, {
            cache: 'no-store' 
        });
        if (!res.ok) throw new Error('Failed to fetch properties');
        return await res.json();
    } catch (error) {
        console.error("Error fetching properties:", error);
        return [];
    }
};