import { Suspense } from "react"
import { ProductToolbarWrapper } from "@/modules/products/ui/components"

interface LayoutProps {
  children: React.ReactNode
}

/**
 * Layout principal da aplicação
 *
 * Otimizações:
 * - ProductToolbarWrapper envolto em Suspense para permitir useSearchParams
 * - Fallback simples durante hidratação
 */
export function Layout ({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-7xl p-6">
        <Suspense fallback={<div className="min-h-[200px]" />}>
          <ProductToolbarWrapper>
            {children}
          </ProductToolbarWrapper>
        </Suspense>
      </div>
    </div>
  )
}