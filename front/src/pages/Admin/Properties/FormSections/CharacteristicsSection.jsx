import { Layers, Ruler, Bed, Bath, Crown, Car, Info } from 'lucide-react';
import { shouldShowField, isFieldRequired } from '../../../../utils/propertyFieldsHelper';

export default function CharacteristicsSection({ 
  model, 
  update, 
  selectedType 
}) {
  return (
    <>
      {/* Card 6.1: Estrutura do Prédio - Condicional */}
      {(shouldShowField(selectedType, 'floor') || shouldShowField(selectedType, 'totalFloors')) && (
        <div className="bg-white rounded-xl p-6 border-l-4 border-l-indigo-500 border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Layers size={22} className="text-indigo-600" />
            Estrutura do Prédio
            <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
              Condicional
            </span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Andar - Condicional */}
            {shouldShowField(selectedType, 'floor') && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  Andar 
                  {isFieldRequired(selectedType, 'floor') && (
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
                      Obrigatório
                    </span>
                  )}
                </label>
                <input 
                  type="number"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={model.floor || ''} 
                  onChange={(e) => update('floor', e.target.value)}
                  min={0}
                  placeholder="Ex: 5"
                  required={isFieldRequired(selectedType, 'floor')}
                />
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <Info size={12} />
                  Andar onde está localizado o imóvel
                </p>
              </div>
            )}

            {/* Total de Andares - Condicional */}
            {shouldShowField(selectedType, 'totalFloors') && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  Total de Andares 
                  {isFieldRequired(selectedType, 'totalFloors') && (
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
                      Obrigatório
                    </span>
                  )}
                </label>
                <input 
                  type="number"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={model.totalFloors || ''} 
                  onChange={(e) => update('totalFloors', e.target.value)}
                  min={1}
                  placeholder="Ex: 12"
                  required={isFieldRequired(selectedType, 'totalFloors')}
                />
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <Info size={12} />
                  Total de andares do prédio (ou da casa para sobrados)
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Card 6.2: Área do Lote - Condicional e OPCIONAL */}
      {shouldShowField(selectedType, 'lotSize') && (
        <div className="bg-white rounded-xl p-6 border-l-4 border-l-amber-500 border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Ruler size={22} className="text-amber-600" />
            Área do Lote/Terreno
            <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
              Opcional
            </span>
          </h3>
          <input 
            type="number"
            step="0.01"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-lg"
            value={model.lotSize || ''} 
            onChange={(e) => update('lotSize', e.target.value)}
            min={0}
            placeholder="500"
            required={false}
          />
          <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
            <Info size={12} />
            {selectedType.includes('Terreno') 
              ? 'Para terrenos, este valor geralmente é igual à Área total'
              : 'Área total do lote (pode ser maior que a área construída)'
            }
          </p>
        </div>
      )}

      {/* Card 6.3: Quartos - Condicional */}
      {shouldShowField(selectedType, 'beds') && (
        <div className="bg-white rounded-xl p-6 border-l-4 border-l-purple-500 border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Bed size={22} className="text-purple-600" />
            Quartos
            {isFieldRequired(selectedType, 'beds') && (
              <span className="ml-auto text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
                Obrigatório
              </span>
            )}
          </h3>
          <input 
            type="number"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg"
            value={model.beds || ''} 
            onChange={(e) => update('beds', e.target.value)}
            min={0}
            placeholder="2"
            required={isFieldRequired(selectedType, 'beds')}
          />
        </div>
      )}

      {/* Card 6.4: Banheiros - Condicional */}
      {shouldShowField(selectedType, 'baths') && (
        <div className="bg-white rounded-xl p-6 border-l-4 border-l-cyan-500 border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Bath size={22} className="text-cyan-600" />
            Banheiros
            {isFieldRequired(selectedType, 'baths') && (
              <span className="ml-auto text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
                Obrigatório
              </span>
            )}
          </h3>
          <input 
            type="number"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-lg"
            value={model.baths || ''} 
            onChange={(e) => update('baths', e.target.value)}
            min={0}
            placeholder="1"
            required={isFieldRequired(selectedType, 'baths')}
          />
        </div>
      )}

      {/* Card 6.5: Suítes - Condicional */}
      {shouldShowField(selectedType, 'suites') && (
        <div className="bg-white rounded-xl p-6 border-l-4 border-l-pink-500 border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Crown size={22} className="text-pink-600" />
            Suítes
            {isFieldRequired(selectedType, 'suites') && (
              <span className="ml-auto text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
                Obrigatório
              </span>
            )}
          </h3>
          <input 
            type="number"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-lg"
            value={model.suites || ''} 
            onChange={(e) => update('suites', e.target.value)}
            min={0}
            placeholder="1"
            required={isFieldRequired(selectedType, 'suites')}
          />
          <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
            <Info size={12} />
            Quartos com banheiro privativo
          </p>
        </div>
      )}

      {/* Card 6.6: Vagas - Condicional */}
      {shouldShowField(selectedType, 'parkingSpaces') && (
        <div className="bg-white rounded-xl p-6 border-l-4 border-l-slate-500 border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Car size={22} className="text-slate-600" />
            Vagas de Garagem
            {isFieldRequired(selectedType, 'parkingSpaces') && (
              <span className="ml-auto text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
                Obrigatório
              </span>
            )}
          </h3>
          <input 
            type="number"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-lg"
            value={model.parkingSpaces || ''} 
            onChange={(e) => update('parkingSpaces', e.target.value)}
            min={0}
            placeholder="2"
            required={isFieldRequired(selectedType, 'parkingSpaces')}
          />
        </div>
      )}
    </>
  );
}
