"use client";

import Image from "next/image";
import { Parallax } from "@/components/motion/Parallax";
import MintPulse from "@/components/motion/MintPulse";
import MagneticButton from "@/components/motion/MagneticButton";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* animated mint glow + subtle grid */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 [background:radial-gradient(600px_circle_at_70%_20%,rgba(56,255,201,0.16),transparent_50%)] animate-pulse-slow" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,rgba(0,0,0,.8)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,.8)_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>

      <div className="container-site py-16 md:py-24 grid gap-10 md:grid-cols-2 items-center">
        {/* copy */}
        <div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight">Hit Your Mark. Every Round.</h1>
          <p className="mt-4 text-lg opacity-80">
            Clean energy + dialed focus. Zero sugar, transparent labels, and flavor that slaps.
          </p>
          <MintPulse className="mt-5" />
          <div className="mt-6 flex gap-3">
            <MagneticButton onClick={() => (window.location.href = "/shop")}>Shop CRIT</MagneticButton>
            <button className="btn btn-ghost" onClick={() => (window.location.href = "/where-to-buy")}>
              Where to Buy
            </button>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold opacity-70">
            <span>0g Sugar</span>·<span>Transparent dosing</span>·<span>Creator-first</span>
          </div>
        </div>

        {/* hero image with parallax */}
        <div className="relative aspect-square w-full">
          <Parallax strength={16}>
            <Image
              src="/products/hero-tub.png"
              alt="CRIT Fuel tub"
              width={1200}
              height={1200}
              priority
              className="h-full w-full object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.15)]"
            />
          </Parallax>
        </div>
      </div>
    </section>
  );
}
