import { Home, Calendar, Car, Maximize2, Landmark } from 'lucide-react';

export default function PropertyInfo({ property, formatCurrency, getPropertyTypeLabel }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
      {/* Property Type */}
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

      {/* Year Built */}
      <div className="bg-white rounded-2xl p-5 border-2 border-slate-100 hover:border-blue-200 transition-colors shadow-sm">
        <div className="flex items-center gap-2 text-slate-600 text-sm mb-2">
          <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
            <Calendar size={16} />
          </div>
          <span className="font-medium">Construído</span>
        </div>
        <div className="text-lg font-bold text-slate-900">
          {property.yearBuilt || '2024'}
        </div>
      </div>

      {/* Parking */}
      {property.parkingSpaces ? (
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
      ) : null}

      {/* Lot Size */}
      {property.lotSize ? (
        <div className="bg-white rounded-2xl p-5 border-2 border-slate-100 hover:border-blue-200 transition-colors shadow-sm">
          <div className="flex items-center gap-2 text-slate-600 text-sm mb-2">
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
              <Maximize2 size={16} />
            </div>
            <span className="font-medium">Lote</span>
          </div>
          <div className="text-lg font-bold text-slate-900">
            {property.lotSize} m²
          </div>
        </div>
      ) : null}

      {/* HOA */}
      <div className="bg-white rounded-2xl p-5 border-2 border-slate-100 hover:border-blue-200 transition-colors shadow-sm">
        <div className="flex items-center gap-2 text-slate-600 text-sm mb-2">
          <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
            <Landmark size={16} />
          </div>
          <span className="font-medium">Condomínio</span>
        </div>
        <div className="text-lg font-bold text-slate-900">
          {property.hoa ? formatCurrency(property.hoa) : 'R$ 0'}
        </div>
      </div>
    </div>
  );
}
