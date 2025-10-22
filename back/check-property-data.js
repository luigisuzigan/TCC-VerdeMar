import prisma from './src/prisma.js';

async function checkProperty() {
  try {
    const properties = await prisma.property.findMany({ take: 3 });
    
    console.log('\n=== VERIFICAÇÃO DE PROPRIEDADES ===\n');
    
    properties.forEach((p, idx) => {
      console.log(`\n--- Propriedade ${idx + 1}: ${p.title} ---`);
      console.log(`ID: ${p.id}`);
      console.log(`Cidade: ${p.city}, ${p.state || p.country}`);
      console.log(`Latitude: ${p.latitude}`);
      console.log(`Longitude: ${p.longitude}`);
      console.log(`NearbyPlaces: ${p.nearbyPlaces ? (p.nearbyPlaces === '{}' ? 'Vazio ({})' : 'Tem dados') : 'null'}`);
      
      if (p.nearbyPlaces && p.nearbyPlaces !== '{}') {
        try {
          const parsed = JSON.parse(p.nearbyPlaces);
          const categories = Object.keys(parsed);
          console.log(`Categorias: ${categories.join(', ')}`);
          categories.forEach(cat => {
            console.log(`  - ${cat}: ${parsed[cat]?.length || 0} locais`);
          });
        } catch (e) {
          console.log('Erro ao parsear nearbyPlaces:', e.message);
        }
      }
    });
    
  } catch (error) {
    console.error('Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkProperty();
