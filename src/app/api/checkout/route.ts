import Stripe from "stripe";

export const runtime = "nodejs";

type CreateBody = {
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[];
  successUrl?: string;
  cancelUrl?: string;
};

export async function POST(req: Request) {
  // ⬇️ Guard goes right here
  if (!process.env.STRIPE_SECRET_KEY) {
    return new Response(JSON.stringify({ error: "Checkout not enabled" }), {
      status: 501,
      headers: { "Content-Type": "application/json" },
    });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const { lineItems, successUrl, cancelUrl } = (await req.json()) as CreateBody;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    success_url: successUrl ?? `${process.env.NEXT_PUBLIC_SITE_URL}/thank-you`,
    cancel_url: cancelUrl ?? `${process.env.NEXT_PUBLIC_SITE_URL}/shop`,
  });

  return Response.json({ url: session.url });
}

// (optional) make other methods explicit
export async function GET() {
  return new Response(JSON.stringify({ error: "Method not allowed" }), {
    status: 405,
    headers: { "Content-Type": "application/json" },
  });
}
