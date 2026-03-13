'use client';

import React from 'react';
import { Edit, Trash2, Ticket, CheckCircle, XCircle, Calendar, Users } from 'lucide-react';
import { VoucherEntity } from '@/src/domain/entity/voucher.entity';

interface VoucherTableProps {
  vouchers: VoucherEntity[];
  onEdit: (voucher: VoucherEntity) => void;
  onDelete: (id: string) => void;
}

const VoucherTable: React.FC<VoucherTableProps> = ({ vouchers, onEdit, onDelete }) => {
  const isExpired = (date: Date) => new Date(date) < new Date();

  return (
    <div className="overflow-hidden bg-white border border-slate-200 rounded-xl shadow-sm">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Voucher Code</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Discount</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Usage</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Validity</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {vouchers.map((voucher) => {
            const expired = isExpired(voucher.expirationDate);
            const usagePercent = Math.min(((voucher.usedCount || 0) / voucher.maxUses) * 100, 100);

            return (
              <tr key={voucher.id} className="hover:bg-slate-50 transition-colors">
                {/* Code */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                      <Ticket size={20} />
                    </div>
                    <span className="text-sm font-black text-slate-900 font-mono tracking-wider">
                      {voucher.code}
                    </span>
                  </div>
                </td>

                {/* Discount Value */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-bold text-slate-900">
                    {voucher.discountType === 'percentage' 
                      ? `${voucher.discountValue}%` 
                      : `$${voucher.discountValue.toLocaleString()}`}
                  </div>
                  <div className="text-[10px] text-slate-400 uppercase">
                    Min: ${voucher.minOrderValue?.toLocaleString() || 0}
                  </div>
                </td>

                {/* Usage Progress */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2 mb-1">
                    <Users size={14} className="text-slate-400" />
                    <span className="text-xs font-medium text-slate-700">
                      {voucher.usedCount || 0} / {voucher.maxUses}
                    </span>
                  </div>
                  <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${usagePercent >= 90 ? 'bg-orange-500' : 'bg-blue-500'}`}
                      style={{ width: `${usagePercent}%` }}
                    />
                  </div>
                </td>

                {/* Validity Dates */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1.5 text-xs text-slate-600">
                    <Calendar size={12} className="text-slate-400" />
                    {new Date(voucher.startDate).toLocaleDateString()}
                  </div>
                  <div className={`flex items-center gap-1.5 text-xs mt-1 font-medium ${expired ? 'text-red-500' : 'text-slate-400'}`}>
                    <Calendar size={12} />
                    {new Date(voucher.expirationDate).toLocaleDateString()}
                  </div>
                </td>

                {/* Status Badge */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {voucher.isActive && !expired ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700">
                      <CheckCircle size={12} /> ACTIVE
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500">
                      <XCircle size={12} /> {expired ? 'EXPIRED' : 'INACTIVE'}
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(voucher)}
                    className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-colors mr-1"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(voucher.id!)}
                    className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
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

export default VoucherTable;