// ❌ REMOVED 'use client' - This must be a Server Component to use AppProviders
import ProductDetails from "@/src/presentation/components/public/products/ProductDetails";
import ProductSection from "@/src/presentation/components/public/products/ProductSection";
import { AppProviders } from "@/src/provider/provider";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage({ params }: Props) {
  const { id } = await params;

  let product;
  let relatedProducts;

  try {
    product = await AppProviders.GetProductUseCase.execute(id);

    if (!product) return notFound();

    const relatedProductsResult = await AppProviders.GetProductsByPageUseCase.execute(1, 10);
    relatedProducts = relatedProductsResult.data;

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
      <ProductDetails product={product}/>

      <div className="border-t border-slate-100 mt-12">
        <ProductSection
          title="You Might Also Like"
          subtitle="More titles that match your interests."
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          products={relatedProducts.filter((p: any) => (p.id || p._id) !== id)}
          viewAllHref="/shop"
        />
      </div>
    </main>
  );
}