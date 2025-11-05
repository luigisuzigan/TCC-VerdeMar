import prisma from '../src/prisma.js';

async function testFavorites() {
  try {
    console.log('🔍 Testando contagem de favoritos...\n');
    
    // Contar favoritos
    const totalFavorites = await prisma.favorite.count();
    console.log('📊 Total de favoritos:', totalFavorites);
    
    // Buscar alguns favoritos
    const favorites = await prisma.favorite.findMany({
      take: 10,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        property: {
          select: {
            id: true,
            title: true
          }
        }
      }
    });
    
    console.log('\n📋 Favoritos encontrados:', favorites.length);
    console.log('\nDetalhes dos favoritos:');
    favorites.forEach((fav, index) => {
      console.log(`\n${index + 1}. Favorito ID: ${fav.id}`);
      console.log(`   Usuário: ${fav.user.name} (${fav.user.email})`);
      console.log(`   Imóvel: ${fav.property.title}`);
      console.log(`   Data: ${fav.createdAt}`);
    });
    
    // Contar usuários com favoritos
    const usersWithFavorites = await prisma.user.findMany({
      where: {
        favorites: {
          some: {}
        }
      },
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            favorites: true
          }
        }
      }
    });
    
    console.log('\n👥 Usuários com favoritos:', usersWithFavorites.length);
    usersWithFavorites.forEach(user => {
      console.log(`   - ${user.name}: ${user._count.favorites} favoritos`);
    });
    
    // Contar imóveis favoritados
    const propertiesWithFavorites = await prisma.property.findMany({
      where: {
        favorites: {
          some: {}
        }
      },
      select: {
        id: true,
        title: true,
        _count: {
          select: {
            favorites: true
          }
        }
      }
    });
    
    console.log('\n🏠 Imóveis com favoritos:', propertiesWithFavorites.length);
    propertiesWithFavorites.forEach(prop => {
      console.log(`   - ${prop.title}: ${prop._count.favorites} favoritos`);
    });
    
  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testFavorites();
