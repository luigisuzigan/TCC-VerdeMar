import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkImages() {
  try {
    console.log('🔍 Verificando imagens dos imóveis...\n');

    const properties = await prisma.property.findMany({
      take: 3
    });

    properties.forEach((prop, idx) => {
      console.log(`\n${idx + 1}. ${prop.title}`);
      console.log(`   ID: ${prop.id}`);
      console.log(`   Images (raw):`, prop.images);
      console.log(`   Images (tipo):`, typeof prop.images);
      
      // Tentar parsear se for string
      if (typeof prop.images === 'string') {
        try {
          const parsed = JSON.parse(prop.images);
          console.log(`   Images (parsed):`, parsed);
          console.log(`   Primeira imagem:`, parsed[0]);
        } catch (e) {
          console.log(`   ❌ Erro ao parsear:`, e.message);
        }
      }
    });
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkImages();
