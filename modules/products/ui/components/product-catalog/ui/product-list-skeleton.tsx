import { Skeleton } from '@/components/ui/skeleton'
import { ProductCardSkeleton } from '../../../loading/product-card-skeleton'

export function ProductListSkeleton() {
  return (
    <div className="w-full">
      <div className="mb-6">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="mt-2 h-4 w-32" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}

