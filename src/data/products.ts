export type SalesChannel = "site" | "amazon" | "comingSoon";

export type ProductSite = {
  id: string;
  name: string;
  price: number;
  flavor: string;
  image: string;
  channel: "site";
  stripePriceId: string;
};

export type ProductAmazon = {
  id: string;
  name: string;
  price: number;
  flavor: string;
  image: string;
  channel: "amazon";
  amazonUrl: string;
};

export type ProductComingSoon = {
  id: string;
  name: string;
  price: number;
  flavor: string;
  image: string;
  channel: "comingSoon";
};

export type Product = ProductSite | ProductAmazon | ProductComingSoon;

// (keep your existing ATTRIB + withAttrib if you like)

// Example products (switch yours to "comingSoon" for now)
export const products: Product[] = [
  {
    id: "crit-fuel-neon-freeze",
    name: "CRIT Fuel — Neon Freeze",
    price: 3999,
    flavor: "Mint Citrus",
    image: "/products/neon-freeze.png",
    channel: "comingSoon",
  },
  {
    id: "crit-fuel-berry-aim",
    name: "CRIT Fuel — Berry Aim",
    price: 3999,
    flavor: "Berry Blend",
    image: "/products/berry-aim.png",
    channel: "comingSoon",
  },
];
