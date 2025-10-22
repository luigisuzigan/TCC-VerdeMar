import { prisma } from '../prisma.js';

/**
 * Middleware para registrar visualização de propriedade
 * Incrementa o viewCount e registra na tabela PropertyView
 */
export async function trackPropertyView(req, res, next) {
  try {
    const propertyId = req.params.id;
    const userId = req.user?.id; // Se estiver autenticado
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    
    if (!propertyId) {
      return next();
    }
    
    // Incrementar contador de visualizações
    await prisma.property.update({
      where: { id: propertyId },
      data: { viewCount: { increment: 1 } }
    });
    
    // Registrar visualização detalhada (se a tabela existir)
    try {
      await prisma.propertyView.create({
        data: {
          propertyId,
          userId,
          ipAddress,
          userAgent
        }
      });
    } catch (err) {
      // Tabela PropertyView pode não existir ainda, ignorar erro silenciosamente
      console.log('PropertyView table not available yet');
    }
    
    next();
  } catch (error) {
    // Não falhar a requisição se houver erro no tracking
    console.error('Erro ao registrar visualização:', error);
    next();
  }
}
