import { PrismaClient } from '@prisma/client';

// Singleton para evitar múltiplas instâncias
let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    log: ['error'],
  });
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ['error'],
    });
  }
  prisma = global.prisma;
}

// Wrapper com retry para queries que falham por falta de conexão
const prismaWithRetry = new Proxy(prisma, {
  get(target, prop) {
    const original = target[prop];
    
    // Se não for um model, retorna direto
    if (typeof original !== 'object' || !original) {
      return original;
    }
    
    // Wrap cada método do model com retry
    return new Proxy(original, {
      get(modelTarget, method) {
        const fn = modelTarget[method];
        
        if (typeof fn !== 'function') {
          return fn;
        }
        
        // Adiciona retry para métodos do Prisma
        return async function(...args) {
          const maxRetries = 3;
          let lastError;
          
          for (let i = 0; i < maxRetries; i++) {
            try {
              return await fn.apply(modelTarget, args);
            } catch (error) {
              lastError = error;
              
              // Se for erro de muitas conexões, aguarda e tenta novamente
              if (error.code === 'P2037' || error.message?.includes('max_user_connections')) {
                console.log(`⚠️ Muitas conexões (tentativa ${i + 1}/${maxRetries}), aguardando...`);
                await new Promise(resolve => setTimeout(resolve, (i + 1) * 1000)); // 1s, 2s, 3s
                continue;
              }
              
              // Se for outro erro, lança direto
              throw error;
            }
          }
          
          throw lastError;
        };
      }
    });
  }
});

// Graceful shutdown - fechar conexões ao encerrar
const shutdown = async () => {
  try {
    await prisma.$disconnect();
    console.log('✅ Prisma desconectado com sucesso');
  } catch (error) {
    console.error('❌ Erro ao desconectar Prisma:', error);
  }
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

// Desconectar após 10 minutos de inatividade
let inactivityTimer;
const resetInactivityTimer = () => {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(async () => {
    console.log('⏰ 10 minutos de inatividade, desconectando...');
    await prisma.$disconnect();
  }, 10 * 60 * 1000);
};
resetInactivityTimer();

export { prismaWithRetry as prisma };
export default prismaWithRetry;
