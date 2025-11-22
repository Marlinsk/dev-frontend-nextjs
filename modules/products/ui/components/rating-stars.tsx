import { memo } from "react"
import { Star } from "lucide-react"

interface RatingStarsProps {
  rating: number
  reviewCount?: number
  size?: "sm" | "md"
}

const STARS = [1, 2, 3, 4, 5] as const

function RatingStarsComponent({ rating, reviewCount, size = "md" }: RatingStarsProps) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-5 h-5"
  }

  const textClasses = {
    sm: "text-xs",
    md: "text-sm"
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {STARS.map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
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
        <span className={`${textClasses[size]} text-muted-foreground`}>
          {rating.toFixed(1)} ({reviewCount} avaliações)
        </span>
      )}
    </div>
  )
}

export const RatingStars = memo(RatingStarsComponent)
