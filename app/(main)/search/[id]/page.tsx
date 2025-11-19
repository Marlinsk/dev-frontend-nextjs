import { Suspense } from 'react'
import { ProductCatalog } from '@/modules/products/ui/components'
import { ProductCatalogSkeleton } from '@/modules/products/ui/loading';

interface SearchUrlParams {
  q: string;
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<SearchUrlParams>; }) {
  const params = await searchParams;
  const query = params.q || '';
  
  return (
    <Suspense fallback={<ProductCatalogSkeleton />}>
      <ProductCatalog
        initialSearchQuery={query}
        title="Resultados da busca"
        subtitle={query ? `Você pesquisou: ${query}` : undefined}
      />
    </Suspense>
  )
}
