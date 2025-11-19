import { Skeleton } from '@/components/ui/skeleton'

export function ProductSearchSkeleton() {
  return (
    <div className="relative w-full sm:w-[420px]">
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  )
}
