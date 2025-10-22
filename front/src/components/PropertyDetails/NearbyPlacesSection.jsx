import { useState } from 'react';
import { MapPin, Star, Navigation } from 'lucide-react';

/**
 * Seção que exibe locais próximos ao imóvel (escolas, supermercados, etc.)
 * Usa dados reais da Google Maps Places API
 */
export default function NearbyPlacesSection({ nearbyPlaces }) {
  const [selectedCategory, setSelectedCategory] = useState('schools');

  // Categorias disponíveis com ícones e labels
  const categories = {
    schools: { label: 'Escolas', icon: '🏫', color: 'blue' },
    supermarkets: { label: 'Supermercados', icon: '🛒', color: 'green' },
    hospitals: { label: 'Hospitais', icon: '🏥', color: 'red' },
    pharmacies: { label: 'Farmácias', icon: '💊', color: 'teal' },
    banks: { label: 'Bancos', icon: '🏦', color: 'yellow' },
    restaurants: { label: 'Restaurantes', icon: '🍽️', color: 'orange' },
    transit_stations: { label: 'Transporte', icon: '🚌', color: 'purple' },
    parks: { label: 'Parques', icon: '🌳', color: 'emerald' },
    shopping_malls: { label: 'Shopping', icon: '🛍️', color: 'pink' },
    gyms: { label: 'Academias', icon: '🏋️', color: 'indigo' },
  };

  // Parse JSON se necessário
  let places = {};
  
  try {
    console.log('🔍 NearbyPlaces recebido:', {
      type: typeof nearbyPlaces,
      value: nearbyPlaces,
      length: nearbyPlaces?.length,
      isString: typeof nearbyPlaces === 'string'
    });
    
    if (typeof nearbyPlaces === 'string') {
      places = JSON.parse(nearbyPlaces || '{}');
      console.log('✅ JSON parseado com sucesso:', Object.keys(places));
    } else {
      places = nearbyPlaces || {};
      console.log('📦 Objeto direto:', Object.keys(places));
    }
  } catch (error) {
    console.error('❌ Erro ao parsear nearbyPlaces:', error);
    places = {};
  }

  // Locais da categoria selecionada
  const selectedPlaces = places[selectedCategory] || [];
  
  console.log(`📍 Categoria selecionada: ${selectedCategory}, locais: ${selectedPlaces.length}`);

  // Se não há nenhum local cadastrado
  if (Object.keys(places).length === 0 || Object.values(places).every(arr => arr.length === 0)) {
    return (
      <section className="mt-12 p-8 bg-slate-50 rounded-2xl border border-slate-200">
        <div className="text-center">
          <MapPin size={48} className="mx-auto mb-4 text-slate-400" />
          <h3 className="text-xl font-semibold text-slate-700 mb-2">
            Locais próximos não disponíveis
          </h3>
          <p className="text-slate-600">
            As informações sobre locais próximos ainda não foram adicionadas para este imóvel.
          </p>
        </div>
      </section>
    );
  }

  // Contar total de locais
  const totalPlaces = Object.values(places).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <section className="mt-12">
      <div className="flex items-center gap-3 mb-6">
        <MapPin size={28} className="text-blue-600" />
        <div>
          <h2 className="text-2xl font-bold text-slate-900">O que há por perto</h2>
          <p className="text-slate-600">{totalPlaces} locais próximos encontrados</p>
        </div>
      </div>

      {/* Filtros de categoria */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        {Object.entries(categories).map(([key, cat]) => {
          const count = places[key]?.length || 0;
          if (count === 0) return null; // Não mostrar categoria vazia

          return (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all ${
                selectedCategory === key
                  ? `bg-${cat.color}-600 text-white shadow-lg`
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span className="text-lg">{cat.icon}</span>
              <span>{cat.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                selectedCategory === key
                  ? 'bg-white/20'
                  : 'bg-slate-200'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Lista de locais */}
      <div className="space-y-3">
        {selectedPlaces.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-xl">
            <p className="text-slate-600">Nenhum local encontrado nesta categoria.</p>
          </div>
        ) : (
          selectedPlaces.map((place, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-xl hover:shadow-md transition-shadow"
            >
              {/* Ícone da categoria */}
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-2xl">
                {categories[selectedCategory]?.icon}
              </div>

              {/* Informações do local */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900 mb-1">
                  {place.name}
                </h3>
                {place.vicinity && (
                  <p className="text-sm text-slate-600 mb-2">
                    {place.vicinity}
                  </p>
                )}
                {place.rating && (
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star size={14} fill="currentColor" />
                      <span className="font-medium">{place.rating}</span>
                    </div>
                    {place.userRatingsTotal > 0 && (
                      <span className="text-slate-500">
                        ({place.userRatingsTotal} avaliações)
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Distância */}
              <div className="flex-shrink-0 text-right">
                <div className="flex items-center gap-1 text-blue-600 font-bold text-lg mb-1">
                  <Navigation size={16} />
                  <span>{place.distanceText}</span>
                </div>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-600 hover:text-blue-600 underline"
                >
                  Ver rotas
                </a>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Nota informativa */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl">
        <p className="text-sm text-blue-900">
          ℹ️ <strong>Informações fornecidas pelo Google Maps.</strong> Distâncias calculadas em linha reta. 
          O tempo real de deslocamento pode variar de acordo com o trânsito e meio de transporte.
        </p>
      </div>
    </section>
  );
}
