import prisma from '../src/prisma.js';

async function testDatabase() {
  try {
    console.log('🔍 Testando conexão com o banco de dados...\n');
    
    // Testar usuários
    console.log('👥 Testando tabela de usuários:');
    const totalUsers = await prisma.user.count();
    console.log(`   Total de usuários: ${totalUsers}`);
    
    if (totalUsers > 0) {
      const users = await prisma.user.findMany({
        take: 5,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isActive: true,
          _count: {
            select: {
              properties: true,
              favorites: true,
              reviews: true
            }
          }
        }
      });
      
      console.log('\n   Primeiros usuários:');
      users.forEach(user => {
        console.log(`   - ${user.name} (${user.email})`);
        console.log(`     Role: ${user.role}, Ativo: ${user.isActive}`);
        console.log(`     Imóveis: ${user._count.properties}, Favoritos: ${user._count.favorites}`);
      });
    }
    
    // Testar propriedades
    console.log('\n🏠 Testando tabela de propriedades:');
    const totalProperties = await prisma.property.count();
    console.log(`   Total de propriedades: ${totalProperties}`);
    
    // Testar favoritos
    console.log('\n❤️  Testando tabela de favoritos:');
    const totalFavorites = await prisma.favorite.count();
    console.log(`   Total de favoritos: ${totalFavorites}`);
    
    if (totalFavorites > 0) {
      const favorites = await prisma.favorite.findMany({
        take: 5,
        include: {
          user: {
            select: {
              name: true,
              email: true
            }
          },
          property: {
            select: {
              title: true
            }
          }
        }
      });
      
      console.log('\n   Primeiros favoritos:');
      favorites.forEach(fav => {
        console.log(`   - ${fav.user.name} favoritou "${fav.property.title}"`);
      });
    }
    
    console.log('\n✅ Teste concluído!');
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();
