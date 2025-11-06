import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateExistingProperties() {
  try {
    console.log('🔧 Atualizando imóveis existentes com campo guests...');
    
    // Buscar todos os imóveis
    const properties = await prisma.property.findMany({
      select: { id: true, title: true, beds: true }
    });
    
    console.log(`📋 Encontrados ${properties.length} imóveis para atualizar`);
    
    // Atualizar cada um com base no número de quartos
    for (const property of properties) {
      const guests = Math.max(property.beds * 2, 1); // 2 hóspedes por quarto, mínimo 1
      
      await prisma.property.update({
        where: { id: property.id },
        data: { guests }
      });
      
      console.log(`✅ ${property.title}: guests = ${guests}`);
    }
    
    console.log('\n✅ Todos os imóveis atualizados!');
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

updateExistingProperties();
