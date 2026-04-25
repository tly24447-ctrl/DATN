'use client';

import { OrderEntity } from '@/src/domain/entity/order.entity';
import { Calendar, Eye, Package, Truck } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface OrderTableProps {
  orders: OrderEntity[];
  onViewDetails: (order: OrderEntity) => void;
  onUpdateStatus?: (id: string, status: string) => void;
}

const OrderTable: React.FC<OrderTableProps> = ({ orders, onViewDetails }) => {
  return (
    <div className="overflow-hidden bg-white border border-slate-200 rounded-xl shadow-sm">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Order ID</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Items</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Total Amount</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Payment</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Delivery</th>
            <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {orders.map((order) => {
            // Lấy ID hiển thị (ưu tiên _id từ MongoDB hoặc id từ Entity)
            const displayId = order._id;
            
            return (
              <tr key={displayId} className="hover:bg-slate-50 transition-colors text-slate-900">
                {/* Order ID & Date */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-bold text-slate-900">
                    #{displayId?.substring(displayId.length - 8).toUpperCase() || 'N/A'}
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-1 uppercase font-medium">
                    <Calendar size={12} />
                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                  </div>
                </td>

                {/* Items Summary */}
                <td className="px-6 py-4">
                  <div className="flex -space-x-2 overflow-hidden">
                    {order.orderItems.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-slate-100 overflow-hidden">
                        <Image src={item.image} alt={item.name} className="h-full w-full object-cover" width={32} height={32} />
                      </div>
                    ))}
                    {order.orderItems.length > 3 && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-600 ring-2 ring-white">
                        +{order.orderItems.length - 3}
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{order.orderItems.length} items</div>
                </td>

                {/* Price */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-bold text-slate-900">
                    {order.totalPrice.toLocaleString()} VND
                  </div>
                  <div className="text-[10px] text-slate-400">Method: {order.paymentMethod}</div>
                </td>
                {/* Payment Status & VNPay Transaction ID */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col gap-1">
                    {order.isCancelled ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-100 text-red-700 w-fit">
                        <span className="h-1 w-1 rounded-full bg-red-600"></span>
                        Cancelled
                      </span>
                    ) : order.isPaid ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700 w-fit">
                        <span className="h-1 w-1 rounded-full bg-green-600"></span>
                        Paid
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 w-fit">
                        <span className="h-1 w-1 rounded-full bg-amber-600"></span>
                        Pending
                      </span>
                    )}

                    {/* Hiển thị VNPay ID nếu có */}
                    {order.vnPayId && (
                      <div className="text-[9px] text-slate-400 font-mono mt-0.5 flex items-center gap-1">
                        <span className="text-slate-300">TXN:</span> {order.vnPayId}
                      </div>
                    )}

                    {order.paidAt && !order.isCancelled && (
                      <div className="text-[10px] text-slate-400">
                        {new Date(order.paidAt).toLocaleString()}
                      </div>
                    )}
                  </div>
                </td>

                {/* Delivery Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.isCancelled ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-100 text-red-700">
                      <Package size={12} />
                      Cancelled
                    </span>
                  ) : order.isDelivered ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">
                      <Truck size={12} />
                      Delivered
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                      <Package size={12} />
                      Processing
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onViewDetails(order)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-all shadow-sm"
                  >
                    <Eye size={16} />
                    Details
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;