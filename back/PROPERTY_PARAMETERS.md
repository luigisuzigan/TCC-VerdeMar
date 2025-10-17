# 📋 Parâmetros dos Imóveis - VerdeMar

## 📖 Documentação Completa dos Campos do Modelo `Property`

Esta documentação detalha todos os parâmetros que cada imóvel possui no sistema VerdeMar.

---

## 🆔 Identificação e Propriedade

### `id` (String, UUID)
- **Descrição**: Identificador único do imóvel
- **Gerado automaticamente**: Sim (UUID v4)
- **Obrigatório**: Sim
- **Exemplo**: `"550e8400-e29b-41d4-a716-446655440000"`

### `userId` (String, UUID)
- **Descrição**: ID do usuário dono do imóvel
- **Obrigatório**: Sim
- **Relacionamento**: FK → `User.id`
- **Exemplo**: `"123e4567-e89b-12d3-a456-426614174000"`

---

## 📝 Informações Básicas

### `title` (String)
- **Descrição**: Título/nome do imóvel
- **Obrigatório**: Sim
- **Limite**: 1-120 caracteres
- **Exemplo**: `"Apartamento Luxuoso Vista Mar - 3 Quartos"`
- **Uso**: Exibido como título principal nos cards e página de detalhes

### `description` (String, Opcional)
- **Descrição**: Descrição detalhada do imóvel
- **Obrigatório**: Sim
- **Limite**: Até 800 caracteres
- **Exemplo**: `"Apartamento completamente mobiliado com vista panorâmica para o mar. Localizado em condomínio de alto padrão com academia, piscina e área gourmet."`
- **Uso**: Exibido na página de detalhes

### `category` (String) - **NOVO CAMPO**
- **Descrição**: Categoria principal do imóvel
- **Obrigatório**: Sim
- **Valores permitidos**:
  - `"Residencial"`
  - `"Comercial"`
  - `"Industrial"`
  - `"Terreno"`
  - `"Especial"`
- **Exemplo**: `"Residencial"`
- **Uso**: Filtro de primeiro nível (pasta/categoria)
- **Interface**: Dropdown/Select no formulário

### `type` (String)
- **Descrição**: Tipo específico do imóvel (subcategoria)
- **Obrigatório**: Sim
- **Padrão**: `"Apartamento"`
- **Valores permitidos por categoria**:

#### 🏠 Residenciais
  - `"Casa"`
  - `"Sobrado"`
  - `"Apartamento"`
  - `"Kitnet / Studio / Loft"`
  - `"Cobertura"`
  - `"Condomínio residencial"`
  - `"Chácara"`
  - `"Sítio / Fazenda"`

#### 🏢 Comerciais
  - `"Sala comercial / Escritório"`
  - `"Loja / Ponto comercial"`
  - `"Prédio comercial"`
  - `"Galpão comercial"`
  - `"Hotel / Pousada"`

#### 🏭 Industriais
  - `"Galpão industrial"`
  - `"Condomínio industrial"`
  - `"Terreno industrial"`
  - `"Fábrica / Armazém"`

#### 📍 Terrenos / Lotes
  - `"Terreno residencial"`
  - `"Terreno comercial"`
  - `"Terreno misto"`
  - `"Terreno rural"`
  - `"Terreno em condomínio"`

#### ⭐ Outros / Especiais
  - `"Loteamento"`
  - `"Área / Gleba"`
  - `"Empreendimento em construção"`
  - `"Imóvel de uso misto"`

- **Exemplo**: `"Apartamento"`
- **Uso**: Filtros de busca detalhados e categorização específica
- **Interface**: Dropdown dependente da `category` selecionada

---

## 💰 Valores e Preços

### `price` (Float)
- **Descrição**: Preço do imóvel
- **Obrigatório**: Sim
- **Formato**: Número decimal (até 2 casas)
- **Mínimo**: 0
- **Exemplo**: `850000.00` (R$ 850.000,00)
- **Uso**: Exibido formatado, usado em filtros de faixa de preço

### `currency` (String)
- **Descrição**: Moeda do preço
- **Obrigatório**: Sim
- **Padrão**: `"BRL"`
- **Valores sugeridos**: `"BRL"`, `"USD"`, `"EUR"`
- **Exemplo**: `"BRL"`
- **Uso**: Formatação do preço na interface

---

## 📍 Localização

### `address` (String)
- **Descrição**: Endereço completo (rua, número, complemento)
- **Obrigatório**: Não (padrão: `""`)
- **Exemplo**: `"Rua das Flores, 123, Apto 501"`
- **Uso**: Exibido na página de detalhes
- **Observação**: Pode ser ocultado por privacidade até contato

### `city` (String)
- **Descrição**: Cidade do imóvel
- **Obrigatório**: Sim
- **Exemplo**: `"Florianópolis"`
- **Uso**: **Filtros de busca** (campo principal de localização), exibição
- **Indexado**: Sim (para performance)

### `state` (String)
- **Descrição**: Estado/UF do imóvel
- **Obrigatório**: Não (padrão: `""`)
- **Exemplo**: `"Santa Catarina"` ou `"SC"`
- **Uso**: Filtros avançados, breadcrumb
- **Sugestão**: Usar sigla (2 letras) para padronização

### `country` (String)
- **Descrição**: País do imóvel
- **Obrigatório**: Sim
- **Exemplo**: `"Brasil"`
- **Uso**: Filtros internacionais (futuro), exibição
- **Sugestão**: Padronizar em português

### `zipCode` (String, Opcional)
- **Descrição**: CEP do imóvel
- **Obrigatório**: Não
- **Formato**: `"XXXXX-XXX"` (Brasil) ou sem máscara
- **Exemplo**: `"88015-000"` ou `"88015000"`
- **Uso**: Busca de endereço via API, cálculo de distâncias

### `latitude` (Float, Opcional)
- **Descrição**: Coordenada de latitude para exibição no mapa
- **Obrigatório**: Não (recomendado para mapa)
- **Formato**: Decimal (-90 a +90)
- **Exemplo**: `-27.5954`
- **Uso**: **Exibição no mapa**, filtro por área geográfica

### `longitude` (Float, Opcional)
- **Descrição**: Coordenada de longitude para exibição no mapa
- **Obrigatório**: Não (recomendado para mapa)
- **Formato**: Decimal (-180 a +180)
- **Exemplo**: `-48.5480`
- **Uso**: **Exibição no mapa**, filtro por área geográfica

> **⚠️ IMPORTANTE**: Para o imóvel aparecer no mapa, `latitude` e `longitude` devem estar preenchidos!

---

## 🏗️ Características do Imóvel

### `area` (Int)
- **Descrição**: Área total do imóvel em metros quadrados (m²)
- **Obrigatório**: Sim
- **Formato**: Número inteiro
- **Mínimo**: 0
- **Exemplo**: `120` (120 m²)
- **Uso**: Filtros de área (min/max), exibição
- **Observação**: Considerar área útil ou total? (definir padrão)

### `beds` (Int)
- **Descrição**: Número de quartos/dormitórios
- **Obrigatório**: Sim
- **Formato**: Número inteiro
- **Mínimo**: 0
- **Exemplo**: `3` (3 quartos)
- **Uso**: Filtros de quartos, ícone na listagem
- **Valores comuns**: 0 (studio), 1, 2, 3, 4, 5+

### `baths` (Int)
- **Descrição**: Número de banheiros
- **Obrigatório**: Sim
- **Formato**: Número inteiro
- **Mínimo**: 0
- **Exemplo**: `2` (2 banheiros)
- **Uso**: Filtros de banheiros, ícone na listagem
- **Observação**: Considerar lavabos? (definir critério)

### `guests` (Int)
- **Descrição**: Capacidade de hóspedes (para aluguel por temporada)
- **Obrigatório**: Sim
- **Formato**: Número inteiro
- **Mínimo**: 0
- **Exemplo**: `6` (6 pessoas)
- **Uso**: Filtros para aluguel, informação de capacidade
- **Observação**: Relevante principalmente para temporada

---

## 🛋️ Comodidades e Amenidades

### `amenities` (String - JSON Array)
- **Descrição**: Lista de comodidades/amenidades do imóvel
- **Obrigatório**: Não (padrão: `"[]"`)
- **Formato**: Array JSON stringificado
- **Exemplo**: `'["Piscina", "WiFi", "Ar-condicionado", "Churrasqueira", "Garagem"]'`
- **Uso**: Filtros de comodidades, exibição de ícones
- **Valores sugeridos**:

#### 🏊 Lazer e Conforto
- `"Piscina"`
- `"Academia"`
- `"Sauna"`
- `"Churrasqueira"`
- `"Área Gourmet"`
- `"Jardim"`
- `"Varanda"`
- `"Sacada"`
- `"Terraço"`

#### 🌐 Tecnologia
- `"WiFi"`
- `"TV a Cabo"`
- `"Smart TV"`
- `"Interfone"`
- `"Portão Eletrônico"`

#### ❄️ Climatização
- `"Ar-condicionado"`
- `"Aquecedor"`
- `"Ventilador de Teto"`
- `"Lareira"`

#### 🚗 Estacionamento
- `"Garagem"`
- `"Vaga Coberta"`
- `"2 Vagas"`
- `"3 Vagas"`

#### 🏠 Cozinha e Limpeza
- `"Cozinha Equipada"`
- `"Geladeira"`
- `"Fogão"`
- `"Micro-ondas"`
- `"Máquina de Lavar"`
- `"Máquina de Secar"`
- `"Lava-louças"`

#### 🔒 Segurança
- `"Portaria 24h"`
- `"Câmeras de Segurança"`
- `"Alarme"`
- `"Cerca Elétrica"`

#### ♿ Acessibilidade
- `"Elevador"`
- `"Acessível para Cadeirantes"`
- `"Rampa de Acesso"`

#### 🐕 Pets e Família
- `"Aceita Pets"`
- `"Playground"`
- `"Salão de Festas"`
- `"Quadra Esportiva"`

> **💡 Sugestão**: Criar categorias de amenidades para melhor organização

---

## 📸 Mídia

### `images` (String - JSON Array)
- **Descrição**: Array de URLs das imagens do imóvel
- **Obrigatório**: Sim
- **Formato**: Array JSON stringificado
- **Exemplo**: `'["https://exemplo.com/img1.jpg", "https://exemplo.com/img2.jpg", "https://exemplo.com/img3.jpg"]'`
- **Uso**: Galeria de fotos, carrossel
- **Recomendações**:
  - Mínimo: 3 fotos
  - Ideal: 8-15 fotos
  - Formatos: JPG, PNG, WebP
  - Tamanho: Até 2MB por imagem
  - Resolução: Mínimo 1200x800px

### `mainImage` (String, Opcional)
- **Descrição**: URL da imagem principal/capa do imóvel
- **Obrigatório**: Não (pode usar primeira de `images`)
- **Formato**: URL completa
- **Exemplo**: `"https://exemplo.com/capa.jpg"`
- **Uso**: Thumbnail nos cards da listagem
- **Recomendação**: Imagem mais atrativa, com boa iluminação

---

## �️ Informações de Proximidade - **NOVA SEÇÃO**

### `nearbyPlaces` (String - JSON Object) - **NOVO CAMPO**
- **Descrição**: Informações sobre locais próximos ao imóvel
- **Obrigatório**: Não (padrão: `"{}"`)
- **Formato**: Objeto JSON stringificado com categorias
- **Exemplo**:
```json
{
  "schools": [
    {
      "name": "Escola Municipal João da Silva",
      "distance": "500m",
      "type": "Pública",
      "level": "Fundamental"
    },
    {
      "name": "Colégio Santa Maria",
      "distance": "1.2km",
      "type": "Particular",
      "level": "Ensino Médio"
    }
  ],
  "supermarkets": [
    {
      "name": "Supermercado Angeloni",
      "distance": "300m"
    },
    {
      "name": "Mercado Central",
      "distance": "800m"
    }
  ],
  "hospitals": [
    {
      "name": "Hospital São José",
      "distance": "2.5km",
      "type": "Particular"
    }
  ],
  "pharmacies": [
    {
      "name": "Farmácia Santa Cruz",
      "distance": "200m"
    }
  ],
  "banks": [
    {
      "name": "Banco do Brasil",
      "distance": "600m"
    }
  ],
  "restaurants": [
    {
      "name": "Restaurante Sabor do Mar",
      "distance": "400m",
      "cuisine": "Frutos do Mar"
    }
  ],
  "publicTransport": [
    {
      "name": "Parada de Ônibus - Linha 101",
      "distance": "150m"
    }
  ],
  "parks": [
    {
      "name": "Parque Municipal",
      "distance": "1km"
    }
  ],
  "beaches": [
    {
      "name": "Praia de Jurerê",
      "distance": "3km"
    }
  ],
  "gyms": [
    {
      "name": "Academia Corpo e Forma",
      "distance": "500m"
    }
  ]
}
```

**Uso**: Exibição na página de detalhes, seção "O que há por perto"

**Interface no Formulário**:
- Seção expansível "Locais Próximos"
- Para cada categoria, botão "+ Adicionar [Escola/Supermercado/etc]"
- Campos por local:
  - Nome (texto)
  - Distância (texto com unidade: m/km)
  - Tipo (dropdown opcional)
  - Outros detalhes conforme categoria

**Categorias sugeridas**:
- 🏫 **Escolas**: Tipo (Pública/Particular), Nível (Infantil/Fundamental/Médio/Superior)
- 🛒 **Supermercados**: Nome e distância
- 🏥 **Hospitais/Clínicas**: Tipo (Público/Particular/Convênio)
- 💊 **Farmácias**: Nome e distância
- 🏦 **Bancos/Caixas Eletrônicos**: Nome e distância
- 🍽️ **Restaurantes/Bares**: Tipo de culinária
- 🚌 **Transporte Público**: Linhas de ônibus, metrô
- 🌳 **Parques/Áreas de Lazer**: Nome e distância
- 🏖️ **Praias**: Nome e distância
- 🏋️ **Academias/Esportes**: Nome e distância
- 🛍️ **Shopping Centers**: Nome e distância
- ⛪ **Igrejas/Templos**: Nome e distância

---

## �📊 Métricas e Estatísticas

### `rating` (Float, Opcional)
- **Descrição**: Avaliação média do imóvel (calculada)
- **Obrigatório**: Não (padrão: `0`)
- **Formato**: Decimal (1.0 a 5.0)
- **Exemplo**: `4.7`
- **Uso**: Exibição de estrelas, ordenação por avaliação
- **Cálculo**: Média das avaliações em `Review`

### `reviewCount` (Int)
- **Descrição**: Número total de avaliações
- **Obrigatório**: Não (padrão: `0`)
- **Formato**: Número inteiro
- **Exemplo**: `23`
- **Uso**: Exibição "(4.7 ⭐ - 23 avaliações)"
- **Cálculo**: Contador de reviews relacionados

### `viewCount` (Int)
- **Descrição**: Número de visualizações do imóvel
- **Obrigatório**: Não (padrão: `0`)
- **Formato**: Número inteiro
- **Exemplo**: `154`
- **Uso**: Analytics, ordenação por popularidade
- **Incremento**: A cada visualização da página de detalhes

---

## ⚙️ Status e Controle

### `published` (Boolean)
- **Descrição**: Se o imóvel está publicado/visível
- **Obrigatório**: Sim
- **Padrão**: `false`
- **Valores**: `true` ou `false`
- **Uso**: Filtro principal (só mostra se `published = true`)
- **Observação**: Rascunhos ficam com `false`

### `featured` (Boolean)
- **Descrição**: Se o imóvel é destaque na home
- **Obrigatório**: Sim
- **Padrão**: `false`
- **Valores**: `true` ou `false`
- **Uso**: Seção "Imóveis em Destaque" na página inicial
- **Controle**: Admin/Seller pode marcar imóveis premium

---

## 🕒 Datas de Controle

### `createdAt` (DateTime)
- **Descrição**: Data/hora de criação do imóvel
- **Obrigatório**: Sim (gerado automaticamente)
- **Padrão**: Data/hora atual
- **Exemplo**: `"2025-10-17T14:30:00.000Z"`
- **Uso**: Ordenação "Mais Recentes", histórico

### `updatedAt` (DateTime)
- **Descrição**: Data/hora da última atualização
- **Obrigatório**: Sim (atualizado automaticamente)
- **Padrão**: Data/hora atual
- **Exemplo**: `"2025-10-17T15:45:00.000Z"`
- **Uso**: Auditoria, cache invalidation

---

## 🔗 Relacionamentos

### `user` (Relação → User)
- **Descrição**: Dono/anunciante do imóvel
- **Tipo**: Many-to-One (muitos imóveis para um usuário)
- **Cascade**: Deleta imóveis se usuário for deletado

### `favorites` (Relação → Favorite[])
- **Descrição**: Favoritos deste imóvel
- **Tipo**: One-to-Many (um imóvel tem muitos favoritos)

### `reviews` (Relação → Review[])
- **Descrição**: Avaliações deste imóvel
- **Tipo**: One-to-Many (um imóvel tem muitas avaliações)

---

## �️ Informações de Proximidade (Google Maps API) - **NOVA SEÇÃO**

### `nearbyPlaces` (String - JSON Object) - **NOVO CAMPO**
- **Descrição**: Informações REAIS sobre locais próximos obtidas via Google Maps Places API
- **Obrigatório**: Não (padrão: `"{}"`)
- **Formato**: Objeto JSON stringificado com locais reais do Google Maps
- **Fonte de Dados**: Google Maps Places API (Nearby Search)
- **Atualização**: Calculado automaticamente quando imóvel é cadastrado/editado
- **Raio de Busca**: Configurável (padrão: 2km)

**Exemplo**:
```json
{
  "schools": [
    {
      "placeId": "ChIJ...",
      "name": "Escola Municipal João da Silva",
      "distance": 487,
      "distanceText": "487m",
      "lat": -27.5984,
      "lng": -48.5484,
      "rating": 4.2,
      "types": ["school", "point_of_interest"]
    }
  ],
  "supermarkets": [
    {
      "placeId": "ChIJ...",
      "name": "Supermercado Angeloni",
      "distance": 320,
      "distanceText": "320m",
      "lat": -27.5994,
      "lng": -48.5494,
      "rating": 4.5,
      "types": ["supermarket", "food", "store"]
    }
  ],
  "hospitals": [],
  "pharmacies": [],
  "banks": [],
  "restaurants": [],
  "transit_stations": [],
  "parks": []
}
```

**Implementação Técnica**:

1. **Backend** - Criar serviço `src/services/nearbyPlacesService.js`:
```javascript
// Usa Google Maps Places API (Nearby Search)
// https://developers.google.com/maps/documentation/places/web-service/search-nearby

async function fetchNearbyPlaces(lat, lng, radius = 2000) {
  const categories = {
    schools: 'school',
    supermarkets: 'supermarket',
    hospitals: 'hospital',
    pharmacies: 'pharmacy',
    banks: 'bank',
    restaurants: 'restaurant',
    transit_stations: 'transit_station',
    parks: 'park'
  };
  
  // Para cada categoria, buscar os 5 mais próximos
  // Calcular distância real entre coordenadas
  // Retornar JSON organizado
}
```

2. **Frontend** - Exibir no PropertyDetails:
   - Seção "📍 O que há por perto"
   - Mapa interativo mostrando imóvel + locais próximos
   - Lista com distância e rating de cada local
   - Filtros por categoria (Escolas, Supermercados, etc.)

3. **Admin Panel** - Ao cadastrar imóvel:
   - Após informar latitude/longitude
   - Botão "Buscar locais próximos" → chama API
   - Preview dos locais encontrados
   - Salva automaticamente no campo `nearbyPlaces`

**Categorias Google Maps Places API**:
- `school` - Escolas
- `supermarket` - Supermercados
- `hospital` - Hospitais
- `pharmacy` - Farmácias
- `bank` - Bancos
- `restaurant` - Restaurantes
- `transit_station` - Transporte público
- `park` - Parques
- `shopping_mall` - Shopping centers
- `gym` - Academias

---

## �📋 Campos Faltando / Sugestões de Melhoria

### ❌ Campos que podem estar faltando:

1. **`neighborhood` (String)** - Bairro do imóvel
   - Importante para filtros mais específicos
   - Exemplo: `"Lagoa da Conceição"`

2. **`parkingSpaces` (Int)** - Número de vagas de garagem
   - Atualmente só tem em amenities como texto
   - Exemplo: `2` (2 vagas)
   - Uso: Filtro de vagas

3. **`suites` (Int)** - Número de suítes
   - Diferente de quartos comuns
   - Exemplo: `1` (1 suíte)
   - Uso: Filtro de suítes

4. **`propertyCondition` (String)** - Estado do imóvel
   - Valores: `"Novo"`, `"Seminovo"`, `"Usado"`, `"Reformado"`
   - Uso: Filtro de condição

5. **`condoAmenities` (String - JSON)** - Amenidades do condomínio
   - Separar amenidades do imóvel das do condomínio
   - Exemplo: `["Piscina do Condomínio", "Salão de Festas", "Quadra"]`

6. **`condoFee` (Float)** - Valor do condomínio
   - Importante para decisão de compra/aluguel
   - Exemplo: `450.00`

7. **`iptu` (Float)** - Valor do IPTU anual ou mensal
   - Custos adicionais importantes
   - Exemplo: `1200.00` (anual)

8. **`floor` (Int)** - Andar do apartamento
   - Relevante para apartamentos
   - Exemplo: `5` (5º andar)

9. **`totalFloors` (Int)** - Total de andares do prédio
   - Contexto do imóvel
   - Exemplo: `12` (12 andares)

10. **`yearBuilt` (Int)** - Ano de construção
    - Idade do imóvel
    - Exemplo: `2018`

11. **`purpose` (String)** - Finalidade
    - Valores: `"Venda"`, `"Aluguel"`, `"Temporada"`, `"Venda e Aluguel"`
    - **IMPORTANTE**: Define como o imóvel será usado

12. **`orientation` (String)** - Orientação solar
    - Valores: `"Norte"`, `"Sul"`, `"Leste"`, `"Oeste"`, `"Nordeste"`, etc.
    - Relevante para conforto térmico

13. **`furnished` (Boolean)** - Se é mobiliado
    - Valores: `true` ou `false`
    - Uso: Filtro importante para temporada

14. **`availableFrom` (DateTime)** - Data de disponibilidade
    - Para aluguéis/temporada
    - Exemplo: `"2025-11-01T00:00:00.000Z"`

---

## 📊 Exemplo de Imóvel Completo (JSON)

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "userId": "123e4567-e89b-12d3-a456-426614174000",
  "title": "Apartamento Luxuoso Vista Mar - 3 Quartos",
  "description": "Apartamento completamente mobiliado com vista panorâmica para o mar. Localizado em condomínio de alto padrão com academia, piscina e área gourmet.",
  "type": "Apartamento",
  "price": 850000.00,
  "currency": "BRL",
  
  "address": "Rua das Flores, 123, Apto 501",
  "city": "Florianópolis",
  "state": "SC",
  "country": "Brasil",
  "zipCode": "88015-000",
  "latitude": -27.5954,
  "longitude": -48.5480,
  
  "area": 120,
  "beds": 3,
  "baths": 2,
  "guests": 6,
  "amenities": "[\"Piscina\", \"WiFi\", \"Ar-condicionado\", \"Churrasqueira\", \"Garagem\", \"Varanda\", \"Portaria 24h\"]",
  
  "images": "[\"https://exemplo.com/img1.jpg\", \"https://exemplo.com/img2.jpg\", \"https://exemplo.com/img3.jpg\"]",
  "mainImage": "https://exemplo.com/capa.jpg",
  
  "rating": 4.7,
  "reviewCount": 23,
  "viewCount": 154,
  
  "published": true,
  "featured": false,
  
  "createdAt": "2025-10-17T14:30:00.000Z",
  "updatedAt": "2025-10-17T15:45:00.000Z"
}
```

---

## 🎯 Próximos Passos

1. **Revisar campos faltantes** e decidir quais adicionar
2. **Padronizar valores** de campos como `type`, `state`, `amenities`
3. **Criar enums** para campos com valores fixos
4. **Atualizar schema do Prisma** com novos campos
5. **Migrar dados existentes** se necessário
6. **Atualizar formulários** de criação/edição de imóveis
7. **Atualizar filtros** na página de busca

---

## 📝 Notas Importantes

- ⚠️ **Campos obrigatórios** devem sempre ser validados
- 🔍 **Campos indexados** (`city`, `published`, `featured`) melhoram performance de busca
- 📍 **Latitude/Longitude** são essenciais para funcionalidade do mapa
- 🏷️ **Amenidades** devem ser padronizadas para facilitar filtros
- 💰 **Preço** deve ser armazenado sem formatação (apenas número)
- 📸 **Imagens** devem ter URLs válidas e acessíveis

---

**Criado em**: 17/10/2025  
**Versão**: 1.0  
**Autor**: Sistema VerdeMar
