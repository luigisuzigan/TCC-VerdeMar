import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function quickSeed() {
  try {
    console.log('🌱 Seed rápido iniciado...\n');

    // 1. Criar admin se não existir
    let admin = await prisma.user.findFirst({ where: { email: 'admin@verdemar.com' } });
    
    if (!admin) {
      const hash = await bcrypt.hash('admin123', 10);
      admin = await prisma.user.create({
        data: {
          name: 'Admin VerdeMar',
          email: 'admin@verdemar.com',
          passwordHash: hash,
          role: 'ADMIN'
        }
      });
      console.log('✅ Admin criado');
    } else {
      console.log('✅ Admin já existe');
    }

    // 2. Verificar se já tem imóveis
    const count = await prisma.property.count();
    console.log(`📊 Imóveis existentes: ${count}`);

    if (count === 0) {
      console.log('📦 Criando imóveis de exemplo...\n');
      
      // Criar alguns imóveis com coordenadas reais de Florianópolis
      const properties = [
        // 1. Casa Moderna com Vista para o Mar
        {
          userId: admin.id,
          title: 'Casa Moderna com Vista para o Mar',
          description: 'Linda casa moderna com piscina e churrasqueira. Acabamento de primeira, cozinha gourmet integrada, suíte master com closet.',
          category: 'Residencial',
          type: 'Casa',
          style: 'Moderno',
          price: 1850000,
          currency: 'BRL',
          address: 'Rua das Flores, 123 - Jurerê',
          city: 'Florianópolis',
          state: 'SC',
          country: 'Brasil',
          neighborhood: 'Jurerê Internacional',
          zipCode: '88053-000',
          latitude: -27.4168,
          longitude: -48.4991,
          area: 250,
          lotSize: 450, // Terreno maior que área construída
          beds: 4,
          baths: 3,
          suites: 2,
          parkingSpaces: 3,
          condoFee: 850.00, // Condomínio fechado alto padrão
          iptu: 3200.00, // IPTU anual
          homeInsurance: 150.00, // Seguro mensal
          yearBuilt: 2020,
          propertyCondition: 'Seminovo',
          amenities: '["Piscina","Churrasqueira","Vista para o mar","Ar-condicionado","Cozinha Gourmet","Closet","Varanda","Jardim","Portaria 24h","Energia Solar"]',
          naturalConditions: '["Vista para o mar","Sol da manhã","Brisa marítima","Ventilação cruzada","Iluminação natural abundante"]',
          images: '["/Teste/Imóvel1.jpg","/Teste/Imóvel2.jpg","/Teste/Praia1.jpg"]',
          published: true,
          rating: 9.2
        },
        
        // 2. Apartamento Luxuoso Centro
        {
          userId: admin.id,
          title: 'Apartamento Luxuoso Centro - 3 Suítes',
          description: 'Apartamento de alto padrão com 3 suítes, vista panorâmica para a baía norte. Condomínio com completa infraestrutura.',
          category: 'Residencial',
          type: 'Apartamento',
          style: 'Luxo',
          price: 980000,
          currency: 'BRL',
          address: 'Av Beira Mar Norte, 456 - Centro',
          city: 'Florianópolis',
          state: 'SC',
          country: 'Brasil',
          neighborhood: 'Centro',
          zipCode: '88015-700',
          latitude: -27.5935,
          longitude: -48.5501,
          area: 120,
          beds: 3,
          baths: 3,
          suites: 3,
          parkingSpaces: 2,
          condoFee: 650.00,
          iptu: 1800.00,
          homeInsurance: 120.00,
          floor: 12,
          totalFloors: 20,
          yearBuilt: 2019,
          propertyCondition: 'Seminovo',
          amenities: '["Academia","Piscina","Elevador","Portaria 24h","Salão de Festas","Sauna","Churrasqueira","Ar-condicionado","Armários Embutidos","Box Blindex"]',
          naturalConditions: '["Vista panorâmica do mar","Vista para a cidade","Pé-direito Alto","Iluminação natural abundante","Face norte"]',
          images: '["/Teste/Imóvel2.jpg","/Teste/Imóvel3.jpg"]',
          published: true,
          rating: 9.5
        },
        
        // 3. Cobertura Duplex Frente Mar
        {
          userId: admin.id,
          title: 'Cobertura Duplex Frente Mar - Vista 360°',
          description: 'Cobertura espetacular com vista panorâmica 360°, piscina privativa com deck, churrasqueira e área gourmet. O imóvel dos sonhos!',
          category: 'Residencial',
          type: 'Cobertura',
          style: 'Luxo',
          price: 3200000,
          currency: 'BRL',
          address: 'Av Atlântica, 789 - Praia Central',
          city: 'Florianópolis',
          state: 'SC',
          country: 'Brasil',
          neighborhood: 'Centro',
          zipCode: '88010-000',
          latitude: -27.5969,
          longitude: -48.5495,
          area: 350,
          beds: 4,
          baths: 5,
          suites: 4,
          parkingSpaces: 4,
          condoFee: 1200.00,
          iptu: 5500.00,
          homeInsurance: 280.00,
          floor: 18,
          totalFloors: 18,
          yearBuilt: 2021,
          propertyCondition: 'Novo',
          amenities: '["Piscina Privativa","Churrasqueira","Vista para o mar","Academia","Elevador Privativo","Sauna","Spa","Hidromassagem","Ar-condicionado","Home Theater","Closet","Adega Climatizada","Automação Residencial"]',
          naturalConditions: '["Vista panorâmica do mar","Vista para a montanha","Nascer do sol","Pôr do sol","Frente para o mar","Iluminação natural abundante","Ventilação cruzada","Céu estrelado"]',
          images: '["/Teste/Imóvel3.jpg","/Teste/Imóvel4.jpg","/Teste/Praia2.jpg"]',
          published: true,
          rating: 10.0
        },
        
        // 4. Casa Confortável em Condomínio
        {
          userId: admin.id,
          title: 'Casa Confortável em Condomínio Fechado',
          description: 'Casa aconchegante em condomínio fechado com segurança 24h, piscina do condomínio, playground e área verde.',
          category: 'Residencial',
          type: 'Casa',
          style: 'Contemporâneo',
          price: 750000,
          currency: 'BRL',
          address: 'Rua dos Pinheiros, 321 - Campeche',
          city: 'Florianópolis',
          state: 'SC',
          country: 'Brasil',
          neighborhood: 'Campeche',
          zipCode: '88063-000',
          latitude: -27.6808,
          longitude: -48.4858,
          area: 180,
          lotSize: 300,
          beds: 3,
          baths: 2,
          suites: 1,
          parkingSpaces: 2,
          condoFee: 380.00,
          iptu: 1500.00,
          homeInsurance: 90.00,
          yearBuilt: 2018,
          propertyCondition: 'Usado',
          amenities: '["Churrasqueira","Área de Serviço","Piscina do Condomínio","Portaria 24h","Playground Infantil","Jardim","Ar-condicionado","Cozinha Planejada"]',
          naturalConditions: '["Sol da manhã","Ventilação natural","Área verde","Rua arborizada","Proximidade à natureza"]',
          images: '["/Teste/Imóvel4.jpg","/Teste/Imóvel1.jpg"]',
          published: true,
          rating: 8.5
        },
        
        // 5. Casa de Praia com Piscina
        {
          userId: admin.id,
          title: 'Casa de Praia com Piscina - Ingleses',
          description: 'Casa de veraneio a poucos metros da praia de Ingleses. Piscina aquecida, churrasqueira e ampla área de lazer.',
          category: 'Residencial',
          type: 'Casa',
          style: 'Tropical',
          price: 1200000,
          currency: 'BRL',
          address: 'Rua da Praia, 567 - Ingleses',
          city: 'Florianópolis',
          state: 'SC',
          country: 'Brasil',
          neighborhood: 'Ingleses',
          zipCode: '88058-000',
          latitude: -27.4411,
          longitude: -48.3905,
          area: 220,
          lotSize: 400,
          beds: 4,
          baths: 3,
          suites: 2,
          parkingSpaces: 3,
          condoFee: null, // Casa sem condomínio
          iptu: 2400.00,
          homeInsurance: 110.00,
          yearBuilt: 2017,
          propertyCondition: 'Reformado',
          amenities: '["Piscina Aquecida","Churrasqueira","Vista para o mar","Deck","Área Gourmet","Jardim","Ar-condicionado","WiFi","Varanda"]',
          naturalConditions: '["A 100m da praia","Vista para a praia","Som das ondas","Brisa marítima","Sol o dia todo","Caminhada até a praia"]',
          images: '["/Teste/Praia1.jpg","/Teste/Praia2.jpg","/Teste/Praia3.jpg"]',
          published: true,
          rating: 8.8
        },
        
        // 6. Apartamento Compacto Canasvieiras
        {
          userId: admin.id,
          title: 'Apartamento Compacto - Canasvieiras',
          description: 'Apartamento studio perfeito para temporada ou investimento. Mobiliado, próximo à praia de Canasvieiras.',
          category: 'Residencial',
          type: 'Kitnet / Studio / Loft',
          style: 'Compacto',
          price: 350000,
          currency: 'BRL',
          address: 'Av das Nações, 890 - Canasvieiras',
          city: 'Florianópolis',
          state: 'SC',
          country: 'Brasil',
          neighborhood: 'Canasvieiras',
          zipCode: '88054-000',
          latitude: -27.4264,
          longitude: -48.4644,
          area: 45,
          beds: 1,
          baths: 1,
          suites: 0,
          parkingSpaces: 1,
          condoFee: 280.00,
          iptu: 600.00,
          homeInsurance: 45.00,
          floor: 5,
          totalFloors: 8,
          yearBuilt: 2016,
          propertyCondition: 'Usado',
          amenities: '["Ar-condicionado","Mobiliado","Elevador","WiFi","Cozinha Equipada","Portaria","Piscina do Condomínio"]',
          naturalConditions: '["Próximo a praia","Sol da manhã","Ventilação natural","A 200m da praia"]',
          images: '["/Teste/Imóvel2.jpg","/Teste/Imóvel3.jpg"]',
          published: true,
          rating: 7.8
        },
        
        // 7. Terreno em Condomínio
        {
          userId: admin.id,
          title: 'Terreno Residencial em Condomínio Fechado',
          description: 'Excelente terreno plano em condomínio de alto padrão. Pronto para construir a casa dos seus sonhos.',
          category: 'Terreno',
          type: 'Terreno em condomínio',
          style: null,
          price: 450000,
          currency: 'BRL',
          address: 'Rua dos Lírios, 100 - Cachoeira do Bom Jesus',
          city: 'Florianópolis',
          state: 'SC',
          country: 'Brasil',
          neighborhood: 'Cachoeira do Bom Jesus',
          zipCode: '88056-000',
          latitude: -27.4522,
          longitude: -48.4378,
          area: 600,
          lotSize: 600, // Para terreno, area = lotSize
          beds: 0, // Terreno não tem quartos
          baths: 0,
          suites: 0,
          parkingSpaces: 0,
          condoFee: 250.00, // Terreno em condomínio tem taxa
          iptu: 800.00,
          homeInsurance: null, // Terreno não tem seguro residencial
          yearBuilt: null,
          propertyCondition: null,
          amenities: '["Portaria 24h","Área verde","Rua pavimentada","Energia elétrica","Água encanada"]',
          naturalConditions: '["Terreno plano","Solo firme","Vista para área verde","Arborizado","Ventilação natural"]',
          images: '["/Teste/Imóvel1.jpg"]',
          published: true,
          rating: 8.0
        },
        
        // 8. Sobrado Moderno
        {
          userId: admin.id,
          title: 'Sobrado Moderno 3 Andares - Lagoa da Conceição',
          description: 'Sobrado arquitetônico com 3 pavimentos, acabamento premium, piscina com deck e vista para a lagoa.',
          category: 'Residencial',
          type: 'Sobrado',
          style: 'Moderno',
          price: 2100000,
          currency: 'BRL',
          address: 'Rua das Rendeiras, 555 - Lagoa da Conceição',
          city: 'Florianópolis',
          state: 'SC',
          country: 'Brasil',
          neighborhood: 'Lagoa da Conceição',
          zipCode: '88062-000',
          latitude: -27.6034,
          longitude: -48.4567,
          area: 320,
          lotSize: 480,
          beds: 5,
          baths: 4,
          suites: 3,
          parkingSpaces: 4,
          condoFee: null, // Sobrado fora de condomínio
          iptu: 4200.00,
          homeInsurance: 180.00,
          totalFloors: 3, // Sobrado de 3 andares
          yearBuilt: 2022,
          propertyCondition: 'Novo',
          amenities: '["Piscina","Churrasqueira","Vista para a Lagoa","Elevador","Ar-condicionado","Closet","Home Theater","Cozinha Gourmet","Deck","Lareira","Aquecimento Solar","Automação Residencial"]',
          naturalConditions: '["Vista para a lagoa","Vista para a montanha","Sol o dia todo","Ventilação cruzada","Iluminação natural abundante","Pé-direito Alto"]',
          images: '["/Teste/Imóvel4.jpg","/Teste/Imóvel3.jpg","/Teste/Praia1.jpg"]',
          published: true,
          rating: 9.7
        }
      ];

      for (const prop of properties) {
        await prisma.property.create({ data: prop });
        console.log(`✅ Criado: ${prop.title}`);
      }

      console.log(`\n🎉 ${properties.length} imóveis criados!`);
    } else {
      console.log('ℹ️  Imóveis já existem no banco');
    }

    // 3. Mostrar resumo
    const total = await prisma.property.count();
    const published = await prisma.property.count({ where: { published: true } });
    
    console.log('\n📊 Resumo Final:');
    console.log(`   Total: ${total} imóveis`);
    console.log(`   Publicados: ${published} imóveis`);
    console.log('\n✅ Tudo pronto! API rodando em http://localhost:4000');
    console.log('✅ Frontend em http://localhost:5173');
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

quickSeed();
