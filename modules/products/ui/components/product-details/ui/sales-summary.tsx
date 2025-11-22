import { memo } from "react";
import { TrendingUp, ShoppingCart, BarChart3, Eye, ShoppingBag, RotateCcw, Calendar, CalendarDays } from "lucide-react";

interface SalesSummaryProps {
  totalSales: number;
  monthlySales: number;
  weeklySales: number;
  conversionRate: number;
  returnRate: number;
  viewsCount: number;
  cartAdditions: number;
}

function SalesSummaryComponent(props: SalesSummaryProps) {
  return (
    <div className="flex flex-col gap-4 p-4 rounded-lg border border-border bg-card">
      <div className="flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-primary" />
        <span className="text-sm font-medium text-muted-foreground">
          Resumo de Vendas
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <ShoppingCart className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Vendas Totais
            </span>
          </div>
          <span className="text-xl font-bold">
            {props.totalSales.toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Vendas/Mês
            </span>
          </div>
          <span className="text-xl font-bold">
            {props.monthlySales.toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <CalendarDays className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Vendas/Semana
            </span>
          </div>
          <span className="text-xl font-bold">
            {props.weeklySales.toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Taxa Conversão
            </span>
          </div>
          <span className="text-xl font-bold text-green-600">
            {props.conversionRate.toFixed(1)}%
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Visualizações
            </span>
          </div>
          <span className="text-xl font-bold">
            {props.viewsCount.toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <ShoppingBag className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Add. Carrinho
            </span>
          </div>
          <span className="text-xl font-bold">
            {props.cartAdditions.toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <RotateCcw className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Taxa Devolução
            </span>
          </div>
          <span className="text-xl font-bold text-amber-600">
            {props.returnRate.toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
}

export const SalesSummary = memo(SalesSummaryComponent);
