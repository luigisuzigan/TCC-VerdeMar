import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function deleteAll() {
  try {
    await prisma.property.deleteMany();
    console.log('✅ Todas as propriedades deletadas');
  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

deleteAll();
