import { Suspense } from 'react'
import { ProductCatalog, ProductListSkeleton } from '@/modules/products/ui/components'

interface SearchUrlParams {
  q: string;
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<SearchUrlParams>; }) {
  const params = await searchParams;
  const query = params.q || '';
  
  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <div className="mx-auto max-w-7xl p-6">
        <div className="flex min-h-screen flex-col">
          <Suspense fallback={<ProductListSkeleton />}>
            <ProductCatalog
              initialSearchQuery={query}
              title="Resultados da busca"
              subtitle={query ? `Você pesquisou: ${query}` : undefined}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
