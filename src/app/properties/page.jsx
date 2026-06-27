'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import PropertyCard from '@/components/property/PropertyCard';
import { getAllPropertiesBySearch } from '@/lib/api/property';

const AllPropertyPage = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useState("");
    const [propertyType, setPropertyType] = useState("");
    const [sort, setSort] = useState("");

    const fetchProperties = useCallback(async () => {
        setLoading(true);
        
        console.log("Fetching with:", { location, propertyType, sort });
        
        try {
            const data = await getAllPropertiesBySearch({ location, propertyType, sort });
            console.log("Data Received from API:", data); 
            setProperties(data || []);
        } catch (err) {
            console.error("Fetch Error:", err);
        } finally {
            setLoading(false);
        }
    }, [location, propertyType, sort]);

    useEffect(() => {
        console.log("Filters changed, triggering fetch...");
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchProperties();
    }, [fetchProperties]);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 bg-zinc-50 min-h-screen">
            <h1 className="text-4xl font-extrabold text-zinc-900 mb-8 text-center">Available Properties</h1>
            
            <div className="max-w-7xl mx-auto mb-10 p-6 bg-white rounded-3xl shadow-sm border border-zinc-100 flex flex-wrap gap-4 items-center">
                <input
                    type="text"
                    placeholder="Search by Location..."
                    className="p-3 border border-zinc-200 rounded-xl flex-1"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />

                <select className="p-3 border border-zinc-200 rounded-xl" value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
                    <option value="">All Types</option>
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Studio">Studio</option>
                </select>

                <select className="p-3 border border-zinc-200 rounded-xl" value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="">Sort By Price</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                </select>
            </div>

            {loading ? <div className="text-center">Loading...</div> : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {properties.map((p) => <PropertyCard key={p._id?.$oid || p._id} property={p} />)}
                </div>
            )}
        </motion.div>
    );
};

export default AllPropertyPage;