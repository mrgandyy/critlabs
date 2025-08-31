import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserProfile } from "@clerk/nextjs";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

async function getSiteOrigin() {
  const env = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (env) return env.replace(/\/$/, "");

  // ⬇️ headers() is async on your setup
  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "https";
  const host = h.get("host") ?? "localhost:3000";
  return `${proto}://${host}`;
}

const PORTAL =
  process.env.NEXT_PUBLIC_PORTAL_DOMAIN?.trim() || "accounts.critlabs.shop";

export default async function AccountPage() {
  const { userId } = await auth();

  if (!userId) {
    const origin = await getSiteOrigin(); // ⬅️ await here too
    const returnTo = encodeURIComponent(`${origin}/account`);
    redirect(`https://${PORTAL}/sign-in?redirect_url=${returnTo}`);
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-black mb-6">Your Account</h1>
      <div className="rounded-2xl border border-black/10 p-4">
        <UserProfile appearance={{ elements: { rootBox: "w-full" } }} />
      </div>
    </main>
  );
}
