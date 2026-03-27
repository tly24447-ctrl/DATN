'use client';

import Image from 'next/image';
import React from 'react';
import { useTranslation } from '@/src/presentation/context/LanguageContext';

interface VietQRProps {
  qrUrl: string;
  amount: number;
  orderId: string;
}

export const VietQRModal: React.FC<VietQRProps> = ({ qrUrl, amount, orderId }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md mx-auto text-center border border-slate-100">
      <h3 className="text-2xl font-black text-slate-900 mb-2">
        {t.checkout.vietqrTitle}
      </h3>
      <p className="text-slate-500 text-sm mb-6">
        {t.checkout.vietqrSub}
      </p>
      
      <div className="relative aspect-square w-64 mx-auto mb-6 border-4 border-blue-50 rounded-2xl p-2">
        <Image 
          src={qrUrl} 
          alt="VietQR Payment" 
          className="w-full h-full object-contain" 
          width={250} 
          height={250}
        />
      </div>
      
      <div className="bg-slate-50 rounded-2xl p-4 mb-6 text-left space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">{t.checkout.amount}</span>
          {/* Using toLocaleString() for better currency formatting */}
          <span className="font-bold text-slate-900">
            {amount.toLocaleString()} VND
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">{t.checkout.content}</span>
          <span className="font-bold text-blue-600">DH{orderId}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-3 rounded-xl text-xs font-medium">
        <span className="animate-pulse w-2 h-2 bg-amber-500 rounded-full"></span>
        {t.checkout.waitingStatus}
      </div>
    </div>
  );
};