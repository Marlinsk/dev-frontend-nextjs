import { API_BASE_URL } from "@/constants"
import { ProductsFetchError } from "../../common/products-fetch-error"

/**
 * Trata erros HTTP (4xx, 5xx) da API
 * @throws {ProductsFetchError} Sempre lança erro com status e mensagem
 */
function handleHttpError(response: Response, productId: number): never {
  const errorMessage = `Erro ao deletar produto ${productId}: ${response.status} ${response.statusText}`
  throw new ProductsFetchError(errorMessage, response.status)
}

/**
 * Trata erros de rede e outros erros inesperados
 * Diferencia entre erros de conexão (TypeError) e outros erros
 * @throws {ProductsFetchError} Sempre lança erro apropriado ao tipo de falha
 */
function handleNetworkError(error: unknown): never {
  if (error instanceof ProductsFetchError) {
    throw error
  }

  if (error instanceof TypeError && error.message.includes('fetch')) {
    throw new ProductsFetchError(
      'Erro de conexão. Verifique sua internet e tente novamente.',
      undefined,
      error
    )
  }

  throw new ProductsFetchError(
    'Erro inesperado ao deletar produto',
    undefined,
    error
  )
}

/**
 * Realiza a requisição HTTP para deletar um produto
 * @param productId - ID do produto a ser deletado
 * @returns Promise que resolve quando o produto é deletado com sucesso
 * @throws {ProductsFetchError} Se a resposta não for OK (status 200-299)
 */
async function deleteProductRequest(productId: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    handleHttpError(response, productId)
  }
}

/**
 * Função principal para deletar um produto na FakeStore API
 *
 * Fluxo de execução:
 * 1. Faz a requisição HTTP DELETE
 * 2. Verifica se a resposta foi bem-sucedida
 * 3. Trata qualquer erro que ocorra no processo
 *
 * @param productId - ID do produto a ser deletado
 * @returns Promise<void> Resolve quando o produto é deletado com sucesso
 * @throws {ProductsFetchError} Em caso de erro HTTP ou de rede
 */
export async function fetchDeleteProduct(productId: number): Promise<void> {
  try {
    await deleteProductRequest(productId)
  } catch (error) {
    handleNetworkError(error)
  }
}
