import React from 'react';
import Link from 'next/link';
const PropertyCard = ({ property }) => {
    const propertyId = property._id?.$oid || property._id;
    const propertyImage = property.images && property.images.length > 0
        ? property.images[0]
        : 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=500&auto=format&fit=crop';

    return (
        <div className="bg-white rounded-3xl p-4 border border-zinc-100 shadow-sm hover:shadow-xl transition-all duration-300">
           
            <div className="relative w-full h-48 mb-4 overflow-hidden rounded-2xl">
                <img
                    src={propertyImage}
                    alt={property.title}
                    className="w-full h-full object-cover"
                />
            </div>

            
            <h3 className="text-xl font-bold text-zinc-900 mb-1 line-clamp-1">{property.title}</h3>

            
            <p className="text-sm text-zinc-500 mb-2">{property.location}</p>
            <p className="text-2xl font-bold text-blue-600 mb-4">
                ${property.rent}
                <span className="text-sm text-zinc-400 font-normal">/{property.rentType}</span>
            </p>

            <div className="flex gap-4 text-sm text-zinc-600 mb-6">
                <span className="flex items-center gap-1">🛏️ {property.bedrooms} Bed</span>
                <span className="flex items-center gap-1">🚿 {property.bathrooms} Bath</span>
                <span className="flex items-center gap-1">📏 {property.size} sqft</span>
            </div>

            
            <Link
                href={`/properties/${propertyId}`}
                className="block w-full py-3 bg-blue-500 text-white text-center rounded-2xl font-semibold hover:bg-blue-600 transition"
            >
                View Details
            </Link>
        </div>
    );
};

export default PropertyCard;