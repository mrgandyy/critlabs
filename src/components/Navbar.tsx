"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/store/cart";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const open = useCart((s) => s.open);
  const items = useCart((s) => s.items);
  const count = items.reduce((a, b) => a + b.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white/75 backdrop-blur border-b border-black/5">
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logos/crit-wordmark.png" alt="CRIT" className="h-7 w-auto" />
        </Link>

        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <Link href="/shop" className="hover:text-mint">Shop</Link>
          <Link href="/where-to-buy" className="hover:text-mint">Where to Buy</Link>
          <Link href="/about" className="hover:text-mint">About</Link>
          <Link href="/creators" className="hover:text-mint">Creators</Link>
          <Link href="/account" className="hover:text-mint">Account</Link>
        </nav>

        <div className="flex items-center gap-3">
          <SignedOut>
            <Link
              href="/sign-in"
              className="hidden md:inline rounded-full border border-black/10 px-4 py-2 text-sm hover:border-mint"
            >
              Sign in
            </Link>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{ elements: { avatarBox: "h-8 w-8" } }}
              userProfileMode="navigation"
              userProfileUrl="/account"     // ✅ required when using "navigation" mode
              afterSignOutUrl="/"           // optional, nice to have
            />
          </SignedIn>

          <button
            onClick={open}
            className="relative inline-flex items-center gap-2 rounded-full px-4 py-2 border border-black/10 hover:border-mint transition"
            aria-label="Open cart"
          >
            <span className="text-sm">Cart</span>
            <motion.span
              key={count}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="grid place-items-center h-6 w-6 rounded-full bg-mint text-carbon text-xs font-bold"
            >
              {count}
            </motion.span>
          </button>
        </div>
      </div>
    </header>
  );
}
