import prisma from './src/prisma.js';

/**
 * Script para adicionar 8 fotos a cada imóvel
 */

// Array com todas as fotos disponíveis
const availableImages = [
  '/Teste/Imóvel1.jpg',
  '/Teste/Imóvel2.jpg',
  '/Teste/Imóvel3.jpg',
  '/Teste/Imóvel4.jpg',
  '/Teste/Praia1.jpg',
  '/Teste/Praia2.jpg',
  '/Teste/Praia3.jpg',
];

/**
 * Gera array de 8 fotos com repetições se necessário
 */
function generate8Images() {
  const images = [];
  let index = 0;
  
  // Gerar 8 fotos (pode repetir)
  for (let i = 0; i < 8; i++) {
    images.push(availableImages[index]);
    index = (index + 1) % availableImages.length;
  }
  
  return images;
}

async function updatePropertyImages() {
  try {
    console.log('🖼️  Atualizando imagens dos imóveis...\n');
    
    const properties = await prisma.property.findMany({
      select: { id: true, title: true, images: true }
    });
    
    console.log(`📊 Total de imóveis: ${properties.length}\n`);
    
    for (const property of properties) {
      const images8 = generate8Images();
      const imagesJson = JSON.stringify(images8);
      
      await prisma.property.update({
        where: { id: property.id },
        data: { images: imagesJson }
      });
      
      console.log(`✅ ${property.title}`);
      console.log(`   Atualizado com ${images8.length} fotos\n`);
    }
    
    console.log('✨ Todas as propriedades agora têm 8 fotos!');
    
  } catch (error) {
    console.error('❌ Erro ao atualizar imagens:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updatePropertyImages();
