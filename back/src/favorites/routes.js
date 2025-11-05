import { Router } from 'express';
import { authMiddleware } from '../auth/middleware.js';
import prisma from '../prisma.js';

const router = Router();

/**
 * GET /api/favorites
 * Lista todos os favoritos do usuário autenticado
 */
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    
    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: {
        property: {
          select: {
            id: true,
            title: true,
            description: true,
            type: true,
            price: true,
            currency: true,
            address: true,
            city: true,
            state: true,
            country: true,
            area: true,
            beds: true,
            baths: true,
            mainImage: true,
            images: true,
            published: true,
            createdAt: true,
            updatedAt: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    res.json({
      success: true,
      data: favorites,
      count: favorites.length
    });
  } catch (error) {
    console.error('Erro ao buscar favoritos:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar favoritos',
      message: error.message
    });
  }
});

/**
 * POST /api/favorites/:propertyId
 * Adiciona um imóvel aos favoritos
 */
router.post('/:propertyId', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { propertyId } = req.params;
    
    // Verificar se o imóvel existe
    const property = await prisma.property.findUnique({
      where: { id: propertyId }
    });
    
    if (!property) {
      return res.status(404).json({
        success: false,
        error: 'Imóvel não encontrado'
      });
    }
    
    // Verificar se já está nos favoritos
    const existing = await prisma.favorite.findUnique({
      where: {
        userId_propertyId: {
          userId,
          propertyId
        }
      }
    });
    
    if (existing) {
      return res.status(400).json({
        success: false,
        error: 'Imóvel já está nos favoritos'
      });
    }
    
    // Criar favorito
    const favorite = await prisma.favorite.create({
      data: {
        userId,
        propertyId
      },
      include: {
        property: {
          select: {
            id: true,
            title: true,
            mainImage: true,
            price: true,
            city: true
          }
        }
      }
    });
    
    res.status(201).json({
      success: true,
      message: 'Imóvel adicionado aos favoritos',
      data: favorite
    });
  } catch (error) {
    console.error('Erro ao adicionar favorito:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao adicionar favorito',
      message: error.message
    });
  }
});

/**
 * DELETE /api/favorites/:propertyId
 * Remove um imóvel dos favoritos
 */
router.delete('/:propertyId', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { propertyId } = req.params;
    
    // Verificar se existe nos favoritos
    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_propertyId: {
          userId,
          propertyId
        }
      }
    });
    
    if (!favorite) {
      return res.status(404).json({
        success: false,
        error: 'Favorito não encontrado'
      });
    }
    
    // Deletar favorito
    await prisma.favorite.delete({
      where: {
        id: favorite.id
      }
    });
    
    res.json({
      success: true,
      message: 'Imóvel removido dos favoritos'
    });
  } catch (error) {
    console.error('Erro ao remover favorito:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao remover favorito',
      message: error.message
    });
  }
});

/**
 * GET /api/favorites/check/:propertyId
 * Verifica se um imóvel está nos favoritos
 */
router.get('/check/:propertyId', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { propertyId } = req.params;
    
    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_propertyId: {
          userId,
          propertyId
        }
      }
    });
    
    res.json({
      success: true,
      isFavorite: !!favorite
    });
  } catch (error) {
    console.error('Erro ao verificar favorito:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao verificar favorito',
      message: error.message
    });
  }
});

export default router;
