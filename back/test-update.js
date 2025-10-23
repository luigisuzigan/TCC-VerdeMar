import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testUpdate() {
  try {
    console.log('🔍 Buscando primeiro imóvel...\n');
    
    const property = await prisma.property.findFirst();
    
    if (!property) {
      console.log('❌ Nenhum imóvel encontrado');
      return;
    }
    
    console.log('✅ Imóvel encontrado:');
    console.log(`   ID: ${property.id}`);
    console.log(`   Título: ${property.title}`);
    console.log(`   Tipo: ${property.type}`);
    console.log(`   Preço: R$ ${property.price?.toLocaleString('pt-BR')}`);
    console.log(`   MainImage: ${property.mainImage || 'Não definida'}`);
    
    // Testar atualização simples
    console.log('\n📝 Testando atualização...');
    
    const updated = await prisma.property.update({
      where: { id: property.id },
      data: {
        mainImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
        rating: 4.8
      }
    });
    
    console.log('✅ Atualização bem-sucedida!');
    console.log(`   Nova MainImage: ${updated.mainImage}`);
    console.log(`   Nova Rating: ${updated.rating}`);
    
    // Reverter
    console.log('\n🔄 Revertendo alterações...');
    await prisma.property.update({
      where: { id: property.id },
      data: {
        mainImage: property.mainImage,
        rating: property.rating
      }
    });
    
    console.log('✅ Revertido com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
    console.error('Stack:', error.stack);
  } finally {
    await prisma.$disconnect();
  }
}

testUpdate();
