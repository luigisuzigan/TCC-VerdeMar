# Integração Backend - Sistema de Busca de Imóveis

Este documento descreve como integrar o sistema de busca do frontend com o backend.

## 📋 Query Parameters Esperados

### Endpoint
```
GET /properties
```

### Parâmetros Base
| Parâmetro | Tipo | Descrição | Exemplo |
|-----------|------|-----------|---------|
| `published` | boolean | Apenas imóveis publicados | `true` |
| `limit` | number | Quantidade de resultados | `24` |
| `page` | number | Número da página (paginação) | `1` |

### Parâmetros de Filtro

#### Localização
| Parâmetro | Tipo | Descrição | Exemplo |
|-----------|------|-----------|---------|
| `city` | string | Nome da cidade | `Jakarta` |
| `state` | string | Estado | `SP` |
| `neighborhood` | string | Bairro | `Centro` |

#### Preço
| Parâmetro | Tipo | Descrição | Exemplo |
|-----------|------|-----------|---------|
| `minPrice` | number | Preço mínimo | `500000` |
| `maxPrice` | number | Preço máximo | `1000000` |

#### Área
| Parâmetro | Tipo | Descrição | Exemplo |
|-----------|------|-----------|---------|
| `minArea` | number | Área mínima (m²) | `50` |
| `maxArea` | number | Área máxima (m²) | `200` |

#### Tipo de Imóvel
| Parâmetro | Tipo | Descrição | Exemplo |
|-----------|------|-----------|---------|
| `types` | string | Tipos separados por vírgula | `casa,apartamento,terreno` |

**Valores possíveis:**
- `casa`
- `apartamento`
- `cobertura`
- `terreno`
- `kitnet`
- `sobrado`
- `chacara`
- `comercial`
- `loft`

#### Características
| Parâmetro | Tipo | Descrição | Exemplo |
|-----------|------|-----------|---------|
| `minBedrooms` | number | Número mínimo de quartos | `3` |
| `minBathrooms` | number | Número mínimo de banheiros | `2` |
| `minParkingSpaces` | number | Número mínimo de vagas | `1` |
| `minSuites` | number | Número mínimo de suítes | `1` |

#### Comodidades
| Parâmetro | Tipo | Descrição | Exemplo |
|-----------|------|-----------|---------|
| `amenities` | string | Comodidades separadas por vírgula | `sacada,churrasqueira,vista_mar` |
| `condoAmenities` | string | Comodidades do condomínio | `piscina,academia,portaria` |

**Comodidades do Imóvel:**
- `sacada` - Sacada/Varanda
- `churrasqueira` - Churrasqueira
- `area_servico` - Área de serviço
- `despensa` - Despensa
- `closet` - Closet
- `escritorio` - Escritório/Home office
- `vista_mar` - Vista para o mar
- `mobiliado` - Mobiliado
- `semi_mobiliado` - Semi-mobiliado
- `ar_condicionado` - Ar condicionado

**Comodidades do Condomínio:**
- `piscina` - Piscina
- `academia` - Academia
- `salao_festas` - Salão de festas
- `quadra` - Quadra esportiva
- `playground` - Playground
- `elevador` - Elevador
- `portaria` - Portaria 24h
- `seguranca` - Segurança/Câmeras
- `area_verde` - Área verde/Jardim
- `salao_jogos` - Salão de jogos
- `aceita_pets` - Aceita pets

#### Estado do Imóvel
| Parâmetro | Tipo | Descrição | Exemplo |
|-----------|------|-----------|---------|
| `condition` | string | Estado de conservação | `novo` |

**Valores possíveis:**
- `novo` - Novo/Na planta
- `seminovo` - Seminovo
- `usado` - Usado (bom estado)
- `reformar` - A reformar

#### Ordenação
| Parâmetro | Tipo | Descrição | Exemplo |
|-----------|------|-----------|---------|
| `sortBy` | string | Campo para ordenação | `price-asc` |

**Valores possíveis:**
- `default` - Ordem padrão
- `price-asc` - Preço crescente
- `price-desc` - Preço decrescente
- `area-asc` - Menor área
- `area-desc` - Maior área
- `newest` - Mais recentes

## 🔧 Exemplo de URL Completa

```
GET /properties?published=true&limit=24&city=Jakarta&minPrice=500000&maxPrice=1000000&types=casa,apartamento&minBedrooms=3&minBathrooms=2&amenities=piscina,churrasqueira&sortBy=price-asc
```

## 📦 Formato de Resposta Esperado

### Sucesso (200 OK)

#### Opção 1: Com metadados
```json
{
  "items": [
    {
      "id": "1",
      "title": "Casa Moderna",
      "description": "Linda casa com vista para o mar",
      "type": "casa",
      "price": 850000,
      "area": 120,
      "beds": 3,
      "baths": 2,
      "parkingSpaces": 2,
      "suites": 1,
      "city": "Florianópolis",
      "state": "SC",
      "neighborhood": "Canasvieiras",
      "address": "Rua das Flores, 123",
      "images": [
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg"
      ],
      "amenities": ["sacada", "churrasqueira", "vista_mar"],
      "condoAmenities": ["piscina", "portaria"],
      "condition": "seminovo",
      "rating": 4.8,
      "published": true,
      "createdAt": "2025-01-15T10:00:00Z"
    }
  ],
  "total": 42,
  "page": 1,
  "limit": 24,
  "totalPages": 2
}
```

#### Opção 2: Array simples
```json
[
  {
    "id": "1",
    "title": "Casa Moderna",
    // ... mesmos campos acima
  }
]
```

### Erro (400 Bad Request)
```json
{
  "error": "Invalid parameter",
  "message": "minPrice must be a number"
}
```

### Erro (500 Internal Server Error)
```json
{
  "error": "Internal server error",
  "message": "Database connection failed"
}
```

## 🔍 Implementação Backend Sugerida (Node.js/Prisma)

### Exemplo de Controller

```javascript
// controllers/propertyController.js
export async function getProperties(req, res) {
  try {
    const {
      // Base
      published = 'true',
      limit = '24',
      page = '1',
      
      // Filters
      city,
      state,
      neighborhood,
      minPrice,
      maxPrice,
      minArea,
      maxArea,
      types,
      minBedrooms,
      minBathrooms,
      minParkingSpaces,
      minSuites,
      amenities,
      condoAmenities,
      condition,
      
      // Sort
      sortBy = 'default',
    } = req.query;

    // Build Prisma where clause
    const where = {
      published: published === 'true',
    };

    // Location filters
    if (city) where.city = { contains: city, mode: 'insensitive' };
    if (state) where.state = state;
    if (neighborhood) where.neighborhood = { contains: neighborhood, mode: 'insensitive' };

    // Price filters
    if (minPrice) where.price = { ...where.price, gte: Number(minPrice) };
    if (maxPrice) where.price = { ...where.price, lte: Number(maxPrice) };

    // Area filters
    if (minArea) where.area = { ...where.area, gte: Number(minArea) };
    if (maxArea) where.area = { ...where.area, lte: Number(maxArea) };

    // Type filter
    if (types) {
      const typeArray = types.split(',');
      where.type = { in: typeArray };
    }

    // Characteristics filters
    if (minBedrooms) where.beds = { gte: Number(minBedrooms) };
    if (minBathrooms) where.baths = { gte: Number(minBathrooms) };
    if (minParkingSpaces) where.parkingSpaces = { gte: Number(minParkingSpaces) };
    if (minSuites) where.suites = { gte: Number(minSuites) };

    // Amenities filters (assuming JSON field)
    if (amenities) {
      const amenityArray = amenities.split(',');
      where.amenities = { hasEvery: amenityArray };
    }
    if (condoAmenities) {
      const condoAmenityArray = condoAmenities.split(',');
      where.condoAmenities = { hasEvery: condoAmenityArray };
    }

    // Condition filter
    if (condition) where.condition = condition;

    // Build orderBy
    let orderBy = {};
    switch (sortBy) {
      case 'price-asc':
        orderBy = { price: 'asc' };
        break;
      case 'price-desc':
        orderBy = { price: 'desc' };
        break;
      case 'area-asc':
        orderBy = { area: 'asc' };
        break;
      case 'area-desc':
        orderBy = { area: 'desc' };
        break;
      case 'newest':
        orderBy = { createdAt: 'desc' };
        break;
      default:
        orderBy = { createdAt: 'desc' };
    }

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    // Execute query
    const [items, total] = await Promise.all([
      prisma.property.findMany({
        where,
        orderBy,
        skip,
        take,
      }),
      prisma.property.count({ where }),
    ]);

    // Return response
    res.json({
      items,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
}
```

### Schema Prisma Sugerido

```prisma
model Property {
  id              String   @id @default(cuid())
  title           String
  description     String?
  type            String   // casa, apartamento, etc.
  price           Float
  area            Float?
  beds            Int?
  baths           Int?
  parkingSpaces   Int?
  suites          Int?
  city            String?
  state           String?
  neighborhood    String?
  address         String?
  images          String[] // Array de URLs
  amenities       String[] // Array de IDs
  condoAmenities  String[] // Array de IDs
  condition       String?  // novo, seminovo, usado, reformar
  rating          Float?
  published       Boolean  @default(false)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  @@index([city, published])
  @@index([price, published])
  @@index([type, published])
}
```

## ✅ Checklist de Implementação

### Backend
- [ ] Criar endpoint GET /properties
- [ ] Implementar filtros de localização (city, state, neighborhood)
- [ ] Implementar filtros de preço (minPrice, maxPrice)
- [ ] Implementar filtros de área (minArea, maxArea)
- [ ] Implementar filtro de tipos (types)
- [ ] Implementar filtros de características (bedrooms, bathrooms, etc.)
- [ ] Implementar filtros de comodidades (amenities, condoAmenities)
- [ ] Implementar filtro de condição (condition)
- [ ] Implementar ordenação (sortBy)
- [ ] Implementar paginação
- [ ] Adicionar índices no banco de dados
- [ ] Testar performance com muitos registros
- [ ] Adicionar validação de parâmetros
- [ ] Adicionar tratamento de erros
- [ ] Documentar API (Swagger/OpenAPI)

### Frontend
- [x] Criar componente QuickSearch
- [x] Criar modais de filtros
- [x] Criar página Explorar
- [x] Implementar sincronização com URL
- [x] Criar helpers de filtros
- [x] Implementar ordenação
- [x] Criar componente de filtros ativos
- [x] Implementar versão mobile
- [ ] Adicionar paginação
- [ ] Adicionar loading states
- [ ] Adicionar tratamento de erros
- [ ] Adicionar testes

## 🚀 Próximos Passos

1. **Paginação**: Implementar infinite scroll ou botão "Carregar mais"
2. **Cache**: Adicionar cache de resultados (React Query / SWR)
3. **SEO**: Adicionar meta tags dinâmicas baseadas nos filtros
4. **Analytics**: Rastrear buscas mais populares
5. **Sugestões**: Implementar autocomplete para localização
6. **Mapas**: Integrar Google Maps para visualização geográfica
7. **Favoritos**: Sistema de salvamento de imóveis
8. **Busca Salva**: Permitir salvar combinações de filtros
9. **Alertas**: Notificações de novos imóveis que correspondam aos filtros
10. **Compartilhamento**: Gerar links para compartilhar buscas
