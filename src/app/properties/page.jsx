"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PropertyCard from '@/components/property/PropertyCard';
import { getAllProperties } from '@/lib/api/property';

const AllPropertyPage = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const data = await getAllProperties();
                setProperties(data);
            } catch (err) {
                setError("Failed to load properties. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="p-8 bg-zinc-50 min-h-screen"
        >
            <h1 className="text-4xl font-extrabold text-zinc-900 mb-2 text-center">Available Properties</h1>
            <p className="text-zinc-500 text-center mb-10">Find your next perfect place to live</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {properties.map((property) => (
                    <motion.div 
                        key={property._id?.$oid || property._id}
                        whileHover={{ y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <PropertyCard property={property} />
                    </motion.div>
                ))}
            </div>

            {properties.length === 0 && (
                <div className="text-center py-20 text-zinc-500 text-lg">No properties found at the moment.</div>
            )}
        </motion.div>
    );
};

export default AllPropertyPage;