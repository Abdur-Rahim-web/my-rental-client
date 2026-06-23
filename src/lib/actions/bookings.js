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