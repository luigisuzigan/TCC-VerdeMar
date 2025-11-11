import { Dialog } from '@headlessui/react';
import { X, BedDouble, Bath, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function RoomsModal({ isOpen, onClose, filters, onApply }) {
  const [bedrooms, setBedrooms] = useState(filters.bedrooms || 0);
  const [bathrooms, setBathrooms] = useState(filters.bathrooms || 0);
  const [suites, setSuites] = useState(filters.suites || 0);

  // Sincronizar quando filters mudar
  useEffect(() => {
    setBedrooms(filters.bedrooms || 0);
    setBathrooms(filters.bathrooms || 0);
    setSuites(filters.suites || 0);
  }, [filters.bedrooms, filters.bathrooms, filters.suites]);

  const incrementValue = (setter, current) => {
    if (current < 10) setter(current + 1);
  };

  const decrementValue = (setter, current) => {
    if (current > 0) setter(current - 1);
  };

  const handleApply = () => {
    const result = {};
    if (bedrooms > 0) result.bedrooms = bedrooms;
    if (bathrooms > 0) result.bathrooms = bathrooms;
    if (suites > 0) result.suites = suites;
    onApply(result);
    onClose();
  };

  const handleReset = () => {
    setBedrooms(0);
    setBathrooms(0);
    setSuites(0);
  };

  const handleInputChange = (setter, value) => {
    const num = parseInt(value) || 0;
    if (num >= 0) {
      setter(num);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-md" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="relative bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 px-6 py-4 overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white rounded-full blur-3xl animate-pulse"></div>
            </div>
            
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/40 shadow-lg">
                  <BedDouble className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <Dialog.Title className="text-lg font-bold text-white drop-shadow-md flex items-center gap-2">
                    Quartos e Banheiros
                    <Sparkles size={16} className="text-cyan-200" />
                  </Dialog.Title>
                  <p className="text-white/90 text-xs mt-0.5">Mínimo desejado</p>
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
          <div className="p-6 space-y-5">
            {/* Quartos */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-md">
                  <BedDouble size={18} className="text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Quartos</h3>
                  <p className="text-xs text-slate-500">Mínimo</p>
                </div>
              </div>
              <input
                type="number"
                min="0"
                value={bedrooms === 0 ? '' : bedrooms}
                onChange={(e) => handleInputChange(setBedrooms, e.target.value)}
                placeholder="0"
                className="w-16 h-10 text-center text-lg font-bold text-slate-900 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>

            {/* Divider */}
            <div className="border-t border-slate-200"></div>

            {/* Banheiros */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center shadow-md">
                  <Bath size={18} className="text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Banheiros</h3>
                  <p className="text-xs text-slate-500">Mínimo</p>
                </div>
              </div>
              <input
                type="number"
                min="0"
                value={bathrooms === 0 ? '' : bathrooms}
                onChange={(e) => handleInputChange(setBathrooms, e.target.value)}
                placeholder="0"
                className="w-16 h-10 text-center text-lg font-bold text-slate-900 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 transition-all"
              />
            </div>

            {/* Divider */}
            <div className="border-t border-slate-200"></div>

            {/* Suítes */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-md">
                  <Sparkles size={18} className="text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Suítes</h3>
                  <p className="text-xs text-slate-500">Mínimo</p>
                </div>
              </div>
              <input
                type="number"
                min="0"
                value={suites === 0 ? '' : suites}
                onChange={(e) => handleInputChange(setSuites, e.target.value)}
                placeholder="0"
                className="w-16 h-10 text-center text-lg font-bold text-slate-900 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all"
              />
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
