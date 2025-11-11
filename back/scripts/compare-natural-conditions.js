import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Opções do Admin Form (o que pode ser cadastrado)
const ADMIN_FORM_OPTIONS = [
  // Vista e Localização
  "Vista para o mar", "Vista panorâmica do mar", "Frente para o mar",
  "Pé na areia", "Vista para a praia", "Vista para a montanha",
  "Vista para o lago", "Vista para o rio", "Vista para a cidade",
  "Vista para a natureza", "Vista para o verde", "Vista para o parque",
  "Vista desobstruída", "Vista privilegiada",
  
  // Ventilação e Ar
  "Ventilação natural", "Ventilação cruzada", "Brisa marítima",
  "Brisa constante", "Circulação de ar excelente", "Ambientes arejados",
  "Janelas amplas", "Portas de vidro",
  
  // Iluminação Solar
  "Sol da manhã", "Sol da tarde", "Sol o dia todo", "Muito sol",
  "Iluminação natural abundante", "Claridade natural",
  "Face norte", "Face sul", "Face leste", "Face oeste",
  "Claraboias / Luz zenital",
  
  // Clima e Conforto
  "Clima ameno", "Clima tropical", "Temperatura agradável",
  "Fresco no verão", "Quente no inverno",
  "Sombra natural de árvores", "Microclima agradável",
  
  // Natureza e Verde
  "Área verde", "Arborizado", "Jardim natural", "Mata nativa",
  "Árvores frutíferas", "Pomar", "Horta", "Contato com a natureza",
  "Fauna local", "Pássaros", "Borboletas", "Ecossistema preservado",
  
  // Terreno e Topografia
  "Terreno plano", "Terreno em declive", "Terreno em aclive",
  "Elevado / Ponto alto", "Vista de cima", "Solo firme", "Solo drenado",
  
  // Características Especiais
  "Nascer do sol", "Pôr do sol", "Céu estrelado", "Noite tranquila",
  "Silêncio / Ambiente calmo", "Privacidade", "Área isolada",
  "Exclusividade", "Som das ondas", "Acesso direto à praia",
  
  // Sustentabilidade
  "Casa sustentável", "Bioconstrução", "Materiais naturais",
  "Captação de água da chuva", "Compostagem", "Fossa ecológica",
  "Biodigestor", "Energia renovável", "Baixo impacto ambiental",
  "Água de nascente / Poço artesiano"
];

// Opções do FiltersModal (o que o usuário pode filtrar)
const FILTER_MODAL_OPTIONS = [
  'Vista para o mar', 'Vista panorâmica do mar', 'Frente para o mar',
  'Pé na areia', 'Praia', 'Vista para a montanha',
  'Vista para lago', 'Vista para rio', 'Vista para cidade',
  'Vista para natureza', 'Vista desobstruída', 'Vista privilegiada',
  'Ventilação natural', 'Ventilação cruzada', 'Brisa marítima',
  'Brisa constante', 'Circulação de ar excelente', 'Ambientes arejados',
  'Sol da manhã', 'Sol da tarde', 'Sol o dia todo',
  'Muito sol', 'Iluminação natural', 'Claridade natural',
  'Face norte', 'Face sul', 'Face leste', 'Face oeste',
  'Clima ameno', 'Clima tropical', 'Temperatura agradável',
  'Fresco no verão', 'Sombra natural', 'Microclima',
  'Área verde', 'Rua arborizada', 'Jardim natural', 'Mata nativa',
  'Árvores frutíferas', 'Pomar', 'Horta', 'Proximidade à natureza',
  'Fauna local', 'Pássaros', 'Ecossistema preservado',
  'Terreno plano', 'Terreno em declive', 'Terreno em aclive',
  'Elevado', 'Solo firme', 'Solo drenado',
  'Nascer do sol', 'Pôr do sol', 'Céu estrelado', 'Noite tranquila',
  'Silêncio', 'Privacidade', 'Área isolada',
  'Exclusividade', 'Som das ondas', 'Acesso à praia',
  'Vista para o parque', 'Janelas amplas',
  'Casa sustentável', 'Bioconstrução', 'Materiais naturais',
  'Captação de água', 'Compostagem', 'Fossa ecológica',
  'Energia renovável', 'Baixo impacto', 'Poço artesiano'
];

async function compareConditions() {
  try {
    const properties = await prisma.property.findMany({
      select: { title: true, naturalConditions: true }
    });

    const dbConditions = new Set();
    
    properties.forEach(property => {
      if (property.naturalConditions) {
        try {
          const conditions = typeof property.naturalConditions === 'string' 
            ? JSON.parse(property.naturalConditions) 
            : property.naturalConditions;
          
          if (Array.isArray(conditions)) {
            conditions.forEach(c => dbConditions.add(c));
          }
        } catch (e) {}
      }
    });

    console.log('\n═════════════════════════════════════════════════════════');
    console.log('📊 ANÁLISE COMPLETA DE CONDIÇÕES NATURAIS');
    console.log('═════════════════════════════════════════════════════════\n');

    console.log('📍 SITUAÇÃO ATUAL:\n');
    console.log(`   Admin Form (pode cadastrar): ${ADMIN_FORM_OPTIONS.length} opções`);
    console.log(`   FiltersModal (pode filtrar):  ${FILTER_MODAL_OPTIONS.length} opções`);
    console.log(`   Banco de dados (existe):      ${dbConditions.size} valores únicos`);

    console.log('\n─────────────────────────────────────────────────────────\n');

    // 1. Valores no banco que NÃO ESTÃO no FiltersModal (usuário não pode filtrar)
    const inDbNotInFilter = Array.from(dbConditions).filter(
      condition => !FILTER_MODAL_OPTIONS.includes(condition)
    );

    console.log('❌ PROBLEMA 1: Valores no BANCO que NÃO ESTÃO no FILTRO');
    console.log('   (Usuário não consegue filtrar por esses valores)\n');
    if (inDbNotInFilter.length > 0) {
      inDbNotInFilter.forEach(c => console.log(`   - "${c}"`));
    } else {
      console.log('   ✅ Nenhum problema encontrado!');
    }

    console.log('\n─────────────────────────────────────────────────────────\n');

    // 2. Valores no FiltersModal que NÃO ESTÃO no banco (filtro inútil)
    const inFilterNotInDb = FILTER_MODAL_OPTIONS.filter(
      option => !dbConditions.has(option)
    );

    console.log('⚠️  PROBLEMA 2: Valores no FILTRO que NÃO EXISTEM no BANCO');
    console.log('   (Filtros que nunca vão retornar resultados)\n');
    if (inFilterNotInDb.length > 0) {
      console.log(`   Total: ${inFilterNotInDb.length} opções inúteis\n`);
      inFilterNotInDb.forEach(c => console.log(`   - "${c}"`));
    } else {
      console.log('   ✅ Nenhum problema encontrado!');
    }

    console.log('\n─────────────────────────────────────────────────────────\n');

    // 3. Valores no Admin que NÃO ESTÃO no banco (nunca foram usados)
    const inAdminNotInDb = ADMIN_FORM_OPTIONS.filter(
      option => !dbConditions.has(option)
    );

    console.log('ℹ️  INFO: Opções no ADMIN FORM que NUNCA FORAM USADAS');
    console.log('   (Disponíveis para cadastro mas nenhum imóvel tem ainda)\n');
    if (inAdminNotInDb.length > 0) {
      console.log(`   Total: ${inAdminNotInDb.length} opções não utilizadas\n`);
      inAdminNotInDb.slice(0, 10).forEach(c => console.log(`   - "${c}"`));
      if (inAdminNotInDb.length > 10) {
        console.log(`   ... e mais ${inAdminNotInDb.length - 10} opções`);
      }
    } else {
      console.log('   ✅ Todas as opções já foram usadas!');
    }

    console.log('\n─────────────────────────────────────────────────────────\n');

    // 4. Valores no banco que NÃO ESTÃO no Admin (como foram cadastrados?)
    const inDbNotInAdmin = Array.from(dbConditions).filter(
      condition => !ADMIN_FORM_OPTIONS.includes(condition)
    );

    console.log('🚨 PROBLEMA 3: Valores no BANCO que NÃO ESTÃO no ADMIN FORM');
    console.log('   (Como esses valores foram cadastrados?)\n');
    if (inDbNotInAdmin.length > 0) {
      inDbNotInAdmin.forEach(c => console.log(`   - "${c}"`));
    } else {
      console.log('   ✅ Nenhum problema encontrado!');
    }

    console.log('\n═════════════════════════════════════════════════════════');
    console.log('💡 RECOMENDAÇÕES');
    console.log('═════════════════════════════════════════════════════════\n');

    if (inDbNotInFilter.length > 0) {
      console.log('1️⃣  ADICIONAR ao FiltersModal:');
      inDbNotInFilter.forEach(c => console.log(`   ✓ "${c}"`));
      console.log('');
    }

    if (inFilterNotInDb.length > 0) {
      console.log('2️⃣  REMOVER do FiltersModal (não existem no banco):');
      console.log(`   ${inFilterNotInDb.length} opções inúteis`);
      console.log('');
    }

    if (inDbNotInAdmin.length > 0) {
      console.log('3️⃣  INVESTIGAR: Como esses valores chegaram no banco?');
      inDbNotInAdmin.forEach(c => console.log(`   ? "${c}"`));
    }

    console.log('\n═════════════════════════════════════════════════════════\n');

  } catch (error) {
    console.error('Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

compareConditions();
