import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, MapPin, BedDouble, Bath, Maximize, ArrowLeft, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Favorites() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se está logado
    if (!user) {
      navigate('/login');
      return;
    }

    // Buscar favoritos do localStorage (específicos do usuário)
    const loadFavorites = () => {
      try {
        const favoritesKey = `favorites_user_${user.id}`;
        const savedFavorites = JSON.parse(localStorage.getItem(favoritesKey) || '[]');
        setFavorites(savedFavorites);
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [user, navigate]);

  const handleRemoveFavorite = (propertyId) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== propertyId);
    setFavorites(updatedFavorites);
    const favoritesKey = `favorites_user_${user.id}`;
    localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-sky-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          <p className="mt-4 text-slate-600">Carregando favoritos...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-sky-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200 shadow hover:bg-white mb-4"
          >
            <ArrowLeft size={16} /> Voltar
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 flex items-center gap-3">
                <Heart size={32} className="text-rose-500 fill-rose-500" />
                Meus Favoritos
              </h1>
              <p className="text-slate-600 mt-2">
                {favorites.length} {favorites.length === 1 ? 'imóvel salvo' : 'imóveis salvos'}
              </p>
            </div>
          </div>
        </div>

        {/* Lista de Favoritos */}
        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <Heart size={64} className="mx-auto text-slate-300 mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Nenhum favorito ainda
            </h2>
            <p className="text-slate-600 mb-6">
              Explore imóveis e adicione aos favoritos para vê-los aqui
            </p>
            <Link
              to="/explorar"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full font-semibold hover:shadow-xl transition-all hover:scale-105"
            >
              <Search size={18} />
              Explorar Imóveis
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((property) => (
              <div
                key={property.id}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
              >
                {/* Imagem */}
                <Link to={`/property/${property.id}`} className="block relative h-56 overflow-hidden">
                  <img
                    src={property.images?.[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80'}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Botão remover favorito */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemoveFavorite(property.id);
                    }}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all group/btn"
                    title="Remover dos favoritos"
                  >
                    <Heart size={18} className="text-rose-500 fill-rose-500 group-hover/btn:scale-110 transition-transform" />
                  </button>
                </Link>

                {/* Conteúdo */}
                <div className="p-5">
                  <Link to={`/property/${property.id}`}>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                      {property.title}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center gap-1 text-sm text-slate-600 mb-3">
                    <MapPin size={14} />
                    <span className="line-clamp-1">{property.address}</span>
                  </div>

                  {/* Especificações */}
                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                    {property.bedrooms && (
                      <div className="flex items-center gap-1">
                        <BedDouble size={16} />
                        <span>{property.bedrooms}</span>
                      </div>
                    )}
                    {property.bathrooms && (
                      <div className="flex items-center gap-1">
                        <Bath size={16} />
                        <span>{property.bathrooms}</span>
                      </div>
                    )}
                    {property.area && (
                      <div className="flex items-center gap-1">
                        <Maximize size={16} />
                        <span>{property.area}m²</span>
                      </div>
                    )}
                  </div>

                  {/* Preço */}
                  <div>
                    <p className="text-2xl font-bold text-emerald-600">
                      {property.price?.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
