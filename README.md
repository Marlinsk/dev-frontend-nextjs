# ECO - Sistema de Gestão de E-commerce

Sistema de gestão para e-commerce desenvolvido com Next.js 16, React 19 e TanStack Query, permitindo o gerenciamento completo de produtos (CRUD) com integração à FakeStore API.

## Stack Tecnológico

### Core Framework
- **Next.js 16.0.3** - Framework React com App Router, Server Components e Server-Side Rendering (SSR)
- **React 19.2.0** - Biblioteca JavaScript para construção de interfaces com suporte a Suspense e Server Components
- **TypeScript 5** - Superset JavaScript com tipagem estática e compilador configurado para ES2017

### State Management & Data Fetching
- **TanStack Query 5.90.10** - Gerenciamento de estado assíncrono server-state com cache inteligente, invalidação automática e otimistic updates
- **TanStack React Form 1.25.0** - Gerenciamento de formulários type-safe com validação integrada ao Zod
- **TanStack Zod Form Adapter 0.42.1** - Adaptador para integração entre TanStack Form e Zod schemas

### UI & Styling
- **Tailwind CSS 4** - Framework CSS utility-first com PostCSS 4
- **Radix UI** - Componentes acessíveis headless (Dialog, Dropdown Menu, Select, Popover, Alert Dialog, Label, Separator, Slot)
- **Class Variance Authority (CVA) 0.7.1** - Gerenciamento de variantes de componentes type-safe
- **clsx 2.1.1** - Utilitário para construção condicional de classNames
- **tailwind-merge 3.4.0** - Mesclagem inteligente de classes Tailwind sem conflitos
- **tw-animate-css 1.4.0** - Animações CSS para Tailwind
- **Lucide React 0.554.0** - Biblioteca de ícones SVG otimizados
- **cmdk 1.1.1** - Command palette/menu component
- **Next Themes 0.4.6** - Sistema de temas (dark/light mode) para Next.js
- **Sonner 2.0.7** - Toast notifications otimizadas para React

### Validation & Error Handling
- **Zod 4.1.12** - Schema validation com type inference e runtime type checking
- **React Error Boundary 6.0.0** - Componente para captura declarativa de erros em árvores React

### Tipografia
- **Geist** - Família de fontes Sans otimizada da Vercel
- **Geist Mono** - Família de fontes Monospace da Vercel
- **Commissioner** - Fonte customizada do Google Fonts

### Ferramentas de Desenvolvimento
- **ESLint 9** - Linter JavaScript/TypeScript configurado com plugin TanStack Query 5.91.2
- **Jest 30.2.0** - Framework de testes com coverage via V8
- **Testing Library** - Suite completa de testes (@testing-library/react 16.3.0, @testing-library/jest-dom 6.9.1, @testing-library/user-event 14.6.1)
- **jest-environment-jsdom 30.2.0** - Ambiente JSDOM para testes de componentes React
- **ts-node 10.9.2** - Executor TypeScript para Node.js

## Arquitetura do Projeto

### Estrutura de Diretórios

```
.
├── app/                          # App Router do Next.js
│   ├── (main)/                   # Route group principal
│   │   ├── page.tsx              # Home page com SSR + Suspense
│   │   ├── layout.tsx            # Layout compartilhado
│   │   ├── search/[id]/          # Rota dinâmica de busca
│   │   └── product/[id]/details/ # Rota dinâmica de detalhes do produto
│   ├── layout.tsx                # Root layout com providers
│   └── globals.css               # Estilos globais Tailwind
├── modules/                      # Feature-based modules (Domain-Driven Design)
│   └── products/
│       ├── http/                 # Camada de comunicação HTTP
│       │   ├── products/         # Endpoints (list, get, create, update, delete)
│       │   └── hooks/            # React Query hooks (useProductsList, useGetProductById, etc.)
│       ├── ui/                   # Camada de apresentação
│       │   ├── components/       # Componentes feature-specific
│       │   ├── containers/       # Container components
│       │   ├── forms/            # Formulários com TanStack Form + Zod
│       │   ├── loading/          # Skeletons e loading states
│       │   ├── states/           # Empty states e estados especiais
│       │   ├── error/            # Error boundaries e error components
│       │   └── layouts/          # Layouts do módulo
│       ├── context/              # React Context API (ProductToolbarContext)
│       ├── schemas/              # Zod schemas para validação
│       ├── types/                # TypeScript type definitions
│       └── common/               # Utilitários comuns (ProductsFetchError)
├── components/                   # Componentes compartilhados
│   └── ui/                       # UI components baseados em Radix UI
├── providers/                    # React providers (QueryClientProvider, Toaster)
├── hooks/                        # Custom React hooks globais
├── helpers/                      # Funções utilitárias puras
├── function/                     # Funções de configuração (getQueryClient)
├── lib/                          # Configurações de bibliotecas externas
├── constants/                    # Constantes globais (API_BASE_URL)
└── __tests__/                    # Testes unitários e de integração
    ├── mocks/                    # Mock data para testes
    └── utils/                    # Utilitários de teste

```

### Padrões Arquiteturais Implementados

#### 1. Server-Side Rendering (SSR) + Hydration
- Prefetch de dados no servidor via `getQueryClient().prefetchQuery()`
- Hidratação do estado TanStack Query com `HydrationBoundary`
- Primeira renderização contém dados (melhor SEO e performance)

#### 2. Suspense-Based Data Fetching
- Uso de `useSuspenseQuery` para suspender componentes durante loading
- Fallbacks declarativos com `<Suspense fallback={<Skeleton />}>`
- Erros propagados para Error Boundaries

#### 3. Error Handling em Camadas
- **HTTP Layer**: Classe `ProductsFetchError` customizada para erros HTTP
- **Validation Layer**: Tratamento de `ZodError` com formatação de erros
- **Network Layer**: Detecção de erros de conexão (`TypeError.fetch`)
- **UI Layer**: `ErrorBoundary` components para captura declarativa

#### 4. Type-Safety em Runtime
- Validação Zod em todos os endpoints (`productItemSchema`, `productsListSchema`)
- Type inference automática dos schemas para TypeScript
- Validação de dados da API antes de consumo nos componentes

#### 5. Feature-Based Modules
- Organização por domínio (products, etc.) ao invés de camadas técnicas
- Cada módulo é autocontido com http, ui, schemas, types
- Facilita escalabilidade e manutenção

## Pré-requisitos

- **Node.js**: >= 20.x (recomendado LTS)
- **Package Manager**: pnpm (recomendado), npm, yarn ou bun
- **Sistema Operacional**: Linux, macOS ou Windows com WSL2

## Instalação e Configuração

### 1. Clone o Repositório

```bash
git clone <repository-url>
cd dev-frontend-nextjs
```

### 2. Instalação de Dependências

#### Usando pnpm (recomendado)
```bash
pnpm install
```

#### Usando npm
```bash
npm install
```

#### Usando yarn
```bash
yarn install
```

#### Usando bun
```bash
bun install
```

### 3. Configuração do TypeScript

O projeto utiliza as seguintes configurações TypeScript:

- **Target**: ES2017
- **Module**: ESNext com bundler resolution
- **JSX**: react-jsx (React 19 automatic JSX transform)
- **Strict Mode**: Habilitado
- **Path Aliases**: `@/*` mapeia para raiz do projeto

Arquivo `tsconfig.json`:
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

### 4. Configuração da API

A aplicação consome a **FakeStore API** configurada em `constants/index.ts`:

```typescript
export const API_BASE_URL = 'https://fakestoreapi.com'
```

Não requer variáveis de ambiente ou autenticação. A API é pública e gratuita.

### 5. Configuração do Next.js

Arquivo `next.config.ts`:
```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        pathname: '/img/**',
      },
    ],
  },
}
```

Configuração permite otimização de imagens da FakeStore API via `next/image`.

## Scripts Disponíveis

### Desenvolvimento

```bash
pnpm dev
```

Inicia servidor de desenvolvimento Next.js em `http://localhost:3000`:
- Hot Module Replacement (HMR) habilitado
- Fast Refresh para atualizações instantâneas
- TypeScript type checking em tempo real

### Build de Produção

```bash
pnpm build
```

Gera build otimizado para produção:
- Minificação de JavaScript/CSS
- Tree-shaking de código não utilizado
- Otimização de imagens
- Code splitting automático
- Output em `.next/`

### Servidor de Produção

```bash
pnpm start
```

Inicia servidor de produção (requer build prévio):
- Servidor otimizado Next.js
- Server-Side Rendering (SSR) habilitado
- Servindo arquivos estáticos de `.next/`

### Linting

```bash
pnpm lint
```

Executa ESLint em todo o projeto:
- Configuração Next.js ESLint
- Plugin TanStack Query para best practices
- Verificação de regras de acessibilidade

### Testes Unitários

```bash
# Execução única
pnpm test

# Watch mode (re-executa em mudanças)
pnpm test:watch

# Coverage report
pnpm test:coverage
```

Configuração Jest (`jest.config.ts`):
- **Environment**: jsdom (simulação de browser)
- **Coverage Provider**: V8 (mais rápido que Istanbul)
- **Setup**: `jest.setup.ts` com @testing-library/jest-dom
- **Module Mapper**: Resolve alias `@/*`
- **Test Match**: `**/__tests__/**/*.{test,spec}.{ts,tsx}` e `**/*.{test,spec}.{ts,tsx}`

Coverage configurado para:
- `modules/**/*.{ts,tsx}`
- `components/**/*.{ts,tsx}`
- Exclui: node_modules, .next, coverage, dist, arquivos .d.ts

## Fluxo de Dados e Renderização

### 1. Server-Side Rendering (SSR)

**Arquivo**: `app/(main)/page.tsx`

```typescript
export default async function Home() {
  const queryClient = getQueryClient()

  // Prefetch no servidor (SSR)
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

**Fluxo**:
1. `getQueryClient()` cria instância QueryClient no servidor
2. `prefetchQuery()` busca produtos via `fetchGetAllProducts()`
3. Dados são serializados e enviados ao cliente via `dehydrate()`
4. `HydrationBoundary` hidrata estado no cliente
5. `ProductCatalog` consome dados do cache (não suspende)
6. Fallback `ProductCatalogSkeleton` mostrado apenas se cache vazio

### 2. Client-Side Data Fetching

**Arquivo**: `modules/products/http/hooks/use-products.ts`

```typescript
export function useProductsList(searchQuery?: string) {
  return useSuspenseQuery({
    queryKey: searchQuery ? ['products', searchQuery] : ['products'],
    queryFn: () => fetchGetAllProducts(searchQuery),
  })
}
```

**Características**:
- **Suspense**: Componente suspende durante fetch inicial
- **Cache**: Dados armazenados por `queryKey` (invalida automaticamente)
- **Stale-While-Revalidate**: Mostra dados em cache enquanto revalida em background
- **Automatic Retry**: Retry automático em falhas de rede
- **Error Propagation**: Erros propagados para Error Boundary

### 3. Mutations (Create, Update, Delete)

**Arquivo**: `modules/products/http/hooks/use-products.ts`

```typescript
export function useCreateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: fetchCreateProduct,
    onSuccess: () => {
      // Invalida cache para refetch automático
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}
```

**Características**:
- **Optimistic Updates**: Atualização otimista da UI antes da resposta
- **Cache Invalidation**: Invalida queries relacionadas após sucesso
- **Error Handling**: Estados de loading/error gerenciados automaticamente
- **Rollback**: Rollback automático em caso de falha

## Validação e Type-Safety

### Schema Validation com Zod

**Arquivo**: `modules/products/schemas/products.ts`

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

**Validação em Runtime**:

```typescript
function validateProductsDataList(data: unknown): Product[] {
  try {
    return productsListSchema.parse(data)
  } catch (validationError) {
    handleValidationError(validationError)
  }
}
```

**Type Inference**:
```typescript
type Product = z.infer<typeof productItemSchema>
```

Zod infere automaticamente tipos TypeScript dos schemas, garantindo:
- Type-safety em compile time
- Validação em runtime
- Mensagens de erro detalhadas

## Error Handling

### Classe de Erro Customizada

**Arquivo**: `modules/products/common/products-fetch-error.ts`

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

### Tratamento em Camadas

1. **HTTP Errors (4xx, 5xx)**:
```typescript
function handleHttpError(response: Response): never {
  const errorMessage = `Erro ao buscar produtos: ${response.status} ${response.statusText}`
  throw new ProductsFetchError(errorMessage, response.status)
}
```

2. **Validation Errors**:
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

3. **Network Errors**:
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

## Testes

### Configuração

- **Framework**: Jest 30.2.0
- **Environment**: jsdom (JSDOM para simulação de DOM)
- **Coverage**: V8 provider
- **Testing Library**: React Testing Library 16.3.0
- **Matchers**: @testing-library/jest-dom para assertions customizadas

### Estrutura de Testes

```
__tests__/
├── mocks/               # Mock data (produtos, categorias, etc.)
└── utils/               # Test utilities

modules/products/
├── ui/
│   ├── components/
│   │   ├── category-filter/
│   │   │   └── __tests__/
│   │   │       └── category-filter.test.tsx
│   │   └── product-search/
│   │       └── __tests__/
│   │           └── product-search.test.tsx
│   └── states/
│       └── __tests__/
│           └── empty-state.test.tsx
└── ui/forms/
    └── product-form.test.tsx
```

### Exemplo de Teste

```typescript
import { render, screen } from '@testing-library/react'
import { ProductListItem } from './product-list-item'

describe('ProductListItem', () => {
  it('should render product information correctly', () => {
    const product = {
      id: 1,
      title: 'Test Product',
      price: 99.99,
      image: 'https://example.com/image.jpg',
      category: 'electronics',
    }

    render(<ProductListItem product={product} />)

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('$99.99')).toBeInTheDocument()
  })
})
```

### Executar Testes

```bash
# Todos os testes
pnpm test

# Watch mode (útil durante desenvolvimento)
pnpm test:watch

# Coverage report (gera relatório em coverage/)
pnpm test:coverage
```

## Performance e Otimizações

### 1. Server-Side Rendering (SSR)
- Dados renderizados no servidor (First Contentful Paint mais rápido)
- Hidratação de estado TanStack Query (zero latência no cliente)
- SEO otimizado (crawlers veem conteúdo completo)

### 2. Code Splitting Automático
- Next.js divide código automaticamente por rota
- Lazy loading de componentes com `dynamic()`
- Vendor chunks separados para cache eficiente

### 3. Image Optimization
- `next/image` com lazy loading automático
- Redimensionamento responsivo
- Formatos modernos (WebP, AVIF)
- Placeholder blur durante carregamento

### 4. TanStack Query Cache
- Cache persistente em memória
- Stale-while-revalidate strategy
- Background refetching
- Deduplicação automática de requests

### 5. React 19 Optimizations
- Automatic batching de state updates
- Concurrent rendering
- Suspense nativo para data fetching
- Server Components (quando aplicável)

## Deploy

### Vercel (Recomendado)

1. Conecte repositório ao Vercel
2. Configure build command: `pnpm build`
3. Configure output directory: `.next`
4. Deploy automático em push para `main`

### Docker

```dockerfile
FROM node:20-alpine AS base

# Instalar dependências
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm install -g pnpm && pnpm build

# Production
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

### Variáveis de Ambiente

Não requer variáveis de ambiente para funcionamento básico. API pública configurada em `constants/index.ts`.

Para ambientes customizados, crie `.env.local`:

```env
# Opcional: URL customizada da API
NEXT_PUBLIC_API_BASE_URL=https://api.example.com

# Opcional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Troubleshooting

### Erro: "Cannot find module '@/...'"

**Solução**: Verifique alias `@/*` em `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Erro: "Hydration mismatch"

**Causa**: Diferença entre HTML renderizado no servidor e cliente

**Solução**:
- Evite usar `Math.random()`, `Date.now()` em SSR
- Use `useEffect` para código client-only
- Verifique componentes `'use client'` quando necessário

### Testes Falhando

**Solução**: Limpe cache do Jest:
```bash
pnpm jest --clearCache
pnpm test
```

### Build Falha

**Solução**: Limpe cache Next.js:
```bash
rm -rf .next
pnpm build
```

## Recursos e Referências

### Documentação Oficial
- [Next.js Documentation](https://nextjs.org/docs)
- [React 19 Documentation](https://react.dev)
- [TanStack Query](https://tanstack.com/query/latest)
- [Zod Documentation](https://zod.dev)
- [Radix UI](https://www.radix-ui.com)
- [Tailwind CSS](https://tailwindcss.com)

### API Externa
- [FakeStore API Documentation](https://fakestoreapi.com/docs)

## Licença

Projeto de demonstração educacional.
