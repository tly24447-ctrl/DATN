'use client';

import { OrderEntity } from '@/src/domain/entity/order.entity';
import { CreditCard, Package, Truck, User, X, Hash } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderEntity | null;
  onMarkAsPaid?: (id: string) => void;
  onMarkAsDelivered?: (id: string) => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ 
  isOpen, 
  onClose, 
  order,
  onMarkAsPaid,
  onMarkAsDelivered
}) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 text-slate-900">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              Order Details <span className="text-slate-400 text-sm font-normal">#{order._id?.toUpperCase()}</span>
            </h2>
            <p className="text-xs text-slate-500">Placed on {order.createdAt ? new Date(order.createdAt).toLocaleString() : 'Unknown date'}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 flex-1 space-y-8">
          
          {/* Top Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/30">
              <div className="flex items-center gap-2 text-blue-600 mb-2 font-semibold text-sm">
                <User size={16} /> Customer
              </div>
              <p className="text-sm font-medium truncate">User ID: {order.userId}</p>
              <p className="text-xs text-slate-500 mt-1 uppercase">Method: {order.paymentMethod}</p>
            </div>

            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/30">
              <div className="flex items-center gap-2 text-green-600 mb-2 font-semibold text-sm">
                <CreditCard size={16} /> Payment Status
              </div>
              {order.isPaid ? (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full uppercase">Paid</span>
                  <div className="space-y-0.5">
                    {order.vnPayId && (
                      <p className="text-[10px] text-slate-600 font-mono flex items-center gap-1">
                        <Hash size={10} className="text-slate-400" /> {order.vnPayId}
                      </p>
                    )}
                    <p className="text-[9px] text-slate-400 italic">
                      {order.paidAt ? new Date(order.paidAt).toLocaleString() : ''}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full w-fit uppercase">Pending</span>
                  <button onClick={() => onMarkAsPaid?.(order._id!)} className="text-[10px] text-blue-600 hover:underline text-left">Manual Mark as Paid</button>
                </div>
              )}
            </div>

            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/30">
              <div className="flex items-center gap-2 text-purple-600 mb-2 font-semibold text-sm">
                <Truck size={16} /> Delivery Status
              </div>
              {order.isDelivered ? (
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full uppercase">Delivered</span>
                  <p className="text-[10px] text-slate-500">{order.deliveredAt ? new Date(order.deliveredAt).toLocaleString() : ''}</p>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full w-fit uppercase">In Progress</span>
                  <button onClick={() => onMarkAsDelivered?.(order._id!)} className="text-[10px] text-blue-600 hover:underline text-left">Mark as Delivered</button>
                </div>
              )}
            </div>
          </div>

          {/* Order Items Table */}
          <div>
            <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Package size={18} className="text-slate-400" /> Items Summary
            </h3>
            <div className="border border-slate-100 rounded-xl overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-slate-600 uppercase text-[10px]">Product</th>
                    <th className="px-4 py-3 font-semibold text-slate-600 text-center uppercase text-[10px]">Qty</th>
                    <th className="px-4 py-3 font-semibold text-slate-600 text-right uppercase text-[10px]">Unit Price</th>
                    <th className="px-4 py-3 font-semibold text-slate-600 text-right uppercase text-[10px]">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {order.orderItems.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-3 flex items-center gap-3">
                        <div className="relative h-10 w-8 flex-shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover rounded shadow-sm" />
                        </div>
                        <span className="font-medium truncate max-w-[200px]">{item.name}</span>
                      </td>
                      <td className="px-4 py-3 text-center text-slate-500">x{item.amount}</td>
                      <td className="px-4 py-3 text-right">{item.price.toLocaleString()} VND</td>
                      <td className="px-4 py-3 text-right font-bold">{(item.price * item.amount).toLocaleString()} VND</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Financial Summary */}
          <div className="flex justify-end">
            <div className="w-full md:w-64 space-y-2 text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Items Subtotal:</span>
                <span>{order.itemsPrice.toLocaleString()} VND</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Shipping:</span>
                <span>{order.shippingPrice.toLocaleString()} VND</span>
              </div>
              {order.voucherId && (
                <div className="flex justify-between text-green-600 italic text-xs">
                  <span>Voucher Applied:</span>
                  <span>- {((order.itemsPrice + order.shippingPrice) - order.totalPrice).toLocaleString()} VND</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold text-slate-900 pt-2 border-t border-slate-200">
                <span>Total:</span>
                <span className="text-blue-600">{order.totalPrice.toLocaleString()} VND</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-8 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-black shadow-md transition-all active:scale-95"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
