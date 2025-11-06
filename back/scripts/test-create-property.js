const API_URL = 'http://localhost:4000/api';

// Dados de teste para criar um imóvel
const testProperty = {
  title: 'Casa Teste',
  description: 'Casa de teste para validação',
  category: 'Residencial',
  type: 'Casa',
  price: 500000,
  currency: 'BRL',
  address: 'Rua Teste, 123',
  city: 'São Paulo',
  state: 'SP',
  country: 'Brasil',
  neighborhood: 'Vila Teste',
  zipCode: '01234-567',
  latitude: -23.550520,
  longitude: -46.633308,
  area: 150,
  beds: 3,
  baths: 2,
  guests: 6,
  suites: 1,
  parkingSpaces: 2,
  floor: 0,
  totalFloors: 1,
  condoFee: 0,
  iptu: 1200,
  homeInsurance: 800,
  yearBuilt: 2020,
  propertyCondition: 'Seminovo',
  lotSize: 200,
  amenities: JSON.stringify(['Piscina', 'Churrasqueira']),
  naturalConditions: JSON.stringify(['Vista para o mar']),
  style: 'Moderno',
  images: JSON.stringify(['https://via.placeholder.com/800x600']),
  mainImage: 'https://via.placeholder.com/800x600',
  published: true,
  featured: false,
};

async function testCreateProperty() {
  try {
    console.log('🔐 Fazendo login como admin...');
    
    // Login para obter token
    const loginResponse = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@admin.com',
        password: 'admin123'
      })
    });

    if (!loginResponse.ok) {
      const error = await loginResponse.json();
      console.error('❌ Erro no login:', error);
      return;
    }

    const { token } = await loginResponse.json();
    console.log('✅ Login realizado com sucesso');

    console.log('\n📝 Criando imóvel com os seguintes dados:');
    console.log(JSON.stringify(testProperty, null, 2));

    // Criar imóvel
    console.log('\n🏠 Enviando requisição para criar imóvel...');
    const createResponse = await fetch(`${API_URL}/properties`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(testProperty)
    });

    const responseText = await createResponse.text();
    console.log('\n📨 Resposta recebida:', responseText);

    if (!createResponse.ok) {
      try {
        const error = JSON.parse(responseText);
        console.error('\n❌ Erro ao criar imóvel:');
        if (error.errors && Array.isArray(error.errors)) {
          error.errors.forEach(err => {
            console.error(`  - Campo: ${err.param || err.field}`);
            console.error(`    Erro: ${err.msg || err.message}`);
            console.error(`    Valor: ${err.value}`);
          });
        } else {
          console.error(error);
        }
      } catch (e) {
        console.error('Erro ao parsear resposta:', responseText);
      }
      return;
    }

    const property = JSON.parse(responseText);
    console.log('\n✅ Imóvel criado com sucesso!');
    console.log('ID:', property.id);
    console.log('Título:', property.title);
    console.log('Preço:', property.price);
    console.log('Cidade:', property.city);
    console.log('Quartos:', property.beds);
    console.log('Banheiros:', property.baths);

  } catch (error) {
    console.error('\n❌ Erro durante o teste:', error.message);
    console.error(error);
  }
}

testCreateProperty();
