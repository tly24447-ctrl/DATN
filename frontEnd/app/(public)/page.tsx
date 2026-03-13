import CategoryCircles from "@/src/presentation/components/public/home/CategoryCircles";
import HomeBanner from "@/src/presentation/components/public/home/HomeBanner";
import ProductSection from "@/src/presentation/components/public/products/ProductSection";
import { AppProviders } from "@/src/provider/provider";
import { Constants } from "@/src/shared/constans";

export default async function Home() {
  const categories = await AppProviders.GetAllCategoriesUseCase.execute();

  // 2. Fetch Weekly Bestsellers
  // Using GetProductsByPage with page 1 and a limit of 5 for the home section
  const bestSellersResult = await AppProviders.GetProductsByPageUseCase.execute(
    Constants.PAGE, 
    5
  );

  // 3. Fetch New Arrivals (Optional, showing how to reuse the provider)
  const newArrivalsResult = await AppProviders.GetProductsByPageUseCase.execute(
    1, 
    5
  );
  return (
    <div>
      <HomeBanner />
      <CategoryCircles categories={categories} />
      <ProductSection
        title="New Arrivals"
        subtitle="Check out our latest additions to the collection."
        products={newArrivalsResult.data}
        viewAllHref="/shop?sort=trending"
      />
      <ProductSection
        title="Weekly Bestsellers"
        subtitle="Our most-loved titles this week. See what everyone is reading."
        products={bestSellersResult.data}
        viewAllHref="/shop?sort=trending"
      />
    </div>
  );
}
