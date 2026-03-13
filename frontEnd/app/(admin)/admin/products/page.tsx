'use client';

import React, { useEffect, useState } from 'react';
import { ProductEntity } from '@/src/domain/entity/product.entity';
import { CategoryEntity } from '@/src/domain/entity/category.entity';
import ProductTable from '@/src/presentation/components/admin/products/ProductTable';
import ProductModal from '@/src/presentation/components/admin/products/ProductModal';
import { AppProviders } from '@/src/provider/provider';
import { Constants } from '@/src/shared/constans';
import { Plus, BookCopy } from 'lucide-react';

const Page = () => {
  const [products, setProducts] = useState<ProductEntity[]>([]);
  const [categories, setCategories] = useState<CategoryEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(Constants.PAGE);
  const [totalPages, setTotalPages] = useState(0);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductEntity | null>(null);

  // 1. Fetch Categories (needed for the Modal dropdown)
  const fetchCategories = async () => {
    try {
      // Assuming you have a use case to get all categories for the dropdown
      const result = await AppProviders.GetAllCategoriesUseCase.execute();
      setCategories(result);
    } catch (error) {
      console.error("Failed to fetch categories for dropdown:", error);
    }
  };

  // 2. Fetch Paginated Products
  const fetchProducts = async (page: number) => {
    setLoading(true);
    try {
      const result = await AppProviders.GetProductsByPageUseCase.execute(page, 10);
      setProducts(result.data);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts(currentPage);
  }, [currentPage]);

  const handleCreate = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product: ProductEntity) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSave = async (data: ProductEntity) => {
    try {
      if (selectedProduct) {
        const id = selectedProduct._id;
        console.log("Updating product with ID:", id, "Data:", data);
        await AppProviders.UpdateProductUseCase.execute(id!, data);
      } else {
        await AppProviders.CreateProductUseCase.execute(data);
      }
      fetchProducts(currentPage);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to save product:", error);
      alert("Error saving product. Please check the required fields.");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await AppProviders.DeleteProductUseCase.execute(id);
        fetchProducts(currentPage);
      } catch (error) {
        console.error("Failed to delete product:", error);
        alert("Error deleting product");
      }
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* Product Modal */}
      <ProductModal 
        key={selectedProduct?._id}
        isOpen={isModalOpen}
        initialData={selectedProduct}
        categories={categories}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BookCopy className="text-blue-600" size={24} />
            <h1 className="text-2xl font-bold text-slate-900">Product Management</h1>
          </div>
          <p className="text-sm text-slate-500">Inventory control and book catalog management.</p>
        </div>

        <button
          onClick={handleCreate}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-semibold transition-all shadow-sm active:scale-95"
        >
          <Plus size={20} />
          Add New Book
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          <div className="mb-4 flex justify-end">
            <span className="text-xs font-medium text-slate-400 bg-slate-200/50 px-2 py-1 rounded">
              Total Pages: {totalPages}
            </span>
          </div>

          <ProductTable 
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          {/* Pagination */}
          <div className="flex justify-center mt-8 gap-3">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg disabled:opacity-40 hover:bg-slate-50 transition-colors shadow-sm"
            >
              Previous
            </button>
            <div className="flex items-center px-4 bg-slate-200/30 rounded-lg text-slate-700 font-medium">
              {currentPage}
            </div>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg disabled:opacity-40 hover:bg-slate-50 transition-colors shadow-sm"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;