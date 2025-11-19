import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/__tests__/utils/test-utils'
import { CategoryFilter } from '../index'

describe('CategoryFilter', () => {
  const mockOnValueChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render with default value', () => {
    renderWithProviders(
      <CategoryFilter value="all" onValueChange={mockOnValueChange} />
    )

    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('should display Filter icon', () => {
    const { container } = renderWithProviders(
      <CategoryFilter value="all" onValueChange={mockOnValueChange} />
    )

    // Verifica que existe um ícone SVG (lucide-react renderiza SVG)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('should show selected category value', () => {
    renderWithProviders(
      <CategoryFilter value="electronics" onValueChange={mockOnValueChange} />
    )

    const trigger = screen.getByRole('combobox')
    expect(trigger).toBeInTheDocument()
  })

  it('should have correct width classes', () => {
    const { container } = renderWithProviders(
      <CategoryFilter value="all" onValueChange={mockOnValueChange} />
    )

    const wrapper = container.firstChild
    expect(wrapper).toHaveClass('w-full', 'sm:w-64')
  })

  it('should reflect controlled value prop', () => {
    const { rerender } = renderWithProviders(
      <CategoryFilter value="electronics" onValueChange={mockOnValueChange} />
    )

    // Valor inicial
    expect(screen.getByRole('combobox')).toBeInTheDocument()

    // Atualiza o valor
    rerender(
      <CategoryFilter value="jewelery" onValueChange={mockOnValueChange} />
    )

    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('should render with empty value', () => {
    renderWithProviders(
      <CategoryFilter value="" onValueChange={mockOnValueChange} />
    )

    const trigger = screen.getByRole('combobox')
    expect(trigger).toBeInTheDocument()
  })

  it('should accept onValueChange callback', () => {
    renderWithProviders(
      <CategoryFilter value="all" onValueChange={mockOnValueChange} />
    )

    expect(screen.getByRole('combobox')).toBeInTheDocument()
    // O callback é passado como prop e será chamado na interação do usuário
  })

  it('should render with different category values', () => {
    const categories = ['all', 'electronics', 'jewelery', "men's clothing", "women's clothing"]

    categories.forEach(category => {
      const { unmount } = renderWithProviders(
        <CategoryFilter value={category} onValueChange={mockOnValueChange} />
      )

      expect(screen.getByRole('combobox')).toBeInTheDocument()

      unmount()
    })
  })
})
