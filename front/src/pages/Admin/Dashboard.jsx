import { useEffect, useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Building2, 
  Eye,
  Users,
  Heart,
  Star,
  MessageSquare,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  PieChart
} from 'lucide-react';
import { api } from '../../api/client';
import { Link } from 'react-router-dom';
import { LineChart, BarChart, PieChart as SimplePieChart } from '../../components/Charts/SimpleCharts';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      
      // Buscar estatísticas reais do backend
      const { data: dashboardData } = await api.get('/dashboard/stats');
      
      if (!dashboardData.success) {
        throw new Error('Erro ao buscar estatísticas');
      }
      
      setStats(dashboardData.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
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

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) {
      return `Há ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
    } else if (hours < 24) {
      return `Há ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
    } else {
      return `Há ${days} ${days === 1 ? 'dia' : 'dias'}`;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Activity className="w-12 h-12 mx-auto mb-4 animate-spin text-emerald-600" />
          <p className="text-gray-600">Carregando estatísticas...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-600" />
          <p className="text-gray-600">Erro ao carregar estatísticas</p>
          <button
            onClick={fetchStats}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  const { overview, usersByRole, trends, distributions, topProperties, messages, recentActivity, financial } = stats;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Bem-vindo ao painel administrativo</p>
      </div>

      {/* Cards principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total de Imóveis"
          value={overview.totalProperties}
          icon={Building2}
          color="blue"
          subtitle={`${overview.publishedProperties} publicados`}
        />
        <StatCard
          title="Total de Usuários"
          value={overview.totalUsers}
          icon={Users}
          color="green"
          subtitle={`${overview.activeUsers} ativos`}
        />
        <StatCard
          title="Visualizações"
          value={formatNumber(overview.totalViews)}
          icon={Eye}
          color="purple"
          subtitle="Total"
        />
        <StatCard
          title="Mensagens"
          value={overview.unreadMessages}
          icon={MessageSquare}
          color="orange"
          subtitle="Não lidas"
        />
      </div>

      {/* Cards secundários */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Favoritos"
          value={overview.totalFavorites}
          icon={Heart}
          color="red"
          small
        />
        <StatCard
          title="Avaliações"
          value={overview.totalReviews}
          icon={Star}
          color="yellow"
          small
        />
        <StatCard
          title="Preço Médio"
          value={formatCurrency(financial.averagePrice)}
          icon={DollarSign}
          color="green"
          small
        />
        <StatCard
          title="Pendentes"
          value={overview.pendingProperties}
          icon={Clock}
          color="gray"
          small
        />
      </div>

      {/* Gráficos de Tendências */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tendência de Cadastros */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Novos Cadastros (Últimos 7 dias)
          </h2>
          <LineChart
            data={trends.sales.map(item => ({ label: item.label, value: item.value }))}
            height={250}
            color="#10b981"
          />
        </div>

        {/* Tendência de Visualizações */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Visualizações (Últimos 7 dias)
          </h2>
          <LineChart
            data={trends.views.map(item => ({ label: item.label, value: item.value }))}
            height={250}
            color="#3b82f6"
          />
        </div>
      </div>

      {/* Vendas Mensais e Top Visualizados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vendas Mensais */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Cadastros Mensais (Últimos 6 meses)
          </h2>
          <LineChart
            data={trends.monthlySales.map(item => ({ label: item.month, value: item.value }))}
            height={250}
            color="#8b5cf6"
          />
        </div>

        {/* Top Visualizados */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Imóveis Mais Visualizados
          </h2>
          <div className="space-y-3">
            {topProperties.mostViewed.slice(0, 5).map((property, index) => (
              <div key={property.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {property.title}
                    </p>
                    <p className="text-xs text-gray-500">{property.city}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{property.viewCount}</p>
                  <p className="text-xs text-gray-500">views</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Distribuições */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Imóveis por Tipo */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Imóveis por Tipo
          </h2>
          {distributions.byType.length > 0 ? (
            <SimplePieChart
              data={distributions.byType.map(item => ({ label: item.type, value: item.count }))}
              size={300}
            />
          ) : (
            <p className="text-gray-500 text-center py-8">Nenhum dado disponível</p>
          )}
        </div>

        {/* Imóveis por Cidade */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Imóveis por Cidade (Top 5)
          </h2>
          <div className="space-y-3">
            {distributions.byCity.map((item, index) => (
              <div key={item.city} className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                    {index + 1}
                  </span>
                  <p className="text-sm font-medium text-gray-900">{item.city}</p>
                </div>
                <p className="text-sm font-semibold text-gray-900">{item.count}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Preço por Região */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Preço Médio por Cidade
          </h2>
          {distributions.priceByRegion.length > 0 ? (
            <SimplePieChart
              data={distributions.priceByRegion.map(item => ({ 
                label: item.city, 
                value: Math.round(item.avgPrice) 
              }))}
              size={300}
            />
          ) : (
            <p className="text-gray-500 text-center py-8">Nenhum dado disponível</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Detalhes por Região
          </h2>
          <div className="space-y-3">
            {distributions.priceByRegion.slice(0, 5).map((item) => (
              <div key={item.city} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.city}</p>
                  <p className="text-xs text-gray-500">{item.count} imóveis</p>
                </div>
                <p className="text-sm font-semibold text-emerald-600">
                  {formatCurrency(item.avgPrice)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Atividade Recente (Favoritos) */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Atividade Recente - Favoritos
        </h2>
        <div className="space-y-3">
          {recentActivity && recentActivity.length > 0 ? (
            recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all"
              >
                {/* Avatar do Usuário */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                    <Heart className="w-5 h-5 fill-current" />
                  </div>
                </div>

                {/* Informações */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-gray-900 text-sm">
                      {activity.user.name}
                    </p>
                    <span className="text-gray-400">•</span>
                    <p className="text-xs text-gray-500">
                      {activity.user.email}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">
                    Favoritou: <span className="font-medium text-gray-900">{activity.property.title}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {activity.property.city} • {formatCurrency(activity.property.price)}
                  </p>
                </div>

                {/* Tempo */}
                <div className="flex-shrink-0 text-right">
                  <p className="text-xs text-gray-500">
                    {formatTimeAgo(activity.createdAt)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-8">Nenhuma atividade recente</p>
          )}
        </div>
      </div>

      {/* Mensagens de Contato */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Mensagens Recentes
        </h2>
        <div className="space-y-4">
          {messages.length > 0 ? (
            messages.map((message) => (
              <div
                key={message.id}
                className={`p-4 rounded-lg border-2 ${
                  message.status === 'NEW'
                    ? 'border-emerald-200 bg-emerald-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-semibold">
                      {message.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{message.name}</p>
                      <p className="text-sm text-gray-500">{message.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                        message.status === 'NEW'
                          ? 'bg-emerald-100 text-emerald-700'
                          : message.status === 'READ'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {message.status === 'NEW' ? 'Nova' : message.status === 'READ' ? 'Lida' : 'Respondida'}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatTimeAgo(message.createdAt)}
                    </p>
                  </div>
                </div>
                {message.subject && (
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    {message.subject}
                  </p>
                )}
                <p className="text-sm text-gray-600 mb-3">{message.message}</p>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm bg-emerald-600 text-white rounded hover:bg-emerald-700">
                    Responder
                  </button>
                  <button className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                    Arquivar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-8">Nenhuma mensagem disponível</p>
          )}
        </div>
      </div>

      {/* Estatísticas Financeiras */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm">Valor Total em Imóveis</p>
              <p className="text-3xl font-bold mt-2">{formatCurrency(financial.totalValue)}</p>
            </div>
            <DollarSign className="w-12 h-12 text-emerald-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Menor Preço</p>
              <p className="text-3xl font-bold mt-2">{formatCurrency(financial.minPrice)}</p>
            </div>
            <TrendingUp className="w-12 h-12 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Maior Preço</p>
              <p className="text-3xl font-bold mt-2">{formatCurrency(financial.maxPrice)}</p>
            </div>
            <BarChart3 className="w-12 h-12 text-purple-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente de Card de Estatística
function StatCard({ title, value, icon: Icon, color, subtitle, small }) {
  const colors = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-emerald-100 text-emerald-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
    red: 'bg-red-100 text-red-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    gray: 'bg-gray-100 text-gray-600'
  };

  return (
    <div className={`bg-white p-6 rounded-lg shadow ${small ? 'p-4' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className={`text-gray-600 ${small ? 'text-xs' : 'text-sm'}`}>{title}</p>
          <p className={`font-bold text-gray-900 ${small ? 'text-xl mt-1' : 'text-2xl mt-2'}`}>
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`${colors[color]} rounded-lg ${small ? 'p-2' : 'p-3'}`}>
          <Icon className={small ? 'w-5 h-5' : 'w-6 h-6'} />
        </div>
      </div>
    </div>
  );
}
