'use server'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

export const createProperty = async (newPropertyData) => {
    try {
        const res = await fetch(`${baseUrl}/api/property`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPropertyData),
        });

        if (!res.ok) {
            throw new Error('Failed to create property');
        }

        return await res.json();
    } catch (error) {
        console.error("Error in createProperty:", error);
        return { error: error.message };
    }
}