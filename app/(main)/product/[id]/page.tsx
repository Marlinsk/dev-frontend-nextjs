import { Suspense } from 'react'
import { ProductListSkeleton } from '@/modules/products/ui/components'

interface ProductDetailsPageParams {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageParams) {
  const { id } = await params;

  return (
    <Suspense fallback={<ProductListSkeleton />}>
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-zinc-900">
          Produto ID: {id}
        </h1>
        <p className="text-zinc-600 mt-4">
          Página de detalhes do produto em construção
        </p>
      </div>
    </Suspense>
  )
}
