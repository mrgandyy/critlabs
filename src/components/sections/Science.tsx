"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";

export default function Science() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="container-site grid md:grid-cols-[1fr_42ch] gap-10">
        {/* Sticky visual */}
        <div className="md:h-[140vh]">
          <div className="md:sticky md:top-24 rounded-2xl border border-black/10 bg-white p-4 shadow-soft">
            <div className="relative aspect-square w-full rounded-xl bg-neutral-50 overflow-hidden">
              <Image src="/products/facts-panel.png" alt="Supplement facts" fill className="object-contain" />
            </div>
          </div>
        </div>

        {/* Scrolling copy */}
        <div className="grid content-center gap-8">
          <Reveal>
            <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-soft">
              <h3 className="text-xl font-black">Focus</h3>
              <p className="mt-1 opacity-80 text-sm">
                Designed to support clarity under pressure—so your crosshair goes where you want it.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-soft">
              <h3 className="text-xl font-black">Clean Energy</h3>
              <p className="mt-1 opacity-80 text-sm">
                Smooth lift without the junk. Zero sugar, no crash—dialed for long scrims.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-soft">
              <h3 className="text-xl font-black">Hydration</h3>
              <p className="mt-1 opacity-80 text-sm">
                Electrolytes for the late-night grind. Keep reactions crisp when the round gets sweaty.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
