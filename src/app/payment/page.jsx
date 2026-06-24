"use client";
import { useSearchParams } from 'next/navigation';

const PaymentPage = () => {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const amount = searchParams.get('amount');

  const handleCheckout = async () => {
    const res = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookingId, amount })
    });
    const { url } = await res.json();
    if (url) window.location.assign(url);
  };

  return (
    <div className="max-w-xl mx-auto p-10 mt-20 bg-white rounded-3xl shadow-sm border border-zinc-200 text-center">
      <h1 className="text-3xl font-bold mb-6">Complete Payment</h1>
      <p className="mb-6 text-zinc-600">Total Rent: ${amount}</p>
      <button
        onClick={handleCheckout}
        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition"
      >
        Pay Now
      </button>
    </div>
  );
};
export default PaymentPage;