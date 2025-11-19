import { Suspense } from 'react'
import { ProductCatalog, ProductListSkeleton } from '@/modules/products/ui/components'

interface SearchUrlParams {
  q: string;
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<SearchUrlParams>; }) {
  const params = await searchParams;
  const query = params.q || '';
  
  return (
    <Suspense fallback={<ProductListSkeleton />}>
      <ProductCatalog
        initialSearchQuery={query}
        title="Resultados da busca"
        subtitle={query ? `Você pesquisou: ${query}` : undefined}
      />
    </Suspense>
  )
}
