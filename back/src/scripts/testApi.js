// Teste rápido da API de properties
// Execute este arquivo com: node src/scripts/testApi.js

async function testApi() {
  console.log('🧪 Testando API de properties...\n');

  const baseUrl = 'http://localhost:3000';

  try {
    // Teste 1: GET /properties
    console.log('📡 GET /properties?published=true&limit=10');
    const response = await fetch(`${baseUrl}/properties?published=true&limit=10`);
    
    if (!response.ok) {
      console.log(`❌ Erro: ${response.status} ${response.statusText}`);
      const text = await response.text();
      console.log('Resposta:', text);
      return;
    }

    const data = await response.json();
    console.log(`✅ Status: ${response.status}`);
    console.log(`📊 Resultado:`, JSON.stringify(data, null, 2));
    
    if (data.items) {
      console.log(`\n✅ ${data.items.length} imóveis retornados`);
      console.log(`📈 Total no banco: ${data.total}`);
    } else if (Array.isArray(data)) {
      console.log(`\n✅ ${data.length} imóveis retornados (array direto)`);
    } else {
      console.log('\n⚠️ Formato de resposta inesperado');
    }

  } catch (error) {
    console.error('❌ Erro na requisição:', error.message);
    console.log('\n💡 Certifique-se de que o backend está rodando:');
    console.log('   cd back');
    console.log('   npm run dev');
  }
}

testApi();
