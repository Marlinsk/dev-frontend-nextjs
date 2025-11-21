import { memo } from "react"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart } from "lucide-react"

interface ProductActionsProps {
  stock: number
}

function ProductActionsComponent({ stock }: ProductActionsProps) {
  return (
    <div className="flex items-center gap-3">
      <Button
        size={"lg"}
        disabled={stock === 0}
        className="flex-1 sm:flex-initial"
      >
        <ShoppingCart className="w-5 h-5 sm:hidden" />
        <span className="hidden sm:inline">
          {stock === 0 ? "Produto Esgotado" : "Adicionar ao Carrinho"}
        </span>
      </Button>
      <Button
        variant={"outline"}
        size={"icon-lg"}
        aria-label="Adicionar aos favoritos"
      >
        <Heart className="w-6 h-6" />
      </Button>
    </div>
  )
}

export const ProductActions = memo(ProductActionsComponent)
