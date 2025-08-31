"use client";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

export default function CountUp({
  from = 0, to, suffix = "", duration = 1.4, className = "",
}: { from?: number; to: number; suffix?: string; duration?: number; className?: string }) {
  const mv = useMotionValue(from);
  const rounded = useTransform(mv, (v) => Math.round(v));
  useEffect(() => {
    const controls = animate(mv, to, { duration, ease: "easeOut" });
    return controls.stop;
  }, [to, duration, mv]);
  return <motion.span className={className}>{rounded}{suffix}</motion.span>;
}
