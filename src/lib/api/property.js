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


export const getAllProperties = async () => {
    try {
        const res = await fetch(`${baseUrl}/api/properties`, {
            cache: 'no-store'
        });
        if (!res.ok) throw new Error('Failed to fetch properties');
        return await res.json();
    } catch (error) {
        console.error("Error fetching all properties:", error);
        return [];
    }
};


export const getFeaturedProperties = async () => {
    try {
        const res = await fetch(`${baseUrl}/api/featured-properties`, {
            cache: 'no-store'
        });

        if (!res.ok) throw new Error('Failed to fetch featured properties');

        return await res.json();
    } catch (error) {
        console.error("Error fetching featured properties:", error);
        return [];
    }
};


export const getPropertyById = async (id) => {
    try {
        const res = await fetch(`${baseUrl}/api/properties/${id}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch property details');
        return await res.json();
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};



export const getOwnerBookingRequests = async (email) => {
    try {
        const res = await fetch(`${baseUrl}/api/owner/bookings-requests/${email}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch bookings');
        return await res.json();
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
};


export const updateBookingStatus = async (id, status) => {
    try {
        const res = await fetch(`${baseUrl}/api/bookings/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });
        return await res.json();
    } catch (error) {
        console.error("Error:", error);
        return { error: error.message };
    }
};


export const getOwnerDashboardStats = async (email) => {
    try {
        const res = await fetch(`${baseUrl}/api/owner/overview/${email}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch stats');
        return await res.json();
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};