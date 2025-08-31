"use client";
import { motion } from "framer-motion";

export default function MintPulse({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0 rounded-full blur-2xl"
        style={{ background: "radial-gradient(circle, rgba(56,255,201,0.28), transparent 60%)" }}
        animate={{ opacity: [0.6, 0.2, 0.6], scale: [1, 1.08, 1] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative h-2 w-24 rounded-full bg-mint" />
    </div>
  );
}
