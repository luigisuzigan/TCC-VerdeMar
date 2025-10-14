# Exemplos de Uso - Sistema de Busca

Este documento contém exemplos práticos de como usar o sistema de busca de imóveis.

## 🔍 Cenários de Busca

### 1. Busca Simples por Localização

**Usuário quer:** Imóveis em Florianópolis

**No QuickSearch:**
1. Clica no campo "Local"
2. Digita "Florianópolis"
3. Clica em "Buscar"

**URL gerada:**
```
/explorar?location=Florianópolis
```

**Query para API:**
```
GET /properties?published=true&limit=24&city=Florianópolis
```

---

### 2. Busca por Preço

**Usuário quer:** Casas entre R$ 500.000 e R$ 1.000.000

**No QuickSearch:**
1. Clica em "Tipo do imóvel" → Seleciona "Casa"
2. Clica em "Faixa de preço" → Move os sliders ou seleciona opção rápida
3. Clica em "Buscar"

**URL gerada:**
```
/explorar?types=casa&priceMin=500000&priceMax=1000000
```

**Query para API:**
```
GET /properties?published=true&limit=24&types=casa&minPrice=500000&maxPrice=1000000
```

---

### 3. Busca com Área Específica

**Usuário quer:** Apartamentos com 80-150 m²

**No QuickSearch:**
1. Clica em "Tipo do imóvel" → Seleciona "Apartamento"
2. Clica em "Tamanho (m²)" → Define 80-150
3. Clica em "Buscar"

**URL gerada:**
```
/explorar?types=apartamento&areaMin=80&areaMax=150
```

**Query para API:**
```
GET /properties?published=true&limit=24&types=apartamento&minArea=80&maxArea=150
```

---

### 4. Busca com Filtros Avançados

**Usuário quer:** Casas com 3+ quartos, 2+ banheiros, piscina e churrasqueira

**No QuickSearch:**
1. Clica em "Tipo do imóvel" → Seleciona "Casa"
2. Clica em "Mais filtros"
3. Seleciona "3+" em Quartos
4. Seleciona "2+" em Banheiros
5. Marca "Piscina" e "Churrasqueira" nas comodidades
6. Clica em "Aplicar Filtros"
7. Clica em "Buscar"

**URL gerada:**
```
/explorar?types=casa&bedrooms=3&bathrooms=2&amenities=piscina,churrasqueira
```

**Query para API:**
```
GET /properties?published=true&limit=24&types=casa&minBedrooms=3&minBathrooms=2&amenities=piscina,churrasqueira
```

---

### 5. Busca Completa (Todos os Filtros)

**Usuário quer:** 
- Apartamento ou Casa
- Em Florianópolis
- R$ 800.000 - R$ 1.500.000
- 100-200 m²
- 3+ quartos, 2+ banheiros, 2+ vagas
- Com sacada, vista para o mar
- Condomínio com piscina, academia, portaria 24h
- Seminovo ou usado

**No QuickSearch:**
1. Tipo: Apartamento, Casa
2. Local: Florianópolis
3. Preço: R$ 800.000 - R$ 1.500.000
4. Área: 100-200 m²
5. Mais filtros:
   - Quartos: 3+
   - Banheiros: 2+
   - Vagas: 2+
   - Comodidades: Sacada, Vista mar
   - Condomínio: Piscina, Academia, Portaria 24h
   - Estado: Seminovo

**URL gerada:**
```
/explorar?types=apartamento,casa&location=Florianópolis&priceMin=800000&priceMax=1500000&areaMin=100&areaMax=200&bedrooms=3&bathrooms=2&parking=2&amenities=sacada,vista_mar&condoAmenities=piscina,academia,portaria&condition=seminovo
```

**Query para API:**
```
GET /properties?published=true&limit=24&types=apartamento,casa&city=Florianópolis&minPrice=800000&maxPrice=1500000&minArea=100&maxArea=200&minBedrooms=3&minBathrooms=2&minParkingSpaces=2&amenities=sacada,vista_mar&condoAmenities=piscina,academia,portaria&condition=seminovo
```

---

## 🎯 Fluxo do Usuário

### Fluxo 1: Busca Rápida da Home

```
Home Page
  ↓
QuickSearch (4 campos principais)
  ↓
Clica "Buscar"
  ↓
Página Explorar com resultados
  ↓
Aplica filtros laterais (desktop) ou modal (mobile)
  ↓
Ordena resultados
  ↓
Clica em um imóvel
  ↓
Página de Detalhes
```

### Fluxo 2: Refinar Busca na Página Explorar

```
Página Explorar (vazia ou com filtros da URL)
  ↓
Usuário ajusta filtros na sidebar
  ↓
Filtros atualizam URL e resultados automaticamente
  ↓
Usuário remove filtros individuais clicando no X
  ↓
Ou limpa todos os filtros de uma vez
  ↓
Ordena por preço/área/data
  ↓
Escolhe um imóvel
```

---

## 💻 Exemplos de Código

### 1. Navegar Programaticamente com Filtros

```javascript
import { useNavigate } from 'react-router-dom';
import { filtersToUrlParams } from './utils/filterHelpers';

function MeuComponente() {
  const navigate = useNavigate();
  
  const buscarCasasBaratas = () => {
    const filtros = {
      propertyTypes: ['casa'],
      priceMax: 500000,
      location: 'Florianópolis'
    };
    
    const params = filtersToUrlParams(filtros);
    navigate(`/explorar?${params.toString()}`);
  };
  
  return (
    <button onClick={buscarCasasBaratas}>
      Ver casas em Florianópolis até R$ 500.000
    </button>
  );
}
```

### 2. Ler Filtros da URL

```javascript
import { useSearchParams } from 'react-router-dom';
import { parseFiltersFromUrl } from './utils/filterHelpers';

function MeuComponente() {
  const [searchParams] = useSearchParams();
  const filtros = parseFiltersFromUrl(searchParams);
  
  console.log('Filtros atuais:', filtros);
  // {
  //   propertyTypes: ['casa'],
  //   priceMax: 500000,
  //   location: 'Florianópolis'
  // }
  
  return <div>Buscando {filtros.location}...</div>;
}
```

### 3. Contar Filtros Ativos

```javascript
import { countActiveFilters } from './utils/filterHelpers';

const filtros = {
  propertyTypes: ['casa', 'apartamento'],
  priceMin: 500000,
  priceMax: 1000000,
  location: 'Florianópolis',
  bedrooms: 3
};

const total = countActiveFilters(filtros);
console.log(`${total} filtros ativos`); // "5 filtros ativos"
```

### 4. Gerar Descrições de Filtros

```javascript
import { getFilterDescriptions } from './utils/filterHelpers';

const filtros = {
  propertyTypes: ['casa'],
  priceMin: 500000,
  priceMax: 1000000,
  location: 'Florianópolis'
};

const descricoes = getFilterDescriptions(filtros);
console.log(descricoes);
// [
//   'Tipo: Casa',
//   'Local: Florianópolis',
//   'Preço: R$ 500.000 - R$ 1.000.000'
// ]
```

### 5. Construir Query para API

```javascript
function buildApiQuery(filters) {
  const params = new URLSearchParams();
  params.set('published', 'true');
  params.set('limit', '24');
  
  if (filters.location) {
    params.set('city', filters.location);
  }
  
  if (filters.priceMin) {
    params.set('minPrice', filters.priceMin);
  }
  
  if (filters.priceMax) {
    params.set('maxPrice', filters.priceMax);
  }
  
  if (filters.propertyTypes?.length > 0) {
    params.set('types', filters.propertyTypes.join(','));
  }
  
  return params.toString();
}

// Uso
const query = buildApiQuery({
  location: 'Florianópolis',
  priceMin: 500000,
  priceMax: 1000000,
  propertyTypes: ['casa', 'apartamento']
});

const response = await api.get(`/properties?${query}`);
```

---

## 🧪 Testes Manuais

### Checklist de Testes

- [ ] **QuickSearch na Home**
  - [ ] Abrir modal de Tipo do Imóvel
  - [ ] Selecionar múltiplos tipos
  - [ ] Abrir modal de Local
  - [ ] Buscar localização
  - [ ] Abrir modal de Preço
  - [ ] Ajustar sliders de preço
  - [ ] Abrir modal de Área
  - [ ] Ajustar sliders de área
  - [ ] Abrir modal de Mais Filtros
  - [ ] Selecionar quartos, banheiros, vagas
  - [ ] Marcar comodidades
  - [ ] Escolher estado do imóvel
  - [ ] Clicar em "Buscar"
  - [ ] Verificar redirecionamento para /explorar
  - [ ] Verificar URL com todos os filtros

- [ ] **Página Explorar - Desktop**
  - [ ] Sidebar de filtros visível
  - [ ] Aplicar filtro de localização
  - [ ] Aplicar filtro de preço
  - [ ] Aplicar filtro de área
  - [ ] Aplicar filtro de tipo
  - [ ] Aplicar filtro de comodidades
  - [ ] Ver filtros ativos no topo
  - [ ] Remover filtro individual (X)
  - [ ] Limpar todos os filtros
  - [ ] Ordenar por preço crescente
  - [ ] Ordenar por preço decrescente
  - [ ] Ordenar por área
  - [ ] Clicar em um card
  - [ ] Verificar navegação para página de detalhes

- [ ] **Página Explorar - Mobile**
  - [ ] Sidebar de filtros oculta
  - [ ] Botão flutuante visível
  - [ ] Abrir modal de filtros
  - [ ] Aplicar filtros
  - [ ] Ver badge com contagem
  - [ ] Fechar modal
  - [ ] Limpar todos os filtros
  - [ ] Grid de 1 coluna
  - [ ] Scroll suave

- [ ] **Responsividade**
  - [ ] Desktop (XL): 3 colunas
  - [ ] Tablet (MD): 2 colunas
  - [ ] Mobile: 1 coluna

- [ ] **Estados**
  - [ ] Loading skeleton
  - [ ] Estado vazio (sem resultados)
  - [ ] Estado de erro
  - [ ] Muitos resultados (scroll)

---

## 🐛 Troubleshooting

### Problema: Filtros não aparecem na URL

**Solução:**
```javascript
// Verificar se navigate está sendo chamado corretamente
const params = filtersToUrlParams(filters);
navigate(`/explorar?${params.toString()}`, { replace: true });
```

### Problema: Filtros não persistem ao voltar da página de detalhes

**Solução:** Usar `replace: true` ao navegar:
```javascript
navigate(`/explorar?${params}`, { replace: false }); // Mantém no histórico
```

### Problema: API retorna muitos resultados

**Solução:** Implementar paginação ou aumentar o limit:
```javascript
params.set('limit', '50'); // Mais resultados por página
```

### Problema: Filtros não limpam corretamente

**Solução:** Verificar se o estado está sendo resetado:
```javascript
const clearAllFilters = () => {
  setFilters({});
  navigate('/explorar', { replace: true });
};
```

---

## 📱 Screenshots Esperados

1. **Home - QuickSearch**: 4 botões brancos com bordas arredondadas
2. **Modal de Tipo**: Grid de 9 tipos com ícones
3. **Modal de Preço**: Dual slider + 4 opções rápidas
4. **Modal Avançado**: Layout estilo Airbnb com múltiplas seções
5. **Explorar Desktop**: Sidebar esquerda + Grid 3 colunas
6. **Explorar Mobile**: Botão flutuante verde + Modal bottom sheet
7. **Filtros Ativos**: Pills com X para remover
8. **Card de Imóvel**: Imagem + Badge + Bookmark + Detalhes + Preço + Rating

---

## ✅ Critérios de Aceitação

1. ✅ Busca rápida funcional na home
2. ✅ Todos os modais abrem e fecham corretamente
3. ✅ Filtros sincronizam com a URL
4. ✅ Filtros ativos aparecem visualmente
5. ✅ Possível remover filtros individualmente
6. ✅ Possível limpar todos os filtros
7. ✅ Ordenação funciona
8. ✅ Grid responsivo (3/2/1 colunas)
9. ✅ Versão mobile com modal
10. ✅ Cards clicáveis navegam para detalhes
11. ✅ Loading states implementados
12. ✅ Empty state quando sem resultados
