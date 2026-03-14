// src/shared/utils/product-filter.ts
import { ProductEntity } from "@/src/domain/entity/product.entity";
import { OrderEntity } from "../domain/entity/order.entity";

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

// Logic gợi ý dựa trên lịch sử đơn hàng
export const getFrequentlyBoughtTogether = (
  currentProductId: string,
  allOrders: OrderEntity[]
) => {
  const coOccurrenceMap = new Map<string, number>();

  allOrders
    .filter(order => order.isPaid) // Chỉ tính các đơn đã mua
    .forEach(order => {
      const itemIds = order.orderItems.map(item => item.productId);

      // Nếu đơn hàng có chứa sản phẩm hiện tại
      if (itemIds.includes(currentProductId)) {
        itemIds.forEach(id => {
          if (id !== currentProductId) {
            coOccurrenceMap.set(id, (coOccurrenceMap.get(id) || 0) + 1);
          }
        });
      }
    });

  // Sắp xếp các Product ID theo tần suất xuất hiện giảm dần
  return Array.from(coOccurrenceMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5) // Lấy top 4 gợi ý
    .map(entry => entry[0]);
};