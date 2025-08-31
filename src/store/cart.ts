"use client";
import { create } from "zustand";
import { Product } from "@/data/products";

type Item = { product: Product; quantity: number };
type CartState = {
  items: Item[];
  opened: boolean;
  open: () => void;
  close: () => void;
  add: (p: Product) => void;
  remove: (id: string) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  clear: () => void;
};

export const useCart = create<CartState>((set) => ({
  items: [],
  opened: false,
  open: () => set({ opened: true }),
  close: () => set({ opened: false }),
  add: (p) => set((s) => {
    const found = s.items.find((i) => i.product.id === p.id);
    if (found) return { items: s.items.map(i => i.product.id===p.id ? {...i, quantity: i.quantity+1} : i) };
    return { items: [...s.items, { product: p, quantity: 1 }] };
  }),
  remove: (id) => set((s) => ({ items: s.items.filter(i => i.product.id !== id) })),
  inc: (id) => set((s) => ({ items: s.items.map(i => i.product.id===id ? {...i, quantity: i.quantity+1} : i) })),
  dec: (id) => set((s) => ({ items: s.items.map(i => i.product.id===id ? {...i, quantity: Math.max(1, i.quantity-1)} : i) })),
  clear: () => set({ items: [] }),
}));
