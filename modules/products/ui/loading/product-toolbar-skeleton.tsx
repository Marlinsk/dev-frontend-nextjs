import { Skeleton } from '@/components/ui/skeleton'

/**
 * Skeleton loading para ProductToolbar
 *
 * Exibe placeholders animados durante o carregamento do componente:
 * - ProductSearch skeleton (barra de busca)
 * - CategoryFilter skeleton (filtro de categoria)
 * - ProductOptionsMenu skeleton (botão de opções)
 */
export function ProductToolbarSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-between w-full">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
        <div className="relative w-full sm:w-[420px]">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div className="relative w-full sm:w-44">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>
      <Skeleton className="h-10 w-10 rounded-md shrink-0" />
    </div>
  )
}
