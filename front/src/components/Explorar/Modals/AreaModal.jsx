import { Dialog } from '@headlessui/react';
import { X, Maximize2, Home, Ruler, Sparkles } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const QUICK_OPTIONS_BUILT = [
  { label: '50m²', value: 50 },
  { label: '100m²', value: 100 },
  { label: '150m²', value: 150 },
  { label: '200m²', value: 200 },
  { label: '300m²', value: 300 },
];

const QUICK_OPTIONS_TOTAL = [
  { label: '200m²', value: 200 },
  { label: '300m²', value: 300 },
  { label: '500m²', value: 500 },
  { label: '1000m²', value: 1000 },
  { label: '2000m²', value: 2000 },
];

export default function AreaModal({ isOpen, onClose, filters, onApply }) {
  // Área Construída
  const [areaMin, setAreaMin] = useState(filters.areaMin || 0);
  const [areaMax, setAreaMax] = useState(filters.areaMax || 500);
  const [isDraggingAreaMin, setIsDraggingAreaMin] = useState(false);
  const [isDraggingAreaMax, setIsDraggingAreaMax] = useState(false);
  const areaSliderRef = useRef(null);
  
  // Área Total do Terreno
  const [totalAreaMin, setTotalAreaMin] = useState(filters.totalAreaMin || 0);
  const [totalAreaMax, setTotalAreaMax] = useState(filters.totalAreaMax || 1000);
  const [isDraggingTotalMin, setIsDraggingTotalMin] = useState(false);
  const [isDraggingTotalMax, setIsDraggingTotalMax] = useState(false);
  const totalSliderRef = useRef(null);

  // Ranges dinâmicos
  const getAreaRange = () => {
    const currentMin = Math.min(areaMin, areaMax);
    const currentMax = Math.max(areaMin, areaMax);
    if (currentMax === 0) return { min: 0, max: 500 };
    const range = currentMax - currentMin;
    const padding = Math.max(range * 0.3, 100);
    return { min: Math.max(0, currentMin - padding), max: currentMax + padding };
  };

  const getTotalAreaRange = () => {
    const currentMin = Math.min(totalAreaMin, totalAreaMax);
    const currentMax = Math.max(totalAreaMin, totalAreaMax);
    if (currentMax === 0) return { min: 0, max: 1000 };
    const range = currentMax - currentMin;
    const padding = Math.max(range * 0.3, 200);
    return { min: Math.max(0, currentMin - padding), max: currentMax + padding };
  };

  const areaRange = getAreaRange();
  const AREA_MIN = areaRange.min;
  const AREA_MAX = areaRange.max;
  const AREA_STEP = Math.max(5, Math.round((AREA_MAX - AREA_MIN) / 100));

  const totalRange = getTotalAreaRange();
  const TOTAL_MIN = totalRange.min;
  const TOTAL_MAX = totalRange.max;
  const TOTAL_STEP = Math.max(10, Math.round((TOTAL_MAX - TOTAL_MIN) / 100));

  // Sincronizar com filters
  useEffect(() => {
    setAreaMin(filters.areaMin || 0);
    setAreaMax(filters.areaMax || 500);
    setTotalAreaMin(filters.totalAreaMin || 0);
    setTotalAreaMax(filters.totalAreaMax || 1000);
  }, [filters.areaMin, filters.areaMax, filters.totalAreaMin, filters.totalAreaMax]);

  useEffect(() => {
    if (isOpen) {
      setAreaMin(filters.areaMin || 0);
      setAreaMax(filters.areaMax || 500);
      setTotalAreaMin(filters.totalAreaMin || 0);
      setTotalAreaMax(filters.totalAreaMax || 1000);
    }
  }, [isOpen, filters]);

  // Handlers para Área Construída
  const handleAreaSliderInteraction = (e, type) => {
    if (!areaSliderRef.current) return;
    const rect = areaSliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = x / rect.width;
    const value = Math.round((AREA_MIN + percentage * (AREA_MAX - AREA_MIN)) / AREA_STEP) * AREA_STEP;
    if (type === 'min') setAreaMin(Math.min(value, areaMax - AREA_STEP));
    else setAreaMax(Math.max(value, areaMin + AREA_STEP));
  };

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

  const handleMouseDown = (slider, type) => {
    if (slider === 'area') {
      if (type === 'min') setIsDraggingAreaMin(true);
      else setIsDraggingAreaMax(true);
    } else {
      if (type === 'min') setIsDraggingTotalMin(true);
      else setIsDraggingTotalMax(true);
    }
  };

  const handleMouseUp = () => {
    setIsDraggingAreaMin(false);
    setIsDraggingAreaMax(false);
    setIsDraggingTotalMin(false);
    setIsDraggingTotalMax(false);
  };

  const handleMouseMove = (e) => {
    if (isDraggingAreaMin) handleAreaSliderInteraction(e, 'min');
    if (isDraggingAreaMax) handleAreaSliderInteraction(e, 'max');
    if (isDraggingTotalMin) handleTotalSliderInteraction(e, 'min');
    if (isDraggingTotalMax) handleTotalSliderInteraction(e, 'max');
  };

  useEffect(() => {
    if (isDraggingAreaMin || isDraggingAreaMax || isDraggingTotalMin || isDraggingTotalMax) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDraggingAreaMin, isDraggingAreaMax, isDraggingTotalMin, isDraggingTotalMax, areaMin, areaMax, totalAreaMin, totalAreaMax]);

  const handleApply = () => {
    const result = {};
    if (areaMin > 0) result.areaMin = areaMin;
    if (areaMax > 0) result.areaMax = areaMax;
    if (totalAreaMin > 0) result.totalAreaMin = totalAreaMin;
    if (totalAreaMax > 0) result.totalAreaMax = totalAreaMax;
    onApply(result);
    onClose();
  };

  const handleReset = () => {
    setAreaMin(0);
    setAreaMax(500);
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

  const handleAreaMinChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setAreaMin(value ? Math.min(parseInt(value), areaMax - AREA_STEP) : 0);
  };

  const handleAreaMaxChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setAreaMax(value ? Math.max(parseInt(value), areaMin + AREA_STEP) : 0);
  };

  const handleTotalMinChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setTotalAreaMin(value ? Math.min(parseInt(value), totalAreaMax - TOTAL_STEP) : 0);
  };

  const handleTotalMaxChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setTotalAreaMax(value ? Math.max(parseInt(value), totalAreaMin + TOTAL_STEP) : 0);
  };

  const areaMinPercentage = ((areaMin - AREA_MIN) / (AREA_MAX - AREA_MIN)) * 100;
  const areaMaxPercentage = ((areaMax - AREA_MIN) / (AREA_MAX - AREA_MIN)) * 100;
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
                    Tamanho do Imóvel
                    <Sparkles size={16} className="text-blue-200" />
                  </Dialog.Title>
                  <p className="text-blue-50 text-xs mt-0.5">Arraste os controles ou escolha valores</p>
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
            
            {/* 1. ÁREA CONSTRUÍDA */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
                  <Home size={18} className="text-white" strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-slate-900">Área Construída</h3>
                  <p className="text-xs text-slate-500">Espaço edificado do imóvel</p>
                </div>
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                  {formatArea(areaMin)} - {formatArea(areaMax)}
                </span>
              </div>

              {/* Info do range */}
              <div className="text-xs text-slate-500 mb-2 text-center">
                Range: {formatArea(AREA_MIN)} a {formatArea(AREA_MAX)}
              </div>

              {/* Slider */}
              <div className="relative pt-2 pb-8 px-6" ref={areaSliderRef}>
                <div className="absolute top-6 left-0 right-0 h-2 bg-slate-200 rounded-full"></div>
                <div 
                  className="absolute top-6 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-md"
                  style={{
                    left: `${areaMinPercentage}%`,
                    right: `${100 - areaMaxPercentage}%`,
                  }}
                ></div>

                {/* Handle Mínimo */}
                <div
                  className="absolute top-3 -ml-5 cursor-pointer group"
                  style={{ left: `${areaMinPercentage}%` }}
                  onMouseDown={() => handleMouseDown('area', 'min')}
                >
                  <div className={`w-10 h-10 bg-white border-4 border-blue-500 rounded-full shadow-xl transition-all ${
                    isDraggingAreaMin ? 'scale-125 shadow-2xl' : 'group-hover:scale-110'
                  }`}>
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-20"></div>
                  </div>
                  <div className={`absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg shadow-lg transition-opacity ${
                    isDraggingAreaMin ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}>
                    {formatArea(areaMin)}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
                  </div>
                </div>

                {/* Handle Máximo */}
                <div
                  className="absolute top-3 -ml-5 cursor-pointer group"
                  style={{ left: `${areaMaxPercentage}%` }}
                  onMouseDown={() => handleMouseDown('area', 'max')}
                >
                  <div className={`w-10 h-10 bg-white border-4 border-cyan-500 rounded-full shadow-xl transition-all ${
                    isDraggingAreaMax ? 'scale-125 shadow-2xl' : 'group-hover:scale-110'
                  }`}>
                    <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-20"></div>
                  </div>
                  <div className={`absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg shadow-lg transition-opacity ${
                    isDraggingAreaMax ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}>
                    {formatArea(areaMax)}
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
                    value={formatInput(areaMin)}
                    onChange={handleAreaMinChange}
                    placeholder="0"
                    className="w-full px-3 py-2 text-sm bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Máximo</label>
                  <input
                    type="text"
                    value={formatInput(areaMax)}
                    onChange={handleAreaMaxChange}
                    placeholder="500"
                    className="w-full px-3 py-2 text-sm bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 transition-all font-semibold"
                  />
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-slate-600 mb-1.5">Opções Rápidas</h4>
                <div className="grid grid-cols-5 gap-2">
                  {QUICK_OPTIONS_BUILT.map((option, index) => {
                    const isSelected = (option.value === areaMin || option.value === areaMax);
                    const gradients = ['from-blue-500 to-cyan-500', 'from-cyan-500 to-teal-500', 'from-teal-500 to-emerald-500', 'from-emerald-500 to-green-500', 'from-green-500 to-lime-500'];
                    return (
                      <button
                        key={option.label}
                        onClick={() => {
                          if (!areaMin || areaMin === 0) setAreaMin(option.value);
                          else setAreaMax(option.value);
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

            {/* 2. ÁREA TOTAL DO TERRENO */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg">
                  <Ruler size={18} className="text-white" strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-slate-900">Área Total do Terreno</h3>
                  <p className="text-xs text-slate-500">Tamanho completo do lote</p>
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
                  onMouseDown={() => handleMouseDown('total', 'min')}
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
                  onMouseDown={() => handleMouseDown('total', 'max')}
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
              className="flex-1 px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 hover:from-blue-600 hover:via-cyan-600 hover:to-teal-600 rounded-lg shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all transform hover:scale-[1.02]"
            >
              Aplicar Filtros
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
