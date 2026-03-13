import { AppProviders } from "@/src/provider/provider";
import ProductCard from "@/src/presentation/components/public/products/ProductCard";
import { Banknote, Filter, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { ProductEntity } from "@/src/domain/entity/product.entity";

interface ShopPageProps {
  searchParams: Promise<{
    category?: string;
    sort?: string;
    format?: string;
    minPrice?: string; // New
    maxPrice?: string; // New
  }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { category, format, minPrice, maxPrice } = await searchParams;

  // Convert comma-separated string from URL into an array: ['Paperback', 'Hardcover']
  const selectedFormats = format ? format.split(',') : [];
  const min = minPrice ? parseFloat(minPrice) : 0;
  const max = maxPrice ? parseFloat(maxPrice) : Infinity;

  const [categories, productsResult] = await Promise.all([
    AppProviders.GetAllCategoriesUseCase.execute(),
    AppProviders.GetProductsByPageUseCase.execute(1, 50), // Fetch more for filtering
  ]);

  let products = productsResult.data;

  // Filter 1: Category
  if (category) {
    products = products.filter((p) => (String(p.categoryId) === category || String(p._id) === category));
  }

  // Filter 2: Format (Multi-select)
  if (selectedFormats.length > 0) {
    products = products.filter((p) => p.format && selectedFormats.includes(p.format));
  }
// Filter 3: Price (Calculated on discounted price if applicable)
  products = products.filter((p) => {
    const finalPrice = p.discount ? p.price * (1 - p.discount / 100) : p.price;
    return finalPrice >= min && finalPrice <= max;
  });

  // Helper to build the new URL for checkboxes
  const getFormatUrl = (f: string) => {
    const newFormats = selectedFormats.includes(f)
      ? selectedFormats.filter(item => item !== f) // Remove if already there
      : [...selectedFormats, f]; // Add if not there

    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (newFormats.length > 0) params.set('format', newFormats.join(','));
    return `/shop?${params.toString()}`;
  };

  // URL Helper for Price links
  const getPriceUrl = (pMin?: number, pMax?: number) => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (format) params.set('format', format);
    if (pMin !== undefined) params.set('minPrice', pMin.toString());
    if (pMax !== undefined) params.set('maxPrice', pMax.toString());
    return `/shop?${params.toString()}`;
  };

  const priceRanges = [
    { label: 'Any Price', min: undefined, max: undefined },
    { label: 'Under $25', min: 0, max: 25 },
    { label: '$25 to $50', min: 25, max: 50 },
    { label: '$50 to $100', min: 50, max: 100 },
    { label: 'Over $100', min: 100, max: 9999 },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-8 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">The Bookshop</h1>
          <p className="text-slate-500 mt-2">Discover your next favorite story among our curated collection.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Sidebar Filters */}
          <aside className="lg:col-span-3 space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex items-center gap-2 mb-6 font-bold text-slate-900 uppercase text-xs tracking-widest">
                <Filter size={16} className="text-blue-600" />
                Filter by Genre
              </div>

              <div className="flex flex-col gap-2">
                <Link
                  href="/shop"
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${!category ? 'bg-blue-600 text-white shadow-md shadow-blue-100' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  All Genres
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat._id}
                    href={`/shop?category=${cat._id}`}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${category === (cat._id) ? 'bg-blue-600 text-white shadow-md shadow-blue-100' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Format Filter Section */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hidden lg:block">
              <div className="flex items-center gap-2 mb-4 font-bold text-slate-900 uppercase text-xs tracking-widest">
                <SlidersHorizontal size={16} className="text-blue-600" />
                Format
              </div>
              <div className="space-y-3">
                {['Paperback', 'Hardcover', 'E-book'].map((f) => {
                  const isChecked = selectedFormats.includes(f);
                  return (
                    <Link
                      key={f}
                      href={getFormatUrl(f)}
                      scroll={false} // Prevent jumping to top
                      className="flex items-center gap-3 group"
                    >
                      {/* Custom Checkbox UI */}
                      <div className={`w-5 h-5 rounded border transition-all flex items-center justify-center ${isChecked ? 'bg-blue-600 border-blue-600' : 'border-slate-300 group-hover:border-blue-400'
                        }`}>
                        {isChecked && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <span className={`text-sm transition-colors ${isChecked ? 'font-bold text-slate-900' : 'text-slate-600'}`}>
                        {f}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex items-center gap-2 mb-4 font-bold text-slate-900 uppercase text-xs tracking-widest">
                <Banknote size={16} className="text-green-600" />
                Price Range
              </div>
              <div className="space-y-2">
                {priceRanges.map((range) => {
                  const isActive = minPrice === range.min?.toString() && maxPrice === range.max?.toString();
                  return (
                    <Link
                      key={range.label}
                      href={getPriceUrl(range.min, range.max)}
                      className={`block text-sm py-1 px-3 rounded-md transition-colors ${isActive
                          ? 'bg-green-50 text-green-700 font-bold border border-green-100'
                          : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                        }`}
                    >
                      {range.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <section className="lg:col-span-9">
            {products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product: ProductEntity) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-20 text-center border border-dashed border-slate-200">
                <p className="text-slate-400 font-medium">No books found matching your criteria.</p>
                <Link href="/shop" className="text-blue-600 font-bold mt-2 inline-block hover:underline">
                  Reset all filters
                </Link>
              </div>
            )}
          </section>

        </div>
      </div>
    </div>
  );
}