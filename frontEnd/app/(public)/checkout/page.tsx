'use client';

import { PaymentMethod, PaymentMethodLabel } from '@/src/domain/entity/payment.method';
import { createOrderAction, CreateOrderDto } from '@/src/presentation/action/order.action';
import { validateVoucherAction } from '@/src/presentation/action/voucher.action';
import { VietQRModal } from '@/src/presentation/components/public/checkout/VietQRModal';
import { useCart } from '@/src/presentation/context/CartContext';
import { useAuth } from '@/src/presentation/hooks/useAuth';
import {
  ArrowLeft,
  CreditCard,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Tag, TicketPercent, X
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const Page = () => {
  // const {  } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(PaymentMethod.COD);
  const [voucherCode, setVoucherCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVnQr, setIsVnQr] = useState<{ qrUrl: string; description: string; amount: number; orderId: string } | null>(null);
  const { appliedVoucher, applyVoucher, removeVoucher, cart, cartTotal, voucherDiscount, clearCart } = useCart();
  const router = useRouter();
  const { currUser } = useAuth();
  const [isSuccess, setIsSuccess] = useState(false);

  const shippingPrice = cartTotal > 100 ? 0 : 10; // Free shipping over $100
  const finalTotal = cartTotal + shippingPrice;

  useEffect(() => {
    if (isVnQr) {
      const socket = io('http://localhost:3001');

      socket.on('connect', () => {
        console.log("✅ Socket connected:", socket.id);
        socket.emit('joinOrderRoom', isVnQr.orderId);
      });


      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      socket.on('paymentSuccess', (data: any) => {
        console.log("🎉 Received paymentSuccess event:", data); // Log này có hiện không?
        console.log("Comparing:", data.orderId, "with", isVnQr.orderId);
        if (data.orderId === isVnQr.orderId) {
          router.push(`/checkout/order-success?id=${isVnQr.orderId}`);
        }
      });

      return () => { socket.disconnect(); };
    }
  }, [isVnQr, router]);

  const handleApplyVoucher = async () => {
    if (!voucherCode.trim()) return;

    setError('');
    setIsLoading(true);

    try {
      const result = await validateVoucherAction(voucherCode);

      if (result.success) {
        applyVoucher(result.voucher);
        setVoucherCode(''); // Clear input on success
        console.log("Voucher applied successfully!");
      } else {
        setError(result.message || "Invalid code");
      }
    } catch (err) {
      console.error("Error applying voucher:", err);
      setError("Connection error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitOrder = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // 1. Prepare data for the action
      const orderPayload: CreateOrderDto = {
        userId: currUser?._id || '',
        voucher: appliedVoucher,
        orderItems: cart,
        paymentMethod: paymentMethod,
        itemsPrice: cartTotal,
        shippingPrice: shippingPrice,
        totalPrice: finalTotal,
      };

      // 2. Execute Server Action
      console.log("Order created:", orderPayload);
      const result = await createOrderAction(orderPayload);
      if (result.success) {
        // Handle Redirection (External vs Internal)
        console.log("result", result);
        // if (paymentMethod === PaymentMethod.VNPAY) {
        //   if (result.paymentUrl) {
        //     window.location.href = result.paymentUrl;
        //   }
        // }
        if (paymentMethod === PaymentMethod.VNQR) {
          console.log("result VNQR", result);
          if (result.qrData) {
            setIsVnQr(result.qrData);
            setIsSuccess(true); // Đánh dấu đã đặt hàng thành công
            clearCart();
            removeVoucher();
            return;
          }
        } else {
          router.push(`/checkout/order-success?id=${result.orderId}`);
        }

        console.log("result isVnQr", isVnQr);
        clearCart();
        removeVoucher();
        return; // Exit early on success
      }

      // Handle Error
      setError(result.message || "Something went wrong.");
      setIsSubmitting(false);
    } catch (err) {
      console.error("", err);
      setError("Failed to connect to server. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0 && !isSuccess) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <p className="text-slate-500">Your cart is empty. You cannot checkout.</p>
        <Link href="/shop" className="text-indigo-600 font-bold flex items-center gap-2">
          <ArrowLeft size={18} /> Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="container mx-auto px-4 pt-8">
        <Link href="/cart" className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors mb-8 text-sm font-bold uppercase tracking-wider">
          <ArrowLeft size={16} /> Review Cart
        </Link>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left Column: Form Details */}
          <div className="lg:col-span-7 space-y-8">

            {/* Shipping Section */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600"><MapPin size={20} /></div>
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required placeholder="Full Name" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                <input required placeholder="Email Address" type="email" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                <div className="md:col-span-2">
                  <input required placeholder="Street Address" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <input required placeholder="City" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                <input required placeholder="Postal Code" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
            </section>

            {/* Payment Section */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
                  <CreditCard size={20} />
                </div>
                Payment Method
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.values(PaymentMethod).map((methodId) => {
                  // Check if this method is currently selected
                  const isSelected = paymentMethod === methodId;
                  const label = PaymentMethodLabel[methodId];

                  return (
                    <label
                      key={methodId}
                      className={`p-4 border-2 rounded-2xl cursor-pointer transition-all flex items-center justify-between group ${isSelected
                        ? 'border-indigo-600 bg-indigo-50 shadow-sm shadow-indigo-100'
                        : 'border-slate-100 hover:border-slate-300 bg-slate-50/30'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Custom Radio Button */}
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300 bg-white'
                          }`}>
                          {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>

                        {/* Label Text from PaymentMethodLabel */}
                        <span className={`font-bold transition-colors ${isSelected ? 'text-indigo-700' : 'text-slate-600 group-hover:text-slate-900'
                          }`}>
                          {label}
                        </span>
                      </div>

                      <input
                        type="radio"
                        name="payment"
                        className="hidden"
                        value={methodId}
                        onChange={() => setPaymentMethod(methodId)}
                        checked={isSelected}
                      />

                      {/* Optional: Checkmark indicator on the right */}
                      {isSelected && (
                        <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center">
                          <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 text-white stroke-[4px] stroke-current">
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </label>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 sticky top-8">
              <h2 className="text-xl font-black text-slate-900 mb-6">Order Summary</h2>

              {/* Item Mini-List */}
              <div className="max-h-60 overflow-y-auto mb-6 pr-2 space-y-4">
                {cart.map((item) => (
                  <div key={item.productId} className="flex gap-4 items-center">
                    <div className="relative h-16 w-12 flex-shrink-0 rounded-lg overflow-hidden border border-slate-100">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-900 text-sm truncate">{item.name}</p>
                      <p className="text-xs text-slate-500">Qty: {item.amount}</p>
                    </div>
                    <p className="font-bold text-slate-900 text-sm">
                      ${((item.discount ? item.price * (1 - item.discount / 100) : item.price) * item.amount).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">
                  Have a promo code?
                </label>

                {!appliedVoucher ? (
                  <div className="flex gap-2">
                    <input
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value)}
                      disabled={isLoading}
                      placeholder="PROMO2024"
                      className={`flex-1 px-4 py-2 bg-white border rounded-xl text-sm outline-none transition-all ${error ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-indigo-500'
                        }`}
                    />
                    <button
                      type="button"
                      onClick={handleApplyVoucher}
                      disabled={isLoading || !voucherCode}
                      className="px-6 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-indigo-600 disabled:bg-slate-300 transition-colors"
                    >
                      {isLoading ? '...' : 'Apply'}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-xl">
                    <div className="flex items-center gap-2 text-emerald-700">
                      <TicketPercent size={18} />
                      <span className="font-bold text-sm">{appliedVoucher.code} Applied!</span>
                    </div>
                    <button onClick={removeVoucher} className="text-emerald-700 hover:text-red-500">
                      <X size={18} />
                    </button>
                  </div>
                )}
                {error && <p className="text-red-500 text-xs mt-2 font-medium">{error}</p>}
              </div>

              <div className="space-y-4 border-t border-slate-100 pt-6">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span className="text-slate-900 font-bold">${cartTotal.toLocaleString()}</span>
                </div>

                {appliedVoucher && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span className="flex items-center gap-1"><Tag size={14} /> Voucher ({appliedVoucher.code})</span>
                    <span>-${voucherDiscount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-500">
                  <span>Shipping</span>
                  <span>{shippingPrice === 0 ? 'FREE' : `$${shippingPrice}`}</span>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                  <span className="text-lg font-black text-slate-900">Total</span>
                  <span className="text-3xl font-black text-indigo-600">
                    ${(finalTotal - voucherDiscount + shippingPrice).toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                disabled={isSubmitting}
                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold mt-8 flex items-center justify-center gap-3 hover:bg-indigo-600 transition-all shadow-lg active:scale-95 disabled:bg-slate-300"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Processing...</span>
                ) : (
                  <>
                    <PackageCheck size={22} />
                    Place Order Now
                  </>
                )}
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-slate-400">
                <ShieldCheck size={16} />
                <span className="text-[10px] uppercase font-bold tracking-widest">Secure Checkout Powered by SSL</span>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Thêm component VietQRModal vào cuối trang */}
      {isVnQr && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md">
            {/* Nút đóng Modal (Tùy chọn) */}
            <button
              onClick={() => router.push(`/checkout/order-success?id=${isVnQr.orderId}`)}
              className="absolute -top-12 right-0 text-white hover:text-indigo-200 flex items-center gap-2 font-bold text-sm transition-colors"
            >
              Tiếp tục đơn hàng <X size={20} />
            </button>

            <VietQRModal
              qrUrl={isVnQr.qrUrl}
              amount={isVnQr.amount}
              orderId={isVnQr.orderId}
            />

            <p className="text-center text-white/70 text-[10px] mt-4 uppercase tracking-widest font-bold">
              Vui lòng không đóng cửa sổ này cho đến khi giao dịch hoàn tất
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;