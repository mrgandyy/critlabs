"use client";
import { useState } from "react";

export default function CreatorForm() {
  const [ok, setOk] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    setErr(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form) as any);

    try {
      const r = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "creator", data }),
      });
      if (!r.ok) throw new Error("Request failed");
      setOk(true);
      form.reset();
    } catch (e: any) {
      setOk(false);
      setErr("Something went wrong—try again in a minute.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-black/10 bg-white shadow-soft p-6 space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <input name="name" required placeholder="Full name" className="rounded-xl border border-black/10 px-3 py-2" />
        <input name="email" required type="email" placeholder="Email" className="rounded-xl border border-black/10 px-3 py-2" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <input name="primaryPlatform" placeholder="Primary platform (Twitch/YouTube/TikTok)" className="rounded-xl border border-black/10 px-3 py-2" />
        <input name="handle" placeholder="@handle" className="rounded-xl border border-black/10 px-3 py-2" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <input name="avgViews" placeholder="Avg. views per video/stream" className="rounded-xl border border-black/10 px-3 py-2" />
        <input name="region" placeholder="Region (US/EU/etc.)" className="rounded-xl border border-black/10 px-3 py-2" />
      </div>

      <textarea name="notes" rows={4} placeholder="Tell us about your audience + games" className="rounded-xl border border-black/10 px-3 py-2 w-full" />

      <button disabled={loading} className="inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold bg-mint text-carbon shadow-soft disabled:opacity-50">
        {loading ? "Submitting…" : "Apply"}
      </button>

      {ok && <p className="text-sm text-green-600">Got it! We’ll review and reply by email.</p>}
      {ok === false && <p className="text-sm text-red-600">{err}</p>}
    </form>
  );
}
