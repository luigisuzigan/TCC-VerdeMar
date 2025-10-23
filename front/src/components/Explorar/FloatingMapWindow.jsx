import { useState, useRef, useEffect } from 'react';
import { X, Maximize2, Minimize2, Move, MapPin } from 'lucide-react';
import InteractiveMap from './InteractiveMap';

export default function FloatingMapWindow({ 
  onApply, 
  initialSearchText = '', 
  initialBoundary = null,
  allProperties = []
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [reloadKey, setReloadKey] = useState(0);
  
  const [searchText, setSearchText] = useState(initialSearchText);
  const [drawnBoundary, setDrawnBoundary] = useState(initialBoundary);
  const [filteredProperties, setFilteredProperties] = useState([]);

  const windowRef = useRef(null);
  const headerRef = useRef(null);

  // Tamanho da janela
  const normalSize = { width: 600, height: 500 };

  // Atualizar estados iniciais quando props mudarem
  useEffect(() => {
    setSearchText(initialSearchText);
    setDrawnBoundary(initialBoundary);
  }, [initialSearchText, initialBoundary]);

  // Handlers de arrasto
  const handleMouseDown = (e) => {
    if (isMaximized) return; // Não permite arrastar quando maximizado
    
    const rect = windowRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || isMaximized) return;

    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;

    // Limitar para não sair da tela
    const maxX = window.innerWidth - normalSize.width;
    const maxY = window.innerHeight - normalSize.height;

    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  // Handlers do mapa
  const handleBoundaryChange = (boundary, properties) => {
    setDrawnBoundary(boundary);
    setFilteredProperties(properties);
  };

  const handleApply = () => {
    const propertyIds = filteredProperties.map(p => p.id);
    onApply(searchText, propertyIds);
    
    // Se não tiver desenho, fecha a janela
    if (!drawnBoundary) {
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    setSearchText('');
    setDrawnBoundary(null);
    setFilteredProperties([]);
    setReloadKey(prev => prev + 1);
    onApply('', []);
    setIsOpen(false);
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // Estilos da janela
  const windowStyle = isMaximized 
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999
      }
    : {
        position: 'fixed',
        top: position.y,
        left: position.x,
        width: normalSize.width,
        height: normalSize.height,
        zIndex: 9999
      };

  return (
    <>
      {/* Botão flutuante inferior */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 
                     bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 
                     rounded-full shadow-2xl flex items-center gap-3 
                     transition-all duration-300 hover:scale-105 
                     border-2 border-blue-400"
        >
          <MapPin className="w-5 h-5" />
          <span className="font-semibold text-lg">Abrir Mapa</span>
        </button>
      )}

      {/* Janela flutuante */}
      {isOpen && (
        <div
          ref={windowRef}
          style={windowStyle}
          className="bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header arrastável */}
          <div
            ref={headerRef}
            onMouseDown={handleMouseDown}
            className={`bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 flex items-center justify-between ${
              !isMaximized ? 'cursor-move' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              {!isMaximized && <Move className="w-5 h-5 opacity-70" />}
              <MapPin className="w-5 h-5" />
              <h3 className="font-bold text-lg">Buscar no Mapa</h3>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Botão Maximizar/Restaurar */}
              <button
                onClick={toggleMaximize}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                title={isMaximized ? "Restaurar" : "Maximizar"}
              >
                {isMaximized ? (
                  <Minimize2 className="w-5 h-5" />
                ) : (
                  <Maximize2 className="w-5 h-5" />
                )}
              </button>

              {/* Botão Fechar */}
              <button
                onClick={handleClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                title="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Campo de busca */}
          <div className="p-4 border-b">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Digite uma cidade, bairro ou endereço..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-600 mt-2">
              💡 Use as ferramentas de desenho no mapa para delimitar uma área
            </p>
          </div>

          {/* Mapa */}
          <div className="flex-1 relative">
            <InteractiveMap
              key={reloadKey}
              searchText={searchText}
              onBoundaryChange={handleBoundaryChange}
              initialBoundary={drawnBoundary}
              properties={allProperties}
            />
          </div>

          {/* Footer com botões de ação */}
          <div className="p-4 border-t bg-gray-50 flex justify-between items-center gap-3">
            <button
              onClick={handleClear}
              className="px-6 py-2.5 border-2 border-gray-300 rounded-lg 
                       hover:bg-gray-100 transition-colors font-medium"
            >
              Limpar
            </button>

            <div className="flex items-center gap-3">
              {drawnBoundary && filteredProperties.length > 0 && (
                <span className="text-sm text-gray-600">
                  {filteredProperties.length} imóve{filteredProperties.length === 1 ? 'l' : 'is'} encontrado{filteredProperties.length === 1 ? '' : 's'}
                </span>
              )}
              
              <button
                onClick={handleApply}
                className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white 
                         rounded-lg font-semibold transition-colors shadow-md 
                         hover:shadow-lg"
              >
                Aplicar Filtro
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Overlay quando maximizado */}
      {isOpen && isMaximized && (
        <div className="fixed inset-0 bg-black/50 z-[9998]" />
      )}
    </>
  );
}
