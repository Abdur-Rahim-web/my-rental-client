"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getPropertyById } from '@/lib/api/property';
import { addToFavorites } from '@/lib/actions/favorites';
import { useSession } from '@/lib/auth-client';
import { MapPin, Bed, Bath, Expand, Tag, Heart, CheckCircle, Wifi } from 'lucide-react';
import BookingModal from '@/components/property/BookingModal';

const PropertyDetails = () => {
    const { id } = useParams();
    const router = useRouter();
    const { data: session } = useSession();
    const [property, setProperty] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (id) getPropertyById(id).then(setProperty);
    }, [id]);


    const handleFavorite = async () => {
        if (!session?.user) {
            alert("Please login first to add favorites!");
            return;
        }

        const favoriteData = {
            propertyId: id,
            userEmail: session.user.email,
            title: property.title,
            location: property.location,
            image: property.images[0],
            rent: property.rent,
            rentType: property.rentType
        };

        const result = await addToFavorites(favoriteData);
        if (result.insertedId) {
            alert("Added to your favorites!");
        } else {
            alert(result.message || "Something went wrong!");
        }
    };

    if (!property) return <div className="text-center py-20">Loading...</div>;

    return (
        <div className="max-w-6xl mx-auto p-6 my-10">
            <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-10">


                <div className="relative">
                    <img src={property.images[0]} className="w-full h-[500px] object-cover rounded-3xl" />
                    <button
                        onClick={handleFavorite}
                        className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg text-rose-500 hover:scale-105 transition"
                    >
                        <Heart size={28} />
                    </button>
                </div>


                <div className="flex flex-col">
                    <h1 className="text-4xl font-extrabold text-zinc-900 mb-2">{property.title}</h1>
                    <div className="flex items-center text-zinc-500 mb-6"><MapPin size={18} className="mr-1" /> {property.location}</div>

                    <p className="text-zinc-600 mb-8 leading-relaxed">{property.description}</p>

                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="p-3 bg-blue-50 rounded-2xl text-center"><Bed className="mx-auto mb-1 text-blue-600" size={20} /> <p className="font-bold text-sm">{property.bedrooms} Beds</p></div>
                        <div className="p-3 bg-blue-50 rounded-2xl text-center"><Bath className="mx-auto mb-1 text-blue-600" size={20} /> <p className="font-bold text-sm">{property.bathrooms} Baths</p></div>
                        <div className="p-3 bg-blue-50 rounded-2xl text-center"><Expand className="mx-auto mb-1 text-blue-600" size={20} /> <p className="font-bold text-sm">{property.size} sqft</p></div>
                    </div>

                    <div className="mb-8">
                        <h3 className="font-bold text-lg mb-3">Amenities</h3>
                        <div className="flex flex-wrap gap-3">
                            {property.amenities.map((item, index) => (
                                <span key={index} className="px-4 py-2 bg-zinc-100 rounded-full text-sm font-medium flex items-center gap-2">
                                    <CheckCircle size={16} /> {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3 border-t pt-6 mb-8 mt-auto">
                        <p className="flex items-center"><Tag className="mr-2 text-blue-600" size={20} /> <strong>Rent:</strong> ৳{property.rent} / {property.rentType}</p>
                        <p className="flex items-center"><CheckCircle className="mr-2 text-green-600" size={20} /> <strong>Features:</strong> {property.extraFeatures}</p>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200"
                    >
                        Book Property
                    </button>
                </div>
            </div>

            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                property={property}
                onConfirm={() => router.push('/payment')}
            />
        </div>
    );
};
export default PropertyDetails;