# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.0.1] - 2025-11-22

### Resumo

Melhorias visuais e refatorações para experiência CRM. Adição de logo, footer e reformulação do ProductDetails.

### Adicionado

- Logo no cabeçalho (`compass-rose-svgrepo-com.svg`)
- Footer no layout principal
- Componente `AddProduct` para adicionar produtos
- Componente `ProductDetailsHeader` para página de detalhes
- Componente `SalesSummary` para resumo de vendas
- Componente `RatingStars` reutilizável
- Utilitário `get-product-mock-data.ts` para dados de estoque e vendas
- Quantidade de vendas e estoque nos cards de produtos

### Modificado

- **ProductDetails**: Layout reformulado para visual CRM/Dashboard
- **StockIndicator**: Expandido com mais informações
- **ProductPricing**: Layout melhorado
- **Header**: Navegação e visual aprimorados
- **ProductToolbar**: Refatoração completa do ecossistema
- **Skeletons**: Visual atualizado (Catalog, Details, Toolbar)
- **ProductForm**: Lógica de success atualizada

### Removido

- Componentes: `AdditionalInfo`, `CategorySpecificContent`, `DiscountBadge`, `FAQItem`, `FAQSection`, `ProductActions`, `ProductFeatures`
- Arquivo `INSTRUCTIONS.md`
- Font Commissioner

### Corrigido

- Correção de propriedade esperada em componente
- Problemas de renderização resolvidos
- Div desnecessária removida

---

## [1.0.0] - 2025-11-21

### Resumo

Release inicial da plataforma ECO. CRUD completo de produtos com Next.js 16, React 19, TanStack Query 5 e Tailwind CSS 4.

### Stack Tecnológico

- **Next.js 16.0.3** com App Router
- **React 19.2.0** com Server Components e Suspense
- **TypeScript 5** com strict mode
- **TanStack Query 5.90.10** para server-state
- **TanStack React Form 1.25.0** para formulários
- **Tailwind CSS 4** com PostCSS 4
- **Radix UI** (Dialog, Select, AlertDialog, DropdownMenu, Popover)
- **Zod 4.1.12** para validação
- **Jest 30.2.0** com Testing Library

### Funcionalidades

#### CRUD de Produtos
- **Listagem**: SSR com prefetch, grid responsivo, Suspense
- **Detalhes**: Imagem, preço, rating, estoque, descrição, reviews
- **Criação**: Modal com formulário validado (TanStack Form + Zod)
- **Edição**: Reutiliza formulário com dados pré-preenchidos
- **Deleção**: AlertDialog de confirmação

#### Busca e Filtros
- Busca por termo (título, categoria, descrição) com debounce
- Filtro por categoria via Select
- ProductToolbar integrando busca, filtro e botão add

#### Estados de UI
- Skeleton screens (Catalog, Details, Toolbar)
- Empty states contextuais
- Error boundaries com fallback

### Arquitetura

- **SSR + Hydration**: Prefetch no servidor com HydrationBoundary
- **Suspense-Based Data Fetching**: useSuspenseQuery
- **Feature-Based Modules**: Organização por domínio (`modules/products/`)
- **Cache Management**: TanStack Query com invalidação inteligente
- **Route Groups**: Layouts compartilhados com `(main)/`

### Error Handling

- Classe `ProductsFetchError` customizada
- Tratamento HTTP (4xx, 5xx)
- Validação Zod com mensagens formatadas
- Network errors
- Error boundaries na UI

### Testes

- Jest + Testing Library
- Testes de componentes: CategoryFilter, ProductSearch, ProductListItem, EmptyState, ProductForm
- Coverage target: 80%+ em modules

### Otimizações

- `next/image` com lazy loading e WebP/AVIF
- Code splitting automático
- React 19 Concurrent Rendering
- TanStack Query: stale-while-revalidate, background refetch, deduplication

### UI/UX

- Radix UI components
- Responsividade (mobile/tablet/desktop)
- WCAG AA compliance
- Hover, focus, active, disabled states
- Toast notifications com Sonner

### API

- **FakeStore API** (`https://fakestoreapi.com`)
- Endpoints: GET/POST/PUT/DELETE `/products`
- Limitação: dados não persistem de verdade
