import { memo } from "react"
import { ReviewsSummary } from "./reviews-summary"
import { ReviewComment } from "./review-comment"

interface CustomerReviewsProps {
  rating: number
  reviewCount: number
}

function CustomerReviewsComponent({ rating, reviewCount }: CustomerReviewsProps) {
  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold">Avaliações dos Clientes</h2>
      <div className="flex flex-col gap-4">
        <ReviewsSummary rating={rating} reviewCount={reviewCount} />
        <div className="space-y-4">
          <ReviewComment
            author="João Silva"
            rating={5}
            date="há 2 dias"
            comment="Produto excelente! Superou minhas expectativas. Entrega rápida e embalagem impecável."
          />
          <ReviewComment
            author="Maria Santos"
            rating={4}
            date="há 1 semana"
            comment="Muito bom! Produto de qualidade, exatamente como descrito. Recomendo!"
          />
        </div>
      </div>
    </div>
  )
}

export const CustomerReviews = memo(CustomerReviewsComponent)
