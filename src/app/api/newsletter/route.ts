import { NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";

const API_KEY = process.env.MAILCHIMP_API_KEY!;
const LIST_ID = process.env.MAILCHIMP_AUDIENCE_ID!;
const DC = process.env.MAILCHIMP_DC!; // e.g., "us14"
const BASE = `https://${DC}.api.mailchimp.com/3.0`;

type NewsletterPayload = {
  email: string;
  specials?: boolean;
};

function authHeader() {
  return `Basic ${Buffer.from(`any:${API_KEY}`).toString("base64")}`;
}

async function upsertMember(email: string) {
  const hash = crypto.createHash("md5").update(email.toLowerCase()).digest("hex");
  const url = `${BASE}/lists/${LIST_ID}/members/${hash}`;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: authHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email_address: email,
      status_if_new: process.env.MAILCHIMP_DOUBLE_OPT_IN === "1" ? "pending" : "subscribed",
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Mailchimp upsert error: ${text}`);
  }
  return { hash };
}

async function addTags(hash: string, tags: string[]) {
  if (!tags.length) return;
  const url = `${BASE}/lists/${LIST_ID}/members/${hash}/tags`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: authHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tags: tags.map((name) => ({ name, status: "active" })),
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Mailchimp tag error: ${text}`);
  }
}

export async function POST(req: Request) {
  try {
    const { email, specials }: NewsletterPayload = await req.json();
    if (!email) {
      return NextResponse.json({ ok: false, error: "Email required" }, { status: 400 });
    }

    const { hash } = await upsertMember(email);
    if (specials) await addTags(hash, ["specials"]);

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Newsletter error:", message);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
