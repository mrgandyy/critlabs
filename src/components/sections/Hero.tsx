"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* soft mint/cyan glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-20 h-80 w-80 rounded-full blur-3xl bg-mint/20" />
        <div className="absolute -bottom-28 -right-24 h-96 w-96 rounded-full blur-3xl bg-cyan/20" />
      </div>

      <div className="mx-auto max-w-7xl px-4 grid gap-12 md:grid-cols-2 items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Hit Your Mark.<br /><span className="text-mint">Every Round.</span>
          </motion.h1>
          <p className="mt-5 text-lg opacity-80">
            CRIT Fuel is clean energy + focus for gamers. Zero sugar, no crash{"\u2014"}just clutch.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/shop" className="btn btn-primary">Shop CRIT Fuel</Link>
            <a href="#science" className="btn btn-ghost">The Science</a>
          </div>
          <div className="mt-6 flex items-center gap-3 text-sm">
            <span className="badge">Zero Sugar</span>
            <span className="badge">Clinically Dosed</span>
            <span className="badge">No Jitters</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card p-6"
        >
          <img src="/products/hero-tub.png" alt="CRIT Fuel tub" className="w-full h-auto rounded-xl" />
        </motion.div>
      </div>
    </section>
  );
}
