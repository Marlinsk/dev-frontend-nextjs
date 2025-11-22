# 📖 Manual de Utilização da Aplicação

## Visão Geral

A aplicação ECO é um e-commerce de demonstração que permite visualizar, criar, editar e deletar produtos. A interface foi construída com foco em usabilidade e responsividade.

## Navegação Principal

### 1. Página Inicial (Home)

Ao acessar `http://localhost:3000`, você verá:

- **Grid de Produtos**: Exibição em cards responsivos com todos os produtos
- **Barra de Ferramentas (Toolbar)**: Localizada no topo da lista de produtos

#### Funcionalidades da Toolbar

**Busca de Produtos**
- Campo de busca com ícone de lupa
- Busca em tempo real por título, descrição ou categoria
- Resultados filtrados aparecem instantaneamente
- Limpe o campo para voltar à lista completa

**Filtro por Categoria**
- Dropdown "All Categories" ao lado da busca
- Selecione uma categoria para filtrar produtos
- Opção "All Categories" mostra todos os produtos novamente

**Adicionar Produto**
- Botão "Add Product" no canto direito da toolbar
- Abre um modal com formulário de criação

### 2. Visualizar Detalhes do Produto

**Como Acessar:**
- Clique em qualquer card de produto na home
- Será redirecionado para `/product/[id]/details`

**Informações Exibidas:**
- Imagem do produto (otimizada e responsiva)
- Título e categoria
- Preço atual e desconto (quando aplicável)
- Avaliação com estrelas e número de reviews
- Status de estoque (In Stock / Out of Stock)
- Descrição completa
- Características específicas da categoria
- Seção de avaliações de clientes
- FAQ relacionado ao produto

**Ações Disponíveis:**
- Botão "Voltar" (seta) no topo da página
- Menu de opções (três pontos) com:
  - **Edit**: Editar produto
  - **Delete**: Remover produto

### 3. Criar Novo Produto

**Como Acessar:**
- Clique no botão "Add Product" na toolbar da home

**Formulário:**
- **Title**: Campo obrigatório (mínimo 3 caracteres)
- **Price**: Campo numérico obrigatório (valor positivo)
- **Description**: Textarea obrigatória (mínimo 10 caracteres)
- **Category**: Dropdown com categorias disponíveis
- **Image URL**: URL válida da imagem do produto

**Validações:**
- Todos os campos são validados em tempo real
- Mensagens de erro aparecem abaixo de cada campo inválido
- Botão "Create" desabilitado até formulário válido

**Após Criação:**
- Toast de sucesso aparece no canto superior direito
- Modal fecha automaticamente
- Lista de produtos é atualizada (cache invalidado)
- Novo produto aparece na listagem

### 4. Editar Produto Existente

**Como Acessar:**
- **Opção 1**: Menu de três pontos no card do produto → "Edit"
- **Opção 2**: Página de detalhes → Menu de três pontos → "Edit"

**Formulário:**
- Campos pré-preenchidos com dados atuais
- Mesmas validações da criação
- Botão "Update" em vez de "Create"

**Após Edição:**
- Toast de sucesso
- Modal fecha
- Dados atualizados em cache (lista e detalhes)
- Mudanças refletidas imediatamente na UI

### 5. Deletar Produto

**Como Acessar:**
- Menu de três pontos → "Delete"

**Confirmação:**
- Dialog de confirmação aparece
- **Título**: "Are you sure?"
- **Descrição**: "This action cannot be undone. This will permanently delete the product."
- **Ações**:
  - **Cancel**: Fecha dialog sem deletar
  - **Delete**: Confirma e executa deleção

**Após Deleção:**
- Toast de sucesso
- Produto removido da lista (cache invalidado)
- Se estiver na página de detalhes, é redirecionado para home

### 6. Busca de Produtos

**Como Acessar:**
- Campo de busca na toolbar
- Digite qualquer termo

**Comportamento:**
- Busca server-side (filtro aplicado na API)
- Busca por:
  - Título do produto
  - Categoria
  - Descrição
- Resultados em tempo real (debounce de 300ms)
- URL atualizada com query parameter: `/search/[termo]`
- Histórico de navegação preservado

**Resultados:**
- Lista filtrada de produtos
- Contador de resultados encontrados
- Mensagem "No products found" se não houver resultados
- Sugestão para limpar filtros

## Estados de Interface

### Loading (Carregamento)

**Skeleton Screens:**
- Aparece durante fetch inicial de dados
- Mantém estrutura visual da página
- Smooth transition para conteúdo real

**Locais:**
- Home: Grid de skeletons de cards
- Detalhes: Skeleton de layout de produto
- Toolbar: Skeleton de botões e inputs

### Empty State (Sem Resultados)

**Quando Aparece:**
- Busca sem resultados
- Filtro por categoria vazia
- Lista de produtos vazia

**Elementos:**
- Ícone ilustrativo
- Mensagem descritiva
- Sugestões de ação
- Botão para limpar filtros (quando aplicável)

### Error State (Erro)

**Tipos de Erro:**
1. **Erro de Conexão**: Problemas de rede
2. **Erro HTTP**: Status 4xx ou 5xx
3. **Erro de Validação**: Dados inválidos da API

**UI de Erro:**
- Error Boundary captura erros em componentes
- Mensagem amigável ao usuário
- Botão "Try Again" para retry
- Opção de voltar para home

### Success (Sucesso)

**Toast Notifications:**
- Aparece no canto superior direito
- Auto-dismiss após 3 segundos
- Mensagens:
  - "Product created successfully"
  - "Product updated successfully"
  - "Product deleted successfully"

## Responsividade

### Mobile (< 768px)

- Grid de 1 coluna
- Toolbar empilhada verticalmente
- Busca full-width
- Botões adaptados para toque
- Modal full-screen
- Imagens otimizadas para mobile

### Tablet (768px - 1024px)

- Grid de 2 colunas
- Toolbar horizontal compacta
- Modal centralizado
- Layout adaptativo

### Desktop (> 1024px)

- Grid de 3-4 colunas
- Toolbar completa horizontal
- Modal tamanho médio centralizado
- Hover states em cards
- Transições suaves

## Atalhos de Teclado

- **Esc**: Fecha modais e dialogs
- **Enter**: Confirma ações em formulários (quando válido)
- **Tab**: Navegação entre campos de formulário

## Acessibilidade

- **Navegação por Teclado**: Todos os elementos interativos são acessíveis via Tab
- **Screen Readers**: Labels semânticos em todos os campos
- **Contraste**: Cores seguem WCAG AA
- **Focus Visible**: Indicadores visuais de foco
- **ARIA Labels**: Atributos adequados em componentes

## Feedback Visual

### Interações
- **Hover**: Cards e botões mudam de cor/sombra
- **Focus**: Contorno azul em elementos focados
- **Active**: Estado pressed em botões
- **Disabled**: Opacidade reduzida e cursor not-allowed

### Transições
- Fade in/out em modais
- Slide in em toasts
- Skeleton to content smooth
- Page transitions

## Cache e Performance

### Comportamento do Cache

**TanStack Query:**
- Dados ficam em cache por 5 minutos (stale time)
- Background refetch automático
- Cache compartilhado entre rotas

**Invalidação:**
- Após criar: lista de produtos invalidada
- Após editar: lista + produto específico invalidados
- Após deletar: lista invalidada

### Prefetch

- Home page: Dados prefetchados no servidor (SSR)
- Navegação: Próximas páginas prefetchadas on hover (quando implementado)

## Troubleshooting Comum

### "Produto não atualiza após edição"
- **Causa**: Cache não invalidado
- **Solução**: Refresh da página (F5)

### "Imagem não carrega"
- **Causa**: URL inválida ou CORS
- **Solução**: Verificar URL da imagem e domínio permitido em next.config.ts

### "Formulário não submete"
- **Causa**: Validação falhando
- **Solução**: Verificar mensagens de erro abaixo dos campos

### "Busca não funciona"
- **Causa**: Servidor lento ou termo muito curto
- **Solução**: Aguardar debounce (300ms) e usar mínimo 2 caracteres

## Limitações da API Fake

**Importante saber:**
- Dados **não são persistidos** de verdade
- POST/PUT/DELETE retornam sucesso mas não alteram o banco
- IDs gerados podem conflitar
- Lista sempre retorna mesmos 20 produtos
- Útil apenas para demonstração de interface

## Dicas de Uso

1. **Busca Eficiente**: Use palavras-chave específicas como "shirt", "electronics", "gold"
2. **Filtro Rápido**: Combine busca + filtro de categoria para resultados precisos
3. **Edição Rápida**: Menu de três pontos em cada card para acesso direto
4. **Atalhos**: Use Tab + Enter para criar produtos rapidamente
5. **Mobile**: Toque longo em cards para menu de contexto (se implementado)
