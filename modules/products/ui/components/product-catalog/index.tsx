'use client'

import { useCallback, useMemo, useState, useTransition, useDeferredValue } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { EmptyState } from '../../states/empty-state'
import { ProductsHeader } from '../products-header'
import { ProductsGrid } from '../../containers/products-grid'
import { ProductFilters } from './ui/product-filters'
import { useProductsList } from '@/modules/products/http/hooks/use-products'

interface ProductCatalogProps {
  initialSearchQuery?: string;
  initialCategory?: string;
  title?: string;
  subtitle?: string;
}

/**
 * Componente principal do catálogo de produtos
 *
 * Responsabilidades:
 * - Consumir produtos prefetch via TanStack Query com Suspense
 * - Gerenciar estado de filtros (categoria e busca)
 * - Filtrar produtos baseado nos critérios selecionados
 * - Renderizar UI com otimizações de performance
 *
 * Otimizações de Performance:
 * - Dados prefetch no servidor (SSR) via HydrationBoundary
 * - useSuspenseQuery: Suspende durante loading, integra com React Suspense
 * - useTransition: Marca mudança de categoria como transição de baixa prioridade
 * - useDeferredValue: Adia atualização de filtros para não bloquear UI
 * - useMemo: Memoriza cálculo de produtos filtrados
 * - useCallback: Previne recriação desnecessária de handlers
 */
export function ProductCatalog({ initialSearchQuery = '', initialCategory = 'all', title, subtitle }: ProductCatalogProps = {}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // useSuspenseQuery consome dados prefetch do servidor
  // Se não houver cache, suspende e mostra fallback do Suspense
  // queryKey dinâmica: inclui searchQuery para buscar cache específico da busca
  const { data: products } = useProductsList(initialSearchQuery)

  // Estados de filtros
  // Inicializa categoria com valor da URL
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  // searchQuery é somente-leitura, derivado de initialSearchQuery (vem da URL)
  // Mudanças no campo de busca não atualizam este valor - apenas navegação
  const searchQuery = initialSearchQuery

  // useTransition: permite marcar atualizações de estado como "não urgentes"
  // isPending indica se há uma transição em andamento
  const [isPending, startTransition] = useTransition()

  // useDeferredValue: cria versão "atrasada" do valor que só atualiza quando UI está livre
  // Evita que filtro de categoria bloqueie interações do usuário
  const deferredCategory = useDeferredValue(selectedCategory)

  // useCallback: memoriza função para evitar recriações desnecessárias
  // startTransition marca esta atualização como baixa prioridade
  // Também atualiza a URL com o novo valor de categoria
  const handleCategoryChange = useCallback((value: string) => {
    startTransition(() => {
      setSelectedCategory(value)

      // Atualiza URL com nova categoria
      const params = new URLSearchParams(searchParams.toString())

      if (value === 'all') {
        params.delete('category')
      } else {
        params.set('category', value)
      }

      const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname
      router.replace(newUrl, { scroll: false })
    })
  }, [router, searchParams])

  // useMemo: memoriza cálculo de filtragem para evitar reprocessamento desnecessário
  // Só recalcula quando products ou deferredCategory mudam
  // Nota: NÃO aplicamos filtro de busca aqui pois os dados já vêm filtrados do servidor
  const filteredProducts = useMemo(() => {
    if (!products) return []

    let filtered = products

    // Filtro por categoria (sempre aplicado no cliente)
    if (deferredCategory !== 'all') {
      filtered = filtered.filter((product) => product.category === deferredCategory)
    }

    // Filtro de busca JÁ foi aplicado no servidor via fetchGetAllProducts(searchQuery)
    // Não precisamos reaplicar aqui

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
      <div className="flex flex-col gap-4">
        <ProductsHeader 
          title={title ? title : "Produtos"} 
          subtitle={subtitle ? subtitle : undefined}
        />
        <ProductFilters
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
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
