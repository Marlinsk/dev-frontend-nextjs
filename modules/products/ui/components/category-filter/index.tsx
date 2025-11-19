'use client'

import { memo } from 'react'
import { Filter } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const CATEGORIES = [
  { value: 'all', label: 'Todas as categorias' },
  { value: 'electronics', label: 'Eletrônicos' },
  { value: 'jewelery', label: 'Joias' },
  { value: "men's clothing", label: 'Roupas Masculinas' },
  { value: "women's clothing", label: 'Roupas Femininas' },
] as const;

interface CategoryFilterProps {
  value: string
  onValueChange: (value: string) => void
}

function CategoryFilterComponent({ value, onValueChange }: CategoryFilterProps) {
  const selectedLabel = CATEGORIES.find(cat => cat.value === value)?.label || 'Filtrar por categoria'

  return (
    <div className="w-full sm:w-64">
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <Filter className="h-4 w-4 mr-2" />
          <SelectValue>
            {selectedLabel}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {CATEGORIES.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export const CategoryFilter = memo(CategoryFilterComponent)
