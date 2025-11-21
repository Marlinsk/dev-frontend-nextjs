import { memo } from 'react'

interface ProductsHeaderProps {
  title: string;
  subtitle?: string;
}

function ProductsHeaderComponent({ title, subtitle }: ProductsHeaderProps) {
  return (
    <div className="flex flex-col space-y-2">
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      {subtitle && (
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      )}
    </div>
  )
}

export const ProductsHeader = memo(ProductsHeaderComponent)
