import { Dialog } from '@headlessui/react';
import { X, Maximize2, Ruler, Sparkles } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const QUICK_OPTIONS_TOTAL = [
  { label: '200m²', value: 200 },
  { label: '300m²', value: 300 },
  { label: '500m²', value: 500 },
  { label: '1000m²', value: 1000 },
  { label: '2000m²', value: 2000 },
];

export default function AreaModal({ isOpen, onClose, filters, onApply }) {
  // Área Total do Terreno
  const [totalAreaMin, setTotalAreaMin] = useState(filters.totalAreaMin || 0);
  const [totalAreaMax, setTotalAreaMax] = useState(filters.totalAreaMax || 1000);
  const [isDraggingTotalMin, setIsDraggingTotalMin] = useState(false);
  const [isDraggingTotalMax, setIsDraggingTotalMax] = useState(false);
  const totalSliderRef = useRef(null);

  // Ranges dinâmicos
  const getTotalAreaRange = () => {
    const currentMin = Math.min(totalAreaMin, totalAreaMax);
    const currentMax = Math.max(totalAreaMin, totalAreaMax);
    if (currentMax === 0) return { min: 0, max: 1000 };
    const range = currentMax - currentMin;
    const padding = Math.max(range * 0.3, 200);
    return { min: Math.max(0, currentMin - padding), max: currentMax + padding };
  };

  const totalRange = getTotalAreaRange();
  const TOTAL_MIN = totalRange.min;
  const TOTAL_MAX = totalRange.max;
  const TOTAL_STEP = Math.max(10, Math.round((TOTAL_MAX - TOTAL_MIN) / 100));

  // Sincronizar com filters
  useEffect(() => {
    setTotalAreaMin(filters.totalAreaMin || 0);
    setTotalAreaMax(filters.totalAreaMax || 1000);
  }, [filters.totalAreaMin, filters.totalAreaMax]);

  useEffect(() => {
    if (isOpen) {
      setTotalAreaMin(filters.totalAreaMin || 0);
      setTotalAreaMax(filters.totalAreaMax || 1000);
    }
  }, [isOpen, filters]);

  // Handlers para Área Total
  const handleTotalSliderInteraction = (e, type) => {
    if (!totalSliderRef.current) return;
    const rect = totalSliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = x / rect.width;
    const value = Math.round((TOTAL_MIN + percentage * (TOTAL_MAX - TOTAL_MIN)) / TOTAL_STEP) * TOTAL_STEP;
    if (type === 'min') setTotalAreaMin(Math.min(value, totalAreaMax - TOTAL_STEP));
    else setTotalAreaMax(Math.max(value, totalAreaMin + TOTAL_STEP));
  };

  const handleMouseDown = (type) => {
    if (type === 'min') setIsDraggingTotalMin(true);
    else setIsDraggingTotalMax(true);
  };

  const handleMouseUp = () => {
    setIsDraggingTotalMin(false);
    setIsDraggingTotalMax(false);
  };

  const handleMouseMove = (e) => {
    if (isDraggingTotalMin) handleTotalSliderInteraction(e, 'min');
    if (isDraggingTotalMax) handleTotalSliderInteraction(e, 'max');
  };

  useEffect(() => {
    if (isDraggingTotalMin || isDraggingTotalMax) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDraggingTotalMin, isDraggingTotalMax, totalAreaMin, totalAreaMax]);

  const handleApply = () => {
    const result = {};
    if (totalAreaMin > 0) result.totalAreaMin = totalAreaMin;
    if (totalAreaMax > 0) result.totalAreaMax = totalAreaMax;
    onApply(result);
    onClose();
  };

  const handleReset = () => {
    setTotalAreaMin(0);
    setTotalAreaMax(1000);
  };

  const formatArea = (value) => {
    if (!value || value === 0) return 'Mín';
    return `${value}m²`;
  };

  const formatInput = (value) => {
    if (!value || value === 0) return '';
    return value.toString();
  };

  const handleTotalMinChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    // Permite apagar completamente (valor vazio = 0)
    if (value === '') {
      setTotalAreaMin(0);
    } else {
      const numValue = parseInt(value);
      setTotalAreaMin(numValue);
    }
  };

  const handleTotalMaxChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    // Permite apagar completamente (valor vazio = 0)
    if (value === '') {
      setTotalAreaMax(0);
    } else {
      const numValue = parseInt(value);
      setTotalAreaMax(numValue);
    }
  };

  const totalMinPercentage = ((totalAreaMin - TOTAL_MIN) / (TOTAL_MAX - TOTAL_MIN)) * 100;
  const totalMaxPercentage = ((totalAreaMax - TOTAL_MIN) / (TOTAL_MAX - TOTAL_MIN)) * 100;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
          {/* Header Vibrante */}
          <div className="relative bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 px-6 py-4 overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white rounded-full blur-3xl animate-pulse"></div>
            </div>
            
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/40 shadow-lg">
                  <Maximize2 className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <Dialog.Title className="text-lg font-bold text-white drop-shadow-md flex items-center gap-2">
                    Área do Terreno
                    <Sparkles size={16} className="text-blue-200" />
                  </Dialog.Title>
                  <p className="text-blue-50 text-xs mt-0.5">Defina o tamanho total do lote desejado</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-white/90 hover:text-white hover:bg-white/20 rounded-lg transition-all backdrop-blur-sm"
              >
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            
            {/* ÁREA TOTAL DO TERRENO */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg">
                  <Ruler size={18} className="text-white" strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-slate-900">Tamanho do Lote</h3>
                  <p className="text-xs text-slate-500">Área total do terreno em m²</p>
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                  {formatArea(totalAreaMin)} - {formatArea(totalAreaMax)}
                </span>
              </div>

              {/* Info do range */}
              <div className="text-xs text-slate-500 mb-2 text-center">
                Range: {formatArea(TOTAL_MIN)} a {formatArea(TOTAL_MAX)}
              </div>

              {/* Slider */}
              <div className="relative pt-2 pb-8 px-6" ref={totalSliderRef}>
                <div className="absolute top-6 left-0 right-0 h-2 bg-slate-200 rounded-full"></div>
                <div 
                  className="absolute top-6 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-md"
                  style={{
                    left: `${totalMinPercentage}%`,
                    right: `${100 - totalMaxPercentage}%`,
                  }}
                ></div>

                {/* Handle Mínimo */}
                <div
                  className="absolute top-3 -ml-5 cursor-pointer group"
                  style={{ left: `${totalMinPercentage}%` }}
                  onMouseDown={() => handleMouseDown('min')}
                >
                  <div className={`w-10 h-10 bg-white border-4 border-green-500 rounded-full shadow-xl transition-all ${
                    isDraggingTotalMin ? 'scale-125 shadow-2xl' : 'group-hover:scale-110'
                  }`}>
                    <div className="w-full h-full bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-20"></div>
                  </div>
                  <div className={`absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg shadow-lg transition-opacity ${
                    isDraggingTotalMin ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}>
                    {formatArea(totalAreaMin)}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
                  </div>
                </div>

                {/* Handle Máximo */}
                <div
                  className="absolute top-3 -ml-5 cursor-pointer group"
                  style={{ left: `${totalMaxPercentage}%` }}
                  onMouseDown={() => handleMouseDown('max')}
                >
                  <div className={`w-10 h-10 bg-white border-4 border-emerald-500 rounded-full shadow-xl transition-all ${
                    isDraggingTotalMax ? 'scale-125 shadow-2xl' : 'group-hover:scale-110'
                  }`}>
                    <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-green-500 rounded-full opacity-20"></div>
                  </div>
                  <div className={`absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg shadow-lg transition-opacity ${
                    isDraggingTotalMax ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}>
                    {formatArea(totalAreaMax)}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
                  </div>
                </div>
              </div>

              {/* Inputs e Opções Rápidas */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Mínimo</label>
                  <input
                    type="text"
                    value={formatInput(totalAreaMin)}
                    onChange={handleTotalMinChange}
                    placeholder="0"
                    className="w-full px-3 py-2 text-sm bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Máximo</label>
                  <input
                    type="text"
                    value={formatInput(totalAreaMax)}
                    onChange={handleTotalMaxChange}
                    placeholder="1000"
                    className="w-full px-3 py-2 text-sm bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all font-semibold"
                  />
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-slate-600 mb-1.5">Opções Rápidas</h4>
                <div className="grid grid-cols-5 gap-2">
                  {QUICK_OPTIONS_TOTAL.map((option, index) => {
                    const isSelected = (option.value === totalAreaMin || option.value === totalAreaMax);
                    const gradients = ['from-green-500 to-emerald-500', 'from-emerald-500 to-teal-500', 'from-teal-500 to-cyan-500', 'from-cyan-500 to-blue-500', 'from-blue-500 to-indigo-500'];
                    return (
                      <button
                        key={option.label}
                        onClick={() => {
                          if (!totalAreaMin || totalAreaMin === 0) setTotalAreaMin(option.value);
                          else setTotalAreaMax(option.value);
                        }}
                        className={`px-2 py-2 text-xs font-bold rounded-lg transition-all transform hover:scale-105 ${
                          isSelected
                            ? `bg-gradient-to-r ${gradients[index]} text-white shadow-lg`
                            : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-2 border-slate-200'
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 pb-6 flex items-center gap-3">
            <button
              onClick={handleReset}
              className="px-5 py-2.5 text-sm font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all"
            >
              Limpar
            </button>
            <button
              onClick={handleApply}
              className="flex-1 px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 rounded-lg shadow-lg shadow-green-200 hover:shadow-xl hover:shadow-green-300 transition-all transform hover:scale-[1.02]"
            >
              Aplicar Filtros
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
