import { useState, useRef, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { X, MapPin, Maximize2, Minimize2 } from 'lucide-react';
import { Autocomplete, useLoadScript } from '@react-google-maps/api';
import InteractiveMap from '../../Explorar/InteractiveMap';
import { api } from '../../../api/client';

const DEFAULT_CENTER = { lat: -27.5954, lng: -48.5480 }; // Centro padrão

const libraries = ['places', 'drawing', 'geometry'];

export default function LocationModal({ isOpen, onClose, location, onApply }) {
  const [searchText, setSearchText] = useState(location || '');
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);
  const [markerPosition, setMarkerPosition] = useState(DEFAULT_CENTER);
  const [nearbyProperties, setNearbyProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [drawnBoundary, setDrawnBoundary] = useState(null);
  const [reloadKey, setReloadKey] = useState(0); // Para forçar reload
  const autocompleteRef = useRef(null);
  
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  
  // Hook para carregar o Google Maps apenas uma vez
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey || '',
    libraries: libraries,
  });

  // Resetar estados quando o modal abre
  useEffect(() => {
    if (isOpen) {
      console.log('🔄 Modal aberto - resetando estados e forçando reload');
      setSearchText(location || '');
      setDrawnBoundary(null);
      setIsFullscreen(false);
      setReloadKey(prev => prev + 1); // Força reload das propriedades
    }
  }, [isOpen, location]);

  // Buscar propriedades próximas à localização
  useEffect(() => {
    if (!isOpen) {
      console.log('❌ Modal fechado - mantendo propriedades');
      return;
    }
    
    const fetchProperties = async () => {
      try {
        console.log('📡 Buscando propriedades para o mapa... (reload #' + reloadKey + ')');
        const { data } = await api.get('/properties', {
          params: {
            published: true,
            limit: 100,
          }
        });
        
        // Tentar diferentes estruturas de resposta
        let properties = [];
        if (Array.isArray(data)) {
          properties = data;
        } else if (data.items && Array.isArray(data.items)) {
          properties = data.items;
        } else if (data.properties && Array.isArray(data.properties)) {
          properties = data.properties;
        } else if (data.data && Array.isArray(data.data)) {
          properties = data.data;
        }
        
        console.log('✅ Propriedades carregadas no mapa:', properties.length);
        if (properties.length > 0) {
          console.log('Primeira propriedade:', properties[0]);
          console.log('Cidade da primeira:', properties[0]?.city);
          console.log('Localização:', { lat: properties[0]?.latitude, lng: properties[0]?.longitude });
        }
        console.log('Propriedades com lat/lng:', properties.filter(p => p.latitude && p.longitude).length);
        
        setNearbyProperties(properties);
        setFilteredProperties(properties);
      } catch (error) {
        console.error('❌ Erro ao buscar propriedades:', error);
        setNearbyProperties([]);
        setFilteredProperties([]);
      }
    };
    
    fetchProperties();
  }, [reloadKey, isOpen]); // Reordenado: reloadKey primeiro

  // Filtrar propriedades pela área desenhada
  const filterPropertiesByBoundary = (boundary) => {
    if (!boundary || !window.google?.maps?.geometry) {
      setFilteredProperties(nearbyProperties);
      return;
    }

    const filtered = nearbyProperties.filter(property => {
      if (!property.latitude || !property.longitude) return false;
      
      const lat = parseFloat(property.latitude);
      const lng = parseFloat(property.longitude);
      
      if (isNaN(lat) || isNaN(lng)) return false;
      
      return isPointInBoundary(lat, lng, boundary);
    });
    
    console.log(`Filtrados ${filtered.length} de ${nearbyProperties.length} imóveis`);
    setFilteredProperties(filtered);
  };

  // Verificar se ponto está dentro do boundary
  const isPointInBoundary = (lat, lng, boundary) => {
    if (!window.google?.maps?.geometry) return false;
    
    const point = new window.google.maps.LatLng(lat, lng);
    
    // Circle
    if (boundary.getCenter && boundary.getRadius) {
      const center = boundary.getCenter();
      const radius = boundary.getRadius();
      const distance = window.google.maps.geometry.spherical.computeDistanceBetween(point, center);
      return distance <= radius;
    }
    
    // Rectangle
    if (boundary.getBounds && !boundary.getPath) {
      const bounds = boundary.getBounds();
      return bounds.contains(point);
    }
    
    // Polygon
    if (boundary.getPath) {
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
      onApply(searchText || 'Área selecionada no mapa', filteredProperties.map(p => p.id), boundaryData);
      // Fecha o modal após aplicar
      onClose();
    } else if (searchText) {
      // Se só tem texto de busca, aplica a localização
      onApply(searchText, null, null);
      onClose();
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
    console.log('🧹 Limpando filtros do modal');
    setSearchText('');
    setDrawnBoundary(null);
    setFilteredProperties(nearbyProperties); // Restaura todas as propriedades
    setMapCenter(DEFAULT_CENTER);
    setReloadKey(prev => prev + 1); // Força reload do mapa para limpar desenhos
    console.log('✅ Filtros limpos - propriedades restauradas:', nearbyProperties.length);
    // Aplicar filtro vazio para remover da página Explorar
    onApply('', []);
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
        <Dialog.Panel className={`mx-auto bg-white rounded-2xl shadow-2xl overflow-y-auto transition-all duration-300 flex flex-col ${
          isFullscreen ? 'w-full h-full max-w-none' : 'max-w-4xl w-full max-h-[90vh]'
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

          {/* Content - Layout VERTICAL: busca em cima, mapa embaixo */}
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Seção de Busca */}
            <div className="p-6 border-b border-slate-200 flex-shrink-0">
              {/* Barra de busca com Autocomplete */}
              <div className="relative">
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

              {/* Estatísticas discretas quando tem filtro */}
              {drawnBoundary && (
                <div className="mt-3 flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-slate-600">
                    <span className="font-semibold text-emerald-600">{filteredProperties.length}</span> {filteredProperties.length === 1 ? 'imóvel' : 'imóveis'} na área
                  </span>
                </div>
              )}
            </div>

            {/* Seção do Mapa - ABAIXO da busca */}
            <div className={`relative bg-slate-100 flex-shrink-0 ${
              isFullscreen ? 'h-[calc(100vh-300px)]' : 'h-[280px]'
            }`}>
              <InteractiveMap
                properties={nearbyProperties}
                initialCenter={mapCenter}
                height={isFullscreen ? '100%' : '280px'}
                showDrawTools={true}
                showLayers={true}
                resetKey={reloadKey}
                onPropertyClick={(property) => {
                  console.log('Property clicked:', property);
                }}
                onBoundaryChange={handleBoundaryChange}
              />
            </div>
          </div>

          {/* Footer - sempre visível */}
          <div className="flex justify-end gap-3 p-6 border-t border-slate-200 bg-slate-50 flex-shrink-0">
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-slate-600 hover:bg-slate-200 rounded-xl transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              onClick={handleApply}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all font-semibold flex items-center gap-2 shadow-lg"
            >
              {drawnBoundary && (
                <span className="px-2 py-0.5 bg-white/20 rounded-md text-xs font-bold">
                  {filteredProperties.length}
                </span>
              )}
              {drawnBoundary ? 'Aplicar Área' : 'Aplicar Localização'}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
