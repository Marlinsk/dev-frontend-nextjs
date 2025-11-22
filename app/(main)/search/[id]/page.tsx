import { Suspense } from 'react'
import { ProductCatalog, ProductToolbarWrapper } from '@/modules/products/ui/components'
import { ProductCatalogSkeleton } from '@/modules/products/ui/loading'
import { getQueryClient } from '@/function/get-query-client'
import { fetchGetAllProducts } from '@/modules/products/http/products'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

interface SearchUrlParams {
  q: string;
  category?: string;
}

/**
 * Página de busca - Resultados filtrados com SSR + Suspense
 */
export default async function SearchPage({ searchParams }: { searchParams: Promise<SearchUrlParams>; }) {
  const params = await searchParams
  const query = params.q || ''

  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: () => fetchGetAllProducts(),
  })

  await queryClient.prefetchQuery({
    queryKey: ['products', query],
    queryFn: () => fetchGetAllProducts(query),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductToolbarWrapper>
        <Suspense fallback={<ProductCatalogSkeleton />}>
          <ProductCatalog />
        </Suspense>
      </ProductToolbarWrapper>
    </HydrationBoundary>
  )
}
