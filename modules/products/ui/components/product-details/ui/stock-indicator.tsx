import { memo } from "react"
import { Package, PackageCheck, PackageMinus, Calendar, TrendingDown, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

interface StockIndicatorProps {
  stock: number
  reservedStock: number
  minStock: number
  lastRestock: string
  avgDailySales: number
}

function StockIndicatorComponent(props: StockIndicatorProps) {
  const availableStock = props.stock - props.reservedStock
  const daysUntilOutOfStock = props.avgDailySales > 0 ? Math.floor(availableStock / props.avgDailySales) : 0
  const needsRestock = props.stock <= props.minStock

  const getStockStatus = () => {
    if (props.stock === 0) return { label: "Esgotado", color: "text-red-600", bgColor: "bg-red-100" }
    if (props.stock < 10) return { label: "Estoque Baixo", color: "text-amber-600", bgColor: "bg-amber-100" }
    return { label: "Em Estoque", color: "text-green-600", bgColor: "bg-green-100" }
  }

  const status = getStockStatus()

  const formatUnit = (value: number) => value === 1 ? 'unidade' : 'unidades'

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  return (
    <div className="flex flex-col gap-4 p-4 rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">
            Controle de Estoque
            </span>
        </div>
        <span className={cn("text-xs font-semibold px-3 py-1 rounded-full", status.bgColor, status.color)}>
          {status.label}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <PackageCheck className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Estoque Total
            </span>
          </div>
          <span className="text-sm font-bold">
            {props.stock} {formatUnit(props.stock)}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <PackageMinus className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Reservado
            </span>
          </div>
          <span className="text-sm font-bold text-amber-600">
            {props.reservedStock} {formatUnit(props.reservedStock)}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <Package className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Disponível
            </span>
          </div>
          <span className="text-sm font-bold text-green-600">
            {availableStock} {formatUnit(availableStock)}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <TrendingDown className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Vendas/Dia
            </span>
          </div>
          <span className="text-sm font-bold">
            {props.avgDailySales} {formatUnit(props.avgDailySales)}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Último Reabastec.
            </span>
          </div>
          <span className="text-sm font-bold">
            {formatDate(props.lastRestock)}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <AlertTriangle className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Estoque Mínimo
            </span>
          </div>
          <span className={cn("text-sm font-bold", needsRestock ? 'text-red-600' : '')}>
            {props.minStock} {formatUnit(props.minStock)}
          </span>
        </div>
      </div>

      {daysUntilOutOfStock > 0 && daysUntilOutOfStock <= 30 && (
        <div className={cn("flex items-center gap-2 p-2 rounded-md", daysUntilOutOfStock <= 7 ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700')}>
          <AlertTriangle className="w-4 h-4" />
          <span className="text-xs font-medium">
            Previsão de esgotamento em {daysUntilOutOfStock} dias com base nas vendas atuais
          </span>
        </div>
      )}
    </div>
  )
}

export const StockIndicator = memo(StockIndicatorComponent)
