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


export const updateProperty = async (id, updatedData) => {
    try {
        const res = await fetch(`${baseUrl}/api/properties/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        if (!res.ok) {
            throw new Error('Failed to update property');
        }

        return await res.json();
    } catch (error) {
        console.error("Error in updateProperty:", error);
        return { error: error.message };
    }
};


export const deleteProperty = async (id) => {
    try {
        const res = await fetch(`${baseUrl}/api/properties/${id}`, {
            method: 'DELETE',
        });

        if (!res.ok) {
            throw new Error('Failed to delete property');
        }

        return await res.json();
    } catch (error) {
        console.error("Error in deleteProperty:", error);
        return { error: error.message };
    }
};




