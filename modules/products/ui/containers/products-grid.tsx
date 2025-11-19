import { memo } from 'react'
import type { Product } from '@/modules/products/types/product'
import { ProductListItem } from '../components/product-catalog/ui/product-list-item'

interface ProductsGridProps {
  products: Product[]
  isPending?: boolean
}

function ProductsGridComponent({ products, isPending = false }: ProductsGridProps) {
  return (
    <div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 transition-opacity duration-200"
      style={{ opacity: isPending ? 0.6 : 1 }}
    >
      {products.map((product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </div>
  )
}

export const ProductsGrid = memo(ProductsGridComponent)
