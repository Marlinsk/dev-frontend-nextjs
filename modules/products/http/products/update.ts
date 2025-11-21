import z from "zod"
import { productEditSchema, productItemSchema } from "../../schemas/products"
import { Product } from "../../types/product"
import { API_BASE_URL } from "@/constants"
import { ProductsFetchError } from "../../common/products-fetch-error"
import { formatValidationErrors } from "@/helpers/format-validation-errors"

type ProductUpdateInput = z.infer<typeof productEditSchema>

/**
 * Trata erros HTTP (4xx, 5xx) da API
 * @throws {ProductsFetchError} Sempre lança erro com status e mensagem
 */
function handleHttpError(response: Response, productId: number): never {
  const errorMessage = `Erro ao atualizar produto ${productId}: ${response.status} ${response.statusText}`
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
      `Dados de produto inválidos: ${errorDetails}`,
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
    'Erro inesperado ao atualizar produto',
    undefined,
    error
  )
}

/**
 * Valida os dados de entrada antes de enviar para a API
 * @param data - Dados do produto a serem atualizados
 * @returns Dados validados
 * @throws {ProductsFetchError} Se os dados não corresponderem ao schema
 */
function validateProductUpdateInput(data: ProductUpdateInput): ProductUpdateInput {
  try {
    return productEditSchema.parse(data)
  } catch (validationError) {
    handleValidationError(validationError)
  }
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
 * Realiza a requisição HTTP para atualizar um produto existente
 * @param productData - Dados do produto a ser atualizado (incluindo id)
 * @returns Promise com os dados brutos (não validados) da resposta JSON
 * @throws {ProductsFetchError} Se a resposta não for OK (status 200-299)
 */
async function updateProductRequest(productData: ProductUpdateInput): Promise<unknown> {
  const response = await fetch(`${API_BASE_URL}/products/${productData.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  })

  if (!response.ok) {
    handleHttpError(response, productData.id)
  }

  return await response.json()
}

/**
 * Função principal para atualizar um produto na FakeStore API
 *
 * Fluxo de execução:
 * 1. Valida os dados de entrada com Zod
 * 2. Faz a requisição HTTP PUT
 * 3. Valida os dados retornados com Zod
 * 4. Retorna o produto atualizado tipado
 * 5. Trata qualquer erro que ocorra no processo
 *
 * @param productData - Dados do produto a ser atualizado (incluindo id)
 * @returns Promise<Product> Produto atualizado validado e tipado
 * @throws {ProductsFetchError} Em caso de erro HTTP, validação ou rede
 */
export async function fetchUpdateProduct(productData: ProductUpdateInput): Promise<Product> {
  try {
    const validatedInput = validateProductUpdateInput(productData)
    const data = await updateProductRequest(validatedInput)
    return validateProductData(data)
  } catch (error) {
    handleNetworkError(error)
  }
}
