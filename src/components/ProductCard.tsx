"use client";
import { Product } from "@/data/products";
import { money } from "@/lib/format";
import { useCart } from "@/store/cart";
import { motion } from "framer-motion";

export default function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const isAmazon = product.channel === "amazon";

  return (
    <motion.div whileHover={{ y: -4 }} className="card p-4">
      <div className="aspect-square overflow-hidden rounded-xl bg-neutral-50">
        <img src={product.image} alt={product.name} className="h-full w-full object-contain" />
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <div>
          <h4 className="font-semibold">{product.name}</h4>
          <p className="text-sm opacity-60">{product.flavor}</p>
        </div>
        {isAmazon ? (
          <div className="text-xs opacity-60">Amazon</div>
        ) : (
          <div className="font-bold">{money(product.price)}</div>
        )}
      </div>

      {isAmazon ? (
        <a
          href={product.amazonUrl!}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 w-full btn btn-primary text-center"
        >
          Buy on Amazon
        </a>
      ) : (
        <button onClick={() => add(product)} className="mt-4 w-full btn btn-primary">
          Add to Cart
        </button>
      )}
    </motion.div>
  );
}
