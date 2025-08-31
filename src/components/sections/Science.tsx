export default function Science() {
  return (
    <section id="science" className="py-20 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 grid gap-12 md:grid-cols-2 items-center">
        <div>
          <h2>Formulated for clutch.</h2>
          <p className="mt-4 opacity-80">
            We blend evidence-based nootropics with hydration and electrolytes. Every scoop is third-party tested.
          </p>
          <ul className="mt-6 space-y-2 text-sm opacity-80">
            <li>• 3g L-Tyrosine</li>
            <li>• 200mg Natural Caffeine + 100mg L-Theanine</li>
            <li>• 1g Taurine · 1g Citrulline</li>
            <li>• Electrolytes: Na/K/Mg for long sessions</li>
          </ul>
        </div>
        <div className="card p-6">
          <img src="/products/facts-panel.png" alt="Supplement facts" className="w-full rounded-xl" />
        </div>
      </div>
    </section>
  );
}
