import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateTestImages() {
  try {
    console.log('🖼️  Atualizando imagens de teste dos imóveis...\n');

    // Array com as 10 imagens de teste (TesteImóvel1 é a principal)
    const testImages = [
      '/Teste/TesteImóvel1.webp',  // Principal
      '/Teste/TesteImóvel2.webp',
      '/Teste/TesteImóvel3.webp',
      '/Teste/TesteImóvel4.webp',
      '/Teste/TesteImóvel5.webp',
      '/Teste/TesteImóvel6.webp',
      '/Teste/TesteImóvel7.webp',
      '/Teste/TesteImóvel8.webp',
      '/Teste/TesteImóvel9.webp',
      '/Teste/TesteImóvel10.webp'
    ];

    // Buscar todos os imóveis
    const properties = await prisma.property.findMany();
    
    console.log(`📊 Total de imóveis encontrados: ${properties.length}\n`);

    if (properties.length === 0) {
      console.log('⚠️  Nenhum imóvel encontrado no banco de dados.');
      console.log('💡 Execute primeiro: npm run seed');
      return;
    }

    // Atualizar cada imóvel com as mesmas 10 fotos
    let updated = 0;
    for (const property of properties) {
      await prisma.property.update({
        where: { id: property.id },
        data: {
          images: JSON.stringify(testImages)
        }
      });
      
      console.log(`✅ Atualizado: ${property.title}`);
      updated++;
    }

    console.log(`\n🎉 Sucesso! ${updated} imóveis atualizados com as mesmas 10 fotos de teste.`);
    console.log('\n📸 Imagens aplicadas:');
    testImages.forEach((img, index) => {
      console.log(`   ${index + 1}. ${img}${index === 0 ? ' (PRINCIPAL)' : ''}`);
    });
    
  } catch (error) {
    console.error('❌ Erro ao atualizar imagens:', error.message);
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

updateTestImages();
