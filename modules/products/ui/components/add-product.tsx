import { memo, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ProductFormDialog } from "./product-form-dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

function AddProductComponent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
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

  const isCreateDialogOpen = searchParams.get('action') === 'create'

  return (
    <>
      <Button onClick={handleCreateProduct}>
        <Plus className="mr-2 h-4 w-4" />
        Novo Produto
      </Button>
      <ProductFormDialog
        productId="create"
        open={isCreateDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            handleCloseDialog()
          }
        }}
      />
    </>
  )
}

export const AddProduct = memo(AddProductComponent)