'use client';
import { ProductEntity } from '@/src/domain/entity/product.entity';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import { useState, useMemo } from 'react';

export const RatingPieChart = ({ allProducts }: { allProducts: ProductEntity[] }) => {
  // 1. Quản lý sản phẩm đang được chọn để xem biểu đồ
  const [selectedProductId, setSelectedProductId] = useState(allProducts[0]?._id || '');

  const selectedProduct = useMemo(() =>
    allProducts.find(p => p._id === selectedProductId) || allProducts[0],
    [selectedProductId, allProducts]
  );

  const details = selectedProduct?.rating?.details || [];

  const data = [1, 2, 3, 4, 5].map(star => ({
    name: `${star} Stars`,
    value: details.filter(d => Math.round(d.score) === star).length
  }));

  const COLORS = ['#e2e8f0', '#94a3b8', '#64748b', '#818cf8', '#4f46e5'];

  return (
    <div className="h-[450px] w-full bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
      {/* Tool: Product Selector */}
      <div className="mb-6">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
          Select Product to View Ratings
        </label>
        <select
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all appearance-none cursor-pointer"
        >
          {allProducts.map(p => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 flex flex-col items-center min-h-0">
        <h3 className="font-black text-slate-900 uppercase tracking-tight text-sm self-start truncate w-full">
          {selectedProduct?.name}
        </h3>
        <p className="text-xs text-slate-500 font-bold self-start mt-1 mb-4">
          Average: <span className="text-indigo-600">{selectedProduct?.rating?.average || 0} / 5</span>
        </p>

        <ResponsiveContainer width="100%" height="100%" minHeight={500}>
          <PieChart>
            <Pie
              data={data}
              innerRadius={70}
              outerRadius={90}
              paddingAngle={8}
              dataKey="value"
              animationBegin={0}
              animationDuration={800}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 16px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
            />
            <Legend verticalAlign="bottom" iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};