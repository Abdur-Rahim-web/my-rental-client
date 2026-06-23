import { stripe } from '@/lib/Stripe';
import { redirect } from 'next/navigation';

export default async function Success({ searchParams }) {
    const { session_id } = await searchParams;

    if (!session_id) redirect('/');

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.status === 'complete') {
        return (
            <div className="text-center py-20">
                <h1 className="text-4xl font-bold text-green-600">Payment Successful!</h1>
                <p className="mt-4">Thank you for your booking. A confirmation email has been sent.</p>
            </div>
        );
    }

    redirect('/');
}