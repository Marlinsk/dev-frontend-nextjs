'use client'

import { memo } from 'react'

import { ProductSearch } from '../../product-search'
import { CategoryFilter } from '../../category-filter'
import { Product } from '../../../../types/product'

interface ProductFiltersProps {
  products: Product[];
  searchQuery: string;
  selectedCategory: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

function ProductFiltersComponent(props: ProductFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
      <ProductSearch
        products={props.products}
        value={props.searchQuery}
        onValueChange={props.onSearchChange}
      />
      <CategoryFilter
        value={props.selectedCategory}
        onValueChange={props.onCategoryChange}
      />
    </div>
  )
}

export const ProductFilters = memo(ProductFiltersComponent)
