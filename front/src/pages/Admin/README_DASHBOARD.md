# Admin Dashboard - Visão Geral Completa

## Descrição
Dashboard administrativo completo e detalhado com métricas reais da plataforma VerdeMar. Apresenta estatísticas abrangentes, gráficos de distribuição, atividades recentes e ações rápidas.

## Estrutura do Dashboard

### 📊 Seção 1: Cards Principais (Métricas Primárias)
Quatro cards grandes com as métricas mais importantes:

1. **Receita Total**
   - Valor total de todos os imóveis cadastrados
   - Ícone: Cifrão ($)
   - Cor: Verde (emerald)
   - Link: `/admin/properties`
   - Exibe: Valor formatado em BRL
   - Tendência: % de crescimento

2. **Imóveis Ativos**
   - Quantidade de imóveis publicados
   - Ícone: Building2
   - Cor: Azul (blue)
   - Link: `/admin/properties`
   - Exibe: Número de propriedades publicadas
   - Subtítulo: Novos imóveis este mês + total geral

3. **Total de Usuários**
   - Quantidade de usuários cadastrados
   - Ícone: Users
   - Cor: Violeta (violet)
   - Link: `/admin/users`
   - Exibe: Total de usuários
   - Subtítulo: Novos usuários este mês + usuários ativos

4. **Visualizações**
   - Total de views em imóveis
   - Ícone: Eye
   - Cor: Âmbar (amber)
   - Exibe: Número total de visualizações
   - Subtítulo: Período (últimos 30 dias)

**Características:**
- Cards clicáveis com hover effect (elevação + sombra)
- Badge de tendência com seta (↑↗ ou ↓↘)
- Ícones em círculos coloridos
- Valores grandes e destacados
- Descrição secundária

### 📈 Seção 2: Cards Secundários (Métricas Complementares)
Grade 2x2 com métricas adicionais:

1. **Imóveis Vendidos**
   - Quantidade de propriedades vendidas
   - Taxa de conversão (%)
   - Ícone: CheckCircle
   - Cor: Verde

2. **Favoritos**
   - Total de imóveis favoritados
   - Média por imóvel
   - Ícone: Heart
   - Cor: Rosa

3. **Avaliações**
   - Total de reviews
   - Média de estrelas
   - Ícone: Star
   - Cor: Amarelo

4. **Em Destaque**
   - Imóveis destacados
   - Quantidade de rascunhos
   - Ícone: TrendingUp
   - Cor: Roxo

### 📊 Seção 3: Gráficos de Distribuição
Duas colunas lado a lado:

#### Imóveis por Tipo
- Ícone: PieChart (gráfico de pizza)
- **Barras de progresso coloridas** para cada tipo
- Mostra: Tipo, quantidade, porcentagem
- Tipos comuns: Casa, Apartamento, Terreno, Cobertura, etc.
- Cores alternadas: emerald, blue, violet, amber, rose

#### Imóveis por Estado
- Ícone: MapPin (localização)
- **Lista ranqueada** de estados
- Mostra: Posição, estado, quantidade, porcentagem
- Ordenado por quantidade (maior → menor)
- Scroll vertical para muitos estados
- Números de ranking em círculos

### 🕐 Seção 4: Atividades Recentes
Duas colunas lado a lado:

#### Imóveis Recentes
- Ícone: Clock
- **Lista com miniaturas** dos últimos 5 imóveis
- Mostra:
  - Imagem thumbnail (16x16)
  - Título do imóvel
  - Localização (cidade, estado)
  - Preço em destaque
  - Badge "Publicado" se aplicável
- Link: `/admin/properties/:id`
- Botão "Ver todos" no topo

#### Top Imóveis
- Ícone: TrendingUp
- **Lista dos 5 imóveis mais caros**
- Mostra:
  - Ranking (#1, #2, etc.) em círculo
  - Título
  - Localização
  - Preço (destaque)
  - Tipo do imóvel
- Link: `/admin/properties/:id`
- Botão "Ver todos" no topo

### 👥 Seção 5: Usuários e Estatísticas
Grade 1:2 (sidebar + lista):

#### Estatísticas de Usuários (Sidebar)
Cards coloridos com contadores:
- **Total** - Todos os usuários (cinza)
- **Ativos** - Usuários ativos (verde)
- **Vendedores** - Role SELLER (azul)
- **Admins** - Role ADMIN (roxo)

#### Usuários Recentes (Principal)
- Ícone: Activity
- **Lista dos últimos 5 cadastros**
- Mostra:
  - Avatar com inicial
  - Nome completo
  - Email
  - Badge de role (Admin/Vendedor/Usuário)
  - Indicador de status (bolinha verde se ativo)
- Botão "Ver todos" → `/admin/users`

### ⚡ Seção 6: Ações Rápidas
Banner gradiente (emerald → blue) com botões de ação:

**Botões disponíveis:**
1. **Novo Imóvel** (branco, destaque)
   - Ícone: Building2
   - Link: `/admin/properties/new`

2. **Gerenciar Usuários** (transparente)
   - Ícone: Users
   - Link: `/admin/users`

3. **Configurações** (transparente)
   - Ícone: Settings
   - Link: `/admin/settings`

## Funcionalidades Especiais

### 🔄 Seletor de Período
Três opções no topo direito:
- **7 dias**
- **30 dias** (padrão)
- **90 dias**

Estado: `timeRange` ('7', '30', '90')

*Nota: Implementação futura - atualmente visual only*

### 📊 Dados Reais vs Simulados

#### Dados REAIS (do backend):
✅ Total de propriedades
✅ Propriedades publicadas
✅ Propriedades rascunho
✅ Propriedades em destaque
✅ Receita total (soma dos preços)
✅ Distribuição por tipo
✅ Distribuição por estado
✅ Imóveis recentes (últimos 5)
✅ Top imóveis (por preço)
✅ Total de usuários
✅ Vendedores
✅ Admins
✅ Usuários recentes

#### Dados SIMULADOS (calculados):
🔸 Receita do último mês (15% do total)
🔸 Imóveis vendidos (12% do total)
🔸 Total de visualizações (~143 por imóvel)
🔸 Total de favoritos (~8.5 por imóvel)
🔸 Total de avaliações (~3.2 por imóvel)
🔸 Média de rating (4.3-4.7)
🔸 Usuários ativos (75% do total)
🔸 Novos imóveis este mês (contados ou 15%)
🔸 Novos usuários este mês (8% ou 5)

## Endpoints API Utilizados

```javascript
// Buscar todas as propriedades
GET /api/properties?limit=1000

// Buscar todos os usuários
GET /api/users?limit=1000

// Buscar estatísticas de usuários
GET /api/users/stats
```

## Formatação de Dados

### Moeda (BRL)
```javascript
formatCurrency(value)
// Exemplo: 1500000 → "R$ 1.500.000"
```

### Números
```javascript
formatNumber(value)
// Exemplo: 12543 → "12.543"
```

### Porcentagens
```javascript
percentage.toFixed(1)
// Exemplo: 23.456 → "23.5%"
```

### Datas
```javascript
new Date(dateString)
// Usado para comparações e ordenação
```

## Estados do Componente

```javascript
const [stats, setStats] = useState({
  // Propriedades
  totalProperties: 0,
  publishedProperties: 0,
  draftProperties: 0,
  featuredProperties: 0,
  
  // Financeiro
  totalRevenue: 0,
  lastMonthRevenue: 0,
  propertiesSold: 0,
  
  // Engajamento
  totalViews: 0,
  totalFavorites: 0,
  totalReviews: 0,
  avgRating: 0,
  
  // Usuários
  totalUsers: 0,
  activeUsers: 0,
  sellers: 0,
  admins: 0,
  
  // Períodos
  newPropertiesThisMonth: 0,
  newUsersThisMonth: 0,
  
  // Distribuições
  propertiesByType: {},
  propertiesByState: {},
  
  // Listas
  recentProperties: [],
  recentUsers: [],
  topProperties: []
});

const [loading, setLoading] = useState(true);
const [timeRange, setTimeRange] = useState('30');
```

## Cores e Temas

### Paleta de Cores
- **emerald** - Verde principal (#10b981)
- **blue** - Azul (#3b82f6)
- **violet** - Violeta (#8b5cf6)
- **amber** - Âmbar (#f59e0b)
- **rose** - Rosa (#f43f5e)
- **yellow** - Amarelo (#eab308)
- **purple** - Roxo (#a855f7)

### Aplicação
Cada cor tem 3 variações:
- `bg` - Fundo claro (100)
- `text` - Texto (600)
- `icon` - Fundo escuro (600)

## Responsividade

### Mobile (< 768px)
- Cards empilhados verticalmente
- Grid 1 coluna
- Botões de ação em coluna
- Seletor de período em coluna

### Tablet (768px - 1024px)
- Grid 2 colunas para cards principais
- Grid 2 colunas para distribuições

### Desktop (> 1024px)
- Grid 4 colunas para cards principais
- Grid 2 colunas para todas as seções
- Grid 3 colunas para seção de usuários

## Interatividade

### Hover Effects
- Cards principais: Elevação + sombra + translate-y
- Cards secundários: Sombra aumentada
- Itens de lista: Mudança de fundo
- Botões: Mudança de cor

### Loading States
- Spinner centralizado durante carregamento
- Esconde todo o conteúdo até dados carregarem

### Empty States
- Ícones grandes + mensagem quando sem dados
- Aplicado em:
  - Imóveis recentes
  - Top imóveis
  - Usuários recentes

## Melhorias Futuras

### Implementações Planejadas
- [ ] Gráficos de linha para tendências temporais
- [ ] Filtro real por período (7/30/90 dias)
- [ ] Dashboard em tempo real (WebSocket)
- [ ] Comparação com período anterior
- [ ] Exportar relatórios (PDF/Excel)
- [ ] Métricas de performance (SEO, velocidade)
- [ ] Alertas e notificações
- [ ] Metas e KPIs configuráveis

### Integrações Backend
- [ ] Endpoint `/api/dashboard/stats`
- [ ] Endpoint `/api/dashboard/analytics`
- [ ] Cálculo real de views, favoritos, reviews
- [ ] Histórico de métricas no banco
- [ ] Cache de estatísticas pesadas

### Visualizações Avançadas
- [ ] Biblioteca de charts (Chart.js/Recharts)
- [ ] Gráfico de linha para receita mensal
- [ ] Gráfico de área para crescimento de usuários
- [ ] Mapa geográfico interativo
- [ ] Funil de conversão

## Performance

### Otimizações Atuais
- Limite de 1000 itens nas requisições
- Slice nos arrays para limitar exibição
- Try/catch para endpoints opcionais
- Loading state para feedback visual

### Otimizações Futuras
- Pagination nas listas
- Lazy loading de seções
- Debounce no seletor de período
- Cache de estatísticas (localStorage/sessionStorage)
- Skeleton screens durante loading

## Navegação
Rota: `/admin`
Proteção: `RequireAdmin` (apenas usuários com role ADMIN)
Layout: `AdminLayout` (com sidebar)

## Ícones Utilizados
Todos do **Lucide React**:
- DollarSign, TrendingUp, Building2, Eye
- ArrowUpRight, ArrowDownRight
- Users, MapPin, Heart, Star
- Activity, Clock, CheckCircle
- PieChart, Home, Briefcase, Settings, Shield
