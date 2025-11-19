'use client'

import { memo, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'

import { ProductSearch } from '../../product-search'
import { CategoryFilter } from '../../category-filter'
import { fetchGetAllProducts } from '@/modules/products/http/products/list'

interface ProductFiltersProps {
  searchQuery: string;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
}

/**
 * Componente de filtros de produtos
 *
 * Usa useQuery independente para buscar produtos sem depender do ProductCatalog
 * Filtra produtos por categoria antes de passar para ProductSearch (sugestões)
 */
function ProductFiltersComponent(props: ProductFiltersProps) {
  // useQuery independente para sugestões de busca
  // Usa cache compartilhado com ProductCatalog ['products']
  const { data: allProducts = [] } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchGetAllProducts(),
  })

  // Filtra produtos por categoria para sugestões de busca
  // Sugestões devem respeitar a categoria selecionada
  const filteredProductsForSuggestions = useMemo(() => {
    if (props.selectedCategory === 'all') {
      return allProducts
    }
    return allProducts.filter((product) => product.category === props.selectedCategory)
  }, [allProducts, props.selectedCategory])

  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
      <ProductSearch
        products={filteredProductsForSuggestions}
        value={props.searchQuery}
      />
      <CategoryFilter
        value={props.selectedCategory}
        onValueChange={props.onCategoryChange}
      />
    </div>
  )
}

export const ProductFilters = memo(ProductFiltersComponent)
