import { useState, useRef, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { X, MapPin, Maximize2, Minimize2 } from 'lucide-react';
import { Autocomplete, useLoadScript } from '@react-google-maps/api';
import InteractiveMap from '../../Explorar/InteractiveMap';
import { api } from '../../../api/client';

// Localizações populares de exemplo
const POPULAR_LOCATIONS = [
  { name: 'Florianópolis, SC', lat: -27.5954, lng: -48.5480 },
  { name: 'Balneário Camboriú, SC', lat: -26.9979, lng: -48.6357 },
  { name: 'Itapema, SC', lat: -27.0905, lng: -48.6114 },
  { name: 'Bombinhas, SC', lat: -27.1396, lng: -48.5123 },
  { name: 'Porto Belo, SC', lat: -27.1583, lng: -48.5553 },
  { name: 'Praia Central - Florianópolis', lat: -27.5969, lng: -48.5495 },
];

const DEFAULT_CENTER = { lat: -27.5954, lng: -48.5480 }; // Florianópolis

const libraries = ['places', 'drawing', 'geometry'];

export default function LocationModal({ isOpen, onClose, location, onApply }) {
  const [searchText, setSearchText] = useState(location || '');
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);
  const [markerPosition, setMarkerPosition] = useState(DEFAULT_CENTER);
  const [nearbyProperties, setNearbyProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [drawnBoundary, setDrawnBoundary] = useState(null);
  const autocompleteRef = useRef(null);
  
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  
  // Hook para carregar o Google Maps apenas uma vez
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey || '',
    libraries: libraries,
  });

  // Buscar propriedades próximas à localização
  useEffect(() => {
    if (!isOpen) return;
    
    const fetchProperties = async () => {
      try {
        const { data } = await api.get('/properties', {
          params: {
            published: true,
            limit: 100,
            // Você pode adicionar filtros de lat/lng aqui
          }
        });
        
        const properties = data.properties || data.items || [];
        setNearbyProperties(properties);
        setFilteredProperties(properties);
      } catch (error) {
        console.error('Erro ao buscar propriedades:', error);
        setNearbyProperties([]);
        setFilteredProperties([]);
      }
    };
    
    fetchProperties();
  }, [isOpen, mapCenter]);

  // Filtrar propriedades pela área desenhada
  const filterPropertiesByBoundary = (boundary) => {
    if (!boundary) {
      setFilteredProperties(nearbyProperties);
      return;
    }

    const filtered = nearbyProperties.filter(property => {
      if (!property.latitude || !property.longitude) return false;
      
      const lat = parseFloat(property.latitude);
      const lng = parseFloat(property.longitude);
      
      return isPointInBoundary(lat, lng, boundary);
    });
    
    setFilteredProperties(filtered);
  };

  // Verificar se ponto está dentro do boundary
  const isPointInBoundary = (lat, lng, boundary) => {
    const point = new window.google.maps.LatLng(lat, lng);
    
    if (boundary.type === window.google?.maps?.drawing?.OverlayType?.CIRCLE) {
      const center = boundary.getCenter();
      const radius = boundary.getRadius();
      const distance = window.google.maps.geometry.spherical.computeDistanceBetween(point, center);
      return distance <= radius;
    }
    
    if (boundary.type === window.google?.maps?.drawing?.OverlayType?.RECTANGLE) {
      const bounds = boundary.getBounds();
      return bounds.contains(point);
    }
    
    if (boundary.type === window.google?.maps?.drawing?.OverlayType?.POLYGON) {
      const path = boundary.getPath();
      return window.google.maps.geometry.poly.containsLocation(point, boundary);
    }
    
    return false;
  };

  const handleLocationSelect = (locationName, lat, lng) => {
    setSearchText(locationName);
    const newCenter = { lat, lng };
    setMapCenter(newCenter);
    setMarkerPosition(newCenter);
  };

  const onAutocompleteLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const name = place.formatted_address || place.name;
        
        handleLocationSelect(name, lat, lng);
      }
    }
  };

  const handleApply = () => {
    // Se tem área desenhada, aplica o filtro com as propriedades filtradas
    if (drawnBoundary) {
      const boundaryData = {
        type: drawnBoundary.type,
        properties: filteredProperties,
        location: searchText || 'Área selecionada no mapa',
      };
      onApply(searchText || 'Área selecionada no mapa', filteredProperties, boundaryData);
    } else if (searchText) {
      // Se só tem texto de busca, aplica a localização
      onApply(searchText, nearbyProperties);
    } else {
      // Se não tem nada, fecha o modal
      onClose();
    }
  };

  const handleBoundaryChange = (boundary) => {
    setDrawnBoundary(boundary);
    if (boundary) {
      filterPropertiesByBoundary(boundary);
    } else {
      setFilteredProperties(nearbyProperties);
    }
  };

  const handleClear = () => {
    setSearchText('');
  };

  const selectPopular = (loc) => {
    handleLocationSelect(loc.name, loc.lat, loc.lng);
  };
  
  // Se não tiver API Key
  if (!apiKey) {
    return (
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-2xl w-full bg-white rounded-2xl shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <Dialog.Title className="text-xl font-bold text-slate-900">
                Localização
              </Dialog.Title>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="relative mb-6">
                <MapPin size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Digite uma cidade, bairro ou endereço..."
                  className="w-full pl-12 pr-12 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
                {searchText && (
                  <button onClick={handleClear} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    <X size={18} />
                  </button>
                )}
              </div>

              <div className="mb-6 rounded-lg overflow-hidden border border-slate-200">
                <div className="h-[300px] bg-slate-100 flex items-center justify-center">
                  <div className="text-center text-slate-600">
                    <MapPin size={48} className="mx-auto mb-2 opacity-50" />
                    <p className="font-medium">Configure a API Key do Google Maps</p>
                    <p className="text-sm">Adicione VITE_GOOGLE_MAPS_API_KEY no arquivo .env</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Localizações Populares</h3>
                <div className="grid grid-cols-2 gap-2">
                  {POPULAR_LOCATIONS.map((loc) => (
                    <button
                      key={loc.name}
                      onClick={() => selectPopular(loc)}
                      className="px-3 py-2 text-sm text-slate-700 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors text-left"
                    >
                      {loc.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-3 p-6 border-t border-slate-200">
              <button onClick={handleClear} className="px-6 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                Limpar
              </button>
              <div className="flex gap-3">
                <button onClick={onClose} className="px-6 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                  Cancelar
                </button>
                <button onClick={handleApply} className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                  Aplicar
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    );
  }
  
  // Se houver erro ao carregar
  if (loadError) {
    return (
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-6">
            <div className="text-center text-red-600">
              <p className="font-medium">Erro ao carregar Google Maps</p>
              <p className="text-sm mt-2">Verifique sua API Key e conexão com a internet</p>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    );
  }
  
  // Se ainda estiver carregando
  if (!isLoaded) {
    return (
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-6">
            <div className="text-center text-slate-600">
              <p>Carregando Google Maps...</p>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    );
  }

  // Renderizar o modal com Google Maps carregado
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      {/* Container centralizado */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className={`mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
          isFullscreen ? 'w-full h-full max-w-none' : 'max-w-6xl w-full'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <Dialog.Title className="text-xl font-bold text-slate-900">
              {isFullscreen ? 'Buscar Propriedades no Mapa' : 'Selecione a Localização'}
            </Dialog.Title>
            <div className="flex items-center gap-2">
              {/* Botão Fullscreen/Normal */}
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                title={isFullscreen ? 'Modo Normal' : 'Tela Cheia'}
              >
                {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
              </button>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Content - Grid com 2 colunas ou fullscreen */}
          <div className={`grid ${isFullscreen ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'} ${
            isFullscreen ? 'h-[calc(100vh-180px)]' : 'h-[600px]'
          }`}>
            {/* Coluna Esquerda - Pesquisa e Localizações */}
            {!isFullscreen && (
              <div className="p-6 overflow-y-auto border-r border-slate-200">
                {/* Barra de busca com Autocomplete */}
                <div className="relative mb-6">
                  <MapPin
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10"
                  />
                  <Autocomplete
                    onLoad={onAutocompleteLoad}
                    onPlaceChanged={onPlaceChanged}
                    options={{
                      componentRestrictions: { country: 'br' },
                      types: ['(cities)']
                    }}
                  >
                    <input
                      type="text"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      placeholder="Digite uma cidade ou endereço..."
                      className="w-full pl-12 pr-12 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    />
                  </Autocomplete>
                  {searchText && (
                    <button
                      onClick={handleClear}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>

                {/* Estatísticas de Filtro */}
                {drawnBoundary && (
                  <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <p className="text-sm font-medium text-emerald-900 mb-1">
                      Área Desenhada
                    </p>
                    <p className="text-emerald-700 font-semibold text-lg">
                      {filteredProperties.length} {filteredProperties.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
                    </p>
                    <p className="text-emerald-600 text-xs mt-1">
                      Use Draw no mapa para refinar a busca
                    </p>
                  </div>
                )}

                {/* Localizações populares */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-3">
                    Localizações Populares em Santa Catarina
                  </h3>
                  <div className="space-y-2">
                    {POPULAR_LOCATIONS.map((loc) => (
                      <button
                        key={loc.name}
                        onClick={() => selectPopular(loc)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left text-slate-700 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors group"
                      >
                        <MapPin size={18} className="text-slate-400 group-hover:text-emerald-600" />
                        <span className="font-medium">{loc.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Localização Selecionada */}
                {searchText && !drawnBoundary && (
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm font-medium text-blue-900 mb-1">
                      Localização Selecionada:
                    </p>
                    <p className="text-blue-700 font-semibold">
                      {searchText}
                    </p>
                    <p className="text-blue-600 text-xs mt-1">
                      {nearbyProperties.length} imóveis nesta região
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Coluna Direita - Mapa */}
            <div className={`relative bg-slate-100 ${isFullscreen ? 'col-span-1' : ''}`}>
              <InteractiveMap
                properties={filteredProperties}
                initialCenter={mapCenter}
                height={isFullscreen ? 'calc(100vh - 180px)' : '600px'}
                showDrawTools={true}
                showLayers={true}
                onPropertyClick={(property) => {
                  console.log('Property clicked:', property);
                  // Você pode navegar para detalhes ou abrir preview
                }}
                onBoundaryChange={handleBoundaryChange}
              />
              
              {/* Info Badge no Fullscreen */}
              {isFullscreen && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur px-6 py-3 rounded-xl shadow-lg border border-slate-200">
                  <p className="text-sm text-slate-600">
                    <span className="font-semibold text-emerald-600">{filteredProperties.length}</span> imóveis •
                    {drawnBoundary ? (
                      <span className="text-emerald-700"> Área desenhada ativa</span>
                    ) : (
                      <span> Use Draw para filtrar por área</span>
                    )}
                  </p>
                </div>
              )}

              {/* Estatísticas quando tem filtro de área */}
              {!isFullscreen && drawnBoundary && (
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur px-4 py-3 rounded-xl shadow-lg border border-emerald-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Imóveis na área selecionada:</p>
                      <p className="text-2xl font-bold text-emerald-600">{filteredProperties.length}</p>
                    </div>
                    <div className="text-emerald-600">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between gap-3 p-6 border-t border-slate-200 bg-slate-50">
            <button
              onClick={handleClear}
              className="px-6 py-2 text-slate-600 hover:bg-slate-200 rounded-lg transition-colors font-medium"
            >
              Limpar
            </button>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2 text-slate-600 hover:bg-slate-200 rounded-lg transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleApply}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium flex items-center gap-2"
              >
                {drawnBoundary && (
                  <span className="px-2 py-0.5 bg-emerald-700 rounded text-xs">
                    {filteredProperties.length}
                  </span>
                )}
                Aplicar Localização
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
