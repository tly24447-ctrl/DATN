'use client';

import { OrderEntity } from '@/src/domain/entity/order.entity';
import { PaymentMethod } from '@/src/domain/entity/payment.method';
import { getOrderByIdAction } from '@/src/presentation/action/order.action';
import { VietQRModal } from '@/src/presentation/components/public/checkout/VietQRModal';
import { AppProviders } from '@/src/provider/provider';
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  Loader2,
  Package,
  Truck
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function OrderDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<OrderEntity | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [qrLoading, setQrLoading] = useState(false);
  const [qrData, setQrData] = useState<{ qrUrl: string; description: string; amount: number; orderId: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrder() {
      if (typeof id === 'string') {
        const result = await getOrderByIdAction(id);
        if (result.success && result.data) {
          setOrder(result.data);
        }
        setLoading(false);
      }
    }
    fetchOrder();
  }, [id]);

  const refreshOrder = async () => {
    if (!order?._id) return;
    const result = await getOrderByIdAction(order._id);
    if (result.success && result.data) {
      setOrder(result.data);
    }
  };

  const updateOrderStatus = async (data: Partial<OrderEntity>) => {
    if (!order?._id) return;
    setError(null);
    setStatusUpdating(true);
    try {
      await AppProviders.UpdateOrderUseCase.execute(order._id, data);
      await refreshOrder();
    } catch (updateError) {
      console.error('Order update failed:', updateError);
      setError('Failed to update order status. Please try again.');
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleGenerateQr = async () => {
    if (!order?._id) return;
    setError(null);
    setQrLoading(true);
    try {
      const qrResult = await AppProviders.GenerateQrCodeUseCase.execute(
        order._id,
        Math.round(order.totalPrice),
      );
      setQrData(qrResult);
    } catch (qrError) {
      console.error('Failed to generate VietQR code:', qrError);
      setError('Unable to generate QR payment. Please try again later.');
    } finally {
      setQrLoading(false);
    }
  };

  const handleMarkAsPaid = async () => {
    if (!order) return;
    if (order.paymentMethod === PaymentMethod.VNQR) {
      await handleGenerateQr();
      return;
    }
    await updateOrderStatus({ isPaid: true, paidAt: new Date() });
  };

  const handleMarkAsCompleted = async () => {
    await updateOrderStatus({ isDelivered: true, deliveredAt: new Date() });
  };

  const handleCancelOrder = async () => {
    await updateOrderStatus({ isCancelled: true });
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-4 bg-slate-50">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
        <p className="text-slate-500 font-medium font-bold uppercase tracking-widest text-xs">Loading Order Details</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen px-4 text-center">
        <AlertCircle size={64} className="text-red-500 mb-4" />
        <h1 className="text-2xl font-black text-slate-900">Order Not Found</h1>
        <p className="text-slate-500 mb-6">We couldn&apos;t find the order details for ID: {id}</p>
        <Link href="/profile/orders" className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold">
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to My Orders
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Order Info & Items */}
          <div className="lg:col-span-2 space-y-6">

            {/* Status Card */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
                <div>
                  <h1 className="text-2xl font-black text-slate-900 mb-1">Order Details</h1>
                  <p className="text-slate-400 font-medium text-sm">Order ID: <span className="text-slate-900 uppercase font-bold">{order._id}</span></p>
                </div>
                <div className={`px-4 py-2 rounded-2xl border font-black text-xs uppercase tracking-widest flex items-center gap-2 ${order.isCancelled ? 'bg-red-50 border-red-100 text-red-600' : order.isDelivered ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-amber-50 border-amber-100 text-amber-600'
                  }`}>
                  {order.isCancelled ? <AlertCircle size={16} /> : order.isDelivered ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                  {order.isCancelled ? 'Cancelled' : order.isDelivered ? 'Delivered' : 'In Transit'}
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-6">
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Package size={20} className="text-indigo-600" />
                  Package Items ({order.orderItems.length})
                </h3>
                <div className="divide-y divide-slate-50">
                  {order.orderItems.map((item, idx) => (
                    <div key={idx} className="py-4 flex items-center gap-4 first:pt-0 last:pb-0">
                      <div className="relative h-20 w-20 rounded-2xl overflow-hidden border border-slate-100 flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-slate-900">{item.name}</p>
                        <p className="text-sm text-slate-500 font-medium">Qty: {item.amount}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-slate-900">${(item.price * item.amount).toFixed(2)}</p>
                        <p className="text-xs text-slate-400">${item.price.toFixed(2)} / unit</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Timeline / Progress */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                <Truck size={20} className="text-indigo-600" />
                Shipping Updates
              </h3>
              <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
                <div className="relative pl-8">
                  <p className="font-bold text-slate-900">{order.isCancelled ? 'Order Cancelled' : 'Order Delivered'}</p>
                  <p className="text-sm text-slate-500">
                    {order.isCancelled
                      ? 'This order has been cancelled and will not be processed.'
                      : order.deliveredAt
                        ? new Date(order.deliveredAt).toLocaleString()
                        : 'Not yet delivered'}
                  </p>
                </div>
                <div className="relative pl-8">
                  {/* <div className={`absolute left-0 top-1 h-6 w-6 rounded-full border-4 border-white shadow-sm z-10 ${order.isPaid ? 'bg-emerald-500' : 'bg-slate-200'}`} /> */}
                  <p className="font-bold text-slate-900">Payment Confirmed</p>
                  <p className="text-sm text-slate-500">
                    {order.paidAt ? new Date(order.paidAt).toLocaleString() : 'Waiting for payment confirmation'}
                  </p>
                </div>
                <div className="relative pl-8">
                  {/* <div className="absolute left-0 top-1 h-6 w-6 rounded-full bg-emerald-500 border-4 border-white shadow-sm z-10" /> */}
                  <p className="font-bold text-slate-900">Order Placed</p>
                  <p className="text-sm text-slate-500">
                    {order.createdAt ? new Date(order.createdAt).toLocaleString() : 'Just now'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column: Order Summary, Payment Info & Order Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                Order Actions
              </h3>
              {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

              <div className="space-y-4">
                {!order.isCancelled && !order.isPaid && (
                  <button
                    onClick={handleMarkAsPaid}
                    disabled={statusUpdating || qrLoading}
                    className="w-full px-5 py-3 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {order.paymentMethod === PaymentMethod.VNQR ? 'Pay with VietQR' : 'Mark as Paid'}
                  </button>
                )}

                {!order.isCancelled && order.isPaid && !order.isDelivered && (
                  <button
                    onClick={handleMarkAsCompleted}
                    disabled={statusUpdating}
                    className="w-full px-5 py-3 rounded-2xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {statusUpdating ? 'Updating...' : 'Mark as Completed'}
                  </button>
                )}

                {!order.isCancelled && !order.isDelivered && (
                  <button
                    onClick={handleCancelOrder}
                    disabled={statusUpdating}
                    className="w-full px-5 py-3 rounded-2xl bg-red-600 text-white font-bold hover:bg-red-700 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {statusUpdating ? 'Updating...' : 'Cancel Order'}
                  </button>
                )}

                {order.isCancelled && (
                  <div className="rounded-3xl border border-red-100 bg-red-50 px-4 py-5 text-sm text-red-700">
                    This order has been cancelled. No further status changes can be applied.
                  </div>
                )}
              </div>
            </div>

            {qrData && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                <div className="w-full max-w-lg">
                  <div className="flex justify-end mb-4">
                    <button
                      onClick={() => setQrData(null)}
                      className="px-4 py-2 rounded-full bg-white text-slate-600 shadow-sm hover:bg-slate-100"
                    >
                      Close
                    </button>
                  </div>
                  <VietQRModal qrUrl={qrData.qrUrl} amount={qrData.amount} orderId={qrData.orderId} />
                </div>
              </div>
            )}

            {/* Payment Summary */}
            <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-lg shadow-indigo-200">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                Order Summary
              </h3>
              <div className="space-y-4 text-indigo-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-bold">${order.itemsPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-white font-bold">${order.shippingPrice.toFixed(2)}</span>
                </div>
                {order.voucherId && (
                  <div className="flex justify-between text-emerald-300">
                    <span>Voucher Discount</span>
                    <span className="font-bold">Applied</span>
                  </div>
                )}
                <div className="pt-4 border-t border-indigo-500 mt-4 flex justify-between items-end">
                  <span className="text-sm uppercase tracking-wider font-bold">Total Amount</span>
                  <span className="text-3xl font-black text-white leading-none">${order.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2 text-sm uppercase tracking-widest">
                Payment Info
              </h3>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50">
                <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm">
                  <CreditCard size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Method</p>
                  <p className="font-bold text-slate-900">{order.paymentMethod || 'Credit Card'}</p>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar size={16} className="text-slate-400" />
                  <span className="text-slate-500 font-medium">Order Date:</span>
                  <span className="text-slate-900 font-bold">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}