"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Zap, Target, ShieldCheck, FlaskConical, Trophy, Sparkles, Droplet } from "lucide-react";
import React from "react";

const fade = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function AboutContent() {
  return (
    <main className="container-site">
      {/* HERO */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(56,255,201,0.14),transparent_35%),radial-gradient(ellipse_at_bottom_left,rgba(125,249,255,0.12),transparent_35%)]" />
        <div className="grid items-center gap-10 md:grid-cols-2">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight">Built for the clutch.</h1>
            <p className="mt-4 text-lg opacity-80">
              We started CRIT to make gaming supplements that actually respect players—clean energy, dialed focus, and
              transparent labels. No sugar, no dyes, no fluff. Just performance you can feel.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="badge">0g Sugar</span>
              <span className="badge">Transparent dosing</span>
              <span className="badge">Creator-first</span>
            </div>
          </motion.div>

          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative aspect-square w-full rounded-2xl border border-black/10 bg-white shadow-soft"
          >
            <Image src="/about/lab-hero.jpg" alt="CRIT lab & product" fill className="object-cover" priority />
            <div className="absolute right-4 top-4 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold shadow-card backdrop-blur">
              <span className="inline-flex items-center gap-1"><Sparkles className="h-3.5 w-3.5"/> Mint Bolt™</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-black">Our Pillars</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Card icon={<Zap />} title="Clean Energy">Natural caffeine + aminos for smooth lift—without the junk.</Card>
          <Card icon={<Target />} title="Dialed Focus">Designed for clarity & reaction time when it’s sweaty.</Card>
          <Card icon={<ShieldCheck />} title="Transparent Labels">No prop blends. You deserve to know what’s inside.</Card>
        </div>
      </section>

      {/* WHY CRIT */}
      <section className="py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-black">Why CRIT?</h2>
            <p className="mt-4 opacity-80">
              We were tired of sugar bombs and mystery blends. CRIT launched with one goal: products we’d actually use
              on ranked night—no crash, no jitters, and flavor that slaps.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-start gap-2"><FlaskConical className="mt-0.5 h-4 w-4 text-mint"/> Evidence-informed formulas</li>
              <li className="flex items-start gap-2"><Droplet className="mt-0.5 h-4 w-4 text-mint"/> No artificial dyes</li>
              <li className="flex items-start gap-2"><Trophy className="mt-0.5 h-4 w-4 text-mint"/> Built with creators & competitors</li>
            </ul>
          </motion.div>

          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative h-72 md:h-full rounded-2xl border border-black/10 bg-white shadow-soft"
          >
            <Image src="/about/team.jpg" alt="Founders and creators" fill className="object-cover" />
          </motion.div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-black">From scrim to shelf</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-4">
          <Milestone k="2024" t="Idea" d="Prototype flavors after late-night ranked." />
          <Milestone k="2025 Q1" t="Brand" d="CRIT name, mint bolt, and clean look lock in." />
          <Milestone k="2025 Q3" t="Site" d="critlabs.store goes live with creator program." />
          <Milestone k="Soon" t="Retail/Amazon" d="Rollout with trackable creator links." />
        </div>
      </section>

      {/* CREATOR CTA */}
      <section className="py-12 md:py-16">
        <div className="grid items-center gap-8 rounded-2xl border border-black/10 bg-white p-6 shadow-soft md:grid-cols-[1.2fr_1fr]">
          <div>
            <h3 className="text-2xl font-black">Creators: let’s build with you, not on you.</h3>
            <p className="mt-2 opacity-80">
              Earn on every sale with transparent attribution, early drops, and input on flavors and merch.
            </p>
            <div className="mt-5 flex gap-3">
              <a href="/creators" className="btn btn-primary">Join the Creator Program</a>
              <a href="/where-to-buy" className="btn btn-ghost">Where to Buy</a>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <Stat n="0g" l="Sugar" />
            <Stat n="3+" l="Pilot flavors" />
            <Stat n="100%" l="Transparent labels" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-black">FAQ</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <FAQ q="Is CRIT sugar-free?" a="Yes—formulated without sugar or artificial dyes." />
          <FAQ q="When can I buy?" a="Amazon rollout is coming soon; join the newsletter for drops." />
          <FAQ q="Is it third-party tested?" a="We publish labels transparently; third-party testing is on the roadmap." />
          <FAQ q="Do you work with teams?" a="Yes—reach out via the Creator Program for partner tiers." />
        </div>
      </section>
    </main>
  );
}

function Card({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="card p-5"
    >
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10">
        {icon}
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 text-sm opacity-80">{children}</p>
    </motion.div>
  );
}

function Milestone({ k, t, d }: { k: string; t: string; d: string }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-soft">
      <div className="text-xs font-semibold tracking-wide opacity-60">{k}</div>
      <div className="mt-1 font-semibold">{t}</div>
      <div className="text-sm opacity-80">{d}</div>
    </div>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="rounded-xl border border-black/10 p-4">
      <div className="text-2xl font-black">{n}</div>
      <div className="text-xs opacity-70">{l}</div>
    </div>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <details className="rounded-xl border border-black/10 p-4">
      <summary className="cursor-pointer list-none">
        <span className="font-semibold">{q}</span>
      </summary>
      <p className="mt-2 text-sm opacity-80">{a}</p>
    </details>
  );
}
