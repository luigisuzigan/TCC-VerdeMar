import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function test() {
  try {
    console.log('🔍 Testando conexão com banco de dados...\n');
    
    const total = await prisma.property.count();
    console.log(`📊 Total de imóveis: ${total}\n`);

    if (total === 0) {
      console.log('❌ Nenhum imóvel encontrado no banco!');
      console.log('💡 Execute o seed: node src/scripts/seedProperties.js\n');
    } else {
      const properties = await prisma.property.findMany({
        take: 5,
        select: {
          id: true,
          title: true,
          type: true,
          price: true,
          city: true,
          published: true
        }
      });

      console.log('📋 Primeiros imóveis:\n');
      properties.forEach((p, i) => {
        console.log(`${i + 1}. ${p.title} - ${p.city} - R$ ${p.price} - ${p.published ? '✅' : '❌'}`);
      });
    }
  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

test();
