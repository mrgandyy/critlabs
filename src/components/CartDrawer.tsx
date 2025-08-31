"use client";
import { useCart } from "@/store/cart";
import { money } from "@/lib/format";
import { products } from "@/data/products";

export default function CartDrawer(){
  const { opened, close, items, inc, dec, remove } = useCart();

  const total = items.reduce((a, i) => a + i.product.price * i.quantity, 0);

  async function checkout() {
    const lineItems = items.map(i => ({
      price: i.product.stripePriceId,
      quantity: i.quantity,
    }));
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lineItems }),
    });
    const { url } = await res.json();
    window.location.href = url;
  }

  return (
    <div className={`fixed inset-0 z-50 pointer-events-none ${opened ? "" : "hidden"}`}>
      <div className="absolute inset-0 bg-black/30 pointer-events-auto" onClick={close}/>
      <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl pointer-events-auto flex flex-col">
        <div className="p-4 border-b border-black/10 flex items-center justify-between">
          <h3 className="font-bold">Your Cart</h3>
          <button onClick={close} className="text-sm opacity-70 hover:opacity-100">Close</button>
        </div>
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {items.length === 0 && <p className="opacity-60">Your cart is empty.</p>}
          {items.map(i => (
            <div key={i.product.id} className="flex gap-3 items-center border border-black/10 rounded-xl p-3">
              <img src={i.product.image} className="h-16 w-16 rounded-md bg-neutral-50 object-contain" />
              <div className="flex-1">
                <div className="text-sm font-semibold">{i.product.name}</div>
                <div className="text-xs opacity-60">{i.product.flavor}</div>
                <div className="mt-2 flex items-center gap-2">
                  <button onClick={()=>dec(i.product.id)} className="px-2 rounded border">-</button>
                  <span className="w-6 text-center">{i.quantity}</span>
                  <button onClick={()=>inc(i.product.id)} className="px-2 rounded border">+</button>
                </div>
              </div>
              <div className="text-sm font-semibold">{money(i.product.price*i.quantity)}</div>
              <button onClick={()=>remove(i.product.id)} className="text-xs opacity-60 hover:opacity-100">Remove</button>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-black/10">
          <div className="flex items-center justify-between mb-3">
            <span className="opacity-70 text-sm">Total</span>
            <span className="font-bold">{money(total)}</span>
          </div>
          <button
            disabled={!items.length}
            onClick={checkout}
            className="w-full rounded-xl bg-mint text-carbon py-3 font-semibold disabled:opacity-50"
          >
            Checkout
          </button>
        </div>
      </aside>
    </div>
  )
}
