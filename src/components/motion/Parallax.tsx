"use client";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useEffect, type ReactNode } from "react";

export function Parallax({ children, strength = 20 }: { children: ReactNode; strength?: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 18 });
  const sy = useSpring(y, { stiffness: 120, damping: 18 });
  const rx = useTransform(sy, (v) => v / 20);
  const ry = useTransform(sx, (v) => -v / 20);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const { innerWidth: w, innerHeight: h } = window;
      x.set(((e.clientX - w / 2) / (w / 2)) * strength);
      y.set(((e.clientY - h / 2) / (h / 2)) * strength);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [strength, x, y]);

  const { scrollY } = useScroll();
  const float = useTransform(scrollY, [0, 600], [0, -20]);

  return <motion.div style={{ x: sx, y: sy, rotateX: rx, rotateY: ry, translateY: float }}>{children}</motion.div>;
}
