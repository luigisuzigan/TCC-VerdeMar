import { Home, Calendar, Car, Maximize2, BedDouble, Layers } from 'lucide-react';

/**
 * Componente que exibe informações do imóvel de forma CONDICIONAL
 * Mostra apenas o que existe para aquele tipo de imóvel
 */
export default function PropertyInfo({ property, formatCurrency, getPropertyTypeLabel }) {
  // Determinar o tipo de imóvel
  const isApartment = property.type?.toLowerCase().includes('apartamento') || 
                      property.type?.toLowerCase().includes('cobertura');
  const isHouse = property.type?.toLowerCase().includes('casa');

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
      {/* Tipo de Imóvel - SEMPRE */}
      <div className="bg-white rounded-2xl p-5 border-2 border-slate-100 hover:border-blue-200 transition-colors shadow-sm">
        <div className="flex items-center gap-2 text-slate-600 text-sm mb-2">
          <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
            <Home size={16} />
          </div>
          <span className="font-medium">Tipo</span>
        </div>
        <div className="text-lg font-bold text-slate-900">
          {getPropertyTypeLabel(property.type)}
        </div>
      </div>

      {/* Ano de Construção - SE EXISTIR */}
      {property.yearBuilt && (
        <div className="bg-white rounded-2xl p-5 border-2 border-slate-100 hover:border-blue-200 transition-colors shadow-sm">
          <div className="flex items-center gap-2 text-slate-600 text-sm mb-2">
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
              <Calendar size={16} />
            </div>
            <span className="font-medium">Construído</span>
          </div>
          <div className="text-lg font-bold text-slate-900">
            {property.yearBuilt}
          </div>
        </div>
      )}

      {/* Vagas de Garagem - SE EXISTIR */}
      {property.parkingSpaces > 0 && (
        <div className="bg-white rounded-2xl p-5 border-2 border-slate-100 hover:border-blue-200 transition-colors shadow-sm">
          <div className="flex items-center gap-2 text-slate-600 text-sm mb-2">
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
              <Car size={16} />
            </div>
            <span className="font-medium">Vagas</span>
          </div>
          <div className="text-lg font-bold text-slate-900">
            {property.parkingSpaces} {property.parkingSpaces === 1 ? 'vaga' : 'vagas'}
          </div>
        </div>
      )}

      {/* Suítes - SE EXISTIR */}
      {property.suites > 0 && (
        <div className="bg-white rounded-2xl p-5 border-2 border-slate-100 hover:border-blue-200 transition-colors shadow-sm">
          <div className="flex items-center gap-2 text-slate-600 text-sm mb-2">
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
              <BedDouble size={16} />
            </div>
            <span className="font-medium">Suítes</span>
          </div>
          <div className="text-lg font-bold text-slate-900">
            {property.suites} {property.suites === 1 ? 'suíte' : 'suítes'}
          </div>
        </div>
      )}

      {/* Andar - APENAS PARA APARTAMENTOS */}
      {isApartment && property.floor && (
        <div className="bg-white rounded-2xl p-5 border-2 border-slate-100 hover:border-blue-200 transition-colors shadow-sm">
          <div className="flex items-center gap-2 text-slate-600 text-sm mb-2">
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
              <Layers size={16} />
            </div>
            <span className="font-medium">Andar</span>
          </div>
          <div className="text-lg font-bold text-slate-900">
            {property.floor}º andar
            {property.totalFloors && (
              <span className="text-sm text-slate-500 font-normal"> / {property.totalFloors}</span>
            )}
          </div>
        </div>
      )}

      {/* Área Total do Terreno/Lote */}
      {property.totalArea && property.totalArea > 0 && (
        <div className="bg-white rounded-2xl p-5 border-2 border-slate-100 hover:border-blue-200 transition-colors shadow-sm">
          <div className="flex items-center gap-2 text-slate-600 text-sm mb-2">
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
              <Maximize2 size={16} />
            </div>
            <span className="font-medium">Área Total do Terreno</span>
          </div>
          <div className="text-lg font-bold text-slate-900">
            {property.totalArea} m²
          </div>
        </div>
      )}
    </div>
  );
}
