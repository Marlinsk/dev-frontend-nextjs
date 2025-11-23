"use client"

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Ellipsis, Pencil, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { useCallback, useMemo, memo } from 'react'

import { ProductFormDialog } from './product-form-dialog'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { useDeleteProduct } from '@/modules/products/http/hooks'

/**
 * Menu de opções para produtos (editar, excluir)
 *
 * Usado na página de detalhes do produto.
 * Obtém o productId automaticamente da URL.
 */
function ProductOptionsMenuComponent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const deleteProductMutation = useDeleteProduct()

  // Obtém productId da URL
  const productId = useMemo(() => {
    const productIdFromUrl = pathname?.startsWith('/product/') ? Number(pathname.split('/')[2]) : null
    return productIdFromUrl ?? undefined
  }, [pathname])

  // Flags de estado dos diálogos
  const dialogStates = useMemo(() => ({
    isEditDialogOpen: searchParams.get('action') === 'edit',
    isDeleteDialogOpen: searchParams.get('action') === 'delete'
  }), [searchParams])

  const handleCloseDialog = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('action')
    router.replace(`?${params.toString()}`, { scroll: false })
  }, [router, searchParams])

  const handleEditProduct = useCallback(() => {
    if (!productId) return
    const params = new URLSearchParams(searchParams.toString())
    params.set('action', 'edit')
    router.replace(`?${params.toString()}`, { scroll: false })
  }, [router, searchParams, productId])

  const handleDelete = useCallback(() => {
    if (!productId) return
    const params = new URLSearchParams(searchParams.toString())
    params.set('action', 'delete')
    router.replace(`?${params.toString()}`, { scroll: false })
  }, [router, searchParams, productId])

  const confirmDelete = useCallback(async () => {
    if (!productId) return

    try {
      await deleteProductMutation.mutateAsync(productId)
      toast.success('Produto excluído com sucesso!')
      handleCloseDialog()
      router.back()
    } catch (error) {
      toast.error('Erro ao excluir produto. Tente novamente.')
      console.error('Erro ao excluir produto:', error)
    }
  }, [productId, deleteProductMutation, router, handleCloseDialog])

  const { isEditDialogOpen, isDeleteDialogOpen } = dialogStates

  if (!productId) return null

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="outline" className="h-9 w-9">
            <Ellipsis className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
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
        </DropdownMenuContent>
      </DropdownMenu>

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
  )
}

export const ProductOptionsMenu = memo(ProductOptionsMenuComponent)
