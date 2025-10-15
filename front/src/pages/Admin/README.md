# Dashboard Admin - VerdeMar

## ✨ O que foi criado

### 1. **AdminLayout** (`front/src/layouts/AdminLayout.jsx`)
Layout com sidebar lateral para o painel administrativo:

- **Sidebar Desktop**: Barra lateral fixa com 80px de largura
  - Logo VerdeMar no topo
  - Menu com ícones: Dashboard, Imóveis, Usuários, Configurações
  - Botão de Logout na parte inferior
  - Indicador visual de página ativa (verde)

- **Sidebar Mobile**: Menu hambúrguer responsivo
  - Abre overlay com menu completo
  - Mesmas opções do desktop em formato expandido

- **Top Bar**: Barra superior com:
  - Botão menu (mobile)
  - Avatar do administrador
  - Nome e descrição

### 2. **Dashboard Home** (`front/src/pages/Admin/Dashboard.jsx`)
Página inicial do admin com estatísticas:

- **4 Cards de Estatísticas**:
  - 💰 Receita Total (valor total dos imóveis)
  - 📈 Receita Último Mês (simulado 15% do total)
  - 🏠 Imóveis Vendidos (simulado 23% do total)
  - 👁️ Total de Visualizações (simulado ~127 por imóvel)

- **Cada card mostra**:
  - Ícone colorido
  - Título e valor
  - Trend indicator (↗️ +X%)
  - Descrição

- **Informações Rápidas**:
  - Imóveis Ativos (publicados vs não publicados)
  - Atividade Recente (últimas ações no sistema)

### 3. **Lista de Imóveis Modernizada** (`front/src/pages/Admin/Properties/List.jsx`)
Grid de cards substituindo a tabela antiga:

- **Filtros**:
  - Busca por título/cidade
  - Filtro por status (todos/publicados/não publicados)

- **Grid de Cards** (3 colunas no desktop):
  - Imagem do imóvel
  - Badge de status (publicado/não publicado)
  - Título, localização e preço
  - Botões de ação: Publicar/Ocultar, Editar, Excluir

- **Paginação**: 12 itens por página

### 4. **Rotas Atualizadas** (`front/src/routes/AppRoutes.jsx`)
- Admin agora usa layout separado com sidebar
- Rota `/admin` → Dashboard Home
- Rota `/admin/properties` → Lista de Imóveis
- Rota `/admin/properties/new` → Novo Imóvel
- Rota `/admin/properties/:id` → Editar Imóvel

## 🎨 Design System

### Cores
- **Primária**: Emerald/Verde (`emerald-600`, `emerald-700`)
- **Secundárias**: Blue, Violet, Amber
- **Neutras**: Slate (`slate-50` a `slate-900`)
- **Status**: Green (sucesso), Red (erro), Yellow (aviso)

### Componentes
- **Bordas**: `rounded-xl` (12px), `rounded-2xl` (16px)
- **Espaçamento**: Sistema de 4px (p-3, p-6, gap-4, gap-6)
- **Sombras**: `hover:shadow-lg` nos cards
- **Transições**: `transition-colors`, `transition-shadow`

## 📱 Responsividade

### Breakpoints
- **Mobile**: < 768px - Menu hambúrguer, grid 1 coluna
- **Tablet**: 768px - 1024px - Grid 2 colunas
- **Desktop**: > 1024px - Sidebar fixa, grid 3 colunas

## 🚀 Como usar

1. **Acessar o Admin**:
   - Faça login como ADMIN
   - Navegue para `/admin`

2. **Dashboard**:
   - Veja estatísticas gerais
   - Monitore imóveis ativos
   - Acompanhe atividade recente

3. **Gerenciar Imóveis**:
   - Clique em "Imóveis" na sidebar
   - Use filtros para encontrar imóveis
   - Publique/despublique com 1 clique
   - Edite ou exclua conforme necessário

## 🔧 Próximos Passos (você pode fazer depois)

- [ ] Página de Usuários (`/admin/users`)
- [ ] Página de Configurações (`/admin/settings`)
- [ ] Gráficos no Dashboard (Chart.js ou Recharts)
- [ ] Notificações em tempo real
- [ ] Upload de múltiplas imagens
- [ ] Editor de texto rico para descrições
- [ ] Backup/Exportar dados

## 📦 Dependências Usadas

- `lucide-react` - Ícones (Home, Building2, Users, etc.)
- `react-router-dom` - Navegação e links
- `axios` (via api/client) - Requisições HTTP

---

**Criado em**: $(date)
**Status**: ✅ Funcionando - Pronto para uso!
