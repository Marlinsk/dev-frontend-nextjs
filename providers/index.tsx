"use client"

import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { getQueryClient } from "@/function/get-query-client"

/**
 * Provider global para configuração do TanStack Query
 *
 * Este componente encapsula toda a aplicação e fornece acesso ao QueryClient,
 * permitindo o uso de hooks como useQuery e useMutation em qualquer parte da aplicação.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}