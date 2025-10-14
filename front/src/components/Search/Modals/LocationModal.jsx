import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { X, MapPin, Search } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../../../styles/leaflet.css';

// Fix Leaflet default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Localizações populares de exemplo
const POPULAR_LOCATIONS = [
  { name: 'Florianópolis, SC', lat: -27.5954, lng: -48.5480 },
  { name: 'Balneário Camboriú, SC', lat: -26.9979, lng: -48.6357 },
  { name: 'Itapema, SC', lat: -27.0905, lng: -48.6114 },
  { name: 'Bombinhas, SC', lat: -27.1396, lng: -48.5123 },
  { name: 'Porto Belo, SC', lat: -27.1583, lng: -48.5553 },
  { name: 'Praia Central - Florianópolis', lat: -27.5969, lng: -48.5495 },
];

const DEFAULT_CENTER = [-27.5954, -48.5480]; // Florianópolis

// Componente para mover o mapa quando a posição muda
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export default function LocationModal({ isOpen, onClose, location, onApply }) {
  const [searchText, setSearchText] = useState(location || '');
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);
  const [markerPosition, setMarkerPosition] = useState(DEFAULT_CENTER);
  const [zoom, setZoom] = useState(13);
  const [isSearching, setIsSearching] = useState(false);

  const handleLocationSelect = (locationName, lat, lng) => {
    setSearchText(locationName);
    const newCenter = [lat, lng];
    setMapCenter(newCenter);
    setMarkerPosition(newCenter);
    setZoom(14);
  };

  const handleSearch = async () => {
    if (!searchText.trim()) return;

    setIsSearching(true);

    // Busca simples nas localizações populares
    const found = POPULAR_LOCATIONS.find(loc => 
      loc.name.toLowerCase().includes(searchText.toLowerCase())
    );

    if (found) {
      handleLocationSelect(found.name, found.lat, found.lng);
      setIsSearching(false);
    } else {
      // Se não encontrar, tenta geocoding gratuito com Nominatim (OpenStreetMap)
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchText)}&limit=1`,
          {
            headers: {
              'User-Agent': 'VerdeMar-RealEstate-App'
            }
          }
        );
        const data = await response.json();
        
        if (data && data.length > 0) {
          const { lat, lon, display_name } = data[0];
          handleLocationSelect(display_name, parseFloat(lat), parseFloat(lon));
        }
      } catch (error) {
        console.error('Erro ao buscar localização:', error);
      } finally {
        setIsSearching(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleApply = () => {
    onApply(searchText);
  };

  const handleClear = () => {
    setSearchText('');
  };

  const selectPopular = (loc) => {
    handleLocationSelect(loc.name, loc.lat, loc.lng);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      {/* Container centralizado */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl w-full bg-white rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <Dialog.Title className="text-xl font-bold text-slate-900">
              Localização
            </Dialog.Title>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Barra de busca */}
            <div className="relative mb-6">
              <MapPin
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10"
              />
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite uma cidade, bairro ou endereço..."
                className="w-full pl-12 pr-24 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                <Search size={16} />
                {isSearching ? 'Buscando...' : 'Buscar'}
              </button>
              {searchText && (
                <button
                  onClick={handleClear}
                  className="absolute right-28 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Mapa Leaflet */}
            <div className="mb-6 rounded-lg overflow-hidden border border-slate-200">
              <div style={{ height: '300px', width: '100%' }}>
                <MapContainer
                  center={mapCenter}
                  zoom={zoom}
                  style={{ height: '100%', width: '100%' }}
                  scrollWheelZoom={false}
                >
                  <ChangeView center={mapCenter} zoom={zoom} />
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={markerPosition}>
                    <Popup>
                      {searchText || 'Localização selecionada'}
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>

            {/* Localizações populares */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">
                Localizações Populares
              </h3>
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

          {/* Footer */}
          <div className="flex justify-between gap-3 p-6 border-t border-slate-200">
            <button
              onClick={handleClear}
              className="px-6 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Limpar
            </button>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleApply}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Aplicar
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
