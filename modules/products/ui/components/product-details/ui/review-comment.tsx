import { memo } from "react"
import { RatingStars } from "./rating-stars"

interface ReviewCommentProps {
  author: string
  rating: number
  date: string
  comment: string
}

function ReviewCommentComponent({ author, rating, date, comment }: ReviewCommentProps) {
  return (
    <div className="p-4 border border-border rounded-lg">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-semibold text-sm">{author}</p>
          <RatingStars rating={rating} />
        </div>
        <span className="text-xs text-muted-foreground">{date}</span>
      </div>
      <p className="text-sm text-muted-foreground">{comment}</p>
    </div>
  )
}

export const ReviewComment = memo(ReviewCommentComponent)
