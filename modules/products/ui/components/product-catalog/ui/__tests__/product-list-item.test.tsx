import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/__tests__/utils/test-utils'
import { ProductListItem } from '../product-list-item'
import { mockProduct } from '@/__tests__/mocks/products'

describe('ProductListItem', () => {
  it('should render product information correctly', () => {
    renderWithProviders(<ProductListItem product={mockProduct} />)

    expect(screen.getByText(mockProduct.title)).toBeInTheDocument()
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument()
    expect(screen.getByText(mockProduct.category)).toBeInTheDocument()
    expect(screen.getByText(`$${mockProduct.price.toFixed(2)}`)).toBeInTheDocument()
  })

  it('should render product image with correct attributes', () => {
    renderWithProviders(<ProductListItem product={mockProduct} />)

    const image = screen.getByAltText(mockProduct.title)
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', mockProduct.image)
  })

  it('should display formatted price with two decimal places', () => {
    const productWithPrice = { ...mockProduct, price: 99 }
    renderWithProviders(<ProductListItem product={productWithPrice} />)

    expect(screen.getByText('$99.00')).toBeInTheDocument()
  })

  it('should apply correct CSS classes for layout', () => {
    const { container } = renderWithProviders(<ProductListItem product={mockProduct} />)

    const card = container.querySelector('.group')
    expect(card).toBeInTheDocument()
    expect(card).toHaveClass('border', 'border-border', 'bg-card')
  })

  it('should render category badge', () => {
    renderWithProviders(<ProductListItem product={mockProduct} />)

    const categoryBadge = screen.getByText(mockProduct.category)
    expect(categoryBadge).toBeInTheDocument()
    expect(categoryBadge).toHaveClass('rounded-full', 'bg-secondary')
  })

  it('should truncate long title with line-clamp-2', () => {
    const productWithLongTitle = {
      ...mockProduct,
      title: 'This is a very long product title that should be truncated after two lines to maintain consistent layout across all product cards'
    }
    const { container } = renderWithProviders(<ProductListItem product={productWithLongTitle} />)

    const title = container.querySelector('h3')
    expect(title).toHaveClass('line-clamp-2')
  })

  it('should truncate long description with line-clamp-2', () => {
    const productWithLongDescription = {
      ...mockProduct,
      description: 'This is a very long product description that should be truncated after two lines to maintain consistent layout across all product cards in the grid view'
    }
    const { container } = renderWithProviders(<ProductListItem product={productWithLongDescription} />)

    const description = container.querySelector('.line-clamp-2.text-xs')
    expect(description).toBeInTheDocument()
  })

  it('should render with aspect-square image container', () => {
    const { container } = renderWithProviders(<ProductListItem product={mockProduct} />)

    const imageContainer = container.querySelector('.aspect-square')
    expect(imageContainer).toBeInTheDocument()
  })
})
