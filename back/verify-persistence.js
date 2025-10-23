import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verifyPersistence() {
  try {
    console.log('🔍 Verificando persistência de dados...\n');
    
    // Buscar um imóvel
    const property = await prisma.property.findFirst();
    
    if (!property) {
      console.log('❌ Nenhum imóvel encontrado');
      return;
    }
    
    console.log('📋 ANTES DA ATUALIZAÇÃO:');
    console.log(`   ID: ${property.id}`);
    console.log(`   Título: ${property.title}`);
    console.log(`   Descrição: ${property.description?.substring(0, 50)}...`);
    console.log(`   Preço: R$ ${property.price?.toLocaleString('pt-BR')}`);
    
    // Fazer uma atualização
    const novoTitulo = `[TESTE ${Date.now()}] ${property.title}`;
    const novoPreco = property.price + 1000;
    
    console.log('\n🔄 Atualizando...');
    await prisma.property.update({
      where: { id: property.id },
      data: {
        title: novoTitulo,
        price: novoPreco
      }
    });
    
    console.log('✅ Atualização enviada ao banco\n');
    
    // Buscar novamente para confirmar
    const propertyUpdated = await prisma.property.findUnique({
      where: { id: property.id }
    });
    
    console.log('📋 DEPOIS DA ATUALIZAÇÃO (relendo do banco):');
    console.log(`   Título: ${propertyUpdated.title}`);
    console.log(`   Preço: R$ ${propertyUpdated.price?.toLocaleString('pt-BR')}`);
    
    if (propertyUpdated.title === novoTitulo && propertyUpdated.price === novoPreco) {
      console.log('\n✅ DADOS PERSISTIDOS COM SUCESSO!');
      console.log('   As alterações estão sendo salvas no banco de dados.');
    } else {
      console.log('\n❌ FALHA NA PERSISTÊNCIA!');
      console.log('   As alterações NÃO foram salvas no banco.');
    }
    
    // Reverter para não bagunçar
    console.log('\n🔄 Revertendo teste...');
    await prisma.property.update({
      where: { id: property.id },
      data: {
        title: property.title,
        price: property.price
      }
    });
    console.log('✅ Revertido!');
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

verifyPersistence();
