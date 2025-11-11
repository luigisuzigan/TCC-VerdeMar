import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function checkNaturalConditions() {
  try {
    const properties = await prisma.property.findMany({
      select: {
        title: true,
        naturalConditions: true
      }
    });

    console.log('=== CONDIÇÕES NATURAIS NO BANCO ===\n');
    
    const allConditions = new Set();
    
    properties.forEach(property => {
      if (property.naturalConditions) {
        try {
          const conditions = typeof property.naturalConditions === 'string' 
            ? JSON.parse(property.naturalConditions) 
            : property.naturalConditions;
          
          if (Array.isArray(conditions)) {
            conditions.forEach(condition => {
              allConditions.add(condition);
            });
          }
        } catch (e) {
          console.log(`Erro ao parsear naturalConditions do imóvel "${property.title}"`);
        }
      }
    });

    console.log(`Total de condições únicas: ${allConditions.size}\n`);
    console.log('Lista completa (em ordem alfabética):\n');
    
    Array.from(allConditions).sort().forEach(condition => {
      console.log(`  - "${condition}"`);
    });

  } catch (error) {
    console.error('Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkNaturalConditions();
