import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// ADMIN FORM - 79 opções
const ADMIN_FORM = [
  "Vista para o mar", "Vista panorâmica do mar", "Frente para o mar",
  "Pé na areia", "Vista para a praia", "Vista para a montanha",
  "Vista para o lago", "Vista para o rio", "Vista para a cidade",
  "Vista para a natureza", "Vista para o verde", "Vista para o parque",
  "Vista desobstruída", "Vista privilegiada",
  "Ventilação natural", "Ventilação cruzada", "Brisa marítima",
  "Brisa constante", "Circulação de ar excelente", "Ambientes arejados",
  "Janelas amplas", "Portas de vidro",
  "Sol da manhã", "Sol da tarde", "Sol o dia todo", "Muito sol",
  "Iluminação natural abundante", "Claridade natural",
  "Face norte", "Face sul", "Face leste", "Face oeste",
  "Claraboias / Luz zenital",
  "Clima ameno", "Clima tropical", "Temperatura agradável",
  "Fresco no verão", "Quente no inverno",
  "Sombra natural de árvores", "Microclima agradável",
  "Área verde", "Arborizado", "Jardim natural", "Mata nativa",
  "Árvores frutíferas", "Pomar", "Horta", "Contato com a natureza",
  "Fauna local", "Pássaros", "Borboletas", "Ecossistema preservado",
  "Terreno plano", "Terreno em declive", "Terreno em aclive",
  "Elevado / Ponto alto", "Vista de cima", "Solo firme", "Solo drenado",
  "Nascer do sol", "Pôr do sol", "Céu estrelado", "Noite tranquila",
  "Silêncio / Ambiente calmo", "Privacidade", "Área isolada",
  "Exclusividade", "Som das ondas", "Acesso direto à praia",
  "Casa sustentável", "Bioconstrução", "Materiais naturais",
  "Captação de água da chuva", "Compostagem", "Fossa ecológica",
  "Biodigestor", "Energia renovável", "Baixo impacto ambiental",
  "Água de nascente / Poço artesiano"
];

// FILTERS MODAL - 79 opções
const FILTERS_MODAL = [
  "Vista para o mar", "Vista panorâmica do mar", "Frente para o mar",
  "Pé na areia", "Vista para a praia", "Vista para a montanha",
  "Vista para o lago", "Vista para o rio", "Vista para a cidade",
  "Vista para a natureza", "Vista para o verde", "Vista para o parque",
  "Vista desobstruída", "Vista privilegiada",
  "Ventilação natural", "Ventilação cruzada", "Brisa marítima",
  "Brisa constante", "Circulação de ar excelente", "Ambientes arejados",
  "Janelas amplas", "Portas de vidro",
  "Sol da manhã", "Sol da tarde", "Sol o dia todo", "Muito sol",
  "Iluminação natural abundante", "Claridade natural",
  "Face norte", "Face sul", "Face leste", "Face oeste",
  "Claraboias / Luz zenital",
  "Clima ameno", "Clima tropical", "Temperatura agradável",
  "Fresco no verão", "Quente no inverno",
  "Sombra natural de árvores", "Microclima agradável",
  "Área verde", "Arborizado", "Jardim natural", "Mata nativa",
  "Árvores frutíferas", "Pomar", "Horta", "Contato com a natureza",
  "Fauna local", "Pássaros", "Borboletas", "Ecossistema preservado",
  "Terreno plano", "Terreno em declive", "Terreno em aclive",
  "Elevado / Ponto alto", "Vista de cima", "Solo firme", "Solo drenado",
  "Nascer do sol", "Pôr do sol", "Céu estrelado", "Noite tranquila",
  "Silêncio / Ambiente calmo", "Privacidade", "Área isolada",
  "Exclusividade", "Som das ondas", "Acesso direto à praia",
  "Casa sustentável", "Bioconstrução", "Materiais naturais",
  "Captação de água da chuva", "Compostagem", "Fossa ecológica",
  "Biodigestor", "Energia renovável", "Baixo impacto ambiental",
  "Água de nascente / Poço artesiano"
];

async function testCompleteSync() {
  try {
    console.log('\n╔═══════════════════════════════════════════════════════╗');
    console.log('║     🔍 VERIFICAÇÃO COMPLETA - CONDIÇÕES NATURAIS     ║');
    console.log('╚═══════════════════════════════════════════════════════╝\n');

    // 1. Verificar Admin Form vs Filters Modal
    console.log('📋 PARTE 1: ADMIN FORM vs FILTERS MODAL\n');
    console.log(`   Admin Form: ${ADMIN_FORM.length} opções`);
    console.log(`   Filters Modal: ${FILTERS_MODAL.length} opções\n`);

    const adminNotInFilter = ADMIN_FORM.filter(opt => !FILTERS_MODAL.includes(opt));
    const filterNotInAdmin = FILTERS_MODAL.filter(opt => !ADMIN_FORM.includes(opt));

    if (adminNotInFilter.length === 0 && filterNotInAdmin.length === 0) {
      console.log('   ✅ PERFEITO! Admin e Filtros 100% sincronizados!\n');
    } else {
      if (adminNotInFilter.length > 0) {
        console.log('   ❌ No Admin mas não no Filtro:');
        adminNotInFilter.forEach(opt => console.log(`      - "${opt}"`));
      }
      if (filterNotInAdmin.length > 0) {
        console.log('   ❌ No Filtro mas não no Admin:');
        filterNotInAdmin.forEach(opt => console.log(`      - "${opt}"`));
      }
      console.log('');
    }

    console.log('─────────────────────────────────────────────────────────\n');

    // 2. Verificar Banco de Dados
    console.log('💾 PARTE 2: BANCO DE DADOS\n');
    
    const properties = await prisma.property.findMany({
      select: {
        id: true,
        title: true,
        naturalConditions: true
      }
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

    console.log(`   Total de imóveis: ${properties.length}`);
    console.log(`   Condições únicas no banco: ${dbConditions.size}\n`);

    const dbArray = Array.from(dbConditions).sort();
    
    // Comparar DB com Admin
    const inDbNotInAdmin = dbArray.filter(c => !ADMIN_FORM.includes(c));
    const inAdminNotInDb = ADMIN_FORM.filter(c => !dbConditions.has(c));

    if (inDbNotInAdmin.length > 0) {
      console.log('   ⚠️  Valores no BANCO que NÃO ESTÃO no Admin Form:');
      console.log('   (Esses valores não podem ser cadastrados novamente)\n');
      inDbNotInAdmin.forEach(c => console.log(`      - "${c}"`));
      console.log('');
    }

    if (inAdminNotInDb.length > 0) {
      console.log(`   ℹ️  Opções do Admin NUNCA USADAS: ${inAdminNotInDb.length}/${ADMIN_FORM.length}`);
      console.log('   (Disponíveis para cadastrar mas nenhum imóvel tem ainda)\n');
    }

    console.log('─────────────────────────────────────────────────────────\n');

    // 3. Testar Backend (Filtros)
    console.log('🔍 PARTE 3: TESTE DE FILTROS NO BACKEND\n');

    // Testar algumas condições que existem no banco
    const testsToRun = dbArray.slice(0, 5); // Pegar 5 primeiras

    for (const condition of testsToRun) {
      const result = await prisma.property.findMany({
        where: {
          naturalConditions: {
            contains: condition
          }
        },
        select: { title: true }
      });

      console.log(`   ${result.length > 0 ? '✅' : '❌'} "${condition}": ${result.length} imóvel(is)`);
      if (result.length > 0 && result.length <= 3) {
        result.forEach(p => console.log(`      → ${p.title}`));
      }
    }

    console.log('\n─────────────────────────────────────────────────────────\n');

    // 4. Resumo Final
    console.log('📊 RESUMO FINAL:\n');
    
    const adminFilterSync = adminNotInFilter.length === 0 && filterNotInAdmin.length === 0;
    const dbHasProblems = inDbNotInAdmin.length > 0;
    const filtersWork = testsToRun.length > 0;

    console.log(`   ${adminFilterSync ? '✅' : '❌'} Admin ↔ Filtros: ${adminFilterSync ? 'Sincronizado' : 'DESSINCRONIZADO'}`);
    console.log(`   ${!dbHasProblems ? '✅' : '⚠️ '} Banco ↔ Admin: ${!dbHasProblems ? 'Sincronizado' : 'Tem valores incompatíveis'}`);
    console.log(`   ${filtersWork ? '✅' : '❌'} Filtros Backend: ${filtersWork ? 'Funcionando' : 'Com problemas'}`);
    console.log(`   📈 Cobertura: ${dbConditions.size}/${ADMIN_FORM.length} opções usadas (${Math.round(dbConditions.size/ADMIN_FORM.length*100)}%)\n`);

    if (adminFilterSync && !dbHasProblems && filtersWork) {
      console.log('   🎉 TUDO FUNCIONANDO PERFEITAMENTE!\n');
    } else {
      console.log('   ⚠️  Existem alguns problemas que precisam ser corrigidos.\n');
    }

    console.log('═══════════════════════════════════════════════════════\n');

  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testCompleteSync();
