import { memo } from "react"
import { DollarSign, TrendingUp, Percent, Calculator, Calendar } from "lucide-react"

interface ProductPricingProps {
  price: number
  revenue: number
  monthlyRevenue: number
  costPrice: number
  profitMargin: number
  avgOrderValue: number
}

function ProductPricingComponent(props: ProductPricingProps) {
  const profit = props.price - props.costPrice

  return (
    <div className="flex flex-col gap-4 p-4 rounded-lg border border-border bg-card">
      <div className="flex items-center gap-2">
        <DollarSign className="w-5 h-5 text-primary" />
        <span className="text-sm font-medium text-muted-foreground">
          Informações de Preço
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Preço Unitário
            </span>
          </div>
          <span className="text-sm font-bold">
            ${props.price.toFixed(2)}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <Calculator className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Custo
            </span>
          </div>
          <span className="text-sm font-bold text-muted-foreground">
            ${props.costPrice.toFixed(2)}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Lucro Unit.
            </span>
          </div>
          <span className="text-sm font-bold text-green-600">
            ${profit.toFixed(2)}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <Percent className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Margem
            </span>
          </div>
          <span className="text-sm font-bold text-blue-600">
            {props.profitMargin.toFixed(1)}%
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Ticket Médio
            </span>
          </div>
          <span className="text-sm font-bold">
            ${props.avgOrderValue.toFixed(2)}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Receita/Mês
            </span>
          </div>
          <span className="text-sm font-bold text-green-600">
            ${props.monthlyRevenue.toLocaleString('en-US', { 
              minimumFractionDigits: 2, 
              maximumFractionDigits: 2 
            })}
          </span>
        </div>
        <div className="flex flex-col gap-1 md:col-span-3">
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Receita Total</span>
          </div>
          <span className="text-lg font-bold text-green-600">
            ${props.revenue.toLocaleString('en-US', { 
              minimumFractionDigits: 2, 
              maximumFractionDigits: 2 
            })}
          </span>
        </div>
      </div>
    </div>
  )
}

export const ProductPricing = memo(ProductPricingComponent)
