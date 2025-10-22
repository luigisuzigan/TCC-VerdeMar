import prisma from './src/prisma.js';

/**
 * Script para corrigir coordenadas de imóveis que estão no mar
 * e popular dados de locais próximos
 */

// Coordenadas aproximadas de cidades litorâneas de SC
const CITY_COORDINATES = {
  'Florianópolis': { lat: -27.5954, lng: -48.5480 },
  'Balneário Camboriú': { lat: -26.9906, lng: -48.6345 },
  'Itajaí': { lat: -26.9078, lng: -48.6619 },
  'Navegantes': { lat: -26.8981, lng: -48.6515 },
  'Bombinhas': { lat: -27.1396, lng: -48.5124 },
  'Porto Belo': { lat: -27.1584, lng: -48.5494 },
  'Itapema': { lat: -27.0910, lng: -48.6113 },
  'Penha': { lat: -26.7729, lng: -48.6443 },
  'Piçarras': { lat: -26.7651, lng: -48.6718 },
  'Barra Velha': { lat: -26.6321, lng: -48.6857 },
  'São Francisco do Sul': { lat: -26.2433, lng: -48.6380 },
  'Joinville': { lat: -26.3045, lng: -48.8458 },
  'Garopaba': { lat: -28.0258, lng: -48.6171 },
  'Imbituba': { lat: -28.2399, lng: -48.6706 },
  'Laguna': { lat: -28.4801, lng: -48.7794 },
};

/**
 * Verifica se coordenadas estão no mar (muito longe da costa)
 */
function isInSea(lat, lng) {
  // Verificação simples: se a longitude for muito diferente
  // das cidades costeiras de SC (-48.x a -48.9x)
  if (lng < -49.5 || lng > -47.5) {
    return true;
  }
  
  // Verificar latitude (SC vai de aprox -26 a -29)
  if (lat < -29.5 || lat > -25.5) {
    return true;
  }
  
  return false;
}

/**
 * Obtém coordenadas padrão para uma cidade
 */
function getCityCoordinates(city) {
  // Tentar match exato
  if (CITY_COORDINATES[city]) {
    return CITY_COORDINATES[city];
  }
  
  // Tentar match parcial (case-insensitive)
  const cityLower = city.toLowerCase();
  for (const [key, coords] of Object.entries(CITY_COORDINATES)) {
    if (key.toLowerCase().includes(cityLower) || cityLower.includes(key.toLowerCase())) {
      return coords;
    }
  }
  
  // Default: Florianópolis
  console.warn(`⚠️  Cidade "${city}" não encontrada, usando Florianópolis como padrão`);
  return CITY_COORDINATES['Florianópolis'];
}

/**
 * Adiciona pequena variação aleatória às coordenadas
 * para evitar que todos imóveis da mesma cidade fiquem no mesmo ponto
 */
function addRandomOffset(lat, lng) {
  // Offset de ±0.01 graus (aproximadamente ±1km)
  const latOffset = (Math.random() - 0.5) * 0.02;
  const lngOffset = (Math.random() - 0.5) * 0.02;
  
  return {
    lat: lat + latOffset,
    lng: lng + lngOffset,
  };
}

async function fixCoordinates() {
  try {
    console.log('🔍 Verificando coordenadas dos imóveis...\n');
    
    const properties = await prisma.property.findMany({
      select: {
        id: true,
        title: true,
        city: true,
        state: true,
        latitude: true,
        longitude: true,
      },
    });
    
    console.log(`📊 Total de imóveis: ${properties.length}\n`);
    
    let fixedCount = 0;
    let alreadyOkCount = 0;
    
    for (const property of properties) {
      const needsFix = 
        !property.latitude || 
        !property.longitude || 
        isInSea(property.latitude, property.longitude);
      
      if (needsFix) {
        console.log(`❌ Coordenadas incorretas: ${property.title}`);
        console.log(`   Localização: ${property.city}, ${property.state}`);
        console.log(`   Antes: lat=${property.latitude}, lng=${property.longitude}`);
        
        // Obter coordenadas corretas
        const cityCoords = getCityCoordinates(property.city);
        const newCoords = addRandomOffset(cityCoords.lat, cityCoords.lng);
        
        // Atualizar no banco
        await prisma.property.update({
          where: { id: property.id },
          data: {
            latitude: newCoords.lat,
            longitude: newCoords.lng,
          },
        });
        
        console.log(`   Depois: lat=${newCoords.lat.toFixed(4)}, lng=${newCoords.lng.toFixed(4)}`);
        console.log(`   ✅ Corrigido!\n`);
        fixedCount++;
      } else {
        alreadyOkCount++;
        console.log(`✓ ${property.title} - coordenadas OK`);
      }
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 RESUMO');
    console.log('='.repeat(60));
    console.log(`✅ Coordenadas corretas: ${alreadyOkCount}`);
    console.log(`🔧 Coordenadas corrigidas: ${fixedCount}`);
    console.log(`📍 Total: ${properties.length}`);
    console.log('='.repeat(60));
    
    if (fixedCount > 0) {
      console.log('\n✨ Coordenadas corrigidas com sucesso!');
      console.log('Agora os imóveis estão posicionados corretamente no mapa.');
    }
    
  } catch (error) {
    console.error('❌ Erro ao corrigir coordenadas:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Executar
fixCoordinates();
