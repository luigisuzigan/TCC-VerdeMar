import { useEffect, useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Building2, 
  Eye,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { api } from '../../api/client';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProperties: 0,
    publishedProperties: 0,
    totalRevenue: 0,
    lastMonthRevenue: 0,
    propertiesSold: 0,
    totalViews: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Buscar propriedades
      const { data } = await api.get('/properties', { params: { limit: 1000 } });
      
      const totalProperties = data.total || 0;
      const publishedProperties = data.properties?.filter(p => p.published).length || 0;
      
      // Simulação de dados (você pode buscar do backend depois)
      const totalRevenue = data.properties?.reduce((sum, p) => sum + (p.price || 0), 0) || 0;
      const lastMonthRevenue = totalRevenue * 0.15; // 15% do total (simulado)
      const propertiesSold = Math.floor(totalProperties * 0.23); // 23% vendidos (simulado)
      const totalViews = totalProperties * 127; // ~127 visualizações por imóvel (simulado)

      setStats({
        totalProperties,
        publishedProperties,
        totalRevenue,
        lastMonthRevenue,
        propertiesSold,
        totalViews
      });
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  const cards = [
    {
      title: 'Receita Total',
      value: formatCurrency(stats.totalRevenue),
      icon: DollarSign,
      trend: '+12.5%',
      trendUp: true,
      description: 'Valor total dos imóveis',
      color: 'emerald'
    },
    {
      title: 'Receita Último Mês',
      value: formatCurrency(stats.lastMonthRevenue),
      icon: TrendingUp,
      trend: '+8.2%',
      trendUp: true,
      description: 'Vendas do último mês',
      color: 'blue'
    },
    {
      title: 'Imóveis Vendidos',
      value: formatNumber(stats.propertiesSold),
      icon: Building2,
      trend: `${stats.totalProperties} total`,
      trendUp: true,
      description: 'Propriedades comercializadas',
      color: 'violet'
    },
    {
      title: 'Total de Visualizações',
      value: formatNumber(stats.totalViews),
      icon: Eye,
      trend: '+23.1%',
      trendUp: true,
      description: 'Visualizações acumuladas',
      color: 'amber'
    }
  ];

  const colorClasses = {
    emerald: {
      bg: 'bg-emerald-100',
      text: 'text-emerald-600',
      icon: 'bg-emerald-600'
    },
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-600',
      icon: 'bg-blue-600'
    },
    violet: {
      bg: 'bg-violet-100',
      text: 'text-violet-600',
      icon: 'bg-violet-600'
    },
    amber: {
      bg: 'bg-amber-100',
      text: 'text-amber-600',
      icon: 'bg-amber-600'
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-1">Visão geral do sistema VerdeMar</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => {
          const Icon = card.icon;
          const colors = colorClasses[card.color];
          
          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${colors.bg} w-12 h-12 rounded-xl flex items-center justify-center`}>
                  <Icon className={colors.text} size={24} />
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  card.trendUp ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                }`}>
                  {card.trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {card.trend}
                </div>
              </div>
              
              <h3 className="text-slate-600 text-sm font-medium mb-1">{card.title}</h3>
              <p className="text-3xl font-bold text-slate-900 mb-1">{card.value}</p>
              <p className="text-slate-500 text-xs">{card.description}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Properties */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Imóveis Ativos</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Publicados</span>
              <span className="font-bold text-emerald-600">{stats.publishedProperties}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Não publicados</span>
              <span className="font-bold text-slate-400">{stats.totalProperties - stats.publishedProperties}</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t">
              <span className="text-slate-900 font-medium">Total</span>
              <span className="font-bold text-slate-900">{stats.totalProperties}</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Atividade Recente</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2"></div>
              <div>
                <p className="text-sm text-slate-900 font-medium">Novo imóvel publicado</p>
                <p className="text-xs text-slate-500">Há 2 horas</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
              <div>
                <p className="text-sm text-slate-900 font-medium">Imóvel atualizado</p>
                <p className="text-xs text-slate-500">Há 5 horas</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-violet-500 mt-2"></div>
              <div>
                <p className="text-sm text-slate-900 font-medium">Novo usuário registrado</p>
                <p className="text-xs text-slate-500">Há 1 dia</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
