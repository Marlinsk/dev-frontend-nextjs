import { memo } from "react"
import { ChevronDown } from "lucide-react"

interface ProductDescriptionProps {
  description: string
}

function ProductDescriptionComponent({ description }: ProductDescriptionProps) {
  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold">
        Descrição do Produto
      </h2>
      <div className="relative">
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
          {description}
        </p>
        <button className="flex items-center gap-1 mt-2 text-sm font-medium text-primary hover:underline">
          Ver mais
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export const ProductDescription = memo(ProductDescriptionComponent)
