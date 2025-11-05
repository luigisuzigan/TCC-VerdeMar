import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testProperties() {
  try {
    console.log('🔍 Testando conexão com banco...\n');
    
    // Contar total de propriedades
    const total = await prisma.property.count();
    console.log(`📊 Total de imóveis no banco: ${total}`);
    
    // Contar publicados
    const published = await prisma.property.count({ where: { published: true } });
    console.log(`✅ Imóveis publicados: ${published}`);
    
    // Contar não publicados
    const unpublished = await prisma.property.count({ where: { published: false } });
    console.log(`❌ Imóveis não publicados: ${unpublished}`);
    
    // Listar primeiros 3 imóveis
    console.log('\n📋 Primeiros 3 imóveis:');
    const properties = await prisma.property.findMany({
      take: 3,
      select: {
        id: true,
        title: true,
        city: true,
        published: true,
        price: true
      }
    });
    
    properties.forEach((prop, idx) => {
      console.log(`\n${idx + 1}. ${prop.title}`);
      console.log(`   ID: ${prop.id}`);
      console.log(`   Cidade: ${prop.city}`);
      console.log(`   Preço: R$ ${prop.price}`);
      console.log(`   Publicado: ${prop.published ? '✅ Sim' : '❌ Não'}`);
    });
    
    // Testar query com filtro published
    console.log('\n🔍 Testando query com published=true:');
    const publishedProps = await prisma.property.findMany({
      where: { published: true },
      take: 5,
      select: { id: true, title: true, city: true }
    });
    console.log(`Encontrados: ${publishedProps.length} imóveis`);
    publishedProps.forEach(p => console.log(`  - ${p.title} (${p.city})`));
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testProperties();
