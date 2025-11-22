'use client'

import { memo, useCallback, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ProductOptionsMenu } from './product-options-menu'

/**
 * Header da página de detalhes do produto
 */
function ProductDetailsHeaderComponent() {
  const router = useRouter()

  const handleGoBack = useCallback(() => {
    router.back()
  }, [router])

  return (
    <div className="flex justify-between mb-6">
      <div className="flex text-center items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleGoBack}
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        <div className="h-1 w-1 rounded-full bg-muted-foreground" />
        <span className="px-2.5 text-sm font-light">
          Detalhes do produto
        </span>
      </div>
      <Suspense fallback={<Skeleton className="h-9 w-9" />}>
        <ProductOptionsMenu />
      </Suspense>
    </div>
  )
}

export const ProductDetailsHeader = memo(ProductDetailsHeaderComponent)
