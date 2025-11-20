import { isServer, QueryClient } from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
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
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    return makeQueryClient()
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}