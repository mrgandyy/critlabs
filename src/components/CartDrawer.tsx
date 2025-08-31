"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useCart } from "@/store/cart";
import type { Product, ProductSite } from "@/data/products";

export default function CartDrawer() {
  // cart store
  const opened = useCart((s) => s.opened);  // boolean in your store
  const close = useCart((s) => s.close);
  const items = useCart((s) => s.items) as { product: Product; quantity: number }[];

  // filter items that could use Stripe (onsite) — you may have none yet
  const siteItems = useMemo(
    () =>
      items.filter((i) => i.product.channel === "site") as {
        product: ProductSite;
        quantity: number;
      }[],
    [items]
  );

  // basic subtotal (cents) for display only
  const subtotal = useMemo(() => {
    return items.reduce((acc, i) => {
      const price =
        i.product.channel === "site"
          ? i.product.price
          : // Amazon items don't use onsite price; treat as 0 for subtotal
            0;
      return acc + price * i.quantity;
    }, 0);
  }, [items]);

  function money(cents: number) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
      Math.max(0, Math.round(cents)) / 100
    );
  }

  async function checkout() {
    // No onsite checkout yet — guide them to the newsletter/specials anchor on your site
    if (siteItems.length === 0) {
      window.location.href = "/#newsletter"; // make sure your Footer has id="newsletter" on the section wrapper
      return;
    }

    // If you later add onsite Stripe products, this block will work as-is:
    const lineItems = siteItems.map((i) => ({
      price: i.product.stripePriceId,
      quantity: i.quantity,
    }));

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lineItems }),
    });

    if (!res.ok) {
      console.error("Checkout not enabled or failed");
      return;
    }

    const { url } = (await res.json()) as { url: string };
    window.location.href = url;
  }

  // Don’t render the drawer at all when closed (prevents sticky overlay console note)
  if (!opened) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={close}
        aria-hidden="true"
      />

      {/* panel */}
      <aside
        className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-card flex flex-col"
        role="dialog"
        aria-label="Shopping cart"
      >
        <header className="flex items-center justify-between px-5 h-14 border-b border-black/10">
          <h3 className="text-lg font-semibold">Your Cart</h3>
          <button
            onClick={close}
            className="rounded-full border border-black/10 px-3 py-1 text-sm hover:border-mint"
            aria-label="Close cart"
          >
            Close
          </button>
        </header>

        {/* items */}
        <div className="flex-1 overflow-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-sm opacity-70">
              Your cart is empty.{" "}
              <Link href="/shop" className="text-mint underline">
                Continue shopping
              </Link>
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex gap-3 items-center rounded-xl border border-black/10 p-3"
              >
                <div className="h-16 w-16 shrink-0 rounded-lg bg-neutral-50 grid place-items-center overflow-hidden">
                  {/* keep <img> for now; add alt to satisfy a11y */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-medium leading-tight">{product.name}</div>
                  <div className="text-xs opacity-60">{("flavor" in product && product.flavor) || ""}</div>
                  <div className="text-sm opacity-60 mt-1">Qty: {quantity}</div>
                </div>
                <div className="text-sm font-semibold">
                  {product.channel === "site" ? money(product.price * quantity) : "—"}
                </div>
              </div>
            ))
          )}
        </div>

        {/* footer */}
        <footer className="border-t border-black/10 p-5 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="opacity-70">Subtotal</span>
            <span className="font-semibold">{money(subtotal)}</span>
          </div>

          <button
            onClick={checkout}
            className="w-full rounded-2xl bg-mint text-carbon font-semibold py-3 disabled:opacity-50"
            // You can disable if no onsite items; or leave enabled to route to newsletter
            // disabled={siteItems.length === 0}
            aria-label="Proceed to checkout"
          >
            {siteItems.length === 0 ? "Get Specials & Drops" : "Checkout"}
          </button>

          {siteItems.length === 0 && (
            <p className="text-xs opacity-70">
              On-site checkout isn’t enabled yet. Tap **Get Specials & Drops** to join the list and get notified
              when CRIT launches.
            </p>
          )}
        </footer>
      </aside>
    </div>
  );
}
