'use client'

import { createContext, useContext, useState, useCallback, useTransition, useDeferredValue, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'

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
  searchParamsString?: string;
}

/**
 * Provider de contexto para toolbar de produtos
 */
export function ProductToolbarProvider({
  children,
  initialSearchQuery = '',
  initialCategory = 'all',
  searchParamsString = ''
}: ProductToolbarProviderProps) {
  const router = useRouter()

  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const searchQuery = initialSearchQuery
  const [isPending, startTransition] = useTransition()
  const deferredCategory = useDeferredValue(selectedCategory)

  const handleCategoryChange = useCallback((value: string) => {
    startTransition(() => {
      setSelectedCategory(value)

      const params = new URLSearchParams(searchParamsString)

      if (value === 'all') {
        params.delete('category')
      } else {
        params.set('category', value)
      }

      const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname
      router.replace(newUrl, { scroll: false })
    })
  }, [router, searchParamsString])

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
 */
export function useProductToolbar() {
  const context = useContext(ProductToolbarContext)

  if (!context) {
    throw new Error('useProductToolbar must be used within ProductToolbarProvider')
  }

  return context
}
