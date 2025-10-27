import { Dialog } from '@headlessui/react';
import { X, Maximize2 } from 'lucide-react';
import { useState } from 'react';

export default function AreaModal({ isOpen, onClose, filters, onApply }) {
  const [minArea, setMinArea] = useState(filters.areaMin || '');
  const [maxArea, setMaxArea] = useState(filters.areaMax || '');

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
        <Dialog.Panel className="w-full max-w-lg bg-white rounded-2xl shadow-2xl">
          <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
            <Dialog.Title className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Maximize2 size={24} className="text-emerald-600" />
              Área do Imóvel
            </Dialog.Title>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3">Área Mínima (m²)</label>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {quickAreas.map((area) => (
                  <button
                    key={`min-${area.value}`}
                    onClick={() => handleQuickMin(area.value)}
                    className={`px-4 py-3 border-2 rounded-xl font-semibold transition-all ${
                      minArea === area.value.toString()
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-700 scale-95'
                        : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                    }`}
                  >
                    {area.label}
                  </button>
                ))}
              </div>
              <div className="relative">
                <input
                  type="number"
                  placeholder="Digite a área mínima"
                  value={minArea}
                  onChange={(e) => setMinArea(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">m²</span>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <label className="block text-sm font-bold text-slate-900 mb-3">Área Máxima (m²)</label>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {quickAreas.map((area) => (
                  <button
                    key={`max-${area.value}`}
                    onClick={() => handleQuickMax(area.value)}
                    className={`px-4 py-3 border-2 rounded-xl font-semibold transition-all ${
                      maxArea === area.value.toString()
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-700 scale-95'
                        : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                    }`}
                  >
                    {area.label}
                  </button>
                ))}
              </div>
              <div className="relative">
                <input
                  type="number"
                  placeholder="Digite a área máxima"
                  value={maxArea}
                  onChange={(e) => setMaxArea(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">m²</span>
              </div>
            </div>

            {hasFilters && (
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <p className="text-sm text-emerald-900">
                  {minArea && maxArea && (
                    <span>Buscando imóveis entre <span className="font-bold">{minArea}m²</span> e <span className="font-bold">{maxArea}m²</span></span>
                  )}
                  {minArea && !maxArea && (
                    <span>Buscando imóveis a partir de <span className="font-bold">{minArea}m²</span></span>
                  )}
                  {!minArea && maxArea && (
                    <span>Buscando imóveis até <span className="font-bold">{maxArea}m²</span></span>
                  )}
                </p>
              </div>
            )}
          </div>

          <div className="border-t border-slate-200 px-6 py-4 flex items-center justify-between">
            <button onClick={handleReset} className="px-4 py-2 text-slate-700 font-semibold hover:bg-slate-100 rounded-lg transition-colors">
              Limpar
            </button>
            <div className="flex gap-3">
              <button onClick={onClose} className="px-6 py-2 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors">
                Cancelar
              </button>
              <button
                onClick={handleApply}
                className="px-6 py-2 font-semibold rounded-lg transition-all shadow-md bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 hover:shadow-lg hover:scale-105"
              >
                Aplicar
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
