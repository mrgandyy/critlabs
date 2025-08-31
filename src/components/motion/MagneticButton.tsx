"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import type { HTMLMotionProps } from "framer-motion";
import type React from "react";

type Props = Omit<HTMLMotionProps<"button">, "ref" | "onDrag"> & {
  className?: string;
  children: React.ReactNode;
};

export default function MagneticButton({ children, className = "", ...props }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 14 });
  const sy = useSpring(y, { stiffness: 120, damping: 14 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`rounded-2xl bg-mint text-carbon font-semibold px-6 py-3 shadow-soft ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
