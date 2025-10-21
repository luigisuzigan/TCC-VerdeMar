import { Maximize2, BedDouble, Bath, Home, Car } from 'lucide-react';
import { shouldShowField } from '../../utils/propertyFieldsHelper';

/**
 * Componente para exibir características principais do imóvel
 * Exibe condicionalmente baseado no tipo de imóvel
 */
export default function PropertyCharacteristics({ property }) {
  const type = property.type;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-6">
      <h3 className="text-lg font-bold text-slate-900 mb-4">Características</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Área - sempre exibir */}
        {property.area && (
          <div className="flex flex-col items-center p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
              <Maximize2 size={24} className="text-emerald-600" />
            </div>
            <span className="text-2xl font-bold text-slate-900">{property.area}</span>
            <span className="text-xs text-slate-600">m²</span>
          </div>
        )}

        {/* Área do Lote - apenas para casas, sobrados, terrenos */}
        {shouldShowField(type, 'lotSize') && property.lotSize && (
          <div className="flex flex-col items-center p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-2">
              <Maximize2 size={24} className="text-amber-600" />
            </div>
            <span className="text-2xl font-bold text-slate-900">{property.lotSize}</span>
            <span className="text-xs text-slate-600">m² terreno</span>
          </div>
        )}

        {/* Quartos - condicional */}
        {shouldShowField(type, 'beds') && property.beds > 0 && (
          <div className="flex flex-col items-center p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <BedDouble size={24} className="text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-slate-900">{property.beds}</span>
            <span className="text-xs text-slate-600">
              {property.beds === 1 ? 'quarto' : 'quartos'}
            </span>
          </div>
        )}

        {/* Banheiros - condicional */}
        {shouldShowField(type, 'baths') && property.baths > 0 && (
          <div className="flex flex-col items-center p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
            <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mb-2">
              <Bath size={24} className="text-cyan-600" />
            </div>
            <span className="text-2xl font-bold text-slate-900">{property.baths}</span>
            <span className="text-xs text-slate-600">
              {property.baths === 1 ? 'banheiro' : 'banheiros'}
            </span>
          </div>
        )}

        {/* Suítes - condicional */}
        {shouldShowField(type, 'suites') && property.suites > 0 && (
          <div className="flex flex-col items-center p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
              <Home size={24} className="text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-slate-900">{property.suites}</span>
            <span className="text-xs text-slate-600">
              {property.suites === 1 ? 'suíte' : 'suítes'}
            </span>
          </div>
        )}

        {/* Vagas - condicional */}
        {shouldShowField(type, 'parkingSpaces') && property.parkingSpaces > 0 && (
          <div className="flex flex-col items-center p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
            <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center mb-2">
              <Car size={24} className="text-slate-600" />
            </div>
            <span className="text-2xl font-bold text-slate-900">{property.parkingSpaces}</span>
            <span className="text-xs text-slate-600">
              {property.parkingSpaces === 1 ? 'vaga' : 'vagas'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
