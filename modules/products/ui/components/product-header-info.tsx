'use client'

import { usePathname, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMemo, useCallback, memo } from 'react'
import { useProductToolbar } from '@/modules/products/context'
import { useProductsList } from '@/modules/products/http/hooks'

/**
 * Componente que exibe informações de header de produtos
 *
 * Dinâmicas:
 * - Em rotas de listagem: Mostra contagem de produtos encontrados
 * - Em rotas /product/[id]/details: Mostra botão para voltar à página anterior
 *
 * Otimizações:
 * - React.memo para evitar re-renders desnecessários
 * - useCallback para memoizar handler de navegação
 * - useMemo para filtrar produtos apenas quando dependências mudam
 * - Verificação de pathname memoizada
 */
function ProductHeaderInfoComponent() {
  const pathname = usePathname()
  const router = useRouter()

  const { searchQuery, deferredCategory } = useProductToolbar()
  const { data: products } = useProductsList(searchQuery)

  // Memoiza verificação de página de detalhes
  const isProductDetailsPage = useMemo(
    () => pathname?.match(/\/product\/[^/]+\/details/) !== null,
    [pathname]
  )

  // Memoiza handler de voltar
  const handleGoBack = useCallback(() => {
    router.back()
  }, [router])

  // Filtra produtos apenas quando dependências mudam
  const filteredProducts = useMemo(() => {
    if (!products) return []

    if (deferredCategory === 'all') {
      return products
    }

    return products.filter((product) => product.category === deferredCategory)
  }, [products, deferredCategory])

  if (isProductDetailsPage) {
    return (
      <div className='flex justify-start'>
        <div className='flex text-center items-center space-x-2'>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleGoBack}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <div className='h-1 w-1 rounded-full bg-muted-foreground' />
          <span className='px-2.5 text-sm font-light'>
            Detalhes do produto
          </span>
        </div>
      </div>
    )
  }

  // Memoiza o texto do contador para evitar recálculos
  const productsCountText = useMemo(() => {
    const count = filteredProducts.length
    return `${count} ${count === 1 ? 'produto encontrado' : 'produtos encontrados'}`
  }, [filteredProducts.length])

  return (
    <p className="text-sm text-muted-foreground">
      {productsCountText}
    </p>
  )
}

export const ProductHeaderInfo = memo(ProductHeaderInfoComponent)
