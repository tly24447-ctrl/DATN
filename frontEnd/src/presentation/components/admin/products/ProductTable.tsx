'use client';

import React from 'react';
import { Edit, Trash2, BookOpen, Package, Star } from 'lucide-react';
import { ProductEntity } from '@/src/domain/entity/product.entity';
import Image from 'next/image';

interface ProductTableProps {
  products: ProductEntity[];
  onEdit: (product: ProductEntity) => void;
  onDelete: (id: string) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, onEdit, onDelete }) => {
  return (
    <div className="overflow-hidden bg-white border border-slate-200 rounded-xl shadow-sm">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Product</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Details</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Inventory</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Price</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Stats</th>
            <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-slate-50 transition-colors">
              {/* Image & Name */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-16 w-12 flex-shrink-0 relative">
                    {product.image ? (
                      <Image
                        className="rounded border border-slate-100 object-cover"
                        src={product.image}
                        alt={product.name}
                        fill
                      />
                    ) : (
                      <div className="h-full w-full rounded bg-slate-100 flex items-center justify-center text-slate-400">
                        <BookOpen size={20} />
                      </div>
                    )}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-bold text-slate-900 truncate max-w-[200px]">
                      {product.name}
                    </div>
                    <div className="text-xs text-slate-500 italic">by {product.author}</div>
                  </div>
                </div>
              </td>

              {/* Format & ISBN */}
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  product.format === 'Hardcover' ? 'bg-purple-100 text-purple-700' : 
                  product.format === 'E-book' ? 'bg-teal-100 text-teal-700' : 'bg-orange-100 text-orange-700'
                }`}>
                  {product.format || 'Paperback'}
                </span>
                <div className="text-xs text-slate-400 mt-1">ISBN: {product.isbn || 'N/A'}</div>
              </td>

              {/* Inventory */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <Package size={14} className={product.countInStock < 10 ? 'text-red-500' : 'text-slate-400'} />
                  <span className={`text-sm font-medium ${product.countInStock < 10 ? 'text-red-600 font-bold' : 'text-slate-700'}`}>
                    {product.countInStock}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 uppercase mt-0.5">In Stock</div>
              </td>

              {/* Price & Discount */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-bold text-slate-900">
                  ${product.price.toLocaleString()}
                </div>
                {product.discount ? (
                  <div className="text-xs text-green-600 font-medium">-{product.discount}% Off</div>
                ) : null}
              </td>

              {/* Rating & Selled */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center text-amber-500 gap-1 text-sm font-bold">
                  <Star size={14} fill="currentColor" />
                  {product.rating || 0}
                </div>
                <div className="text-xs text-slate-500 mt-1">{product.selled || 0} sold</div>
              </td>

              {/* Actions */}
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEdit(product)}
                  className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-colors mr-1"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => onDelete(product.id!)}
                  className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;