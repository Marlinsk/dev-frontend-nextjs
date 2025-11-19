import { Suspense } from 'react'
import { ProductCatalog } from '@/modules/products/ui/components'
import { ProductCatalogSkeleton } from '@/modules/products/ui/loading'
import { getQueryClient } from '@/function/get-query-client'
import { fetchGetAllProducts } from '@/modules/products/http/products/list'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

interface SearchUrlParams {
  q: string;
  category?: string;
}

/**
 * Página de busca de produtos
 *
 * Estratégia de Server-Side Rendering (SSR) + Suspense com filtro server-side:
 * 1. Faz prefetch dos produtos FILTRADOS no servidor
 * 2. queryKey inclui o termo de busca para cache separado por query
 * 3. Hidrata o estado do TanStack Query no cliente via HydrationBoundary
 * 4. ProductCatalog usa useSuspenseQuery que:
 *    - Consome dados filtrados do cache instantaneamente
 *    - Se cache vazio, suspende e mostra ProductCatalogSkeleton
 * 5. initialSearchQuery e initialCategory são lidos da URL
 *
 * Benefícios:
 * - Filtragem no servidor (menos dados transferidos)
 * - Dados carregados no servidor (melhor SEO)
 * - Primeira renderização já contém apenas produtos relevantes
 * - Cache separado por termo de busca
 * - Categoria persistida na URL (shareable, bookmarkable)
 * - Fallback elegante caso cache não esteja disponível
 */
export default async function SearchPage({ searchParams }: { searchParams: Promise<SearchUrlParams>; }) {
  const params = await searchParams
  const query = params.q || ''
  const category = params.category || 'all'

  const queryClient = getQueryClient()

  // Prefetch TODOS os produtos para sugestões de busca (ProductSearch)
  // Isso garante que ProductFilters tenha dados para sugestões
  await queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: () => fetchGetAllProducts(),
  })

  // Prefetch com filtro de busca server-side para ProductCatalog
  // queryKey inclui o termo de busca para cache separado por query
  await queryClient.prefetchQuery({
    queryKey: ['products', query],
    queryFn: () => fetchGetAllProducts(query),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductCatalogSkeleton />}>
        <ProductCatalog
          initialSearchQuery={query}
          initialCategory={category}
          title="Resultados da busca"
          subtitle={query ? `Você pesquisou: ${query}` : undefined}
        />
      </Suspense>
    </HydrationBoundary>
  )
}
