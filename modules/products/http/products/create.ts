import z from "zod"
import { productCreateSchema, productItemSchema } from "../../schemas/products"
import { Product } from "../../types/product"
import { API_BASE_URL } from "@/constants"
import { ProductsFetchError } from "../../common/products-fetch-error"
import { formatValidationErrors } from "@/helpers/format-validation-errors"

type ProductCreateInput = z.infer<typeof productCreateSchema>

/**
 * Trata erros HTTP (4xx, 5xx) da API
 * @throws {ProductsFetchError} Sempre lança erro com status e mensagem
 */
function handleHttpError(response: Response): never {
  const errorMessage = `Erro ao criar produto: ${response.status} ${response.statusText}`
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
    'Erro inesperado ao criar produto',
    undefined,
    error
  )
}

/**
 * Valida os dados de entrada antes de enviar para a API
 * @param data - Dados do produto a serem criados
 * @returns Dados validados
 * @throws {ProductsFetchError} Se os dados não corresponderem ao schema
 */
function validateProductCreateInput(data: ProductCreateInput): ProductCreateInput {
  try {
    return productCreateSchema.parse(data)
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
 * Realiza a requisição HTTP para criar um novo produto
 * @param productData - Dados do produto a ser criado
 * @returns Promise com os dados brutos (não validados) da resposta JSON
 * @throws {ProductsFetchError} Se a resposta não for OK (status 200-299)
 */
async function createProductRequest(productData: ProductCreateInput): Promise<unknown> {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  })

  if (!response.ok) {
    handleHttpError(response)
  }

  return await response.json()
}

/**
 * Função principal para criar um novo produto na FakeStore API
 *
 * Fluxo de execução:
 * 1. Valida os dados de entrada com Zod
 * 2. Faz a requisição HTTP POST
 * 3. Valida os dados retornados com Zod
 * 4. Retorna o produto criado tipado
 * 5. Trata qualquer erro que ocorra no processo
 *
 * @param productData - Dados do produto a ser criado (sem id)
 * @returns Promise<Product> Produto criado validado e tipado
 * @throws {ProductsFetchError} Em caso de erro HTTP, validação ou rede
 */
export async function fetchCreateProduct(productData: ProductCreateInput): Promise<Product> {
  try {
    const validatedInput = validateProductCreateInput(productData)
    const data = await createProductRequest(validatedInput)
    return validateProductData(data)
  } catch (error) {
    handleNetworkError(error)
  }
}
