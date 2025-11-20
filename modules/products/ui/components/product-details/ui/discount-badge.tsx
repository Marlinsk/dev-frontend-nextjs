import { memo } from "react"

interface DiscountBadgeProps {
  discount: number
}

function DiscountBadgeComponent({ discount }: DiscountBadgeProps) {
  if (discount === 0) return null

  return (
    <div className="absolute top-4 right-4 bg-red-400 text-white px-3 py-1 rounded-full font-semibold text-sm">
      -{discount}% OFF
    </div>
  )
}

export const DiscountBadge = memo(DiscountBadgeComponent)
