'use client'

import { useMemo } from 'react'

import { EmptyState } from '../../states/empty-state'
import { ProductsGrid } from '../../containers/products-grid'
import { useProductsList } from '@/modules/products/http/hooks'
import { useProductToolbar } from '@/modules/products/context'

/**
 * Componente principal do catálogo de produtos
 *
 * Responsabilidades:
 * - Consumir produtos prefetch via TanStack Query com Suspense
 * - Consumir estado de filtros do ProductToolbarContext
 * - Filtrar produtos baseado nos critérios selecionados
 * - Renderizar UI com otimizações de performance
 *
 * Otimizações de Performance:
 * - Dados prefetch no servidor (SSR) via HydrationBoundary
 * - useSuspenseQuery: Suspende durante loading, integra com React Suspense
 * - Estado de filtros gerenciado por contexto (useTransition, useDeferredValue)
 * - useMemo: Memoriza cálculo de produtos filtrados
 */
export function ProductCatalog() {
  // Consome estado de filtros do contexto
  const { searchQuery, deferredCategory, isPending } = useProductToolbar()

  // useSuspenseQuery consome dados prefetch do servidor
  // Se não houver cache, suspende e mostra fallback do Suspense
  // queryKey dinâmica: inclui searchQuery para buscar cache específico da busca
  const { data: products } = useProductsList(searchQuery)

  // useMemo: memoriza cálculo de filtragem para evitar reprocessamento desnecessário
  // Só recalcula quando products ou deferredCategory mudam
  const filteredProducts = useMemo(() => {
    if (!products) return []

    let filtered = products

    // Filtro por categoria (sempre aplicado no cliente)
    if (deferredCategory !== 'all') {
      filtered = filtered.filter((product) => product.category === deferredCategory)
    }

    // Filtro de busca JÁ foi aplicado no servidor via fetchGetAllProducts(searchQuery)
    // Não precisa reaplicar aqui

    return filtered
  }, [products, deferredCategory])

  const hasNoProducts = !products || products.length === 0

  if (hasNoProducts) {
    return (
      <EmptyState
        title="Nenhum produto encontrado"
      />
    )
  }

  const hasNoFilteredProducts = filteredProducts.length === 0

  return (
    <div className="w-full space-y-6">
      {hasNoFilteredProducts ? (
        <EmptyState
          title="Nenhum produto encontrado"
        />
      ) : (
        <ProductsGrid
          products={filteredProducts}
          isPending={isPending}
        />
      )}
    </div>
  )
}
