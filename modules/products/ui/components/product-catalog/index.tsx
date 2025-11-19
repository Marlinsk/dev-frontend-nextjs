'use client'

import { useCallback, useMemo, useState, useTransition, useDeferredValue } from 'react'

import { useProductsList } from '@/modules/products/http/hooks/use-products'
import { EmptyState } from '../../states/empty-state'
import { ProductsHeader } from '../products-header'
import { ProductsGrid } from '../../containers/products-grid'
import { ProductFilters } from './ui/product-filters'

interface ProductCatalogProps {
  initialSearchQuery?: string;
  title?: string;
  subtitle?: string;
}

/**
 * Componente principal do catálogo de produtos
 *
 * Responsabilidades:
 * - Buscar produtos via TanStack Query (useProductsList)
 * - Gerenciar estado de filtros (categoria e busca)
 * - Filtrar produtos baseado nos critérios selecionados
 * - Renderizar UI com otimizações de performance
 *
 * Otimizações de Performance:
 * - useTransition: Marca mudança de categoria como transição de baixa prioridade
 * - useDeferredValue: Adia atualização de filtros para não bloquear UI
 * - useMemo: Memoriza cálculo de produtos filtrados
 * - useCallback: Previne recriação desnecessária de handlers
 */
export function ProductCatalog({ initialSearchQuery = '', title, subtitle }: ProductCatalogProps = {}) {
  // Busca produtos usando Suspense Query (suspende durante loading)
  const { data: products, isLoading } = useProductsList()

  // Estados de filtros
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery)

  // useTransition: permite marcar atualizações de estado como "não urgentes"
  // isPending indica se há uma transição em andamento
  const [isPending, startTransition] = useTransition()

  // useDeferredValue: cria versão "atrasada" do valor que só atualiza quando UI está livre
  // Evita que filtros bloqueiem interações do usuário
  const deferredCategory = useDeferredValue(selectedCategory)
  const deferredSearchQuery = useDeferredValue(searchQuery)

  // useCallback: memoriza função para evitar recriações desnecessárias
  // startTransition marca esta atualização como baixa prioridade
  const handleCategoryChange = useCallback((value: string) => {
    startTransition(() => {
      setSelectedCategory(value)
    })
  }, [])

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value)
  }, [])

  // useMemo: memoriza cálculo de filtragem para evitar reprocessamento desnecessário
  // Só recalcula quando products, deferredCategory ou deferredSearchQuery mudam
  const filteredProducts = useMemo(() => {
    if (!products) return []

    let filtered = products

    // Filtro por categoria
    if (deferredCategory !== 'all') {
      filtered = filtered.filter((product) => product.category === deferredCategory)
    }

    // Filtro por busca (título, categoria ou descrição)
    if (deferredSearchQuery.trim()) {
      const searchTerm = deferredSearchQuery.toLowerCase().trim()
      filtered = filtered.filter((product) => {
        const titleMatch = product.title.toLowerCase().includes(searchTerm)
        const categoryMatch = product.category.toLowerCase().includes(searchTerm)
        const descriptionMatch = product.description.toLowerCase().includes(searchTerm)

        return titleMatch || categoryMatch || descriptionMatch
      })
    }

    return filtered
  }, [products, deferredCategory, deferredSearchQuery])

  const hasNoProducts = !products || products.length === 0

  if (isLoading) {
    return null
  }

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
      <div className="flex flex-col gap-4">
        <ProductsHeader 
          title={title ? title : "Produtos"} 
          subtitle={subtitle ? subtitle : undefined}
        />
        <ProductFilters
          products={products}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
        />
      </div>
      <p className="text-sm text-muted-foreground">
        {filteredProducts.length} {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
      </p>
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
