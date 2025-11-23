import { Header } from "../components/header"

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Layout principal da aplicação
 *
 * Estrutura básica com Header, container centralizado e footer.
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
      <footer className="w-full border-t bg-background">
        <div className="mx-auto max-w-7xl py-6 flex justify-center items-center">
          <span className="text-sm text-muted-foreground">Powered by <strong>ECODEMO Inc.</strong></span>
        </div>
      </footer>
    </div>
  )
}