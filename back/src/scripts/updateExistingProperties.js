import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Script para atualizar os 6 imóveis existentes com os novos campos
 */
async function updateExistingProperties() {
  try {
    console.log('🔄 Buscando imóveis existentes...\n');

    // Buscar todos os imóveis
    const properties = await prisma.property.findMany({
      select: {
        id: true,
        title: true,
        type: true,
        city: true,
        beds: true,
        baths: true,
        latitude: true,
        longitude: true,
      },
    });

    console.log(`📊 Encontrados ${properties.length} imóveis\n`);

    // Dados padrão para atualização
    const updates = [
      // Imóvel 1 - Apartamento moderno
      {
        category: 'Residencial',
        neighborhood: 'Lagoa da Conceição',
        suites: 1,
        parkingSpaces: 2,
        condoFee: 450.0,
        iptu: 1200.0,
        floor: 5,
        totalFloors: 12,
        yearBuilt: 2020,
        propertyCondition: 'Seminovo',
      },
      // Imóvel 2 - Casa na praia
      {
        category: 'Residencial',
        neighborhood: 'Jurerê Internacional',
        suites: 2,
        parkingSpaces: 3,
        condoFee: 800.0,
        iptu: 2500.0,
        floor: null,
        totalFloors: null,
        yearBuilt: 2018,
        propertyCondition: 'Usado',
      },
      // Imóvel 3 - Cobertura luxo
      {
        category: 'Residencial',
        neighborhood: 'Barra da Lagoa',
        suites: 3,
        parkingSpaces: 4,
        condoFee: 1200.0,
        iptu: 3500.0,
        floor: 10,
        totalFloors: 10,
        yearBuilt: 2022,
        propertyCondition: 'Novo',
      },
      // Imóvel 4 - Apartamento econômico
      {
        category: 'Residencial',
        neighborhood: 'Canasvieiras',
        suites: 0,
        parkingSpaces: 1,
        condoFee: 250.0,
        iptu: 600.0,
        floor: 3,
        totalFloors: 8,
        yearBuilt: 2015,
        propertyCondition: 'Usado',
      },
      // Imóvel 5 - Casa térrea
      {
        category: 'Residencial',
        neighborhood: 'Campeche',
        suites: 1,
        parkingSpaces: 2,
        condoFee: null,
        iptu: 1500.0,
        floor: null,
        totalFloors: null,
        yearBuilt: 2019,
        propertyCondition: 'Seminovo',
      },
      // Imóvel 6 - Apartamento compacto
      {
        category: 'Residencial',
        neighborhood: 'Centro',
        suites: 0,
        parkingSpaces: 1,
        condoFee: 300.0,
        iptu: 800.0,
        floor: 7,
        totalFloors: 15,
        yearBuilt: 2021,
        propertyCondition: 'Novo',
      },
    ];

    // Atualizar cada imóvel
    for (let i = 0; i < properties.length && i < updates.length; i++) {
      const property = properties[i];
      const updateData = updates[i];

      console.log(`\n🏠 Atualizando: ${property.title}`);
      console.log(`   ID: ${property.id}`);
      console.log(`   Cidade: ${property.city}`);

      await prisma.property.update({
        where: { id: property.id },
        data: updateData,
      });

      console.log(`   ✅ Atualizado com:`);
      console.log(`      • Categoria: ${updateData.category}`);
      console.log(`      • Bairro: ${updateData.neighborhood}`);
      console.log(`      • Suítes: ${updateData.suites}`);
      console.log(`      • Vagas: ${updateData.parkingSpaces}`);
      console.log(`      • Condomínio: R$ ${updateData.condoFee || 'N/A'}`);
      console.log(`      • IPTU: R$ ${updateData.iptu}`);
      console.log(`      • Ano: ${updateData.yearBuilt}`);
      console.log(`      • Condição: ${updateData.propertyCondition}`);
    }

    console.log('\n\n✅ Todos os imóveis foram atualizados com sucesso!');
    console.log('\n📋 Resumo:');
    console.log(`   • ${properties.length} imóveis atualizados`);
    console.log('   • Novos campos adicionados: category, neighborhood, suites, parkingSpaces');
    console.log('   • Campos de condomínio: condoFee, iptu');
    console.log('   • Características: floor, totalFloors, yearBuilt, propertyCondition');

    console.log('\n\n🗺️ Próximo passo: Buscar locais próximos reais');
    console.log('   Execute: node src/scripts/fetchNearbyPlaces.js');
    
  } catch (error) {
    console.error('❌ Erro ao atualizar imóveis:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Executar script
updateExistingProperties()
  .then(() => {
    console.log('\n✨ Script finalizado com sucesso!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Erro fatal:', error);
    process.exit(1);
  });
