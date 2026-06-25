"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

export const createBooking = async (bookingData) => {
    try {
        const res = await fetch(`${baseUrl}/api/bookings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingData),
        });

        if (!res.ok) throw new Error('Failed to create booking');
        return await res.json();
    } catch (error) {
        console.error("Error in createBooking:", error);
        return { error: error.message };
    }
};



export const updateBookingStatus = async (bookingId, status) => {
    try {
        const res = await fetch(`${baseUrl}/api/bookings/${bookingId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
        });
        return await res.json();
    } catch (error) {
        return { error: error.message };
    }
};


export const getBookingsByEmail = async (email) => {

    const timestamp = new Date().getTime();
    const res = await fetch(`${baseUrl}/api/bookings/${email}?t=${timestamp}`, {
        cache: 'no-store',
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
        }
    });

    if (!res.ok) return [];
    return res.json();
};


