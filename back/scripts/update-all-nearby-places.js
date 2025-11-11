import prisma from '../src/prisma.js';
import { updatePropertyNearbyPlaces } from '../src/services/nearbyPlacesService.js';

async function updateAllNearbyPlaces() {
  try {
    console.log('🚀 Iniciando atualização de lugares próximos...');
    
    // Buscar todos os imóveis com coordenadas
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
        latitude: true,
        longitude: true,
        nearbyPlaces: true,
      },
    });

    console.log(`📊 Total de imóveis com coordenadas: ${properties.length}`);

    let updated = 0;
    let skipped = 0;
    let failed = 0;

    for (const property of properties) {
      try {
        // Verificar se já tem lugares próximos
        const hasNearbyPlaces = property.nearbyPlaces && property.nearbyPlaces !== '{}';
        
        if (hasNearbyPlaces) {
          console.log(`⏭️  Pulando ${property.id} - ${property.title} (já possui lugares próximos)`);
          skipped++;
          continue;
        }

        console.log(`\n🔍 Atualizando: ${property.title} (${property.city})`);
        console.log(`   Coordenadas: ${property.latitude}, ${property.longitude}`);

        await updatePropertyNearbyPlaces(prisma, property.id);
        
        console.log(`✅ Atualizado com sucesso!`);
        updated++;

        // Delay de 200ms entre requisições para não sobrecarregar a API
        await new Promise(resolve => setTimeout(resolve, 200));

      } catch (error) {
        console.error(`❌ Erro ao atualizar ${property.id}:`, error.message);
        failed++;
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 RESUMO:');
    console.log(`   ✅ Atualizados: ${updated}`);
    console.log(`   ⏭️  Pulados (já tinham): ${skipped}`);
    console.log(`   ❌ Falharam: ${failed}`);
    console.log('='.repeat(60));

  } catch (error) {
    console.error('❌ Erro geral:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateAllNearbyPlaces();
