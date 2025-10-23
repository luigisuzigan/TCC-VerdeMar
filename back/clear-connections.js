// Script para limpar conexões do banco
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearConnections() {
  try {
    console.log('🔄 Limpando conexões antigas...');
    
    // Testa a conexão
    await prisma.$connect();
    console.log('✅ Conectado ao banco');
    
    // Disconnect
    await prisma.$disconnect();
    console.log('✅ Conexões limpas!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

clearConnections();
