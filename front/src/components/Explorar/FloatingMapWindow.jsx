import { useState, useRef, useEffect } from 'react';
import { X, Move, MapPin } from 'lucide-react';
import InteractiveMap from './InteractiveMap';

export default function FloatingMapWindow({ 
  onApply, 
  initialSearchText = '', 
  initialBoundary = null,
  allProperties = []
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 800, height: 600 }); // Tamanho inicial maior
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [reloadKey, setReloadKey] = useState(0);
  
  const [drawnBoundary, setDrawnBoundary] = useState(initialBoundary);
  const [filteredProperties, setFilteredProperties] = useState([]);

  const windowRef = useRef(null);
  const headerRef = useRef(null);

  // Tamanho mínimo da janela
  const minSize = { width: 400, height: 300 };

  // Debug: Log das propriedades recebidas
  useEffect(() => {
    console.log('🗺️ FloatingMapWindow - Total de propriedades recebidas:', allProperties.length);
  }, [allProperties]);

  // Atualizar estados iniciais quando props mudarem
  useEffect(() => {
    setDrawnBoundary(initialBoundary);
  }, [initialBoundary]);

  // === DRAG HANDLERS ===
  const handleDragStart = (e) => {
    const rect = windowRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsDragging(true);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;

    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;

    // Limitar para não sair da tela
    const maxX = window.innerWidth - size.width;
    const maxY = window.innerHeight - size.height;

    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // === RESIZE HANDLERS ===
  const handleResizeStart = (e, direction) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
    setDragOffset({ x: e.clientX, y: e.clientY });
  };

  const handleResizeMove = (e) => {
    if (!isResizing || !resizeDirection) return;

    const deltaX = e.clientX - dragOffset.x;
    const deltaY = e.clientY - dragOffset.y;

    setSize(prevSize => {
      let newWidth = prevSize.width;
      let newHeight = prevSize.height;
      let newX = position.x;
      let newY = position.y;

      // Resize horizontal
      if (resizeDirection.includes('e')) {
        newWidth = Math.max(minSize.width, prevSize.width + deltaX);
      }
      if (resizeDirection.includes('w')) {
        const widthChange = Math.max(minSize.width, prevSize.width - deltaX);
        if (widthChange >= minSize.width) {
          newWidth = widthChange;
          newX = position.x + deltaX;
        }
      }

      // Resize vertical
      if (resizeDirection.includes('s')) {
        newHeight = Math.max(minSize.height, prevSize.height + deltaY);
      }
      if (resizeDirection.includes('n')) {
        const heightChange = Math.max(minSize.height, prevSize.height - deltaY);
        if (heightChange >= minSize.height) {
          newHeight = heightChange;
          newY = position.y + deltaY;
        }
      }

      // Atualizar posição se redimensionar pelos cantos/lados esquerdo ou superior
      if (newX !== position.x || newY !== position.y) {
        setPosition({ x: newX, y: newY });
      }

      return { width: newWidth, height: newHeight };
    });

    setDragOffset({ x: e.clientX, y: e.clientY });
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
    setResizeDirection(null);
  };

  // === MOUSE EVENTS ===
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      return () => {
        window.removeEventListener('mousemove', handleDragMove);
        window.removeEventListener('mouseup', handleDragEnd);
      };
    }
  }, [isDragging, dragOffset, size]);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleResizeMove);
      window.addEventListener('mouseup', handleResizeEnd);
      return () => {
        window.removeEventListener('mousemove', handleResizeMove);
        window.removeEventListener('mouseup', handleResizeEnd);
      };
    }
  }, [isResizing, resizeDirection, dragOffset, position, size]);

  // Handlers do mapa
  const handleBoundaryChange = (boundary, filteredProps) => {
    console.log('=== handleBoundaryChange ===');
    console.log('📍 Boundary:', boundary ? 'Área desenhada' : 'Limpo');
    console.log('📊 Imóveis filtrados:', filteredProps?.length || 0);
    console.log('📦 Total de propriedades disponíveis:', allProperties.length);
    
    if (filteredProps && filteredProps.length > 0) {
      console.log('✅ IDs filtrados:', filteredProps.slice(0, 5).map(p => p.id));
    }
    
    setDrawnBoundary(boundary);
    setFilteredProperties(filteredProps || []);
  };

  const handleApply = () => {
    console.log('=== handleApply CHAMADO ===');
    console.log('📍 Boundary existe?', drawnBoundary ? 'SIM' : 'NÃO');
    console.log('🏠 Propriedades filtradas:', filteredProperties.length);
    
    if (filteredProperties.length === 0) {
      console.warn('⚠️ ATENÇÃO: Nenhum imóvel filtrado para aplicar!');
      alert('Por favor, desenhe uma área no mapa para filtrar os imóveis.');
      return;
    }
    
    // Passar IDs dos imóveis filtrados
    const propertyIds = filteredProperties.map(p => p.id);
    console.log('📤 Enviando IDs:', propertyIds.slice(0, 5), '... (total:', propertyIds.length, ')');
    
    onApply('', propertyIds, drawnBoundary);
    
    setIsOpen(false);
  };

  const handleClear = () => {
    console.log('🧹 Limpando área desenhada');
    setDrawnBoundary(null);
    setFilteredProperties([]);
    setReloadKey(prev => prev + 1);
  };

  const handleClose = () => {
    // Se tiver área desenhada, limpar ao fechar
    if (drawnBoundary) {
      onApply('', [], null);
    }
    setIsOpen(false);
  };

  // Estilos da janela
  const windowStyle = {
    position: 'fixed',
    top: position.y,
    left: position.x,
    width: size.width,
    height: size.height,
    zIndex: 9999,
    cursor: isDragging ? 'grabbing' : 'default'
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

      {/* Janela flutuante redimensionável */}
      {isOpen && (
        <div
          ref={windowRef}
          style={windowStyle}
          className="bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border-2 border-slate-300"
        >
          {/* Mapa - Ocupa tudo */}
          <div className="flex-1 relative">
            <InteractiveMap
              key={reloadKey}
              onBoundaryChange={handleBoundaryChange}
              initialBoundary={drawnBoundary}
              properties={allProperties}
            />

            {/* Botão Fechar (X) - Canto superior direito */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-[1000] bg-white hover:bg-red-50 rounded-lg shadow-lg border border-slate-200 p-2.5 transition-all hover:scale-110 group"
              title="Fechar Mapa"
            >
              <X className="w-5 h-5 text-slate-700 group-hover:text-red-600" />
            </button>

            {/* Header arrastável - Barra sutil no topo */}
            <div
              onMouseDown={handleDragStart}
              className="absolute top-4 left-1/2 -translate-x-1/2 z-[999] bg-white/95 backdrop-blur-sm rounded-full shadow-lg border border-slate-200 px-6 py-2.5 cursor-grab active:cursor-grabbing flex items-center gap-3 hover:bg-white transition-all"
            >
              <Move className="w-4 h-4 text-slate-500" />
              <MapPin className="w-4 h-4 text-blue-600" />
              <span className="font-semibold text-slate-700 text-sm">Mapa Interativo</span>
            </div>

            {/* Badge de Status - Inferior */}
            {drawnBoundary && (
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-[999] flex flex-col items-center gap-2">
                <div className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-xl border-2 border-blue-400 flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>
                  <span className="font-bold text-sm">
                    {filteredProperties.length} {filteredProperties.length === 1 ? 'imóvel' : 'imóveis'} encontrado{filteredProperties.length === 1 ? '' : 's'}
                  </span>
                </div>

                {/* Botões de Ação */}
                <div className="flex gap-2">
                  <button
                    onClick={handleClear}
                    className="bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg shadow-lg border border-slate-200 font-medium text-sm transition-all hover:scale-105"
                  >
                    Limpar Área
                  </button>
                  <button
                    onClick={handleApply}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-lg font-bold text-sm transition-all hover:scale-105"
                  >
                    Aplicar Busca
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Resize Handles - 8 direções */}
          <div
            onMouseDown={(e) => handleResizeStart(e, 'n')}
            className="absolute top-0 left-0 right-0 h-2 cursor-ns-resize hover:bg-blue-200/50 transition-colors"
          />
          <div
            onMouseDown={(e) => handleResizeStart(e, 's')}
            className="absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize hover:bg-blue-200/50 transition-colors"
          />
          <div
            onMouseDown={(e) => handleResizeStart(e, 'w')}
            className="absolute top-0 bottom-0 left-0 w-2 cursor-ew-resize hover:bg-blue-200/50 transition-colors"
          />
          <div
            onMouseDown={(e) => handleResizeStart(e, 'e')}
            className="absolute top-0 bottom-0 right-0 w-2 cursor-ew-resize hover:bg-blue-200/50 transition-colors"
          />
          <div
            onMouseDown={(e) => handleResizeStart(e, 'nw')}
            className="absolute top-0 left-0 w-4 h-4 cursor-nwse-resize hover:bg-blue-300 rounded-tl-xl transition-colors"
          />
          <div
            onMouseDown={(e) => handleResizeStart(e, 'ne')}
            className="absolute top-0 right-0 w-4 h-4 cursor-nesw-resize hover:bg-blue-300 rounded-tr-xl transition-colors"
          />
          <div
            onMouseDown={(e) => handleResizeStart(e, 'sw')}
            className="absolute bottom-0 left-0 w-4 h-4 cursor-nesw-resize hover:bg-blue-300 rounded-bl-xl transition-colors"
          />
          <div
            onMouseDown={(e) => handleResizeStart(e, 'se')}
            className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize hover:bg-blue-300 rounded-br-xl transition-colors"
          />
        </div>
      )}
    </>
  );
}
