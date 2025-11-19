import { Skeleton } from '@/components/ui/skeleton'

export function CategoryFilterSkeleton() {
  return (
    <div className="w-full sm:w-44">
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  )
}
