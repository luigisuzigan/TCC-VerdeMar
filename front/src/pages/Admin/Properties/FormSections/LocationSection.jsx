import { useState, useEffect, useRef } from 'react';
import { MapPin, Info, Search, Trash2, Navigation, Globe, RefreshCw } from 'lucide-react';
import { getCoordinatesFromAddress, isGoogleMapsConfigured } from '../../../../services/geocoding';

export default function LocationSection({ model, update }) {
  const [searchCep, setSearchCep] = useState('');
  const [loadingCep, setLoadingCep] = useState(false);
  const [loadingCoords, setLoadingCoords] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  // Buscar endereço pelo CEP (ViaCEP API) - NÃO busca coordenadas
  const handleSearchCep = async () => {
    if (!searchCep) {
      alert('⚠️ Digite um CEP para buscar');
      return;
    }
    
    setLoadingCep(true);
    try {
      const cep = searchCep.replace(/\D/g, '');
      
      if (cep.length !== 8) {
        alert('⚠️ CEP deve ter 8 dígitos');
        setLoadingCep(false);
        return;
      }

      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      
      if (data.erro) {
        alert('❌ CEP não encontrado');
        setLoadingCep(false);
        return;
      }

      // Preencher apenas campos de endereço
      if (data.logradouro) update('address', data.logradouro);
      update('city', data.localidade);
      update('neighborhood', data.bairro || '');
      update('state', data.uf);
      update('zipCode', searchCep);
      update('country', 'Brasil');
      
      alert('✅ Endereço encontrado com sucesso!\n\nAgora você pode buscar as coordenadas GPS clicando em "Buscar Coordenadas"');
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      alert('❌ Erro ao buscar CEP. Verifique sua conexão e tente novamente.');
    } finally {
      setLoadingCep(false);
    }
  };

  // Buscar coordenadas pelo endereço (Google Maps Geocoding)
  const handleSearchCoordinates = async () => {
    if (!isGoogleMapsConfigured()) {
      alert('⚠️ Google Maps API não configurada.\n\nConfigure VITE_GOOGLE_MAPS_API_KEY no arquivo .env');
      return;
    }

    // Montar endereço completo - incluindo CEP do campo obrigatório se disponível
    const addressParts = [
      model.address,
      model.neighborhood,
      model.city,
      model.state,
      model.zipCode, // Incluir CEP do campo obrigatório
      model.country || 'Brasil'
    ].filter(part => part && part.trim() !== '');

    if (addressParts.length === 0) {
      alert('⚠️ Preencha pelo menos o CEP ou a cidade para buscar as coordenadas');
      return;
    }

    const fullAddress = addressParts.join(', ');
    
    setLoadingCoords(true);
    try {
      const coords = await getCoordinatesFromAddress(fullAddress);
      update('latitude', coords.lat.toString());
      update('longitude', coords.lng.toString());
      alert(`✅ Coordenadas encontradas!\n\nLatitude: ${coords.lat}\nLongitude: ${coords.lng}`);
    } catch (error) {
      console.error('Erro ao buscar coordenadas:', error);
      alert(`❌ Erro ao buscar coordenadas:\n\n${error.message}`);
    } finally {
      setLoadingCoords(false);
    }
  };

  // Limpar coordenadas
  const handleClearCoordinates = () => {
    update('latitude', '');
    update('longitude', '');
    
    // Limpar instâncias do mapa para permitir recriação
    if (markerRef.current) {
      markerRef.current.setMap(null);
      markerRef.current = null;
    }
    if (mapInstanceRef.current) {
      mapInstanceRef.current = null;
    }
  };

  // Usar localização atual do navegador
  const handleUseMyLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          update('latitude', position.coords.latitude.toString());
          update('longitude', position.coords.longitude.toString());
          alert('✅ Localização obtida com sucesso!');
        },
        (error) => {
          console.error('Erro ao obter localização:', error);
          alert('❌ Não foi possível obter sua localização.\nVerifique as permissões do navegador.');
        }
      );
    } else {
      alert('❌ Geolocalização não suportada pelo navegador');
    }
  };

  // Inicializar Google Maps Interativo
  useEffect(() => {
    // Se não há coordenadas, limpar o mapa
    if (!model.latitude || !model.longitude) {
      if (markerRef.current) {
        markerRef.current.setMap(null);
        markerRef.current = null;
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null;
      }
      return;
    }

    if (!mapRef.current) return;

    // Carregar Google Maps API se ainda não foi carregado
    if (!window.google?.maps) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setMapLoaded(true);
      document.head.appendChild(script);
      return;
    }

    // Criar ou atualizar o mapa
    const lat = parseFloat(model.latitude);
    const lng = parseFloat(model.longitude);

    if (isNaN(lat) || isNaN(lng)) return;

    if (!mapInstanceRef.current) {
      // Criar novo mapa
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        center: { lat, lng },
        zoom: 15,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: false,
      });

      // Criar marcador
      markerRef.current = new window.google.maps.Marker({
        position: { lat, lng },
        map: mapInstanceRef.current,
        draggable: false,
        title: 'Localização do Imóvel',
      });

      // Adicionar listener de duplo clique no mapa
      mapInstanceRef.current.addListener('dblclick', (e) => {
        const newLat = e.latLng.lat();
        const newLng = e.latLng.lng();
        
        update('latitude', newLat.toString());
        update('longitude', newLng.toString());

        // Atualizar marcador
        if (markerRef.current) {
          markerRef.current.setPosition({ lat: newLat, lng: newLng });
        }

        // Info toast
        const toast = document.createElement('div');
        toast.style.cssText = 'position:fixed;top:20px;right:20px;background:#10b981;color:white;padding:12px 20px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.15);z-index:9999;font-weight:600;';
        toast.textContent = `✅ Coordenadas atualizadas!`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
      });
    } else {
      // Atualizar posição do mapa e marcador existentes
      mapInstanceRef.current.setCenter({ lat, lng });
      if (markerRef.current) {
        markerRef.current.setPosition({ lat, lng });
      }
    }
  }, [model.latitude, model.longitude, mapLoaded]);

  return (
    <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* Header com gradiente */}
      <div className="bg-gradient-to-r from-emerald-500 to-green-500 px-8 py-6 text-center">
        <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
          <MapPin size={32} />
          📍 LOCALIZAÇÃO COMPLETA
        </h2>
        <p className="text-emerald-50 text-sm mt-2">Endereço e coordenadas GPS do imóvel</p>
      </div>

      {/* Conteúdo */}
      <div className="p-8 space-y-6">
        
        {/* BUSCAR POR CEP */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
            <Search size={20} />
            🔍 Buscar por CEP
          </h3>
          
          <div className="flex gap-3">
            <input
              type="text"
              value={searchCep}
              onChange={(e) => setSearchCep(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearchCep()}
              className="flex-1 px-4 py-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
              placeholder="Digite o CEP: 88330-000"
              maxLength={9}
            />
            <button
              type="button"
              onClick={handleSearchCep}
              disabled={loadingCep}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-lg flex items-center gap-2 transition-all shadow-md hover:shadow-lg disabled:cursor-not-allowed min-w-[140px] justify-center"
            >
              {loadingCep ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Buscando...
                </>
              ) : (
                <>
                  <Search size={20} />
                  Buscar
                </>
              )}
            </button>
          </div>

          <p className="text-sm text-blue-700 mt-3 flex items-center gap-1">
            <Info size={14} />
            Preenche automaticamente: Endereço, Cidade, Bairro, Estado, País e CEP
          </p>
        </div>

        <div className="border-t border-slate-200"></div>

        {/* CAMPOS DE ENDEREÇO (Grid compacto) */}
        <div>
          <label className="flex items-center justify-between mb-4">
            <span className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <MapPin size={20} className="text-emerald-600" />
              Endereço do Imóvel
            </span>
            <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full font-semibold">
              Obrigatório *
            </span>
          </label>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Linha 1: Endereço Completo (full width) */}
            <div className="md:col-span-3">
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Endereço Completo
              </label>
              <input
                type="text"
                value={model.address}
                onChange={(e) => update('address', e.target.value)}
                className="w-full px-3 py-2.5 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                placeholder="Rua das Palmeiras, 123 - Apto 501"
              />
            </div>

            {/* Linha 2: Cidade, Bairro, Estado */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Cidade *
              </label>
              <input
                type="text"
                value={model.city}
                onChange={(e) => update('city', e.target.value)}
                className="w-full px-3 py-2.5 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                placeholder="Balneário Camboriú"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Bairro
              </label>
              <input
                type="text"
                value={model.neighborhood}
                onChange={(e) => update('neighborhood', e.target.value)}
                className="w-full px-3 py-2.5 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all"
                placeholder="Centro"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Estado (UF) *
              </label>
              <input
                type="text"
                value={model.state}
                onChange={(e) => update('state', e.target.value.toUpperCase())}
                className="w-full px-3 py-2.5 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 uppercase transition-all"
                placeholder="SC"
                maxLength={2}
                required
              />
            </div>

            {/* Linha 3: País e CEP */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                País *
              </label>
              <input
                type="text"
                value={model.country}
                onChange={(e) => update('country', e.target.value)}
                className="w-full px-3 py-2.5 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                placeholder="Brasil"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">
                CEP *
              </label>
              <input
                type="text"
                value={model.zipCode}
                onChange={(e) => update('zipCode', e.target.value)}
                className="w-full px-3 py-2.5 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                placeholder="88330-000"
                required
              />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200"></div>

        {/* COORDENADAS GPS */}
        <div>
          <label className="flex items-center justify-between mb-4">
            <span className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Globe size={20} className="text-slate-600" />
              🗺️ Coordenadas GPS
            </span>
            <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-semibold">
              Opcional
            </span>
          </label>

          {/* LAYOUT: Campos à esquerda | Mini-mapa à direita */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
            
            {/* COLUNA ESQUERDA: Campos de Latitude e Longitude + Botões */}
            <div className="space-y-4">
              {/* Latitude */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-1">
                  <span>Latitude</span>
                  <Info size={14} className="text-slate-400" />
                </label>
                <input
                  type="number"
                  step="any"
                  value={model.latitude}
                  onChange={(e) => update('latitude', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-lg"
                  placeholder="-26.9906"
                />
              </div>

              {/* Longitude */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-1">
                  <span>Longitude</span>
                  <Info size={14} className="text-slate-400" />
                </label>
                <input
                  type="number"
                  step="any"
                  value={model.longitude}
                  onChange={(e) => update('longitude', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-lg"
                  placeholder="-48.6480"
                />
              </div>

              {/* BOTÕES COMPACTOS (só ícones) */}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleSearchCoordinates}
                  disabled={loadingCoords}
                  title="Buscar pelo Endereço"
                  className="flex-1 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white rounded-lg flex items-center justify-center transition-all disabled:cursor-not-allowed"
                >
                  {loadingCoords ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <Search size={20} />
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleUseMyLocation}
                  title="Minha Localização"
                  className="flex-1 px-4 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg flex items-center justify-center transition-all"
                >
                  <Navigation size={20} />
                </button>

                {(model.latitude || model.longitude) && (
                  <button
                    type="button"
                    onClick={handleClearCoordinates}
                    title="Limpar Coordenadas"
                    className="px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center justify-center transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>

              <p className="text-sm text-slate-500 flex items-center gap-1">
                <Info size={14} />
                🔍 As coordenadas são usadas para exibir o imóvel no mapa
              </p>
              
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                <p className="text-xs text-emerald-700 font-medium">
                  💡 <strong>Dica:</strong> O botão "Buscar" usa o endereço completo preenchido acima (incluindo o CEP do campo obrigatório)
                </p>
              </div>
            </div>

            {/* COLUNA DIREITA: Mini-mapa Preview */}
            <div className="flex items-center justify-center">
              {model.latitude && model.longitude ? (
                <div className="w-full border-2 border-emerald-300 rounded-xl overflow-hidden shadow-lg">
                  <div className="bg-emerald-600 px-4 py-2 flex items-center gap-2">
                    <MapPin size={18} className="text-white" />
                    <span className="text-white font-bold text-sm">🗺️ Clique 2x no mapa para mover</span>
                  </div>
                  <div className="relative">
                    {/* Mapa Interativo do Google Maps */}
                    <div 
                      ref={mapRef}
                      style={{ width: '100%', height: '280px' }}
                      className="bg-slate-100"
                    ></div>
                    <div className="absolute bottom-2 left-2 bg-white bg-opacity-90 px-3 py-1.5 rounded-lg shadow-md">
                      <p className="text-xs font-bold text-slate-700">
                        📍 {parseFloat(model.latitude).toFixed(6)}, {parseFloat(model.longitude).toFixed(6)}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-center min-h-[280px]">
                  <MapPin size={48} className="text-slate-300 mb-3" />
                  <p className="text-sm font-bold text-slate-400">
                    Preencha as coordenadas
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    O mapa aparecerá aqui
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* PREVIEW DO ENDEREÇO MONTADO - EMBAIXO DO MAPA */}
          {model.city && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
              <p className="text-sm font-bold text-blue-900 mb-2 flex items-center gap-2">
                <MapPin size={16} />
                📍 Endereço para busca de coordenadas
              </p>
              <p className="text-blue-800 font-medium">
                {[model.address, model.city, model.state, model.country].filter(Boolean).join(', ')}
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
