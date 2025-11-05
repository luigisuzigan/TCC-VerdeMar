import { Dialog } from '@headlessui/react';
import { X, BedDouble, Bath, Sparkles, Minus, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function RoomsModal({ isOpen, onClose, filters, onApply }) {
  const [bedrooms, setBedrooms] = useState(filters.bedrooms || 0);
  const [bathrooms, setBathrooms] = useState(filters.bathrooms || 0);
  const [suites, setSuites] = useState(filters.suites || 0);

  // ✅ FIX: Sincronizar quando filters mudar (via remoção de chip)
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

  const hasFilters = bedrooms > 0 || bathrooms > 0 || suites > 0;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-md" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-lg bg-white rounded-3xl shadow-2xl transform transition-all">
          {/* Header Premium */}
          <div className="relative border-b border-slate-200 bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-5 rounded-t-3xl">
            <div className="flex items-center justify-between">
              <Dialog.Title className="flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg shadow-emerald-200/50">
                  <BedDouble size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Quartos e Banheiros</h2>
                  <p className="text-sm text-slate-600 mt-0.5">Quantidade mínima desejada</p>
                </div>
              </Dialog.Title>
              <button 
                onClick={onClose} 
                className="p-2 hover:bg-white/80 rounded-xl transition-colors group"
                aria-label="Fechar"
              >
                <X size={22} className="text-slate-600 group-hover:text-slate-900 group-hover:rotate-90 transition-all duration-300" />
              </button>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Quartos */}
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BedDouble size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Quartos</h3>
                  <p className="text-xs text-slate-500">Mínimo de quartos</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => decrementValue(setBedrooms, bedrooms)}
                  disabled={bedrooms === 0}
                  className="w-12 h-12 flex items-center justify-center bg-white border-2 border-slate-300 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-slate-300 disabled:hover:bg-white"
                >
                  <Minus size={20} className="text-slate-700" />
                </button>
                <div className="flex-1 flex items-center justify-center">
                  <span className="text-4xl font-bold text-slate-900">
                    {bedrooms === 0 ? 'Qualquer' : bedrooms}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => incrementValue(setBedrooms, bedrooms)}
                  disabled={bedrooms >= 10}
                  className="w-12 h-12 flex items-center justify-center bg-white border-2 border-slate-300 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Plus size={20} className="text-slate-700" />
                </button>
              </div>
              {bedrooms > 0 && (
                <p className="text-center text-sm text-slate-600 mt-3">
                  Imóveis com <span className="font-bold text-emerald-600">{bedrooms}+</span> quarto{bedrooms > 1 ? 's' : ''}
                </p>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-slate-200"></div>

            {/* Banheiros */}
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="p-2 bg-cyan-100 rounded-lg">
                  <Bath size={20} className="text-cyan-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Banheiros</h3>
                  <p className="text-xs text-slate-500">Mínimo de banheiros</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => decrementValue(setBathrooms, bathrooms)}
                  disabled={bathrooms === 0}
                  className="w-12 h-12 flex items-center justify-center bg-white border-2 border-slate-300 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-slate-300 disabled:hover:bg-white"
                >
                  <Minus size={20} className="text-slate-700" />
                </button>
                <div className="flex-1 flex items-center justify-center">
                  <span className="text-4xl font-bold text-slate-900">
                    {bathrooms === 0 ? 'Qualquer' : bathrooms}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => incrementValue(setBathrooms, bathrooms)}
                  disabled={bathrooms >= 10}
                  className="w-12 h-12 flex items-center justify-center bg-white border-2 border-slate-300 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Plus size={20} className="text-slate-700" />
                </button>
              </div>
              {bathrooms > 0 && (
                <p className="text-center text-sm text-slate-600 mt-3">
                  Imóveis com <span className="font-bold text-emerald-600">{bathrooms}+</span> banheiro{bathrooms > 1 ? 's' : ''}
                </p>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-slate-200"></div>

            {/* Suítes */}
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Sparkles size={20} className="text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Suítes</h3>
                  <p className="text-xs text-slate-500">Mínimo de suítes</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => decrementValue(setSuites, suites)}
                  disabled={suites === 0}
                  className="w-12 h-12 flex items-center justify-center bg-white border-2 border-slate-300 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-slate-300 disabled:hover:bg-white"
                >
                  <Minus size={20} className="text-slate-700" />
                </button>
                <div className="flex-1 flex items-center justify-center">
                  <span className="text-4xl font-bold text-slate-900">
                    {suites === 0 ? 'Qualquer' : suites}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => incrementValue(setSuites, suites)}
                  disabled={suites >= 10}
                  className="w-12 h-12 flex items-center justify-center bg-white border-2 border-slate-300 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Plus size={20} className="text-slate-700" />
                </button>
              </div>
              {suites > 0 && (
                <p className="text-center text-sm text-slate-600 mt-3">
                  Imóveis com <span className="font-bold text-emerald-600">{suites}+</span> suíte{suites > 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>

          {/* Footer com Botões */}
          <div className="border-t border-slate-200 px-6 py-5 flex items-center justify-between bg-slate-50/50 rounded-b-3xl">
            <button 
              onClick={handleReset} 
              className="px-5 py-2.5 text-slate-700 font-bold hover:bg-white border-2 border-transparent hover:border-slate-300 rounded-xl transition-all duration-200 hover:shadow-sm"
            >
              🗑️ Limpar
            </button>
            <div className="flex gap-3">
              <button 
                onClick={onClose} 
                className="px-6 py-2.5 border-2 border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-white hover:border-slate-400 transition-all duration-200 hover:shadow-sm"
              >
                Cancelar
              </button>
              <button
                onClick={handleApply}
                disabled={!hasFilters}
                className={`px-8 py-2.5 font-bold rounded-xl transition-all duration-200 ${
                  hasFilters
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-200/50 hover:shadow-xl hover:shadow-emerald-300/50 hover:scale-105 active:scale-95'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                ✓ Aplicar Filtros
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
