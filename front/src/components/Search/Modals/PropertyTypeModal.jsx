import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { X, Home, Building2, Building, TreeDeciduous, Warehouse } from 'lucide-react';

const PROPERTY_TYPES = [
  { id: 'casa', label: 'Casa', icon: Home },
  { id: 'apartamento', label: 'Apartamento', icon: Building2 },
  { id: 'cobertura', label: 'Cobertura', icon: Building },
  { id: 'terreno', label: 'Terreno', icon: TreeDeciduous },
  { id: 'kitnet', label: 'Kitnet', icon: Building2 },
  { id: 'sobrado', label: 'Sobrado', icon: Home },
  { id: 'chacara', label: 'Chácara', icon: TreeDeciduous },
  { id: 'comercial', label: 'Comercial', icon: Warehouse },
  { id: 'loft', label: 'Loft', icon: Building2 },
];

export default function PropertyTypeModal({ isOpen, onClose, selectedTypes, onApply }) {
  const [selected, setSelected] = useState(selectedTypes || []);

  // ✅ FIX: Sincronizar quando selectedTypes mudar
  useEffect(() => {
    setSelected(selectedTypes || []);
  }, [selectedTypes]);

  const toggleType = (typeId) => {
    if (selected.includes(typeId)) {
      setSelected(selected.filter((id) => id !== typeId));
    } else {
      setSelected([...selected, typeId]);
    }
  };

  const handleApply = () => {
    onApply(selected);
  };

  const handleClear = () => {
    setSelected([]);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      {/* Container centralizado */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md w-full bg-white rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <Dialog.Title className="text-xl font-bold text-slate-900">
              Tipo do Imóvel
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
            <div className="grid grid-cols-2 gap-3">
              {PROPERTY_TYPES.map((type) => {
                const Icon = type.icon;
                const isSelected = selected.includes(type.id);
                
                return (
                  <button
                    key={type.id}
                    onClick={() => toggleType(type.id)}
                    className={[
                      'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all',
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50',
                    ].join(' ')}
                  >
                    <Icon size={24} strokeWidth={2} />
                    <span className="text-sm font-medium">{type.label}</span>
                  </button>
                );
              })}
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
              Aplicar {selected.length > 0 && `(${selected.length})`}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
