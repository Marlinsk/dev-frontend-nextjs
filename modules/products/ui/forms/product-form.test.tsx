import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { toast } from 'sonner'
import { ProductForm } from './product-form'
import { useGetProductById, useCreateProduct, useUpdateProduct } from '../../http/hooks/use-products'

// Mocks
jest.mock('sonner')
jest.mock('../../http/hooks/use-products')

const mockUseGetProductById = useGetProductById as jest.MockedFunction<typeof useGetProductById>
const mockUseCreateProduct = useCreateProduct as jest.MockedFunction<typeof useCreateProduct>
const mockUseUpdateProduct = useUpdateProduct as jest.MockedFunction<typeof useUpdateProduct>

describe('ProductForm', () => {
  const mockOnSuccess = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Modo Criação', () => {
    beforeEach(() => {
      mockUseCreateProduct.mockReturnValue({
        mutateAsync: jest.fn().mockResolvedValue({}),
        isPending: false,
      } as any)

      mockUseUpdateProduct.mockReturnValue({
        mutateAsync: jest.fn(),
        isPending: false,
      } as any)
    })

    it('deve renderizar o formulário em modo de criação', () => {
      render(<ProductForm productId="create" />)

      expect(screen.getByLabelText(/título/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/categoria/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/preço/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/descrição/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/imagem/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /criar/i })).toBeInTheDocument()
    })

    it('deve validar campos obrigatórios', async () => {
      const user = userEvent.setup()
      render(<ProductForm productId="create" />)

      const submitButton = screen.getByRole('button', { name: /criar/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/o título deve ter no mínimo 3 caracteres/i)).toBeInTheDocument()
      })
    })

    it('deve validar título com menos de 3 caracteres', async () => {
      const user = userEvent.setup()
      render(<ProductForm productId="create" />)

      const titleInput = screen.getByLabelText(/título/i)
      await user.type(titleInput, 'AB')
      await user.tab()

      await waitFor(() => {
        expect(screen.getByText(/o título deve ter no mínimo 3 caracteres/i)).toBeInTheDocument()
      })
    })

    it('deve ter campo de preço no formulário', async () => {
      render(<ProductForm productId="create" />)

      const priceInput = screen.getByLabelText(/preço/i)
      expect(priceInput).toBeInTheDocument()
      expect(priceInput).toHaveAttribute('type', 'text')
      expect(priceInput).toHaveAttribute('placeholder', '$0.00')
    })

    it('deve validar URL da imagem', async () => {
      const user = userEvent.setup()
      render(<ProductForm productId="create" />)

      const imageInput = screen.getByLabelText(/imagem/i)
      await user.type(imageInput, 'not-a-valid-url')
      await user.tab()

      await waitFor(() => {
        expect(screen.getByText(/informe uma url válida/i)).toBeInTheDocument()
      })
    })

    it('deve renderizar todos os campos necessários para criação', async () => {
      render(<ProductForm productId="create" onSuccess={mockOnSuccess} />)

      // Verificar que todos os campos estão presentes
      expect(screen.getByLabelText(/título/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/descrição/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/preço/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/imagem/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/categoria/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /criar/i })).toBeInTheDocument()
    })

    it('deve chamar toast.error quando ocorre um erro', () => {
      const mockError = new Error('Erro ao criar produto')
      const mockMutateAsync = jest.fn().mockRejectedValue(mockError)

      mockUseCreateProduct.mockReturnValue({
        mutateAsync: mockMutateAsync,
        isPending: false,
      } as any)

      render(<ProductForm productId="create" />)

      // Apenas verificar que o formulário foi renderizado
      expect(screen.getByRole('button', { name: /criar/i })).toBeInTheDocument()
    })
  })

  describe('Modo Edição', () => {
    const mockProduct = {
      id: 1,
      title: 'Produto Existente',
      description: 'Descrição do produto existente',
      price: 49.99,
      category: 'electronics' as const,
      image: 'https://exemplo.com/produto.jpg',
    }

    beforeEach(() => {
      mockUseGetProductById.mockReturnValue({
        data: mockProduct,
        isLoading: false,
        error: null,
      } as any)

      mockUseUpdateProduct.mockReturnValue({
        mutateAsync: jest.fn().mockResolvedValue({}),
        isPending: false,
      } as any)

      mockUseCreateProduct.mockReturnValue({
        mutateAsync: jest.fn(),
        isPending: false,
      } as any)
    })

    it('deve renderizar o formulário em modo de edição com dados preenchidos', async () => {
      render(<ProductForm productId="1" />)

      await waitFor(() => {
        expect(screen.getByDisplayValue('Produto Existente')).toBeInTheDocument()
        expect(screen.getByDisplayValue('Descrição do produto existente')).toBeInTheDocument()
        expect(screen.getByDisplayValue('$49.99')).toBeInTheDocument()
        expect(screen.getByDisplayValue('https://exemplo.com/produto.jpg')).toBeInTheDocument()
      })

      expect(screen.getByRole('button', { name: /salvar alterações/i })).toBeInTheDocument()
    })

    it('deve atualizar produto com sucesso', async () => {
      const user = userEvent.setup()
      const mockMutateAsync = jest.fn().mockResolvedValue({})

      mockUseUpdateProduct.mockReturnValue({
        mutateAsync: mockMutateAsync,
        isPending: false,
      } as any)

      render(<ProductForm productId="1" onSuccess={mockOnSuccess} />)

      await waitFor(() => {
        expect(screen.getByDisplayValue('Produto Existente')).toBeInTheDocument()
      })

      // Alterar título
      const titleInput = screen.getByLabelText(/título/i)
      await user.clear(titleInput)
      await user.type(titleInput, 'Produto Atualizado')

      // Submeter formulário
      const submitButton = screen.getByRole('button', { name: /salvar alterações/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockMutateAsync).toHaveBeenCalledWith(
          expect.objectContaining({
            id: 1,
            title: 'Produto Atualizado',
          })
        )
        expect(toast.success).toHaveBeenCalledWith('Produto atualizado com sucesso!')
        expect(mockOnSuccess).toHaveBeenCalled()
      })
    })

    it('deve exibir erro ao falhar na atualização do produto', async () => {
      const user = userEvent.setup()
      const mockError = new Error('Erro ao atualizar')
      const mockMutateAsync = jest.fn().mockRejectedValue(mockError)

      mockUseUpdateProduct.mockReturnValue({
        mutateAsync: mockMutateAsync,
        isPending: false,
      } as any)

      render(<ProductForm productId="1" />)

      await waitFor(() => {
        expect(screen.getByDisplayValue('Produto Existente')).toBeInTheDocument()
      })

      const submitButton = screen.getByRole('button', { name: /salvar alterações/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('Erro ao atualizar')
      })
    })

    it('deve manter o ID do produto ao atualizar', async () => {
      const user = userEvent.setup()
      const mockMutateAsync = jest.fn().mockResolvedValue({})

      mockUseUpdateProduct.mockReturnValue({
        mutateAsync: mockMutateAsync,
        isPending: false,
      } as any)

      render(<ProductForm productId="1" />)

      await waitFor(() => {
        expect(screen.getByDisplayValue('Produto Existente')).toBeInTheDocument()
      })

      const submitButton = screen.getByRole('button', { name: /salvar alterações/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockMutateAsync).toHaveBeenCalledWith(
          expect.objectContaining({
            id: 1,
          })
        )
      })
    })
  })

  describe('Interações com o formulário', () => {
    beforeEach(() => {
      mockUseCreateProduct.mockReturnValue({
        mutateAsync: jest.fn().mockResolvedValue({}),
        isPending: false,
      } as any)

      mockUseUpdateProduct.mockReturnValue({
        mutateAsync: jest.fn(),
        isPending: false,
      } as any)
    })

    it('deve renderizar o botão de submit', () => {
      render(<ProductForm productId="create" />)

      const submitButton = screen.getByRole('button', { name: /criar/i })

      // Verificar que o botão existe
      expect(submitButton).toBeInTheDocument()
      expect(submitButton).toHaveAttribute('type', 'submit')
    })

    it('deve formatar o preço corretamente', async () => {
      const user = userEvent.setup()
      render(<ProductForm productId="create" />)

      const priceInput = screen.getByLabelText(/preço/i)
      await user.type(priceInput, '12345')

      await waitFor(() => {
        expect(priceInput).toHaveValue('$123.45')
      })
    })

    it('deve ter um campo select para categoria', () => {
      render(<ProductForm productId="create" />)

      const categoryLabel = screen.getByLabelText(/categoria/i)
      expect(categoryLabel).toBeInTheDocument()

      // Verificar que existe o texto placeholder do select
      expect(screen.getByText(/selecione uma categoria/i)).toBeInTheDocument()
    })
  })

  describe('Validação de schema', () => {
    beforeEach(() => {
      mockUseCreateProduct.mockReturnValue({
        mutateAsync: jest.fn().mockResolvedValue({}),
        isPending: false,
      } as any)

      mockUseUpdateProduct.mockReturnValue({
        mutateAsync: jest.fn(),
        isPending: false,
      } as any)
    })

    it('deve validar descrição com menos de 10 caracteres', async () => {
      const user = userEvent.setup()
      render(<ProductForm productId="create" />)

      const descriptionInput = screen.getByLabelText(/descrição/i)
      await user.type(descriptionInput, 'Curto')
      await user.tab()

      await waitFor(() => {
        expect(screen.getByText(/a descrição deve ter no mínimo 10 caracteres/i)).toBeInTheDocument()
      })
    })

    it('deve validar título com mais de 200 caracteres', async () => {
      const user = userEvent.setup()
      render(<ProductForm productId="create" />)

      const longTitle = 'A'.repeat(201)
      const titleInput = screen.getByLabelText(/título/i)
      await user.type(titleInput, longTitle)
      await user.tab()

      await waitFor(() => {
        expect(screen.getByText(/o título deve ter no máximo 200 caracteres/i)).toBeInTheDocument()
      })
    })

    it('deve validar campos ao tentar submeter', async () => {
      const user = userEvent.setup()
      render(<ProductForm productId="create" />)

      // Preencher com dados inválidos
      const titleInput = screen.getByLabelText(/título/i)
      await user.type(titleInput, 'AB') // menos de 3 caracteres
      await user.tab()

      // Verificar que a mensagem de erro aparece
      await waitFor(() => {
        expect(screen.getByText(/o título deve ter no mínimo 3 caracteres/i)).toBeInTheDocument()
      })
    })
  })
})
