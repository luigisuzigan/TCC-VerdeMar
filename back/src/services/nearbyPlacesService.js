import axios from 'axios';

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
        key: GOOGLE_PLACES_API_KEY,
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
  if (!GOOGLE_PLACES_API_KEY) {
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

export {
  fetchNearbyPlaces,
  updatePropertyNearbyPlaces,
  PLACE_CATEGORIES,
};
