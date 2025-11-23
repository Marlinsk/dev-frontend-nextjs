'use client'

import { memo, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'

import { ProductSearch } from './product-search'
import { CategoryFilter } from './category-filter'
import { fetchGetAllProducts } from '@/modules/products/http/products'
import { useProductToolbar } from '@/modules/products/context'

/**
 * Componente de barra de ferramentas de produtos
 *
 * Consome estado do ProductToolbarContext
 * Usa useQuery independente para buscar produtos sem depender do ProductCatalog
 * Filtra produtos por categoria antes de passar para ProductSearch (sugestões)
 */
function ProductToolbarComponent() {
  const { searchQuery, selectedCategory, handleCategoryChange } = useProductToolbar()

  // useQuery independente para sugestões de busca
  // Usa cache compartilhado com ProductCatalog ['products']
  const { data: allProducts = [] } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchGetAllProducts(),
  })

  // Filtra produtos por categoria para sugestões de busca
  // Sugestões devem respeitar a categoria selecionada
  const filteredProductsForSuggestions = useMemo(() => {
    if (selectedCategory === 'all') {
      return allProducts
    }
    return allProducts.filter((product) => product.category === selectedCategory)
  }, [allProducts, selectedCategory])

  return (
    <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 justify-between w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3 w-full">
        <ProductSearch
          products={filteredProductsForSuggestions}
          value={searchQuery}
        />
        <CategoryFilter
          value={selectedCategory}
          onValueChange={handleCategoryChange}
        />
      </div>
    </div>
  )
}

export const ProductToolbar = memo(ProductToolbarComponent)
