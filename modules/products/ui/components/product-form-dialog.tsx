"use client"

import { useState, useCallback, useMemo, memo } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ProductForm } from "@/modules/products/ui/forms"

/**
 * Dialog modal para formulário de produtos (criar/editar)
 *
 * Suporta dois modos de controle:
 * - Controlado: open/onOpenChange passados como props (componente pai gerencia estado)
 * - Não controlado: gerencia estado interno (quando open não é fornecido)
 *
 * Usa ProductForm internamente e fecha o dialog automaticamente após sucesso
 *
 * Otimizações:
 * - React.memo com comparação customizada de props
 * - useCallback para memoizar handlers
 * - useMemo para memoizar computações derivadas
 * - Renderiza ProductForm apenas quando dialog está aberto
 */
interface ProductFormDialogProps {
  productId: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function ProductFormDialogComponent({
  productId,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange
}: ProductFormDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  // Pattern: Controlled vs Uncontrolled component
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const onOpenChange = isControlled ? controlledOnOpenChange : setInternalOpen;

  // Memoiza valores derivados
  const { isEdit, title, description } = useMemo(() => {
    const isEdit = productId !== "create";
    return {
      isEdit,
      title: isEdit ? "Editar Produto" : "Cadastrar Produto",
      description: isEdit
        ? "Atualize os dados do produto por aqui."
        : "Adicione um novo produto no catálogo da loja por aqui."
    }
  }, [productId])

  // Memoiza handler de sucesso
  const handleSuccess = useCallback(() => {
    onOpenChange?.(false);
  }, [onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-[620px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {/* Renderiza form apenas quando dialog está aberto para otimizar performance */}
        {open && (
          <div className="mt-4">
            <ProductForm
              productId={productId}
              onSuccess={handleSuccess}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Comparador customizado: só re-renderiza se productId ou open mudarem
export const ProductFormDialog = memo(
  ProductFormDialogComponent,
  (prevProps, nextProps) => {
    return (
      prevProps.productId === nextProps.productId &&
      prevProps.open === nextProps.open
    )
  }
)
