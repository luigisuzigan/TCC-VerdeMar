import { Dialog } from '@headlessui/react';
import { X, BedDouble, Bath, Sparkles, Plus } from 'lucide-react';
import { useState } from 'react';

export default function RoomsModal({ isOpen, onClose, filters, onApply }) {
  const [bedrooms, setBedrooms] = useState(filters.bedrooms || '');
  const [bathrooms, setBathrooms] = useState(filters.bathrooms || '');
  const [suites, setSuites] = useState(filters.suites || '');

  const handleApply = () => {
    const result = {};
    if (bedrooms) result.bedrooms = parseInt(bedrooms);
    if (bathrooms) result.bathrooms = parseInt(bathrooms);
    if (suites) result.suites = parseInt(suites);
    onApply(result);
  };

  const handleReset = () => {
    setBedrooms('');
    setBathrooms('');
    setSuites('');
    onApply({});
  };

  const quickNumbers = [1, 2, 3, 4, 5, 6];
  const hasFilters = bedrooms || bathrooms || suites;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md bg-white rounded-2xl shadow-2xl">
          <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
            <Dialog.Title className="text-xl font-bold text-slate-900">
              Quartos e Banheiros
            </Dialog.Title>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="p-6 space-y-8">
            <div>
              <label className="flex items-center gap-2 text-base font-bold text-slate-900 mb-4">
                <BedDouble size={22} className="text-emerald-600" />
                Quartos (mínimo)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {quickNumbers.map((num) => (
                  <button
                    key={num}
                    onClick={() => setBedrooms(num.toString())}
                    className={`px-4 py-3.5 border-2 rounded-xl font-bold text-lg transition-all ${
                      bedrooms === num.toString()
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-700 scale-95'
                        : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                    }`}
                  >
                    {num}
                    {num === 6 && <Plus size={16} className="inline ml-0.5 mb-0.5" />}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-base font-bold text-slate-900 mb-4">
                <Bath size={22} className="text-emerald-600" />
                Banheiros (mínimo)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {quickNumbers.map((num) => (
                  <button
                    key={num}
                    onClick={() => setBathrooms(num.toString())}
                    className={`px-4 py-3.5 border-2 rounded-xl font-bold text-lg transition-all ${
                      bathrooms === num.toString()
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-700 scale-95'
                        : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                    }`}
                  >
                    {num}
                    {num === 6 && <Plus size={16} className="inline ml-0.5 mb-0.5" />}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-base font-bold text-slate-900 mb-4">
                <Sparkles size={22} className="text-emerald-600" />
                Suítes (mínimo)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {quickNumbers.map((num) => (
                  <button
                    key={num}
                    onClick={() => setSuites(num.toString())}
                    className={`px-4 py-3.5 border-2 rounded-xl font-bold text-lg transition-all ${
                      suites === num.toString()
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-700 scale-95'
                        : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                    }`}
                  >
                    {num}
                    {num === 6 && <Plus size={16} className="inline ml-0.5 mb-0.5" />}
                  </button>
                ))}
              </div>
            </div>

            {hasFilters && (
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <p className="text-sm text-emerald-900">
                  Buscando imóveis com pelo menos:{' '}
                  {bedrooms && <span className="font-bold">{bedrooms} quartos</span>}
                  {bedrooms && (bathrooms || suites) && ', '}
                  {bathrooms && <span className="font-bold">{bathrooms} banheiros</span>}
                  {bathrooms && suites && ', '}
                  {suites && <span className="font-bold">{suites} suítes</span>}
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
                disabled={!hasFilters}
                className={`px-6 py-2 font-semibold rounded-lg transition-all shadow-md ${
                  hasFilters
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 hover:shadow-lg hover:scale-105'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
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
