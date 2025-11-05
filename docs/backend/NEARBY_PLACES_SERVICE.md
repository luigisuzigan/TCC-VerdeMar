# 🗺️ Google Maps Places API - Locais Próximos

## 📝 Visão Geral

Este serviço busca locais reais próximos a um imóvel usando a **Google Maps Places API (Nearby Search)**. Os dados são salvos no campo `nearbyPlaces` do imóvel e exibidos na página de detalhes.

---

## 🔧 Configuração

### 1. Obter API Key do Google Maps

1. Acesse: https://console.cloud.google.com/
2. Crie um projeto ou selecione um existente
3. Ative as APIs:
   - **Places API** (NEW) - https://developers.google.com/maps/documentation/places/web-service
   - **Maps JavaScript API** (para frontend)
4. Crie uma chave de API em "Credenciais"
5. Restrinja a chave:
   - Tipo: Chave de API
   - Restrição de aplicativo: Endereços IP (seu servidor backend)
   - Restrição de API: Places API

### 2. Configurar Variável de Ambiente

Adicione no arquivo `.env` do backend:

```env
GOOGLE_MAPS_API_KEY=sua_chave_aqui
```

---

## 📦 Instalação

```bash
cd back
npm install axios
```

---

## 🚀 Implementação

### Arquivo: `back/src/services/nearbyPlacesService.js`

```javascript
const axios = require('axios');

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const GOOGLE_PLACES_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

/**
 * Categorias de locais e seus tipos do Google Maps
 */
const PLACE_CATEGORIES = {
  schools: { type: 'school', maxResults: 5, radius: 2000 },
  supermarkets: { type: 'supermarket', maxResults: 5, radius: 2000 },
  hospitals: { type: 'hospital', maxResults: 3, radius: 3000 },
  pharmacies: { type: 'pharmacy', maxResults: 5, radius: 1500 },
  banks: { type: 'bank', maxResults: 5, radius: 2000 },
  restaurants: { type: 'restaurant', maxResults: 5, radius: 1000 },
  transit_stations: { type: 'transit_station', maxResults: 5, radius: 1000 },
  parks: { type: 'park', maxResults: 3, radius: 2000 },
  shopping_malls: { type: 'shopping_mall', maxResults: 3, radius: 5000 },
  gyms: { type: 'gym', maxResults: 3, radius: 2000 },
};

/**
 * Calcula distância entre duas coordenadas (fórmula de Haversine)
 * @param {number} lat1 - Latitude ponto 1
 * @param {number} lon1 - Longitude ponto 1
 * @param {number} lat2 - Latitude ponto 2
 * @param {number} lon2 - Longitude ponto 2
 * @returns {number} Distância em metros
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Raio da Terra em metros
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c); // Distância em metros
}

/**
 * Formata distância para exibição
 * @param {number} meters - Distância em metros
 * @returns {string} Distância formatada (ex: "500m" ou "1.2km")
 */
function formatDistance(meters) {
  if (meters < 1000) {
    return `${meters}m`;
  }
  return `${(meters / 1000).toFixed(1)}km`;
}

/**
 * Busca locais próximos de uma categoria específica
 * @param {number} lat - Latitude do imóvel
 * @param {number} lng - Longitude do imóvel
 * @param {string} category - Categoria (schools, supermarkets, etc.)
 * @returns {Promise<Array>} Array de locais encontrados
 */
async function fetchPlacesByCategory(lat, lng, category) {
  const config = PLACE_CATEGORIES[category];
  if (!config) {
    throw new Error(`Categoria inválida: ${category}`);
  }

  try {
    const response = await axios.get(GOOGLE_PLACES_URL, {
      params: {
        location: `${lat},${lng}`,
        radius: config.radius,
        type: config.type,
        key: GOOGLE_MAPS_API_KEY,
        language: 'pt-BR',
      },
    });

    if (response.data.status !== 'OK' && response.data.status !== 'ZERO_RESULTS') {
      console.error(`Erro ao buscar ${category}:`, response.data.status);
      return [];
    }

    const places = response.data.results || [];
    
    // Processar e ordenar por distância
    const processedPlaces = places
      .map(place => {
        const distance = calculateDistance(
          lat,
          lng,
          place.geometry.location.lat,
          place.geometry.location.lng
        );

        return {
          placeId: place.place_id,
          name: place.name,
          distance: distance,
          distanceText: formatDistance(distance),
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng,
          rating: place.rating || null,
          userRatingsTotal: place.user_ratings_total || 0,
          vicinity: place.vicinity || '',
          types: place.types || [],
        };
      })
      .sort((a, b) => a.distance - b.distance)
      .slice(0, config.maxResults);

    return processedPlaces;
  } catch (error) {
    console.error(`Erro ao buscar ${category}:`, error.message);
    return [];
  }
}

/**
 * Busca todos os locais próximos ao imóvel
 * @param {number} lat - Latitude do imóvel
 * @param {number} lng - Longitude do imóvel
 * @returns {Promise<Object>} Objeto com todas as categorias de locais
 */
async function fetchNearbyPlaces(lat, lng) {
  if (!GOOGLE_MAPS_API_KEY) {
    console.error('GOOGLE_MAPS_API_KEY não configurada');
    return {};
  }

  if (!lat || !lng) {
    throw new Error('Latitude e longitude são obrigatórias');
  }

  console.log(`🔍 Buscando locais próximos a (${lat}, ${lng})`);

  const categories = Object.keys(PLACE_CATEGORIES);
  const results = {};

  // Buscar todas as categorias em paralelo
  const promises = categories.map(async (category) => {
    const places = await fetchPlacesByCategory(lat, lng, category);
    results[category] = places;
    console.log(`✓ ${category}: ${places.length} encontrados`);
  });

  await Promise.all(promises);

  return results;
}

/**
 * Atualiza locais próximos de um imóvel (chama API e salva no DB)
 * @param {Object} prisma - Cliente Prisma
 * @param {number} propertyId - ID do imóvel
 * @returns {Promise<Object>} Dados atualizados do imóvel
 */
async function updatePropertyNearbyPlaces(prisma, propertyId) {
  // Buscar imóvel
  const property = await prisma.property.findUnique({
    where: { id: propertyId },
    select: { latitude: true, longitude: true },
  });

  if (!property) {
    throw new Error(`Imóvel #${propertyId} não encontrado`);
  }

  if (!property.latitude || !property.longitude) {
    throw new Error(`Imóvel #${propertyId} não possui coordenadas`);
  }

  // Buscar locais próximos
  const nearbyPlaces = await fetchNearbyPlaces(property.latitude, property.longitude);

  // Atualizar no banco
  const updated = await prisma.property.update({
    where: { id: propertyId },
    data: {
      nearbyPlaces: JSON.stringify(nearbyPlaces),
    },
  });

  return updated;
}

module.exports = {
  fetchNearbyPlaces,
  updatePropertyNearbyPlaces,
};
```

---

## 🛣️ Rotas da API

### Adicionar em `back/src/properties/routes.js`:

```javascript
const { updatePropertyNearbyPlaces } = require('../services/nearbyPlacesService');

// POST /api/properties/:id/nearby-places
// Atualiza locais próximos de um imóvel
router.post('/:id/nearby-places', requireAuth, async (req, res) => {
  try {
    const propertyId = parseInt(req.params.id);
    
    // Verificar se usuário tem permissão (admin ou dono do imóvel)
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      select: { userId: true },
    });

    if (!property) {
      return res.status(404).json({ message: 'Imóvel não encontrado' });
    }

    if (req.user.role !== 'admin' && req.user.id !== property.userId) {
      return res.status(403).json({ message: 'Sem permissão' });
    }

    // Atualizar locais próximos
    const updated = await updatePropertyNearbyPlaces(prisma, propertyId);
    
    res.json({
      message: 'Locais próximos atualizados com sucesso',
      nearbyPlaces: JSON.parse(updated.nearbyPlaces || '{}'),
    });
  } catch (error) {
    console.error('Erro ao atualizar locais próximos:', error);
    res.status(500).json({ message: error.message });
  }
});
```

---

## 🎨 Frontend - Exibição

### Página de Detalhes do Imóvel:

```jsx
// PropertyDetails.jsx
import { useState, useEffect } from 'react';

function NearbyPlacesSection({ propertyId, nearbyPlaces }) {
  const [selectedCategory, setSelectedCategory] = useState('schools');
  
  const categories = {
    schools: { label: 'Escolas', icon: '🏫' },
    supermarkets: { label: 'Supermercados', icon: '🛒' },
    hospitals: { label: 'Hospitais', icon: '🏥' },
    pharmacies: { label: 'Farmácias', icon: '💊' },
    banks: { label: 'Bancos', icon: '🏦' },
    restaurants: { label: 'Restaurantes', icon: '🍽️' },
    transit_stations: { label: 'Transporte', icon: '🚌' },
    parks: { label: 'Parques', icon: '🌳' },
  };

  const places = nearbyPlaces ? JSON.parse(nearbyPlaces) : {};
  const selectedPlaces = places[selectedCategory] || [];

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">📍 O que há por perto</h2>
      
      {/* Filtros de categoria */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-4">
        {Object.entries(categories).map(([key, cat]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
              selectedCategory === key
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      {/* Lista de locais */}
      <div className="space-y-3">
        {selectedPlaces.length === 0 ? (
          <p className="text-slate-600">Nenhum local encontrado nesta categoria.</p>
        ) : (
          selectedPlaces.map((place, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
              <div className="flex-1">
                <div className="font-semibold text-slate-900">{place.name}</div>
                <div className="text-sm text-slate-600">{place.vicinity}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-blue-600">{place.distanceText}</div>
                {place.rating && (
                  <div className="text-sm text-slate-600">⭐ {place.rating}</div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
```

### Painel Admin - Botão de Atualizar:

```jsx
// Admin/Properties/EditProperty.jsx
async function handleUpdateNearbyPlaces() {
  try {
    setLoading(true);
    const response = await api.post(`/properties/${propertyId}/nearby-places`);
    alert('Locais próximos atualizados!');
    // Recarregar dados do imóvel
  } catch (error) {
    alert('Erro ao atualizar locais próximos');
  } finally {
    setLoading(false);
  }
}

// No formulário:
<button
  onClick={handleUpdateNearbyPlaces}
  className="px-4 py-2 bg-green-600 text-white rounded-lg"
>
  🔄 Buscar Locais Próximos (Google Maps)
</button>
```

---

## 💰 Custos da API

- **Places API (Nearby Search)**: $32 por 1.000 requisições
- **Exemplo**: 8 categorias x 100 imóveis = 800 requisições = ~$25
- **Recomendação**: Cachear resultados, atualizar apenas quando imóvel for editado

---

## 📚 Referências

- [Google Places API - Nearby Search](https://developers.google.com/maps/documentation/places/web-service/search-nearby)
- [Place Types](https://developers.google.com/maps/documentation/places/web-service/supported_types)
- [Pricing](https://developers.google.com/maps/billing-and-pricing/pricing)

---

**Criado em**: 17/10/2025  
**VerdeMar Real Estate Platform**
