import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Script para adicionar amenidades completas e condições naturais aos imóveis
 */
async function addAmenitiesAndNature() {
  try {
    console.log('🎨 Adicionando amenidades e condições naturais aos imóveis...\n');

    // Buscar todos os imóveis
    const properties = await prisma.property.findMany({
      select: {
        id: true,
        title: true,
        type: true,
        neighborhood: true,
      },
      orderBy: { id: 'asc' },
    });

    console.log(`📊 Encontrados ${properties.length} imóveis\n`);

    // Definir amenidades e condições naturais por imóvel
    const propertyData = [
      // Imóvel 1 - Apartamento moderno (Lagoa da Conceição)
      {
        amenities: [
          // Lazer
          'Piscina', 'Academia', 'Sauna', 'Salão de festas', 'Churrasqueira',
          'Playground', 'Salão de jogos', 'Espaço gourmet',
          // Tecnologia
          'Wi-Fi', 'Internet fibra óptica', 'Smart home', 'TV a cabo', 
          'Videoporteiro', 'Portão Eletrônico',
          // Climatização
          'Ar-condicionado', 'Ventilador de teto',
          // Garagem
          'Garagem coberta', 'Vaga privativa', 'Portão automático',
          // Cozinha
          'Cozinha equipada', 'Fogão', 'Forno elétrico', 'Micro-ondas',
          'Geladeira', 'Coifa',
          // Segurança
          'Portaria 24h', 'Circuito de câmeras', 'Alarme', 'Controle de acesso',
          // Acessibilidade
          'Elevador', 'Rampa de acesso',
          // Condomínio
          'Coworking', 'Bicicletário', 'Lavanderia',
          // Utilidades
          'Área de serviço', 'Aquecimento Solar',
          // Quartos
          'Suíte', 'Closet', 'Box blindex', 'Armários embutidos',
          // Acabamentos
          'Piso porcelanato', 'Gesso', 'Iluminação LED', 'Esquadrias de alumínio',
        ],
        naturalConditions: [
          // Vista
          'Vista para a lagoa', 'Vista panorâmica',
          // Ventilação
          'Ventilação cruzada', 'Brisa constante',
          // Iluminação
          'Iluminação natural abundante', 'Sol da manhã',
          // Clima
          'Clima tropical', 'Temperatura amena',
          // Natureza
          'Área verde próxima', 'Arborizado',
          // Topografia
          'Terreno plano',
          // Praia
          'Praia próxima', 'Vista para o mar à distância',
          // Água
          'Lagoa próxima',
        ],
      },

      // Imóvel 2 - Casa na praia (Jurerê Internacional)
      {
        amenities: [
          // Lazer
          'Piscina aquecida', 'Piscina infantil', 'Spa', 'Churrasqueira',
          'Deck', 'Jardim', 'Quadra poliesportiva', 'Campo de futebol',
          'Cinema',
          // Tecnologia
          'Wi-Fi', 'Internet fibra óptica', 'Smart home', 'TV a cabo',
          'Videoporteiro', 'Câmeras de segurança',
          // Climatização
          'Ar-condicionado central', 'Lareira', 'Ventilador de teto',
          // Garagem
          'Garagem coberta', 'Vaga para visitantes', 'Carregador elétrico',
          'Portão automático',
          // Cozinha
          'Cozinha equipada', 'Cozinha americana', 'Fogão', 'Cooktop',
          'Forno elétrico', 'Micro-ondas', 'Geladeira', 'Lava-louças',
          'Adega', 'Dispensa',
          // Segurança
          'Portaria 24h', 'Circuito de câmeras', 'Cerca elétrica', 'Alarme',
          'Guarita', 'Sistema anti-incêndio',
          // Pets
          'Pet place', 'Aceita animais', 'Área para passeio',
          // Condomínio
          'Salão de Festas', 'Biblioteca', 'Praça interna', 'Horta comunitária',
          // Utilidades
          'Área de serviço', 'Depósito', 'Aquecedor solar', 'Energia Solar',
          // Quartos
          'Suíte master', 'Closet', 'Banheira', 'Hidromassagem',
          'Varanda no quarto',
          // Acabamentos
          'Piso porcelanato', 'Mármore', 'Gesso', 'Sanca de gesso',
          'Iluminação LED', 'Persianas', 'Portas de madeira',
        ],
        naturalConditions: [
          // Vista
          'Vista para o mar', 'Frente para praia', 'Pôr do sol',
          // Ventilação
          'Ventilação oceânica', 'Brisa marinha constante',
          // Iluminação
          'Iluminação natural abundante', 'Sol pleno',
          // Clima
          'Clima litorâneo', 'Verão prolongado',
          // Natureza
          'Vegetação nativa', 'Restinga preservada',
          // Topografia
          'Terreno elevado',
          // Especiais
          'Som das ondas', 'Nascente voltado para o mar',
          // Praia
          'Praia em frente', 'Acesso direto à praia', 'Areia branca',
          // Água
          'Mar calmo',
        ],
      },

      // Imóvel 3 - Cobertura luxo (Barra da Lagoa)
      {
        amenities: [
          // Lazer
          'Piscina', 'Piscina aquecida', 'Academia', 'Sauna', 'Spa',
          'Churrasqueira', 'Espaço gourmet', 'Salão de festas', 'Cinema',
          'Varanda', 'Deck', 'Jardim',
          // Tecnologia
          'Wi-Fi', 'Internet fibra óptica', 'Smart home', 'TV a cabo',
          'Videoporteiro', 'Interfone',
          // Climatização
          'Ar-condicionado central', 'Ventilador de teto',
          // Garagem
          'Garagem coberta', 'Box individual', 'Vaga privativa',
          'Carregador elétrico', 'Portão automático',
          // Cozinha
          'Cozinha equipada', 'Cozinha americana', 'Cooktop', 'Forno elétrico',
          'Micro-ondas', 'Geladeira', 'Lava-louças', 'Adega', 'Dispensa',
          'Bancada em granito', 'Ilha central',
          // Segurança
          'Portaria 24h', 'Circuito de câmeras', 'Alarme', 'Controle de acesso',
          'Detector de fumaça', 'Cofre',
          // Acessibilidade
          'Elevador', 'Elevador privativo',
          // Condomínio
          'Coworking', 'Bicicletário', 'Redário', 'Gazebo',
          // Utilidades
          'Área de serviço', 'Lavanderia coletiva', 'Depósito',
          'Aquecimento Solar',
          // Quartos
          'Suíte master', 'Closet', 'Banheira', 'Hidromassagem',
          'Box blindex', 'Varanda no quarto',
          // Acabamentos
          'Piso porcelanato', 'Mármore', 'Granito', 'Gesso', 'Sanca de gesso',
          'Iluminação LED', 'Spots de luz', 'Papel de parede', 'Cortinas',
          'Portas de madeira', 'Vidros temperados',
        ],
        naturalConditions: [
          // Vista
          'Vista 360 graus', 'Vista para o mar', 'Vista para a montanha',
          'Vista panorâmica', 'Pôr do sol espetacular',
          // Ventilação
          'Ventilação cruzada', 'Brisa constante', 'Corrente de ar natural',
          // Iluminação
          'Iluminação natural em todos os cômodos', 'Sol nascente', 'Sol poente',
          // Clima
          'Microclima agradável', 'Temperatura equilibrada',
          // Natureza
          'Mata atlântica preservada', 'Vegetação ao redor', 'Passarinhos',
          // Topografia
          'Ponto mais alto da região',
          // Especiais
          'Amanhecer privilegiado', 'Céu estrelado',
          // Praia
          'Vista para múltiplas praias', 'Proximidade com praia',
          // Água
          'Rio próximo', 'Lagoa visível',
        ],
      },

      // Imóvel 4 - Apartamento econômico (Canasvieiras)
      {
        amenities: [
          // Lazer
          'Piscina', 'Playground', 'Churrasqueira', 'Salão de festas',
          // Tecnologia
          'Wi-Fi', 'Interfone',
          // Climatização
          'Ventilador de teto',
          // Garagem
          'Garagem coberta', 'Vaga privativa',
          // Cozinha
          'Cozinha equipada', 'Fogão', 'Geladeira',
          // Segurança
          'Portaria 24h', 'Porteiro eletrônico',
          // Acessibilidade
          'Elevador',
          // Condomínio
          'Bicicletário', 'Lavanderia',
          // Utilidades
          'Área de serviço', 'Tanque',
          // Quartos
          'Armários embutidos', 'Box',
          // Acabamentos
          'Piso laminado', 'Gesso', 'Iluminação LED',
        ],
        naturalConditions: [
          // Vista
          'Vista urbana',
          // Ventilação
          'Ventilação natural',
          // Iluminação
          'Iluminação natural', 'Sol da tarde',
          // Clima
          'Clima tropical',
          // Natureza
          'Área verde no condomínio',
          // Topografia
          'Terreno plano',
          // Praia
          'Praia próxima',
        ],
      },

      // Imóvel 5 - Casa térrea (Campeche)
      {
        amenities: [
          // Lazer
          'Churrasqueira', 'Jardim', 'Área Gourmet', 'Varanda', 'Quintal',
          // Tecnologia
          'Wi-Fi', 'Internet fibra óptica', 'Portão Eletrônico',
          // Climatização
          'Ar-condicionado', 'Ventilador de teto',
          // Garagem
          'Garagem coberta', 'Garagem descoberta', 'Portão automático',
          // Cozinha
          'Cozinha equipada', 'Fogão', 'Forno elétrico', 'Geladeira',
          'Dispensa',
          // Segurança
          'Alarme', 'Grades', 'Cerca elétrica', 'Câmeras',
          // Pets
          'Aceita animais', 'Área para passeio', 'Quintal amplo',
          // Utilidades
          'Área de serviço', 'Tanque', 'Depósito', 'Aquecedor solar',
          'Cisterna',
          // Quartos
          'Suíte', 'Closet', 'Armários embutidos',
          // Acabamentos
          'Piso porcelanato', 'Gesso', 'Iluminação LED', 'Persianas',
          'Portas de madeira',
        ],
        naturalConditions: [
          // Vista
          'Vista para dunas', 'Horizonte aberto',
          // Ventilação
          'Ventilação natural abundante', 'Brisa oceânica',
          // Iluminação
          'Iluminação natural em todos os ambientes', 'Sol o dia todo',
          // Clima
          'Clima litorâneo', 'Ventos constantes',
          // Natureza
          'Vegetação nativa', 'Dunas preservadas', 'Área verde extensa',
          'Passarinhos nativos',
          // Topografia
          'Terreno plano', 'Área ampla',
          // Especiais
          'Céu limpo', 'Silêncio',
          // Praia
          'Praia próxima', 'Caminho para praia',
          // Água
          'Lagoa do Peri próxima',
        ],
      },

      // Imóvel 6 - Apartamento compacto (Centro)
      {
        amenities: [
          // Lazer
          'Academia', 'Salão de festas', 'Coworking',
          // Tecnologia
          'Wi-Fi', 'Internet fibra óptica', 'Smart home', 'Videoporteiro',
          // Climatização
          'Ar-condicionado',
          // Garagem
          'Garagem coberta', 'Vaga privativa',
          // Cozinha
          'Cozinha americana', 'Fogão', 'Micro-ondas', 'Geladeira',
          // Segurança
          'Portaria 24h', 'Circuito de câmeras', 'Controle de acesso',
          // Acessibilidade
          'Elevador', 'Rampa de acesso',
          // Condomínio
          'Coworking', 'Bicicletário', 'Lavanderia',
          // Utilidades
          'Área de serviço', 'Lavanderia coletiva',
          // Quartos
          'Armários embutidos', 'Box blindex',
          // Acabamentos
          'Piso porcelanato', 'Gesso', 'Iluminação LED', 'Spots de luz',
          'Vidros temperados',
        ],
        naturalConditions: [
          // Vista
          'Vista urbana', 'Vista da cidade',
          // Ventilação
          'Ventilação cruzada',
          // Iluminação
          'Iluminação natural', 'Sol da manhã',
          // Clima
          'Clima urbano',
          // Topografia
          'Área central',
          // Proximidade
          'Centro comercial', 'Transporte público próximo',
        ],
      },
    ];

    // Atualizar cada imóvel
    for (let i = 0; i < properties.length && i < propertyData.length; i++) {
      const property = properties[i];
      const data = propertyData[i];

      console.log(`\n🏠 Atualizando: ${property.title}`);
      console.log(`   Bairro: ${property.neighborhood}`);
      console.log(`   Amenidades: ${data.amenities.length} itens`);
      console.log(`   Condições Naturais: ${data.naturalConditions.length} itens`);

      await prisma.property.update({
        where: { id: property.id },
        data: {
          amenities: JSON.stringify(data.amenities),
          naturalConditions: JSON.stringify(data.naturalConditions),
        },
      });

      console.log(`   ✅ Atualizado com sucesso!`);

      // Preview das amenidades
      console.log(`\n   📋 Amenidades (primeiras 10):`);
      data.amenities.slice(0, 10).forEach((amenity, idx) => {
        console.log(`      ${idx + 1}. ${amenity}`);
      });
      if (data.amenities.length > 10) {
        console.log(`      ... e mais ${data.amenities.length - 10} itens`);
      }

      // Preview das condições naturais
      console.log(`\n   🌿 Condições Naturais (primeiras 8):`);
      data.naturalConditions.slice(0, 8).forEach((condition, idx) => {
        console.log(`      ${idx + 1}. ${condition}`);
      });
      if (data.naturalConditions.length > 8) {
        console.log(`      ... e mais ${data.naturalConditions.length - 8} itens`);
      }
    }

    console.log('\n\n✅ Todos os imóveis foram atualizados com amenidades e condições naturais!');
    console.log('\n📊 Estatísticas:');
    console.log(`   • ${properties.length} imóveis atualizados`);
    
    const totalAmenities = propertyData.reduce((sum, p) => sum + p.amenities.length, 0);
    const totalNature = propertyData.reduce((sum, p) => sum + p.naturalConditions.length, 0);
    
    console.log(`   • ${totalAmenities} amenidades adicionadas no total`);
    console.log(`   • ${totalNature} condições naturais adicionadas no total`);
    console.log(`   • Média de ${Math.round(totalAmenities / properties.length)} amenidades por imóvel`);
    console.log(`   • Média de ${Math.round(totalNature / properties.length)} condições naturais por imóvel`);

    console.log('\n\n🎨 Categorias de Amenidades incluídas:');
    console.log('   • Lazer (piscina, academia, churrasqueira, etc.)');
    console.log('   • Tecnologia (Wi-Fi, smart home, etc.)');
    console.log('   • Climatização (ar-condicionado, etc.)');
    console.log('   • Garagem e Estacionamento');
    console.log('   • Cozinha e Área Gourmet');
    console.log('   • Segurança');
    console.log('   • Acessibilidade');
    console.log('   • Pets e Família');
    console.log('   • Áreas Comuns do Condomínio');
    console.log('   • Utilidades');
    console.log('   • Características dos Quartos');
    console.log('   • Acabamentos');

    console.log('\n\n🌿 Categorias de Condições Naturais incluídas:');
    console.log('   • Vista (mar, montanha, panorâmica, etc.)');
    console.log('   • Ventilação (cruzada, brisa, oceânica, etc.)');
    console.log('   • Iluminação Natural');
    console.log('   • Clima e Temperatura');
    console.log('   • Natureza e Vegetação');
    console.log('   • Topografia');
    console.log('   • Características Especiais');
    console.log('   • Praia e Água');
    console.log('   • Proximidade Urbana');

  } catch (error) {
    console.error('❌ Erro ao atualizar imóveis:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Executar script
addAmenitiesAndNature()
  .then(() => {
    console.log('\n✨ Script finalizado com sucesso!');
    console.log('\n🚀 Próximos passos:');
    console.log('   1. Reinicie o backend: start-backend.bat');
    console.log('   2. Acesse os detalhes de um imóvel no frontend');
    console.log('   3. Veja as amenidades organizadas por categoria com ícones');
    console.log('   4. Veja as condições naturais categorizadas');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Erro fatal:', error);
    process.exit(1);
  });
