import { useState, useCallback, useRef } from 'react';
import { GoogleMap, useLoadScript, Marker, DrawingManager, Polygon } from '@react-google-maps/api';
import { Layers, Pencil, X, Square, Circle as CircleIcon, Trash2 } from 'lucide-react';

const libraries = ['drawing', 'places'];

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

export default function MapView({ properties = [], onPropertyClick }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries,
  });

  const [mapType, setMapType] = useState('roadmap'); // roadmap, satellite, terrain
  const [showLayersPanel, setShowLayersPanel] = useState(false);
  const [drawingMode, setDrawingMode] = useState(null); // null, 'polygon', 'rectangle', 'circle'
  const [drawnShapes, setDrawnShapes] = useState([]);
  const [showNeighborhoods, setShowNeighborhoods] = useState(false);
  const [showSchools, setShowSchools] = useState(false);
  const [schoolFilters, setSchoolFilters] = useState({
    elementary: false,
    middle: false,
    high: false,
    public: false,
    private: false,
    charter: false,
  });

  const mapRef = useRef(null);

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const handleOverlayComplete = useCallback((overlay) => {
    const newShape = {
      id: Date.now(),
      type: overlay.type,
      overlay: overlay.overlay,
    };
    setDrawnShapes(prev => [...prev, newShape]);
    setDrawingMode(null);
  }, []);

  const clearDrawing = () => {
    drawnShapes.forEach(shape => {
      if (shape.overlay) {
        shape.overlay.setMap(null);
      }
    });
    setDrawnShapes([]);
  };

  const deleteShape = (shapeId) => {
    const shape = drawnShapes.find(s => s.id === shapeId);
    if (shape && shape.overlay) {
      shape.overlay.setMap(null);
    }
    setDrawnShapes(prev => prev.filter(s => s.id !== shapeId));
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
    <div className="relative h-full">
      {/* Map */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={12}
        onLoad={onMapLoad}
        mapTypeId={mapType}
        options={{
          styles: mapStyles[mapType] || [],
          zoomControl: false, // Desabilitar controle nativo
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        }}
      >
        {/* Property Markers */}
        {properties.map((property) => (
          property.latitude && property.longitude ? (
            <Marker
              key={property.id}
              position={{
                lat: parseFloat(property.latitude),
                lng: parseFloat(property.longitude),
              }}
              onClick={() => onPropertyClick && onPropertyClick(property)}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                fillColor: '#059669',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 2,
                scale: 10,
              }}
            />
          ) : null
        ))}

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
                fillColor: '#059669',
                fillOpacity: 0.2,
                strokeColor: '#059669',
                strokeWeight: 2,
                editable: true,
                draggable: true,
              },
              rectangleOptions: {
                fillColor: '#059669',
                fillOpacity: 0.2,
                strokeColor: '#059669',
                strokeWeight: 2,
                editable: true,
                draggable: true,
              },
              circleOptions: {
                fillColor: '#059669',
                fillOpacity: 0.2,
                strokeColor: '#059669',
                strokeWeight: 2,
                editable: true,
                draggable: true,
              },
            }}
          />
        )}
      </GoogleMap>

      {/* Draw Button */}
      <div className="absolute top-4 left-4 flex gap-2">
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
          <button
            onClick={() => setDrawingMode(drawingMode ? null : 'polygon')}
            className={`flex items-center gap-2 px-4 py-2.5 font-medium transition-colors ${
              drawingMode
                ? 'bg-emerald-600 text-white'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Pencil size={18} />
            <span>{drawingMode ? 'Parar de Desenhar' : 'Draw'}</span>
          </button>
        </div>

        {/* Drawing Tools */}
        {drawingMode && (
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-2 flex gap-2">
            <button
              onClick={() => setDrawingMode('polygon')}
              className={`p-2 rounded-lg transition-colors ${
                drawingMode === 'polygon'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'hover:bg-slate-100 text-slate-600'
              }`}
              title="Desenhar Polígono"
            >
              <Pencil size={18} />
            </button>
            <button
              onClick={() => setDrawingMode('rectangle')}
              className={`p-2 rounded-lg transition-colors ${
                drawingMode === 'rectangle'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'hover:bg-slate-100 text-slate-600'
              }`}
              title="Desenhar Retângulo"
            >
              <Square size={18} />
            </button>
            <button
              onClick={() => setDrawingMode('circle')}
              className={`p-2 rounded-lg transition-colors ${
                drawingMode === 'circle'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'hover:bg-slate-100 text-slate-600'
              }`}
              title="Desenhar Círculo"
            >
              <CircleIcon size={18} />
            </button>
            {drawnShapes.length > 0 && (
              <button
                onClick={clearDrawing}
                className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                title="Limpar Desenhos"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
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

      {/* Layers Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setShowLayersPanel(!showLayersPanel)}
          className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl shadow-lg border border-slate-200 font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <Layers size={18} />
          <span>Layers</span>
        </button>
      </div>

      {/* Layers Panel */}
      {showLayersPanel && (
        <div className="absolute top-20 right-4 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Layers</h3>

            {/* Map Style */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-slate-700 mb-3">Map Style</h4>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setMapType('roadmap')}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                    mapType === 'roadmap'
                      ? 'border-emerald-600 bg-emerald-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="w-16 h-16 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                    <div className="text-xs text-center">
                      🗺️
                    </div>
                  </div>
                  <span className="text-xs font-medium text-slate-700">Street</span>
                </button>

                <button
                  onClick={() => setMapType('terrain')}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                    mapType === 'terrain'
                      ? 'border-emerald-600 bg-emerald-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="w-16 h-16 rounded-lg bg-green-100 border border-slate-200 flex items-center justify-center">
                    <div className="text-xs text-center">
                      🏞️
                    </div>
                  </div>
                  <span className="text-xs font-medium text-slate-700">Data</span>
                </button>

                <button
                  onClick={() => setMapType('satellite')}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                    mapType === 'satellite'
                      ? 'border-emerald-600 bg-emerald-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="w-16 h-16 rounded-lg bg-slate-700 border border-slate-200 flex items-center justify-center">
                    <div className="text-xs text-center text-white">
                      🛰️
                    </div>
                  </div>
                  <span className="text-xs font-medium text-slate-700">Satellite</span>
                </button>
              </div>
            </div>

            {/* Neighborhoods Toggle */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-slate-700">Neighborhoods</h4>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showNeighborhoods}
                    onChange={(e) => setShowNeighborhoods(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
            </div>

            {/* Schools Toggle */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-slate-700">Schools</h4>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showSchools}
                    onChange={(e) => setShowSchools(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              {showSchools && (
                <div className="space-y-3 pl-2 border-l-2 border-slate-200 ml-2">
                  {/* School Level */}
                  <div className="flex flex-wrap gap-2">
                    {['Elementary', 'Middle', 'High'].map((level) => (
                      <button
                        key={level}
                        onClick={() => setSchoolFilters(prev => ({
                          ...prev,
                          [level.toLowerCase()]: !prev[level.toLowerCase()]
                        }))}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          schoolFilters[level.toLowerCase()]
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>

                  {/* School Type */}
                  <div className="flex flex-wrap gap-2">
                    {['Public', 'Private', 'Charter'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setSchoolFilters(prev => ({
                          ...prev,
                          [type.toLowerCase()]: !prev[type.toLowerCase()]
                        }))}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          schoolFilters[type.toLowerCase()]
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Clear All Button */}
            <button
              onClick={() => {
                setShowNeighborhoods(false);
                setShowSchools(false);
                setSchoolFilters({
                  elementary: false,
                  middle: false,
                  high: false,
                  public: false,
                  private: false,
                  charter: false,
                });
              }}
              className="w-full px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"
            >
              Clear All
            </button>

            {/* Done Button */}
            <button
              onClick={() => setShowLayersPanel(false)}
              className="w-full mt-3 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Zoom Controls */}
      <div className="absolute bottom-6 right-4 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <button
          onClick={() => mapRef.current?.setZoom((mapRef.current?.getZoom() || 12) + 1)}
          className="block px-4 py-3 hover:bg-slate-50 transition-colors text-slate-700 font-bold text-lg border-b border-slate-200"
        >
          +
        </button>
        <button
          onClick={() => mapRef.current?.setZoom((mapRef.current?.getZoom() || 12) - 1)}
          className="block px-4 py-3 hover:bg-slate-50 transition-colors text-slate-700 font-bold text-lg"
        >
          −
        </button>
      </div>

      {/* Tooltip */}
      {drawingMode && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm shadow-lg">
          Clique no mapa para desenhar
        </div>
      )}
    </div>
  );
}
