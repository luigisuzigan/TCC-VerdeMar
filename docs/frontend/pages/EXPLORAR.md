# Página de Explorar Imóveis

Esta página permite aos usuários navegar e filtrar imóveis disponíveis para venda.

## 🎨 Design

- **Layout**: Sidebar com filtros + Grid de 3 imóveis por linha (desktop)
- **Responsivo**: 
  - Desktop (XL): 3 colunas
  - Tablet (MD): 2 colunas  
  - Mobile: 1 coluna + Filtros em modal flutuante
- **Estilo**: Inspirado no design da imagem de referência com filtros laterais

## 🔍 Filtros Disponíveis

### Sidebar (Desktop)
- **Location**: Campo de busca + localidades populares
- **Price Range**: Opções predefinidas + range customizado
- **Land Area**: Área mínima e máxima (sq ft)
- **Type of Place**: Checkboxes para tipos de imóveis
- **Amenities**: Comodidades do imóvel

### Mobile
- Botão flutuante no canto inferior direito
- Modal desliza de baixo para cima
- Mesmos filtros da sidebar
- Badge com contagem de filtros ativos

## 📊 Funcionalidades

### Gestão de Filtros
```javascript
// Atualizar um filtro
updateFilter('location', 'Jakarta, Indonesia');

// Limpar um filtro específico
clearFilter('location');

// Limpar todos os filtros
clearAllFilters();
```

### Persistência na URL
Todos os filtros são sincronizados com a URL usando query parameters:
```
/explorar?location=Jakarta&priceMin=1000&priceMax=15000&types=casa,apartamento
```

### Helpers Disponíveis
- `parseFiltersFromUrl()` - Converte URL params em objeto de filtros
- `filtersToUrlParams()` - Converte filtros em URL params
- `getFilterDescriptions()` - Gera descrições legíveis dos filtros
- `countActiveFilters()` - Conta filtros ativos

## 🎴 Card de Imóvel

Cada card exibe:
- **Imagem**: Com hover scale effect
- **Badge**: Tipo do imóvel (topo esquerdo)
- **Bookmark**: Botão de salvar (topo direito)
- **Título**: Nome do imóvel
- **Localização**: Com ícone de pin
- **Preço**: Formatado em destaque
- **Avaliação**: Estrelas e nota numérica

## 🔗 Integração com Backend

### Endpoint Atual
```javascript
GET /properties?published=true&limit=24
```

### Próximos Passos
Conectar os filtros com a API:

```javascript
// Exemplo de query com filtros
const buildQuery = (filters) => {
  const params = new URLSearchParams();
  params.set('published', 'true');
  params.set('limit', '24');
  
  if (filters.location) params.set('city', filters.location);
  if (filters.priceMin) params.set('minPrice', filters.priceMin);
  if (filters.priceMax) params.set('maxPrice', filters.priceMax);
  if (filters.areaMin) params.set('minArea', filters.areaMin);
  if (filters.areaMax) params.set('maxArea', filters.areaMax);
  if (filters.propertyTypes?.length) {
    params.set('types', filters.propertyTypes.join(','));
  }
  
  return params.toString();
};

// Na API call
const { data } = await api.get(`/properties?${buildQuery(filters)}`);
```

## 📱 Responsividade

### Breakpoints
- `lg` (1024px+): Mostra sidebar de filtros
- `xl` (1280px+): Grid de 3 colunas
- `md` (768px+): Grid de 2 colunas
- Mobile: Grid de 1 coluna + botão flutuante

### Otimizações Mobile
- Filtros em modal bottom sheet
- Botão com badge de contagem
- Scrolling otimizado
- Touch-friendly targets (min 44px)

## 🎯 Melhorias Futuras

1. **Ordenação**
   - Adicionar dropdown para ordenar por:
     - Preço (crescente/decrescente)
     - Área (maior/menor)
     - Mais recentes
     - Mais populares

2. **Paginação**
   - Infinite scroll
   - Load more button
   - Skeleton loaders durante carregamento

3. **Visualização**
   - Toggle entre grid e lista
   - Mapa com markers dos imóveis
   - Salvar busca

4. **Filtros Avançados**
   - Quartos/banheiros
   - Ano de construção
   - Estado de conservação
   - Distância de pontos de interesse

5. **SEO**
   - Meta tags dinâmicas baseadas nos filtros
   - URLs amigáveis
   - Schema markup para imóveis

## 🐛 Debugging

### Verificar Filtros Atuais
```javascript
console.log('Filtros ativos:', filters);
console.log('Query params:', searchParams.toString());
console.log('Total de filtros:', countActiveFilters(filters));
```

### Testar Filtragem
```javascript
// No console do navegador
updateFilter('location', 'Jakarta, Indonesia');
updateFilter('priceMin', 1000);
updateFilter('priceMax', 15000);
```

## 📦 Dependências

- `react-router-dom` - Navegação e query params
- `lucide-react` - Ícones
- `@headlessui/react` - Modal acessível (mobile)
- TailwindCSS - Estilização

## 🎨 Customização

### Cores
As cores principais podem ser ajustadas no TailwindCSS:
- Primary: `emerald-600`
- Hover: `emerald-700`
- Border: `slate-200`
- Text: `slate-900`, `slate-600`

### Layout
Ajustar largura máxima do container:
```javascript
<main className="mx-auto max-w-[1600px]"> // Alterar aqui
```

Ajustar colunas do grid:
```javascript
className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3" // Alterar aqui
```
