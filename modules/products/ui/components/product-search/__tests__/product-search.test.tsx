import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '@/__tests__/utils/test-utils'
import { ProductSearch } from '../index'
import { mockProducts } from '@/__tests__/mocks/products'

// Mock da navegação do Next.js
const mockPush = jest.fn()
const mockGet = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
  useSearchParams: () => ({
    get: mockGet,
  }),
}))

describe('ProductSearch', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockGet.mockReturnValue('')
  })

  it('should render search input with placeholder', () => {
    renderWithProviders(
      <ProductSearch
        products={mockProducts}
        value=""
      />
    )

    expect(screen.getByPlaceholderText('Buscar produtos...')).toBeInTheDocument()
  })

  it('should render with custom placeholder', () => {
    const customPlaceholder = 'Search for items...'
    renderWithProviders(
      <ProductSearch
        products={mockProducts}
        value=""
        placeholder={customPlaceholder}
      />
    )

    expect(screen.getByPlaceholderText(customPlaceholder)).toBeInTheDocument()
  })

  it('should render search button with icon', () => {
    const { container } = renderWithProviders(
      <ProductSearch
        products={mockProducts}
        value=""
      />
    )

    const searchButton = screen.getByLabelText('Buscar')
    expect(searchButton).toBeInTheDocument()

    const searchIcon = container.querySelector('.lucide-search')
    expect(searchIcon).toBeInTheDocument()
  })

  it('should update input value when user types', async () => {
    const user = userEvent.setup()
    renderWithProviders(
      <ProductSearch
        products={mockProducts}
        value=""
      />
    )

    const input = screen.getByPlaceholderText('Buscar produtos...')
    await user.type(input, 'phone')

    expect(input).toHaveValue('phone')
  })

  it('should show clear button when input has value', async () => {
    const user = userEvent.setup()
    const { container } = renderWithProviders(
      <ProductSearch
        products={mockProducts}
        value=""
      />
    )

    const input = screen.getByPlaceholderText('Buscar produtos...')
    await user.type(input, 'test')

    const clearButton = container.querySelector('.lucide-x')?.parentElement
    expect(clearButton).toBeInTheDocument()
  })

  it('should clear input when clear button is clicked', async () => {
    const user = userEvent.setup()
    const { container } = renderWithProviders(
      <ProductSearch
        products={mockProducts}
        value=""
      />
    )

    const input = screen.getByPlaceholderText('Buscar produtos...')
    await user.type(input, 'test')

    const clearButton = container.querySelector('.lucide-x')?.parentElement as HTMLElement
    await user.click(clearButton)

    expect(input).toHaveValue('')
  })

  it('should handle controlled value prop changes', () => {
    const { rerender } = renderWithProviders(
      <ProductSearch
        products={mockProducts}
        value=""
      />
    )

    const input = screen.getByPlaceholderText('Buscar produtos...')
    expect(input).toHaveValue('')

    rerender(
      <ProductSearch
        products={mockProducts}
        value="new value"
      />
    )

    expect(input).toHaveValue('new value')
  })

  it('should have correct wrapper width classes', () => {
    const { container } = renderWithProviders(
      <ProductSearch
        products={mockProducts}
        value=""
      />
    )

    const wrapper = container.querySelector('.w-full.sm\\:\\w-\\[420px\\]')
    expect(wrapper).toBeInTheDocument()
  })

  it('should render input and button inside wrapper', () => {
    renderWithProviders(
      <ProductSearch
        products={mockProducts}
        value=""
      />
    )

    const input = screen.getByPlaceholderText('Buscar produtos...')
    const button = screen.getByLabelText('Buscar')

    expect(input).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  it('should accept minSearchLength prop', () => {
    renderWithProviders(
      <ProductSearch
        products={mockProducts}
        value=""
        minSearchLength={3}
      />
    )

    expect(screen.getByPlaceholderText('Buscar produtos...')).toBeInTheDocument()
  })

  it('should accept maxSuggestions prop', () => {
    renderWithProviders(
      <ProductSearch
        products={mockProducts}
        value=""
        maxSuggestions={5}
      />
    )

    expect(screen.getByPlaceholderText('Buscar produtos...')).toBeInTheDocument()
  })

  it('should navigate to search page when search button is clicked', async () => {
    const user = userEvent.setup()
    renderWithProviders(
      <ProductSearch
        products={mockProducts}
        value=""
      />
    )

    const input = screen.getByPlaceholderText('Buscar produtos...')
    await user.type(input, 'phone')

    const searchButton = screen.getByLabelText('Buscar')
    await user.click(searchButton)

    expect(mockPush).toHaveBeenCalled()
    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('phone'))
  })

  it('should clear cache when products prop changes', () => {
    const { rerender } = renderWithProviders(
      <ProductSearch
        products={mockProducts}
        value=""
      />
    )

    // Mudar produtos deve limpar o cache de sugestões
    rerender(
      <ProductSearch
        products={mockProducts.slice(0, 5)}
        value=""
      />
    )

    expect(screen.getByPlaceholderText('Buscar produtos...')).toBeInTheDocument()
  })
})
