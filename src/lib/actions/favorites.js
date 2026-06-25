"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

export const addToFavorites = async (favoriteData) => {
    try {
        const res = await fetch(`${baseUrl}/api/favorites`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(favoriteData),
        });

        if (!res.ok) throw new Error('Failed to add to favorites');
        return await res.json();
    } catch (error) {
        console.error("Error in addToFavorites:", error);
        return { error: error.message };
    }
};

export const getFavoritesByEmail = async (email) => {
    try {
        const res = await fetch(`${baseUrl}/api/favorites/${email}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch favorites');
        return await res.json();
    } catch (error) {
        console.error("Error fetching favorites:", error);
        return [];
    }
};


export const deleteFavorite = async (id) => {
    const res = await fetch(`${baseUrl}/api/favorites/${id}`, {
        method: 'DELETE',
    });
    return res.json();
};