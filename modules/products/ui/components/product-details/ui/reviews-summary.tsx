import { memo } from "react"
import { RatingStars } from "./rating-stars"

interface ReviewsSummaryProps {
  rating: number
  reviewCount: number
}

const STAR_LEVELS = [5, 4, 3, 2, 1] as const

function ReviewsSummaryComponent({ rating, reviewCount }: ReviewsSummaryProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 p-4 sm:p-6 border border-border rounded-lg">
      <div className="flex flex-col items-center gap-2 sm:min-w-[120px]">
        <span className="text-4xl sm:text-5xl font-bold">{rating.toFixed(1)}</span>
        <RatingStars rating={rating} />
        <span className="text-xs sm:text-sm text-muted-foreground">{reviewCount} avaliações</span>
      </div>
      <div className="flex-1 space-y-1.5 sm:space-y-2">
        {STAR_LEVELS.map((stars) => {
          const percentage = Math.max(10, Math.min(90, (stars / 5) * 100 + (rating * 2)))
          return (
            <div key={stars} className="flex items-center gap-2 sm:gap-3">
              <span className="text-xs sm:text-sm w-8 sm:w-12">{stars}</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-xs sm:text-sm text-muted-foreground w-10 sm:w-12 text-right">
                {percentage.toFixed(0)}%
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const ReviewsSummary = memo(ReviewsSummaryComponent)
