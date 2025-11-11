import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Valores atualizados no FiltersModal (18 condições)
const FILTER_OPTIONS = [
  'Vista para o mar',
  'Vista panorâmica do mar',
  'Vista para a montanha',
  'Vista para o parque',
  'Ventilação natural',
  'Circulação de ar excelente',
  'Janelas amplas',
  'Sol da manhã',
  'Face oeste',
  'Clima ameno',
  'Área verde',
  'Rua arborizada',
  'Proximidade à natureza',
  'Pássaros',
  'Terreno plano',
  'Solo drenado',
  'Pôr do sol',
  'Noite tranquila'
];

async function testSync() {
  try {
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('🧪 TESTE DE SINCRONIZAÇÃO - FiltersModal vs Banco');
    console.log('═══════════════════════════════════════════════════════\n');

    // Buscar todos os valores do banco
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

    console.log('📊 ESTATÍSTICAS:\n');
    console.log(`   FiltersModal tem: ${FILTER_OPTIONS.length} opções`);
    console.log(`   Banco de dados tem: ${dbConditions.size} valores únicos\n`);

    // Verificar cobertura
    const dbArray = Array.from(dbConditions).sort();
    const missing = dbArray.filter(c => !FILTER_OPTIONS.includes(c));
    const extra = FILTER_OPTIONS.filter(c => !dbConditions.has(c));

    if (missing.length === 0 && extra.length === 0) {
      console.log('✅ PERFEITO! 100% SINCRONIZADO!\n');
      console.log('   ✓ Todas as condições do banco estão no filtro');
      console.log('   ✓ Todas as opções do filtro existem no banco');
    } else {
      if (missing.length > 0) {
        console.log('❌ PROBLEMA: Valores no banco SEM opção no filtro:\n');
        missing.forEach(c => console.log(`   - "${c}"`));
        console.log('');
      }

      if (extra.length > 0) {
        console.log('⚠️  AVISO: Opções no filtro que não existem no banco:\n');
        extra.forEach(c => console.log(`   - "${c}"`));
        console.log('');
      }
    }

    console.log('─────────────────────────────────────────────────────────\n');

    // Testar alguns filtros
    console.log('🔍 TESTANDO FILTROS REAIS:\n');

    const tests = [
      'Vista para o mar',
      'Pássaros',
      'Terreno plano',
      'Clima ameno'
    ];

    for (const condition of tests) {
      const result = await prisma.property.findMany({
        where: {
          naturalConditions: {
            contains: condition
          }
        },
        select: { title: true }
      });

      const icon = result.length > 0 ? '✅' : '❌';
      console.log(`   ${icon} "${condition}": ${result.length} imóvel(is)`);
      if (result.length > 0) {
        result.forEach(p => console.log(`      → ${p.title}`));
      }
      console.log('');
    }

    console.log('═══════════════════════════════════════════════════════\n');

  } catch (error) {
    console.error('Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testSync();
