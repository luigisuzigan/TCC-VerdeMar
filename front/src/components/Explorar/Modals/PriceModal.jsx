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

  // ✅ FIX: Sincronizar quando filters mudar (via remoção de chip)
  useEffect(() => {
    setMinPrice(filters.priceMin || '');
    setMaxPrice(filters.priceMax || '');
  }, [filters.priceMin, filters.priceMax]);

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
        <Dialog.Panel className="mx-auto max-w-lg w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header com ondas decorativas */}
          <div className="relative bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-6 pb-12 overflow-hidden">
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
                  <DollarSign className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <Dialog.Title className="text-xl font-bold text-white drop-shadow-md">
                    Faixa de Preço
                  </Dialog.Title>
                  <p className="text-emerald-50 text-xs mt-0.5">Defina seu orçamento ideal</p>
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
          <div className="p-6 -mt-6 relative z-10">
            {/* Inputs de preço com design premium */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-5 mb-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Preço Mínimo
                  </label>
                  <div className="relative group">
                    <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-emerald-50 to-transparent rounded-l-xl flex items-center justify-center">
                      <span className="text-emerald-600 font-bold">R$</span>
                    </div>
                    <input
                      type="text"
                      value={formatInput(minPrice)}
                      onChange={handleMinChange}
                      placeholder="0"
                      className="w-full pl-14 pr-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 transition-all font-semibold text-slate-700"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Preço Máximo
                  </label>
                  <div className="relative group">
                    <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-emerald-50 to-transparent rounded-l-xl flex items-center justify-center">
                      <span className="text-emerald-600 font-bold">R$</span>
                    </div>
                    <input
                      type="text"
                      value={formatInput(maxPrice)}
                      onChange={handleMaxChange}
                      placeholder="Sem limite"
                      className="w-full pl-14 pr-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 transition-all font-semibold text-slate-700"
                    />
                  </div>
                </div>
              </div>

              {/* Indicador visual de range */}
              {(minPrice || maxPrice) && (
                <div className="mt-5 pt-5 border-t border-slate-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 font-medium">
                      {minPrice ? `R$ ${formatInput(minPrice)}` : 'Mínimo'}
                    </span>
                    <div className="flex-1 mx-4 h-2 bg-gradient-to-r from-emerald-200 via-teal-200 to-cyan-200 rounded-full relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 animate-pulse opacity-50"></div>
                    </div>
                    <span className="text-slate-600 font-medium">
                      {maxPrice ? `R$ ${formatInput(maxPrice)}` : 'Máximo'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Opções rápidas */}
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <div className="w-1 h-4 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
                Opções Rápidas
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {QUICK_OPTIONS.map((option, index) => {
                  const isSelected = 
                    (option.min === null || option.min.toString() === minPrice) &&
                    (option.max === null || option.max.toString() === maxPrice);
                  
                  const gradients = [
                    'from-emerald-400 to-teal-500',
                    'from-teal-400 to-cyan-500',
                    'from-cyan-400 to-blue-500',
                    'from-blue-400 to-indigo-500',
                    'from-indigo-400 to-purple-500',
                    'from-purple-400 to-pink-500',
                  ];

                  return (
                    <button
                      key={option.label}
                      onClick={() => selectQuickOption(option)}
                      className={`relative px-4 py-3 text-sm font-bold rounded-xl transition-all transform hover:scale-105 ${
                        isSelected
                          ? `bg-gradient-to-r ${gradients[index % gradients.length]} text-white shadow-lg`
                          : 'text-slate-700 bg-white border-2 border-slate-200 hover:border-slate-300 hover:shadow-md'
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
          <div className="relative px-6 pb-6 pt-3">
            <div className="flex items-center gap-3">
              <button
                onClick={handleClear}
                className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
              >
                Limpar
              </button>
              <button
                onClick={handleApply}
                className="relative flex-1 px-5 py-2.5 text-sm font-bold text-white rounded-xl transition-all overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10">Aplicar Filtro</span>
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
