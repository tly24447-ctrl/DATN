'use client';

import { ProductEntity, RatingInfo } from '@/src/domain/entity/product.entity';
import { useCart } from '@/src/presentation/context/CartContext';
import { useAuth } from '@/src/presentation/hooks/useAuth';
import { AppProviders } from '@/src/provider/provider';
import { useTranslation } from '@/src/presentation/context/LanguageContext'; // Added
import {
  BookOpen,
  Building2,
  CalendarDays,
  CheckCircle2,
  Globe,
  Hash,
  Heart,
  Layers,
  MessageSquare,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck
} from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { toast } from 'sonner';
import RatingEditor from './RatingEditor';

interface ProductDetailsProps {
  product: ProductEntity;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();
  const { currUser } = useAuth();
  const { t, language } = useTranslation(); // Use translation hook
  const [isUpdating, setIsUpdating] = useState(false);

  const hasDiscount = product.discount && product.discount > 0;
  const discountedPrice = hasDiscount
    ? product.price * (1 - product.discount! / 100)
    : product.price;

  const formatPrice = (price: number) => {
    return language === 'vi' 
      ? `${price.toLocaleString('vi-VN')}₫` 
      : `$${(price / 25000).toFixed(2)}`;
  };

  const handleQuantity = (type: 'inc' | 'dec') => {
    if (type === 'inc' && quantity < product.countInStock) setQuantity(q => q + 1);
    if (type === 'dec' && quantity > 1) setQuantity(q => q - 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 3000);
  };

  const updateComment = async (cmt: string) => {
    const ratingData = product.rating;
    const currentUserId = currUser?._id;
    const productId = product._id || '';
    // Tránh gửi request nếu đang update hoặc nội dung không thay đổi
    const existingDetail = ratingData?.details?.find((d) => d.userId === currentUserId);
    if (isUpdating || existingDetail?.comment === cmt) return;
    const hasVoted = !!existingDetail;

    setIsUpdating(true);
    try {
      let newCount = ratingData?.count || 3;
      let newDetails = [...(ratingData?.details || [])];

      // Mặc định score là 5 nếu user chưa từng vote mà đã nhập comment
      const defaultScore = 5;

      if (hasVoted) {
        // Trường hợp đã có rating: Chỉ cập nhật comment và ngày tạo
        newDetails = newDetails.map((d) =>
          d.userId === currentUserId
            ? { ...d, comment: cmt, createdAt: new Date() }
            : d
        );
      } else {
        // Trường hợp chưa từng rating: Tạo mới record detail
        newCount += 1;
        newDetails.push({
          userId: currentUserId || '',
          score: defaultScore, // Bắt buộc phải có score theo interface
          comment: cmt,
          createdAt: new Date(),
        });
      }

      // Tính lại Average (trong trường hợp user mới chưa vote mà đã comment)
      const totalScore = newDetails.reduce((sum, item) => sum + item.score, 0);
      const newAverage = totalScore / newCount;

      const updatedRatingInfo: RatingInfo = {
        average: newAverage,
        count: newCount,
        details: newDetails,
      };

      // Gọi API cập nhật
      const updatedProduct = await AppProviders.UpdateProductUseCase.execute(productId, {
        rating: updatedRatingInfo,
      });

      if (updatedProduct) {
        toast.success("Đã lưu bình luận của bạn!");
        window.location.reload();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || "Không thể lưu bình luận");
      console.error("Update Comment Error:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="container mx-auto px-4 md:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left Column: Image */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-100 bg-slate-50">
                {product.image ? (
                  <Image src={product.image} alt={product.name} fill className="object-cover" priority />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-slate-300">
                    <BookOpen size={80} />
                  </div>
                )}
                {product.price != discountedPrice && (
                  <div className="absolute top-6 left-6 bg-orange-500 text-white font-black px-4 py-2 rounded-lg shadow-lg">
                    {t.details.save} {product.discount}%
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Info */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <nav className="flex text-xs font-bold text-blue-600 uppercase tracking-widest gap-2">
                <span>{t.details.shop}</span> / <span>{product.format || t.details.books}</span>
              </nav>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                {product.name}
              </h1>
              <div className="flex flex-wrap items-center gap-6">
                <p className="text-xl text-slate-500 italic">
                  {t.product.byAuthor} <span className="text-slate-900 font-semibold not-italic">{product.author}</span>
                </p>
                <RatingEditor
                  productId={product._id || ''}
                  initialRating={product.rating || { average: 0, count: 0, details: [] }}
                  currentUserId={currUser?._id || ''}
                />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-wrap items-end gap-6">
              <div>
                {hasDiscount && (
                  <span className="text-lg text-slate-400 line-through font-medium block">
                    {formatPrice(product.price)}
                  </span>
                )}
                <span className="text-4xl font-black text-slate-900">
                  {formatPrice(discountedPrice)}
                </span>
              </div>
              <div className="mb-1">
                {product.countInStock > 0 ? (
                  <span className="text-xs font-bold px-3 py-1 bg-green-100 text-green-700 rounded-full">
                    {t.details.inStock} ({product.countInStock} {t.details.copiesLeft})
                  </span>
                ) : (
                  <span className="text-xs font-bold px-3 py-1 bg-red-100 text-red-700 rounded-full">
                    {t.details.outOfStock}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900">{t.details.description}</h3>
              <p className="text-slate-600 leading-relaxed">
                {product.description || t.details.noDescription}
              </p>
            </div>

            {/* Add to Cart Actions */}
            <div className="flex flex-col sm:flex-row gap-4 items-center pt-4">
              <div className="flex items-center border-2 border-slate-200 rounded-xl overflow-hidden bg-white">
                <button onClick={() => handleQuantity('dec')} className="p-4 hover:bg-slate-50 transition-colors">
                  <Minus size={20} />
                </button>
                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                <button onClick={() => handleQuantity('inc')} className="p-4 hover:bg-slate-50 transition-colors">
                  <Plus size={20} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.countInStock === 0 || isAdded}
                className={`flex-1 w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95 disabled:cursor-not-allowed ${isAdded
                  ? "bg-green-600 text-white"
                  : "bg-slate-900 text-white hover:bg-blue-600"
                  }`}
              >
                {isAdded ? (
                  <>
                    <CheckCircle2 size={22} />
                    {t.details.addedToCart}
                  </>
                ) : (
                  <>
                    <ShoppingCart size={22} />
                    {t.details.addToCart} — {formatPrice(discountedPrice * quantity)}
                  </>
                )}
              </button>

              <button className="p-4 border-2 border-slate-200 rounded-xl hover:bg-red-50 hover:border-red-100 hover:text-red-500 transition-all">
                <Heart size={22} />
              </button>
            </div>

            {/* Technical Specifications Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4 pt-8 border-t border-slate-100">
              <div className="flex items-start gap-3">
                <Building2 className="text-slate-400" size={20} />
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">{t.details.publisher}</p>
                  <p className="text-sm font-semibold text-slate-700">{product.publisher || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CalendarDays className="text-slate-400" size={20} />
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">{t.details.published}</p>
                  <p className="text-sm font-semibold text-slate-700">
                    {product.publicationDate ? new Date(product.publicationDate).getFullYear() : 'N/A'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Hash className="text-slate-400" size={20} />
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">ISBN-13</p>
                  <p className="text-sm font-semibold text-slate-700">{product.isbn || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Layers className="text-slate-400" size={20} />
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">{t.details.pages}</p>
                  <p className="text-sm font-semibold text-slate-700">{product.pageCount || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="text-slate-400" size={20} />
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">{t.details.language}</p>
                  <p className="text-sm font-semibold text-slate-700">{product.language || 'English'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="text-slate-400" size={20} />
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">{t.details.authenticity}</p>
                  <p className="text-sm font-semibold text-slate-700">{t.details.genuine}</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50/50 rounded-2xl p-4 flex gap-4 items-center text-blue-800">
              <Truck size={24} className="text-blue-500" />
              <div className="text-sm">
                <span className="font-bold">{t.details.fastDelivery}</span> {t.details.deliverySub}
              </div>
            </div>

            {/* --- REVIEWS SECTION --- */}
            <div className="pt-12 border-t border-slate-100">
              <div className="flex items-center gap-2 mb-8">
                <MessageSquare className="text-slate-900" size={24} />
                <h3 className="text-2xl font-black text-slate-900">{t.details.reviews}</h3>
                <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-bold">
                  {product.rating?.count || 0}
                </span>
              </div>

              {currUser && (
                <div className="mb-10 bg-slate-50 rounded-2xl p-6 border border-slate-200">
                  <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    {product.rating?.details.some(d => d.userId === currUser._id)
                      ? t.details.updateReview
                      : t.details.writeReview}
                  </h4>
                  <div className="space-y-4">
                    <textarea
                      rows={3}
                      placeholder={t.details.reviewPlaceholder}
                      className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all resize-none"
                      defaultValue={product.rating?.details.find(d => d.userId === currUser._id)?.comment || ""}
                      onBlur={async (e) => {
                        const newComment = e.target.value;
                        const existingRating = product.rating?.details.find(d => d.userId === currUser._id);
                        if (existingRating || newComment) updateComment(newComment);
                      }}
                    />
                    <p className="text-[11px] text-slate-400 italic">
                      {t.details.reviewAutoSave}
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                {product.rating?.details && product.rating.details.length > 0 ? (
                  product.rating.details.map((review, idx) => {
                    const isOwnReview = currUser && review.userId === currUser._id;
                    return (
                      <div key={idx} className={`bg-white border rounded-2xl p-6 shadow-sm transition-all ${isOwnReview ? "border-blue-200 ring-1 ring-blue-50" : "border-slate-100"}`}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-10 h-10 flex items-center justify-center rounded-full font-bold border-2 border-white shadow-sm ${isOwnReview ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-600"}`}>
                            {review.userId.substring(0, 2).toUpperCase()}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-black text-slate-900 leading-none mb-1">
                              {isOwnReview ? t.details.yourReview : `User_${review.userId.substring(review.userId.length - 4)}`}
                            </p>
                            <div className="flex text-amber-400">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} fill={i < review.score ? "currentColor" : "none"} className={i < review.score ? "" : "text-slate-200"} />
                              ))}
                            </div>
                          </div>
                          <span className="text-[11px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">
                            {new Date(review.createdAt).toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US', {
                              year: 'numeric', month: 'short', day: 'numeric'
                            })}
                          </span>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed pl-1">
                          {review.comment || <span className="italic text-slate-400">{t.details.noComment}</span>}
                        </p>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-12 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                    <p className="text-slate-400 font-medium italic">{t.details.noReviewsYet} {t.details.beFirst}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;