"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product, ProductAmazon, ProductSite } from "@/data/products";
import { useCart } from "@/store/cart";

function isSite(p: Product): p is ProductSite { return p.channel === "site"; }
function isAmazon(p: Product): p is ProductAmazon { return p.channel === "amazon"; }
function money(cents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Math.max(0, Math.round(cents)) / 100);
}

export default function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const [src, setSrc] = useState(product.image);
  const onErr = (_e: React.SyntheticEvent<HTMLImageElement>) => setSrc("/logos/crit-wordmark.png");

  return (
    <div className="group card p-4 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(56,255,201,0.12)]">
      <div className="aspect-square overflow-hidden rounded-xl bg-neutral-50 grid place-items-center">
        <Image
          src={src}
          alt={product.name}
          width={800}
          height={800}
          className="h-full w-full object-contain"
          onError={onErr}
        />
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <div>
          <h4 className="font-semibold">{product.name}</h4>
          {"flavor" in product && product.flavor ? <p className="text-sm opacity-60">{product.flavor}</p> : null}
        </div>
        {isAmazon(product) ? <div className="text-xs opacity-60">Amazon</div> : <div className="font-bold">{money(product.price)}</div>}
      </div>

      {isAmazon(product) ? (
        <a
          href={product.amazonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 w-full btn btn-primary text-center"
        >
          Buy on Amazon <span className="ml-1 opacity-0 transition group-hover:opacity-100">→</span>
        </a>
      ) : (
        <button onClick={() => add(product)} className="mt-4 w-full btn btn-primary">
          Add to Cart <span className="ml-1 opacity-0 transition group-hover:opacity-100">+</span>
        </button>
      )}
    </div>
  );
}
