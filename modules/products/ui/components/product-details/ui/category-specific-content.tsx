import { memo } from "react"
import { Button } from "@/components/ui/button"

const SIZES = ['PP', 'P', 'M', 'G', 'GG', 'XGG'] as const

const ClothingOptions = memo(() => {
  return (
    <div className="flex flex-col space-y-2">
      <h4 className="text-sm font-medium">Tamanhos disponíveis</h4>
      <div className="flex flex-wrap gap-2">
        {SIZES.map((size) => (
          <Button
            key={size}
            size={"icon-lg"}
            variant={"outline"}
          >
            <p className="font-normal">{size}</p>
          </Button>
        ))}
      </div>
    </div>
  )
})

ClothingOptions.displayName = 'ClothingOptions'

const ElectronicsSpecs = memo(() => {
  return (
    <div className="flex flex-col space-y-2">
      <h4 className="text-sm font-medium">Especificações técnicas</h4>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground">Modelo</span>
          <span className="font-medium">2024</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground">Voltagem</span>
          <span className="font-medium">Bivolt</span>
        </div>
      </div>
    </div>
  )
})

ElectronicsSpecs.displayName = 'ElectronicsSpecs'

const JewelrySpecs = memo(() => {
  return (
    <div className="flex flex-col space-y-2">
      <h4 className="text-sm font-medium">Características</h4>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground">Material</span>
          <span className="font-medium">Prata 925</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground">Acabamento</span>
          <span className="font-medium">Polido</span>
        </div>
      </div>
    </div>
  )
})

JewelrySpecs.displayName = 'JewelrySpecs'

interface CategorySpecificContentProps {
  category: string
}

function CategorySpecificContentComponent({ category }: CategorySpecificContentProps) {
  const normalizedCategory = category.toLowerCase()

  if (normalizedCategory.includes('clothing')) {
    return <ClothingOptions />
  }

  if (normalizedCategory.includes('electronics')) {
    return <ElectronicsSpecs />
  }

  if (normalizedCategory.includes('jewelery')) {
    return <JewelrySpecs />
  }

  return null
}

export const CategorySpecificContent = memo(CategorySpecificContentComponent)
