import { Header } from "../components/header"

interface LayoutProps {
  children: React.ReactNode
}

/**
 * Layout principal da aplicação
 *
 * Estrutura básica com Header e container centralizado.
 * O ProductToolbarWrapper deve ser usado diretamente nas páginas
 * que precisam de filtros (home e search).
 */
export function Layout ({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />
      <div className="mx-auto max-w-7xl p-6">
        {children}
      </div>
    </div>
  )
}