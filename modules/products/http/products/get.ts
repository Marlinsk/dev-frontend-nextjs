import z from "zod"
import { productItemSchema } from "../../schemas/products"
import { Product } from "../../types/product"
import { API_BASE_URL } from "@/constants"
import { ProductsFetchError } from "../../common/products-fetch-error"
import { formatValidationErrors } from "@/helpers/format-validation-errors"

/**
 * Trata erros HTTP (4xx, 5xx) da API
 * @throws {ProductsFetchError} Sempre lança erro com status e mensagem
 */
function handleHttpError(response: Response, productId: number): never {
  const errorMessage = `Erro ao buscar produto ${productId}: ${response.status} ${response.statusText}`
  throw new ProductsFetchError(errorMessage, response.status)
}

/**
 * Trata erros de validação Zod
 * Formata os erros de validação de forma legível antes de lançar
 * @throws {ProductsFetchError} Sempre lança erro com detalhes da validação
 */
function handleValidationError(validationError: unknown): never {
  if (validationError instanceof z.ZodError) {
    const errorDetails = formatValidationErrors(validationError)
    throw new ProductsFetchError(
      `Dados do produto inválidos: ${errorDetails}`,
      undefined,
      validationError
    )
  }

  throw validationError
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
    'Erro inesperado ao carregar produto',
    undefined,
    error
  )
}

/**
 * Valida os dados retornados pela API usando o schema Zod
 * Garante type-safety em runtime
 * @param data - Dados não tipados vindos da API
 * @returns Produto validado e tipado
 * @throws {ProductsFetchError} Se os dados não corresponderem ao schema
 */
function validateProductData(data: unknown): Product {
  try {
    return productItemSchema.parse(data)
  } catch (validationError) {
    handleValidationError(validationError)
  }
}

/**
 * Realiza a requisição HTTP para buscar um produto específico
 * @param productId - ID do produto a ser buscado
 * @returns Promise com os dados brutos (não validados) da resposta JSON
 * @throws {ProductsFetchError} Se a resposta não for OK (status 200-299)
 */
async function fetchProductById(productId: number): Promise<unknown> {
  const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    handleHttpError(response, productId);
  }

  return await response.json();
}

/**
 * Função principal para buscar um produto específico da FakeStore API
 *
 * Fluxo de execução:
 * 1. Faz a requisição HTTP para /products/{id}
 * 2. Valida os dados retornados com Zod
 * 3. Retorna produto tipado
 * 4. Trata qualquer erro que ocorra no processo
 *
 * @param productId - ID do produto a ser buscado
 * @returns Promise<Product> Produto validado e tipado
 * @throws {ProductsFetchError} Em caso de erro HTTP, validação ou rede
 */
export async function fetchGetProductById(productId: number): Promise<Product> {
  try {
    const data = await fetchProductById(productId)
    return validateProductData(data)
  } catch (error) {
    handleNetworkError(error)
  }
}
