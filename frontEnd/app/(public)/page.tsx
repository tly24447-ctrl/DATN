import { ProductEntity } from "@/src/domain/entity/product.entity";
import CategoryCircles from "@/src/presentation/components/public/home/CategoryCircles";
import HomeBanner from "@/src/presentation/components/public/home/HomeBanner";
import ProductSection from "@/src/presentation/components/public/products/ProductSection";
import { AppProviders } from "@/src/provider/provider";

export default async function Home() {
  // 1. Fetch Categories
  const categories = await AppProviders.GetAllCategoriesUseCase.execute();

  // 2. Fetch all products for the first page to filter locally
  // Increase the limit to ensure we have enough variety to sort from
  const allProducts: ProductEntity[] = await AppProviders.GetAllProductsUseCase.execute();
  // 3. Process New Arrivals: Sort by createdAt (Newest first)
  const newArrivals = [...allProducts]
    .sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, 5);

  // 4. Process Bestsellers: Sort by selled count (Highest first)
  const bestSellers = [...allProducts]
    .sort((a, b) => (b.selled || 0) - (a.selled || 0))
    .slice(0, 5);

  return (
    <div className="bg-white min-h-screen">
      <HomeBanner />

      <CategoryCircles categories={categories} />

      <ProductSection
        title="New Arrivals"
        subtitle="Check out our latest additions to the collection."
        products={newArrivals}
        viewAllHref="/shop/new-arrivals"
      />

      <ProductSection
        title="Weekly Bestsellers"
        subtitle="Our most-loved titles this week. See what everyone is reading."
        products={bestSellers}
        viewAllHref="/shop/best-sellers"
      />
    </div>
  );
}
