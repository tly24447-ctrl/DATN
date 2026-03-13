'use client';

import { OrderEntity } from '@/src/domain/entity/order.entity';
import { getMyOrdersAction } from '@/src/presentation/action/order.action';
import { useAuth } from '@/src/presentation/hooks/useAuth';
import {
  CheckCircle2,
  ChevronRight,
  Clock,
  CreditCard,
  Loader2,
  Package,
  ShoppingBag
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const OrderStatusBadge = ({ order }: { order: OrderEntity }) => {
  if (order.isDelivered) {
    return (
      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border bg-emerald-50 text-emerald-700 border-emerald-100">
        <CheckCircle2 size={14} /> Delivered
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border bg-amber-50 text-amber-700 border-amber-100">
      <Clock size={14} /> {order.isPaid ? 'Processing' : 'Pending Payment'}
    </span>
  );
};

export default function Page() {
  const { currUser, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<OrderEntity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      if (currUser?._id) {
        const result = await getMyOrdersAction(currUser._id);
        if (result.success && result.data) {
          setOrders(result.data);
        }
        setLoading(false);
      }
    }
    if (!authLoading) fetchOrders();
  }, [currUser, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
        <p className="text-slate-500 font-medium">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Order History</h1>
          <p className="text-slate-500 mt-1">Manage your recent purchases and track shipments</p>
        </header>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-16 text-center">
            <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="text-slate-300" size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">No orders yet</h3>
            <p className="text-slate-500 mb-8">Looks like you haven&apos;t made any purchases yet.</p>
            <Link href="/shop" className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all">
              Go to Shop
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  {/* Header: ID and Status */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-50">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                        <Package size={24} />
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Order ID</p>
                        <p className="font-bold text-slate-900">#{order._id?.slice(-8).toUpperCase()}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <OrderStatusBadge order={order} />
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border bg-slate-50 text-slate-600">
                        <CreditCard size={14} /> {order.paymentMethod}
                      </div>
                    </div>
                  </div>

                  {/* Body: Items Preview */}
                  <div className="flex flex-col lg:flex-row justify-between gap-8">
                    <div className="flex-1 space-y-4">
                      {order.orderItems.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <div className="relative h-16 w-16 rounded-xl overflow-hidden border border-slate-100 flex-shrink-0">
                            <Image 
                              src={item.image} 
                              alt={item.name} 
                              fill 
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-slate-900 line-clamp-1">{item.name}</p>
                            <p className="text-sm text-slate-500 font-medium">
                              Qty: {item.amount} × ${item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Summary & Action */}
                    <div className="lg:w-64 bg-slate-50 rounded-2xl p-5 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-500">Subtotal</span>
                          <span className="font-semibold">${order.itemsPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-3">
                          <span className="text-slate-500">Shipping</span>
                          <span className="font-semibold">${order.shippingPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                          <span className="font-bold text-slate-900">Total</span>
                          <span className="text-xl font-black text-indigo-600">${order.totalPrice.toFixed(2)}</span>
                        </div>
                      </div>

                      <Link 
                        href={`/profile/orders/${order._id}`}
                        className="mt-4 w-full flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-900 py-2.5 rounded-xl font-bold hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all"
                      >
                        View Details
                        <ChevronRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}