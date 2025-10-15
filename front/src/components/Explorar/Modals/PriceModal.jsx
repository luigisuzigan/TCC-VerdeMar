import { Dialog } from '@headlessui/react';
import { X, DollarSign } from 'lucide-react';
import { useState } from 'react';

export default function PriceModal({ isOpen, onClose, filters, onApply }) {
  const [priceMin, setPriceMin] = useState(filters.priceMin || '');
  const [priceMax, setPriceMax] = useState(filters.priceMax || '');

  const handleApply = () => {
    onApply({
      priceMin,
      priceMax,
    });
    onClose();
  };

  const handleQuickSelect = (min, max) => {
    setPriceMin(min || '');
    setPriceMax(max || '');
  };

  const handleReset = () => {
    setPriceMin('');
    setPriceMax('');
  };

  const formatCurrency = (value) => {
    if (!value) return '';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-lg bg-white rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
            <Dialog.Title className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <DollarSign size={24} className="text-blue-600" />
              Faixa de Preço
            </Dialog.Title>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Custom Range Inputs */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Defina sua faixa de preço
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-600 mb-2">Preço mínimo</label>
                  <input
                    type="number"
                    placeholder="R$ 0"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {priceMin && (
                    <p className="text-xs text-slate-500 mt-1">{formatCurrency(priceMin)}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs text-slate-600 mb-2">Preço máximo</label>
                  <input
                    type="number"
                    placeholder="R$ 10.000.000"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {priceMax && (
                    <p className="text-xs text-slate-500 mt-1">{formatCurrency(priceMax)}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Select Options */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Ou escolha uma faixa rápida
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleQuickSelect(null, 500000)}
                  className="px-4 py-3 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors text-left"
                >
                  <div className="font-medium text-slate-900">Até R$ 500 mil</div>
                  <div className="text-xs text-slate-600">Entrada no mercado</div>
                </button>
                <button
                  onClick={() => handleQuickSelect(500000, 1000000)}
                  className="px-4 py-3 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors text-left"
                >
                  <div className="font-medium text-slate-900">R$ 500K - R$ 1M</div>
                  <div className="text-xs text-slate-600">Padrão médio</div>
                </button>
                <button
                  onClick={() => handleQuickSelect(1000000, 2000000)}
                  className="px-4 py-3 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors text-left"
                >
                  <div className="font-medium text-slate-900">R$ 1M - R$ 2M</div>
                  <div className="text-xs text-slate-600">Padrão alto</div>
                </button>
                <button
                  onClick={() => handleQuickSelect(2000000, null)}
                  className="px-4 py-3 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors text-left"
                >
                  <div className="font-medium text-slate-900">Acima de R$ 2M</div>
                  <div className="text-xs text-slate-600">Alto padrão</div>
                </button>
              </div>
            </div>
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
