import { Suspense } from 'react'
import { ProductCatalog, ProductListSkeleton } from '@/modules/products/ui/components'

/**
 * Página inicial da aplicação (Home)
 *
 * Utiliza o padrão de Suspense do React para:
 * - Mostrar skeleton enquanto ProductCatalog carrega dados
 * - ProductCatalog usa useSuspenseQuery que suspende durante fetch
 * - Fallback (ProductListSkeleton) é exibido automaticamente durante suspensão
 *
 * Este padrão elimina a necessidade de gerenciar estados de loading manualmente
 * dentro do componente ProductCatalog.
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <div className="mx-auto max-w-7xl p-6">
        <div className="flex min-h-screen flex-col">
          {/* Suspense boundary: captura suspensões de componentes filhos */}
          <Suspense fallback={<ProductListSkeleton />}>
            <ProductCatalog />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
