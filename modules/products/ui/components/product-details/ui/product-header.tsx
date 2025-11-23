import { memo } from "react"
import { RatingStars } from "../../rating-stars"

interface ProductHeaderProps {
  category: string
  title: string
  rating: number
  reviewCount: number
}

function ProductHeaderComponent({ category, title, rating, reviewCount }: ProductHeaderProps) {
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex items-center gap-3">
        <span className="text-sm font-light rounded-full px-4 py-2 border border-border uppercase tracking-wide">
          {category}
        </span>
        <span className="text-xs text-muted-foreground">
          Análise do Produto
        </span>
      </div>
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
