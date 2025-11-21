# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.0.0] - 2025-11-21

### Resumo da Release

Release inicial da plataforma ECO - E-commerce Demo Platform. Implementação completa de CRUD de produtos com Next.js 16, React 19, TanStack Query 5 e Tailwind CSS 4. Sistema arquitetado com SSR (Server-Side Rendering), Suspense-based data fetching, validação runtime com Zod e error handling em camadas.

---

## Stack Tecnológico Implementado

### Core Framework
- **Next.js 16.0.3** com App Router
- **React 19.2.0** com Server Components e Suspense
- **TypeScript 5** com strict mode e path aliases

### State Management & Data Fetching
- **TanStack Query 5.90.10** para server-state management
- **TanStack React Form 1.25.0** para gerenciamento de formulários
- **TanStack Zod Form Adapter 0.42.1** para integração form + validation

### UI & Styling
- **Tailwind CSS 4** com PostCSS 4
- **Radix UI Components** (Dialog, Dropdown Menu, Select, Popover, Alert Dialog)
- **Class Variance Authority (CVA) 0.7.1**
- **Lucide React 0.554.0** para ícones
- **Sonner 2.0.7** para toast notifications
- **Next Themes 0.4.6** para sistema de temas

### Validation & Error Handling
- **Zod 4.1.12** para schema validation e type inference
- **React Error Boundary 6.0.0** para error boundaries declarativos

### Testing
- **Jest 30.2.0** com coverage V8
- **Testing Library Suite** completa (React 16.3.0, Jest-DOM 6.9.1, User Event 14.6.1)
- **jest-environment-jsdom 30.2.0**

---

## Funcionalidades Implementadas

### CRUD Completo de Produtos

#### 1. Listagem de Produtos (`GET /products`)
- **Componente Principal**: `ProductCatalog` em `modules/products/ui/components/product-catalog/`
- **Server-Side Rendering**: Prefetch no servidor com `getQueryClient().prefetchQuery()`
- **Hydration**: Estado TanStack Query hidratado via `HydrationBoundary`
- **Suspense**: Fallback com `ProductCatalogSkeleton` durante carregamento
- **Grid Responsivo**: 1 coluna (mobile), 2 colunas (tablet), 3-4 colunas (desktop)
- **Product Cards**: Componente `ProductListItem` com imagem, título, preço, categoria e rating
- **Otimização de Imagens**: `next/image` com lazy loading e formatos modernos (WebP/AVIF)

**Arquivos:**
- `app/(main)/page.tsx` - Server Component com SSR
- `modules/products/ui/components/product-catalog/index.tsx`
- `modules/products/ui/components/product-catalog/ui/product-list-item.tsx`
- `modules/products/http/products/list.ts`
- `modules/products/http/hooks/use-products.ts` (hook `useProductsList`)

#### 2. Visualização de Detalhes (`GET /products/:id`)
- **Rota Dinâmica**: `app/(main)/product/[id]/details/page.tsx`
- **Componente Principal**: `ProductDetails` em `modules/products/ui/components/product-details/`
- **Informações Exibidas**:
  - Imagem em alta resolução
  - Título, categoria e breadcrumb
  - Preço com desconto calculado
  - Rating com estrelas (componente `RatingStars`)
  - Status de estoque (componente `StockIndicator`)
  - Descrição completa
  - Características específicas por categoria
  - Avaliações de clientes com componente `CustomerReviews`
  - FAQ relacionado ao produto

**Sub-componentes Implementados:**
- `ProductImage` - Otimização e zoom de imagem
- `ProductHeader` - Título e breadcrumb
- `ProductPricing` - Preço e desconto
- `RatingStars` - Visualização de rating
- `StockIndicator` - Status de estoque
- `ProductDescription` - Descrição formatada
- `ProductFeatures` - Lista de características
- `CategorySpecificContent` - Conteúdo dinâmico por categoria
- `CustomerReviews` - Seção de avaliações
- `ReviewComment` - Card de review individual
- `FAQSection` - Accordion de perguntas frequentes
- `FAQItem` - Item de FAQ
- `ProductActions` - Botões de ação (Edit, Delete)

**Arquivos:**
- `app/(main)/product/[id]/details/page.tsx`
- `modules/products/ui/components/product-details/index.tsx`
- `modules/products/ui/components/product-details/ui/*`
- `modules/products/http/products/get.ts`

#### 3. Criação de Produto (`POST /products`)
- **Modal Dialog**: Componente `ProductFormDialog` com Radix UI Dialog
- **Formulário**: `ProductForm` com TanStack React Form + Zod validation
- **Campos Implementados**:
  - Title (string, min 3 caracteres)
  - Price (number, positivo)
  - Description (textarea, min 10 caracteres)
  - Category (select com categorias da API)
  - Image URL (string URL válida)
- **Validação em Tempo Real**: Mensagens de erro abaixo de cada campo
- **Submit Handling**: Botão desabilitado até formulário válido
- **Mutation**: Hook `useCreateProduct` com invalidação de cache
- **Toast Notification**: Feedback de sucesso com Sonner

**Schema Zod:**
```typescript
const productFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  price: z.number().positive("Price must be positive"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Category is required"),
  image: z.string().url("Must be a valid URL"),
})
```

**Arquivos:**
- `modules/products/ui/components/product-form-dialog.tsx`
- `modules/products/ui/forms/product-form.tsx`
- `modules/products/schemas/products.ts`
- `modules/products/http/products/create.ts`
- `modules/products/http/hooks/use-products.ts` (hook `useCreateProduct`)

#### 4. Edição de Produto (`PUT /products/:id`)
- **Reutilização**: Mesmo componente `ProductFormDialog` e `ProductForm`
- **Modo Edição**: Prop `mode="edit"` com `productId` e `initialData`
- **Pré-preenchimento**: Campos populados com dados atuais do produto
- **Mutation**: Hook `useUpdateProduct` com invalidação de cache da lista e do produto específico
- **Double Invalidation**: Invalida `['products']` e `['product', productId]`

**Arquivos:**
- `modules/products/ui/components/product-form-dialog.tsx` (modo edit)
- `modules/products/ui/forms/product-form.tsx` (com initialData)
- `modules/products/http/products/update.ts`
- `modules/products/http/hooks/use-products.ts` (hook `useUpdateProduct`)

#### 5. Deleção de Produto (`DELETE /products/:id`)
- **Alert Dialog**: Componente de confirmação com Radix UI AlertDialog
- **Confirmação em Duas Etapas**: Cancel ou Delete
- **Mutation**: Hook `useDeleteProduct` com invalidação de cache
- **Toast Notification**: Feedback de sucesso
- **Navegação**: Redirecionamento para home após delete na página de detalhes

**Arquivos:**
- `modules/products/ui/components/product-options-menu.tsx` (menu com delete)
- `modules/products/http/products/delete.ts`
- `modules/products/http/hooks/use-products.ts` (hook `useDeleteProduct`)

### Sistema de Busca e Filtros

#### Busca por Termo
- **Componente**: `ProductSearch` em `modules/products/ui/components/product-search/`
- **Input**: Command palette com cmdk
- **Debounce**: 300ms para evitar requisições excessivas
- **Server-Side Filtering**: Filtro aplicado na função `fetchGetAllProducts`
- **Busca Multi-campo**: Título, categoria e descrição
- **Rota Dinâmica**: `/search/[id]` com query parameter na URL
- **Histórico**: Navegação preservada com Next.js router

**Implementação de Filtro:**
```typescript
const searchTerm = searchQuery.toLowerCase().trim()
return (data as Product[]).filter((product) => {
  const titleMatch = product.title.toLowerCase().includes(searchTerm)
  const categoryMatch = product.category.toLowerCase().includes(searchTerm)
  const descriptionMatch = product.description.toLowerCase().includes(searchTerm)
  return titleMatch || categoryMatch || descriptionMatch
})
```

**Arquivos:**
- `modules/products/ui/components/product-search/index.tsx`
- `modules/products/ui/components/product-search/ui/product-item-result.tsx`
- `app/(main)/search/[id]/page.tsx`
- `modules/products/http/products/list.ts` (filtro server-side)

#### Filtro por Categoria
- **Componente**: `CategoryFilter` em `modules/products/ui/components/category-filter/`
- **Select**: Radix UI Select com categorias dinâmicas
- **Categorias**: Extraídas da API (`electronics`, `jewelery`, `men's clothing`, `women's clothing`)
- **Option "All"**: Mostra todos os produtos
- **Query Key**: Cache separado por categoria no TanStack Query

**Arquivos:**
- `modules/products/ui/components/category-filter/index.tsx`
- `modules/products/context/product-toolbar-context.tsx` (estado compartilhado)

#### Product Toolbar
- **Componente Integrador**: `ProductToolbar` que combina busca, filtro e botão add
- **Context API**: `ProductToolbarContext` para estado compartilhado
- **Responsividade**: Layout adaptativo mobile/desktop
- **Skeleton**: `ProductToolbarSkeleton` durante carregamento

**Arquivos:**
- `modules/products/ui/components/product-toolbar.tsx`
- `modules/products/ui/components/product-toolbar-wrapper.tsx`
- `modules/products/context/product-toolbar-context.tsx`
- `modules/products/ui/loading/product-toolbar-skeleton.tsx`

### Sistema de Error Handling em Camadas

#### 1. HTTP Layer - Classe de Erro Customizada
```typescript
export class ProductsFetchError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: unknown
  ) {
    super(message)
    this.name = 'ProductsFetchError'
  }
}
```

**Tratamento de Erros HTTP (4xx, 5xx):**
```typescript
function handleHttpError(response: Response): never {
  const errorMessage = `Erro ao buscar produtos: ${response.status} ${response.statusText}`
  throw new ProductsFetchError(errorMessage, response.status)
}
```

**Arquivos:**
- `modules/products/common/products-fetch-error.ts`

#### 2. Validation Layer - Zod Error Handling
```typescript
function handleValidationError(validationError: unknown): never {
  if (validationError instanceof z.ZodError) {
    const errorDetails = formatValidationErrors(validationError)
    throw new ProductsFetchError(
      `Dados de produtos inválidos: ${errorDetails}`,
      undefined,
      validationError
    )
  }
  throw validationError
}
```

**Helper de Formatação:**
- `helpers/format-validation-errors.ts` - Formata ZodError para mensagens legíveis

#### 3. Network Layer - Connection Error Handling
```typescript
function handleNetworkError(error: unknown): never {
  if (error instanceof TypeError && error.message.includes('fetch')) {
    throw new ProductsFetchError(
      'Erro de conexão. Verifique sua internet e tente novamente.',
      undefined,
      error
    )
  }
  throw new ProductsFetchError('Erro inesperado ao carregar produtos', undefined, error)
}
```

#### 4. UI Layer - Error Boundaries
- **Componente**: `ProductListError` em `modules/products/ui/error/`
- **React Error Boundary**: Captura erros em árvore de componentes
- **UI de Erro**: Mensagem amigável + botão "Try Again"
- **Fallback**: Opção de voltar para home

**Arquivos:**
- `modules/products/ui/error/product-list-error.tsx`
- `modules/products/ui/error/index.ts`

### Sistema de Loading States

#### Skeleton Screens
- **ProductCatalogSkeleton**: Grid de skeletons para lista de produtos
- **ProductDetailsSkeleton**: Layout skeleton para página de detalhes
- **ProductToolbarSkeleton**: Skeleton da toolbar

**Características:**
- Mantém estrutura visual da página
- Animação de pulso (Tailwind animate-pulse)
- Smooth transition para conteúdo real
- Evita layout shift

**Arquivos:**
- `modules/products/ui/loading/product-catalog-skeleton.tsx`
- `modules/products/ui/loading/product-details-skeleton.tsx`
- `modules/products/ui/loading/product-toolbar-skeleton.tsx`

#### Suspense Integration
```typescript
<Suspense fallback={<ProductCatalogSkeleton />}>
  <ProductCatalog />
</Suspense>
```

### Empty States

#### Componente EmptyState
- **Design**: Ícone ilustrativo + mensagem + ação
- **Casos de Uso**:
  - Busca sem resultados
  - Filtro sem produtos
  - Lista vazia
- **Ações**: Botões contextuais (limpar filtros, nova busca)

**Arquivos:**
- `modules/products/ui/states/empty-state.tsx`
- `modules/products/ui/states/index.ts`

### Sistema de Validação Runtime

#### Schema Validation com Zod

**Product Item Schema:**
```typescript
export const productItemSchema = z.object({
  id: z.number(),
  title: z.string().min(1),
  price: z.number().positive(),
  description: z.string(),
  category: z.string(),
  image: z.string().url(),
  rating: z.object({
    rate: z.number().min(0).max(5),
    count: z.number().nonnegative(),
  }),
})
```

**Type Inference:**
```typescript
export type Product = z.infer<typeof productItemSchema>
```

**Validação em Todas as Requisições:**
- `fetchGetAllProducts()` - Valida array de produtos
- `fetchGetProductById()` - Valida produto único
- Forms - Valida dados de input do usuário

**Arquivos:**
- `modules/products/schemas/products.ts`
- `modules/products/types/product.ts`

---

## Arquitetura e Padrões Implementados

### 1. Server-Side Rendering (SSR) + Hydration

**Implementação em Home Page:**
```typescript
export default async function Home() {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: () => fetchGetAllProducts(),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductCatalogSkeleton />}>
        <ProductCatalog />
      </Suspense>
    </HydrationBoundary>
  )
}
```

**Benefícios:**
- First Contentful Paint otimizado
- SEO-friendly (crawlers veem conteúdo)
- Zero latência no cliente (dados já em cache)
- Fallback graceful com Suspense

**Arquivos:**
- `app/(main)/page.tsx`
- `function/get-query-client.ts`

### 2. Suspense-Based Data Fetching

**Hook com useSuspenseQuery:**
```typescript
export function useProductsList(searchQuery?: string) {
  return useSuspenseQuery({
    queryKey: searchQuery ? ['products', searchQuery] : ['products'],
    queryFn: () => fetchGetAllProducts(searchQuery),
  })
}
```

**Características:**
- Componente suspende durante fetch
- Sem estados de loading/error no componente
- Erros propagados para Error Boundary
- Cache automático por queryKey

**Arquivos:**
- `modules/products/http/hooks/use-products.ts`

### 3. Feature-Based Module Architecture

**Estrutura por Domínio:**
```
modules/products/
├── http/          # Camada de comunicação HTTP
├── ui/            # Camada de apresentação
├── context/       # React Context API
├── schemas/       # Zod schemas
├── types/         # TypeScript types
└── common/        # Utilitários comuns
```

**Benefícios:**
- Baixo acoplamento
- Alta coesão
- Escalabilidade
- Facilidade de manutenção

### 4. Cache Management com TanStack Query

**Configuração Global:**
```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      gcTime: 10 * 60 * 1000,   // 10 minutos
    },
  },
})
```

**Invalidação Inteligente:**
- Create: Invalida `['products']`
- Update: Invalida `['products']` + `['product', id]`
- Delete: Invalida `['products']`

**Arquivos:**
- `function/get-query-client.ts`
- `providers/index.tsx`

### 5. Route Groups e Layouts

**Estrutura de Rotas:**
```
app/
├── layout.tsx                # Root layout (providers, fonts, metadata)
└── (main)/                   # Route group
    ├── layout.tsx            # Main layout (header, container)
    ├── page.tsx              # Home page
    ├── search/[id]/
    │   └── page.tsx          # Search results
    └── product/[id]/details/
        └── page.tsx          # Product details
```

**Benefícios:**
- Layouts compartilhados
- Organização lógica
- URL limpa (sem "main" na URL)

---

## Otimizações de Performance

### 1. Image Optimization
- **next/image**: Lazy loading automático
- **Responsive**: Sizes calculados por breakpoint
- **Formats**: WebP/AVIF quando suportado
- **Placeholder**: Blur durante carregamento

**Configuração:**
```typescript
// next.config.ts
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'fakestoreapi.com',
      pathname: '/img/**',
    },
  ],
}
```

### 2. Code Splitting
- **Automático**: Next.js divide por rota
- **Dynamic Imports**: Lazy loading de componentes pesados
- **Vendor Chunks**: Bibliotecas separadas para cache eficiente

### 3. React 19 Features
- **Automatic Batching**: State updates agrupados
- **Concurrent Rendering**: Renderização não-bloqueante
- **Suspense**: Data fetching nativo
- **Server Components**: Quando aplicável

### 4. TanStack Query Optimizations
- **Stale-While-Revalidate**: Dados em cache servidos instantaneamente
- **Background Refetch**: Atualização silenciosa em background
- **Request Deduplication**: Múltiplas requisições deduplicadas
- **Prefetching**: Dados carregados antes da navegação

---

## UI/UX Implementações

### Design System

#### Componentes Radix UI
- **Dialog**: Modais de formulário
- **AlertDialog**: Confirmação de deleção
- **DropdownMenu**: Menu de opções do produto
- **Select**: Filtro de categoria
- **Popover**: Command palette de busca
- **Label**: Labels acessíveis em forms
- **Separator**: Divisores semânticos

#### Utility Classes
- **CVA (Class Variance Authority)**: Variantes type-safe
- **clsx**: Composição condicional de classes
- **tailwind-merge**: Merge sem conflitos

### Responsividade

#### Breakpoints Tailwind
- **Mobile**: `< 768px` (sm)
- **Tablet**: `768px - 1024px` (md)
- **Desktop**: `> 1024px` (lg/xl)

#### Grid Adaptativo
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
```

### Acessibilidade

#### WCAG AA Compliance
- **Keyboard Navigation**: Tab order lógico
- **Focus Indicators**: Visible focus states
- **ARIA Labels**: Screen reader support
- **Semantic HTML**: Estrutura semântica
- **Color Contrast**: Razão mínima 4.5:1

### Feedback Visual

#### Interações
- **Hover States**: Cards e botões com hover
- **Focus States**: Ring azul em foco
- **Active States**: Pressed effect
- **Disabled States**: Opacidade reduzida

#### Transições
- **Modal**: Fade in/out
- **Toast**: Slide in do canto
- **Skeleton**: Smooth fade para conteúdo
- **Hover**: Transition de 200ms

---

## Testes Implementados

### Configuração Jest

**jest.config.ts:**
```typescript
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  collectCoverageFrom: [
    'modules/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    '!**/*.d.ts',
  ],
}
```

### Testes Unitários Implementados

#### Component Tests
- **CategoryFilter**: `modules/products/ui/components/category-filter/__tests__/category-filter.test.tsx`
- **ProductSearch**: `modules/products/ui/components/product-search/__tests__/product-search.test.tsx`
- **ProductListItem**: `modules/products/ui/components/product-catalog/ui/__tests__/product-list-item.test.tsx`
- **EmptyState**: `modules/products/ui/states/__tests__/empty-state.test.tsx`
- **ProductForm**: `modules/products/ui/forms/product-form.test.tsx`

#### Test Utilities
- **Mocks**: `__tests__/mocks/` - Mock data (produtos, categorias)
- **Utils**: `__tests__/utils/` - Test helpers

### Coverage Target
- **Modules**: 80%+ coverage em `modules/**/*.{ts,tsx}`
- **Components**: 70%+ coverage em `components/**/*.{ts,tsx}`

---

## Configuração e Tooling

### TypeScript Configuration

**tsconfig.json:**
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "strict": true,
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### ESLint Configuration

**eslint.config.mjs:**
- Next.js ESLint config
- TanStack Query plugin para best practices
- Regras de acessibilidade

### Tailwind CSS Configuration

**Tailwind v4** com:
- Custom colors (tema ECO)
- Custom fonts (Geist, Commissioner)
- Animações customizadas
- Plugin tw-animate-css

### PostCSS Configuration

**postcss.config.mjs:**
- Tailwind CSS plugin
- Autoprefixer

---

## Documentação

### README.md Técnico Completo
Documentação técnica detalhada incluindo:
- Stack tecnológico completo
- Arquitetura do projeto
- Estrutura de diretórios
- Padrões arquiteturais
- Pré-requisitos e instalação
- Scripts disponíveis
- Fluxo de dados e renderização
- Validação e type-safety
- Error handling
- Testes
- Performance e otimizações
- Deploy (Vercel + Docker)
- Troubleshooting

### INSTRUCTIONS.md - Manual de Utilização
Manual completo do usuário incluindo:
- Visão geral da aplicação
- Navegação principal (todas as páginas)
- Funcionalidades da toolbar
- CRUD completo (criar, ler, atualizar, deletar)
- Sistema de busca e filtros
- Estados de interface (loading, empty, error, success)
- Responsividade por breakpoint
- Atalhos de teclado
- Acessibilidade
- Feedback visual
- Cache e performance
- Troubleshooting comum
- Limitações da API fake
- Dicas de uso

---

## Git e Versionamento

### Convenção de Commits
- **feat**: Nova funcionalidade
- **fix**: Correção de bug
- **refactor**: Refatoração de código
- **style**: Mudanças de estilo (formatação, etc)
- **test**: Adição ou correção de testes
- **docs**: Documentação

### Branches
- **main**: Branch de produção (release 1.0.0)
- **develop**: Branch de desenvolvimento
- **@feat/**: Feature branches
  - `@feat/products-list`
  - `@feat/product-details`
  - `@feat/mutations`
  - `@feat/perfumaria`

### Histórico de Commits
Total de 22 commits desde início do projeto, com mensagens claras e descritivas.

---

## API Integration

### FakeStore API
- **Base URL**: `https://fakestoreapi.com`
- **Endpoints Utilizados**:
  - `GET /products` - Lista todos os produtos
  - `GET /products/:id` - Detalhes de um produto
  - `POST /products` - Criar produto (fake)
  - `PUT /products/:id` - Atualizar produto (fake)
  - `DELETE /products/:id` - Deletar produto (fake)

### Limitações Conhecidas
- Dados não são persistidos de verdade
- POST/PUT/DELETE retornam sucesso mas não alteram o banco
- IDs gerados podem conflitar
- Lista sempre retorna mesmos 20 produtos

---

## Tipografia

### Google Fonts Implementadas
- **Geist**: Família Sans (variável `--font-geist-sans`)
- **Geist Mono**: Família Mono (variável `--font-geist-mono`)
- **Commissioner**: Família customizada (variável `--font-commissioner`)

**Configuração:**
```typescript
// app/layout.tsx
import { Geist, Geist_Mono, Commissioner } from "next/font/google"
```

---

## Metadata e SEO

### Root Layout Metadata
```typescript
export const metadata: Metadata = {
  title: "ECO",
  description: "E-commerce Demo Platform.",
}
```

### Otimizações SEO
- Server-Side Rendering para crawlers
- Semantic HTML
- Meta tags apropriadas
- Open Graph preparado (extensível)

---

## Melhorias Futuras (Roadmap)

### Funcionalidades
- [ ] Sistema de autenticação (login fake)
- [ ] Sidebar responsiva
- [ ] Carrinho de compras
- [ ] Wishlist
- [ ] Paginação da lista de produtos
- [ ] Infinite scroll
- [ ] Filtros avançados (preço, rating)
- [ ] Ordenação (preço, nome, rating)
- [ ] Zoom de imagem no produto

### Performance
- [ ] Image placeholder blur hash
- [ ] Prefetch on hover
- [ ] Service Worker para cache
- [ ] Optimistic UI updates

### Testes
- [ ] Aumentar coverage para 90%+
- [ ] E2E tests com Playwright
- [ ] Visual regression tests

### UX
- [ ] Dark mode completo
- [ ] Animações de transição de página
- [ ] Skeleton com conteúdo similar
- [ ] Toast queue system
- [ ] Loading progress bar

---

## Dependências Principais

### Production Dependencies
```json
{
  "@radix-ui/react-alert-dialog": "^1.1.15",
  "@radix-ui/react-dialog": "^1.1.15",
  "@radix-ui/react-dropdown-menu": "^2.1.16",
  "@radix-ui/react-select": "^2.2.6",
  "@tanstack/react-form": "^1.25.0",
  "@tanstack/react-query": "^5.90.10",
  "@tanstack/zod-form-adapter": "^0.42.1",
  "class-variance-authority": "^0.7.1",
  "lucide-react": "^0.554.0",
  "next": "16.0.3",
  "next-themes": "^0.4.6",
  "react": "19.2.0",
  "react-error-boundary": "^6.0.0",
  "sonner": "^2.0.7",
  "zod": "^4.1.12"
}
```

### Development Dependencies
```json
{
  "@tailwindcss/postcss": "^4",
  "@tanstack/eslint-plugin-query": "^5.91.2",
  "@testing-library/jest-dom": "^6.9.1",
  "@testing-library/react": "^16.3.0",
  "@types/jest": "^30.0.0",
  "eslint": "^9",
  "jest": "^30.2.0",
  "tailwindcss": "^4",
  "typescript": "^5"
}
```

---

## Scripts NPM

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint",
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage"
}
```

---

## Autores

- **Marlinsk** - Desenvolvimento completo da release 1.0.0

---

## Licença

Projeto de demonstração educacional.

---

## Referências

- [Next.js Documentation](https://nextjs.org/docs)
- [React 19 Documentation](https://react.dev)
- [TanStack Query](https://tanstack.com/query/latest)
- [Zod Documentation](https://zod.dev)
- [Radix UI](https://www.radix-ui.com)
- [Tailwind CSS](https://tailwindcss.com)
- [FakeStore API](https://fakestoreapi.com/docs)

---

[1.0.0]: https://github.com/marlinsk/dev-frontend-nextjs/releases/tag/v1.0.0
