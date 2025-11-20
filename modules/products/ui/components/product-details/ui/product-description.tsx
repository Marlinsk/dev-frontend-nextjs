import { memo } from "react"

interface ProductDescriptionProps {
  description: string
}

function ProductDescriptionComponent({ description }: ProductDescriptionProps) {
  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold">Descrição do Produto</h2>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  )
}

export const ProductDescription = memo(ProductDescriptionComponent)
