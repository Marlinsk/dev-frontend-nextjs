import { memo } from 'react'
import { PackageOpen } from 'lucide-react'

interface EmptyStateProps {
  title: string
  description?: string
}

function EmptyStateComponent({ title, description }: EmptyStateProps) {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="rounded-full bg-muted p-3">
          <PackageOpen className="h-6 w-6 text-muted-foreground" />
        </div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  )
}

export const EmptyState = memo(EmptyStateComponent)
