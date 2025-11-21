import { useSuspenseQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchGetAllProducts } from '../products/list'
import { fetchGetProductById } from '../products/get'
import { fetchCreateProduct } from '../products/create'
import { fetchUpdateProduct } from '../products/update'
import { fetchDeleteProduct } from '../products/delete'

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

/**
 * Hook customizado para criar um novo produto usando TanStack Query Mutation
 *
 * Utiliza useMutation que:
 * - Executa a operação de criação de forma assíncrona
 * - Gerencia estados de loading, error e success automaticamente
 * - Permite invalidar queries relacionadas após sucesso
 * - Suporta callbacks onSuccess, onError, onSettled
 *
 * @returns Objeto mutation com mutate, mutateAsync e estados
 */
export function useCreateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: fetchCreateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

/**
 * Hook customizado para atualizar um produto existente usando TanStack Query Mutation
 *
 * Utiliza useMutation que:
 * - Executa a operação de atualização de forma assíncrona
 * - Gerencia estados de loading, error e success automaticamente
 * - Permite invalidar queries relacionadas após sucesso
 * - Suporta callbacks onSuccess, onError, onSettled
 *
 * @returns Objeto mutation com mutate, mutateAsync e estados
 */
export function useUpdateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: fetchUpdateProduct,
    onSuccess: (updatedProduct) => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['product', updatedProduct.id] })
    },
  })
}

/**
 * Hook customizado para deletar um produto usando TanStack Query Mutation
 *
 * Utiliza useMutation que:
 * - Executa a operação de deleção de forma assíncrona
 * - Gerencia estados de loading, error e success automaticamente
 * - Permite invalidar queries relacionadas após sucesso
 * - Suporta callbacks onSuccess, onError, onSettled
 *
 * @returns Objeto mutation com mutate, mutateAsync e estados
 */
export function useDeleteProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (productId: number) => fetchDeleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}
