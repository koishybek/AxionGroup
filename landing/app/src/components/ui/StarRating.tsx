import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, reviewCount, size = 14 }) => {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={star <= Math.round(rating) ? 'text-[#FFD700] fill-[#FFD700]' : 'text-[#E5E5E5]'}
          />
        ))}
      </div>
      {reviewCount !== undefined && (
        <span className="text-[13px] text-[#8C8C8C]">{reviewCount} отзыва</span>
      )}
    </div>
  );
};
