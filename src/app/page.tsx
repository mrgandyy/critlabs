import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Science from "@/components/sections/Science";
import Reviews from "@/components/sections/Reviews";
import FAQ from "@/components/sections/FAQ";
import CartDrawer from "@/components/CartDrawer";

export default function Home() {
  return (
    <>
      <CartDrawer />
      <Hero />
      <Features />
      <Science />
      <Reviews />
      <FAQ />
    </>
  );
}
