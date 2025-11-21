"use client"

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Ellipsis, Plus, Pencil, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { useCallback, useMemo, memo } from 'react'

import { ProductFormDialog } from './product-form-dialog'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { useDeleteProduct } from '@/modules/products/http/hooks'

/**
 * Menu de opções para produtos (criar, editar, excluir)
 *
 * Otimizações:
 * - React.memo para evitar re-renders desnecessários
 * - useCallback para memoizar todos os handlers
 * - useMemo para computações derivadas (productId, flags de diálogos)
 * - Lazy loading: dialogs são renderizados condicionalmente apenas quando necessários
 */
interface ProductOptionsMenuProps {
  productId?: number;
}

function ProductOptionsMenuComponent({ productId: propProductId }: ProductOptionsMenuProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const deleteProductMutation = useDeleteProduct()

  // Memoiza o productId derivado da URL
  const productId = useMemo(() => {
    const productIdFromUrl = pathname?.startsWith('/product/')
      ? Number(pathname.split('/')[2])
      : null
    return propProductId ?? productIdFromUrl ?? undefined
  }, [propProductId, pathname])

  // Memoiza flags de estado dos diálogos
  const dialogStates = useMemo(() => ({
    isCreateDialogOpen: searchParams.get('action') === 'create',
    isEditDialogOpen: searchParams.get('action') === 'edit',
    isDeleteDialogOpen: searchParams.get('action') === 'delete'
  }), [searchParams])

  // Memoiza handlers de manipulação de URL
  const handleCreateProduct = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('action', 'create')
    router.replace(`?${params.toString()}`)
  }, [router, searchParams])

  const handleCloseDialog = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('action')
    router.replace(`?${params.toString()}`)
  }, [router, searchParams])

  const handleEditProduct = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('action', 'edit')
    router.replace(`?${params.toString()}`)
  }, [router, searchParams])

  const handleDelete = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('action', 'delete')
    router.replace(`?${params.toString()}`)
  }, [router, searchParams])

  // Memoiza handler de confirmação de exclusão
  const confirmDelete = useCallback(async () => {
    if (!productId) return

    try {
      await deleteProductMutation.mutateAsync(productId)
      toast.success('Produto excluído com sucesso!')
      router.back()
    } catch (error) {
      toast.error('Erro ao excluir produto. Tente novamente.')
      console.error('Erro ao excluir produto:', error)
    }
  }, [productId, deleteProductMutation, router])

  const { isCreateDialogOpen, isEditDialogOpen, isDeleteDialogOpen } = dialogStates

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={'icon'} variant={'outline'}>
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleCreateProduct}>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar produto
          </DropdownMenuItem>

          {productId && (
            <>
              <DropdownMenuItem onClick={handleEditProduct}>
                <Pencil className="mr-2 h-4 w-4" />
                Editar produto
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDelete}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Excluir produto
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Renderiza dialog de criação apenas quando necessário */}
      {isCreateDialogOpen && (
        <ProductFormDialog
          productId="create"
          open={isCreateDialogOpen}
          onOpenChange={(open) => {
            if (!open) {
              handleCloseDialog()
            }
          }}
        />
      )}

      {/* Renderiza dialogs de edição e exclusão apenas quando productId existe */}
      {productId && (
        <>
          {isEditDialogOpen && (
            <ProductFormDialog
              productId={String(productId)}
              open={isEditDialogOpen}
              onOpenChange={(open) => {
                if (!open) {
                  handleCloseDialog()
                }
              }}
            />
          )}

          {isDeleteDialogOpen && (
            <AlertDialog
              open={isDeleteDialogOpen}
              onOpenChange={(open) => {
                if (!open) {
                  handleCloseDialog()
                }
              }}
            >
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta ação não pode ser desfeita. O produto será
                    permanentemente excluído do catálogo.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={confirmDelete}>
                    {deleteProductMutation.isPending ? 'Excluindo...' : 'Excluir'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </>
      )}
    </>
  )
}

export const ProductOptionsMenu = memo(ProductOptionsMenuComponent)
