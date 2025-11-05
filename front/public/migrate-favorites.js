// Script para migrar favoritos do localStorage para o banco de dados
// Execute este script no console do navegador enquanto estiver logado

async function migrateFavoritesToDatabase() {
  console.log('🔄 Iniciando migração de favoritos...\n');
  
  try {
    // Verificar se o usuário está logado
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      console.error('❌ Você precisa estar logado para migrar os favoritos');
      return;
    }
    
    // Obter dados do usuário
    const userData = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (!userData) {
      console.error('❌ Dados do usuário não encontrados');
      return;
    }
    
    const user = JSON.parse(userData);
    const favoritesKey = `favorites_user_${user.id}`;
    
    // Buscar favoritos do localStorage
    const storedFavorites = localStorage.getItem(favoritesKey);
    if (!storedFavorites) {
      console.log('ℹ️ Nenhum favorito encontrado no localStorage');
      return;
    }
    
    const favorites = JSON.parse(storedFavorites);
    console.log(`📋 Encontrados ${favorites.length} favoritos no localStorage`);
    
    // Configurar API
    const API_BASE_URL = 'http://localhost:4000/api';
    
    let migrated = 0;
    let errors = 0;
    
    // Migrar cada favorito
    for (const property of favorites) {
      try {
        const response = await fetch(`${API_BASE_URL}/favorites/${property.id}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        const data = await response.json();
        
        if (response.ok || response.status === 400) {
          // 400 pode significar que já existe
          if (data.error && data.error.includes('já está nos favoritos')) {
            console.log(`✅ ${property.title} - já estava no banco`);
          } else {
            console.log(`✅ ${property.title} - migrado com sucesso`);
            migrated++;
          }
        } else {
          console.error(`❌ ${property.title} - erro:`, data.error);
          errors++;
        }
      } catch (error) {
        console.error(`❌ ${property.title} - erro de rede:`, error.message);
        errors++;
      }
    }
    
    console.log(`\n📊 Resumo da migração:`);
    console.log(`   ✅ Migrados: ${migrated}`);
    console.log(`   ❌ Erros: ${errors}`);
    console.log(`   📋 Total: ${favorites.length}`);
    
  } catch (error) {
    console.error('❌ Erro na migração:', error);
  }
}

// Executar a migração
migrateFavoritesToDatabase();
