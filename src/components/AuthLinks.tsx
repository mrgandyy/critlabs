"use client";

import {
  SignedIn,
  SignedOut,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";

const PORTAL =
  process.env.NEXT_PUBLIC_PORTAL_DOMAIN || "accounts.critlabs.shop";
const SITE =
  process.env.NEXT_PUBLIC_SITE_URL || "https://critlabs.shop";

export default function AuthLinks() {
  // Where users land after sign-in/sign-up
  const returnTo = encodeURIComponent(`${SITE}/account`);

  const signInUrl = `https://${PORTAL}/sign-in?redirect_url=${returnTo}`;
  const signUpUrl = `https://${PORTAL}/sign-up?redirect_url=${returnTo}`;

  return (
    <div className="flex items-center gap-3">
      {/* When logged out */}
      <SignedOut>
        <a href={signInUrl} className="btn-ghost">Sign in</a>
        <a href={signUpUrl} className="btn-primary">Create account</a>
      </SignedOut>

      {/* When logged in */}
      <SignedIn>
        {/* Avatar with Clerk menu (Manage account) */}
        <UserButton afterSignOutUrl="/" />
        {/* Explicit Sign out button (optional but often wanted) */}
        <SignOutButton signOutOptions={{ redirectUrl: "/" }}>
          <button className="btn-ghost">Sign out</button>
        </SignOutButton>
      </SignedIn>
    </div>
  );
}
