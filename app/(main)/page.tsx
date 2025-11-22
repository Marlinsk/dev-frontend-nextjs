import { Suspense } from 'react'
import { ProductCatalog, ProductToolbarWrapper } from '@/modules/products/ui/components'
import { ProductCatalogSkeleton } from '@/modules/products/ui/loading'
import { getQueryClient } from '@/function/get-query-client'
import { fetchGetAllProducts } from '@/modules/products/http/products'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

/**
 * Página inicial - Lista de produtos com SSR + Suspense
 */
export default async function Home() {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: () => fetchGetAllProducts(),
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
