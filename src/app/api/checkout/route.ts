import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const { lineItems } = await req.json();

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/shop?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/shop?canceled=true`,
    shipping_address_collection: { allowed_countries: ["US", "CA"] },
    billing_address_collection: "required",
  });

  return NextResponse.json({ url: session.url });
}
