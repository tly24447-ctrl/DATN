'use client'; // This is required to use hooks like useTranslation

import { useEffect, useState } from 'react';
import { ProductEntity } from "@/src/domain/entity/product.entity";
import CategoryCircles from "@/src/presentation/components/public/home/CategoryCircles";
import HomeBanner from "@/src/presentation/components/public/home/HomeBanner";
import ProductSection from "@/src/presentation/components/public/products/ProductSection";
import { AppProviders } from "@/src/provider/provider";
import { useTranslation } from "@/src/presentation/context/LanguageContext";
import { CategoryEntity } from '@/src/domain/entity/category.entity';

export default function Home() {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<CategoryEntity[]>([]);
  const [newArrivals, setNewArrivals] = useState<ProductEntity[]>([]);
  const [bestSellers, setBestSellers] = useState<ProductEntity[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Note: In a real production app, you'd usually call an API route 
      // here if AppProviders isn't available on the client side.
      const fetchedCats = await AppProviders.GetAllCategoriesUseCase.execute();
      const allProducts: ProductEntity[] = await AppProviders.GetAllProductsUseCase.execute();

      const arrivals = [...allProducts]
        .sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        })
        .slice(0, 5);

      const sellers = [...allProducts]
        .sort((a, b) => (b.selled || 0) - (a.selled || 0))
        .slice(0, 5);

      setCategories(fetchedCats);
      setNewArrivals(arrivals);
      setBestSellers(sellers);
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <HomeBanner />

      <CategoryCircles categories={categories} />

      <ProductSection
        title={t.home.newArrivalsTitle}
        subtitle={t.home.newArrivalsSub}
        products={newArrivals}
        viewAllHref="/shop/new-arrivals"
      />

      <ProductSection
        title={t.home.bestSellersTitle}
        subtitle={t.home.bestSellersSub}
        products={bestSellers}
        viewAllHref="/shop/best-sellers"
      />
    </div>
  );
}