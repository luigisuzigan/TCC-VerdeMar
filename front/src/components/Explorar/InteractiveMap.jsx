import { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, useLoadScript, DrawingManager, OverlayView } from '@react-google-maps/api';
import { Layers, Pencil, X, Square, Circle as CircleIcon, Trash2, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const libraries = ['drawing', 'places', 'geometry'];

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: -27.5969, // Florianópolis, SC
  lng: -48.5495,
};

const mapStyles = {
  street: [],
  satellite: [
    {
      featureType: 'all',
      elementType: 'labels',
      stylers: [{ visibility: 'on' }]
    }
  ],
  terrain: []
};

export default function InteractiveMap({ 
  properties = [], 
  onPropertyClick,
  initialCenter = center,
  height = '100%',
  showDrawTools = true,
  showLayers = true,
  onBoundaryChange,
  resetKey = 0,
}) {
  const navigate = useNavigate();
  
  // LOG PRINCIPAL - Ver se propriedades chegam
  console.log('🚀 InteractiveMap INICIADO com', properties.length, 'propriedades');
  console.log('📦 Propriedades:', properties);
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries,
  });

  const [mapType, setMapType] = useState('roadmap');
  const [showLayersPanel, setShowLayersPanel] = useState(false);
  const [drawingMode, setDrawingMode] = useState(null);
  const [drawnShapes, setDrawnShapes] = useState([]);
  const [hoveredProperty, setHoveredProperty] = useState(null);
  const [currentZoom, setCurrentZoom] = useState(13);
  const [isDrawingFreehand, setIsDrawingFreehand] = useState(false);
  const [freehandPath, setFreehandPath] = useState([]);

  const mapRef = useRef(null);
  const freehandPolygonRef = useRef(null);

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    const zoom = map.getZoom() || 13;
    setCurrentZoom(zoom);
    console.log('🗺️ Mapa carregado! Zoom inicial:', zoom);
    console.log('📊 Propriedades disponíveis no load:', properties.length);
    console.log('✅ isLoaded:', isLoaded);
  }, [properties, isLoaded]);

  // Atualizar zoom quando o mapa mover
  useEffect(() => {
    if (!mapRef.current) return;
    
    const listener = mapRef.current.addListener('zoom_changed', () => {
      if (mapRef.current) {
        setCurrentZoom(mapRef.current.getZoom());
      }
    });
    
    return () => {
      if (listener && window.google?.maps?.event) {
        window.google.maps.event.removeListener(listener);
      }
    };
  }, []);

  // Zoom controls
  const handleZoomIn = () => {
    if (mapRef.current) {
      const currentZoomLevel = mapRef.current.getZoom();
      mapRef.current.setZoom(currentZoomLevel + 1);
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      const currentZoomLevel = mapRef.current.getZoom();
      mapRef.current.setZoom(currentZoomLevel - 1);
    }
  };

  const handleMyLocation = () => {
    if (navigator.geolocation && mapRef.current) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          mapRef.current.panTo(pos);
          mapRef.current.setZoom(15);
        },
        () => {
          alert('Erro ao obter sua localização');
        }
      );
    }
  };

  const handleOverlayComplete = useCallback((overlay) => {
    // Limpar desenhos anteriores (só um desenho por vez, igual homes.com)
    drawnShapes.forEach(shape => {
      if (shape.overlay) {
        shape.overlay.setMap(null);
      }
    });
    
    const newShape = {
      id: Date.now(),
      type: overlay.type,
      overlay: overlay.overlay,
    };
    setDrawnShapes([newShape]); // Substitui, não adiciona
    setDrawingMode(null);
    
    // Filtrar imóveis dentro da área desenhada
    const filteredProps = filterPropertiesByBoundary(overlay.overlay, properties);
    console.log('🎯 Filtrados:', filteredProps.length, 'de', properties.length);
    
    // Notificar mudança de boundary se callback existir
    if (onBoundaryChange) {
      onBoundaryChange(overlay.overlay, filteredProps);
    }
  }, [onBoundaryChange, properties, drawnShapes]);

  // Função para verificar se um ponto está dentro da área desenhada
  const filterPropertiesByBoundary = (overlay, allProperties) => {
    if (!overlay || !window.google) return allProperties;

    const filtered = allProperties.filter(property => {
      if (!property.latitude || !property.longitude) return false;
      
      const point = new window.google.maps.LatLng(
        parseFloat(property.latitude),
        parseFloat(property.longitude)
      );

      // Verificar tipo de overlay (polygon, rectangle, circle)
      if (overlay.getPath) {
        // Polígono ou Retângulo
        return window.google.maps.geometry.poly.containsLocation(point, overlay);
      } else if (overlay.getBounds) {
        // Círculo
        const bounds = overlay.getBounds();
        return bounds.contains(point);
      } else if (overlay.getCenter && overlay.getRadius) {
        // Círculo com getCenter
        const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
          point,
          overlay.getCenter()
        );
        return distance <= overlay.getRadius();
      }
      
      return false;
    });

    return filtered;
  };

  const clearDrawing = useCallback(() => {
    drawnShapes.forEach(shape => {
      if (shape.overlay) {
        shape.overlay.setMap(null);
      }
    });
    setDrawnShapes([]);
    
    // Limpar desenho freehand também
    if (freehandPolygonRef.current) {
      freehandPolygonRef.current.setMap(null);
      freehandPolygonRef.current = null;
    }
    setFreehandPath([]);
    setIsDrawingFreehand(false);
    
    if (onBoundaryChange) {
      onBoundaryChange(null, properties); // Retorna todos os imóveis
    }
  }, [drawnShapes, onBoundaryChange, properties]);

  // Handlers para desenho livre (freehand)
  const handleMapMouseDown = useCallback((e) => {
    if (drawingMode === 'freehand' && mapRef.current) {
      setIsDrawingFreehand(true);
      const latLng = e.latLng;
      setFreehandPath([{ lat: latLng.lat(), lng: latLng.lng() }]);
    }
  }, [drawingMode]);

  const handleMapMouseMove = useCallback((e) => {
    if (isDrawingFreehand && drawingMode === 'freehand') {
      const latLng = e.latLng;
      const newPoint = { lat: latLng.lat(), lng: latLng.lng() };
      
      setFreehandPath(prev => {
        const newPath = [...prev, newPoint];
        
        // Atualizar ou criar o polígono temporário
        if (freehandPolygonRef.current) {
          freehandPolygonRef.current.setPath(newPath);
        } else if (mapRef.current && window.google) {
          freehandPolygonRef.current = new window.google.maps.Polygon({
            paths: newPath,
            fillColor: '#2563eb',
            fillOpacity: 0.15,
            strokeColor: '#2563eb',
            strokeWeight: 3,
            editable: false,
            map: mapRef.current,
          });
        }
        
        return newPath;
      });
    }
  }, [isDrawingFreehand, drawingMode]);

  const handleMapMouseUp = useCallback(() => {
    if (isDrawingFreehand && drawingMode === 'freehand' && freehandPath.length > 2) {
      setIsDrawingFreehand(false);
      
      // Fechar o polígono
      const closedPath = [...freehandPath, freehandPath[0]];
      
      if (freehandPolygonRef.current) {
        freehandPolygonRef.current.setPath(closedPath);
        freehandPolygonRef.current.setOptions({ editable: true, draggable: true });
        
        // Adicionar à lista de shapes
        const newShape = {
          id: Date.now(),
          type: 'polygon',
          overlay: freehandPolygonRef.current,
        };
        
        // Limpar shapes anteriores
        drawnShapes.forEach(shape => {
          if (shape.overlay) {
            shape.overlay.setMap(null);
          }
        });
        
        setDrawnShapes([newShape]);
        setDrawingMode(null);
        
        // Filtrar imóveis
        const filteredProps = filterPropertiesByBoundary(freehandPolygonRef.current, properties);
        console.log('🎯 Freehand - Filtrados:', filteredProps.length, 'de', properties.length);
        
        if (onBoundaryChange) {
          onBoundaryChange(freehandPolygonRef.current, filteredProps);
        }
        
        freehandPolygonRef.current = null;
      }
      
      setFreehandPath([]);
    } else if (isDrawingFreehand) {
      // Cancelar se muito pequeno
      setIsDrawingFreehand(false);
      if (freehandPolygonRef.current) {
        freehandPolygonRef.current.setMap(null);
        freehandPolygonRef.current = null;
      }
      setFreehandPath([]);
    }
  }, [isDrawingFreehand, drawingMode, freehandPath, drawnShapes, properties, onBoundaryChange]);

  // Limpar desenhos quando resetKey mudar
  const prevResetKeyRef = useRef(0);
  
  useEffect(() => {
    if (resetKey > 0 && resetKey !== prevResetKeyRef.current) {
      console.log('🧹 Limpando desenhos do mapa (resetKey:', resetKey, ')');
      prevResetKeyRef.current = resetKey;
      clearDrawing();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]); // Só observa resetKey

  const formatPrice = (price) => {
    if (!price) return 'R$ 0';
    
    // Formato compacto para o mapa
    if (price >= 1000000) {
      return `R$ ${(price / 1000000).toFixed(1).replace('.', ',')}M`;
    }
    if (price >= 1000) {
      return `R$ ${Math.round(price / 1000)}K`;
    }
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Mostrar preço ou ícone baseado no zoom (igual homes.com)
  const shouldShowPrice = (zoom) => {
    return zoom >= 12; // Mostrar preço em zoom >= 12 (ajustado para aparecer mais cedo)
  };

  // Tamanho do marcador baseado no zoom (igual homes.com - pequeno de longe, maior de perto)
  const getMarkerSize = (zoom) => {
    if (zoom <= 9) return { size: 16, fontSize: 8, padding: '2px 4px', iconSize: 8 };
    if (zoom <= 10) return { size: 18, fontSize: 9, padding: '2px 6px', iconSize: 9 };
    if (zoom <= 11) return { size: 22, fontSize: 10, padding: '3px 7px', iconSize: 10 };
    if (zoom <= 12) return { size: 26, fontSize: 10, padding: '4px 8px', iconSize: 11 };
    if (zoom <= 13) return { size: 30, fontSize: 11, padding: '5px 10px', iconSize: 12 };
    if (zoom <= 14) return { size: 34, fontSize: 12, padding: '6px 12px', iconSize: 13 };
    if (zoom <= 15) return { size: 38, fontSize: 13, padding: '7px 14px', iconSize: 14 };
    return { size: 42, fontSize: 14, padding: '8px 16px', iconSize: 16 }; // Max zoom
  };

  // Debug: Log das propriedades (ANTES dos returns!)
  useEffect(() => {
    console.log('🗺️ InteractiveMap - Total de propriedades recebidas:', properties.length);
    console.log('🗺️ InteractiveMap - Propriedades completas:', properties);
    
    const valid = properties.filter(p => p.latitude && p.longitude);
    console.log('🗺️ InteractiveMap - Propriedades válidas (com coordenadas):', valid.length);
    
    if (valid.length > 0) {
      console.log('🗺️ Primeiras 3 propriedades COM coordenadas:', valid.slice(0, 3).map(p => ({
        id: p.id,
        title: p.title,
        lat: p.latitude,
        lng: p.longitude,
        price: p.price
      })));
    } else {
      console.warn('⚠️ NENHUMA propriedade com coordenadas válidas!');
    }
  }, [properties]);

  const handlePropertyClick = (property) => {
    if (onPropertyClick) {
      onPropertyClick(property);
    } else {
      // Navegar para página de detalhes
      navigate(`/property/${property.id}`);
    }
  };

  if (loadError) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <p className="text-red-600 font-medium">Erro ao carregar o mapa</p>
          <p className="text-sm text-slate-600 mt-2">Verifique sua chave da API do Google Maps</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="relative h-full" style={{ height }}>
      {/* Map */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={initialCenter}
        zoom={11}
        onLoad={onMapLoad}
        mapTypeId={mapType}
        onClick={drawingMode === 'freehand' ? handleMapMouseDown : undefined}
        onMouseMove={drawingMode === 'freehand' ? handleMapMouseMove : undefined}
        onMouseUp={drawingMode === 'freehand' ? handleMapMouseUp : undefined}
        options={{
          styles: mapStyles[mapType] || [],
          zoomControl: false, // Remover controle nativo
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          gestureHandling: drawingMode === 'freehand' ? 'none' : 'greedy', // Bloquear drag quando desenhando
          draggableCursor: drawingMode === 'freehand' ? 'crosshair' : 'grab',
          draggingCursor: drawingMode === 'freehand' ? 'crosshair' : 'grabbing',
        }}
      >
        {/* Property Markers - Losango Azul Responsivo */}
        {(() => {
          const validProperties = properties.filter(p => p.latitude && p.longitude);
          console.log('🎯 RENDERIZANDO MARCADORES:', validProperties.length);
          console.log('🗺️ MapRef existe?', !!mapRef.current);
          console.log('📦 Primeira propriedade:', validProperties[0]);
          
          return validProperties.map((property) => {
            console.log('✅ Criando OverlayView para:', property.title);
            return (
            <OverlayView
              key={property.id}
              position={{
                lat: parseFloat(property.latitude),
                lng: parseFloat(property.longitude),
              }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div
                onClick={() => handlePropertyClick(property)}
                onMouseEnter={() => setHoveredProperty(property.id)}
                onMouseLeave={() => setHoveredProperty(null)}
                style={{ zIndex: hoveredProperty === property.id ? 1000 : 1 }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-200"
              >
                {/* Losango (Marker) */}
                <div
                  className={`rounded-full transition-all duration-200 flex items-center justify-center ${
                    hoveredProperty === property.id
                      ? 'bg-blue-700 scale-125 shadow-xl'
                      : 'bg-blue-600 shadow-lg'
                  }`}
                  style={{
                    width: `${getMarkerSize(currentZoom)}px`,
                    height: `${getMarkerSize(currentZoom)}px`,
                    border: hoveredProperty === property.id ? '2px solid white' : '1.5px solid white',
                  }}
                >
                  <MapPin 
                    size={Math.max(12, getMarkerSize(currentZoom) * 0.5)} 
                    className="text-white" 
                    strokeWidth={2.5}
                  />
                </div>

                {/* Card Hover */}
                {hoveredProperty === property.id && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2 animate-in fade-in zoom-in duration-200"
                    style={{
                      bottom: `${getMarkerSize(currentZoom) + 12}px`,
                      zIndex: 2000,
                    }}
                    onMouseEnter={() => setHoveredProperty(property.id)}
                    onMouseLeave={() => setHoveredProperty(null)}
                  >
                    <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200 w-64"
                      style={{ pointerEvents: 'auto' }}
                    >
                      {/* Imagem */}
                      {(() => {
                        try {
                          const images = property.images ? JSON.parse(property.images) : [];
                          const firstImage = Array.isArray(images) ? images[0] : null;
                          return firstImage ? (
                            <div className="w-full h-40 overflow-hidden bg-slate-100 relative">
                              <img
                                src={firstImage}
                                alt={property.title || 'Imóvel'}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-full h-40 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                              <MapPin size={32} className="text-slate-400" />
                            </div>
                          );
                        } catch (e) {
                          return (
                            <div className="w-full h-40 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                              <MapPin size={32} className="text-slate-400" />
                            </div>
                          );
                        }
                      })()}
                      
                      {/* Conteúdo */}
                      <div className="p-3">
                        <p className="text-xl font-bold text-blue-700 mb-2">
                          {formatPrice(property.salePrice || property.price)}
                        </p>
                        <h4 className="font-semibold text-sm text-slate-900 mb-2 line-clamp-2 leading-tight">
                          {property.title || 'Imóvel disponível'}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-slate-600 mb-3">
                          {property.bedrooms && <span className="flex items-center gap-1">🛏️ {property.bedrooms}</span>}
                          {property.bathrooms && <span className="flex items-center gap-1">🚿 {property.bathrooms}</span>}
                          {property.area && <span className="flex items-center gap-1">📐 {property.area}m²</span>}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/property/${property.id}`);
                          }}
                          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
                        >
                          Ver Detalhes
                        </button>
                      </div>
                    </div>
                    
                    {/* Seta apontando para o marcador */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-white"
                      style={{ top: '100%', filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.15))' }}
                    />
                  </div>
                )}
              </div>
            </OverlayView>
            );
          });
        })()}

        {/* Card hover personalizado */}
        {hoveredProperty && (() => {
          const property = properties.find(p => p.id === hoveredProperty);
          if (!property) return null;
          
          return (
            <OverlayView
              key={`hover-${property.id}`}
              position={{
                lat: parseFloat(property.latitude),
                lng: parseFloat(property.longitude),
              }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              getPixelPositionOffset={() => ({
                x: -125,
                y: -280,
              })}
            >
              <div
                className="relative cursor-pointer group"
                onClick={() => handlePropertyClick(property)}
                style={{ 
                  zIndex: 1001,
                  pointerEvents: 'auto',
                }}
              >
                {/* Card hover */}
                <div
                  className="bg-white rounded-lg shadow-2xl overflow-hidden"
                  style={{ width: '250px' }}
                >
                  <img
                    src={property.images?.[0] || '/placeholder.jpg'}
                    alt={property.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="font-semibold text-sm mb-1 line-clamp-1">
                      {property.title}
                    </h3>
                    <p className="text-blue-600 font-bold text-lg">
                      {formatPrice(property.salePrice || property.price)}
                    </p>
                    {property.bedrooms && (
                      <p className="text-xs text-gray-500 mt-1">
                        {property.bedrooms} quartos • {property.bathrooms} banheiros
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </OverlayView>
          );
        })()}



        {/* Drawing Manager */}
        {drawingMode && (
          <DrawingManager
            onOverlayComplete={handleOverlayComplete}
            options={{
              drawingMode: drawingMode === 'polygon' 
                ? window.google?.maps?.drawing?.OverlayType?.POLYGON
                : drawingMode === 'rectangle'
                ? window.google?.maps?.drawing?.OverlayType?.RECTANGLE
                : drawingMode === 'circle'
                ? window.google?.maps?.drawing?.OverlayType?.CIRCLE
                : null,
              drawingControl: false,
              polygonOptions: {
                fillColor: '#2563eb',
                fillOpacity: 0.15,
                strokeColor: '#2563eb',
                strokeWeight: 3,
                editable: true,
                draggable: true,
              },
              rectangleOptions: {
                fillColor: '#2563eb',
                fillOpacity: 0.15,
                strokeColor: '#2563eb',
                strokeWeight: 3,
                editable: true,
                draggable: true,
              },
              circleOptions: {
                fillColor: '#2563eb',
                fillOpacity: 0.15,
                strokeColor: '#2563eb',
                strokeWeight: 3,
                editable: true,
                draggable: true,
              },
            }}
          />
        )}
      </GoogleMap>

      {/* Controles de Zoom Customizados */}
      <div className="absolute bottom-24 right-4 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="w-10 h-10 bg-white rounded-lg shadow-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors text-slate-700 font-bold text-xl"
          title="Zoom In"
        >
          +
        </button>
        <button
          onClick={handleZoomOut}
          className="w-10 h-10 bg-white rounded-lg shadow-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors text-slate-700 font-bold text-xl"
          title="Zoom Out"
        >
          −
        </button>
        <button
          onClick={handleMyLocation}
          className="w-10 h-10 bg-white rounded-lg shadow-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors text-slate-700"
          title="Minha Localização"
        >
          <MapPin size={20} />
        </button>
      </div>

      {/* Draw Button - Redesenhado */}
      {showDrawTools && (
        <>
          <div className="absolute top-4 left-4 flex gap-2">
            {!drawingMode ? (
              <button
                onClick={() => setDrawingMode('polygon')}
                className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl shadow-lg border border-slate-200 font-semibold text-slate-700 hover:bg-slate-50 transition-all hover:scale-105"
              >
                <Pencil size={18} />
                <span>Desenhar Área</span>
              </button>
            ) : (
              <>
                {/* Drawing Tools - Mais compactos */}
                <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-1.5 flex items-center gap-1.5">
                  <button
                    onClick={() => setDrawingMode('freehand')}
                    className={`p-2 rounded-lg transition-all ${
                      drawingMode === 'freehand'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'hover:bg-slate-100 text-slate-600'
                    }`}
                    title="Desenhar Livre (Mouse)"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => setDrawingMode('polygon')}
                    className={`p-2 rounded-lg transition-all ${
                      drawingMode === 'polygon'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'hover:bg-slate-100 text-slate-600'
                    }`}
                    title="Polígono (Cliques)"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                      <path d="M2 17l10 5 10-5"/>
                      <path d="M2 12l10 5 10-5"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => setDrawingMode('rectangle')}
                    className={`p-2 rounded-lg transition-all ${
                      drawingMode === 'rectangle'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'hover:bg-slate-100 text-slate-600'
                    }`}
                    title="Retângulo"
                  >
                    <Square size={18} />
                  </button>
                  <button
                    onClick={() => setDrawingMode('circle')}
                    className={`p-2 rounded-lg transition-all ${
                      drawingMode === 'circle'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'hover:bg-slate-100 text-slate-600'
                    }`}
                    title="Círculo"
                  >
                    <CircleIcon size={18} />
                  </button>
                  
                  {/* Divider */}
                  <div className="w-px h-6 bg-slate-200"></div>
                  
                  {/* Botão Limpar */}
                  {drawnShapes.length > 0 && (
                    <button
                      onClick={clearDrawing}
                      className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-all hover:scale-110"
                      title="Limpar Desenhos"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                  
                  {/* Botão Cancelar */}
                  <button
                    onClick={() => setDrawingMode(null)}
                    className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-all"
                    title="Cancelar"
                  >
                    <X size={18} />
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Clear Boundary Button */}
          {drawnShapes.length > 0 && !drawingMode && (
            <div className="absolute top-4 left-4">
              <button
                onClick={clearDrawing}
                className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl shadow-lg border border-slate-200 font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <X size={18} />
                <span>Clear Boundary</span>
              </button>
            </div>
          )}
        </>
      )}

      {/* Layers Button - Redesenhado */}
      {showLayers && (
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setShowLayersPanel(!showLayersPanel)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl shadow-lg border border-slate-200 font-semibold text-slate-700 hover:bg-slate-50 transition-all hover:scale-105"
          >
            <Layers size={18} />
            <span>Camadas</span>
          </button>
        </div>
      )}

      {/* Layers Panel - Simplificado */}
      {showLayers && showLayersPanel && (
        <div className="absolute top-20 right-4 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          <div className="p-5">
            <h3 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
              <Layers size={20} className="text-blue-600" />
              Camadas do Mapa
            </h3>

            {/* Map Style */}
            <div className="mb-5">
              <h4 className="text-sm font-semibold text-slate-700 mb-3">Estilo do Mapa</h4>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setMapType('roadmap')}
                  className={`flex flex-col items-center gap-2 p-2.5 rounded-xl border-2 transition-all hover:scale-105 ${
                    mapType === 'roadmap'
                      ? 'border-blue-600 bg-blue-50 shadow-md'
                      : 'border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <div className="w-14 h-14 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-2xl">
                    🗺️
                  </div>
                  <span className="text-xs font-semibold text-slate-700">Ruas</span>
                </button>

                <button
                  onClick={() => setMapType('terrain')}
                  className={`flex flex-col items-center gap-2 p-2.5 rounded-xl border-2 transition-all hover:scale-105 ${
                    mapType === 'terrain'
                      ? 'border-blue-600 bg-blue-50 shadow-md'
                      : 'border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <div className="w-14 h-14 rounded-lg bg-green-100 border border-slate-200 flex items-center justify-center text-2xl">
                    🏞️
                  </div>
                  <span className="text-xs font-semibold text-slate-700">Terreno</span>
                </button>

                <button
                  onClick={() => setMapType('satellite')}
                  className={`flex flex-col items-center gap-2 p-2.5 rounded-xl border-2 transition-all hover:scale-105 ${
                    mapType === 'satellite'
                      ? 'border-blue-600 bg-blue-50 shadow-md'
                      : 'border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <div className="w-14 h-14 rounded-lg bg-slate-700 border border-slate-200 flex items-center justify-center text-2xl">
                    🛰️
                  </div>
                  <span className="text-xs font-semibold text-slate-700">Satélite</span>
                </button>
              </div>
            </div>

            {/* Botão Fechar */}
            <button
              onClick={() => setShowLayersPanel(false)}
              className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-md"
            >
              Aplicar
            </button>
          </div>
        </div>
      )}

      {/* Drawing Hint - Melhorado */}
      {drawingMode && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-2xl flex items-center gap-2 animate-pulse">
          <Pencil size={16} />
          <span>
            {drawingMode === 'freehand' 
              ? 'Clique e arraste o mouse para desenhar' 
              : 'Clique no mapa para desenhar a área'}
          </span>
        </div>
      )}

      {/* Property Count Badge - Redesenhado */}
      {properties.length > 0 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-xl border border-slate-200 px-5 py-2.5">
          <p className="text-sm font-bold text-blue-700 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            {properties.length} {properties.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
          </p>
        </div>
      )}
    </div>
  );
}
