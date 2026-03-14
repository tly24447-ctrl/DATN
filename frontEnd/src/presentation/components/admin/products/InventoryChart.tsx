'use client';
import { ProductEntity } from '@/src/domain/entity/product.entity';
import { BarChart, Bar, Cell, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { useEffect, useState, useMemo } from 'react';

type StockThreshold = 50 | 100 | 500;

export const InventoryChart = ({ products }: { products: ProductEntity[] }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [threshold, setThreshold] = useState<StockThreshold>(100);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  // Lọc dữ liệu dựa trên ngưỡng đã chọn
  const filteredData = useMemo(() => {
    return [...products]
      .filter((p) => (p.countInStock || 0) <= threshold)
      .sort((a, b) => (a.countInStock || 0) - (b.countInStock || 0))
      .slice(0, 10); // Lấy top 10 sản phẩm báo động nhất
  }, [products, threshold]);

  if (!isMounted) return <div className="h-96 w-full bg-slate-50 animate-pulse rounded-3xl" />;

  return (
    <div className="h-[500px] w-full bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
      {/* Header & Tool */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h3 className="font-black text-slate-900 uppercase tracking-tight text-sm">
            Low Stock Alert
          </h3>
          <p className="text-xs text-slate-500 font-bold mt-1">Products below threshold</p>
        </div>

        {/* Filter Tool */}
        {/* Filter Tool - Slider Version */}
        <div className="flex flex-col gap-2 w-full sm:w-64">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Threshold: <span className="text-orange-600">{threshold}</span>
            </span>
            <span className="text-[10px] font-black text-slate-400">MAX: 5000</span>
          </div>

          <div className="relative flex items-center group">
            <input
              type="range"
              min="10"
              max="5000"
              step="10"
              value={threshold}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={(e) => setThreshold(Number(e.target.value) as any)}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-orange-500 hover:accent-orange-600 transition-all"
            />

            {/* Một chút hiệu ứng trang trí cho slider */}
            <div
              className="absolute h-2 bg-orange-500 rounded-lg pointer-events-none transition-all"
              style={{ width: `${(threshold / 5000) * 100}%` }}
            />
          </div>

          <div className="flex justify-between mt-1">
            <span className="text-[9px] font-bold text-slate-400">10</span>
            <span className="text-[9px] font-bold text-slate-400 text-right">5000</span>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <BarChart
            data={filteredData}
            layout="vertical"
            margin={{ left: 0, right: 30, bottom: 0 }}
          >
            <XAxis type="number" hide />
            <YAxis
              dataKey="name"
              type="category"
              width={100}
              tick={{ fontSize: 11, fontWeight: 700, fill: '#475569' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{
                borderRadius: '12px',
                border: 'none',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(value: any) => [value, 'Stock Quantity']}
            />
            <Bar dataKey="countInStock" radius={[0, 8, 8, 0]} barSize={22}>
              {filteredData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  // Đổi màu theo mức độ khẩn cấp
                  fill={(entry.countInStock || 0) < threshold / 2 ? '#ef4444' : '#f59e0b'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {filteredData.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 pointer-events-none">
          <p className="text-slate-400 font-bold text-sm italic">All products are well stocked</p>
        </div>
      )}
    </div>
  );
};