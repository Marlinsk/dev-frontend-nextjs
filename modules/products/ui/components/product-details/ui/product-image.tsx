import { memo } from "react"
import Image from "next/image"

interface ProductImageProps {
  image: string
  title: string
}

function ProductImageComponent({ image, title }: ProductImageProps) {
  return (
    <div className="relative w-full self-start border py-20 overflow-hidden bg-muted rounded-lg">
      <div className="relative w-full h-[400px]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain rounded shrink-0"
          sizes="(max-width: 1024px) 100vw, 500px"
          loading="lazy"
        />
      </div>
    </div>
  )
}

export const ProductImage = memo(ProductImageComponent)
