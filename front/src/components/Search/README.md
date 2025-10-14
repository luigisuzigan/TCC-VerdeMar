# 🔍 Sistema de Busca Rápida - VerdeMar

## 📁 Estrutura de Arquivos

```
Search/
├── QuickSearch.jsx                    # Componente principal
├── Modals/
│   ├── PropertyTypeModal.jsx          # Modal de tipos de imóveis
│   ├── LocationModal.jsx              # Modal de localização
│   ├── PriceRangeModal.jsx           # Modal de faixa de preço
│   ├── AreaModal.jsx                 # Modal de área (m²)
│   └── AdvancedFiltersModal.jsx      # Modal de filtros avançados
└── README.md                          # Este arquivo
```

## 🎯 Funcionalidades Implementadas

### ✅ Campos Principais
- **Tipo do Imóvel**: Seleção múltipla com 9 tipos (Casa, Apartamento, etc.)
- **Localização**: Busca com sugestões populares (preparado para Google Maps)
- **Preço**: Slider de R$ 0 a R$ 5M com opções rápidas
- **Área**: Slider de 0 a 500m² com opções rápidas

### ✅ Filtros Avançados (Modal estilo Airbnb)
- **Quartos**: 1+ a 5+
- **Banheiros**: 1+ a 4+
- **Vagas de Garagem**: 0 a 4+
- **Suítes**: 0 a 3+
- **10 Comodidades do Imóvel**
- **11 Comodidades do Condomínio**
- **4 Estados do Imóvel**

## 🚀 Como Usar

### No seu componente:
```jsx
import QuickSearch from '../components/Search/QuickSearch';

function MyPage() {
  return (
    <div>
      <QuickSearch />
    </div>
  );
}
```

### Estado dos Filtros:
O componente `QuickSearch` gerencia internamente um estado com todos os filtros:

```javascript
{
  propertyTypes: [],          // Array de IDs: ['casa', 'apartamento']
  location: '',               // String: 'Praia Central'
  priceMin: '',              // Number: 500000
  priceMax: '',              // Number: 1000000
  areaMin: '',               // Number: 50
  areaMax: '',               // Number: 200
  bedrooms: null,            // Number: 3
  bathrooms: null,           // Number: 2
  parkingSpaces: null,       // Number: 2
  suites: null,              // Number: 1
  amenities: [],             // Array: ['sacada', 'churrasqueira']
  condoAmenities: [],        // Array: ['piscina', 'academia']
  propertyCondition: '',     // String: 'novo'
}
```

## 📋 Próximos Passos

### 1. 🗺️ Integração com Google Maps

#### Passo 1: Obter API Key do Google
1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative as seguintes APIs:
   - Google Maps JavaScript API
   - Places API
   - Geocoding API
4. Crie uma chave de API em "Credenciais"
5. Restrinja a chave ao seu domínio

#### Passo 2: Instalar biblioteca
```bash
npm install @react-google-maps/api
```

#### Passo 3: Adicionar variável de ambiente
Criar arquivo `.env` na raiz do `front/`:
```
VITE_GOOGLE_MAPS_API_KEY=sua_chave_aqui
```

#### Passo 4: Atualizar LocationModal.jsx
```jsx
import { GoogleMap, useJsApiLoader, Autocomplete } from '@react-google-maps/api';

const { isLoaded } = useJsApiLoader({
  googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  libraries: ['places'],
});

// Substituir o placeholder do mapa pelo componente GoogleMap
```

### 2. 🔗 Conectar com Backend

#### No QuickSearch.jsx, modificar handleSearch:
```jsx
const handleSearch = async () => {
  // Navegar para página de resultados com query params
  const params = new URLSearchParams();
  
  if (filters.propertyTypes.length) {
    params.append('types', filters.propertyTypes.join(','));
  }
  if (filters.location) {
    params.append('location', filters.location);
  }
  if (filters.priceMin) {
    params.append('priceMin', filters.priceMin);
  }
  if (filters.priceMax) {
    params.append('priceMax', filters.priceMax);
  }
  // ... adicionar outros filtros
  
  navigate(`/explorar?${params.toString()}`);
};
```

### 3. 📄 Criar Página de Resultados

Criar `pages/SearchResults/index.jsx`:
```jsx
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      const filters = {
        types: searchParams.get('types')?.split(','),
        location: searchParams.get('location'),
        priceMin: searchParams.get('priceMin'),
        priceMax: searchParams.get('priceMax'),
        // ... outros filtros
      };

      // Chamada à API
      const response = await fetch('/api/properties/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filters),
      });

      const data = await response.json();
      setProperties(data);
      setLoading(false);
    };

    fetchProperties();
  }, [searchParams]);

  return (
    <div>
      {/* Renderizar resultados */}
    </div>
  );
}
```

### 4. 🎨 Melhorias Futuras

- [ ] Adicionar histórico de buscas recentes
- [ ] Salvar filtros favoritos do usuário
- [ ] Compartilhar busca via URL
- [ ] Adicionar modo de visualização (grid/lista)
- [ ] Ordenação de resultados (preço, área, data)
- [ ] Paginação de resultados
- [ ] Mapa com marcadores dos imóveis
- [ ] Filtro de distância de um ponto específico

## 🎨 Personalização

### Cores
As cores principais usam a paleta Emerald do Tailwind:
- Primária: `emerald-600` (#10b981)
- Hover: `emerald-700`
- Background: `emerald-50`

Para alterar, substitua `emerald` por outra cor do Tailwind.

### Tipos de Imóveis
Editar em `PropertyTypeModal.jsx`:
```javascript
const PROPERTY_TYPES = [
  { id: 'seu-tipo', label: 'Seu Tipo', icon: SeuIcone },
  // ...
];
```

### Localizações Populares
Editar em `LocationModal.jsx`:
```javascript
const POPULAR_LOCATIONS = [
  'Sua Localização 1',
  'Sua Localização 2',
  // ...
];
```

## 📱 Responsividade

Todos os componentes são totalmente responsivos:
- **Mobile**: 1 coluna, modais em tela cheia
- **Tablet**: 2 colunas
- **Desktop**: 4 colunas (campos principais)

## ♿ Acessibilidade

- Uso de `@headlessui/react` para modais acessíveis
- Labels apropriados para screen readers
- Navegação por teclado funcional
- Contraste adequado de cores

## 🐛 Debug

Para ver os filtros selecionados no console:
```javascript
// Em QuickSearch.jsx, no handleSearch:
console.log('Filtros aplicados:', filters);
```

## 📄 Licença

Este componente faz parte do projeto VerdeMar.
