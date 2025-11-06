import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function runMigration() {
  try {
    console.log('🔧 Adicionando campo guests na tabela Property...');
    
    await prisma.$executeRawUnsafe(`
      ALTER TABLE Property ADD COLUMN IF NOT EXISTS guests INTEGER NOT NULL DEFAULT 1 AFTER baths;
    `);
    
    console.log('✅ Campo guests adicionado com sucesso!');
    
    // Verificar se foi adicionado
    const result = await prisma.$queryRawUnsafe(`
      SHOW COLUMNS FROM Property LIKE 'guests';
    `);
    
    console.log('✅ Verificação:', result);
    
  } catch (error) {
    if (error.message.includes('Duplicate column')) {
      console.log('ℹ️  Campo guests já existe no banco de dados');
    } else {
      console.error('❌ Erro ao adicionar campo:', error.message);
      throw error;
    }
  } finally {
    await prisma.$disconnect();
  }
}

runMigration();
