import z from "zod"
import { productItemSchema } from "../../schemas/products"
import { Product } from "../../types/product"
import { API_BASE_URL } from "@/constants"
import { ProductsFetchError } from "../../common/products-fetch-error"
import { formatValidationErrors } from "@/helpers/format-validation-errors"

const PRODUCTS_LIST_ENDPOINT = `${API_BASE_URL}/products`

// Schema para validar um array de produtos retornado pela API
const productsListSchema = z.array(productItemSchema)

/**
 * Trata erros HTTP (4xx, 5xx) da API
 * @throws {ProductsFetchError} Sempre lança erro com status e mensagem
 */
function handleHttpError(response: Response): never {
  const errorMessage = `Erro ao buscar produtos: ${response.status} ${response.statusText}`
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
      `Dados de produtos inválidos: ${errorDetails}`,
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
  // Se já é ProductsFetchError (ex: de handleHttpError), repassa
  if (error instanceof ProductsFetchError) {
    throw error
  }

  // TypeError geralmente indica problemas de rede (fetch falhou)
  if (error instanceof TypeError && error.message.includes('fetch')) {
    throw new ProductsFetchError(
      'Erro de conexão. Verifique sua internet e tente novamente.',
      undefined,
      error
    )
  }

  // Qualquer outro erro inesperado
  throw new ProductsFetchError(
    'Erro inesperado ao carregar produtos',
    undefined,
    error
  )
}

/**
 * Valida os dados retornados pela API usando o schema Zod
 * Garante type-safety em runtime
 * @param data - Dados não tipados vindos da API
 * @returns Array de produtos validados e tipados
 * @throws {ProductsFetchError} Se os dados não corresponderem ao schema
 */
function validateProductsDataList(data: unknown): Product[] {
  try {
    return productsListSchema.parse(data)
  } catch (validationError) {
    handleValidationError(validationError)
  }
}

/**
 * Realiza a requisição HTTP para buscar a lista de produtos
 * @param searchQuery - Termo de busca opcional para filtrar produtos
 * @returns Promise com os dados brutos (não validados) da resposta JSON
 * @throws {ProductsFetchError} Se a resposta não for OK (status 200-299)
 */
async function fetchProductsList(searchQuery?: string): Promise<unknown> {
  const response = await fetch(PRODUCTS_LIST_ENDPOINT, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    handleHttpError(response);
  }

  const data = await response.json();

  // Se não houver busca, retorna todos os produtos
  if (!searchQuery || !searchQuery.trim()) {
    return data;
  }

  // Filtra produtos no servidor baseado no termo de busca
  const searchTerm = searchQuery.toLowerCase().trim();
  return (data as Product[]).filter((product) => {
    const titleMatch = product.title.toLowerCase().includes(searchTerm);
    const categoryMatch = product.category.toLowerCase().includes(searchTerm);
    const descriptionMatch = product.description.toLowerCase().includes(searchTerm);
    return titleMatch || categoryMatch || descriptionMatch;
  });
}

/**
 * Função principal para buscar todos os produtos da FakeStore API
 *
 * Fluxo de execução:
 * 1. Faz a requisição HTTP
 * 2. Filtra produtos se searchQuery for fornecido (server-side)
 * 3. Valida os dados retornados com Zod
 * 4. Retorna array de produtos tipados
 * 5. Trata qualquer erro que ocorra no processo
 *
 * @param searchQuery - Termo de busca opcional para filtrar produtos no servidor
 * @returns Promise<Product[]> Lista de produtos validada e tipada
 * @throws {ProductsFetchError} Em caso de erro HTTP, validação ou rede
 */
export async function fetchGetAllProducts(searchQuery?: string): Promise<Product[]> {
  try {
    const data = await fetchProductsList(searchQuery)
    return validateProductsDataList(data)
  } catch (error) {
    handleNetworkError(error)
  }
}