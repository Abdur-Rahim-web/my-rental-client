"use server";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

export const createReview = async (reviewData) => {
    try {
        const res = await fetch(`${baseUrl}/api/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reviewData),
        });
        return await res.json();
    } catch (error) {
        return { error: error.message };
    }
};