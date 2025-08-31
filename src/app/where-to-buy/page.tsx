export const metadata = { title: "Where to Buy — CRIT" };

export default function WhereToBuy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 space-y-6">
      <h1 className="text-4xl font-black">Where to Buy</h1>
      <p className="opacity-80">
        Prefer Amazon? Grab CRIT Fuel with fast Prime shipping.
      </p>
      <a
        href="https://www.amazon.com/stores/YOUR_BRAND_STORE"
        target="_blank" rel="noopener noreferrer"
        className="btn btn-primary"
      >
        Visit our Amazon Store
      </a>
      <p className="text-sm opacity-60">
        Some products and limited drops are available exclusively here at critlabs.com.
      </p>
    </div>
  );
}
