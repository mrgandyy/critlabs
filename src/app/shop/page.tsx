import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import CartDrawer from "@/components/CartDrawer";

export default function Shop(){
  return (
    <>
      <CartDrawer />
      <div className="mx-auto max-w-7xl px-4 py-16">
        <h1 className="text-4xl font-black mb-6">Shop CRIT Fuel</h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </>
  )
}
