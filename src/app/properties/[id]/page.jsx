"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getPropertyById } from '@/lib/api/property';
import { addToFavorites } from '@/lib/actions/favorites';
import { useSession } from '@/lib/auth-client';
import { MapPin, Bed, Bath, Expand, Tag, Heart, CheckCircle, Star } from 'lucide-react';
import BookingModal from '@/components/property/BookingModal';
import { createReview } from '@/lib/actions/reviews';
import { getReviewsByProperty } from '@/lib/api/reviews';

const PropertyDetails = () => {
    const { id } = useParams();
    const router = useRouter();
    const { data: session } = useSession();

    const [property, setProperty] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ rating: 5, comment: "" });

    // Load Property and Reviews
    useEffect(() => {
        if (id) {
            getPropertyById(id).then(setProperty);
            getReviewsByProperty(id).then(setReviews);
        }
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

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!session?.user) return alert("Please login to review!");

        const reviewData = {
            propertyId: id,
            reviewerName: session.user.name,
            reviewerEmail: session.user.email,
            rating: newReview.rating,
            comment: newReview.comment
        };

        const result = await createReview(reviewData);
        if (result.insertedId) {
            setReviews([...reviews, { ...reviewData, _id: result.insertedId }]);
            setNewReview({ rating: 5, comment: "" });
            alert("Review posted successfully!");
        } else {
            alert("Failed to post review.");
        }
    };

    if (!property) return <div className="text-center py-20 text-xl font-semibold">Loading...</div>;

    return (
        <div className="max-w-6xl mx-auto p-6 my-10">
            {/* Main Content */}
            <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="relative">
                    <img src={property.images[0]} className="w-full h-[500px] object-cover rounded-3xl" alt={property.title} />
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
                        <p className="flex items-center text-2xl text-blue-500"><Tag className="mr-2 text-blue-600" size={20} /> <strong className='text-black'>Rent:</strong> $ {property.rent} / {property.rentType}</p>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg"
                    >
                        Book Property
                    </button>
                </div>
            </div>

            {/* Review Section */}
            <div className="mt-12 bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
                <h2 className="text-2xl font-bold mb-6">Reviews ({reviews.length})</h2>

                <div className="space-y-4 mb-8">
                    {reviews.length === 0 && <p className="text-zinc-500">No reviews yet.</p>}
                    {reviews.map((r, i) => (
                        <div key={i} className="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                            <p className="font-bold text-zinc-900">{r.reviewerName}</p>
                            <div className="flex text-yellow-500 my-1">
                                {[...Array(Number(r.rating) || 5)].map((_, idx) => <Star key={idx} size={16} fill="currentColor" />)}
                            </div>
                            <p className="text-zinc-600">{r.comment}</p>
                        </div>
                    ))}
                </div>

                {session?.user && (
                    <form onSubmit={handleReviewSubmit} className="space-y-4 border-t pt-6">
                        <h3 className="font-bold text-lg">Leave a Review</h3>
                        <select
                            className="p-2 border border-zinc-300 rounded-lg w-32"
                            onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                            value={newReview.rating}
                        >
                            {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                        </select>
                        <textarea
                            className="w-full p-3 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Write your review here..."
                            rows="3"
                            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                            value={newReview.comment}
                            required
                        />
                        <button type="submit" className="bg-zinc-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-zinc-800 transition">
                            Post Review
                        </button>
                    </form>
                )}
            </div>

            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                property={property}
                userEmail={session?.user?.email}
                userName={session?.user?.name}
                onConfirm={() => router.push('/payment')}
            />
        </div>
    );
};
export default PropertyDetails;