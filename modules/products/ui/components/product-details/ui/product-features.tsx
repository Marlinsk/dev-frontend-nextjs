import { memo } from "react"
import { TruckIcon, ShieldCheck, Package } from "lucide-react"

interface ProductFeaturesProps {
  freeShipping: boolean
  warranty: number
}

function ProductFeaturesComponent({ freeShipping, warranty }: ProductFeaturesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {freeShipping && (
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-medium">
          <TruckIcon className="w-3.5 h-3.5" />
          <span>Frete grátis</span>
        </div>
      )}
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-medium">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>Compra segura</span>
      </div>
      {warranty > 0 && (
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-xs font-medium">
          <Package className="w-3.5 h-3.5" />
          <span>Garantia {warranty} meses</span>
        </div>
      )}
    </div>
  )
}

export const ProductFeatures = memo(ProductFeaturesComponent)
