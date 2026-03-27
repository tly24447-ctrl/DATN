'use client';

import { ProductEntity } from '@/src/domain/entity/product.entity';
import { useTranslation } from '@/src/presentation/context/LanguageContext';
import React from 'react';
import ProductSection from './ProductSection';

interface SuggestedProductsProps {
  suggestions: ProductEntity[];
}

export const SuggestedProducts: React.FC<SuggestedProductsProps> = ({ suggestions }) => {
  const { t } = useTranslation(); // Lấy dữ liệu ngôn ngữ hiện tại

  if (suggestions.length === 0) return null;

  return (
    <div className="mt-20 border-t border-slate-100 pt-16 bg-slate-50">
      <div className="flex flex-col items-center justify-center mb-10 text-center">
        <div>
          <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
            {t.suggestions.title}
          </h3>
          <p className="text-slate-500 mt-2 font-medium">
            {t.suggestions.subtitle}
          </p>
        </div>

        <div className="hidden md:block h-1 w-24 bg-blue-600 rounded-full mb-2 mt-4" />
      </div>

      {/* Grid hiển thị sản phẩm */}
      <ProductSection title={''} products={suggestions} viewAllHref={'#'} />
    </div>
  );
};