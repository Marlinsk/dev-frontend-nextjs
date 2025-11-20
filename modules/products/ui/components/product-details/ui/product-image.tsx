import { memo } from "react"
import Image from "next/image"
import { DiscountBadge } from "./discount-badge"

interface ProductImageProps {
  image: string
  title: string
  discount: number
}

function ProductImageComponent({ image, title, discount }: ProductImageProps) {
  return (
    <div className="relative w-full lg:w-[640px] border py-20 overflow-hidden bg-muted rounded-lg">
      <DiscountBadge discount={discount} />
      <div className="relative w-full h-[560px]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain rounded shrink-0"
          sizes="(max-width: 1024px) 100vw, 640px"
          loading="lazy"
        />
      </div>
    </div>
  )
}

export const ProductImage = memo(ProductImageComponent)
