/**
 * Serviço de Geocoding usando Google Maps API
 */

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Debug: Verificar se a API Key está sendo carregada
console.log('🔑 Google Maps API Key carregada:', GOOGLE_MAPS_API_KEY ? '✅ SIM' : '❌ NÃO');
console.log('🔑 Primeiros caracteres:', GOOGLE_MAPS_API_KEY ? GOOGLE_MAPS_API_KEY.substring(0, 10) + '...' : 'undefined');

/**
 * Busca coordenadas (latitude e longitude) a partir de um endereço
 * @param {string} address - Endereço completo (Rua, Cidade, Estado, País)
 * @returns {Promise<{lat: number, lng: number}>}
 */
export async function getCoordinatesFromAddress(address) {
  console.log('📍 Iniciando busca de coordenadas para:', address);
  console.log('🔑 API Key disponível?', !!GOOGLE_MAPS_API_KEY);
  
  if (!GOOGLE_MAPS_API_KEY) {
    console.error('❌ VITE_GOOGLE_MAPS_API_KEY não encontrada no .env');
    throw new Error('Google Maps API Key não configurada. Configure VITE_GOOGLE_MAPS_API_KEY no .env');
  }

  if (!address || address.trim() === '') {
    throw new Error('Endereço não pode estar vazio');
  }

  try {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GOOGLE_MAPS_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK' && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng,
        formatted_address: data.results[0].formatted_address
      };
    } else if (data.status === 'ZERO_RESULTS') {
      throw new Error('Nenhuma coordenada encontrada para este endereço');
    } else if (data.status === 'REQUEST_DENIED') {
      throw new Error('Acesso negado à API do Google Maps. Verifique sua API Key.');
    } else if (data.status === 'INVALID_REQUEST') {
      throw new Error('Requisição inválida. Verifique o endereço informado.');
    } else {
      throw new Error(`Erro ao buscar coordenadas: ${data.status}`);
    }
  } catch (error) {
    console.error('Erro no serviço de geocoding:', error);
    throw error;
  }
}

/**
 * Busca endereço a partir de coordenadas (Reverse Geocoding)
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @returns {Promise<object>}
 */
export async function getAddressFromCoordinates(lat, lng) {
  if (!GOOGLE_MAPS_API_KEY) {
    throw new Error('Google Maps API Key não configurada');
  }

  if (!lat || !lng) {
    throw new Error('Latitude e longitude são obrigatórias');
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK' && data.results.length > 0) {
      const result = data.results[0];
      const addressComponents = result.address_components;

      // Extrair componentes do endereço
      const address = {
        formatted_address: result.formatted_address,
        street: '',
        neighborhood: '',
        city: '',
        state: '',
        country: '',
        zipCode: ''
      };

      addressComponents.forEach(component => {
        if (component.types.includes('route')) {
          address.street = component.long_name;
        }
        if (component.types.includes('sublocality') || component.types.includes('neighborhood')) {
          address.neighborhood = component.long_name;
        }
        if (component.types.includes('administrative_area_level_2') || component.types.includes('locality')) {
          address.city = component.long_name;
        }
        if (component.types.includes('administrative_area_level_1')) {
          address.state = component.short_name;
        }
        if (component.types.includes('country')) {
          address.country = component.long_name;
        }
        if (component.types.includes('postal_code')) {
          address.zipCode = component.long_name;
        }
      });

      return address;
    } else {
      throw new Error('Nenhum endereço encontrado para estas coordenadas');
    }
  } catch (error) {
    console.error('Erro no reverse geocoding:', error);
    throw error;
  }
}

/**
 * Valida se a API Key está configurada
 * @returns {boolean}
 */
export function isGoogleMapsConfigured() {
  return !!GOOGLE_MAPS_API_KEY && GOOGLE_MAPS_API_KEY !== '';
}
