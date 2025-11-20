import { memo } from "react"

interface StockIndicatorProps {
  stock: number
}

function StockIndicatorComponent({ stock }: StockIndicatorProps) {
  if (stock === 0) {
    return (
      <div className="text-sm font-medium">
        Produto esgotado
      </div>
    )
  }

  if (stock < 5) {
    return (
      <div className="text-sm font-medium">
        Últimas {stock} unidades!
      </div>
    )
  }

  return (
    <div className="text-sm font-medium">
      Em estoque ({stock} unidades)
    </div>
  )
}

export const StockIndicator = memo(StockIndicatorComponent)
