'use client';

import React, { useEffect, useState } from 'react';
import { VoucherEntity } from '@/src/domain/entity/voucher.entity';
import { X, Ticket, RefreshCw, Calendar, DollarSign, Percent } from 'lucide-react';

interface VoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (voucher: VoucherEntity) => void;
  initialData?: VoucherEntity | null;
}

const VoucherModal: React.FC<VoucherModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState<Partial<VoucherEntity>>({
    code: '',
    discountType: 'percentage',
    discountValue: 0,
    minOrderValue: 0,
    maxUses: 100,
    startDate: new Date(),
    expirationDate: new Date(),
    isActive: true,
  });

  useEffect(() => {
    if (!isOpen) return;
    if (initialData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        ...initialData,
        // Ensure dates are in YYYY-MM-DD format for HTML inputs
        startDate: initialData.startDate ? new Date(initialData.startDate) : new Date(),
        expirationDate: initialData.expirationDate ? new Date(initialData.expirationDate) : new Date(),
      });
    } else {
      setFormData({
        code: '',
        discountType: 'percentage',
        discountValue: 0,
        minOrderValue: 0,
        maxUses: 100,
        startDate: new Date(),
        expirationDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        isActive: true,
      });
    }
  }, [initialData, isOpen]);

  const generateRandomCode = () => {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    setFormData({ ...formData, code });
  };

  const formatDateForInput = (date: Date | undefined) => {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0];
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as VoucherEntity);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 text-slate-900">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Ticket className="text-blue-600" size={20} />
            <h2 className="text-xl font-bold text-slate-800">
              {initialData ? 'Edit Voucher' : 'Create New Voucher'}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Code Generation */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Voucher Code</label>
            <div className="flex gap-2">
              <input
                required
                type="text"
                placeholder="e.g. SUMMER2024"
                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono uppercase"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
              />
              <button
                type="button"
                onClick={generateRandomCode}
                className="px-3 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
                title="Generate Random Code"
              >
                <RefreshCw size={18} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Discount Type */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Discount Type</label>
              <select
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                value={formData.discountType}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(e) => setFormData({ ...formData, discountType: e.target.value as any })}
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount ($)</option>
              </select>
            </div>

            {/* Discount Value */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">
                Value {formData.discountType === 'percentage' ? '(%)' : '($)'}
              </label>
              <div className="relative">
                <input
                  required
                  type="number"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.discountValue}
                  onChange={(e) => setFormData({ ...formData, discountValue: Number(e.target.value) })}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  {formData.discountType === 'percentage' ? <Percent size={14} /> : <DollarSign size={14} />}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Min Order Value</label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.minOrderValue}
                onChange={(e) => setFormData({ ...formData, minOrderValue: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Max Uses</label>
              <input
                required
                type="number"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.maxUses}
                onChange={(e) => setFormData({ ...formData, maxUses: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Calendar size={14} /> Start Date
              </label>
              <input
                required
                type="date"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formatDateForInput(formData.startDate)}
                onChange={(e) => setFormData({ ...formData, startDate: new Date(e.target.value) })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Calendar size={14} /> Expiration
              </label>
              <input
                required
                type="date"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formatDateForInput(formData.expirationDate)}
                onChange={(e) => setFormData({ ...formData, expirationDate: new Date(e.target.value) })}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="isActive"
              className="w-5 h-5 accent-blue-600"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
            />
            <label htmlFor="isActive" className="text-sm font-semibold text-slate-700 cursor-pointer">
              Active and usable by customers
            </label>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-slate-600 font-semibold hover:bg-slate-50 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md transition-all active:scale-95"
            >
              {initialData ? 'Update Voucher' : 'Create Voucher'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VoucherModal;