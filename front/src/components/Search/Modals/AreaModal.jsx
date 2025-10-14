import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import '../slider-custom.css';

const QUICK_OPTIONS = [
  { label: 'Até 50m²', min: 0, max: 50 },
  { label: '50-100m²', min: 50, max: 100 },
  { label: '100-200m²', min: 100, max: 200 },
  { label: 'Acima de 200m²', min: 200, max: 1000 },
];

export default function AreaModal({ isOpen, onClose, areaMin, areaMax, onApply }) {
  const [min, setMin] = useState(areaMin || '');
  const [max, setMax] = useState(areaMax || '');
  const [sliderValue, setSliderValue] = useState([
    areaMin || 0,
    areaMax || 500,
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
    setSliderValue([0, 500]);
  };

  const selectQuickOption = (option) => {
    setMin(option.min);
    setMax(option.max);
    setSliderValue([option.min, option.max]);
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
              Área do Imóvel (m²)
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
            {/* Inputs de área */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Área Mínima
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={min}
                    onChange={handleMinChange}
                    placeholder="0"
                    className="w-full px-4 py-2.5 pr-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                    m²
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Área Máxima
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={max}
                    onChange={handleMaxChange}
                    placeholder="500"
                    className="w-full px-4 py-2.5 pr-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                    m²
                  </span>
                </div>
              </div>
            </div>

            {/* Slider */}
            <div className="mb-8 px-2">
              <Slider
                range
                min={0}
                max={500}
                step={10}
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
                <span>0 m²</span>
                <span>500 m²</span>
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
