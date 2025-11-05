import { Dialog } from '@headlessui/react';
import { X, Maximize2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AreaModal({ isOpen, onClose, filters, onApply }) {
  const [minArea, setMinArea] = useState(filters.areaMin || '');
  const [maxArea, setMaxArea] = useState(filters.areaMax || '');

  // ✅ FIX: Sincronizar quando filters mudar (via remoção de chip)
  useEffect(() => {
    setMinArea(filters.areaMin || '');
    setMaxArea(filters.areaMax || '');
  }, [filters.areaMin, filters.areaMax]);

  // Opções rápidas de área (em m²)
  const quickAreas = [
    { label: '50m²', value: 50 },
    { label: '100m²', value: 100 },
    { label: '150m²', value: 150 },
    { label: '200m²', value: 200 },
    { label: '300m²', value: 300 },
    { label: '500m²', value: 500 },
  ];

  const handleQuickMin = (value) => {
    setMinArea(value.toString());
  };

  const handleQuickMax = (value) => {
    setMaxArea(value.toString());
  };

  const handleApply = () => {
    const result = {};
    if (minArea) result.areaMin = parseInt(minArea);
    if (maxArea) result.areaMax = parseInt(maxArea);
    onApply(result);
    onClose();
  };

  const handleReset = () => {
    setMinArea('');
    setMaxArea('');
  };

  const formatArea = (value) => {
    if (!value) return '';
    const num = parseInt(value);
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num;
  };

  const hasFilters = minArea || maxArea;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header com ondas decorativas */}
          <div className="relative bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 p-6 pb-12 overflow-hidden">
            {/* Ondas decorativas SVG */}
            <svg className="absolute bottom-0 left-0 w-full opacity-20" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,56C672,48,768,32,864,32C960,32,1056,48,1152,53.3C1248,59,1344,53,1392,50.7L1440,48L1440,80L1392,80C1344,80,1248,80,1152,80C1056,80,960,80,864,80C768,80,672,80,576,80C480,80,384,80,288,80C192,80,96,80,48,80L0,80Z" fill="white"/>
            </svg>
            <svg className="absolute bottom-0 left-0 w-full opacity-10" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{transform: 'translateY(5px)'}}>
              <path d="M0,48L48,42.7C96,37,192,27,288,32C384,37,480,59,576,64C672,69,768,59,864,48C960,37,1056,27,1152,26.7C1248,27,1344,37,1392,42.7L1440,48L1440,80L1392,80C1344,80,1248,80,1152,80C1056,80,960,80,864,80C768,80,672,80,576,80C480,80,384,80,288,80C192,80,96,80,48,80L0,80Z" fill="white"/>
            </svg>

            {/* Conteúdo do header */}
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                  <Maximize2 className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <Dialog.Title className="text-xl font-bold text-white drop-shadow-md">
                    Área do Imóvel
                  </Dialog.Title>
                  <p className="text-blue-50 text-xs mt-0.5">Defina o tamanho ideal em m²</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 -mt-6 relative z-10 space-y-4">
            {/* Área Mínima */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-4">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                Área Mínima
              </label>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {quickAreas.map((area, index) => {
                  const isSelected = minArea === area.value.toString();
                  const gradients = [
                    'from-blue-400 to-cyan-500',
                    'from-cyan-400 to-teal-500',
                    'from-teal-400 to-emerald-500',
                    'from-emerald-400 to-green-500',
                    'from-green-400 to-lime-500',
                    'from-lime-400 to-yellow-500',
                  ];

                  return (
                    <button
                      key={`min-${area.value}`}
                      onClick={() => handleQuickMin(area.value)}
                      className={`px-3 py-2.5 text-xs font-bold rounded-lg transition-all transform hover:scale-105 ${
                        isSelected
                          ? `bg-gradient-to-r ${gradients[index]} text-white shadow-md`
                          : 'border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {area.label}
                    </button>
                  );
                })}
              </div>
              <div className="relative group">
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-blue-50 to-transparent rounded-l-xl flex items-center justify-center">
                  <Maximize2 className="w-4 h-4 text-blue-600" />
                </div>
                <input
                  type="number"
                  placeholder="Digite a área mínima"
                  value={minArea}
                  onChange={(e) => setMinArea(e.target.value)}
                  className="w-full pl-14 pr-12 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all font-semibold text-slate-700"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 font-bold text-sm">m²</span>
              </div>
            </div>

            {/* Área Máxima */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-4">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                Área Máxima
              </label>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {quickAreas.map((area, index) => {
                  const isSelected = maxArea === area.value.toString();
                  const gradients = [
                    'from-blue-400 to-cyan-500',
                    'from-cyan-400 to-teal-500',
                    'from-teal-400 to-emerald-500',
                    'from-emerald-400 to-green-500',
                    'from-green-400 to-lime-500',
                    'from-lime-400 to-yellow-500',
                  ];

                  return (
                    <button
                      key={`max-${area.value}`}
                      onClick={() => handleQuickMax(area.value)}
                      className={`px-3 py-2.5 text-xs font-bold rounded-lg transition-all transform hover:scale-105 ${
                        isSelected
                          ? `bg-gradient-to-r ${gradients[index]} text-white shadow-md`
                          : 'border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {area.label}
                    </button>
                  );
                })}
              </div>
              <div className="relative group">
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-blue-50 to-transparent rounded-l-xl flex items-center justify-center">
                  <Maximize2 className="w-4 h-4 text-blue-600" />
                </div>
                <input
                  type="number"
                  placeholder="Digite a área máxima"
                  value={maxArea}
                  onChange={(e) => setMaxArea(e.target.value)}
                  className="w-full pl-14 pr-12 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all font-semibold text-slate-700"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 font-bold text-sm">m²</span>
              </div>
            </div>

            {/* Indicador visual de range */}
            {hasFilters && (
              <div className="bg-gradient-to-r from-blue-50 via-cyan-50 to-teal-50 rounded-xl p-4 border-2 border-blue-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700">
                    {minArea ? `${minArea}m²` : 'Mínimo'}
                  </span>
                  <div className="flex-1 mx-3 h-2 bg-gradient-to-r from-blue-200 via-cyan-200 to-teal-200 rounded-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 animate-pulse opacity-60"></div>
                  </div>
                  <span className="text-xs font-bold text-slate-700">
                    {maxArea ? `${maxArea}m²` : 'Máximo'}
                  </span>
                </div>
                <p className="text-xs text-blue-900 font-medium text-center">
                  {minArea && maxArea && (
                    <span>Entre <span className="font-bold">{minArea}m²</span> e <span className="font-bold">{maxArea}m²</span></span>
                  )}
                  {minArea && !maxArea && (
                    <span>A partir de <span className="font-bold">{minArea}m²</span></span>
                  )}
                  {!minArea && maxArea && (
                    <span>Até <span className="font-bold">{maxArea}m²</span></span>
                  )}
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="relative px-6 pb-6 pt-3">
            <div className="flex items-center gap-3">
              <button
                onClick={handleReset}
                className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
              >
                Limpar
              </button>
              <button
                onClick={handleApply}
                className="relative flex-1 px-5 py-2.5 text-sm font-bold text-white rounded-xl transition-all overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10">Aplicar Filtro</span>
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
