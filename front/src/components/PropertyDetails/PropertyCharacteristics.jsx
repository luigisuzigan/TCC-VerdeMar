import { Maximize2, BedDouble, Bath, Home, Car, Calendar, Building2, Layers } from 'lucide-react';
import { shouldShowField } from '../../utils/propertyFieldsHelper';

/**
 * Componente para exibir informações gerais do imóvel
 * Exibe condicionalmente baseado no tipo de imóvel
 * Inclui todas as informações: área, quartos, banheiros, tipo, ano, vagas, andar, etc.
 */
export default function PropertyCharacteristics({ property, formatCurrency, getPropertyTypeLabel }) {
  const type = property.type;
  
  // Determinar o tipo de imóvel
  const isApartment = property.type?.toLowerCase().includes('apartamento') || 
                      property.type?.toLowerCase().includes('cobertura');
  const isHouse = property.type?.toLowerCase().includes('casa');

  return (
    <div className="mb-6">
      <h3 className="text-xl font-bold text-slate-900 mb-4">Informações Gerais</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Área - sempre exibir */}
        {property.area && (
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-slate-600 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Maximize2 size={20} className="text-purple-600" />
              </div>
              <span className="text-sm font-medium text-slate-600">Área</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">
              {property.area} m²
            </div>
          </div>
        )}

        {/* Quartos - condicional */}
        {shouldShowField(type, 'beds') && property.beds > 0 && (
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-slate-600 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <BedDouble size={20} className="text-blue-600" />
              </div>
              <span className="text-sm font-medium text-slate-600">Quartos</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">
              {property.beds}
            </div>
          </div>
        )}

        {/* Banheiros - condicional */}
        {shouldShowField(type, 'baths') && property.baths > 0 && (
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-slate-600 mb-2">
              <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center">
                <Bath size={20} className="text-cyan-600" />
              </div>
              <span className="text-sm font-medium text-slate-600">Banheiros</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">
              {property.baths}
            </div>
          </div>
        )}

        {/* Suítes - condicional */}
        {shouldShowField(type, 'suites') && property.suites > 0 && (
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-slate-600 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Home size={20} className="text-purple-600" />
              </div>
              <span className="text-sm font-medium text-slate-600">Suítes</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">
              {property.suites}
            </div>
          </div>
        )}

        {/* Vagas - condicional */}
        {shouldShowField(type, 'parkingSpaces') && property.parkingSpaces > 0 && (
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-slate-600 mb-2">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                <Car size={20} className="text-slate-600" />
              </div>
              <span className="text-sm font-medium text-slate-600">Vagas</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">
              {property.parkingSpaces}
            </div>
          </div>
        )}

        {/* Ano de Construção - condicional */}
        {property.yearBuilt && (
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-slate-600 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Calendar size={20} className="text-green-600" />
              </div>
              <span className="text-sm font-medium text-slate-600">Construído</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">
              {property.yearBuilt}
            </div>
          </div>
        )}

        {/* Andar - apenas para apartamentos/coberturas */}
        {isApartment && property.floor && (
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-slate-600 mb-2">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Layers size={20} className="text-indigo-600" />
              </div>
              <span className="text-sm font-medium text-slate-600">Andar</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">
              {property.floor}º {property.totalFloors && `/ ${property.totalFloors}`}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
