"use client";

import { RatingInfo } from "@/src/domain/entity/product.entity";
import { useTranslation } from "@/src/presentation/context/LanguageContext";
import { AppProviders } from "@/src/provider/provider";
import { Loader2, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface RatingEditorProps {
  productId: string;
  initialRating: RatingInfo;
  currentUserId: string;
}

export default function RatingEditor({ productId, initialRating, currentUserId }: RatingEditorProps) {
  const { t } = useTranslation(); // Lấy hàm translate
  const [ratingData, setRatingData] = useState<RatingInfo>(initialRating);
  const [hover, setHover] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  const existingDetail = ratingData.details?.find((d) => d.userId === currentUserId);
  const hasVoted = !!existingDetail;
  const userScore = existingDetail?.score || 0;

  const handleUpdateRating = async (newScore: number) => {
    if (isUpdating || (hasVoted && newScore === userScore)) return;

    setIsUpdating(true);
    try {
      let newCount = ratingData.count || 0;
      let newDetails = [...(ratingData.details || [])];

      if (hasVoted) {
        newDetails = newDetails.map((d) =>
          d.userId === currentUserId ? { ...d, score: newScore, createdAt: new Date() } : d
        );
      } else {
        newCount += 1;
        newDetails.push({
          userId: currentUserId,
          score: newScore,
          createdAt: new Date(),
        });
      }

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
        // Sử dụng đa ngôn ngữ cho toast
        toast.success(hasVoted ? t.details.ratingUpdated : t.details.ratingSuccess);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast.error(t.details.ratingFailed);
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
            {/* Nội dung kết hợp biến số */}
            {t.details.userVotedPrefix} {userScore} {t.details.userVotedSuffix}
          </span>
        </div>
      )}
    </div>
  );
}
