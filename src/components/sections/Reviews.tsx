export default function Reviews(){
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h3 className="text-2xl font-black mb-6">Players are switching to CRIT</h3>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["“Aim locked.”","@xNOLAG"],
            ["“No crash—finally.”","@fragmama"],
            ["“Clutch in OT.”","@topfrag_21"],
          ].map(([q, h])=>(
            <div key={h} className="rounded-2xl border border-black/10 p-6 bg-white shadow-soft">
              <p className="text-lg">{q}</p>
              <p className="opacity-60 text-sm mt-3">{h}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
