import { Dialog } from '@headlessui/react';
import { X, Home, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function PropertyTypeModal({ isOpen, onClose, filters, onApply }) {
  const [selectedTypes, setSelectedTypes] = useState(filters.propertyTypes || []);
  const [expandedCategories, setExpandedCategories] = useState([]);

  // ✅ FIX: Sincronizar estado quando filters.propertyTypes mudar
  useEffect(() => {
    setSelectedTypes(filters.propertyTypes || []);
  }, [filters.propertyTypes]);

  // Estilos em destaque (principais)
  const featuredStyles = [
    { 
      id: 'Casa', 
      label: 'Casa', 
      icon: '🏠',
      gradient: 'from-emerald-500 to-teal-600'
    },
    { 
      id: 'Apartamento', 
      label: 'Apartamento', 
      icon: '🏢',
      gradient: 'from-blue-500 to-cyan-600'
    },
    { 
      id: 'Cobertura', 
      label: 'Cobertura', 
      icon: '🏙️',
      gradient: 'from-purple-500 to-pink-600'
    },
    { 
      id: 'Terreno residencial', 
      label: 'Terreno', 
      icon: '📐',
      gradient: 'from-amber-500 to-orange-600'
    },
  ];

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
        { id: 'Casa de condomínio', label: 'Casa de condomínio', icon: '🏘️' },
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
      label: '🏭 Industrial',
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
      label: '📐 Terrenos',
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
      setSelectedTypes(prev => prev.filter(id => !categoryTypeIds.includes(id)));
    } else {
      setSelectedTypes(prev => [...new Set([...prev, ...categoryTypeIds])]);
    }
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
      <div className="fixed inset-0 bg-black/40 backdrop-blur-md" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl transform transition-all">
          {/* Header Moderno */}
          <div className="relative border-b border-slate-200 bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-5 rounded-t-3xl">
            <div className="flex items-center justify-between">
              <Dialog.Title className="flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg shadow-emerald-200/50">
                  <Home size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Tipo de Imóvel</h2>
                  <p className="text-sm text-slate-600 mt-0.5">Selecione os tipos que você procura</p>
                </div>
              </Dialog.Title>
              <button 
                onClick={onClose} 
                className="p-2 hover:bg-white/80 rounded-xl transition-colors group"
                aria-label="Fechar"
              >
                <X size={22} className="text-slate-600 group-hover:text-slate-900 group-hover:rotate-90 transition-all duration-300" />
              </button>
            </div>
          </div>

          <div className="p-6 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
            {/* Estilos em Destaque - Design Melhorado */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">⭐ Mais Procurados</h3>
                {selectedTypes.length > 0 && (
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-semibold rounded-full border border-emerald-200">
                    {selectedTypes.length} {selectedTypes.length === 1 ? 'selecionado' : 'selecionados'}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {featuredStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => toggleType(style.id)}
                    className={`group relative overflow-hidden rounded-2xl aspect-square transition-all duration-300 ${
                      selectedTypes.includes(style.id) 
                        ? 'ring-4 ring-emerald-500 scale-95 shadow-xl shadow-emerald-200/50' 
                        : 'hover:scale-105 hover:shadow-lg'
                    }`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
                    <div className="relative h-full flex flex-col items-center justify-center text-white p-4">
                      <div className="text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-300">{style.icon}</div>
                      <div className="font-bold text-base text-center leading-tight">{style.label}</div>
                    </div>
                    {selectedTypes.includes(style.id) && (
                      <div className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg animate-in zoom-in duration-300">
                        <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-sm font-medium text-slate-500">Todas as Opções</span>
              </div>
            </div>

            {/* Categorias Expansíveis - Design Premium */}
            <div>
              <div className="space-y-3">
                {propertyCategories.map((category) => {
                  const isExpanded = expandedCategories.includes(category.id);
                  const categoryTypes = category.types.map(t => t.id);
                  const selectedInCategory = categoryTypes.filter(id => selectedTypes.includes(id)).length;
                  const allSelected = selectedInCategory === categoryTypes.length;

                  return (
                    <div 
                      key={category.id} 
                      className={`border-2 rounded-2xl overflow-hidden transition-all duration-300 ${
                        isExpanded ? 'border-emerald-300 bg-emerald-50/30' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {/* Header da Categoria */}
                      <div className={`${isExpanded ? 'bg-gradient-to-r from-emerald-50 to-teal-50' : 'bg-slate-50/50 hover:bg-slate-100'} transition-colors`}>
                        <button
                          onClick={() => toggleCategory(category.id)}
                          className="w-full flex items-center justify-between p-4 transition-colors"
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <span className="text-3xl transform transition-transform duration-300 group-hover:scale-110">
                              {category.label.split(' ')[0]}
                            </span>
                            <div className="text-left">
                              <div className="font-bold text-slate-900 text-base">
                                {category.label.split(' ').slice(1).join(' ')}
                              </div>
                              <div className="text-sm text-slate-600">{category.description}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {selectedInCategory > 0 && (
                              <span className="px-3 py-1.5 bg-emerald-500 text-white text-xs font-bold rounded-full shadow-md shadow-emerald-200/50 animate-in zoom-in">
                                {selectedInCategory}
                              </span>
                            )}
                            <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                              <ChevronDown size={22} className="text-slate-600" />
                            </div>
                          </div>
                        </button>
                        
                        {isExpanded && (
                          <div className="px-4 pb-3">
                            <button 
                              onClick={() => selectAllInCategory(category)} 
                              className="text-sm text-emerald-600 hover:text-emerald-700 font-bold hover:underline transition-all"
                            >
                              {allSelected ? '✓ Desselecionar todos' : '✓ Selecionar todos'}
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Tipos da Categoria */}
                      {isExpanded && (
                        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3 bg-white">
                          {category.types.map((type) => (
                            <button
                              key={type.id}
                              onClick={() => toggleType(type.id)}
                              className={`group flex items-center gap-3 p-3.5 border-2 rounded-xl transition-all duration-200 text-left ${
                                selectedTypes.includes(type.id) 
                                  ? 'border-emerald-500 bg-emerald-50 shadow-md shadow-emerald-100/50 scale-[0.98]' 
                                  : 'border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30 hover:shadow-sm'
                              }`}
                            >
                              <div className="text-3xl transform transition-transform duration-300 group-hover:scale-110">
                                {type.icon}
                              </div>
                              <div className="flex-1 font-semibold text-slate-900 text-sm">
                                {type.label}
                              </div>
                              {selectedTypes.includes(type.id) && (
                                <div className="flex-shrink-0 animate-in zoom-in">
                                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-md">
                                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            </div>

            {/* Resumo de Seleção */}
            {selectedTypes.length > 0 && (
              <div className="mt-6 p-5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border-2 border-emerald-200 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-md shadow-emerald-200/50">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-emerald-900">
                    <span className="text-2xl font-bold">{selectedTypes.length}</span> {selectedTypes.length === 1 ? 'tipo selecionado' : 'tipos selecionados'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer com Botões - Design Premium */}
          <div className="border-t border-slate-200 px-6 py-5 flex items-center justify-between bg-slate-50/50 rounded-b-3xl">
            <button 
              onClick={handleReset} 
              className="px-5 py-2.5 text-slate-700 font-bold hover:bg-white border-2 border-transparent hover:border-slate-300 rounded-xl transition-all duration-200 hover:shadow-sm"
            >
              🗑️ Limpar
            </button>
            <div className="flex gap-3">
              <button 
                onClick={onClose} 
                className="px-6 py-2.5 border-2 border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-white hover:border-slate-400 transition-all duration-200 hover:shadow-sm"
              >
                Cancelar
              </button>
              <button 
                onClick={handleApply} 
                className="px-8 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-lg shadow-emerald-200/50 hover:shadow-xl hover:shadow-emerald-300/50 hover:scale-105 active:scale-95"
              >
                ✓ Aplicar Filtros
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
