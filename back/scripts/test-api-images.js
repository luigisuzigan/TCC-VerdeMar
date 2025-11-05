import 'dotenv/config';
import axios from 'axios';

async function testApi() {
  try {
    console.log('🔍 Testando API /properties...\n');

    const response = await axios.get('http://localhost:4000/api/properties?limit=3');
    
    console.log('📊 Status:', response.status);
    console.log('📊 Total de imóveis:', response.data.items?.length || 0);
    
    if (response.data.items && response.data.items.length > 0) {
      const firstProperty = response.data.items[0];
      
      console.log('\n📸 Primeiro imóvel:');
      console.log('   Título:', firstProperty.title);
      console.log('   Images (tipo):', typeof firstProperty.images);
      console.log('   Images (é array?):', Array.isArray(firstProperty.images));
      console.log('   Images:', firstProperty.images);
      console.log('   Primeira imagem:', firstProperty.images?.[0]);
    }
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('\n⚠️  Backend não está rodando!');
      console.log('💡 Inicie o backend com: npm run dev');
    }
  }
}

testApi();
