import { memo } from "react"
import { RatingStars } from "./rating-stars"

interface ProductHeaderProps {
  category: string
  title: string
  rating: number
  reviewCount: number
}

function ProductHeaderComponent({ category, title, rating, reviewCount }: ProductHeaderProps) {
  return (
    <div className="flex flex-col space-y-3">
      <h3 className="w-fit text-center text-sm font-light rounded-full px-4 py-2 border border-border uppercase tracking-wide">
        {category}
      </h3>
      <h2 className="text-3xl font-semibold leading-tight">
        {title}
      </h2>
      <RatingStars
        rating={rating}
        reviewCount={reviewCount}
      />
    </div>
  )
}

export const ProductHeader = memo(ProductHeaderComponent)
