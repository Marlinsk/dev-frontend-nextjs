import { Skeleton } from '@/components/ui/skeleton'

function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-border bg-card">
      <Skeleton className="aspect-square w-full" />

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-5 w-16" />
        </div>

        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />

        <div className="mt-auto pt-2">
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
      </div>
    </div>
  )
}

function ProductsHeaderSkeleton() {
  return (
    <div className="flex flex-col space-y-2">
      <Skeleton className="h-8 w-40" />
      <Skeleton className="h-4 w-32" />
    </div>
  )
}

function ProductSearchSkeleton() {
  return (
    <div className="relative w-full sm:w-[420px]">
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  )
}

function CategoryFilterSkeleton() {
  return (
    <div className="relative w-44">
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  )
}

function ProductCatalogSkeleton() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-4">
        <ProductsHeaderSkeleton />
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
          <ProductSearchSkeleton />
          <CategoryFilterSkeleton />
        </div>
      </div>
      <div className="relative w-[256px]">
        <Skeleton className="h-4 w-full rounded-md" />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}

export { ProductCatalogSkeleton }