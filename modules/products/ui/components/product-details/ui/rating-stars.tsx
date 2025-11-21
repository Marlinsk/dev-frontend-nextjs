import { memo } from "react"
import { Star } from "lucide-react"

interface RatingStarsProps {
  rating: number
  reviewCount?: number
}

const STARS = [1, 2, 3, 4, 5] as const

function RatingStarsComponent({ rating, reviewCount }: RatingStarsProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {STARS.map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : star - 0.5 <= rating
                ? "fill-yellow-400/50 text-yellow-400"
                : "fill-muted text-muted"
            }`}
          />
        ))}
      </div>
      {reviewCount !== undefined && (
        <span className="text-sm text-muted-foreground">
          {rating.toFixed(1)} ({reviewCount} avaliações)
        </span>
      )}
    </div>
  )
}

export const RatingStars = memo(RatingStarsComponent)
