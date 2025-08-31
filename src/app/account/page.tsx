import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const metadata = { title: "My Account — CRIT" };

export default async function Account() {
  const { userId } = await auth(); // <-- await here

  if (!userId) {
    // You can also render a message, but redirect is cleaner in prod
    redirect("/sign-in");
  }

  const user = await currentUser();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 space-y-4">
      <h1 className="text-3xl font-black">
        Welcome, {user?.firstName || user?.username || "Player"}.
      </h1>
      <p className="opacity-80">
        You’re signed in with {user?.primaryEmailAddress?.emailAddress}.
      </p>
      <p className="text-sm opacity-60">We’ll add order history here later.</p>
    </div>
  );
}
