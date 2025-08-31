// src/app/account/page.tsx  (SERVER)
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AccountClient from "./profile-client";

const PORTAL =
  process.env.NEXT_PUBLIC_PORTAL_DOMAIN || "accounts.critlabs.shop";
const SITE =
  process.env.NEXT_PUBLIC_SITE_URL || "https://critlabs.shop";

export default async function AccountPage() {
  const { userId } = await auth();

  // Not signed in? Send them to the hosted Clerk portal and back to /account.
  if (!userId) {
    const returnTo = encodeURIComponent(`${SITE}/account`);
    redirect(`https://${PORTAL}/sign-in?redirect_url=${returnTo}`);
  }

  // Signed in — render the client UI
  return <AccountClient />;
}
