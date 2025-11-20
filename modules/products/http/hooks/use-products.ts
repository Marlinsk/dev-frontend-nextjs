import { useSuspenseQuery } from '@tanstack/react-query'
import { fetchGetAllProducts } from '../products/list'
import { fetchGetProductById } from '../products/get'

/**
 * Hook customizado para buscar a lista de produtos usando TanStack Query
 *
 * Utiliza useSuspenseQuery que:
 * - Suspende o componente durante o carregamento (requer Suspense boundary)
 * - Lança erros para o Error Boundary mais próximo em caso de falha
 * - Não retorna estados de loading/error (tratados por Suspense/ErrorBoundary)
 *
 * O cache é gerenciado automaticamente pelo TanStack Query:
 * - queryKey: ['products'] - Identifica esta query no cache
 * - queryFn: fetchGetAllProducts - Função que realiza o fetch
 * - Configurações globais vêm do QueryClient em providers/index.tsx
 *
 * @returns Objeto com data (produtos) e outras propriedades do TanStack Query
 */
export function useProductsList(searchQuery?: string) {
  return useSuspenseQuery({
    queryKey: searchQuery ? ['products', searchQuery] : ['products'],
    queryFn: () => fetchGetAllProducts(searchQuery),
  })
}

/**
 * Hook customizado para buscar um produto específico usando TanStack Query
 *
 * Utiliza useSuspenseQuery que:
 * - Suspende o componente durante o carregamento (requer Suspense boundary)
 * - Lança erros para o Error Boundary mais próximo em caso de falha
 * - Não retorna estados de loading/error (tratados por Suspense/ErrorBoundary)
 *
 * O cache é gerenciado automaticamente pelo TanStack Query:
 * - queryKey: ['product', productId] - Identifica esta query no cache
 * - queryFn: fetchGetProductById - Função que realiza o fetch
 * - Configurações globais vêm do QueryClient em providers/index.tsx
 *
 * @param productId - ID do produto a ser buscado
 * @returns Objeto com data (produto) e outras propriedades do TanStack Query
 */
export function useGetProductById(productId: number) {
  return useSuspenseQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchGetProductById(productId),
  })
}
