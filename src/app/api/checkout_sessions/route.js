import { NextResponse } from 'next/server';
import { stripe } from '@/lib/Stripe';

export async function POST(req) {
  try {
    const origin = req.headers.get('origin');

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Property Booking Payment' },
            unit_amount: 10000, 
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}