"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client'; 
import { getFeaturedProperties } from '@/lib/api/property';
import { motion } from 'framer-motion';
import PropertyCard from '../property/PropertyCard';


const FeaturedProperties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const { data: session } = useSession(); 
    const router = useRouter();

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const data = await getFeaturedProperties(); 
                setProperties(data);
            } catch (err) {
                console.error("Failed to load featured properties");
            } finally {
                setLoading(false);
            }
        };
        fetchProperties();
    }, []);

    const handleViewDetails = (id) => {
        if (!session) {
            router.push('/login');
        } else {
            router.push(`/properties/${id}`);
        }
    };

    if (loading) return <div className="p-10 text-center">Loading...</div>;

    return (
        <section className="py-16 bg-white">
            <h2 className="text-3xl font-bold text-center mb-10">Featured Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
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
        </section>
    );
};

export default FeaturedProperties;