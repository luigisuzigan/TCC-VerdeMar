import { Tag, Palette, Shield, Info, Home, Building2, Store, Warehouse, TreePine } from 'lucide-react';
import { CATEGORIES, STYLES, PROPERTY_CONDITIONS, PROPERTY_TYPES_BY_CATEGORY } from '../constants';

// Mapa de ícones para categorias
const CATEGORY_ICONS = {
  'Residencial': Home,
  'Comercial': Store,
  'Industrial': Warehouse,
  'Terreno': TreePine,
  'Especial': Building2
};

// Emojis para categorias
const CATEGORY_EMOJIS = {
  'Residencial': '🏠',
  'Comercial': '🏢',
  'Industrial': '🏭',
  'Terreno': '🌳',
  'Especial': '✨'
};

export default function CategoryTypeSection({ 
  model, 
  update, 
  selectedCategory, 
  setSelectedCategory,
  selectedType,
  handleCategoryChange,
  handleTypeChange 
}) {
  return (
    <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* Header com gradiente */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-8 py-6 text-center">
        <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
          <Tag size={32} />
          🏘️ CATEGORIA E TIPO
        </h2>
        <p className="text-blue-50 text-sm mt-2">Define o tipo de imóvel e campos obrigatórios</p>
      </div>

      {/* Conteúdo */}
      <div className="p-8 space-y-6">
        
        {/* 1. SELEÇÃO DE CATEGORIA (Cards Visuais) */}
        <div>
          <label className="flex items-center justify-between mb-4">
            <span className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Tag size={20} className="text-blue-600" />
              Categoria do Imóvel
            </span>
            <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full font-semibold">
              Obrigatório
            </span>
          </label>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {CATEGORIES.map(cat => {
              const Icon = CATEGORY_ICONS[cat] || Home;
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    const event = { target: { value: cat } };
                    handleCategoryChange(event);
                  }}
                  className={`
                    relative p-4 rounded-xl border-2 transition-all duration-200
                    flex flex-col items-center justify-center gap-2 min-h-[100px]
                    ${isSelected 
                      ? 'border-blue-500 bg-blue-50 shadow-lg scale-105' 
                      : 'border-slate-300 bg-white hover:border-blue-300 hover:shadow-md hover:scale-102'
                    }
                  `}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                  )}
                  <span className="text-3xl">{CATEGORY_EMOJIS[cat]}</span>
                  <Icon size={24} className={isSelected ? 'text-blue-600' : 'text-slate-600'} />
                  <span className={`text-sm font-bold text-center ${isSelected ? 'text-blue-900' : 'text-slate-700'}`}>
                    {cat}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. SELEÇÃO DE TIPO (Cards Visuais) */}
        {selectedCategory && (
          <div className="animate-fadeIn">
            <label className="flex items-center justify-between mb-4">
              <span className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Building2 size={20} className="text-blue-600" />
                Tipo de Imóvel
              </span>
              <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full font-semibold">
                Obrigatório
              </span>
            </label>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {PROPERTY_TYPES_BY_CATEGORY[selectedCategory]?.map(type => {
                const isSelected = selectedType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      const event = { target: { value: type } };
                      handleTypeChange(event);
                    }}
                    className={`
                      relative p-3 rounded-xl border-2 transition-all duration-200
                      flex items-center justify-center text-center min-h-[70px]
                      ${isSelected 
                        ? 'border-blue-500 bg-blue-50 shadow-lg scale-105' 
                        : 'border-slate-300 bg-white hover:border-blue-300 hover:shadow-md hover:scale-102'
                      }
                    `}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                    )}
                    <span className={`text-sm font-bold ${isSelected ? 'text-blue-900' : 'text-slate-700'}`}>
                      {type}
                    </span>
                  </button>
                );
              })}
            </div>

            {selectedType && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4 flex items-start gap-3 mt-4 shadow-sm">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Info size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-blue-900 mb-1">
                    ✅ Selecionado: <span className="text-blue-600">{selectedCategory}</span> → <span className="text-blue-600">{selectedType}</span>
                  </p>
                  <p className="text-xs text-blue-700">
                    Os campos específicos para este tipo serão exibidos nas próximas seções
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="border-t border-slate-200"></div>

        {/* 3. ESTILO ARQUITETÔNICO (Cards Visuais Compactos) */}
        <div>
          <label className="flex items-center justify-between mb-3">
            <span className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Palette size={20} className="text-purple-600" />
              🎨 Estilo Arquitetônico
            </span>
            <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-semibold">
              Opcional
            </span>
          </label>

          <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
            {STYLES.map(style => {
              const isSelected = model.architecturalStyle === style;
              return (
                <button
                  key={style}
                  type="button"
                  onClick={() => update('architecturalStyle', style)}
                  className={`
                    relative px-3 py-2 rounded-lg border-2 transition-all duration-200
                    text-xs font-semibold text-center
                    ${isSelected 
                      ? 'border-purple-500 bg-purple-50 text-purple-900 shadow-md' 
                      : 'border-slate-300 bg-white text-slate-700 hover:border-purple-300 hover:shadow-sm'
                    }
                  `}
                >
                  {isSelected && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-[10px] font-bold">✓</span>
                    </div>
                  )}
                  {style}
                </button>
              );
            })}
            {/* Botão Limpar */}
            {model.architecturalStyle && (
              <button
                type="button"
                onClick={() => update('architecturalStyle', '')}
                className="px-3 py-2 rounded-lg border-2 border-red-300 bg-red-50 text-red-700 hover:bg-red-100 text-xs font-semibold transition-all"
              >
                ✕ Limpar
              </button>
            )}
          </div>
        </div>

        <div className="border-t border-slate-200"></div>

        {/* 4. CONDIÇÃO (Cards Visuais) */}
        <div>
          <label className="flex items-center justify-between mb-3">
            <span className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Shield size={20} className="text-green-600" />
              ⭐ Condição do Imóvel
            </span>
            <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-semibold">
              Opcional
            </span>
          </label>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {PROPERTY_CONDITIONS.map(condition => {
              const isSelected = model.propertyCondition === condition;
              const conditionEmojis = {
                'Novo': '✨',
                'Seminovo': '⭐',
                'Usado': '🔧',
                'Reformado': '🔨'
              };
              return (
                <button
                  key={condition}
                  type="button"
                  onClick={() => update('propertyCondition', condition)}
                  className={`
                    relative p-4 rounded-xl border-2 transition-all duration-200
                    flex flex-col items-center justify-center gap-2 min-h-[90px]
                    ${isSelected 
                      ? 'border-green-500 bg-green-50 shadow-lg scale-105' 
                      : 'border-slate-300 bg-white hover:border-green-300 hover:shadow-md hover:scale-102'
                    }
                  `}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                  )}
                  <span className="text-2xl">{conditionEmojis[condition]}</span>
                  <span className={`text-sm font-bold ${isSelected ? 'text-green-900' : 'text-slate-700'}`}>
                    {condition}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="border-t border-slate-200"></div>

        {/* 5. ANO DE CONSTRUÇÃO (Campo Especial) */}
        <div>
          <label className="flex items-center justify-between mb-3">
            <span className="text-lg font-bold text-slate-900 flex items-center gap-2">
              📅 Ano de Construção
            </span>
            <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-semibold">
              Opcional
            </span>
          </label>

          <div className="flex items-center gap-4">
            <input
              type="number"
              value={model.yearBuilt}
              onChange={(e) => update('yearBuilt', e.target.value)}
              className="flex-1 px-6 py-4 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xl font-bold text-slate-900 transition-all text-center"
              min={1900}
              max={new Date().getFullYear()}
              placeholder="Ex: 2020"
            />
            {model.yearBuilt && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl px-6 py-4 min-w-[200px]">
                <p className="text-xs text-blue-700 font-semibold mb-1">Idade do imóvel</p>
                <p className="text-2xl font-bold text-blue-900">
                  {new Date().getFullYear() - parseInt(model.yearBuilt)} anos
                </p>
              </div>
            )}
          </div>
          <p className="text-sm text-slate-500 mt-2">
            💡 Informe o ano de construção ou reforma mais recente
          </p>
        </div>

      </div>
    </div>
  );
}
