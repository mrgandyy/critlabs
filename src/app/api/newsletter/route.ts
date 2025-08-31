import { NextResponse } from "next/server";
import crypto from "crypto";

const API_KEY = process.env.MAILCHIMP_API_KEY!;
const LIST_ID = process.env.MAILCHIMP_AUDIENCE_ID!;
const DC = process.env.MAILCHIMP_DC!; // e.g., "us21"
const BASE = `https://${DC}.api.mailchimp.com/3.0`;

function authHeader() {
  // Mailchimp uses HTTP Basic with any user and the API key as the password
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
    // Next.js: revalidate or cache off by default in route handlers
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
    const { email, specials } = await req.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json({ ok: false, error: "Email required" }, { status: 400 });
    }

    const { hash } = await upsertMember(email);
    if (specials) await addTags(hash, ["specials"]);

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("Newsletter error:", e?.message || e);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
