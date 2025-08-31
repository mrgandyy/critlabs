import { FadeIn } from "../Motion";

const items = [
  { title: "Focus Stack", body: "L-Tyrosine + TeaCrine® for calm, dialed-in flicks." },
  { title: "Sustained Energy", body: "Natural caffeine + L-Theanine for smooth lift, no crash." },
  { title: "Clean Labels", body: "No sugar. No artificial dyes. Transparent dosing." },
];

export default function Features() {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-7xl px-4 grid gap-6 md:grid-cols-3">
        {items.map((it, i) => (
          <FadeIn key={it.title} delay={i * 0.08}>
            <div className="card p-6 hover:-translate-y-[2px] transition">
              <h3>{it.title}</h3>
              <p className="opacity-75 mt-2">{it.body}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
