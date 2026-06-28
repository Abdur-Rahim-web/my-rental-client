const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

export const getReviewsByProperty = async (propertyId) => {
    try {
        const res = await fetch(`${baseUrl}/api/reviews/${propertyId}`);
        return await res.json();
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return [];
    }
};


// All Reviews Related fetching
export const getAllReviews = async () => {
    try {
        const res = await fetch(`${baseUrl}/api/reviews`);

        if (!res.ok) {
            throw new Error(`Server responded with ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Error fetching all reviews:", error);
        return [];
    }
};