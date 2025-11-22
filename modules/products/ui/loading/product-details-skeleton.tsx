import { Skeleton } from "@/components/ui/skeleton"

function CardSkeleton({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 p-4 rounded-lg border border-border bg-card">
      {children}
    </div>
  )
}

function MetricGridSkeleton({ columns = 4, items = 4 }: { columns?: number; items?: number }) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-${columns} gap-4`}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="h-5 w-20" />
        </div>
      ))}
    </div>
  )
}

export function ProductDetailsSkeleton() {
  return (
    <div className="flex flex-col space-y-9">
      <div className="flex flex-col lg:flex-row gap-9">
        {/* Left Column - Image and Description */}
        <div className="flex flex-col w-full lg:w-[500px] shrink-0 space-y-7">
          {/* Product Image */}
          <Skeleton className="aspect-square w-full rounded-lg" />

          {/* Description (hidden on mobile) */}
          <div className="hidden lg:flex flex-col space-y-4">
            <Skeleton className="h-8 w-48" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <Skeleton className="h-5 w-20" />
          </div>
        </div>

        {/* Right Column - Product Info */}
        <div className="flex-1 flex flex-col space-y-5">
          {/* Product Header */}
          <div className="flex flex-col space-y-3">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-28 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-3/4" />
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-5 w-5 rounded" />
              ))}
              <Skeleton className="h-4 w-20 ml-2" />
            </div>
          </div>

          {/* Description (visible on mobile) */}
          <div className="flex lg:hidden flex-col space-y-4">
            <Skeleton className="h-8 w-48" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <Skeleton className="h-5 w-20" />
          </div>

          {/* Sales Summary Card */}
          <CardSkeleton>
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-4 w-32" />
            </div>
            <MetricGridSkeleton columns={4} items={7} />
          </CardSkeleton>

          {/* Pricing Card */}
          <CardSkeleton>
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-4 w-36" />
            </div>
            <MetricGridSkeleton columns={3} items={7} />
          </CardSkeleton>

          {/* Stock Indicator Card */}
          <CardSkeleton>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <MetricGridSkeleton columns={3} items={6} />
          </CardSkeleton>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="flex flex-col space-y-4">
        <Skeleton className="h-8 w-56" />
        <div className="flex flex-col gap-4">
          {/* Reviews Summary */}
          <Skeleton className="h-32 w-full rounded-lg" />
          {/* Review Comments */}
          <div className="space-y-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-3 p-4 rounded-lg border border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex flex-col gap-1">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Skeleton key={j} className="h-4 w-4 rounded" />
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
