import { Dialog } from '@headlessui/react';
import { X, DollarSign, Sparkles } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const QUICK_OPTIONS = [
  { label: 'Até 300k', min: null, max: 300000 },
  { label: '300k - 500k', min: 300000, max: 500000 },
  { label: '500k - 1M', min: 500000, max: 1000000 },
  { label: '1M - 2M', min: 1000000, max: 2000000 },
  { label: '2M+', min: 2000000, max: null },
];

export default function PriceModal({ isOpen, onClose, filters, onApply }) {
  const [minPrice, setMinPrice] = useState(filters.priceMin || 0);
  const [maxPrice, setMaxPrice] = useState(filters.priceMax || 5000000);
  const [isDraggingMin, setIsDraggingMin] = useState(false);
  const [isDraggingMax, setIsDraggingMax] = useState(false);
  const sliderRef = useRef(null);

  // Valores dinâmicos baseados nos inputs do usuário
  const getSliderRange = () => {
    const currentMin = Math.min(minPrice, maxPrice);
    const currentMax = Math.max(minPrice, maxPrice);
    
    // Se não há valores, usar range padrão
    if (currentMax === 0) {
      return { min: 0, max: 5000000 };
    }
    
    // Expandir o range para dar margem de ajuste
    const range = currentMax - currentMin;
    const padding = Math.max(range * 0.3, 500000); // 30% de margem ou no mínimo 500k
    
    return {
      min: Math.max(0, currentMin - padding),
      max: currentMax + padding
    };
  };

  const sliderRange = getSliderRange();
  const MIN_VALUE = sliderRange.min;
  const MAX_VALUE = sliderRange.max;
  const STEP = Math.max(10000, Math.round((MAX_VALUE - MIN_VALUE) / 200)); // Step adaptativo

  // ✅ Sincronizar quando filters mudar
  useEffect(() => {
    setMinPrice(filters.priceMin || 0);
    setMaxPrice(filters.priceMax || 5000000);
  }, [filters.priceMin, filters.priceMax]);

  useEffect(() => {
    if (isOpen) {
      setMinPrice(filters.priceMin || 0);
      setMaxPrice(filters.priceMax || 5000000);
    }
  }, [isOpen, filters]);

  const handleSliderInteraction = (e, type) => {
    if (!sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = x / rect.width;
    const value = Math.round((MIN_VALUE + percentage * (MAX_VALUE - MIN_VALUE)) / STEP) * STEP;

    if (type === 'min') {
      setMinPrice(Math.min(value, maxPrice - STEP));
    } else {
      setMaxPrice(Math.max(value, minPrice + STEP));
    }
  };

  const handleMouseDown = (type) => {
    if (type === 'min') setIsDraggingMin(true);
    else setIsDraggingMax(true);
  };

  const handleMouseUp = () => {
    setIsDraggingMin(false);
    setIsDraggingMax(false);
  };

  const handleMouseMove = (e) => {
    if (isDraggingMin) handleSliderInteraction(e, 'min');
    if (isDraggingMax) handleSliderInteraction(e, 'max');
  };

  useEffect(() => {
    if (isDraggingMin || isDraggingMax) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDraggingMin, isDraggingMax, minPrice, maxPrice]);

  const handleApply = () => {
    const priceFilter = {
      priceMin: minPrice > 0 ? minPrice : '',
      priceMax: maxPrice > 0 ? maxPrice : '',
    };
    onApply(priceFilter);
    onClose();
  };

  const handleClear = () => {
    setMinPrice(0);
    setMaxPrice(5000000);
  };

  const selectQuickOption = (option) => {
    setMinPrice(option.min || 0);
    setMaxPrice(option.max || 5000000);
  };

  const formatPrice = (value) => {
    if (!value || value === 0) return 'Mínimo';
    if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `R$ ${(value / 1000).toFixed(0)}k`;
    return `R$ ${value.toLocaleString('pt-BR')}`;
  };

  const formatInput = (value) => {
    if (!value || value === 0) return '';
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  const handleMinChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    // Permite apagar completamente (valor vazio = 0)
    if (value === '') {
      setMinPrice(0);
    } else {
      const numValue = parseInt(value);
      setMinPrice(numValue);
    }
  };

  const handleMaxChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    // Permite apagar completamente (valor vazio = 0)
    if (value === '') {
      setMaxPrice(0);
    } else {
      const numValue = parseInt(value);
      setMaxPrice(numValue);
    }
  };

  // Calcular percentuais para o slider baseado no range dinâmico
  const minPercentage = ((minPrice - MIN_VALUE) / (MAX_VALUE - MIN_VALUE)) * 100;
  const maxPercentage = ((maxPrice - MIN_VALUE) / (MAX_VALUE - MIN_VALUE)) * 100;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header Vibrante */}
          <div className="relative bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 px-8 py-6 overflow-hidden">
            {/* Padrão decorativo animado */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl animate-pulse delay-700"></div>
            </div>
            
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/40 shadow-lg">
                  <DollarSign className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <Dialog.Title className="text-xl font-bold text-white drop-shadow-md flex items-center gap-2">
                    Faixa de Preço
                    <Sparkles size={18} className="text-emerald-200" />
                  </Dialog.Title>
                  <p className="text-emerald-50 text-sm mt-0.5">Arraste os controles ou escolha uma opção</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2.5 text-white/90 hover:text-white hover:bg-white/20 rounded-xl transition-all backdrop-blur-sm"
              >
                <X size={22} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Slider Estilo Airbnb */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-slate-600">Ajuste o intervalo</span>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                  {formatPrice(minPrice)} - {formatPrice(maxPrice)}
                </span>
              </div>
              
              {/* Info sobre o range atual */}
              <div className="text-xs text-slate-500 mb-3 text-center">
                Range: {formatPrice(MIN_VALUE)} a {formatPrice(MAX_VALUE)}
              </div>

              {/* Slider Track */}
              <div className="relative pt-2 pb-10 px-8" ref={sliderRef}>
                {/* Track Background */}
                <div className="absolute top-6 left-0 right-0 h-2 bg-slate-200 rounded-full"></div>
                
                {/* Track Active (colorido entre os handles) */}
                <div 
                  className="absolute top-6 h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full shadow-md"
                  style={{
                    left: `${minPercentage}%`,
                    right: `${100 - maxPercentage}%`,
                  }}
                ></div>

                {/* Handle Mínimo */}
                <div
                  className="absolute top-3 -ml-5 cursor-pointer group"
                  style={{ left: `${minPercentage}%` }}
                  onMouseDown={() => handleMouseDown('min')}
                >
                  <div className={`w-10 h-10 bg-white border-4 border-emerald-500 rounded-full shadow-xl transition-all ${
                    isDraggingMin ? 'scale-125 shadow-2xl' : 'group-hover:scale-110'
                  }`}>
                    <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full opacity-20"></div>
                  </div>
                  <div className={`absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg shadow-lg transition-opacity ${
                    isDraggingMin ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}>
                    {formatPrice(minPrice)}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
                  </div>
                </div>

                {/* Handle Máximo */}
                <div
                  className="absolute top-3 -ml-5 cursor-pointer group"
                  style={{ left: `${maxPercentage}%` }}
                  onMouseDown={() => handleMouseDown('max')}
                >
                  <div className={`w-10 h-10 bg-white border-4 border-cyan-500 rounded-full shadow-xl transition-all ${
                    isDraggingMax ? 'scale-125 shadow-2xl' : 'group-hover:scale-110'
                  }`}>
                    <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-20"></div>
                  </div>
                  <div className={`absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg shadow-lg transition-opacity ${
                    isDraggingMax ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}>
                    {formatPrice(maxPrice)}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Inputs Manuais */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Preço Mínimo
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 font-bold">
                    R$
                  </span>
                  <input
                    type="text"
                    value={formatInput(minPrice)}
                    onChange={handleMinChange}
                    placeholder="0"
                    className="w-full pl-11 pr-4 py-3 text-slate-900 font-semibold bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Preço Máximo
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-600 font-bold">
                    R$
                  </span>
                  <input
                    type="text"
                    value={formatInput(maxPrice)}
                    onChange={handleMaxChange}
                    placeholder="Sem limite"
                    className="w-full pl-11 pr-4 py-3 text-slate-900 font-semibold bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Opções Rápidas com Gradientes */}
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <div className="w-1 h-5 bg-gradient-to-b from-emerald-500 via-teal-500 to-cyan-500 rounded-full"></div>
                Opções Populares
              </h3>
              <div className="grid grid-cols-5 gap-2">
                {QUICK_OPTIONS.map((option, index) => {
                  const isSelected = 
                    (option.min === null || option.min === minPrice) &&
                    (option.max === null || option.max === maxPrice);

                  const gradients = [
                    'from-emerald-500 to-teal-500',
                    'from-teal-500 to-cyan-500',
                    'from-cyan-500 to-blue-500',
                    'from-blue-500 to-indigo-500',
                    'from-indigo-500 to-purple-500',
                  ];

                  return (
                    <button
                      key={option.label}
                      onClick={() => selectQuickOption(option)}
                      className={`relative px-3 py-2.5 text-xs font-bold rounded-xl transition-all transform hover:scale-105 ${
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

          {/* Footer com Gradiente */}
          <div className="px-8 pb-8 flex items-center gap-3">
            <button
              onClick={handleClear}
              className="px-6 py-3 text-sm font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
            >
              Limpar
            </button>
            <button
              onClick={handleApply}
              className="flex-1 px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 rounded-xl shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 transition-all transform hover:scale-[1.02]"
            >
              Aplicar Filtros
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
