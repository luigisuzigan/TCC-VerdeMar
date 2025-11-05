/**
 * Processa o campo images de uma propriedade
 * Lida com os casos: string JSON, array, ou undefined
 */
export function parsePropertyImages(property) {
  if (!property) return [];
  
  // Se images já é um array
  if (Array.isArray(property.images)) {
    return property.images;
  }
  
  // Se images é uma string JSON
  if (typeof property.images === 'string') {
    try {
      const parsed = JSON.parse(property.images);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  
  return [];
}

/**
 * Retorna a imagem principal de uma propriedade
 * Prioriza mainImage, depois primeira imagem do array
 */
export function getPropertyMainImage(property, fallback = '/placeholder.svg') {
  if (!property) return fallback;
  
  // 1. Priorizar mainImage se existir
  if (property.mainImage && typeof property.mainImage === 'string' && property.mainImage.trim()) {
    return property.mainImage;
  }
  
  // 2. Tentar pegar primeira imagem do array
  const images = parsePropertyImages(property);
  if (images.length > 0 && images[0]) {
    return images[0];
  }
  
  // 3. Usar fallback
  return fallback;
}

/**
 * Processa todas as imagens de uma lista de propriedades
 * Útil para normalizar dados vindos da API
 */
export function normalizePropertyImages(properties) {
  if (!Array.isArray(properties)) return [];
  
  return properties.map(property => ({
    ...property,
    images: parsePropertyImages(property),
    mainImage: getPropertyMainImage(property, property.mainImage)
  }));
}
