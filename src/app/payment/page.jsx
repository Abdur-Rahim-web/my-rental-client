"use client";

const PaymentPage = () => {
  const handleCheckout = async () => {
    const res = await fetch('/api/checkout_sessions', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });
    const { url } = await res.json();
    if (url) window.location.assign(url);
  };

  return (
    <div className="max-w-xl mx-auto p-10 m-20 bg-white rounded-3xl shadow-sm border border-zinc-200 text-center">
      <h1 className="text-3xl font-bold mb-6">Complete Your Payment</h1>
      <p className="mb-6 text-zinc-600">Please proceed with the payment to confirm your booking.</p>
      <button 
        onClick={handleCheckout}
        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};
export default PaymentPage;