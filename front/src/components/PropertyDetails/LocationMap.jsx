import { useState } from 'react';
import { MapPin, Navigation, School, ShoppingBag, Coffee, Utensils } from 'lucide-react';

export default function LocationMap({ property }) {
  const [activeTab, setActiveTab] = useState('map');
  
  // Coordenadas do imóvel (usar latitude/longitude se disponível)
  const lat = property.latitude || -26.9906; // Exemplo: Balneário Camboriú
  const lng = property.longitude || -48.6345;
  
  // URL do Google Maps embed (sem API key - funciona mas com limitações)
  const mapUrl = `https://maps.google.com/maps?q=${lat},${lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const satelliteUrl = `https://maps.google.com/maps?q=${lat},${lng}&t=k&z=15&ie=UTF8&iwloc=&output=embed`;

  const tabs = [
    { id: 'map', label: 'Mapa', icon: MapPin },
    { id: 'satellite', label: 'Satélite', icon: Navigation },
  ];

  // Locais de interesse próximos (exemplo)
  const nearbyPlaces = [
    { 
      category: 'Escolas', 
      icon: School, 
      items: [
        { name: 'Escola Estadual Maria Silva', distance: '0.5 km', rating: 4.5 },
        { name: 'Colégio São José', distance: '1.2 km', rating: 4.8 },
        { name: 'UNIFEBE', distance: '3.5 km', rating: 4.6 },
      ]
    },
    { 
      category: 'Compras', 
      icon: ShoppingBag, 
      items: [
        { name: 'Shopping Atlântico', distance: '2.1 km', rating: 4.7 },
        { name: 'Supermercado Giassi', distance: '0.8 km', rating: 4.4 },
        { name: 'Farmácia São João', distance: '0.3 km', rating: 4.3 },
      ]
    },
    { 
      category: 'Alimentação', 
      icon: Utensils, 
      items: [
        { name: 'Restaurante Beira Mar', distance: '1.0 km', rating: 4.6 },
        { name: 'Pizzaria Bella Itália', distance: '0.7 km', rating: 4.5 },
        { name: 'Café Aroma', distance: '0.4 km', rating: 4.7 },
      ]
    },
  ];

  return (
    <div className="border-t border-slate-200 pt-8 mt-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Localização e Vizinhança</h2>
        <div className="flex items-center gap-2 text-slate-600">
          <MapPin size={18} />
          <span className="text-base">
            {property.address || `${property.city}, ${property.state || property.country}`}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Map Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mapa - 2/3 da largura */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg h-[500px]">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={activeTab === 'map' ? mapUrl : satelliteUrl}
              title={activeTab === 'map' ? 'Localização do imóvel' : 'Vista satélite do imóvel'}
            />
          </div>

          {/* Direções */}
          <div className="mt-4 flex gap-3">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Navigation size={18} />
              Como chegar
            </a>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
            >
              <MapPin size={18} />
              Ver no Google Maps
            </a>
          </div>
        </div>

        {/* Nearby Places - 1/3 da largura */}
        <div className="lg:col-span-1">
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 h-[500px] overflow-y-auto">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Pontos de Interesse</h3>
            
            <div className="space-y-6">
              {nearbyPlaces.map((place, idx) => {
                const Icon = place.icon;
                return (
                  <div key={idx}>
                    <div className="flex items-center gap-2 text-slate-700 font-semibold mb-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Icon size={16} className="text-blue-600" />
                      </div>
                      <span>{place.category}</span>
                    </div>
                    
                    <div className="space-y-2 ml-10">
                      {place.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="py-2 border-b border-slate-200 last:border-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-slate-900 mb-1">{item.name}</p>
                              <div className="flex items-center gap-3 text-xs text-slate-600">
                                <span className="flex items-center gap-1">
                                  <Navigation size={12} />
                                  {item.distance}
                                </span>
                                {item.rating && (
                                  <span className="flex items-center gap-1">
                                    <svg className="w-3 h-3 text-yellow-500 fill-current" viewBox="0 0 20 20">
                                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                    </svg>
                                    {item.rating}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Ver mais */}
            <button className="w-full mt-6 py-2 text-sm font-semibold text-blue-600 hover:text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
              Ver todos os pontos de interesse
            </button>
          </div>
        </div>
      </div>

      {/* Informações da Vizinhança */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <School className="text-white" size={24} />
            </div>
            <div>
              <p className="text-sm text-blue-700 font-medium">Pontuação Escolas</p>
              <p className="text-2xl font-bold text-blue-900">8/10</p>
            </div>
          </div>
          <p className="text-sm text-blue-700">
            Área com excelente infraestrutura educacional
          </p>
        </div>

        <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-6 border border-teal-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center">
              <ShoppingBag className="text-white" size={24} />
            </div>
            <div>
              <p className="text-sm text-teal-700 font-medium">Comércio Local</p>
              <p className="text-2xl font-bold text-teal-900">9/10</p>
            </div>
          </div>
          <p className="text-sm text-teal-700">
            Variedade de lojas e serviços próximos
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
              <Coffee className="text-white" size={24} />
            </div>
            <div>
              <p className="text-sm text-purple-700 font-medium">Vida Noturna</p>
              <p className="text-2xl font-bold text-purple-900">7/10</p>
            </div>
          </div>
          <p className="text-sm text-purple-700">
            Boa oferta de restaurantes e entretenimento
          </p>
        </div>
      </div>
    </div>
  );
}
