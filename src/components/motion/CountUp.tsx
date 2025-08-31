"use client";
import { motion, useMotionValue, useTransform, animate, useMotionValueEvent } from "framer-motion";
import { useEffect, useState } from "react";

export default function CountUp({
  from = 0,
  to,
  suffix = "",
  duration = 1.4,
  className = "",
}: {
  from?: number;
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const mv = useMotionValue(from);
  const rounded = useTransform(mv, (v) => Math.round(v));
  const [display, setDisplay] = useState<number>(from);

  useEffect(() => {
    const controls = animate(mv, to, { duration, ease: "easeOut" });
    return () => controls.stop();
  }, [to, duration, mv]);

  // Keep local state in sync with the animated MotionValue
  useMotionValueEvent(rounded, "change", (v) => setDisplay(v));

  return (
    <motion.span className={className}>
      {display}
      {suffix}
    </motion.span>
  );
}
