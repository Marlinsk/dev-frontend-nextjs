import z from "zod";

/**
 * Formata erros de validação do Zod em mensagem legível
 *
 * Transforma um ZodError com múltiplos problemas em string formatada.
 *
 * Exemplo de saída:
 * "products.0.id: Expected number, received string, products.1.price: Required"
 *
 * @param zodError - Erro de validação do Zod
 * @returns String formatada com todos os erros concatenados
 *
 * Estrutura de cada issue:
 * - path: array com caminho do erro (ex: ['products', '0', 'id'])
 * - message: mensagem descritiva do erro (ex: 'Expected number, received string')
 */
export function formatValidationErrors(zodError: z.ZodError): string {
  return zodError.issues
    .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
    .join(', ')
}