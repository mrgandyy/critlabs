export type SalesChannel = "site" | "amazon";

export type Product = {
  id: string;
  name: string;
  price: number;           // cents (only used for "site" channel)
  flavor: string;
  image: string;
  channel: SalesChannel;   // <— new
  amazonUrl?: string;      // <— new (full URL to your ASIN or Brand Store PDP)
};

const ATTRIB = process.env.NEXT_PUBLIC_AMAZON_ATTR_TAG || ""; // e.g. "critlabs-20"

const withAttrib = (url: string) => {
  if (!ATTRIB) return url;
  const u = new URL(url);
  // append tag param for Associates / Attribution links if provided
  if (!u.searchParams.has("tag")) u.searchParams.set("tag", ATTRIB);
  return u.toString();
};

export const products: Product[] = [
  {
    id: "crit-fuel-neon-freeze",
    name: "CRIT Fuel — Neon Freeze",
    price: 3999,
    flavor: "Mint Citrus",
    image: "/products/neon-freeze.png",
    channel: "amazon",
    amazonUrl: withAttrib("https://www.amazon.com/dp/REPLACE_ASIN_NEON"),
  },
  {
    id: "crit-fuel-berry-aim",
    name: "CRIT Fuel — Berry Aim",
    price: 3999,
    flavor: "Berry Blend",
    image: "/products/berry-aim.png",
    channel: "amazon",
    amazonUrl: withAttrib("https://www.amazon.com/dp/REPLACE_ASIN_BERRY"),
  },
  // keep any non-Amazon items as channel: "site"
];
