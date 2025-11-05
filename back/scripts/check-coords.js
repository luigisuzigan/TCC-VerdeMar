// Script para verificar coordenadas das propriedades
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkCoordinates() {
  try {
    console.log('🔍 Verificando coordenadas das propriedades...\n');
    
    const properties = await prisma.property.findMany({
      where: { published: true },
      select: {
        id: true,
        title: true,
        latitude: true,
        longitude: true,
        price: true,
      },
      take: 10,
    });
    
    console.log(`📊 Total de propriedades publicadas: ${properties.length}\n`);
    
    const withCoords = properties.filter(p => p.latitude && p.longitude);
    const withoutCoords = properties.filter(p => !p.latitude || !p.longitude);
    
    console.log(`✅ Com coordenadas: ${withCoords.length}`);
    console.log(`❌ Sem coordenadas: ${withoutCoords.length}\n`);
    
    if (withCoords.length > 0) {
      console.log('📍 Primeiras propriedades COM coordenadas:');
      withCoords.slice(0, 5).forEach(p => {
        console.log(`  - ${p.title}`);
        console.log(`    Lat: ${p.latitude}, Lng: ${p.longitude}`);
        console.log(`    Preço: R$ ${p.price?.toLocaleString('pt-BR') || 'N/A'}\n`);
      });
    }
    
    if (withoutCoords.length > 0) {
      console.log('⚠️  Propriedades SEM coordenadas:');
      withoutCoords.forEach(p => {
        console.log(`  - ${p.title} (ID: ${p.id})`);
      });
    }
    
    await prisma.$disconnect();
  } catch (error) {
    console.error('❌ Erro:', error);
    process.exit(1);
  }
}

checkCoordinates();
