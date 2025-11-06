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
    nearbyPlaces: JSON.stringify({
      schools: [
        { name: 'Colégio Catarinense', vicinity: 'Rua Esteves Júnior, 711', rating: 4.5, userRatingsTotal: 245, distanceText: '850m', lat: -27.5968, lng: -48.5492 },
        { name: 'Escola Básica Intendente Aricomedes', vicinity: 'Rua Silva Jardim, 390', rating: 4.3, userRatingsTotal: 89, distanceText: '1.2km', lat: -27.5982, lng: -48.5501 }
      ],
      supermarkets: [
        { name: 'Angeloni Centro', vicinity: 'Rua Felipe Schmidt, 60', rating: 4.4, userRatingsTotal: 1523, distanceText: '600m', lat: -27.5961, lng: -48.5485 },
        { name: 'Mercado São Jorge', vicinity: 'Rua Conselheiro Mafra, 255', rating: 4.2, userRatingsTotal: 456, distanceText: '750m', lat: -27.5970, lng: -48.5495 }
      ],
      hospitals: [
        { name: 'Hospital Governador Celso Ramos', vicinity: 'Rua Irmã Benwarda, 297', rating: 3.8, userRatingsTotal: 892, distanceText: '2.1km', lat: -27.6021, lng: -48.5531 }
      ],
      pharmacies: [
        { name: 'Farmácia Catarinense', vicinity: 'Rua Felipe Schmidt, 145', rating: 4.6, userRatingsTotal: 234, distanceText: '400m', lat: -27.5958, lng: -48.5483 }
      ],
      restaurants: [
        { name: 'Restaurante Lindacap', vicinity: 'Rua Esteves Júnior, 612', rating: 4.7, userRatingsTotal: 1245, distanceText: '500m', lat: -27.5965, lng: -48.5488 }
      ]
    }),
    rating: 4.8,
    viewCount: 156,
    published: true
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
    nearbyPlaces: JSON.stringify({
      schools: [
        { name: 'Colégio Energia', vicinity: 'Rua Bocaiúva, 2468', rating: 4.6, userRatingsTotal: 312, distanceText: '950m', lat: -27.5980, lng: -48.5505 }
      ],
      supermarkets: [
        { name: 'Bistek Supermercados', vicinity: 'Rua Jerônimo Coelho, 185', rating: 4.3, userRatingsTotal: 678, distanceText: '700m', lat: -27.5975, lng: -48.5500 }
      ],
      banks: [
        { name: 'Banco do Brasil', vicinity: 'Praça XV de Novembro, 329', rating: 3.9, userRatingsTotal: 234, distanceText: '500m', lat: -27.5965, lng: -48.5490 }
      ],
      restaurants: [
        { name: 'Box 32', vicinity: 'Mercado Público de Florianópolis', rating: 4.8, userRatingsTotal: 2341, distanceText: '450m', lat: -27.5963, lng: -48.5487 }
      ],
      shopping_malls: [
        { name: 'Beiramar Shopping', vicinity: 'Rua Bocaiúva, 2468', rating: 4.5, userRatingsTotal: 8934, distanceText: '2.3km', lat: -27.5895, lng: -48.5454 }
      ]
    }),
    rating: 4.9,
    viewCount: 289,
    published: true
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
    nearbyPlaces: JSON.stringify({
      schools: [
        { name: 'Colégio Objetivo', vicinity: 'Av. Beira-Mar Norte, 1234', rating: 4.7, userRatingsTotal: 456, distanceText: '800m', lat: -27.5910, lng: -48.5460 }
      ],
      supermarkets: [
        { name: 'Angeloni Beira-Mar', vicinity: 'Av. Beira-Mar Norte, 2000', rating: 4.5, userRatingsTotal: 2134, distanceText: '600m', lat: -27.5905, lng: -48.5455 }
      ],
      restaurants: [
        { name: 'Toca da Garoupa', vicinity: 'Av. Beira-Mar Norte, 1806', rating: 4.6, userRatingsTotal: 1678, distanceText: '400m', lat: -27.5895, lng: -48.5448 }
      ],
      parks: [
        { name: 'Parque da Luz', vicinity: 'Av. Beira-Mar Norte', rating: 4.8, userRatingsTotal: 3421, distanceText: '300m', lat: -27.5892, lng: -48.5445 }
      ],
      gyms: [
        { name: 'Smart Fit Beira-Mar', vicinity: 'Av. Beira-Mar Norte, 1850', rating: 4.4, userRatingsTotal: 892, distanceText: '500m', lat: -27.5898, lng: -48.5450 }
      ]
    }),
    rating: 5.0,
    viewCount: 412,
    published: true
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
    viewCount: 203,
    published: true
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
    viewCount: 267,
    published: true
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
    viewCount: 134,
    published: true
  },
  {
    title: 'Casa de Campo em Holambra',
    description: 'Charmosa casa de campo em Holambra, a cidade das flores. Amplo terreno com jardim florido, varanda, quintal e garagem para 2 carros. Perfeita para quem busca tranquilidade.',
    type: 'Casa',
    price: 680000,
    currency: 'BRL',
    address: 'Rua Acalifa, 117',
    city: 'Holambra',
    state: 'SP',
    country: 'Brasil',
    zipCode: '13825-000',
    latitude: -22.6319,
    longitude: -47.0536,
    area: 180,
    beds: 3,
    baths: 2,
    amenities: JSON.stringify([
      'Jardim',
      'Varanda',
      'Churrasqueira',
      'Área de Serviço',
      'Garagem',
      'Portão Eletrônico'
    ]),
    images: JSON.stringify([
      '/Teste/Imóvel1.jpg',
      '/Teste/Imóvel2.jpg',
      '/Teste/Imóvel3.jpg'
    ]),
    mainImage: '/Teste/Imóvel1.jpg',
    nearbyPlaces: JSON.stringify({
      schools: [
        { name: 'Escola Estadual Prof. Ernesto Kummrow', vicinity: 'Rua Maurício de Nassau, 1420', rating: 4.4, userRatingsTotal: 78, distanceText: '1.1km', lat: -22.6330, lng: -47.0548 }
      ],
      supermarkets: [
        { name: 'Supermercado Dalben', vicinity: 'Av. Maurício de Nassau, 2000', rating: 4.3, userRatingsTotal: 312, distanceText: '850m', lat: -22.6325, lng: -47.0542 }
      ],
      pharmacies: [
        { name: 'Drogaria São Paulo', vicinity: 'Av. Maurício de Nassau, 1850', rating: 4.5, userRatingsTotal: 156, distanceText: '900m', lat: -22.6327, lng: -47.0544 }
      ],
      restaurants: [
        { name: 'Restaurante Moinho Holambra', vicinity: 'Rua Haarlem, 255', rating: 4.7, userRatingsTotal: 892, distanceText: '1.5km', lat: -22.6340, lng: -47.0560 }
      ],
      parks: [
        { name: 'Expoflora - Parque de Exposições', vicinity: 'Rua Maurício de Nassau', rating: 4.8, userRatingsTotal: 4521, distanceText: '2.0km', lat: -22.6355, lng: -47.0575 }
      ]
    }),
    rating: 4.6,
    viewCount: 178,
    published: true
  },
  {
    title: 'Apartamento Moderno em Cosmópolis',
    description: 'Apartamento novo e moderno em Cosmópolis, com 2 dormitórios, cozinha planejada, vaga de garagem coberta. Condomínio com portaria 24h e área de lazer.',
    type: 'Apartamento',
    price: 420000,
    currency: 'BRL',
    address: 'Avenida Papa João XXIII, 500',
    city: 'Cosmópolis',
    state: 'SP',
    country: 'Brasil',
    zipCode: '13150-000',
    latitude: -22.6458,
    longitude: -47.1958,
    area: 85,
    beds: 2,
    baths: 2,
    amenities: JSON.stringify([
      'Cozinha Planejada',
      'Ar condicionado',
      'Área de Serviço',
      'Portaria 24h',
      'Playground',
      'Salão de Festas',
      'Elevador'
    ]),
    images: JSON.stringify([
      '/Teste/Imóvel2.jpg',
      '/Teste/Imóvel1.jpg',
      '/Teste/Imóvel3.jpg'
    ]),
    mainImage: '/Teste/Imóvel2.jpg',
    nearbyPlaces: JSON.stringify({
      schools: [
        { name: 'Colégio Objetivo Cosmópolis', vicinity: 'Rua Prudente de Moraes, 1000', rating: 4.5, userRatingsTotal: 189, distanceText: '600m', lat: -22.6465, lng: -47.1965 }
      ],
      supermarkets: [
        { name: 'Supermercado Savegnago', vicinity: 'Av. Papa João XXIII, 800', rating: 4.4, userRatingsTotal: 567, distanceText: '400m', lat: -22.6462, lng: -47.1962 }
      ],
      banks: [
        { name: 'Banco do Brasil', vicinity: 'Av. Papa João XXIII, 650', rating: 3.8, userRatingsTotal: 124, distanceText: '250m', lat: -22.6460, lng: -47.1960 }
      ],
      pharmacies: [
        { name: 'Droga Raia', vicinity: 'Av. Papa João XXIII, 720', rating: 4.3, userRatingsTotal: 234, distanceText: '300m', lat: -22.6461, lng: -47.1961 }
      ],
      restaurants: [
        { name: 'Pizzaria Bella Capri', vicinity: 'Rua Tiradentes, 456', rating: 4.6, userRatingsTotal: 412, distanceText: '700m', lat: -22.6470, lng: -47.1970 }
      ]
    }),
    rating: 4.5,
    viewCount: 145,
    published: true
  },
  {
    title: 'Terreno Beto Carrero World - Oportunidade Única',
    description: 'EXCLUSIVO! Terreno comercial do famoso parque Beto Carrero World em Penha/SC. Área total de 1.350.000 m² com infraestrutura completa, atrações, estacionamento e potencial turístico incomparável. Ideal para grande investimento.',
    type: 'Terreno',
    price: 450000000,
    currency: 'BRL',
    address: 'Rodovia BR-101, Km 390',
    city: 'Penha',
    state: 'SC',
    country: 'Brasil',
    zipCode: '88385-000',
    latitude: -26.7725,
    longitude: -48.6464,
    area: 1350000,
    beds: 0,
    baths: 0,
    amenities: JSON.stringify([
      'Infraestrutura Completa',
      'Estacionamento para 5000 veículos',
      'Montanhas-russas',
      'Shows e Atrações',
      'Restaurantes',
      'Lojas',
      'Segurança 24h',
      'Acesso Rodovia'
    ]),
    images: JSON.stringify([
      '/Teste/Imóvel1.jpg',
      '/Teste/Imóvel2.jpg',
      '/Teste/Praia1.jpg',
      '/Teste/Praia2.jpg'
    ]),
    mainImage: '/Teste/Imóvel1.jpg',
    nearbyPlaces: JSON.stringify({
      supermarkets: [
        { name: 'Supermercado Imperatriz', vicinity: 'Av. Nereu Ramos, 5800 - Penha', rating: 4.2, userRatingsTotal: 456, distanceText: '3.5km', lat: -26.7680, lng: -48.6420 }
      ],
      restaurants: [
        { name: 'Restaurante do Parque', vicinity: 'Beto Carrero World', rating: 4.0, userRatingsTotal: 1234, distanceText: '200m', lat: -26.7720, lng: -48.6460 },
        { name: 'Churrascaria Gaúcha', vicinity: 'BR-101, Km 388', rating: 4.5, userRatingsTotal: 892, distanceText: '1.8km', lat: -26.7740, lng: -48.6480 }
      ],
      hotels: [
        { name: 'Beto Carrero World Hotel', vicinity: 'Rod. BR-101, Km 390', rating: 4.6, userRatingsTotal: 2341, distanceText: '500m', lat: -26.7730, lng: -48.6470 }
      ],
      transit_stations: [
        { name: 'Parada de Ônibus Beto Carrero', vicinity: 'BR-101', rating: 3.8, userRatingsTotal: 123, distanceText: '300m', lat: -26.7728, lng: -48.6465 }
      ],
      parks: [
        { name: 'Praia de Armação', vicinity: 'Penha, SC', rating: 4.7, userRatingsTotal: 3421, distanceText: '8.5km', lat: -26.7550, lng: -48.6350 }
      ]
    }),
    rating: 5.0,
    viewCount: 892,
    published: true
  },
  {
    title: 'Sobrado Familiar em Americana',
    description: 'Lindo sobrado em condomínio fechado, 4 suítes, piscina, churrasqueira, área gourmet completa. Acabamento de primeira, cozinha planejada, closets. Segurança e conforto para sua família.',
    type: 'Sobrado',
    price: 1250000,
    currency: 'BRL',
    address: 'Rua das Palmeiras, 234',
    city: 'Americana',
    state: 'SP',
    country: 'Brasil',
    zipCode: '13468-000',
    latitude: -22.7390,
    longitude: -47.3314,
    area: 320,
    beds: 4,
    baths: 5,
    amenities: JSON.stringify([
      'Piscina',
      'Churrasqueira',
      'Área Gourmet',
      'Closet',
      'Cozinha Planejada',
      'Ar condicionado',
      'Aquecimento Solar',
      'Portaria 24h',
      'Quadra',
      'Salão de Festas'
    ]),
    images: JSON.stringify([
      '/Teste/Imóvel1.jpg',
      '/Teste/Imóvel2.jpg',
      '/Teste/Imóvel3.jpg',
      '/Teste/Imóvel4.jpg'
    ]),
    mainImage: '/Teste/Imóvel1.jpg',
    rating: 4.9,
    viewCount: 312,
    published: true
  },
  {
    title: 'Chácara em Vinhedo com Pomar',
    description: 'Maravilhosa chácara em Vinhedo com 5000m² de terreno, casa principal com 4 dormitórios, piscina, lago ornamental, pomar de frutas, horta orgânica e canil. Ideal para relaxar nos finais de semana.',
    type: 'Chácara',
    price: 1580000,
    currency: 'BRL',
    address: 'Estrada Municipal VIN-364, Km 8',
    city: 'Vinhedo',
    state: 'SP',
    country: 'Brasil',
    zipCode: '13280-000',
    latitude: -23.0299,
    longitude: -46.9753,
    area: 5000,
    beds: 4,
    baths: 3,
    amenities: JSON.stringify([
      'Piscina',
      'Lago',
      'Pomar',
      'Horta',
      'Churrasqueira',
      'Canil',
      'Área Gourmet',
      'Campo de Futebol',
      'Playground',
      'Portão Eletrônico'
    ]),
    images: JSON.stringify([
      '/Teste/Praia1.jpg',
      '/Teste/Praia2.jpg',
      '/Teste/Imóvel1.jpg',
      '/Teste/Imóvel2.jpg'
    ]),
    mainImage: '/Teste/Praia1.jpg',
    rating: 4.8,
    viewCount: 245,
    published: true
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
