import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/__tests__/utils/test-utils'
import { EmptyState } from '../empty-state'

describe('EmptyState', () => {
  it('should render title correctly', () => {
    const title = 'No products found'
    renderWithProviders(<EmptyState title={title} />)

    expect(screen.getByText(title)).toBeInTheDocument()
  })

  it('should render title and description when both are provided', () => {
    const title = 'No products found'
    const description = 'Try adjusting your filters'

    renderWithProviders(<EmptyState title={title} description={description} />)

    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(description)).toBeInTheDocument()
  })

  it('should not render description when not provided', () => {
    const title = 'No products found'
    const { container } = renderWithProviders(<EmptyState title={title} />)

    expect(screen.getByText(title)).toBeInTheDocument()

    // Verifica que o parágrafo de descrição não existe
    const descriptionElements = container.querySelectorAll('.text-xs.text-muted-foreground')
    expect(descriptionElements.length).toBe(0)
  })

  it('should render PackageOpen icon', () => {
    const { container } = renderWithProviders(
      <EmptyState title="No products" />
    )

    const icon = container.querySelector('.lucide-package-open')
    expect(icon).toBeInTheDocument()
  })

  it('should have correct layout classes', () => {
    const { container } = renderWithProviders(
      <EmptyState title="No products" />
    )

    const wrapper = container.querySelector('.min-h-\\[400px\\]')
    expect(wrapper).toBeInTheDocument()
    expect(wrapper).toHaveClass('flex', 'items-center', 'justify-center')
  })

  it('should have correct icon container styling', () => {
    const { container } = renderWithProviders(
      <EmptyState title="No products" />
    )

    const iconContainer = container.querySelector('.rounded-full.bg-muted')
    expect(iconContainer).toBeInTheDocument()
    expect(iconContainer).toHaveClass('p-3')
  })

  it('should render title with correct styling', () => {
    renderWithProviders(<EmptyState title="No products" />)

    const title = screen.getByText('No products')
    expect(title).toHaveClass('text-sm', 'font-semibold', 'text-foreground')
  })

  it('should render description with correct styling when provided', () => {
    const description = 'Try adjusting your filters'
    renderWithProviders(
      <EmptyState title="No products" description={description} />
    )

    const descriptionElement = screen.getByText(description)
    expect(descriptionElement).toHaveClass('text-xs', 'text-muted-foreground')
  })

  it('should center content properly', () => {
    const { container } = renderWithProviders(
      <EmptyState title="No products" description="Try again" />
    )

    const contentWrapper = container.querySelector('.flex.flex-col.items-center')
    expect(contentWrapper).toBeInTheDocument()
    expect(contentWrapper).toHaveClass('gap-2', 'text-center')
  })

  it('should handle empty title string', () => {
    const { container } = renderWithProviders(<EmptyState title="" />)

    // Componente ainda deve renderizar mesmo com título vazio
    expect(container.querySelector('.min-h-\\[400px\\]')).toBeInTheDocument()
  })

  it('should handle long title text', () => {
    const longTitle = 'This is a very long title that might wrap to multiple lines but should still be displayed correctly'
    renderWithProviders(<EmptyState title={longTitle} />)

    expect(screen.getByText(longTitle)).toBeInTheDocument()
  })

  it('should handle long description text', () => {
    const longDescription = 'This is a very long description that provides detailed information about why no products are displayed and what the user can do about it'
    renderWithProviders(
      <EmptyState title="No products" description={longDescription} />
    )

    expect(screen.getByText(longDescription)).toBeInTheDocument()
  })
})
