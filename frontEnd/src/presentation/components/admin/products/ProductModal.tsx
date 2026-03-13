'use client';

import React, { useEffect, useState } from 'react';
import { ProductEntity } from '@/src/domain/entity/product.entity';
import { CategoryEntity } from '@/src/domain/entity/category.entity';
import { X, Upload, BookOpen, ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: ProductEntity) => void;
  initialData?: ProductEntity | null;
  categories: CategoryEntity[]; // Needed for the Category dropdown
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  categories
}) => {
  const [formData, setFormData] = useState<Partial<ProductEntity>>({
    name: '',
    categoryId: categories[0]?._id,
    author: '',
    publisher: '',
    price: 0,
    countInStock: 0,
    format: 'Paperback',
    image: '',
    description: '',
    isbn: '',
    discount: 0,
    language: 'English'
  });

  useEffect(() => {
    if (!isOpen) return;
    if (initialData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData(initialData);
    } else {
      setFormData({
        name: '', categoryId: categories[0]?._id || '', author: '',
        price: 0, countInStock: 0, format: 'Paperback', image: ''
      });
    }
  }, [initialData, isOpen, categories]);

  useEffect(() => {
  if (categories.length > 0 && !formData.categoryId) {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormData(prev => ({ ...prev, categoryId: categories[0]._id }));
  }
}, [categories, formData.categoryId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData as ProductEntity);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 text-slate-900">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <BookOpen className="text-blue-600" size={20} />
            <h2 className="text-xl font-bold text-slate-800">
              {initialData ? 'Edit Product' : 'Add New Product'}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Left Column: Image Upload */}
            <div className="md:col-span-1 space-y-4">
              <label className="text-sm font-semibold text-slate-700 block">Book Cover</label>
              <div className="relative aspect-[3/4] w-full rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 border-2 border-dashed border-slate-200 overflow-hidden">
                {formData.image ? (
                  <Image src={formData.image} alt="Preview" fill className="object-cover" />
                ) : (
                  <ImageIcon size={48} />
                )}
                <label className="absolute inset-0 cursor-pointer flex items-center justify-center bg-black/0 hover:bg-black/20 transition-all group">
                  <Upload className="text-white opacity-0 group-hover:opacity-100" size={32} />
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                </label>
              </div>
              <p className="text-[10px] text-center text-slate-400">Recommended ratio: 3:4 (Portrait)</p>
            </div>

            {/* Right Columns: Fields */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 space-y-1">
                <label className="text-sm font-semibold text-slate-700">Product Name</label>
                <input required type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Category</label>
                <select required className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  value={formData.categoryId} onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}>
                  <option value="" disabled>Select a category</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Author</label>
                <input required type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Format</label>
                <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  value={formData.format} onChange={(e) => setFormData({ ...formData, format: e.target.value as any })}>
                  <option value="Paperback">Paperback</option>
                  <option value="Hardcover">Hardcover</option>
                  <option value="E-book">E-book</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Price ($)</label>
                <input required type="number" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Stock Count</label>
                <input required type="number" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.countInStock} onChange={(e) => setFormData({ ...formData, countInStock: Number(e.target.value) })} />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Discount (%)</label>
                <input type="number" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.discount} onChange={(e) => setFormData({ ...formData, discount: Number(e.target.value) })} />
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="text-sm font-semibold text-slate-700">Description</label>
                <textarea rows={3} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-100">
            <button type="button" onClick={onClose} className="px-6 py-2 text-slate-600 font-semibold hover:bg-slate-50 rounded-lg transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md transition-all active:scale-95">
              {initialData ? 'Save Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
