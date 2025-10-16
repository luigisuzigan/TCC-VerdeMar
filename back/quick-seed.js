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
        {
          userId: admin.id,
          title: 'Casa Moderna com Vista para o Mar',
          description: 'Linda casa moderna com piscina e churrasqueira',
          type: 'Casa',
          price: 1850000,
          currency: 'BRL',
          address: 'Rua das Flores, 123 - Jurerê',
          city: 'Florianópolis',
          state: 'SC',
          country: 'Brasil',
          zipCode: '88053-000',
          latitude: -27.4168,
          longitude: -48.4991,
          area: 250,
          beds: 4,
          baths: 3,
          guests: 8,
          amenities: '["piscina","churrasqueira","vista_mar"]',
          images: '["/Teste/Imóvel1.jpg","/Teste/Imóvel2.jpg"]',
          published: true,
          featured: true,
          rating: 4.8,
          reviewCount: 12
        },
        {
          userId: admin.id,
          title: 'Apartamento Luxuoso Centro',
          description: 'Apartamento de alto padrão com 3 suítes',
          type: 'Apartamento',
          price: 980000,
          currency: 'BRL',
          address: 'Av Beira Mar Norte, 456 - Centro',
          city: 'Florianópolis',
          state: 'SC',
          country: 'Brasil',
          zipCode: '88015-700',
          latitude: -27.5935,
          longitude: -48.5501,
          area: 120,
          beds: 3,
          baths: 3,
          guests: 6,
          amenities: '["academia","piscina","elevador"]',
          images: '["/Teste/Imóvel2.jpg","/Teste/Imóvel3.jpg"]',
          published: true,
          featured: true,
          rating: 4.9,
          reviewCount: 24
        },
        {
          userId: admin.id,
          title: 'Cobertura Duplex Frente Mar',
          description: 'Cobertura espetacular com vista panorâmica',
          type: 'Cobertura',
          price: 3200000,
          currency: 'BRL',
          address: 'Av Atlântica, 789 - Praia Central',
          city: 'Florianópolis',
          state: 'SC',
          country: 'Brasil',
          zipCode: '88010-000',
          latitude: -27.5969,
          longitude: -48.5495,
          area: 350,
          beds: 4,
          baths: 5,
          guests: 10,
          amenities: '["piscina_privativa","churrasqueira","vista_mar"]',
          images: '["/Teste/Imóvel3.jpg","/Teste/Imóvel4.jpg"]',
          published: true,
          featured: true,
          rating: 5.0,
          reviewCount: 8
        },
        {
          userId: admin.id,
          title: 'Casa Confortável em Condomínio',
          description: 'Casa aconchegante em condomínio fechado',
          type: 'Casa',
          price: 750000,
          currency: 'BRL',
          address: 'Rua dos Pinheiros, 321 - Campeche',
          city: 'Florianópolis',
          state: 'SC',
          country: 'Brasil',
          zipCode: '88063-000',
          latitude: -27.6808,
          longitude: -48.4858,
          area: 180,
          beds: 3,
          baths: 2,
          guests: 6,
          amenities: '["churrasqueira","area_servico","piscina"]',
          images: '["/Teste/Imóvel4.jpg","/Teste/Imóvel1.jpg"]',
          published: true,
          featured: false,
          rating: 4.6,
          reviewCount: 15
        },
        {
          userId: admin.id,
          title: 'Casa de Praia com Piscina',
          description: 'Casa de veraneio a poucos metros da praia',
          type: 'Casa',
          price: 1200000,
          currency: 'BRL',
          address: 'Rua da Praia, 567 - Ingleses',
          city: 'Florianópolis',
          state: 'SC',
          country: 'Brasil',
          zipCode: '88058-000',
          latitude: -27.4411,
          longitude: -48.3905,
          area: 220,
          beds: 4,
          baths: 3,
          guests: 8,
          amenities: '["piscina","churrasqueira","vista_mar"]',
          images: '["/Teste/Praia1.jpg","/Teste/Praia2.jpg"]',
          published: true,
          featured: false,
          rating: 4.7,
          reviewCount: 19
        },
        {
          userId: admin.id,
          title: 'Apartamento Compacto Canasvieiras',
          description: 'Apartamento studio perfeito para temporada',
          type: 'Apartamento',
          price: 350000,
          currency: 'BRL',
          address: 'Av das Nações, 890 - Canasvieiras',
          city: 'Florianópolis',
          state: 'SC',
          country: 'Brasil',
          zipCode: '88054-000',
          latitude: -27.4264,
          longitude: -48.4644,
          area: 45,
          beds: 1,
          baths: 1,
          guests: 2,
          amenities: '["ar_condicionado","mobiliado","elevador"]',
          images: '["/Teste/Imóvel2.jpg","/Teste/Imóvel3.jpg"]',
          published: true,
          featured: false,
          rating: 4.3,
          reviewCount: 7
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
