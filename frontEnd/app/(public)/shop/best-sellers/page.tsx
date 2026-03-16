'use client';

import { ProductEntity } from '@/src/domain/entity/product.entity';
import ProductCard from '@/src/presentation/components/public/products/ProductCard';
import { AppProviders } from '@/src/provider/provider';
import { Flame, Loader2, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function BestSellersPage() {
  const [products, setProducts] = useState<ProductEntity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        setLoading(true);
        const data = await AppProviders.GetAllProductsUseCase.execute();
        
        // Sort by 'selled' count descending
        const sorted = data
          .filter((p: ProductEntity) => (p.selled || 0) > 0) // Only show items with sales
          .sort((a: ProductEntity, b: ProductEntity) => (b.selled || 0) - (a.selled || 0));
        
        setProducts(sorted);
      } catch (error) {
        console.error("Failed to fetch best sellers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="animate-spin text-blue-600" size={40} />
        <p className="text-slate-500 font-medium">Đang tải danh sách bán chạy...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Flame className="text-orange-500" fill="currentColor" size={24} />
            <span className="text-orange-500 font-bold uppercase tracking-widest text-sm">
              Hot Trend
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900">
            Sách Bán Chạy Nhất
          </h1>
          <p className="text-slate-500 mt-2">
            Những tựa sách được yêu thích và săn đón nhất trong tháng này.
          </p>
        </div>
        
        <div className="hidden md:flex items-center gap-2 bg-amber-50 border border-amber-100 px-4 py-2 rounded-2xl">
          <Trophy className="text-amber-500" size={20} />
          <span className="font-black text-slate-900 font-semibold text-sm">
            Top {products.length} Sản phẩm
          </span>
        </div>
      </div>

      {/* Grid Section */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product, index) => (
            <div key={product._id || index} className="relative">
              {/* Optional: Ranking Badge */}
              {index < 3 && (
                <div className="absolute -top-2 -left-2 z-20 bg-white shadow-md w-8 h-8 rounded-full flex items-center justify-center border-2 border-amber-400">
                  <span className="text-xs font-black text-slate-900">#{index + 1}</span>
                </div>
              )}
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <p className="text-slate-400">Hiện chưa có dữ liệu bán chạy.</p>
        </div>
      )}
    </main>
  );
}