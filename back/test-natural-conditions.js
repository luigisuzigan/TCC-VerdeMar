import prisma from './src/prisma.js';

async function testNaturalConditions() {
  try {
    console.log('🔍 Testando Natural Conditions...\n');
    
    // Buscar todas as propriedades
    const properties = await prisma.property.findMany({
      where: { published: true },
      select: {
        id: true,
        title: true,
        naturalConditions: true,
      },
      take: 10
    });
    
    console.log(`📊 Total de propriedades encontradas: ${properties.length}\n`);
    
    properties.forEach((prop, index) => {
      console.log(`${index + 1}. ${prop.title}`);
      console.log(`   ID: ${prop.id.substring(0, 8)}...`);
      console.log(`   naturalConditions tipo: ${typeof prop.naturalConditions}`);
      console.log(`   naturalConditions valor: ${prop.naturalConditions}`);
      
      try {
        if (typeof prop.naturalConditions === 'string') {
          const parsed = JSON.parse(prop.naturalConditions || '[]');
          console.log(`   ✅ Parsed (${parsed.length} items):`, parsed);
        } else if (Array.isArray(prop.naturalConditions)) {
          console.log(`   ✅ É array (${prop.naturalConditions.length} items):`, prop.naturalConditions);
        }
      } catch (e) {
        console.log(`   ❌ Erro ao fazer parse: ${e.message}`);
      }
      console.log('');
    });
    
  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testNaturalConditions();
