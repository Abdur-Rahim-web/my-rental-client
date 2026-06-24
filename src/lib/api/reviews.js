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