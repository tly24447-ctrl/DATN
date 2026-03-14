// ❌ REMOVED 'use client' - This must be a Server Component to use AppProviders
import { ProductEntity } from "@/src/domain/entity/product.entity";
import ProductDetails from "@/src/presentation/components/public/products/ProductDetails";
import { SuggestedProducts } from "@/src/presentation/components/public/products/SuggestedProducts";
import { AppProviders } from "@/src/provider/provider";
import { getFrequentlyBoughtTogether } from "@/src/shared/product-filter";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage({ params }: Props) {
  const { id } = await params;

  let product;
  const allOrders = await AppProviders.GetAllOrdersUseCase.execute();
  const suggestedProducts: ProductEntity[] = [];

  try {
    product = await AppProviders.GetProductUseCase.execute(id);

    if (!product) return notFound();

    const ids = getFrequentlyBoughtTogether(product._id || '', allOrders);
    console.log("ids", ids);
    for (const i of ids) {
      try {
        console.log("id", i);
        suggestedProducts.push(await AppProviders.GetProductUseCase.execute(i));
      } catch (err) {
        console.error("Data Fetching Error:", err);
      }
    }
    if (suggestedProducts.length < 10) {
      const top = await AppProviders.GetProductsByPageUseCase.execute(1, 10);
      
      for (const p of top.data.slice(0, 10 - suggestedProducts.length)) {
        suggestedProducts.push(p);
      }
    }
  } catch (error) {
    console.error("Data Fetching Error:", error);
    return notFound();
  }

  return (
    <main className="animate-in fade-in duration-500">
      {/* ✅ Removed onAddToCart. 
          The ProductDetails component (which IS a client component) 
          should handle its own clicks or use a Context/Zustand store.
      */}
      <ProductDetails product={product} />

      <div className="w-full max-w-6xl mx-auto border-t border-slate-100 mt-12 pt-8">
        <SuggestedProducts suggestions={suggestedProducts} />
      </div>
    </main>
  );
}