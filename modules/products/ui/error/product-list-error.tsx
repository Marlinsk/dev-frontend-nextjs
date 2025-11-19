'use client'

import { useEffect } from 'react'
import type { FallbackProps } from 'react-error-boundary'

export function ProductListError({ error, resetErrorBoundary }: FallbackProps) {
  useEffect(() => {
    console.error('ProductList error:', error)
  }, [error])

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="rounded-full bg-destructive/10 p-3">
          <svg
            className="h-6 w-6 text-destructive"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">
            Erro ao carregar produtos
          </p>
          <p className="text-xs text-muted-foreground">
            {error.message || 'Ocorreu um erro desconhecido'}
          </p>
        </div>
        <button
          onClick={resetErrorBoundary}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  )
}
