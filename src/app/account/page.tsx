import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export const metadata = { title: "My Account — CRIT" };

export default async function Account() {
  const { userId } = auth();
  if (!userId) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-3xl font-black mb-4">My Account</h1>
        <p className="opacity-80">Please <Link className="text-mint" href="/sign-in">sign in</Link> to access your account.</p>
      </div>
    );
  }
  const user = await currentUser();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 space-y-4">
      <h1 className="text-3xl font-black">Welcome, {user?.firstName || user?.username || "Player"}.</h1>
      <p className="opacity-80">You’re signed in with {user?.primaryEmailAddress?.emailAddress}.</p>
      <p className="text-sm opacity-60">We’ll add order history here later.</p>
    </div>
  );
}
