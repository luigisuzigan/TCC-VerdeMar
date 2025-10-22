import axios from 'axios';

async function testPropertyApi() {
  try {
    console.log('🧪 Testando API de Propriedades...\n');
    
    // Testar GET /api/properties (listar todos)
    const listResponse = await axios.get('http://localhost:4000/api/properties');
    console.log('Response data type:', typeof listResponse.data);
    console.log('Response data keys:', Object.keys(listResponse.data));
    
    const properties = listResponse.data.properties || listResponse.data.items || (Array.isArray(listResponse.data) ? listResponse.data : []);
    
    console.log(`✅ Encontrados ${properties.length} imóveis\n`);
    
    // Pegar o primeiro imóvel
    if (properties.length > 0) {
      const firstProperty = properties[0];
      console.log('📋 Primeiro imóvel da lista:');
      console.log(`   ID: ${firstProperty.id}`);
      console.log(`   Título: ${firstProperty.title}`);
      console.log(`   NearbyPlaces: ${firstProperty.nearbyPlaces ? 'Presente' : 'Ausente'}`);
      
      if (firstProperty.nearbyPlaces) {
        const places = typeof firstProperty.nearbyPlaces === 'string' 
          ? JSON.parse(firstProperty.nearbyPlaces) 
          : firstProperty.nearbyPlaces;
        const categories = Object.keys(places);
        console.log(`   Categorias: ${categories.join(', ')}`);
      }
      
      console.log('\n🔍 Buscando detalhes do imóvel via GET /api/properties/:id...\n');
      
      // Testar GET /api/properties/:id
      const detailResponse = await axios.get(`http://localhost:4000/api/properties/${firstProperty.id}`);
      const propertyDetail = detailResponse.data;
      
      console.log('📋 Detalhes do imóvel:');
      console.log(`   ID: ${propertyDetail.id}`);
      console.log(`   Título: ${propertyDetail.title}`);
      console.log(`   NearbyPlaces (tipo): ${typeof propertyDetail.nearbyPlaces}`);
      console.log(`   NearbyPlaces (presente): ${propertyDetail.nearbyPlaces ? 'Sim' : 'Não'}`);
      
      if (propertyDetail.nearbyPlaces) {
        console.log(`   NearbyPlaces (primeiros 200 caracteres): ${propertyDetail.nearbyPlaces.substring(0, 200)}`);
        
        try {
          const places = typeof propertyDetail.nearbyPlaces === 'string' 
            ? JSON.parse(propertyDetail.nearbyPlaces) 
            : propertyDetail.nearbyPlaces;
          
          const categories = Object.keys(places);
          console.log(`\n   ✅ Categorias encontradas (${categories.length}): ${categories.join(', ')}`);
          
          categories.forEach(cat => {
            console.log(`      • ${cat}: ${places[cat].length} locais`);
          });
        } catch (e) {
          console.log(`   ❌ Erro ao parsear: ${e.message}`);
        }
      } else {
        console.log('   ❌ NearbyPlaces está vazio ou null!');
      }
    }
    
  } catch (error) {
    console.error('❌ Erro ao testar API:', error.message);
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Data:', error.response.data);
    }
  }
}

testPropertyApi();
