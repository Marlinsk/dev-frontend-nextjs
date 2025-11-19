'use client'

import { memo, useCallback, useEffect, useMemo, useRef, useState, KeyboardEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverAnchor, PopoverContent } from '@/components/ui/popover'
import { useDebounce } from '@/hooks/use-debounce'
import { Product } from '../../../types/product'
import { ProductItemResult } from './ui/product-item-result'
import { Button } from '@/components/ui/button'

interface ProductSearchProps {
  products: Product[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  minSearchLength?: number;
  maxSuggestions?: number;
}

function ProductSearchComponent({
  products,
  value,
  onValueChange,
  placeholder = 'Buscar produtos...',
  minSearchLength = 2,
  maxSuggestions = 10,
}: ProductSearchProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)
  const isTyping = useRef(false)

  const suggestionsCache = useRef<Map<string, Product[]>>(new Map())

  const debouncedInputValue = useDebounce(inputValue, 350)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const suggestions = useMemo(() => {
    const trimmedValue = debouncedInputValue.trim()
    if (!trimmedValue || trimmedValue.length < minSearchLength) return []

    const searchTerm = trimmedValue.toLowerCase()

    if (suggestionsCache.current.has(searchTerm)) {
      return suggestionsCache.current.get(searchTerm)!
    }

    const results = products
      .filter((product) => {
        const titleMatch = product.title.toLowerCase().includes(searchTerm)
        const categoryMatch = product.category.toLowerCase().includes(searchTerm)
        const descriptionMatch = product.description.toLowerCase().includes(searchTerm)

        return titleMatch || categoryMatch || descriptionMatch
      })
      .slice(0, maxSuggestions)

    suggestionsCache.current.set(searchTerm, results)
    return results
  }, [products, debouncedInputValue, minSearchLength, maxSuggestions])

  const handleInputChange = useCallback((newValue: string) => {
    setInputValue(newValue)
    isTyping.current = true
  }, [])

  useEffect(() => {
    const trimmedValue = debouncedInputValue.trim()

    if (trimmedValue.length < minSearchLength) {
      setOpen(false)
      isTyping.current = false
      return
    }

    if (isTyping.current && suggestions.length > 0) {
      setOpen(true)
    }

    isTyping.current = false
  }, [debouncedInputValue, suggestions.length, minSearchLength])

  const handleSelectSuggestion = useCallback((product: Product) => {
    setOpen(false)
    inputRef.current?.blur()

    // Redireciona para a página de detalhes do produto
    router.push(`/product/${product.id}`)
  }, [router])

  const handleSearch = useCallback(() => {
    if (inputValue.trim().length < minSearchLength) return

    setOpen(false)
    inputRef.current?.blur()

    // Verifica se o valor de busca é diferente do parâmetro atual 'q'
    const currentQuery = searchParams.get('q') || ''
    const newQuery = inputValue.trim()

    // Não redireciona se o valor for o mesmo
    if (currentQuery === newQuery) return

    // Redireciona para a página de resultados de busca
    const searchId = Math.random().toString(36).substring(2, 15)
    const searchQuery = encodeURIComponent(newQuery)

    router.push(`/search/${searchId}?q=${searchQuery}`)
  }, [inputValue, minSearchLength, router, searchParams])

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearch()
    }
  }, [handleSearch])

  const handleClear = useCallback(() => {
    setInputValue('')
    onValueChange('')
    setOpen(false)
    isTyping.current = false
    inputRef.current?.focus()
  }, [onValueChange])

  const handleInputFocus = useCallback(() => {
    const trimmedValue = inputValue.trim()
    if (trimmedValue.length >= minSearchLength) {
      const searchTerm = trimmedValue.toLowerCase()
      const currentSuggestions = suggestionsCache.current.get(searchTerm)

      if (currentSuggestions && currentSuggestions.length > 0) {
        setOpen(true)
      }
    }
  }, [inputValue, minSearchLength])

  const handleInputBlur = useCallback(() => {
    setTimeout(() => setOpen(false), 200)
  }, [])

  return (
    <Popover open={open} onOpenChange={setOpen} modal={false}>
      <div className="flex flex-row gap-2 w-full sm:w-[420px]">
        <PopoverAnchor asChild>
          <div className="relative w-full">
            <Input
              ref={inputRef}
              type="text"
              placeholder={placeholder}
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
            {inputValue && (
              <button
                type="button"
                onClick={handleClear}
                onMouseDown={(e) => e.preventDefault()}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </PopoverAnchor>
        <Button
          type="button"
          onClick={handleSearch}
          size={'icon'}
          onMouseDown={(e) => e.preventDefault()}
          aria-label="Buscar"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
      {open && (
        <PopoverContent
          className="p-0"
          align="start"
          style={{ width: 'var(--radix-popover-trigger-width)' }}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <Command shouldFilter={false}>
            <CommandList>
              {suggestions.length > 0 ? (
                <CommandGroup heading="Sugestões">
                  {suggestions.map((product) => (
                    <CommandItem
                      key={product.id}
                      value={product.title}
                      onSelect={() => handleSelectSuggestion(product)}
                      className="cursor-pointer"
                    >
                      <ProductItemResult props={{ ...product }} />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : (
                debouncedInputValue.trim().length >= minSearchLength && (
                  <CommandEmpty>Nenhum produto encontrado.</CommandEmpty>
                )
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      )}
    </Popover>
  )
}

export const ProductSearch = memo(ProductSearchComponent)
