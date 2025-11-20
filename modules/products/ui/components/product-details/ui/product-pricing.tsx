import { memo } from "react"

interface ProductPricingProps {
  discountedPrice: number
  originalPrice: number
  hasDiscount: boolean
}

function ProductPricingComponent({ discountedPrice, originalPrice, hasDiscount }: ProductPricingProps) {
  return (
    <div className="flex items-baseline gap-3">
      <h3 className="text-4xl font-bold">
        ${discountedPrice.toFixed(2)}
      </h3>
      {hasDiscount && (
        <span className="text-xl text-muted-foreground line-through">
          ${originalPrice.toFixed(2)}
        </span>
      )}
    </div>
  )
}

export const ProductPricing = memo(ProductPricingComponent)
