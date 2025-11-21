'use client'

import { createContext, useContext, useState, useCallback, useTransition, useDeferredValue, type ReactNode } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface ProductToolbarContextValue {
  searchQuery: string;
  selectedCategory: string;
  deferredCategory: string;
  isPending: boolean;
  handleCategoryChange: (value: string) => void;
}

const ProductToolbarContext = createContext<ProductToolbarContextValue | null>(null)

interface ProductToolbarProviderProps {
  children: ReactNode;
  initialSearchQuery?: string;
  initialCategory?: string;
}

/**
 * Provider de contexto para toolbar de produtos
 *
 * Gerencia estado compartilhado entre ProductToolbar (no layout) e ProductCatalog
 * Responsabilidades:
 * - Gerenciar estado de filtros (categoria e busca)
 * - Sincronizar estado com URL
 * - Otimizações de performance (useTransition, useDeferredValue)
 */
export function ProductToolbarProvider({
  children,
  initialSearchQuery = '',
  initialCategory = 'all'
}: ProductToolbarProviderProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Estados de filtros
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const searchQuery = initialSearchQuery

  // useTransition: permite marcar atualizações de estado como "não urgentes"
  const [isPending, startTransition] = useTransition()

  // useDeferredValue: cria versão "atrasada" do valor que só atualiza quando UI está livre
  const deferredCategory = useDeferredValue(selectedCategory)

  // useCallback: memoriza função para evitar recriações desnecessárias
  // startTransition marca esta atualização como baixa prioridade
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

  const value: ProductToolbarContextValue = {
    searchQuery,
    selectedCategory,
    deferredCategory,
    isPending,
    handleCategoryChange,
  }

  return (
    <ProductToolbarContext.Provider value={value}>
      {children}
    </ProductToolbarContext.Provider>
  )
}

/**
 * Hook para acessar o contexto de toolbar de produtos
 * Lança erro se usado fora do ProductToolbarProvider
 */
export function useProductToolbar() {
  const context = useContext(ProductToolbarContext)

  if (!context) {
    throw new Error('useProductToolbar must be used within ProductToolbarProvider')
  }

  return context
}
