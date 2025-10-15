import { Dialog } from '@headlessui/react';
import { X, Home } from 'lucide-react';
import { useState } from 'react';

export default function PropertyTypeModal({ isOpen, onClose, filters, onApply }) {
  const [selectedTypes, setSelectedTypes] = useState(filters.propertyTypes || []);

  const propertyTypes = [
    { id: 'casa', label: 'Casa', icon: '🏠', description: 'Casa térrea ou sobrado' },
    { id: 'apartamento', label: 'Apartamento', icon: '🏢', description: 'Unidade em edifício' },
    { id: 'cobertura', label: 'Cobertura', icon: '🏙️', description: 'Apartamento duplex no topo' },
    { id: 'terreno', label: 'Terreno', icon: '🌳', description: 'Lote para construção' },
    { id: 'kitnet', label: 'Kitnet', icon: '🚪', description: 'Espaço compacto' },
    { id: 'sobrado', label: 'Sobrado', icon: '🏘️', description: 'Casa de dois andares' },
    { id: 'chacara', label: 'Chácara', icon: '🌾', description: 'Propriedade rural' },
    { id: 'comercial', label: 'Comercial', icon: '🏪', description: 'Ponto comercial' },
    { id: 'loft', label: 'Loft', icon: '🏗️', description: 'Espaço industrial adaptado' },
  ];

  const toggleType = (typeId) => {
    setSelectedTypes(prev =>
      prev.includes(typeId)
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleApply = () => {
    onApply({ propertyTypes: selectedTypes });
    onClose();
  };

  const handleReset = () => {
    setSelectedTypes([]);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
            <Dialog.Title className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Home size={24} className="text-blue-600" />
              Tipo de Imóvel
            </Dialog.Title>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {propertyTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => toggleType(type.id)}
                  className={`flex items-start gap-4 p-4 border-2 rounded-xl transition-all text-left ${
                    selectedTypes.includes(type.id)
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-3xl">{type.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-slate-900 mb-1">{type.label}</div>
                    <div className="text-sm text-slate-600">{type.description}</div>
                  </div>
                  {selectedTypes.includes(type.id) && (
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {selectedTypes.length > 0 && (
              <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                <p className="text-sm text-blue-900">
                  <span className="font-semibold">{selectedTypes.length}</span> {selectedTypes.length === 1 ? 'tipo selecionado' : 'tipos selecionados'}
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
