// src/app/account/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { SignedIn, SignOutButton, UserProfile } from "@clerk/nextjs";

async function getSiteUrl() {
  // Works on Vercel behind proxy and locally
  const h = await headers(); // <-- await fixes the TS error
  const proto = h.get("x-forwarded-proto") ?? "https";
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  return `${proto}://${host}`;
}

const PORTAL =
  process.env.NEXT_PUBLIC_PORTAL_DOMAIN || "accounts.critlabs.shop";

export default async function AccountPage() {
  const { userId } = await auth();

  if (!userId) {
    const returnTo = encodeURIComponent(`${await getSiteUrl()}/account`);
    redirect(`https://${PORTAL}/sign-in?redirect_url=${returnTo}`);
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-black mb-6">Your Account</h1>

      <div className="rounded-2xl border border-black/10 p-4">
        <SignedIn>
          <UserProfile appearance={{ elements: { rootBox: "w-full" } }} />
        </SignedIn>
      </div>

      <div className="mt-8">
        <SignOutButton signOutOptions={{ redirectUrl: "/" }}>
          <button className="btn-ghost">Sign out</button>
        </SignOutButton>
      </div>
    </main>
  );
}
