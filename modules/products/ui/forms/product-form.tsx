"use client"

import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import { useMemo, useCallback, memo } from "react"

import { useGetProductById, useCreateProduct, useUpdateProduct } from "@/modules/products/http/hooks"
import { productEditSchema, productCreateSchema } from "@/modules/products/schemas/products"
import { buildDefaultValues } from "@/helpers/build-default-values-to-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatCurrencyValue, handleCurrencyNumericValue } from "@/helpers/handle-currency-values"
import { Textarea } from "@/components/ui/textarea"

/**
 * Formulário para criação e edição de produtos
 *
 * Modo de operação determinado pelo productId:
 * - productId === "create": Modo criação (sem dados iniciais)
 * - productId === número: Modo edição (carrega dados do produto)
 *
 * Funcionalidades:
 * - Validação em tempo real usando Zod schemas (debounced)
 * - Formatação automática de preços em USD
 * - Feedback visual de erros por campo
 * - Toast notifications para sucesso/erro
 * - Callback onSuccess após operação bem-sucedida
 *
 * Otimizações:
 * - React.memo para evitar re-renders quando props não mudam
 * - useCallback para memoizar handlers
 * - useMemo para valores derivados
 * - Validação com debounce de 300ms para reduzir computações
 */
interface ProductFormProps {
  productId: string;
  onSuccess?: () => void;
}

function ProductFormComponent({ productId, onSuccess }: ProductFormProps) {
  const isEdit = useMemo(() => productId !== "create", [productId]);

  let initialData = null;

  if (isEdit) {
    const { data } = useGetProductById(Number(productId));
    initialData = data;
  }

  const schema = useMemo(
    () => isEdit ? productEditSchema : productCreateSchema,
    [isEdit]
  );
  const action = useMemo(
    () => isEdit ? "Salvar alterações" : "Criar",
    [isEdit]
  );

  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();

  // Memoiza handler de submit para evitar recriação desnecessária
  const handleSubmit = useCallback(async ({ value }: { value: any }) => {
    // Preserva o ID do produto em modo edição
    const dataToSubmit = isEdit && initialData ? { ...value, id: initialData.id } : value;
    const result = schema.safeParse(dataToSubmit);

    if (!result.success) {
      console.error("Erro de validação:", result.error);
      toast.error("Erro de validação. Verifique os campos do formulário.");
      return;
    }

    try {
      if (isEdit) {
        await updateMutation.mutateAsync(result.data as any);
        toast.success("Produto atualizado com sucesso!");
      } else {
        await createMutation.mutateAsync(result.data as any);
        toast.success("Produto criado com sucesso!");
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao salvar produto";
      toast.error(errorMessage);
      console.error("Erro ao salvar produto:", error);
    }
  }, [isEdit, initialData, schema, createMutation, updateMutation, onSuccess]);

  const form = useForm({
    defaultValues: buildDefaultValues(schema, initialData ?? {}),
    onSubmit: handleSubmit,
  })

  // Cria validador memoizado com debounce
  const createValidator = useCallback((fieldSchema: any) => {
    return {
      onChangeAsyncDebounceMs: 300,
      onChangeAsync: async ({ value }: { value: any }) => {
        const result = fieldSchema.safeParse(value);
        return result.success ? undefined : result.error.issues[0].message;
      }
    }
  }, [])

  return (
    <div className="w-full space-y-6 px-4 sm:px-0">
      <form
        onSubmit={
          (e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }
        }
        className="w-full space-y-6"
      >
        <FieldGroup>
          <form.Field
            name="title"
            validators={createValidator(schema.shape.title)}
          >
            {(field) => (
              <Field data-invalid={field.state.meta.errors.length > 0}>
                <FieldLabel htmlFor={field.name}>Título</FieldLabel>
                <FieldContent>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Ex: Camiseta básica"
                    aria-invalid={field.state.meta.errors.length > 0}
                  />
                  <FieldDescription>
                    Nome do produto que será exibido no catálogo
                  </FieldDescription>
                  <FieldError errors={field.state.meta.errors.map(err => ({ message: err }))} />
                </FieldContent>
              </Field>
            )}
          </form.Field>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 sm:items-start">
            <form.Field
              name="category"
              validators={createValidator(schema.shape.category)}
            >
              {(field) => (
                <Field data-invalid={field.state.meta.errors.length > 0}>
                  <FieldLabel htmlFor={field.name}>Categoria</FieldLabel>
                  <FieldContent>
                    <Select
                      key={`category-select-${productId}`}
                      value={field.state.value || undefined}
                      onValueChange={(value) => {
                        // Type guard: valida se é uma das categorias permitidas
                        if (value === 'electronics' || value === 'jewelery' || value === "men's clothing" || value === "women's clothing") {
                          field.handleChange(value)
                        }
                      }}
                    >
                      <SelectTrigger
                        id={field.name}
                        aria-invalid={field.state.meta.errors.length > 0}
                        className="w-full"
                      >
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electronics">Eletrônicos</SelectItem>
                        <SelectItem value="jewelery">Joias</SelectItem>
                        <SelectItem value="men's clothing">Roupas Masculinas</SelectItem>
                        <SelectItem value="women's clothing">Roupas Femininas</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldDescription>
                      Categoria do produto para organização
                    </FieldDescription>
                    <FieldError errors={field.state.meta.errors.map(err => ({ message: err }))} />
                  </FieldContent>
                </Field>
              )}
            </form.Field>
            <form.Field
              name="price"
              validators={createValidator(schema.shape.price)}
            >
              {(field) => (
                <Field data-invalid={field.state.meta.errors.length > 0}>
                  <FieldLabel htmlFor={field.name}>Preço</FieldLabel>
                  <FieldContent>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={formatCurrencyValue(field.state.value || 0)}
                      onBlur={field.handleBlur}
                      onChange={(e) => handleCurrencyNumericValue(e, field.handleChange)}
                      type="text"
                      placeholder="$0.00"
                      aria-invalid={field.state.meta.errors.length > 0}
                    />
                    <FieldDescription>
                      Preço do produto em dólares (USD)
                    </FieldDescription>
                    <FieldError errors={field.state.meta.errors.map(err => ({ message: err }))} />
                  </FieldContent>
                </Field>
              )}
            </form.Field>
          </div>
          <form.Field
            name="description"
            validators={createValidator(schema.shape.description)}
          >
            {(field) => (
              <Field data-invalid={field.state.meta.errors.length > 0}>
                <FieldLabel htmlFor={field.name}>Descrição</FieldLabel>
                <FieldContent>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Descreva o produto..."
                    rows={4}
                    aria-invalid={field.state.meta.errors.length > 0}
                    className="min-h-32 w-full resize-none"
                  />
                  <FieldDescription>
                    Descrição detalhada do produto
                  </FieldDescription>
                  <FieldError errors={field.state.meta.errors.map(err => ({ message: err }))} />
                </FieldContent>
              </Field>
            )}
          </form.Field>
          <form.Field
            name="image"
            validators={createValidator(schema.shape.image)}
          >
            {(field) => (
              <Field data-invalid={field.state.meta.errors.length > 0}>
                <FieldLabel htmlFor={field.name}>Imagem (URL)</FieldLabel>
                <FieldContent>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="url"
                    placeholder="https://exemplo.com/imagem.jpg"
                    aria-invalid={field.state.meta.errors.length > 0}
                  />
                  <FieldDescription>
                    URL da imagem do produto
                  </FieldDescription>
                  <FieldError errors={field.state.meta.errors.map(err => ({ message: err }))} />
                </FieldContent>
              </Field>
            )}
          </form.Field>
        </FieldGroup>
        <div className="flex gap-4">
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="w-full"
              >
                {isSubmitting ? "Salvando..." : action}
              </Button>
            )}
          </form.Subscribe>
        </div>
      </form>
    </div>
  )
}

// Memo com comparação de productId - form só re-renderiza se productId mudar
export const ProductForm = memo(
  ProductFormComponent,
  (prevProps, nextProps) => {
    return prevProps.productId === nextProps.productId
  }
)