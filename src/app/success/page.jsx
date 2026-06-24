import { stripe } from '@/lib/Stripe';
import { updateBookingStatus } from '@/lib/actions/bookings';

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) return <div>Invalid Session</div>;

  
  const session = await stripe.checkout.sessions.retrieve(session_id);

  
  if (session.payment_status === 'paid') {
    const bookingId = session.metadata.bookingId; 

    
    await updateBookingStatus(bookingId, 'Approved');

    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-green-600">Payment Successful!</h1>
        <p className="mt-4">Your booking has been approved. Confirmation email sent.</p>
      </div>
    );
  }

  return <div>Payment pending or failed.</div>;
}