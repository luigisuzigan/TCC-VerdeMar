import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function testImages() {
  console.log('🔍 Buscando todas as propriedades para ver o campo images...\n');
  
  const properties = await prisma.property.findMany({
    select: {
      id: true,
      title: true,
      images: true,
      mainImage: true
    },
    take: 10
  });
  
  properties.forEach((prop, index) => {
    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`Propriedade ${index + 1}: ${prop.title}`);
    console.log(`ID: ${prop.id}`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`\n📸 Campo "images" (raw):`);
    console.log(`Tipo: ${typeof prop.images}`);
    console.log(`Valor: ${prop.images}`);
    console.log(`Tamanho: ${prop.images?.length || 0} caracteres`);
    
    try {
      const parsed = JSON.parse(prop.images);
      console.log(`\n✅ JSON VÁLIDO - Parse bem-sucedido:`);
      console.log(`Tipo após parse: ${Array.isArray(parsed) ? 'Array' : typeof parsed}`);
      console.log(`Quantidade de itens: ${parsed.length}`);
      console.log(`Conteúdo:`, parsed);
    } catch (err) {
      console.log(`\n❌ ERRO ao fazer parse do JSON:`);
      console.log(err.message);
    }
    
    console.log(`\n🖼️ Main Image: ${prop.mainImage || 'N/A'}`);
  });
  
  await prisma.$disconnect();
}

testImages().catch(console.error);
