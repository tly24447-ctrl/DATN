// src/presentation/components/public/shop/ShopSidebar.tsx
import Link from "next/link";
import { Filter, SlidersHorizontal, Banknote } from "lucide-react";
import { CategoryEntity } from "@/src/domain/entity/category.entity";

interface SidebarProps {
  categories: CategoryEntity[];
  currentCategory?: string;
  selectedFormats: string[];
  minPrice?: string;
  maxPrice?: string;
  query?: string;
  baseUrl: string; // Truyền vào '/shop' hoặc '/shop/search'
}

export const ShopSidebar = ({ categories, currentCategory, selectedFormats, minPrice, maxPrice, query }: SidebarProps) => {
  // Logic helper URL (getFormatUrl, getPriceUrl) copy vào đây...
  // Sử dụng baseUrl thay vì fix cứng path
  const getFormatUrl = (f: string) => {
    const newFormats = selectedFormats.includes(f)
      ? selectedFormats.filter(item => item !== f)
      : [...selectedFormats, f];

    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (currentCategory) params.set('category', currentCategory);
    if (newFormats.length > 0) params.set('format', newFormats.join(','));
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    return `/shop/search?${params.toString()}`;
  };

  const getPriceUrl = (pMin?: number, pMax?: number) => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (currentCategory) params.set('category', currentCategory);
    if (selectedFormats) params.set('format', selectedFormats.join(','));
    if (pMin !== undefined) params.set('minPrice', pMin.toString());
    if (pMax !== undefined) params.set('maxPrice', pMax.toString());
    return `/shop/search?${params.toString()}`;
  };

  const priceRanges = [
    { label: 'Any Price', min: undefined, max: undefined },
    { label: 'Under $25', min: 0, max: 25 },
    { label: '$25 to $50', min: 25, max: 50 },
    { label: '$50 to $100', min: 50, max: 100 },
    { label: 'Over $100', min: 100, max: 9999 },
  ];
  return (
    <aside className="lg:col-span-3 space-y-6">

      {/* Genre Filter */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 mb-6 font-bold text-slate-900 uppercase text-[10px] tracking-[0.2em]">
          <Filter size={14} className="text-blue-600" />
          Filter by Genre
        </div>
        <div className="flex flex-col gap-1">
          <Link
            href="/shop/search"
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${!currentCategory ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            All Genres
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat._id}
              href={`/shop/search?category=${cat._id}${query ? `&q=${query}` : ''}`}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${currentCategory === cat._id ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Format Multi-select */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 mb-5 font-bold text-slate-900 uppercase text-[10px] tracking-[0.2em]">
          <SlidersHorizontal size={14} className="text-blue-600" />
          Format
        </div>
        <div className="space-y-3">
          {['Paperback', 'Hardcover', 'E-book'].map((f) => {
            const isChecked = selectedFormats.includes(f);
            return (
              <Link
                key={f}
                href={getFormatUrl(f)}
                scroll={false}
                className="flex items-center gap-3 group cursor-pointer"
              >
                <div className={`w-5 h-5 rounded-md border transition-all flex items-center justify-center ${isChecked ? 'bg-blue-600 border-blue-600' : 'border-slate-300 group-hover:border-blue-400'}`}>
                  {isChecked && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                </div>
                <span className={`text-sm transition-colors ${isChecked ? 'font-bold text-slate-900' : 'text-slate-500 group-hover:text-slate-700'}`}>
                  {f}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Price Filter */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 mb-5 font-bold text-slate-900 uppercase text-[10px] tracking-[0.2em]">
          <Banknote size={14} className="text-green-600" />
          Price Range
        </div>
        <div className="space-y-1">
          {priceRanges.map((range) => {
            const isActive = minPrice === range.min?.toString() && maxPrice === range.max?.toString();
            return (
              <Link
                key={range.label}
                href={getPriceUrl(range.min, range.max)}
                className={`block text-sm py-2 px-3 rounded-xl transition-all ${isActive
                  ? 'bg-green-50 text-green-700 font-bold border border-green-100'
                  : 'text-slate-500 hover:text-blue-600 hover:bg-slate-50'
                  }`}
              >
                {range.label}
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
};