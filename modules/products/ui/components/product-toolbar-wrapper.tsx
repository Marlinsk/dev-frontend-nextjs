'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'
import { ProductToolbarProvider } from '@/modules/products/context'
import { ProductToolbar } from './product-toolbar'
import { ProductHeaderInfo } from './product-header-info'
import { ProductToolbarSkeleton, ProductCatalogSkeleton } from '../loading'

interface ProductToolbarWrapperProps {
  children: React.ReactNode;
}

/**
 * Componente interno - usa useSearchParams dentro de Suspense boundary
 */
function ProductToolbarContent({ children }: ProductToolbarWrapperProps) {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('q') || ''
  const selectedCategory = searchParams.get('category') || 'all'
  const searchParamsString = searchParams.toString()

  return (
    <ProductToolbarProvider
      initialSearchQuery={searchQuery}
      initialCategory={selectedCategory}
      searchParamsString={searchParamsString}
    >
      <div className='flex flex-col gap-8'>
        <div className="flex flex-col gap-6">
          <ProductToolbar />
          <ProductHeaderInfo />
          {children}
        </div>
      </div>
    </ProductToolbarProvider>
  )
}

/**
 * Wrapper client-side para ProductToolbar com Suspense boundary
 */
export function ProductToolbarWrapper({ children }: ProductToolbarWrapperProps) {
  return (
    <Suspense fallback={
      <div className='flex flex-col gap-8'>
        <div className="flex flex-col gap-6">
          <ProductToolbarSkeleton />
          <Skeleton className="w-36 h-5" />
          <ProductCatalogSkeleton />
        </div>
      </div>
    }>
      <ProductToolbarContent>
        {children}
      </ProductToolbarContent>
    </Suspense>
  )
}
