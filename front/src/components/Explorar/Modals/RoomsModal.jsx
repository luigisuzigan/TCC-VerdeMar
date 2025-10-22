import { Dialog } from '@headlessui/react';
import { X, BedDouble, Bath, Home } from 'lucide-react';
import { useState } from 'react';

export default function RoomsModal({ isOpen, onClose, filters, onApply }) {
  const [bedrooms, setBedrooms] = useState(filters.bedrooms || '');
  const [bathrooms, setBathrooms] = useState(filters.bathrooms || '');
  const [suites, setSuites] = useState(filters.suites || '');

  const handleApply = () => {
    onApply({
      bedrooms: bedrooms ? parseInt(bedrooms) : null,
      bathrooms: bathrooms ? parseInt(bathrooms) : null,
      suites: suites ? parseInt(suites) : null,
    });
    onClose();
  };

  const handleReset = () => {
    setBedrooms('');
    setBathrooms('');
    setSuites('');
  };

  // Quick select options
  const quickSelectBedrooms = [1, 2, 3, 4, 5];
  const quickSelectBathrooms = [1, 2, 3, 4];
  const quickSelectSuites = [1, 2, 3];

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-xl bg-white rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
            <Dialog.Title className="text-xl font-bold text-slate-900">
              Quartos, Banheiros e Suítes
            </Dialog.Title>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-8">
            {/* Bedrooms */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <BedDouble size={20} className="text-blue-600" />
                Quartos Mínimos
              </label>
              
              {/* Quick Select */}
              <div className="grid grid-cols-5 gap-2 mb-3">
                {quickSelectBedrooms.map((num) => (
                  <button
                    key={num}
                    onClick={() => setBedrooms(num.toString())}
                    className={`px-3 py-2 border-2 rounded-lg font-semibold transition-all ${
                      bedrooms === num.toString()
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {num}+
                  </button>
                ))}
              </div>
              
              {/* Custom Input */}
              <div>
                <label className="block text-xs text-slate-600 mb-2">Ou digite um número personalizado</label>
                <input
                  type="number"
                  placeholder="Ex: 6"
                  min="0"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Bathrooms */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Bath size={20} className="text-blue-600" />
                Banheiros Mínimos
              </label>
              
              {/* Quick Select */}
              <div className="grid grid-cols-4 gap-2 mb-3">
                {quickSelectBathrooms.map((num) => (
                  <button
                    key={num}
                    onClick={() => setBathrooms(num.toString())}
                    className={`px-3 py-2 border-2 rounded-lg font-semibold transition-all ${
                      bathrooms === num.toString()
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {num}+
                  </button>
                ))}
              </div>
              
              {/* Custom Input */}
              <div>
                <label className="block text-xs text-slate-600 mb-2">Ou digite um número personalizado</label>
                <input
                  type="number"
                  placeholder="Ex: 5"
                  min="0"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Suites */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Home size={20} className="text-emerald-600" />
                Suítes Mínimas
              </label>
              
              {/* Quick Select */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                {quickSelectSuites.map((num) => (
                  <button
                    key={num}
                    onClick={() => setSuites(num.toString())}
                    className={`px-3 py-2 border-2 rounded-lg font-semibold transition-all ${
                      suites === num.toString()
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                        : 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {num}+
                  </button>
                ))}
              </div>
              
              {/* Custom Input */}
              <div>
                <label className="block text-xs text-slate-600 mb-2">Ou digite um número personalizado</label>
                <input
                  type="number"
                  placeholder="Ex: 4"
                  min="0"
                  value={suites}
                  onChange={(e) => setSuites(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Summary */}
            {(bedrooms || bathrooms || suites) && (
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-sm text-blue-900 font-medium mb-2">📋 Filtros aplicados:</p>
                <ul className="text-sm text-blue-800 space-y-1">
                  {bedrooms && <li>• <span className="font-semibold">{bedrooms}+</span> quartos</li>}
                  {bathrooms && <li>• <span className="font-semibold">{bathrooms}+</span> banheiros</li>}
                  {suites && <li>• <span className="font-semibold">{suites}+</span> suítes</li>}
                </ul>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 px-6 py-4 flex items-center justify-between">
            <button
              onClick={handleReset}
              className="px-4 py-2 text-slate-700 font-semibold hover:bg-slate-100 rounded-lg transition-colors"
            >
              Limpar
            </button>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleApply}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
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
