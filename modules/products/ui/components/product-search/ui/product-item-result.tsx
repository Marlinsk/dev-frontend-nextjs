import { memo } from 'react'
import { Product } from "@/modules/products/types/product";

interface ProductItemResultProps {
  props: Product
}

function ProductItemResultComponent({ props }: ProductItemResultProps) {
  return (
    <div className="flex items-start gap-3 w-full">
      <img
        src={props.image}
        alt={props.title}
        className="w-10 h-10 object-contain rounded shrink-0"
        loading="lazy"
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">
          {props.title}
        </p>
        <p className="text-xs text-muted-foreground truncate">
          {props.category}
        </p>
      </div>
      <span className="text-sm font-semibold text-primary shrink-0">
        ${props.price.toFixed(2)}
      </span>
    </div>
  )
}

export const ProductItemResult = memo(ProductItemResultComponent)