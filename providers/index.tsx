"use client"

import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

/**
 * Provider global para configuração do TanStack Query
 *
 * Este componente encapsula toda a aplicação e fornece acesso ao QueryClient,
 * permitindo o uso de hooks como useQuery e useMutation em qualquer parte da aplicação.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  // Usa useState com lazy initialization para criar o QueryClient apenas uma vez
  // Isso evita que o cliente seja recriado em cada render
  const [queryClient] = useState(
    () => new QueryClient({
      defaultOptions: {
        queries: {
          // staleTime: tempo que os dados são considerados "frescos" antes de refetch (1 minuto)
          staleTime: 60 * 1000,

          // gcTime: tempo que dados inativos permanecem em cache antes de serem coletados (5 minutos)
          // Anteriormente chamado de "cacheTime" no TanStack Query v4
          gcTime: 5 * 60 * 1000,

          // Desabilita refetch automático quando a janela volta ao foco
          // Útil para economizar requests desnecessários durante desenvolvimento
          refetchOnWindowFocus: false,
        },
      },
    })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}