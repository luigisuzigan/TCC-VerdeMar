import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkProperties() {
  console.log('🔍 Verificando imóveis no banco de dados...\n');

  try {
    const total = await prisma.property.count();
    console.log(`📊 Total de imóveis: ${total}\n`);

    if (total === 0) {
      console.log('❌ Nenhum imóvel encontrado no banco!');
      console.log('💡 Execute: node src/scripts/seedProperties.js\n');
    } else {
      const properties = await prisma.property.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' }
      });

      console.log('📋 Imóveis encontrados:\n');
      properties.forEach((p, i) => {
        console.log(`${i + 1}. ${p.title}`);
        console.log(`   ID: ${p.id}`);
        console.log(`   Tipo: ${p.type}`);
        console.log(`   Preço: R$ ${p.price.toLocaleString('pt-BR')}`);
        console.log(`   Cidade: ${p.city}`);
        console.log(`   Publicado: ${p.published ? '✅ Sim' : '❌ Não'}`);
        console.log('');
      });

      const published = await prisma.property.count({ where: { published: true } });
      console.log(`✅ Imóveis publicados: ${published}`);
      console.log(`❌ Imóveis não publicados: ${total - published}`);
    }

  } catch (error) {
    console.error('❌ Erro ao verificar imóveis:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkProperties();
