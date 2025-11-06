// Teste direto de criação de imóvel via API
// Execute com: node test-create-direct.js

const testData = {
  title: "Casa Teste API Direta",
  description: "Teste de criação",
  category: "Residencial",
  type: "Casa",
  price: 500000,
  currency: "BRL",
  city: "Florianópolis",
  state: "SC",
  country: "Brasil",
  area: 100,
  beds: 3,
  baths: 2,
  guests: 6,
  images: JSON.stringify([]),
  amenities: JSON.stringify([]),
  naturalConditions: JSON.stringify([]),
  mainImage: "",
  published: true,
  featured: false
};

async function test() {
  try {
    console.log('🔐 Fazendo login...');
    const loginRes = await fetch('http://localhost:4000/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@admin.com',
        password: 'admin123'
      })
    });

    if (!loginRes.ok) {
      console.error('❌ Erro no login:', await loginRes.text());
      return;
    }

    const { token } = await loginRes.json();
    console.log('✅ Login OK\n');

    console.log('📤 Criando imóvel com dados:');
    console.log(JSON.stringify(testData, null, 2));
    console.log('');

    const createRes = await fetch('http://localhost:4000/api/properties', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(testData)
    });

    const responseText = await createRes.text();
    console.log('📨 Status:', createRes.status);
    console.log('📨 Resposta:', responseText);
    console.log('');

    if (!createRes.ok) {
      console.error('❌ ERRO ao criar imóvel!');
      try {
        const error = JSON.parse(responseText);
        if (error.errors) {
          console.error('\n🔴 Erros de validação:');
          error.errors.forEach(err => {
            console.error(`  - Campo: ${err.param || err.field}`);
            console.error(`    Mensagem: ${err.msg || err.message}`);
            console.error(`    Valor recebido: ${err.value}`);
            console.error('');
          });
        } else {
          console.error('Erro:', error);
        }
      } catch (e) {
        console.error('Resposta não é JSON válido');
      }
    } else {
      console.log('✅ Imóvel criado com sucesso!');
      const property = JSON.parse(responseText);
      console.log('ID:', property.id);
      console.log('Título:', property.title);
    }

  } catch (error) {
    console.error('❌ Erro na execução:', error.message);
    console.error(error);
  }
}

test();
