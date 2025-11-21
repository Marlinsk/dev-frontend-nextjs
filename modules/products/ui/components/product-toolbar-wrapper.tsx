'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'
import { ProductToolbarProvider } from '@/modules/products/context'
import { ProductToolbar } from './product-toolbar'
import { ProductHeaderInfo } from './product-header-info'
import { ProductToolbarSkeleton } from '../loading'

interface ProductToolbarWrapperProps {
  children: React.ReactNode;
}

/**
 * Wrapper client-side para ProductToolbar
 *
 * Este componente lê os searchParams da URL no lado do cliente
 * e fornece o contexto de filtros para os componentes filhos
 *
 * Otimizações:
 * - Suspense boundary para ProductToolbar durante fetch inicial
 * - ProductToolbarSkeleton exibe placeholders durante carregamento
 * - ProductHeaderInfo também envolto em Suspense para carregamento independente
 */
export function ProductToolbarWrapper({ children }: ProductToolbarWrapperProps) {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('q') || ''
  const selectedCategory = searchParams.get('category') || 'all'

  return (
    <ProductToolbarProvider
      initialSearchQuery={searchQuery}
      initialCategory={selectedCategory}
    >
      <div className="flex flex-col gap-6">
        <Suspense fallback={<ProductToolbarSkeleton />}>
          <ProductToolbar />
        </Suspense>
        <Suspense fallback={<Skeleton className="w-36 h-5" />}>
          <ProductHeaderInfo />
        </Suspense>
        {children}
      </div>
    </ProductToolbarProvider>
  )
}
