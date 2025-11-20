import { Skeleton } from "@/components/ui/skeleton"

export function ProductDetailsSkeleton() {
  return (
    <div className="flex flex-col space-y-9">
      <div className="flex flex-col lg:flex-row gap-9">
        <Skeleton className="w-full lg:w-[640px] h-[600px] rounded-lg" />
        <div className="flex-1 flex flex-col space-y-5">
          <Skeleton className="w-32 h-10 rounded-full" />
          <div className="flex flex-col space-y-3">
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-3/4 h-10" />
            <Skeleton className="w-40 h-6" />
          </div>
          <div className="flex items-baseline gap-3">
            <Skeleton className="w-32 h-12" />
            <Skeleton className="w-24 h-8" />
          </div>
          <Skeleton className="w-48 h-6" />
          <div className="space-y-3">
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-10" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="w-48 h-12" />
            <Skeleton className="w-12 h-12 rounded-md" />
          </div>
          <div className="space-y-3">
            <Skeleton className="w-full h-16" />
          </div>
          <div className="flex flex-col space-y-4">
            <Skeleton className="w-48 h-8" />
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-3/4 h-6" />
          </div>
        </div>
      </div>
      <Skeleton className="w-full h-32 rounded-lg" />
      <div className="flex flex-col space-y-6">
        <Skeleton className="w-64 h-10" />
        <Skeleton className="w-full h-48 rounded-lg" />
        <div className="space-y-4">
          <Skeleton className="w-full h-32 rounded-lg" />
          <Skeleton className="w-full h-32 rounded-lg" />
          <Skeleton className="w-full h-32 rounded-lg" />
        </div>
      </div>
      <div className="flex flex-col space-y-6">
        <Skeleton className="w-64 h-10" />
        <div className="space-y-3">
          <Skeleton className="w-full h-16 rounded-lg" />
          <Skeleton className="w-full h-16 rounded-lg" />
          <Skeleton className="w-full h-16 rounded-lg" />
          <Skeleton className="w-full h-16 rounded-lg" />
        </div>
      </div>
    </div>
  )
}
