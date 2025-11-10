import { Tag, Palette, Shield, Info } from 'lucide-react';
import { CATEGORIES, STYLES, PROPERTY_CONDITIONS, PROPERTY_TYPES_BY_CATEGORY } from '../constants';

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
    <>
      {/* ============================================ */}
      {/* SEÇÃO 2: CATEGORIA E TIPO */}
      {/* ============================================ */}
      
      {/* Card 2.1+2.2: Categoria e Tipo */}
      <div className="bg-white rounded-xl p-6 border-l-4 border-l-blue-500 border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Tag size={22} className="text-blue-600" />
          Categoria e Tipo do Imóvel
          <span className="ml-auto text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
            Obrigatório
          </span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Categoria
            </label>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Selecione uma categoria</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Tipo de Imóvel
            </label>
            <select
              value={selectedType}
              onChange={handleTypeChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              disabled={!selectedCategory}
            >
              <option value="">Selecione um tipo</option>
              {selectedCategory && PROPERTY_TYPES_BY_CATEGORY[selectedCategory]?.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {selectedType && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
            <Info size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-blue-900 mb-1">
                Campos obrigatórios para: <strong>{selectedType}</strong>
              </p>
              <p className="text-xs text-blue-700">
                Os campos específicos para este tipo de imóvel serão exibidos nas próximas seções.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Card 2.3: Estilo Arquitetônico */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Palette size={22} className="text-purple-600" />
          Estilo Arquitetônico
          <span className="ml-auto text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
            Opcional
          </span>
        </h3>
        <select
          value={model.architecturalStyle}
          onChange={(e) => update('architecturalStyle', e.target.value)}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        >
          <option value="">Selecione um estilo</option>
          {STYLES.map(style => (
            <option key={style} value={style}>{style}</option>
          ))}
        </select>
      </div>

      {/* Card 2.4: Condição e Ano */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Shield size={22} className="text-amber-600" />
          Condição e Ano de Construção
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Condição do Imóvel
            </label>
            <select
              value={model.propertyCondition}
              onChange={(e) => update('propertyCondition', e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="">Selecione a condição</option>
              {PROPERTY_CONDITIONS.map(condition => (
                <option key={condition} value={condition}>{condition}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Ano de Construção
            </label>
            <input
              type="number"
              value={model.yearBuilt}
              onChange={(e) => update('yearBuilt', e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              min={1900}
              max={new Date().getFullYear()}
              placeholder="2020"
            />
          </div>
        </div>
      </div>
    </>
  );
}
