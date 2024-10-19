import { stripe } from "@/lib/stripe";
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import Stripe from "stripe";

export async function POST(req: Request) {
  // Get the user from your authentication provider 
  const { userId } = auth()
  try {
    const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create({
      success_url: "http://localhost:3000/dashboard",
      cancel_url: "http://localhost:3000",
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",

      line_items: [
        {
          price: 'price_1Q8mhwG1OGH8yLiWnuYb4FRr',
          quantity: 1,
        },
      ],
      metadata: {
        userId: userId,
      },
      subscription_data: {
        trial_settings: {
          end_behavior: {
            missing_payment_method: "cancel",
          },
        },
        trial_period_days: 7,
      },
    });
    return NextResponse.json({ result: checkoutSession, ok: true });
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Server', { status: 500 });
  }
}