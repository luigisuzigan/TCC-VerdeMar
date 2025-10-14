import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const testProperties = [
  {
    title: 'Casa Moderna com Vista para o Mar',
    description: 'Linda casa moderna com acabamento de primeira linha, ampla área de lazer com piscina, churrasqueira e vista privilegiada para o mar. Localizada em condomínio fechado com segurança 24h.',
    type: 'Casa',
    price: 1850000,
    currency: 'BRL',
    address: 'Rua das Flores, 123',
    city: 'Florianópolis',
    state: 'SC',
    country: 'Brasil',
    zipCode: '88000-000',
    latitude: -27.5954,
    longitude: -48.5480,
    area: 250,
    beds: 4,
    baths: 3,
    guests: 8,
    amenities: JSON.stringify([
      'sacada',
      'churrasqueira',
      'vista_mar',
      'area_servico',
      'ar_condicionado',
      'closet',
      'piscina',
      'academia',
      'portaria',
      'seguranca'
    ]),
    images: JSON.stringify([
      '/Teste/Imóvel1.jpg',
      '/Teste/Imóvel2.jpg',
      '/Teste/Imóvel3.jpg',
      '/Teste/Imóvel4.jpg'
    ]),
    mainImage: '/Teste/Imóvel1.jpg',
    rating: 4.8,
    reviewCount: 12,
    viewCount: 156,
    published: true,
    featured: true
  },
  {
    title: 'Apartamento Luxuoso Centro',
    description: 'Apartamento de alto padrão no coração da cidade, com 3 suítes, varanda gourmet e 2 vagas de garagem. Condomínio completo com piscina, academia, salão de festas e muito mais.',
    type: 'Apartamento',
    price: 980000,
    currency: 'BRL',
    address: 'Avenida Principal, 456',
    city: 'Florianópolis',
    state: 'SC',
    country: 'Brasil',
    zipCode: '88010-000',
    latitude: -27.5969,
    longitude: -48.5495,
    area: 120,
    beds: 3,
    baths: 3,
    guests: 6,
    amenities: JSON.stringify([
      'sacada',
      'churrasqueira',
      'area_servico',
      'ar_condicionado',
      'mobiliado',
      'piscina',
      'academia',
      'salao_festas',
      'elevador',
      'portaria',
      'playground'
    ]),
    images: JSON.stringify([
      '/Teste/Imóvel2.jpg',
      '/Teste/Imóvel3.jpg',
      '/Teste/Imóvel1.jpg'
    ]),
    mainImage: '/Teste/Imóvel2.jpg',
    rating: 4.9,
    reviewCount: 24,
    viewCount: 289,
    published: true,
    featured: true
  },
  {
    title: 'Cobertura Duplex Frente Mar',
    description: 'Cobertura espetacular com vista panorâmica para o mar, 4 suítes, piscina privativa, churrasqueira e acabamento impecável. O imóvel dos seus sonhos!',
    type: 'Cobertura',
    price: 3200000,
    currency: 'BRL',
    address: 'Avenida Beira Mar, 789',
    city: 'Florianópolis',
    state: 'SC',
    country: 'Brasil',
    zipCode: '88015-000',
    latitude: -27.5900,
    longitude: -48.5450,
    area: 350,
    beds: 4,
    baths: 5,
    guests: 10,
    amenities: JSON.stringify([
      'sacada',
      'churrasqueira',
      'vista_mar',
      'area_servico',
      'closet',
      'escritorio',
      'ar_condicionado',
      'mobiliado',
      'piscina',
      'academia',
      'salao_festas',
      'elevador',
      'portaria',
      'seguranca'
    ]),
    images: JSON.stringify([
      '/Teste/Imóvel3.jpg',
      '/Teste/Imóvel4.jpg',
      '/Teste/Imóvel1.jpg',
      '/Teste/Imóvel2.jpg'
    ]),
    mainImage: '/Teste/Imóvel3.jpg',
    rating: 5.0,
    reviewCount: 8,
    viewCount: 412,
    published: true,
    featured: true
  },
  {
    title: 'Casa Confortável em Condomínio',
    description: 'Casa aconchegante em condomínio fechado, perfeita para famílias. 3 quartos sendo 1 suíte, quintal amplo, churrasqueira e garagem para 2 carros.',
    type: 'Casa',
    price: 750000,
    currency: 'BRL',
    address: 'Rua dos Pinheiros, 321',
    city: 'Florianópolis',
    state: 'SC',
    country: 'Brasil',
    zipCode: '88020-000',
    latitude: -27.6000,
    longitude: -48.5500,
    area: 180,
    beds: 3,
    baths: 2,
    guests: 6,
    amenities: JSON.stringify([
      'churrasqueira',
      'area_servico',
      'escritorio',
      'piscina',
      'playground',
      'portaria',
      'area_verde'
    ]),
    images: JSON.stringify([
      '/Teste/Imóvel4.jpg',
      '/Teste/Imóvel1.jpg',
      '/Teste/Imóvel2.jpg'
    ]),
    mainImage: '/Teste/Imóvel4.jpg',
    rating: 4.6,
    reviewCount: 15,
    viewCount: 203,
    published: true,
    featured: false
  },
  {
    title: 'Casa de Praia com Piscina',
    description: 'Casa de veraneio a poucos metros da praia, com piscina, área gourmet completa e muito espaço para a família. Ideal para momentos de lazer e relaxamento.',
    type: 'Casa',
    price: 1200000,
    currency: 'BRL',
    address: 'Rua da Praia, 567',
    city: 'Florianópolis',
    state: 'SC',
    country: 'Brasil',
    zipCode: '88025-000',
    latitude: -27.5850,
    longitude: -48.5400,
    area: 220,
    beds: 4,
    baths: 3,
    guests: 8,
    amenities: JSON.stringify([
      'sacada',
      'churrasqueira',
      'vista_mar',
      'area_servico',
      'ar_condicionado',
      'piscina',
      'area_verde',
      'aceita_pets'
    ]),
    images: JSON.stringify([
      '/Teste/Imóvel1.jpg',
      '/Teste/Praia1.jpg',
      '/Teste/Praia2.jpg',
      '/Teste/Praia3.jpg'
    ]),
    mainImage: '/Teste/Imóvel1.jpg',
    rating: 4.7,
    reviewCount: 19,
    viewCount: 267,
    published: true,
    featured: false
  },
  {
    title: 'Apartamento Compacto e Moderno',
    description: 'Apartamento studio perfeito para solteiros ou casais, totalmente mobiliado, com vaga de garagem. Localização privilegiada perto de tudo.',
    type: 'Kitnet',
    price: 350000,
    currency: 'BRL',
    address: 'Rua Central, 890',
    city: 'Florianópolis',
    state: 'SC',
    country: 'Brasil',
    zipCode: '88030-000',
    latitude: -27.5980,
    longitude: -48.5470,
    area: 45,
    beds: 1,
    baths: 1,
    guests: 2,
    amenities: JSON.stringify([
      'area_servico',
      'ar_condicionado',
      'mobiliado',
      'elevador',
      'portaria'
    ]),
    images: JSON.stringify([
      '/Teste/Imóvel2.jpg',
      '/Teste/Imóvel3.jpg'
    ]),
    mainImage: '/Teste/Imóvel2.jpg',
    rating: 4.3,
    reviewCount: 7,
    viewCount: 134,
    published: true,
    featured: false
  }
];

async function seedProperties() {
  console.log('🌱 Iniciando seed de propriedades de teste...\n');

  try {
    // Buscar um usuário existente ou criar um usuário de teste
    let user = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (!user) {
      console.log('⚠️  Nenhum usuário ADMIN encontrado. Criando usuário de teste...');
      user = await prisma.user.create({
        data: {
          name: 'Usuário Teste',
          email: 'teste@verdemar.com',
          passwordHash: '$2b$10$abcdefghijklmnopqrstuvwxyz', // Hash fictício
          phone: '(48) 99999-9999',
          role: 'ADMIN',
          isActive: true
        }
      });
      console.log(`✅ Usuário de teste criado: ${user.email}\n`);
    } else {
      console.log(`✅ Usando usuário existente: ${user.email}\n`);
    }

    // Limpar propriedades existentes (opcional - comente se não quiser deletar)
    console.log('🗑️  Removendo propriedades de teste anteriores...');
    await prisma.property.deleteMany({
      where: {
        title: {
          in: testProperties.map(p => p.title)
        }
      }
    });

    // Criar propriedades
    console.log('📦 Criando propriedades de teste...\n');
    
    for (const propertyData of testProperties) {
      const property = await prisma.property.create({
        data: {
          ...propertyData,
          userId: user.id
        }
      });

      console.log(`✅ ${property.type} criado: "${property.title}"`);
      console.log(`   💰 Preço: R$ ${property.price.toLocaleString('pt-BR')}`);
      console.log(`   📍 Local: ${property.city}, ${property.state}`);
      console.log(`   📐 Área: ${property.area}m² | 🛏️  ${property.beds} quartos | 🚿 ${property.baths} banheiros`);
      console.log(`   🖼️  Imagens: ${JSON.parse(property.images).length} fotos`);
      console.log(`   ⭐ Rating: ${property.rating} (${property.reviewCount} avaliações)`);
      console.log('');
    }

    console.log(`\n🎉 Seed concluído! ${testProperties.length} propriedades criadas com sucesso!\n`);
    console.log('📊 Resumo:');
    console.log(`   - Total de imóveis: ${testProperties.length}`);
    console.log(`   - Publicados: ${testProperties.filter(p => p.published).length}`);
    console.log(`   - Destaques: ${testProperties.filter(p => p.featured).length}`);
    console.log(`   - Tipos: ${[...new Set(testProperties.map(p => p.type))].join(', ')}`);
    console.log('\n💡 Acesse http://localhost:5173/explorar para ver os imóveis!');

  } catch (error) {
    console.error('❌ Erro ao criar propriedades:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Executar seed
seedProperties()
  .catch((error) => {
    console.error('❌ Erro fatal:', error);
    process.exit(1);
  });
