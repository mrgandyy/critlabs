"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useCart } from "@/store/cart";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const openCart = useCart((s) => s.open);
  const items = useCart((s) => s.items);
  const count = useMemo(() => items.reduce((a, b) => a + b.quantity, 0), [items]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-black/5">
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center" onClick={closeMobile}>
            <img
              src="/logos/crit-wordmark.png"
              alt="CRIT"
              className="h-7 w-auto"
              loading="eager"
            />
          </Link>
        </div>

        {/* Center: Desktop nav */}
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <Link href="/shop" className="hover:text-mint" onClick={closeMobile}>
            Shop
          </Link>
          <Link href="/where-to-buy" className="hover:text-mint" onClick={closeMobile}>
            Where to Buy
          </Link>
          <Link href="/about" className="hover:text-mint" onClick={closeMobile}>
            About
          </Link>
          <Link href="/creators" className="hover:text-mint" onClick={closeMobile}>
            Creators
          </Link>
          <Link href="/account" className="hover:text-mint" onClick={closeMobile}>
            Account
          </Link>
        </nav>

        {/* Right: auth + cart + hamburger */}
        <div className="flex items-center gap-3">
          {/* Desktop auth controls */}
          <div className="hidden md:block">
            <SignedOut>
              {/* Use modal and send users to /account once signed in */}
              <SignInButton mode="modal" fallbackRedirectUrl="/account">
                <button className="rounded-full border border-black/10 px-4 py-2 text-sm hover:border-mint">
                  Sign in
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton
              appearance={{ elements: { avatarBox: "h-8 w-8" } }}
              userProfileMode="navigation"
              userProfileUrl="/account"
            />

            </SignedIn>
          </div>

          {/* Cart button */}
          <button
            onClick={openCart}
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

          {/* Mobile hamburger */}
          <button
            className="md:hidden rounded-full border border-black/10 p-2 hover:border-mint"
            aria-label="Open menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="i-[hamburger]" aria-hidden />
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      {mobileOpen && (
        <div className="md:hidden border-t border-black/5 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-3 text-sm">
            <Link href="/shop" className="py-2 hover:text-mint" onClick={closeMobile}>
              Shop
            </Link>
            <Link href="/where-to-buy" className="py-2 hover:text-mint" onClick={closeMobile}>
              Where to Buy
            </Link>
            <Link href="/about" className="py-2 hover:text-mint" onClick={closeMobile}>
              About
            </Link>
            <Link href="/creators" className="py-2 hover:text-mint" onClick={closeMobile}>
              Creators
            </Link>
            <Link href="/account" className="py-2 hover:text-mint" onClick={closeMobile}>
              Account
            </Link>

            {/* Mobile auth */}
            <div className="pt-2">
              <SignedOut>
                {/* SECOND occurrence fixed: redirectUrl -> fallbackRedirectUrl */}
                <SignInButton mode="modal" fallbackRedirectUrl="/account">
                  <button className="w-full rounded-full border border-black/10 px-4 py-2 text-sm hover:border-mint">
                    Sign in
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <div className="flex items-center gap-3">
                  <UserButton
                  appearance={{ elements: { avatarBox: "h-8 w-8" } }}
                  userProfileMode="navigation"
                  userProfileUrl="/account"
                />

                  <Link href="/account" onClick={closeMobile} className="hover:text-mint">
                    Manage account
                  </Link>
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
