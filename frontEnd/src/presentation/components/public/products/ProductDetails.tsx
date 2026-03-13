'use client';

import React, { useState } from 'react';
import { ProductEntity } from '@/src/domain/entity/product.entity';
import { useCart } from '@/src/presentation/context/CartContext'; // Import the hook
import { 
  ShoppingCart, 
  Star, 
  Truck, 
  ShieldCheck, 
  BookOpen, 
  Globe, 
  Layers, 
  Building2,
  CalendarDays,
  Hash,
  Minus,
  Plus,
  Heart,
  CheckCircle2
} from 'lucide-react';
import Image from 'next/image';

interface ProductDetailsProps {
  product: ProductEntity;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart(); // Initialize the cart hook

  const hasDiscount = product.discount && product.discount > 0;
  const discountedPrice = hasDiscount 
    ? product.price * (1 - product.discount! / 100) 
    : product.price;

  const handleQuantity = (type: 'inc' | 'dec') => {
    if (type === 'inc' && quantity < product.countInStock) setQuantity(q => q + 1);
    if (type === 'dec' && quantity > 1) setQuantity(q => q - 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    
    // Provide visual feedback
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 3000);
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="container mx-auto px-4 md:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Image (Sticky) */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-100 bg-slate-50">
                {product.image ? (
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill 
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-slate-300">
                    <BookOpen size={80} />
                  </div>
                )}
                
                {hasDiscount && (
                  <div className="absolute top-6 left-6 bg-orange-500 text-white font-black px-4 py-2 rounded-lg shadow-lg">
                    SAVE {product.discount}%
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Info */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <nav className="flex text-xs font-bold text-blue-600 uppercase tracking-widest gap-2">
                <span>Shop</span> / <span>{product.format || 'Books'}</span>
              </nav>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                {product.name}
              </h1>
              <div className="flex flex-wrap items-center gap-6">
                <p className="text-xl text-slate-500 italic">by <span className="text-slate-900 font-semibold not-italic">{product.author}</span></p>
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill={i < Math.floor(product.rating || 0) ? "currentColor" : "none"} className={i < Math.floor(product.rating || 0) ? "" : "text-slate-200"} />
                  ))}
                  <span className="ml-2 text-sm font-bold text-slate-900">{product.rating}</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-wrap items-end gap-6">
              <div>
                {hasDiscount && (
                  <span className="text-lg text-slate-400 line-through font-medium block">
                    ${product.price.toLocaleString()}
                  </span>
                )}
                <span className="text-4xl font-black text-slate-900">
                  ${discountedPrice.toLocaleString()}
                </span>
              </div>
              <div className="mb-1">
                {product.countInStock > 0 ? (
                  <span className="text-xs font-bold px-3 py-1 bg-green-100 text-green-700 rounded-full">
                    IN STOCK ({product.countInStock} copies left)
                  </span>
                ) : (
                  <span className="text-xs font-bold px-3 py-1 bg-red-100 text-red-700 rounded-full">
                    OUT OF STOCK
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900">Description</h3>
              <p className="text-slate-600 leading-relaxed">
                {product.description || "No description available for this title."}
              </p>
            </div>

            {/* Add to Cart Actions */}
            <div className="flex flex-col sm:flex-row gap-4 items-center pt-4">
              <div className="flex items-center border-2 border-slate-200 rounded-xl overflow-hidden bg-white">
                <button 
                  onClick={() => handleQuantity('dec')}
                  className="p-4 hover:bg-slate-50 transition-colors"
                >
                  <Minus size={20} />
                </button>
                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                <button 
                  onClick={() => handleQuantity('inc')}
                  className="p-4 hover:bg-slate-50 transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>

              <button 
                onClick={handleAddToCart}
                disabled={product.countInStock === 0 || isAdded}
                className={`flex-1 w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95 disabled:cursor-not-allowed ${
                  isAdded 
                  ? "bg-green-600 text-white" 
                  : "bg-slate-900 text-white hover:bg-blue-600"
                }`}
              >
                {isAdded ? (
                  <>
                    <CheckCircle2 size={22} />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={22} />
                    Add to Cart — ${(discountedPrice * quantity).toLocaleString()}
                  </>
                )}
              </button>

              <button className="p-4 border-2 border-slate-200 rounded-xl hover:bg-red-50 hover:border-red-100 hover:text-red-500 transition-all">
                <Heart size={22} />
              </button>
            </div>

            {/* Technical Specifications Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4 pt-8 border-t border-slate-100">
              <div className="flex items-start gap-3">
                <Building2 className="text-slate-400" size={20} />
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Publisher</p>
                  <p className="text-sm font-semibold text-slate-700">{product.publisher || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CalendarDays className="text-slate-400" size={20} />
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Published</p>
                  <p className="text-sm font-semibold text-slate-700">
                    {product.publicationDate ? new Date(product.publicationDate).getFullYear() : 'N/A'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Hash className="text-slate-400" size={20} />
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">ISBN-13</p>
                  <p className="text-sm font-semibold text-slate-700">{product.isbn || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Layers className="text-slate-400" size={20} />
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Pages</p>
                  <p className="text-sm font-semibold text-slate-700">{product.pageCount || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="text-slate-400" size={20} />
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Language</p>
                  <p className="text-sm font-semibold text-slate-700">{product.language || 'English'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="text-slate-400" size={20} />
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Authenticity</p>
                  <p className="text-sm font-semibold text-slate-700">100% Genuine</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50/50 rounded-2xl p-4 flex gap-4 items-center text-blue-800">
              <Truck size={24} className="text-blue-500" />
              <div className="text-sm">
                <span className="font-bold">Fast Delivery Available.</span> Orders placed before 2 PM ship the same day.
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;