import { Dialog } from '@headlessui/react';
import { X, Maximize2, Car, Waves, Dumbbell, Trees } from 'lucide-react';
import { useState } from 'react';

export default function FiltersModal({ isOpen, onClose, filters, onApplyFilters }) {
  const [localFilters, setLocalFilters] = useState(filters);

  const updateLocalFilter = (key, value) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    setLocalFilters({});
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      {/* Full-screen container */}
      <div className="fixed inset-0 flex items-start justify-center overflow-y-auto">
        <Dialog.Panel className="w-full max-w-4xl bg-white rounded-b-2xl shadow-2xl">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
            <Dialog.Title className="text-xl font-bold text-slate-900">
              Mais Filtros
            </Dialog.Title>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[calc(100vh-180px)] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Area */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  <div className="flex items-center gap-2">
                    <Maximize2 size={18} />
                    Área (m²)
                  </div>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    placeholder="Mínimo"
                    value={localFilters.areaMin || ''}
                    onChange={(e) => updateLocalFilter('areaMin', e.target.value)}
                    className="px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Máximo"
                    value={localFilters.areaMax || ''}
                    onChange={(e) => updateLocalFilter('areaMax', e.target.value)}
                    className="px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Parking Spaces */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  <div className="flex items-center gap-2">
                    <Car size={18} />
                    Vagas de Garagem
                  </div>
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      onClick={() => updateLocalFilter('parkingSpaces', num)}
                      className={`flex-1 px-4 py-3 border-2 rounded-xl font-medium transition-colors ${
                        localFilters.parkingSpaces === num
                          ? 'border-blue-600 bg-blue-50 text-blue-700'
                          : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {num}+
                    </button>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  Comodidades
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { name: 'Piscina', icon: Waves },
                    { name: 'Academia', icon: Dumbbell },
                    { name: 'Churrasqueira', icon: '🍖' },
                    { name: 'Jardim', icon: Trees },
                    { name: 'Ar Condicionado', icon: '❄️' },
                    { name: 'Aquecimento', icon: '🔥' },
                    { name: 'Varanda', icon: '🪟' },
                    { name: 'Sacada', icon: '🏞️' },
                    { name: 'Pet Friendly', icon: '🐾' },
                    { name: 'Portaria 24h', icon: '🛡️' },
                    { name: 'Salão de Festas', icon: '🎉' },
                    { name: 'Playground', icon: '🎪' },
                  ].map((amenity) => (
                    <label key={amenity.name} className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-3 rounded-lg border border-slate-200 transition-colors">
                      <input
                        type="checkbox"
                        checked={localFilters.amenities?.includes(amenity.name) || false}
                        onChange={(e) => {
                          const current = localFilters.amenities || [];
                          const updated = e.target.checked
                            ? [...current, amenity.name]
                            : current.filter(a => a !== amenity.name);
                          updateLocalFilter('amenities', updated);
                        }}
                        className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-slate-700 flex items-center gap-2">
                        {typeof amenity.icon === 'string' ? (
                          <span className="text-lg">{amenity.icon}</span>
                        ) : (
                          <amenity.icon size={18} className="text-blue-600" />
                        )}
                        {amenity.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-between">
            <button
              onClick={handleReset}
              className="px-6 py-3 text-slate-700 font-semibold hover:bg-slate-100 rounded-xl transition-colors"
            >
              Limpar tudo
            </button>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-6 py-3 border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleApply}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
              >
                Aplicar filtros
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

