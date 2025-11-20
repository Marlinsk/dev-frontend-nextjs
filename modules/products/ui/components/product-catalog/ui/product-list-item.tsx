import { memo } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Product } from '../../../../types/product'

interface ProductListItemProps {
  product: Product;
}

function ProductListItemComponent({ product }: ProductListItemProps) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-4 transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 text-sm font-semibold text-card-foreground">
            {product.title}
          </h3>
          <span className="shrink-0 text-sm font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <p className="line-clamp-2 text-xs text-muted-foreground">
          {product.description}
        </p>

        <div className="mt-auto pt-2">
          <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
            {product.category}
          </span>
        </div>
      </div>
    </Link>
  )
}

export const ProductListItem = memo(ProductListItemComponent)
