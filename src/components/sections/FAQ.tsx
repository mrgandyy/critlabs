const faqs = [
  ["Is there sugar?", "No sugar. We use light natural sweetening."],
  ["When should I drink CRIT?", "15–20 minutes pre-match or for long editing sessions."],
  ["Is it third-party tested?", "Yes—every batch is tested for purity and heavy metals."],
];

export default function FAQ(){
  return (
    <section className="py-20 bg-neutral-50">
      <div className="mx-auto max-w-4xl px-4">
        <h3 className="text-2xl font-black mb-8">FAQ</h3>
        <div className="space-y-4">
          {faqs.map(([q,a]) => (
            <details key={q} className="rounded-xl border border-black/10 p-4 bg-white">
              <summary className="font-semibold cursor-pointer">{q}</summary>
              <p className="opacity-80 mt-2">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
