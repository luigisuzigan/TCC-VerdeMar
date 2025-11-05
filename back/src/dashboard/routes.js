import express from 'express';
import { prisma } from '../prisma.js';

const router = express.Router();

/**
 * GET /api/dashboard/stats
 * Retorna estatísticas completas e reais do dashboard
 */
router.get('/stats', async (req, res) => {
  try {
    // ========================================
    // 📊 ESTATÍSTICAS BÁSICAS
    // ========================================
    
    // Total de imóveis
    const totalProperties = await prisma.property.count();
    const publishedProperties = await prisma.property.count({
      where: { published: true }
    });
    const pendingProperties = totalProperties - publishedProperties;
    
    // Total de usuários
    const totalUsers = await prisma.user.count();
    const activeUsers = await prisma.user.count({
      where: { isActive: true }
    });
    
    // Usuários por role
    const usersByRole = await prisma.user.groupBy({
      by: ['role'],
      _count: true
    });
    
    // Total de visualizações (soma do viewCount de todas as propriedades)
    const viewsData = await prisma.property.aggregate({
      _sum: { viewCount: true }
    });
    const totalViews = viewsData._sum.viewCount || 0;
    
    // Total de favoritos
    const totalFavorites = await prisma.favorite.count();
    console.log('📊 Total de favoritos contados:', totalFavorites);
    
    // Total de avaliações
    const totalReviews = await prisma.review.count();
    
    // Mensagens não lidas
    const unreadMessages = await prisma.contactMessage.count({
      where: { status: 'NEW' }
    });
    
    // ========================================
    // 📈 TENDÊNCIAS (últimos 7 dias)
    // ========================================
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    // Propriedades criadas nos últimos 7 dias
    const recentProperties = await prisma.property.findMany({
      where: {
        createdAt: { gte: sevenDaysAgo }
      },
      select: { createdAt: true },
      orderBy: { createdAt: 'asc' }
    });
    
    // Usuários cadastrados nos últimos 7 dias
    const recentUsers = await prisma.user.findMany({
      where: {
        createdAt: { gte: sevenDaysAgo }
      },
      select: { createdAt: true },
      orderBy: { createdAt: 'asc' }
    });
    
    // Visualizações dos últimos 7 dias (se existe tabela PropertyView)
    const recentViews = await prisma.propertyView.findMany({
      where: {
        createdAt: { gte: sevenDaysAgo }
      },
      select: { createdAt: true },
      orderBy: { createdAt: 'asc' }
    }).catch(() => []); // Se a tabela não existir ainda
    
    // Processar dados para gráficos de tendência
    const salesTrend = processTimeSeriesData(recentProperties, 7);
    const usersTrend = processTimeSeriesData(recentUsers, 7);
    const viewsTrend = processTimeSeriesData(recentViews, 7);
    
    // ========================================
    // 📊 DISTRIBUIÇÕES
    // ========================================
    
    // Imóveis por tipo
    const propertiesByType = await prisma.property.groupBy({
      by: ['type'],
      _count: true,
      where: { published: true }
    });
    
    // Imóveis por cidade
    const propertiesByCity = await prisma.property.groupBy({
      by: ['city'],
      _count: true,
      where: { published: true },
      orderBy: { _count: { city: 'desc' } },
      take: 5
    });
    
    // Preço médio por região
    const priceByRegion = await prisma.property.groupBy({
      by: ['city'],
      _avg: { price: true },
      _count: true,
      where: { published: true }
    });
    
    // ========================================
    // 🏆 TOP IMÓVEIS
    // ========================================
    
    // Imóveis mais visualizados
    const topViewedProperties = await prisma.property.findMany({
      where: { published: true },
      orderBy: { viewCount: 'desc' },
      take: 5,
      select: {
        id: true,
        title: true,
        viewCount: true,
        mainImage: true,
        price: true,
        city: true
      }
    });
    
    // Imóveis com mais favoritos
    const topFavoriteProperties = await prisma.property.findMany({
      where: { published: true },
      orderBy: {
        favorites: { _count: 'desc' }
      },
      take: 5,
      select: {
        id: true,
        title: true,
        mainImage: true,
        price: true,
        city: true,
        _count: {
          select: { favorites: true }
        }
      }
    });
    
    // Imóveis com melhor avaliação
    const topRatedProperties = await prisma.property.findMany({
      where: { 
        published: true,
        rating: { gt: 0 }
      },
      orderBy: [
        { rating: 'desc' },
        { viewCount: 'desc' }
      ],
      take: 5,
      select: {
        id: true,
        title: true,
        rating: true,
        mainImage: true,
        price: true,
        city: true,
        _count: {
          select: { reviews: true }
        }
      }
    });
    
    // ========================================
    // 💬 MENSAGENS RECENTES
    // ========================================
    const recentMessages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        id: true,
        name: true,
        email: true,
        subject: true,
        message: true,
        status: true,
        createdAt: true,
        propertyId: true
      }
    }).catch(() => []); // Se a tabela não existir ainda
    
    // ========================================
    // ❤️ ATIVIDADES RECENTES (FAVORITOS)
    // ========================================
    const recentFavorites = await prisma.favorite.findMany({
      orderBy: { createdAt: 'desc' },
      take: 15,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
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
    }).catch(() => []); // Se a tabela não existir ainda
    
    // ========================================
    // 📅 VENDAS MENSAIS (últimos 6 meses)
    // ========================================
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const monthlySales = await prisma.property.findMany({
      where: {
        createdAt: { gte: sixMonthsAgo }
      },
      select: { createdAt: true },
      orderBy: { createdAt: 'asc' }
    });
    
    const monthlySalesData = processMonthlyData(monthlySales, 6);
    
    // ========================================
    // 💰 DADOS FINANCEIROS
    // ========================================
    const priceStats = await prisma.property.aggregate({
      _avg: { price: true },
      _min: { price: true },
      _max: { price: true },
      _sum: { price: true },
      where: { published: true }
    });
    
    // ========================================
    // 📊 RESPOSTA COMPLETA
    // ========================================
    res.json({
      success: true,
      data: {
        // Estatísticas básicas
        overview: {
          totalProperties,
          publishedProperties,
          pendingProperties,
          totalUsers,
          activeUsers,
          totalViews,
          totalFavorites,
          totalReviews,
          unreadMessages
        },
        
        // Distribuição de usuários
        usersByRole: usersByRole.map(item => ({
          role: item.role,
          count: item._count
        })),
        
        // Tendências temporais
        trends: {
          sales: salesTrend,
          users: usersTrend,
          views: viewsTrend,
          monthlySales: monthlySalesData
        },
        
        // Distribuições
        distributions: {
          byType: propertiesByType.map(item => ({
            type: item.type,
            count: item._count
          })),
          byCity: propertiesByCity.map(item => ({
            city: item.city,
            count: item._count
          })),
          priceByRegion: priceByRegion.map(item => ({
            city: item.city,
            avgPrice: item._avg.price,
            count: item._count
          }))
        },
        
        // Top propriedades
        topProperties: {
          mostViewed: topViewedProperties,
          mostFavorited: topFavoriteProperties.map(p => ({
            ...p,
            favoritesCount: p._count.favorites
          })),
          topRated: topRatedProperties.map(p => ({
            id: p.id,
            title: p.title,
            rating: p.rating,
            reviewCount: p._count.reviews,
            mainImage: p.mainImage,
            price: p.price,
            city: p.city
          }))
        },
        
        // Mensagens
        messages: recentMessages,
        
        // Atividades recentes (favoritos)
        recentActivity: recentFavorites,
        
        // Dados financeiros
        financial: {
          averagePrice: priceStats._avg.price || 0,
          minPrice: priceStats._min.price || 0,
          maxPrice: priceStats._max.price || 0,
          totalValue: priceStats._sum.price || 0
        }
      }
    });
    
  } catch (error) {
    console.error('Erro ao buscar estatísticas do dashboard:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar estatísticas',
      details: error.message
    });
  }
});

/**
 * Processa dados de série temporal para os últimos N dias
 */
function processTimeSeriesData(records, days) {
  const result = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);
    
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    
    const count = records.filter(r => {
      const recordDate = new Date(r.createdAt);
      return recordDate >= date && recordDate < nextDate;
    }).length;
    
    result.push({
      date: date.toISOString().split('T')[0],
      label: formatDateLabel(date, i === 0),
      value: count
    });
  }
  
  return result;
}

/**
 * Processa dados mensais para os últimos N meses
 */
function processMonthlyData(records, months) {
  const result = [];
  const today = new Date();
  
  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const nextDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    
    const count = records.filter(r => {
      const recordDate = new Date(r.createdAt);
      return recordDate >= date && recordDate < nextDate;
    }).length;
    
    const monthName = date.toLocaleDateString('pt-BR', { month: 'short' });
    
    result.push({
      month: monthName.charAt(0).toUpperCase() + monthName.slice(1),
      value: count
    });
  }
  
  return result;
}

/**
 * Formata label de data
 */
function formatDateLabel(date, isToday) {
  if (isToday) return 'Hoje';
  
  const daysDiff = Math.floor((new Date() - date) / (1000 * 60 * 60 * 24));
  if (daysDiff === 1) return 'Ontem';
  
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
}

export default router;
