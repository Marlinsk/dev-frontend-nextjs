import { z } from 'zod'

/**
 * Schema Zod para validação de produto individual da FakeStore API
 *
 * Este schema define o contrato de dados esperado da API e fornece:
 * 1. Validação runtime dos dados recebidos da API
 * 2. Inferência de tipos TypeScript através de z.infer<typeof productItemSchema>
 * 3. Mensagens de erro descritivas caso os dados não correspondam ao esperado
 *
 * Campos do produto:
 * - id: Identificador único numérico
 * - title: Nome/título do produto
 * - price: Preço em formato numérico (ex: 29.99)
 * - description: Descrição detalhada do produto
 * - category: Categoria do produto (ex: "electronics", "jewelery")
 * - image: URL da imagem do produto
 */
export const productItemSchema = z.object({
  id:	z.number(),
  title: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  image: z.string(),
})