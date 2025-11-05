import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

async function testAPI() {
  console.log('🔍 Testando API em', API_URL, '\n');
  
  try {
    // Teste 1: Health check
    console.log('1️⃣ Testando health endpoint...');
    const health = await axios.get(`${API_URL}/health`);
    console.log('✅ API está respondendo:', health.data);
    
    // Teste 2: Listar propriedades sem filtros
    console.log('\n2️⃣ Buscando propriedades sem filtros...');
    const all = await axios.get(`${API_URL}/properties`, {
      params: { limit: 100 }
    });
    console.log(`✅ Resposta recebida!`);
    console.log(`   Total: ${all.data.total || 0}`);
    console.log(`   Items: ${all.data.items?.length || 0}`);
    
    // Teste 3: Listar apenas publicadas
    console.log('\n3️⃣ Buscando propriedades publicadas...');
    const published = await axios.get(`${API_URL}/properties`, {
      params: { published: true, limit: 100 }
    });
    console.log(`✅ Resposta recebida!`);
    console.log(`   Total: ${published.data.total || 0}`);
    console.log(`   Items: ${published.data.items?.length || 0}`);
    
    if (published.data.items?.length > 0) {
      console.log('\n📋 Primeiros 3 imóveis da API:');
      published.data.items.slice(0, 3).forEach((prop, idx) => {
        console.log(`\n${idx + 1}. ${prop.title}`);
        console.log(`   ID: ${prop.id}`);
        console.log(`   Cidade: ${prop.city}`);
        console.log(`   Preço: R$ ${prop.price}`);
        console.log(`   Publicado: ${prop.published}`);
      });
    }
    
    // Teste 4: Mesma query que o frontend faz
    console.log('\n4️⃣ Testando query exata do frontend...');
    const frontendQuery = await axios.get(`${API_URL}/properties`, {
      params: {
        published: 'true',
        limit: '24',
        offset: 0
      }
    });
    console.log(`✅ Resposta recebida!`);
    console.log(`   Total: ${frontendQuery.data.total || 0}`);
    console.log(`   Items: ${frontendQuery.data.items?.length || 0}`);
    
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.error('❌ ERRO: Backend não está rodando!');
      console.error('   Execute: cd back && npm run dev');
    } else if (error.response) {
      console.error('❌ Erro na API:', error.response.status, error.response.data);
    } else {
      console.error('❌ Erro:', error.message);
    }
  }
}

testAPI();
