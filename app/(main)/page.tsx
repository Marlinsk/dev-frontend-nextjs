import { Suspense } from 'react'
import { ProductCatalog } from '@/modules/products/ui/components'
import { ProductCatalogSkeleton } from '@/modules/products/ui/loading'

/**
 * Página inicial da aplicação (Home)
 *
 * Utiliza o padrão de Suspense do React para:
 * - Mostrar skeleton enquanto ProductCatalog carrega dados
 * - ProductCatalog usa useSuspenseQuery que suspende durante fetch
 * - Fallback (ProductCatalogSkeleton) é exibido automaticamente durante suspensão
 *
 * Este padrão elimina a necessidade de gerenciar estados de loading manualmente
 * dentro do componente ProductCatalog.
 */
export default function Home() {
  return (
    <Suspense fallback={<ProductCatalogSkeleton />}>
      <ProductCatalog />
    </Suspense>
  )
}
