import { Skeleton } from '@/components/ui/skeleton'

/**
 * Skeleton loading para ProductToolbar
 *
 * Exibe placeholders animados durante o carregamento do componente:
 * - ProductSearch skeleton (barra de busca + botão)
 * - CategoryFilter skeleton (filtro de categoria)
 */
export function ProductToolbarSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 justify-between w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3 w-full">
        <div className="flex flex-row gap-2 w-full sm:w-[420px]">
          <Skeleton className="h-9 w-full rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md shrink-0" />
        </div>
        <Skeleton className="h-9 w-full sm:w-64 rounded-md" />
      </div>
    </div>
  )
}
