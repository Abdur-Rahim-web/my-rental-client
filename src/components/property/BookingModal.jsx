"use client";
import { X } from 'lucide-react';
import { createBooking } from '@/lib/actions/bookings';
import { toast } from 'react-toastify';

const BookingModal = ({ isOpen, onClose, property, onConfirm }) => {
    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        
        const bookingData = {
            propertyId: property._id,
            propertyTitle: property.title,
            moveInDate: form.moveInDate.value,
            contactNumber: form.contactNumber.value,
            notes: form.notes.value,
            
        };

        const result = await createBooking(bookingData);
        if (result.insertedId) {
            toast.success("Booking request submitted!");
            onClose(); 
            onConfirm(); 
        } else {
            toast.error("Booking failed.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400"><X /></button>
                <h2 className="text-2xl font-bold mb-6">Book: {property.title}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="moveInDate" type="date" required className="w-full p-3 rounded-xl border border-zinc-200" />
                    <input name="contactNumber" type="tel" required className="w-full p-3 rounded-xl border border-zinc-200" placeholder="Contact Number" />
                    <textarea name="notes" className="w-full p-3 rounded-xl border border-zinc-200" placeholder="Additional Notes" />
                    <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700">Confirm Booking</button>
                </form>
            </div>
        </div>
    );
};
export default BookingModal;