"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import { useSession } from '@/lib/auth-client';

const PropertyCard = ({ property }) => {
    const router = useRouter();
    const propertyId = property._id?.$oid || property._id;
    const { data: session } = useSession();

    const handleViewDetails = (e) => {
        if (!session) {
            e.preventDefault(); 
            router.push(`/auth/login?redirect=/properties/${propertyId}`);
        }
    };

    return (
        <div className="bg-white rounded-3xl p-4 border border-zinc-100 shadow-sm hover:shadow-xl transition-all">
            <div className="relative w-full h-48 mb-4 overflow-hidden rounded-2xl">
                <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
            </div>

            <h3 className="text-xl font-bold mb-1">{property.title}</h3>
            <p className="text-sm text-zinc-500 mb-2">{property.location}</p>
            <p className="text-2xl font-bold text-blue-600 mb-4">${property.rent}</p>

            <Link
                href={`/properties/${propertyId}`}
                onClick={handleViewDetails}
                className="block w-full py-3 bg-blue-500 text-white text-center rounded-2xl font-semibold hover:bg-blue-600"
            >
                View Details
            </Link>
        </div>
    );
};

export default PropertyCard;