// src/shared/utils/product-filter.ts
import { ProductEntity } from "@/src/domain/entity/product.entity";

export const filterProducts = (
  products: ProductEntity[],
  filters: {
    category?: string;
    selectedFormats: string[];
    min: number;
    max: number;
    q?: string;
  }
) => {
  let filtered = [...products];

  if (filters.q) {
    const s = filters.q.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(s) || p.author.toLowerCase().includes(s));
  }

  if (filters.category) {
    filtered = filtered.filter(p => String(p.categoryId) === filters.category || String(p._id) === filters.category);
  }

  if (filters.selectedFormats.length > 0) {
    filtered = filtered.filter(p => p.format && filters.selectedFormats.includes(p.format));
  }

  filtered = filtered.filter(p => {
    const finalPrice = p.discount ? p.price * (1 - p.discount / 100) : p.price;
    return finalPrice >= filters.min && finalPrice <= filters.max;
  });

  return filtered;
};