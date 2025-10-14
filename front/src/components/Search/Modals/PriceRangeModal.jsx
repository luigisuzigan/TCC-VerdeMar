import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import '../slider-custom.css';

const QUICK_OPTIONS = [
  { label: 'Até 500k', min: 0, max: 500000 },
  { label: '500k - 1M', min: 500000, max: 1000000 },
  { label: '1M - 2M', min: 1000000, max: 2000000 },
  { label: 'Acima de 2M', min: 2000000, max: 10000000 },
];

export default function PriceRangeModal({ isOpen, onClose, priceMin, priceMax, onApply }) {
  const [min, setMin] = useState(priceMin || '');
  const [max, setMax] = useState(priceMax || '');
  const [sliderValue, setSliderValue] = useState([
    priceMin || 0,
    priceMax || 5000000,
  ]);

  const handleSliderChange = (value) => {
    setSliderValue(value);
    setMin(value[0]);
    setMax(value[1]);
  };

  const handleMinChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setMin(value);
    setSliderValue([Number(value), sliderValue[1]]);
  };

  const handleMaxChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setMax(value);
    setSliderValue([sliderValue[0], Number(value)]);
  };

  const handleApply = () => {
    onApply(min, max);
  };

  const handleClear = () => {
    setMin('');
    setMax('');
    setSliderValue([0, 5000000]);
  };

  const selectQuickOption = (option) => {
    setMin(option.min);
    setMax(option.max);
    setSliderValue([option.min, option.max]);
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
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      {/* Container centralizado */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-lg w-full bg-white rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <Dialog.Title className="text-xl font-bold text-slate-900">
              Faixa de Preço
            </Dialog.Title>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Inputs de preço */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Preço Mínimo
                </label>
                <input
                  type="text"
                  value={min ? formatCurrency(min) : ''}
                  onChange={handleMinChange}
                  placeholder="R$ 0"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Preço Máximo
                </label>
                <input
                  type="text"
                  value={max ? formatCurrency(max) : ''}
                  onChange={handleMaxChange}
                  placeholder="R$ 5.000.000"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Slider */}
            <div className="mb-8 px-2">
              <Slider
                range
                min={0}
                max={5000000}
                step={50000}
                value={sliderValue}
                onChange={handleSliderChange}
                trackStyle={[{ backgroundColor: '#10b981' }]}
                handleStyle={[
                  { borderColor: '#10b981', backgroundColor: '#fff' },
                  { borderColor: '#10b981', backgroundColor: '#fff' },
                ]}
                railStyle={{ backgroundColor: '#e2e8f0' }}
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>R$ 0</span>
                <span>R$ 5M</span>
              </div>
            </div>

            {/* Opções rápidas */}
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-3">
                Opções Rápidas
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {QUICK_OPTIONS.map((option) => (
                  <button
                    key={option.label}
                    onClick={() => selectQuickOption(option)}
                    className="px-4 py-2.5 text-sm font-medium text-slate-700 border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-all"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-3 p-6 border-t border-slate-200">
            <button
              onClick={handleClear}
              className="px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Limpar
            </button>
            <button
              onClick={handleApply}
              className="flex-1 px-6 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
            >
              Aplicar
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
