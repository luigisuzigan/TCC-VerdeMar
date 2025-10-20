import { PrismaClient } from '@prisma/client';
import { updatePropertyNearbyPlaces } from '../services/nearbyPlacesService.js';

const prisma = new PrismaClient();

/**
 * Script para buscar locais próximos de todos os imóveis
 */
async function fetchAllNearbyPlaces() {
  try {
    console.log('🔍 Buscando locais próximos para todos os imóveis...\n');

    // Buscar imóveis com coordenadas
    const properties = await prisma.property.findMany({
      where: {
        AND: [
          { latitude: { not: null } },
          { longitude: { not: null } },
        ],
      },
      select: {
        id: true,
        title: true,
        city: true,
        neighborhood: true,
        latitude: true,
        longitude: true,
      },
    });

    console.log(`📊 Encontrados ${properties.length} imóveis com coordenadas\n`);

    if (properties.length === 0) {
      console.log('⚠️ Nenhum imóvel possui coordenadas para buscar locais próximos.');
      return;
    }

    let successCount = 0;
    let errorCount = 0;

    // Buscar locais para cada imóvel
    for (let i = 0; i < properties.length; i++) {
      const property = properties[i];
      console.log(`\n[${ i + 1}/${properties.length}] 🏠 ${property.title}`);
      console.log(`    📍 ${property.neighborhood || ''}, ${property.city}`);
      console.log(`    🌐 Lat: ${property.latitude}, Lng: ${property.longitude}`);

      try {
        const updated = await updatePropertyNearbyPlaces(prisma, property.id);
        
        console.log(`    📦 Dados retornados do update:`, typeof updated.nearbyPlaces);
        console.log(`    📝 Conteúdo (primeiros 200 caracteres):`, updated.nearbyPlaces?.substring(0, 200));
        
        const nearbyPlaces = JSON.parse(updated.nearbyPlaces || '{}');
        const totalPlaces = Object.values(nearbyPlaces).reduce(
          (sum, arr) => sum + arr.length,
          0
        );

        console.log(`    ✅ ${totalPlaces} locais encontrados`);
        
        // Mostrar resumo por categoria
        Object.entries(nearbyPlaces).forEach(([category, places]) => {
          if (places.length > 0) {
            const closest = places[0];
            console.log(`       • ${category}: ${places.length} (mais próximo: ${closest.distanceText})`);
          }
        });

        successCount++;
      } catch (error) {
        console.error(`    ❌ Erro: ${error.message}`);
        console.error(`    📋 Stack:`, error.stack);
        errorCount++;
      }

      // Aguardar 1 segundo entre requisições para não sobrecarregar a API
      if (i < properties.length - 1) {
        console.log('    ⏳ Aguardando 1 segundo...');
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    console.log('\n\n' + '='.repeat(60));
    console.log('📊 RESUMO FINAL');
    console.log('='.repeat(60));
    console.log(`✅ Imóveis atualizados: ${successCount}`);
    console.log(`❌ Erros: ${errorCount}`);
    console.log(`📍 Total de imóveis: ${properties.length}`);
    console.log('='.repeat(60));

    if (successCount > 0) {
      console.log('\n✨ Locais próximos buscados com sucesso!');
      console.log('Agora os imóveis têm dados REAIS do Google Maps.');
    }

  } catch (error) {
    console.error('❌ Erro ao buscar locais próximos:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Executar script
fetchAllNearbyPlaces()
  .then(() => {
    console.log('\n✨ Script finalizado!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Erro fatal:', error);
    process.exit(1);
  });
