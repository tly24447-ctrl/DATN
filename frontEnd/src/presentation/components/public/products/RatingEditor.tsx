"use client";

import { RatingInfo } from "@/src/domain/entity/product.entity";
import { AppProviders } from "@/src/provider/provider";
import { Loader2, Star } from "lucide-react"; // Thêm icon reset nếu cần
import { useState } from "react";
import { toast } from "sonner";

interface RatingEditorProps {
  productId: string;
  initialRating: RatingInfo;
  currentUserId: string;
}

export default function RatingEditor({ productId, initialRating, currentUserId }: RatingEditorProps) {
  const [ratingData, setRatingData] = useState<RatingInfo>(initialRating);
  const [hover, setHover] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  // Lấy đánh giá cũ của user (nếu có)
  const existingDetail = ratingData.details?.find((d) => d.userId === currentUserId);
  const hasVoted = !!existingDetail;
  const userScore = existingDetail?.score || 0;

  const handleUpdateRating = async (newScore: number) => {
    if (isUpdating || (hasVoted && newScore === userScore)) return;

    setIsUpdating(true);
    try {
      let newCount = ratingData.count || 0;
      let newDetails = [...(ratingData.details || [])];

      // LOGIC CẬP NHẬT:
      if (hasVoted) {
        // Trường hợp vote lại: thay thế score trong detail cũ
        newDetails = newDetails.map((d) =>
          d.userId === currentUserId ? { ...d, score: newScore, createdAt: new Date() } : d
        );
        // Count giữ nguyên, average tính lại dựa trên sự chênh lệch điểm
      } else {
        // Trường hợp vote mới
        newCount += 1;
        newDetails.push({
          userId: currentUserId,
          score: newScore,
          createdAt: new Date(),
        });
      }

      // Tính lại Average chính xác
      const totalScore = newDetails.reduce((sum, item) => sum + item.score, 0);
      const newAverage = totalScore / newCount;

      const updatedRatingInfo: RatingInfo = {
        average: newAverage,
        count: newCount,
        details: newDetails,
      };

      const updatedProduct = await AppProviders.UpdateProductUseCase.execute(productId, {
        rating: updatedRatingInfo,
      });

      if (updatedProduct) {
        setRatingData(updatedProduct.rating || { average: 0, count: 0, details: [] });
        toast.success(hasVoted ? "Đã cập nhật đánh giá của bạn!" : "Cảm ơn bạn đã đánh giá!");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || "Không thể cập nhật đánh giá");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
        <div className="flex items-center gap-0.5 text-amber-500">
          {[...Array(5)].map((_, i) => {
            const starValue = i + 1;
            // Hiển thị: Ưu tiên Hover -> Nếu đã vote thì hiện vote cũ -> Nếu chưa hiện trung bình
            const displayValue = hover || (hasVoted ? userScore : ratingData.average);
            const isActive = starValue <= (displayValue || 0);

            return (
              <button
                key={i}
                type="button"
                disabled={isUpdating}
                onMouseEnter={() => setHover(starValue)}
                onMouseLeave={() => setHover(0)}
                onClick={() => handleUpdateRating(starValue)}
                className="transition-all hover:scale-110 active:scale-95 disabled:opacity-50"
              >
                <Star
                  size={18}
                  fill={isActive ? "currentColor" : "none"}
                  className={isActive ? "" : "text-slate-200"}
                />
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 ml-2">
          {isUpdating ? (
            <Loader2 size={14} className="animate-spin text-slate-400" />
          ) : (
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-slate-900">
                {ratingData.average?.toFixed(1) || "0.0"}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                ({ratingData.count || 0})
              </span>
            </div>
          )}
        </div>
      </div>

      {hasVoted && !isUpdating && (
        <div className="flex items-center gap-1 ml-0.5">
          <span className="text-[10px] text-blue-600 font-semibold">
            Bạn đã chấm {userScore} sao. Click để đổi?
          </span>
        </div>
      )}
    </div>
  );
}