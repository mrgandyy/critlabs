// src/app/account/profile-client.tsx  (CLIENT)
"use client";

import { UserProfile, SignOutButton, SignedIn } from "@clerk/nextjs";

export default function AccountClient() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-black mb-6">Your Account</h1>

      <div className="rounded-2xl border border-black/10 p-4">
        <SignedIn>
          <UserProfile
            routing="path"
            path="/account"
            appearance={{ elements: { rootBox: "w-full" } }}
          />
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
