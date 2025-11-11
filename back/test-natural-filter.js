import { listProperties } from './src/repos/propertyRepo.js';

async function testNaturalFilter() {
  try {
    console.log('🧪 Testando filtro de Natural Conditions...\n');
    
    // Testar com "Vista para o mar"
    console.log('📍 Teste 1: Filtrando por "Vista para o mar"');
    const result1 = await listProperties({
      naturalConditions: 'Vista para o mar',
      published: true,
      limit: 100,
      offset: 0
    });
    
    console.log(`✅ Resultado: ${result1.items.length} imóveis encontrados`);
    result1.items.forEach(item => {
      console.log(`   - ${item.title}`);
      console.log(`     naturalConditions:`, item.naturalConditions);
    });
    
    console.log('\n📍 Teste 2: Filtrando por "Praia"');
    const result2 = await listProperties({
      naturalConditions: 'Praia',
      published: true,
      limit: 100,
      offset: 0
    });
    
    console.log(`✅ Resultado: ${result2.items.length} imóveis encontrados`);
    result2.items.forEach(item => {
      console.log(`   - ${item.title}`);
      console.log(`     naturalConditions:`, item.naturalConditions);
    });
    
    console.log('\n📍 Teste 3: Filtrando por "Vista para o mar,Praia" (múltiplos)');
    const result3 = await listProperties({
      naturalConditions: 'Vista para o mar,Praia',
      published: true,
      limit: 100,
      offset: 0
    });
    
    console.log(`✅ Resultado: ${result3.items.length} imóveis encontrados`);
    result3.items.forEach(item => {
      console.log(`   - ${item.title}`);
      console.log(`     naturalConditions:`, item.naturalConditions);
    });
    
  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    process.exit(0);
  }
}

testNaturalFilter();
