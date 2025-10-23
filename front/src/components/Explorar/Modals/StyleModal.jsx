import { Dialog } from '@headlessui/react';
import { X, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function StyleModal({ isOpen, onClose, filters, onApply }) {
  const [selectedStyles, setSelectedStyles] = useState(filters.styles || []);

  const styles = [
    { 
      id: 'Moderno', 
      label: 'Moderno', 
      icon: '🏙️', 
      description: 'Design contemporâneo e minimalista',
      color: 'blue'
    },
    { 
      id: 'Clássico', 
      label: 'Clássico', 
      icon: '🏛️', 
      description: 'Arquitetura tradicional elegante',
      color: 'amber'
    },
    { 
      id: 'Rústico', 
      label: 'Rústico', 
      icon: '🌾', 
      description: 'Madeira, pedras e charme natural',
      color: 'orange'
    },
    { 
      id: 'Industrial', 
      label: 'Industrial', 
      icon: '🏭', 
      description: 'Concreto aparente e pé-direito alto',
      color: 'slate'
    },
    { 
      id: 'Minimalista', 
      label: 'Minimalista', 
      icon: '⚪', 
      description: 'Clean, simples e funcional',
      color: 'gray'
    },
    { 
      id: 'Colonial', 
      label: 'Colonial', 
      icon: '🏰', 
      description: 'Estilo português tradicional',
      color: 'red'
    },
    { 
      id: 'Contemporâneo', 
      label: 'Contemporâneo', 
      icon: '🎨', 
      description: 'Mix moderno com tradição',
      color: 'purple'
    },
    { 
      id: 'Tropical', 
      label: 'Tropical', 
      icon: '🌴', 
      description: 'Integração com a natureza',
      color: 'green'
    },
    { 
      id: 'Container', 
      label: 'Container', 
      icon: '📦', 
      description: 'Sustentável e inovador',
      color: 'teal'
    },
    { 
      id: 'Steel Frame', 
      label: 'Steel Frame', 
      icon: '🔩', 
      description: 'Estrutura metálica moderna',
      color: 'zinc'
    },
    { 
      id: 'Madeira', 
      label: 'Madeira', 
      icon: '🪵', 
      description: 'Estrutura em madeira',
      color: 'amber'
    },
    { 
      id: 'Sustentável', 
      label: 'Sustentável', 
      icon: '♻️', 
      description: 'Eco-friendly e green building',
      color: 'emerald'
    },
    { 
      id: 'Luxo', 
      label: 'Luxo', 
      icon: '💎', 
      description: 'Alto padrão e exclusivo',
      color: 'yellow'
    },
    { 
      id: 'Compacto', 
      label: 'Compacto', 
      icon: '🎯', 
      description: 'Otimizado para espaços pequenos',
      color: 'indigo'
    },
    { 
      id: 'Loft', 
      label: 'Loft', 
      icon: '🏗️', 
      description: 'Pé-direito alto, espaços integrados',
      color: 'violet'
    },
  ];

  const colorClasses = {
    blue: 'border-blue-600 bg-blue-50 text-blue-700',
    amber: 'border-amber-600 bg-amber-50 text-amber-700',
    orange: 'border-orange-600 bg-orange-50 text-orange-700',
    slate: 'border-slate-600 bg-slate-50 text-slate-700',
    gray: 'border-gray-600 bg-gray-50 text-gray-700',
    red: 'border-red-600 bg-red-50 text-red-700',
    purple: 'border-purple-600 bg-purple-50 text-purple-700',
    green: 'border-green-600 bg-green-50 text-green-700',
    teal: 'border-teal-600 bg-teal-50 text-teal-700',
    zinc: 'border-zinc-600 bg-zinc-50 text-zinc-700',
    emerald: 'border-emerald-600 bg-emerald-50 text-emerald-700',
    yellow: 'border-yellow-600 bg-yellow-50 text-yellow-700',
    indigo: 'border-indigo-600 bg-indigo-50 text-indigo-700',
    violet: 'border-violet-600 bg-violet-50 text-violet-700',
  };

  const toggleStyle = (styleId) => {
    setSelectedStyles(prev =>
      prev.includes(styleId)
        ? prev.filter(id => id !== styleId)
        : [...prev, styleId]
    );
  };

  const handleApply = () => {
    onApply({ styles: selectedStyles });
  };

  const handleReset = () => {
    setSelectedStyles([]);
    onApply({ styles: [] });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
            <Dialog.Title className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles size={24} className="text-blue-600" />
              Estilo Arquitetônico
            </Dialog.Title>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            <div className="mb-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-sm text-blue-900">
                💡 <strong>Dica:</strong> Selecione os estilos que mais combinam com você. 
                Cada estilo representa uma arquitetura e personalidade única.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {styles.map((style) => {
                const isSelected = selectedStyles.includes(style.id);
                const colorClass = isSelected ? colorClasses[style.color] : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50';
                
                return (
                  <button
                    key={style.id}
                    onClick={() => toggleStyle(style.id)}
                    className={`flex items-start gap-3 p-4 border-2 rounded-xl transition-all text-left ${colorClass}`}
                  >
                    <div className="text-3xl">{style.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-slate-900 mb-1">{style.label}</div>
                      <div className="text-xs text-slate-600">{style.description}</div>
                    </div>
                    {isSelected && (
                      <div className="flex-shrink-0">
                        <div className={`w-5 h-5 bg-${style.color}-600 rounded-full flex items-center justify-center`}>
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {selectedStyles.length > 0 && (
              <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <p className="text-sm text-slate-900">
                  <span className="font-semibold">{selectedStyles.length}</span> {selectedStyles.length === 1 ? 'estilo selecionado' : 'estilos selecionados'}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedStyles.map(styleId => {
                    const style = styles.find(s => s.id === styleId);
                    return (
                      <span key={styleId} className="px-2 py-1 bg-white rounded-lg text-xs font-medium">
                        {style?.icon} {style?.label}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 px-6 py-4 flex items-center justify-between">
            <button
              onClick={handleReset}
              className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium"
            >
              Limpar
            </button>
            <button
              onClick={handleApply}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Aplicar {selectedStyles.length > 0 && `(${selectedStyles.length})`}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
