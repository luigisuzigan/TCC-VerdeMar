import { Dialog } from '@headlessui/react';
import { X, BedDouble, Bath } from 'lucide-react';
import { useState } from 'react';

export default function RoomsModal({ isOpen, onClose, filters, onApply }) {
  const [bedrooms, setBedrooms] = useState(filters.bedrooms || null);
  const [bathrooms, setBathrooms] = useState(filters.bathrooms || null);

  const handleApply = () => {
    onApply({
      bedrooms,
      bathrooms,
    });
    onClose();
  };

  const handleReset = () => {
    setBedrooms(null);
    setBathrooms(null);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-lg bg-white rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
            <Dialog.Title className="text-xl font-bold text-slate-900">
              Quartos e Banheiros
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
                Quartos
              </label>
              <div className="grid grid-cols-5 gap-3">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() => setBedrooms(num === bedrooms ? null : num)}
                    className={`px-4 py-3 border-2 rounded-xl font-semibold transition-all ${
                      bedrooms === num
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {num}+
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Selecione o número mínimo de quartos
              </p>
            </div>

            {/* Bathrooms */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Bath size={20} className="text-blue-600" />
                Banheiros
              </label>
              <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((num) => (
                  <button
                    key={num}
                    onClick={() => setBathrooms(num === bathrooms ? null : num)}
                    className={`px-4 py-3 border-2 rounded-xl font-semibold transition-all ${
                      bathrooms === num
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {num}+
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Selecione o número mínimo de banheiros
              </p>
            </div>

            {/* Summary */}
            {(bedrooms || bathrooms) && (
              <div className="p-4 bg-blue-50 rounded-xl">
                <p className="text-sm text-blue-900">
                  {bedrooms && bathrooms && (
                    <>Buscando imóveis com <span className="font-semibold">{bedrooms}+ quartos</span> e <span className="font-semibold">{bathrooms}+ banheiros</span></>
                  )}
                  {bedrooms && !bathrooms && (
                    <>Buscando imóveis com <span className="font-semibold">{bedrooms}+ quartos</span></>
                  )}
                  {!bedrooms && bathrooms && (
                    <>Buscando imóveis com <span className="font-semibold">{bathrooms}+ banheiros</span></>
                  )}
                </p>
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
