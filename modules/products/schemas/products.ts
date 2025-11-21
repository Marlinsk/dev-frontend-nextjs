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
  title: z.string().min(3, 'O título deve ter no mínimo 3 caracteres').max(200, 'O título deve ter no máximo 200 caracteres'),
  price: z.number().positive('O preço deve ser maior que zero').max(999999, 'O preço máximo é $999,999'),
  description: z.string().min(10, 'A descrição deve ter no mínimo 10 caracteres').max(1000, 'A descrição deve ter no máximo 1000 caracteres'),
  category: z.enum(
    ['electronics', 'jewelery', "men's clothing", "women's clothing"],
    { message: 'Selecione uma categoria válida' }
  ),
  image: z.string().url({ message: 'Informe uma URL válida para a imagem' }),
})

/**
 * Schema para cadastro de produto
 * Herda todos os campos do productItemSchema exceto o id
 */
export const productCreateSchema = productItemSchema.omit({ id: true })

/**
 * Schema para edição de produto
 * Herda todos os campos do productItemSchema
 */
export const productEditSchema = productItemSchema

