import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function fixNaturalConditions() {
  try {
    console.log('\n🔧 CORRIGINDO CONDIÇÕES NATURAIS NO BANCO...\n');

    // Buscar todos os imóveis
    const properties = await prisma.property.findMany({
      select: {
        id: true,
        title: true,
        naturalConditions: true
      }
    });

    let updatedCount = 0;

    for (const property of properties) {
      if (!property.naturalConditions) continue;

      try {
        const conditions = typeof property.naturalConditions === 'string' 
          ? JSON.parse(property.naturalConditions) 
          : property.naturalConditions;

        if (!Array.isArray(conditions)) continue;

        let modified = false;
        const newConditions = conditions.map(condition => {
          // Corrigir "Proximidade à natureza" → "Contato com a natureza"
          if (condition === 'Proximidade à natureza') {
            console.log(`   ✏️  [${property.title}] "${condition}" → "Contato com a natureza"`);
            modified = true;
            return 'Contato com a natureza';
          }
          
          // Corrigir "Rua arborizada" → "Arborizado"
          if (condition === 'Rua arborizada') {
            console.log(`   ✏️  [${property.title}] "${condition}" → "Arborizado"`);
            modified = true;
            return 'Arborizado';
          }

          return condition;
        });

        if (modified) {
          await prisma.property.update({
            where: { id: property.id },
            data: {
              naturalConditions: JSON.stringify(newConditions)
            }
          });
          updatedCount++;
        }

      } catch (e) {
        console.log(`   ❌ Erro ao processar ${property.title}:`, e.message);
      }
    }

    console.log(`\n✅ Atualização concluída!`);
    console.log(`   Total de imóveis atualizados: ${updatedCount}\n`);

    // Verificar se ficou tudo correto
    console.log('🔍 VERIFICAÇÃO PÓS-CORREÇÃO:\n');

    const allProperties = await prisma.property.findMany({
      select: { naturalConditions: true }
    });

    const allConditions = new Set();
    allProperties.forEach(p => {
      if (p.naturalConditions) {
        try {
          const conditions = typeof p.naturalConditions === 'string' 
            ? JSON.parse(p.naturalConditions) 
            : p.naturalConditions;
          if (Array.isArray(conditions)) {
            conditions.forEach(c => allConditions.add(c));
          }
        } catch (e) {}
      }
    });

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

    const incompatible = Array.from(allConditions).filter(c => !ADMIN_FORM.includes(c));

    if (incompatible.length === 0) {
      console.log('   ✅ PERFEITO! Todos os valores do banco estão no Admin Form!\n');
    } else {
      console.log('   ❌ Ainda existem valores incompatíveis:');
      incompatible.forEach(c => console.log(`      - "${c}"`));
      console.log('');
    }

  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixNaturalConditions();
