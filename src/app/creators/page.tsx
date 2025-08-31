import CreatorForm from "@/components/forms/CreatorForm";

export const metadata = {
  title: "Creator Program — CRIT",
  description: "Apply to the CRIT Creator Program—affiliate payouts, drops, and early access.",
};

export default function CreatorsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 space-y-6">
      <h1 className="text-4xl font-black">Creator Program</h1>
      <p className="opacity-80">
        Partner with CRIT. Get a personal code, affiliate payouts, and early access to drops.
      </p>
      <CreatorForm />
      <div className="text-sm opacity-60">
        Payouts via monthly affiliate statements. We review for brand fit and region coverage.
      </div>
    </div>
  );
}
