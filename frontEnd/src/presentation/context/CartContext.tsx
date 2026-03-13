'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { OrderItem } from '@/src/domain/entity/order.entity';
import { ProductEntity } from '@/src/domain/entity/product.entity';
import { VoucherEntity } from '@/src/domain/entity/voucher.entity';

interface CartContextType {
  cart: OrderItem[];
  addToCart: (product: ProductEntity, amount: number) => void;
  removeFromCart: (productId: string) => void;
  updateAmount: (productId: string, amount: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  voucherDiscount: number;
  appliedVoucher: VoucherEntity | null;
  applyVoucher: (voucher: VoucherEntity) => void;
  removeVoucher: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<OrderItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('bookshop_cart');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('bookshop_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: ProductEntity, amount: number) => {
    console.log(`Adding to cart: ${product.name} (x${amount})`);
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === product._id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product._id
            ? { ...item, amount: item.amount + amount }
            : item
        );
      }
      return [
        ...prev,
        {
          productId: product._id!,
          name: product.name,
          amount: amount,
          image: product.image || '',
          price: product.price,
          discount: product.discount,
        },
      ];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  const updateAmount = (productId: string, amount: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, amount } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((acc, item) => acc + item.amount, 0);

  const [appliedVoucher, setAppliedVoucher] = useState<VoucherEntity | null>(null);

  const applyVoucher = (voucher: VoucherEntity) => setAppliedVoucher(voucher);
  const removeVoucher = () => setAppliedVoucher(null);

  // Update cartTotal calculation logic:
  const total = cart.reduce((acc, item) => {
    const price = item.discount ? item.price * (1 - item.discount / 100) : item.price;
    return acc + price * item.amount;
  }, 0);

  // New: Calculate discount from voucher
  const voucherDiscount = appliedVoucher
    ? (appliedVoucher.discountType === 'percentage'
      ? (total * appliedVoucher.discountValue / 100)
      : appliedVoucher.discountValue)
    : 0;

  const finalCartTotal = Math.max(0, total - voucherDiscount);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateAmount, clearCart, cartTotal: finalCartTotal, cartCount, voucherDiscount, appliedVoucher, applyVoucher, removeVoucher }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};