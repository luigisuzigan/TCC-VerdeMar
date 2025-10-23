import { Dialog } from '@headlessui/react';
import { X, Home, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export default function PropertyTypeModal({ isOpen, onClose, filters, onApply }) {
  const [selectedTypes, setSelectedTypes] = useState(filters.propertyTypes || []);
  const [expandedCategories, setExpandedCategories] = useState([]);

  // Estrutura hierárquica de categorias e tipos
  const propertyCategories = [
    {
      id: 'residencial',
      label: '🏡 Residencial',
      description: 'Imóveis para moradia',
      types: [
        { id: 'Casa', label: 'Casa', icon: '🏠' },
        { id: 'Sobrado', label: 'Sobrado', icon: '🏘️' },
        { id: 'Apartamento', label: 'Apartamento', icon: '🏢' },
        { id: 'Kitnet/Studio/Loft', label: 'Kitnet/Studio/Loft', icon: '🚪' },
        { id: 'Cobertura', label: 'Cobertura', icon: '🏙️' },
        { id: 'Flat/Apart-hotel', label: 'Flat/Apart-hotel', icon: '🏨' },
        { id: 'Chácara/Sítio', label: 'Chácara/Sítio', icon: '🌾' },
        { id: 'Casa de condomínio', label: 'Casa de condomínio', icon: '�️' },
      ]
    },
    {
      id: 'comercial',
      label: '🏪 Comercial',
      description: 'Imóveis para negócios',
      types: [
        { id: 'Sala comercial', label: 'Sala comercial', icon: '🏢' },
        { id: 'Loja', label: 'Loja', icon: '🏬' },
        { id: 'Prédio comercial', label: 'Prédio comercial', icon: '🏢' },
        { id: 'Ponto comercial', label: 'Ponto comercial', icon: '🏪' },
        { id: 'Hotel/Pousada', label: 'Hotel/Pousada', icon: '🏨' },
      ]
    },
    {
      id: 'industrial',
      label: '� Industrial',
      description: 'Imóveis industriais',
      types: [
        { id: 'Galpão industrial', label: 'Galpão industrial', icon: '🏭' },
        { id: 'Condomínio industrial', label: 'Condomínio industrial', icon: '🏗️' },
        { id: 'Terreno industrial', label: 'Terreno industrial', icon: '🏗️' },
        { id: 'Fábrica / Armazém', label: 'Fábrica / Armazém', icon: '🏭' },
      ]
    },
    {
      id: 'terreno',
      label: '� Terrenos',
      description: 'Lotes e terrenos',
      types: [
        { id: 'Terreno residencial', label: 'Terreno residencial', icon: '🏡' },
        { id: 'Terreno comercial', label: 'Terreno comercial', icon: '🏪' },
        { id: 'Terreno misto', label: 'Terreno misto', icon: '🏗️' },
        { id: 'Terreno rural', label: 'Terreno rural', icon: '🌾' },
        { id: 'Terreno em condomínio', label: 'Terreno em condomínio', icon: '🏘️' },
      ]
    },
    {
      id: 'especial',
      label: '⭐ Especiais',
      description: 'Empreendimentos e outros',
      types: [
        { id: 'Loteamento', label: 'Loteamento', icon: '🗺️' },
        { id: 'Área / Gleba', label: 'Área / Gleba', icon: '🌍' },
        { id: 'Empreendimento em construção', label: 'Empreendimento em construção', icon: '🏗️' },
        { id: 'Imóvel de uso misto', label: 'Imóvel de uso misto', icon: '🏢' },
      ]
    },
  ];

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleType = (typeId) => {
    setSelectedTypes(prev =>
      prev.includes(typeId)
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  const selectAllInCategory = (category) => {
    const categoryTypeIds = category.types.map(t => t.id);
    const allSelected = categoryTypeIds.every(id => selectedTypes.includes(id));
    
    if (allSelected) {
      // Desselecionar todos da categoria
      setSelectedTypes(prev => prev.filter(id => !categoryTypeIds.includes(id)));
    } else {
      // Selecionar todos da categoria
      setSelectedTypes(prev => [...new Set([...prev, ...categoryTypeIds])]);
    }
  };

  const handleApply = () => {
    onApply({ propertyTypes: selectedTypes });
  };

  const handleReset = () => {
    setSelectedTypes([]);
    onApply({ propertyTypes: [] });
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
            <div className="space-y-3">
              {propertyCategories.map((category) => {
                const isExpanded = expandedCategories.includes(category.id);
                const categoryTypes = category.types.map(t => t.id);
                const selectedInCategory = categoryTypes.filter(id => selectedTypes.includes(id)).length;
                const allSelected = selectedInCategory === categoryTypes.length;

                return (
                  <div key={category.id} className="border border-slate-200 rounded-xl overflow-hidden">
                    {/* Category Header */}
                    <div className="bg-slate-50">
                      <button
                        onClick={() => toggleCategory(category.id)}
                        className="w-full flex items-center justify-between p-4 hover:bg-slate-100 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <span className="text-2xl">{category.label.split(' ')[0]}</span>
                          <div className="text-left">
                            <div className="font-semibold text-slate-900">{category.label.split(' ').slice(1).join(' ')}</div>
                            <div className="text-sm text-slate-600">{category.description}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {selectedInCategory > 0 && (
                            <span className="px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                              {selectedInCategory}
                            </span>
                          )}
                          {isExpanded ? (
                            <ChevronUp size={20} className="text-slate-600" />
                          ) : (
                            <ChevronDown size={20} className="text-slate-600" />
                          )}
                        </div>
                      </button>
                      
                      {/* Select All Button */}
                      {isExpanded && (
                        <div className="px-4 pb-3">
                          <button
                            onClick={() => selectAllInCategory(category)}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                          >
                            {allSelected ? '✓ Desselecionar todos' : 'Selecionar todos'}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Category Types */}
                    {isExpanded && (
                      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                        {category.types.map((type) => (
                          <button
                            key={type.id}
                            onClick={() => toggleType(type.id)}
                            className={`flex items-center gap-3 p-3 border-2 rounded-lg transition-all text-left ${
                              selectedTypes.includes(type.id)
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            <div className="text-2xl">{type.icon}</div>
                            <div className="flex-1 font-medium text-slate-900">{type.label}</div>
                            {selectedTypes.includes(type.id) && (
                              <div className="flex-shrink-0">
                                <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
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
