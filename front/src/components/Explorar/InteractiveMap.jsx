import { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, useLoadScript, DrawingManager, OverlayView, Marker, InfoWindow } from '@react-google-maps/api';
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
  onClose, // Callback para fechar o mapa
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
  const [googleMapsReady, setGoogleMapsReady] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mapBounds, setMapBounds] = useState(null);

  const mapRef = useRef(null);
  const freehandPolygonRef = useRef(null);
  const markersRef = useRef([]);
  const autocompleteService = useRef(null);
  const boundsUpdateTimer = useRef(null);

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    const zoom = map.getZoom() || 13;
    setCurrentZoom(zoom);
    console.log('🗺️ Mapa carregado! Zoom inicial:', zoom);
    console.log('📊 Propriedades disponíveis no load:', properties.length);
    console.log('✅ isLoaded:', isLoaded);
    console.log('🌐 window.google existe?', !!window.google);
    console.log('🌐 window.google.maps existe?', !!window.google?.maps);
    
    // Marcar Google Maps como pronto
    if (window.google && window.google.maps) {
      setGoogleMapsReady(true);
      console.log('✅ Google Maps marcado como PRONTO!');
      
      // Inicializar serviço de autocomplete
      if (!autocompleteService.current) {
        autocompleteService.current = new window.google.maps.places.AutocompleteService();
        console.log('✅ AutocompleteService inicializado!');
      }
    }
  }, [properties, isLoaded]);

  // Criar marcadores usando API nativa do Google Maps
  useEffect(() => {
    // Verificações rigorosas
    if (!mapRef.current) {
      console.log('⏳ MapRef ainda não existe');
      return;
    }
    
    if (!googleMapsReady) {
      console.log('⏳ Google Maps ainda não está pronto');
      return;
    }
    
    if (!window.google?.maps) {
      console.log('⏳ window.google.maps não está disponível');
      return;
    }

    if (properties.length === 0) {
      console.log('⏳ Nenhuma propriedade para exibir ainda');
      return;
    }

    // Pequeno delay para garantir que o mapa está completamente renderizado
    const timer = setTimeout(() => {
      console.log('🎨 Iniciando criação de marcadores nativos...');
      
      // Limpar marcadores antigos
      if (markersRef.current.length > 0) {
        console.log('🗑️ Removendo', markersRef.current.length, 'marcadores antigos');
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];
      }

      console.log('🎨 Criando marcadores nativos para', properties.length, 'propriedades');

      // Filtrar propriedades válidas
      const validProperties = properties.filter(p => p.latitude && p.longitude);
      console.log('✅', validProperties.length, 'propriedades com coordenadas válidas');

      if (validProperties.length === 0) {
        console.log('❌ Nenhuma propriedade com coordenadas válidas');
        return;
      }

      // Criar marcadores nativos
      validProperties.forEach((property, index) => {
        const position = {
          lat: parseFloat(property.latitude),
          lng: parseFloat(property.longitude)
        };

        console.log(`📍 [${index + 1}/${validProperties.length}] Criando marcador para:`, property.title, position);

        try {
          const marker = new window.google.maps.Marker({
            position: position,
            map: mapRef.current,
            title: property.title,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: '#2563eb',
              fillOpacity: 0.9,
              strokeColor: '#ffffff',
              strokeWeight: 2.5,
              scale: 9,
            },
            optimized: false, // Força renderização não otimizada
            animation: window.google.maps.Animation.DROP, // Animação de queda
          });

          marker.addListener('click', () => {
            console.log('🖱️ Marcador clicado:', property.title);
            handlePropertyClick(property);
          });

          // Efeito hover
          marker.addListener('mouseover', () => {
            marker.setIcon({
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: '#1d4ed8',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 3,
              scale: 11,
            });
          });

          marker.addListener('mouseout', () => {
            marker.setIcon({
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: '#2563eb',
              fillOpacity: 0.9,
              strokeColor: '#ffffff',
              strokeWeight: 2.5,
              scale: 9,
            });
          });

          markersRef.current.push(marker);
          console.log('✅ Marcador criado com sucesso!');
        } catch (error) {
          console.error('❌ Erro ao criar marcador:', error);
        }
      });

      console.log('🎉 Total de marcadores criados:', markersRef.current.length);
    }, 100); // Delay de 100ms

    // Cleanup
    return () => {
      clearTimeout(timer);
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
    };
  }, [properties, googleMapsReady, mapRef.current]);

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

  // Atualizar bounds quando o mapa se mover ou der zoom
  useEffect(() => {
    if (!mapRef.current) return;

    const updateBounds = () => {
      if (mapRef.current) {
        const bounds = mapRef.current.getBounds();
        if (bounds) {
          // Debounce: só atualiza depois de parar de mover por 500ms
          if (boundsUpdateTimer.current) {
            clearTimeout(boundsUpdateTimer.current);
          }

          boundsUpdateTimer.current = setTimeout(() => {
            setMapBounds(bounds);
            console.log('🗺️ Bounds do mapa atualizados:', {
              north: bounds.getNorthEast().lat(),
              south: bounds.getSouthWest().lat(),
              east: bounds.getNorthEast().lng(),
              west: bounds.getSouthWest().lng()
            });

            // Se houver callback e NÃO houver desenho ativo, notificar mudança de área
            if (onBoundaryChange && drawnShapes.length === 0) {
              const visibleProperties = filterPropertiesByMapBounds(bounds, properties);
              console.log('🔍 Imóveis visíveis na área:', visibleProperties.length);
              onBoundaryChange(null, visibleProperties);
            }
          }, 500);
        }
      }
    };

    // Listeners para movimento e zoom
    const dragEndListener = mapRef.current.addListener('dragend', updateBounds);
    const zoomChangedListener = mapRef.current.addListener('zoom_changed', updateBounds);
    const boundsChangedListener = mapRef.current.addListener('bounds_changed', updateBounds);

    // Atualizar bounds inicial
    updateBounds();

    return () => {
      if (window.google?.maps?.event) {
        window.google.maps.event.removeListener(dragEndListener);
        window.google.maps.event.removeListener(zoomChangedListener);
        window.google.maps.event.removeListener(boundsChangedListener);
      }
      if (boundsUpdateTimer.current) {
        clearTimeout(boundsUpdateTimer.current);
      }
    };
  }, [properties, drawnShapes, onBoundaryChange]);

  // Filtrar propriedades pela área visível do mapa
  const filterPropertiesByMapBounds = (bounds, allProperties) => {
    if (!bounds) return allProperties;

    return allProperties.filter(property => {
      if (!property.latitude || !property.longitude) return false;

      const lat = parseFloat(property.latitude);
      const lng = parseFloat(property.longitude);

      const ne = bounds.getNorthEast();
      const sw = bounds.getSouthWest();

      return lat <= ne.lat() && lat >= sw.lat() && lng <= ne.lng() && lng >= sw.lng();
    });
  };

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
    
    // Filtrar imóveis dentro da área desenhada (prioridade sobre bounds do mapa)
    const filteredProps = filterPropertiesByBoundary(overlay.overlay, properties);
    console.log('🎯 Desenho criado - Filtrados:', filteredProps.length, 'de', properties.length);
    
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
    
    // Ao limpar desenho, voltar para filtro por área visível do mapa
    if (onBoundaryChange && mapBounds) {
      const visibleProperties = filterPropertiesByMapBounds(mapBounds, properties);
      console.log('🧹 Desenho limpo - Voltando para área visível:', visibleProperties.length, 'imóveis');
      onBoundaryChange(null, visibleProperties);
    } else if (onBoundaryChange) {
      onBoundaryChange(null, properties); // Retorna todos os imóveis
    }
  }, [drawnShapes, onBoundaryChange, properties, mapBounds]);

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
        
        // Filtrar imóveis (prioridade sobre bounds do mapa)
        const filteredProps = filterPropertiesByBoundary(freehandPolygonRef.current, properties);
        console.log('🎯 Freehand criado - Filtrados:', filteredProps.length, 'de', properties.length);
        
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

  // Função para buscar sugestões de endereços
  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (!value.trim() || value.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // Buscar sugestões com o serviço de autocomplete
    if (autocompleteService.current) {
      autocompleteService.current.getPlacePredictions(
        {
          input: value,
          componentRestrictions: { country: 'br' }, // Restringir ao Brasil
        },
        (predictions, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
            setSuggestions(predictions);
            setShowSuggestions(true);
          } else {
            setSuggestions([]);
            setShowSuggestions(false);
          }
        }
      );
    }
  };

  // Função para selecionar uma sugestão
  const handleSelectSuggestion = (suggestion) => {
    setSearchQuery(suggestion.description);
    setShowSuggestions(false);
    setSuggestions([]);

    // Geocodificar a sugestão selecionada
    if (!mapRef.current || !window.google) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ placeId: suggestion.place_id }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const location = results[0].geometry.location;
        mapRef.current.panTo(location);
        mapRef.current.setZoom(15);
      }
    });
  };

  // Função para buscar endereço ao submeter o form
  const handleSearchAddress = (e) => {
    e.preventDefault();
    if (!searchQuery.trim() || !mapRef.current || !window.google) return;

    setShowSuggestions(false);

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: searchQuery }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const location = results[0].geometry.location;
        mapRef.current.panTo(location);
        mapRef.current.setZoom(15);
      } else {
        alert('Endereço não encontrado. Tente novamente.');
      }
    });
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
          fullscreenControlOptions: {
            position: window.google?.maps?.ControlPosition?.TOP_RIGHT, // Posicionar fullscreen no canto direito
          },
          gestureHandling: drawingMode === 'freehand' ? 'none' : 'greedy', // Bloquear drag quando desenhando
          draggableCursor: drawingMode === 'freehand' ? 'crosshair' : 'grab',
          draggingCursor: drawingMode === 'freehand' ? 'crosshair' : 'grabbing',
        }}
      >
        {/* Marcadores agora são criados via useEffect com API nativa */}

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

      {/* Controles de Zoom Customizados e Botão Fechar abaixo do Fullscreen */}
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

      {/* Botão Fechar - Abaixo do botão de Fullscreen (canto superior direito) */}
      {onClose && (
        <div className="absolute top-16 right-4">
          <button
            onClick={onClose}
            className="w-10 h-10 bg-white rounded-xl shadow-lg border border-slate-200 flex items-center justify-center hover:bg-red-50 hover:border-red-300 transition-all text-slate-700 hover:text-red-600"
            title="Fechar Mapa"
          >
            <X size={20} />
          </button>
        </div>
      )}

      {/* Draw Button - Redesenhado */}
      {showDrawTools && (
        <>
          <div className="absolute top-4 left-4 flex gap-2">
            {!drawingMode && drawnShapes.length === 0 ? (
              <button
                onClick={() => setDrawingMode('polygon')}
                className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl shadow-lg border border-slate-200 font-semibold text-slate-700 hover:bg-slate-50 transition-all hover:scale-105"
              >
                <Pencil size={18} />
                <span>Desenhar Área</span>
              </button>
            ) : drawingMode ? (
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
                  
                  {/* Botão Cancelar Desenho */}
                  <button
                    onClick={() => setDrawingMode(null)}
                    className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-all"
                    title="Cancelar"
                  >
                    <X size={18} />
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </>
      )}

      {/* Layers Button - Redesenhado - Posicionado ao lado do fullscreen */}
      {showLayers && (
        <div className="absolute top-4 right-16">
          <button
            onClick={() => setShowLayersPanel(!showLayersPanel)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl shadow-lg border border-slate-200 font-semibold text-slate-700 hover:bg-slate-50 transition-all hover:scale-105"
          >
            <Layers size={18} />
            <span>Camadas</span>
          </button>
        </div>
      )}

      {/* Layers Panel - Simplificado - Posicionado abaixo do botão de fullscreen */}
      {showLayers && showLayersPanel && (
        <div className="absolute top-16 right-4 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
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

      {/* Property Count Badge - Canto Inferior Esquerdo */}
      {properties.length > 0 && (
        <div className="absolute bottom-6 left-6 bg-white rounded-full shadow-xl border border-slate-200 px-5 py-2.5">
          <p className="text-sm font-bold text-blue-700 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            {properties.length} {properties.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
          </p>
        </div>
      )}

      {/* Barra de Pesquisa - Centro Inferior (onde estava o contador) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        <div className="relative">
          <form onSubmit={handleSearchAddress} className="flex items-center bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              placeholder="Buscar por endereço, cidade, CEP, bairro..."
              className="px-4 py-2.5 text-sm font-medium text-slate-700 focus:outline-none w-80"
              autoComplete="off"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              title="Buscar"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
          </form>

          {/* Dropdown de Sugestões */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute bottom-full mb-2 w-full bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden max-h-64 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <button
                  key={suggestion.place_id}
                  onClick={() => handleSelectSuggestion(suggestion)}
                  className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors border-b border-slate-100 last:border-b-0 flex items-start gap-3"
                >
                  <svg 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    className="text-blue-600 flex-shrink-0 mt-0.5"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {suggestion.structured_formatting.main_text}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {suggestion.structured_formatting.secondary_text}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Botão Fechar - Ao lado da busca */}
        {onClose && (
          <button
            onClick={onClose}
            className="w-10 h-10 bg-white rounded-xl shadow-lg border border-slate-200 flex items-center justify-center hover:bg-red-50 hover:border-red-300 transition-all text-slate-700 hover:text-red-600"
            title="Fechar Mapa"
          >
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
