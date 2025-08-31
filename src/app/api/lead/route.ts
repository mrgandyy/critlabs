import { NextResponse } from "next/server";

const RESEND_API_KEY = process.env.RESEND_API_KEY;      // optional
const RESEND_TO = process.env.RESEND_TO || "hi@critlabs.com"; // optional

export async function POST(req: Request) {
  try {
    const body = await req.json(); // { type: "creator", data: {...} }
    // Basic shape guard
    if (!body?.type || !body?.data) {
      return NextResponse.json({ ok: false, error: "Bad payload" }, { status: 400 });
    }

    // Always log to server logs (visible in `npm run dev` and Vercel logs)
    console.log("Lead received:", body);

    // Optional email via Resend
    if (RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "CRIT Website <noreply@critlabs.com>",
          to: [RESEND_TO],
          subject: `New ${body.type} lead — ${body.data?.name || body.data?.handle || "Unknown"}`,
          text: JSON.stringify(body, null, 2),
        }),
      });
      if (!res.ok) {
        console.error("Resend error:", await res.text());
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Lead error:", err);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
