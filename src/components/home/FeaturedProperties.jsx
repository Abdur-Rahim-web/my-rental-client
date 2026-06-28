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
                setProperties(data || []);
            } catch (err) {
                console.error("Failed to load featured properties");
            } finally {
                setLoading(false);
            }
        };
        fetchProperties();
    }, []);

    
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { type: "spring", stiffness: 100, damping: 12 }
        }
    };

    if (loading) return (
        <div className="py-20 flex justify-center items-center">
            <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"
            />
        </div>
    );

    return (
        <section className="py-24 bg-default-50/30">
            <div className="max-w-[1280px] mx-auto px-6">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
                        Featured <span className="text-blue-600">Properties</span>
                    </h2>
                    <p className="text-default-500 text-lg">Discover our hand-picked selection of top-tier homes.</p>
                </motion.div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {properties.map((property) => (
                        <motion.div 
                            key={property._id?.$oid || property._id}
                            variants={cardVariants}
                            whileHover={{ y: -12, transition: { duration: 0.2 } }}
                        >
                            <PropertyCard property={property} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturedProperties;