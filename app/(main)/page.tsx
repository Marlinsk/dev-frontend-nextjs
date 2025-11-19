import { Suspense } from 'react'
import { ProductCatalog } from '@/modules/products/ui/components'
import { ProductCatalogSkeleton } from '@/modules/products/ui/loading'
import { getQueryClient } from '@/function/get-query-client'
import { fetchGetAllProducts } from '@/modules/products/http/products/list'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

/**
 * Página inicial da aplicação (Home)
 *
 * Estratégia de Server-Side Rendering (SSR) + Suspense:
 * 1. Faz prefetch dos produtos no servidor
 * 2. Hidrata o estado do TanStack Query no cliente via HydrationBoundary
 * 3. ProductCatalog usa useSuspenseQuery que:
 *    - Consome dados do cache instantaneamente (sem suspender)
 *    - Se cache vazio, suspende e mostra ProductCatalogSkeleton
 *
 * Benefícios:
 * - Dados carregados no servidor (melhor SEO)
 * - Primeira renderização já contém produtos (cache prefetch)
 * - Fallback elegante caso cache não esteja disponível
 * - Integração nativa com modelo de Suspense do React
 */
export default async function Home() {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: () => fetchGetAllProducts(),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductCatalogSkeleton />}>
        <ProductCatalog />
      </Suspense>
    </HydrationBoundary>
  )
}
