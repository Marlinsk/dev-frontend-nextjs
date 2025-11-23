# ECO - Sistema de Gestão de E-commerce

Sistema de gestão para e-commerce desenvolvido com Next.js 16, React 19 e TanStack Query, permitindo o gerenciamento completo de produtos (CRUD) com integração à FakeStore API.

## Stack Tecnológico

| Categoria | Tecnologias |
|-----------|-------------|
| **Core** | Next.js 16, React 19, TypeScript 5 |
| **State/Data** | TanStack Query 5, TanStack React Form, Zod 4 |
| **UI** | Tailwind CSS 4, Radix UI, Lucide React, Sonner |
| **Testes** | Jest 30, Testing Library |

## Pré-requisitos

- **Node.js** >= 20.x
- **pnpm** - Gerenciador de pacotes ([Instalação](https://pnpm.io/installation))

```bash
# Instalar pnpm globalmente
npm install -g pnpm
```

## Instalação

```bash
# Clone e instale
git clone <repository-url>
cd dev-frontend-nextjs
pnpm install

# Desenvolvimento
pnpm dev

# Build e produção
pnpm build
pnpm start

# Testes
pnpm test
pnpm test:coverage
```

## Funcionalidades

- **CRUD de Produtos**: Listagem, detalhes, criação, edição e deleção
- **Busca e Filtros**: Por termo e categoria
- **SSR + Hydration**: Prefetch no servidor com TanStack Query
- **Validação**: Runtime com Zod, forms com TanStack Form
- **UI States**: Skeletons, empty states, error boundaries

## Arquitetura

- **SSR + Hydration**: `prefetchQuery()` + `HydrationBoundary`
- **Suspense Data Fetching**: `useSuspenseQuery` com fallbacks
- **Feature Modules**: Organização por domínio
- **Error Handling**: Camadas HTTP, validação e network
- **Type Safety**: Zod schemas com inferência TypeScript

## API

Consome a **FakeStore API** (`https://fakestoreapi.com`):
- `GET /products` - Lista produtos
- `GET /products/:id` - Detalhes
- `POST /products` - Criar
- `PUT /products/:id` - Atualizar
- `DELETE /products/:id` - Deletar

> **Nota**: API fake - dados não persistem de verdade.

## Deploy

### Vercel
1. Conecte o repositório
2. Build: `pnpm build`
3. Output: `.next`

### Docker
```bash
docker build -t eco-app .
docker run -p 3000:3000 eco-app
```

## Referências

- [Next.js](https://nextjs.org/docs) | [React](https://react.dev) | [TanStack Query](https://tanstack.com/query)
- [Zod](https://zod.dev) | [Radix UI](https://www.radix-ui.com) | [Tailwind CSS](https://tailwindcss.com)
- [FakeStore API](https://fakestoreapi.com/docs)
