"use client";
import { Product } from "@/data/products";
import { useCart } from "@/store/cart";
import { motion } from "framer-motion";

export default function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);

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
        <div className="font-bold">${(product.price / 100).toFixed(2)}</div>
      </div>

      {product.channel === "amazon" && (
        <a
          href={(product as any).amazonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 w-full btn btn-primary text-center"
        >
          Buy on Amazon
        </a>
      )}

      {product.channel === "site" && (
        <button onClick={() => add(product)} className="mt-4 w-full btn btn-primary">
          Add to Cart
        </button>
      )}

      {product.channel === "comingSoon" && (
        <a href="#newsletter" className="mt-4 w-full btn btn-primary text-center">
          Get notified
        </a>
      )}
    </motion.div>
  );
}
