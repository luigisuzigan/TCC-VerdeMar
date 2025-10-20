const http = require('http');

const options = {
  hostname: 'localhost',
  port: 4000,
  path: '/api/dashboard/stats',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', data);
    
    if (res.statusCode === 200) {
      console.log('\n✅ Endpoint funcionando!');
      const parsed = JSON.parse(data);
      if (parsed.success) {
        console.log('✅ Dados retornados com sucesso!');
        console.log('Total de imóveis:', parsed.data.overview.totalProperties);
        console.log('Total de usuários:', parsed.data.overview.totalUsers);
      }
    } else {
      console.log('\n❌ Erro no endpoint');
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Erro ao conectar:', error.message);
});

req.end();
