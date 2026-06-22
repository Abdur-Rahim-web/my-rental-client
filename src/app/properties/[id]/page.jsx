"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getPropertyById } from '@/lib/api/property';
import { MapPin, Bed, Bath, Expand, Wifi, Tv, Coffee, User } from 'lucide-react'; //lucide-react ব্যবহার করেছি

const PropertyDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPropertyById(id).then(data => {
            setProperty(data);
            setLoading(false);
        });
    }, [id]);

    if (loading) return <div className="text-center py-20 animate-pulse">Loading details...</div>;
    if (!property) return <div className="text-center py-20 text-red-500">Property not found!</div>;

    return (
        <div className="max-w-6xl mx-auto p-6 mt-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Left Side: Images */}
                <div>
                    <img src={property.images[0]} alt={property.title} className="w-full h-[500px] object-cover rounded-3xl shadow-2xl" />
                    {/* Owner Info */}
                    <div className="mt-8 p-6 bg-white rounded-xl border border-zinc-100 shadow-sm">
                        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">Owner Information</h2>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                <User size={24} />
                            </div>
                            <div>
                                <p className="font-bold text-zinc-900">{property.ownerName}</p>
                                <p className="text-sm text-zinc-500">{property.ownerEmail}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Details */}
                <div className="flex flex-col">
                    <h1 className="text-4xl font-extrabold text-zinc-900">{property.title}</h1>
                    <div className="flex items-center gap-2 text-zinc-500 mt-2">
                        <MapPin size={18} /> {property.location}
                    </div>

                    <div className="mt-6 p-6 bg-white border border-zinc-200 rounded-2xl shadow-sm">
                        <p className="text-3xl font-bold text-blue-600">${property.rent} <span className="text-lg font-normal text-zinc-500">/ {property.rentType}</span></p>

                        <div className="grid grid-cols-3 gap-4 mt-6 border-t pt-6">
                            <div className="text-center"><Bed className="mx-auto" /> <p className="text-sm">{property.bedrooms} Beds</p></div>
                            <div className="text-center"><Bath className="mx-auto" /> <p className="text-sm">{property.bathrooms} Baths</p></div>
                            <div className="text-center"><Expand className="mx-auto" /> <p className="text-sm">{property.size} sqft</p></div>
                        </div>
                    </div>

                    <h3 className="mt-8 font-bold text-lg">Description</h3>
                    <p className="text-zinc-600 mt-2 leading-relaxed">{property.description}</p>

                    <h3 className="mt-6 font-bold text-lg">Amenities</h3>
                    <div className="flex gap-4 mt-2">
                        {property.amenities.map((item, index) => (
                            <span key={index} className="px-4 py-1 bg-zinc-100 rounded-full text-sm font-medium flex items-center gap-2">
                                {item === 'WiFi' ? <Wifi size={16} /> : <Tv size={16} />} {item}
                            </span>
                        ))}
                    </div>

                    <div className="mt-6 p-3 bg-blue-50 rounded-2xl border border-blue-100">
                        <h3 className="font-bold text-lg mb-2">Extra Features</h3>
                        <p className="text-blue-800 flex items-center gap-2"><Coffee size={20} /> {property.extraFeatures}</p>
                    </div>


                    <button className="mt-8 w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;