import { Dialog } from '@headlessui/react';
import { X, DollarSign } from 'lucide-react';
import { useState, useEffect } from 'react';

const QUICK_OPTIONS = [
  { label: 'Até 300k', min: null, max: 300000 },
  { label: '300k - 500k', min: 300000, max: 500000 },
  { label: '500k - 1M', min: 500000, max: 1000000 },
  { label: '1M - 2M', min: 1000000, max: 2000000 },
  { label: '2M - 5M', min: 2000000, max: 5000000 },
  { label: 'Acima de 5M', min: 5000000, max: null },
];

export default function PriceModal({ isOpen, onClose, filters, onApply }) {
  const [minPrice, setMinPrice] = useState(filters.priceMin || '');
  const [maxPrice, setMaxPrice] = useState(filters.priceMax || '');

  // Resetar valores quando o modal abre
  useEffect(() => {
    if (isOpen) {
      setMinPrice(filters.priceMin || '');
      setMaxPrice(filters.priceMax || '');
    }
  }, [isOpen, filters]);

  const handleApply = () => {
    // Aplica mesmo que não tenha valores (limpa filtro)
    const priceFilter = {
      priceMin: minPrice || '',
      priceMax: maxPrice || '',
    };
    console.log('💰 PriceModal - handleApply chamado');
    console.log('💰 minPrice (raw):', minPrice);
    console.log('💰 maxPrice (raw):', maxPrice);
    console.log('💰 Enviando filtro:', priceFilter);
    
    onApply(priceFilter);
    onClose();
  };

  const handleClear = () => {
    setMinPrice('');
    setMaxPrice('');
  };

  const selectQuickOption = (option) => {
    setMinPrice(option.min || '');
    setMaxPrice(option.max || '');
  };

  const formatInput = (value) => {
    if (!value) return '';
    const num = value.toString().replace(/\D/g, '');
    return new Intl.NumberFormat('pt-BR').format(num);
  };

  const handleMinChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setMinPrice(value);
  };

  const handleMaxChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setMaxPrice(value);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-lg w-full bg-white rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <Dialog.Title className="text-xl font-bold text-slate-900">
                Faixa de Preço
              </Dialog.Title>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Inputs de preço */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Preço Mínimo
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                    R$
                  </span>
                  <input
                    type="text"
                    value={formatInput(minPrice)}
                    onChange={handleMinChange}
                    placeholder="0"
                    className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Preço Máximo
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                    R$
                  </span>
                  <input
                    type="text"
                    value={formatInput(maxPrice)}
                    onChange={handleMaxChange}
                    placeholder="Sem limite"
                    className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Opções rápidas */}
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-3">
                Opções Rápidas
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {QUICK_OPTIONS.map((option) => {
                  const isSelected = 
                    (option.min === null || option.min.toString() === minPrice) &&
                    (option.max === null || option.max.toString() === maxPrice);
                  
                  return (
                    <button
                      key={option.label}
                      onClick={() => selectQuickOption(option)}
                      className={`px-4 py-2.5 text-sm font-medium rounded-xl transition-all ${
                        isSelected
                          ? 'bg-emerald-500 text-white border-2 border-emerald-600'
                          : 'text-slate-700 border border-slate-300 hover:border-emerald-400 hover:bg-emerald-50'
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-3 p-6 border-t border-slate-200 bg-slate-50">
            <button
              onClick={handleClear}
              className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Limpar
            </button>
            <button
              onClick={handleApply}
              className="flex-1 px-6 py-2.5 text-sm font-semibold text-white rounded-xl transition-all bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-lg hover:shadow-xl"
            >
              Aplicar Filtro
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
