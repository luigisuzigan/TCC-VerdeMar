/**
 * Utilitários para trabalhar com filtros de busca de imóveis
 */

/**
 * Converte os query params da URL em objeto de filtros
 * @param {URLSearchParams} searchParams - Parâmetros da URL
 * @returns {Object} Objeto com os filtros
 */
export function parseFiltersFromUrl(searchParams) {
  const filters = {};

  // Tipos de imóveis
  const types = searchParams.get('types');
  if (types) {
    filters.propertyTypes = types.split(',');
  }

  // Localização
  const location = searchParams.get('location');
  if (location) {
    filters.location = location;
  }

  // Preço
  const priceMin = searchParams.get('priceMin');
  const priceMax = searchParams.get('priceMax');
  if (priceMin) filters.priceMin = Number(priceMin);
  if (priceMax) filters.priceMax = Number(priceMax);

  // Área Construída
  const areaMin = searchParams.get('areaMin');
  const areaMax = searchParams.get('areaMax');
  if (areaMin) filters.areaMin = Number(areaMin);
  if (areaMax) filters.areaMax = Number(areaMax);

  // Área Total
  const totalAreaMin = searchParams.get('totalAreaMin');
  const totalAreaMax = searchParams.get('totalAreaMax');
  if (totalAreaMin) filters.totalAreaMin = Number(totalAreaMin);
  if (totalAreaMax) filters.totalAreaMax = Number(totalAreaMax);

  // Quartos
  const bedrooms = searchParams.get('bedrooms');
  if (bedrooms) filters.bedrooms = Number(bedrooms);

  // Banheiros
  const bathrooms = searchParams.get('bathrooms');
  if (bathrooms) filters.bathrooms = Number(bathrooms);

  // Vagas
  const parking = searchParams.get('parking');
  if (parking) filters.parkingSpaces = Number(parking);

  // Suítes
  const suites = searchParams.get('suites');
  if (suites) filters.suites = Number(suites);

  // Comodidades
  const amenities = searchParams.get('amenities');
  if (amenities) {
    filters.amenities = amenities.split(',');
  }

  // Comodidades do condomínio
  const condoAmenities = searchParams.get('condoAmenities');
  if (condoAmenities) {
    filters.condoAmenities = condoAmenities.split(',');
  }

  // Condições Naturais
  const naturalConditions = searchParams.get('naturalConditions');
  if (naturalConditions) {
    filters.naturalConditions = naturalConditions.split(',');
  }

  // Condição do imóvel
  const condition = searchParams.get('condition');
  if (condition) {
    filters.propertyCondition = condition;
  }

  // Estilos
  const styles = searchParams.get('style') || searchParams.get('styles');
  if (styles) {
    filters.styles = styles.split(',');
  }

  return filters;
}

/**
 * Converte objeto de filtros em query params para a URL
 * @param {Object} filters - Objeto com os filtros
 * @returns {URLSearchParams} Query params
 */
export function filtersToUrlParams(filters) {
  const params = new URLSearchParams();

  if (filters.propertyTypes?.length > 0) {
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
  if (filters.areaMin) {
    params.append('areaMin', filters.areaMin);
  }
  if (filters.areaMax) {
    params.append('areaMax', filters.areaMax);
  }
  if (filters.totalAreaMin) {
    params.append('totalAreaMin', filters.totalAreaMin);
  }
  if (filters.totalAreaMax) {
    params.append('totalAreaMax', filters.totalAreaMax);
  }
  if (filters.bedrooms) {
    params.append('bedrooms', filters.bedrooms);
  }
  if (filters.bathrooms) {
    params.append('bathrooms', filters.bathrooms);
  }
  if (filters.parkingSpaces !== null && filters.parkingSpaces !== undefined) {
    params.append('parking', filters.parkingSpaces);
  }
  if (filters.suites !== null && filters.suites !== undefined) {
    params.append('suites', filters.suites);
  }
  if (filters.amenities?.length > 0) {
    params.append('amenities', filters.amenities.join(','));
  }
  if (filters.condoAmenities?.length > 0) {
    params.append('condoAmenities', filters.condoAmenities.join(','));
  }
  if (filters.naturalConditions?.length > 0) {
    params.append('naturalConditions', filters.naturalConditions.join(','));
  }
  if (filters.propertyCondition) {
    params.append('condition', filters.propertyCondition);
  }
  if (filters.styles?.length > 0) {
    params.append('styles', filters.styles.join(','));
  }

  return params;
}

/**
 * Gera uma descrição legível dos filtros aplicados
 * @param {Object} filters - Objeto com os filtros
 * @returns {Array<string>} Array com descrições dos filtros
 */
export function getFilterDescriptions(filters) {
  const descriptions = [];

  if (filters.propertyTypes?.length > 0) {
    const typeLabels = {
      casa: 'Casa',
      apartamento: 'Apartamento',
      cobertura: 'Cobertura',
      terreno: 'Terreno',
      kitnet: 'Kitnet',
      sobrado: 'Sobrado',
      chacara: 'Chácara',
      comercial: 'Comercial',
      loft: 'Loft',
    };
    const types = filters.propertyTypes.map(id => typeLabels[id] || id).join(', ');
    descriptions.push(`Tipo: ${types}`);
  }

  if (filters.location) {
    descriptions.push(`Local: ${filters.location}`);
  }

  if (filters.priceMin || filters.priceMax) {
    const formatPrice = (value) => {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
      }).format(value);
    };

    if (filters.priceMin && filters.priceMax) {
      descriptions.push(`Preço: ${formatPrice(filters.priceMin)} - ${formatPrice(filters.priceMax)}`);
    } else if (filters.priceMin) {
      descriptions.push(`Preço: Acima de ${formatPrice(filters.priceMin)}`);
    } else {
      descriptions.push(`Preço: Até ${formatPrice(filters.priceMax)}`);
    }
  }

  if (filters.areaMin || filters.areaMax) {
    if (filters.areaMin && filters.areaMax) {
      descriptions.push(`Área Construída: ${filters.areaMin} - ${filters.areaMax} m²`);
    } else if (filters.areaMin) {
      descriptions.push(`Área Construída: Acima de ${filters.areaMin} m²`);
    } else {
      descriptions.push(`Área Construída: Até ${filters.areaMax} m²`);
    }
  }

  if (filters.totalAreaMin || filters.totalAreaMax) {
    if (filters.totalAreaMin && filters.totalAreaMax) {
      descriptions.push(`Área Total: ${filters.totalAreaMin} - ${filters.totalAreaMax} m²`);
    } else if (filters.totalAreaMin) {
      descriptions.push(`Área Total: Acima de ${filters.totalAreaMin} m²`);
    } else {
      descriptions.push(`Área Total: Até ${filters.totalAreaMax} m²`);
    }
  }

  if (filters.bedrooms) {
    descriptions.push(`${filters.bedrooms}+ quartos`);
  }

  if (filters.bathrooms) {
    descriptions.push(`${filters.bathrooms}+ banheiros`);
  }

  if (filters.parkingSpaces !== null && filters.parkingSpaces !== undefined) {
    descriptions.push(`${filters.parkingSpaces}${filters.parkingSpaces > 0 ? '+' : ''} vagas`);
  }

  if (filters.suites) {
    descriptions.push(`${filters.suites}+ suítes`);
  }

  if (filters.amenities?.length > 0) {
    if (filters.amenities.length === 1) {
      descriptions.push(`Comodidade: ${filters.amenities[0]}`);
    } else {
      descriptions.push(`${filters.amenities.length} comodidades`);
    }
  }

  if (filters.naturalConditions?.length > 0) {
    if (filters.naturalConditions.length === 1) {
      descriptions.push(`Natureza: ${filters.naturalConditions[0]}`);
    } else {
      descriptions.push(`${filters.naturalConditions.length} condições naturais`);
    }
  }

  if (filters.styles?.length > 0) {
    if (filters.styles.length === 1) {
      descriptions.push(`Estilo: ${filters.styles[0]}`);
    } else {
      descriptions.push(`${filters.styles.length} estilos`);
    }
  }

  return descriptions;
}

/**
 * Conta quantos filtros estão ativos
 * @param {Object} filters - Objeto com os filtros
 * @returns {number} Número de filtros ativos
 */
export function countActiveFilters(filters) {
  let count = 0;

  if (filters.propertyTypes?.length > 0) count++;
  if (filters.location) count++;
  if (filters.priceMin || filters.priceMax) count++;
  if (filters.areaMin || filters.areaMax) count++;
  if (filters.totalAreaMin || filters.totalAreaMax) count++;
  if (filters.bedrooms) count++;
  if (filters.bathrooms) count++;
  if (filters.parkingSpaces !== null && filters.parkingSpaces !== undefined) count++;
  if (filters.suites !== null && filters.suites !== undefined) count++;
  if (filters.amenities?.length > 0) count++;
  if (filters.condoAmenities?.length > 0) count++;
  if (filters.naturalConditions?.length > 0) count++;
  if (filters.propertyCondition) count++;
  if (filters.styles?.length > 0) count++;

  return count;
}

/**
 * Limpa todos os filtros
 * @returns {Object} Objeto de filtros vazio
 */
export function clearAllFilters() {
  return {
    propertyTypes: [],
    location: '',
    priceMin: '',
    priceMax: '',
    areaMin: '',
    areaMax: '',
    totalAreaMin: '',
    totalAreaMax: '',
    bedrooms: null,
    bathrooms: null,
    parkingSpaces: null,
    suites: null,
    amenities: [],
    condoAmenities: [],
    naturalConditions: [],
    propertyCondition: '',
    styles: [],
  };
}
