"use client";
import { X } from 'lucide-react';

const BookingModal = ({ isOpen, onClose, property, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600"><X /></button>
                <h2 className="text-2xl font-bold mb-6">Booking: {property.title}</h2>
                <form onSubmit={onConfirm} className="space-y-4">
                    <input type="date" required className="w-full p-3 rounded-xl border border-zinc-200" placeholder="Move-in Date" />
                    <input type="tel" required className="w-full p-3 rounded-xl border border-zinc-200" placeholder="Contact Number" />
                    <textarea className="w-full p-3 rounded-xl border border-zinc-200" placeholder="Additional Notes" />
                    <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition">Confirm Booking</button>
                </form>
            </div>
        </div>
    );
};
export default BookingModal;