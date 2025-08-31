"use client";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [specials, setSpecials] = useState(true);
  const [ok, setOk] = useState<null | boolean>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setOk(null);

    const r = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, specials }),
    });

    setOk(r.ok);
    setLoading(false);
    if (r.ok) setEmail("");
  }

  return (
    <footer className="mt-24 border-t border-black/5">
      <div className="mx-auto max-w-7xl px-4 py-12 grid gap-8 md:grid-cols-4">
        <div>
          <img src="/logos/crit-wordmark.png" alt="CRIT" className="h-7 w-auto mb-4" />
          <p className="text-sm opacity-70">Drink your advantage{"\u2122"}.</p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-mint">About</Link></li>
            <li><Link href="/creators" className="hover:text-mint">Creators</Link></li>
            <li><Link href="/where-to-buy" className="hover:text-mint">Where to Buy</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="font-semibold mb-3">Newsletter</h4>
          <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required type="email"
              className="w-full rounded-xl border border-black/10 px-3 py-2"
              placeholder="you@email.com"
            />
            <button disabled={loading} className="rounded-xl bg-mint text-carbon px-4 font-semibold">
              {loading ? "Joining…" : "Join"}
            </button>
          </form>
          <label className="flex items-center gap-2 mt-2 text-sm opacity-80">
            <input type="checkbox" checked={specials} onChange={(e)=>setSpecials(e.target.checked)} />
            Send me **specials** & early drops
          </label>
          {ok === true && <p className="text-sm text-green-600 mt-2">You’re in!</p>}
          {ok === false && <p className="text-sm text-red-600 mt-2">Couldn’t subscribe. Try again shortly.</p>}
        </div>
      </div>
      <div className="py-6 text-center text-xs opacity-60">
        {"\u00A9"} {new Date().getFullYear()} CRIT Labs · These statements have not been evaluated by the FDA…
      </div>
    </footer>
  );
}
