'use client';

import React from 'react';
import { ProductEntity } from '@/src/domain/entity/product.entity';
import { ShoppingCart, Star, Heart, Bookmark } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/src/presentation/context/CartContext';
import { useTranslation } from '@/src/presentation/context/LanguageContext'; // Added

interface ProductCardProps {
  product: ProductEntity;
  onAddToCart?: (product: ProductEntity) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const { addToCart } = useCart();
  const { t, language } = useTranslation(); // Use translation hook
  
  // Calculate discounted price
  const hasDiscount = product.discount && product.discount > 0;
  const discountedPrice = hasDiscount 
    ? product.price * (1 - product.discount! / 100) 
    : product.price;

  // Format currency based on locale
  const formatPrice = (price: number) => {
    return language === 'vi' 
      ? `${price.toLocaleString('vi-VN')}₫` 
      : `$${(price / 25000).toFixed(2)}`; // Example conversion if needed, or just locale string
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      
      {/* Badge: Discount or Out of Stock */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {hasDiscount && (
          <span className="bg-orange-500 text-white text-[10px] font-black px-2 py-1 rounded-md shadow-sm">
            -{product.discount}%
          </span>
        )}
        {product.countInStock === 0 && (
          <span className="bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md">
            {t.product.outOfStock}
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full text-slate-400 hover:text-red-500 hover:bg-white shadow-sm transition-all opacity-0 group-hover:opacity-100">
        <Heart size={18} />
      </button>

      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <Link href={`/products/${(product as any)._id}`} className="block aspect-[3/4] relative overflow-hidden bg-slate-100">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <Bookmark size={40} className="text-slate-300" />
          </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-start gap-2">
          <div>
            <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {product.format ? (t.product as any)[product.format.toLowerCase()] : t.product.paperback}
            </p>
            <h3 className="text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-xs text-slate-500 italic line-clamp-1">
              {t.product.byAuthor} {product.author}
            </p>
          </div>
        </div>

        {/* Rating & Sales */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-amber-500">
            <Star size={12} fill="currentColor" />
            <span className="text-xs font-bold">{product.rating?.average || 0}</span>
          </div>
          <span className="text-[10px] text-slate-400 font-medium">
            {product.selled || 0} {t.product.sold}
          </span>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            {product.price != discountedPrice && (
              <span className="text-[10px] text-slate-400 line-through">
                {formatPrice(product.price)}
              </span>
            )}
            <span className="text-lg font-black text-slate-900">
              {formatPrice(discountedPrice)}
            </span>
          </div>

          <button
            disabled={product.countInStock === 0}
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, 1);
              onAddToCart?.(product);
            }}
            className="p-2.5 bg-slate-900 text-white rounded-xl hover:bg-blue-600 disabled:bg-slate-200 disabled:cursor-not-allowed transition-colors shadow-sm active:scale-90"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;