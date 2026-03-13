'use client';

import { useCart } from '@/src/presentation/context/CartContext';
import { ArrowRight, CreditCard, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Page = () => {
  const { cart, removeFromCart, updateAmount, cartTotal, cartCount } = useCart();

  if (cartCount === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6 px-4">
        <div className="bg-slate-50 p-8 rounded-full">
          <ShoppingBag size={64} className="text-slate-300" />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-black text-slate-900">Your cart is empty</h2>
          <p className="text-slate-500 mt-2">Looks like you haven&apos;t added any books yet.</p>
        </div>
        <Link 
          href="/shop" 
          className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2"
        >
          Browse Books <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
          Your Cart <span className="text-indigo-600">({cartCount})</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: List of Items */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => {
              const itemPrice = item.discount 
                ? item.price * (1 - item.discount / 100) 
                : item.price;

              return (
                <div 
                  key={item.productId} 
                  className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 flex gap-4 md:gap-6 items-center"
                >
                  {/* Book Image */}
                  <div className="relative h-24 w-16 md:h-32 md:w-24 flex-shrink-0 rounded-lg overflow-hidden shadow-md">
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      fill 
                      className="object-cover" 
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-slate-900 truncate">{item.name}</h3>
                    <p className="text-sm text-slate-500 mb-4">Digital/Physical Copy</p>
                    
                    <div className="flex items-center gap-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                        <button 
                          onClick={() => updateAmount(item.productId, Math.max(1, item.amount - 1))}
                          className="p-1 md:p-2 hover:text-indigo-600 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-bold text-sm">{item.amount}</span>
                        <button 
                          onClick={() => updateAmount(item.productId, item.amount + 1)}
                          className="p-1 md:p-2 hover:text-indigo-600 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <button 
                        onClick={() => removeFromCart(item.productId)}
                        className="text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1 text-xs font-bold uppercase tracking-wider"
                      >
                        <Trash2 size={14} /> Remove
                      </button>
                    </div>
                  </div>

                  {/* Price info */}
                  <div className="text-right">
                    <p className="text-lg font-black text-slate-900">
                      ${(itemPrice * item.amount).toLocaleString()}
                    </p>
                    {item.discount && (
                      <p className="text-xs text-orange-500 font-bold">
                        {item.discount}% Off
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 sticky top-24">
              <h2 className="text-xl font-black text-slate-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-500 font-medium">
                  <span>Subtotal</span>
                  <span className="text-slate-900">${cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-500 font-medium">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold uppercase text-xs">Free</span>
                </div>
                <div className="pt-4 border-t border-slate-100 flex justify-between items-end">
                  <span className="font-bold text-slate-900 text-lg">Total</span>
                  <div className="text-right">
                    <p className="text-3xl font-black text-indigo-600">
                      ${cartTotal.toLocaleString()}
                    </p>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Taxes included</p>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-indigo-600 transition-all shadow-lg active:scale-95 mb-4"
              >
                <CreditCard size={20} /> Checkout Now
              </Link>

              <div className="bg-indigo-50 p-4 rounded-xl flex items-start gap-3">
                <div className="bg-white p-1 rounded-md shadow-sm">
                  <ShoppingBag size={16} className="text-indigo-600" />
                </div>
                <p className="text-[11px] text-indigo-700 leading-relaxed">
                  <strong>Safe & Secure Shopping.</strong> Your literary treasures will be packaged with care and shipped immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;