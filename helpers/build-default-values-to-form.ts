import { z, ZodObject, ZodOptional, ZodNullable, ZodDefault } from "zod";

/**
 * Constrói valores padrão a partir de um schema Zod e dados iniciais
 *
 * Esta função percorre recursivamente um schema Zod e cria um objeto com valores padrão
 * adequados para cada campo. Se dados iniciais forem fornecidos, eles terão prioridade.
 *
 * @param schema - Schema Zod para extrair a estrutura
 * @param raw - Objeto com dados iniciais (opcional)
 * @returns Objeto com valores padrão para todos os campos do schema
 *
 * @example
 * const schema = z.object({
 *   name: z.string(),
 *   price: z.number(),
 *   active: z.boolean().optional()
 * })
 *
 * const defaults = buildDefaultValues(schema, { name: "Product" })
 * // Resultado: { name: "Product", price: 0, active: false }
 */
export function buildDefaultValues<T extends ZodObject<any>>(
  schema: T,
  raw: Record<string, any> = {}
): z.infer<T> {
  const shape = schema.shape;
  const result: any = {};

  for (const key in shape) {
    const fieldSchema = shape[key];

    if (fieldSchema instanceof z.ZodObject) {
      result[key] = buildDefaultValues(fieldSchema, raw?.[key] ?? {});
    } else {
      const unwrapped = unwrapZod(fieldSchema);
      const rawValue = raw?.[key];

      result[key] = rawValue ?? getEmptyValueForZodType(unwrapped, key);
    }
  }

  return result;
}

/**
 * Remove wrappers do Zod (optional, nullable, default) para chegar ao tipo base
 *
 * @param schema - Schema Zod possivelmente com wrappers
 * @returns Schema Zod sem os wrappers
 */
function unwrapZod(schema: any): any {
  while (
    schema instanceof ZodOptional ||
    schema instanceof ZodNullable ||
    schema instanceof ZodDefault
  ) {
    // Acessa o tipo interno através da definição
    if (schema._def?.innerType) {
      schema = schema._def.innerType;
    } else {
      break;
    }
  }
  return schema;
}

/**
 * Retorna um valor vazio apropriado para um tipo Zod
 *
 * @param schema - Schema Zod desembrulhado
 * @param key - Nome do campo (usado para detectar campos de preço)
 * @returns Valor vazio apropriado para o tipo
 */
function getEmptyValueForZodType(schema: any, key?: string): any {
  if (schema instanceof z.ZodString) {
    // Detecta campos de preço/moeda e retorna formato brasileiro
    if (key && /(price|value|amount|total|currency|preco|valor)/i.test(key)) {
      return "$ 0,00";
    }
    return "";
  }
  if (schema instanceof z.ZodNumber) return 0;
  if (schema instanceof z.ZodBoolean) return false;
  if (schema instanceof z.ZodArray) return [];
  if (schema instanceof z.ZodObject) return {};
  if (schema instanceof z.ZodEnum) {
    // Para enums, não retorna valor padrão (undefined)
    // Isso força o componente a usar o placeholder
    return undefined;
  }
  return undefined;
}
