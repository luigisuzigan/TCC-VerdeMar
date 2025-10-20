import { BedDouble, Bath, Maximize2, MapPin } from 'lucide-react';

export default function PriceAndStats({ property, formatCurrency }) {
  return (
    <div>
      {/* Endereço e Tipo - Topo */}
      <div className="mb-6">
        <div className="flex items-center gap-3 text-slate-600 mb-3">
          <MapPin size={18} />
          <span className="text-lg">{property.address || `${property.city}, ${property.country}`}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
          {property.title}
        </h1>
      </div>

      {/* Stats Cards - Estilo moderno com cards grandes */}
      <div className="grid grid-cols-3 gap-4 mb-8 bg-slate-50 rounded-2xl p-6 border border-slate-200">
        {/* Quartos */}
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <BedDouble className="text-blue-600" size={24} />
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">{property.beds || 0}</div>
          <div className="text-sm text-slate-600">
            {property.beds === 1 ? 'quarto' : 'quartos'}
          </div>
        </div>

        {/* Banheiros */}
        <div className="text-center">
          <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Bath className="text-teal-600" size={24} />
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">{property.baths || 0}</div>
          <div className="text-sm text-slate-600">
            {property.baths === 1 ? 'banheiro' : 'banheiros'}
          </div>
        </div>

        {/* Área */}
        <div className="text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Maximize2 className="text-purple-600" size={24} />
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">{property.area || 0}</div>
          <div className="text-sm text-slate-600">m²</div>
        </div>
      </div>

      {/* Price Section - Grande e destacado */}
      <div className="mb-8 bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8 border border-blue-100">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm text-slate-600 mb-2">Valor do imóvel</p>
            <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-3">
              {formatCurrency(property.price)}
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <span className="text-base">Estimativa mensal: </span>
              <span className="text-lg font-semibold text-blue-600">
                {formatCurrency(Math.round(property.price * 0.0065))}/mês
              </span>
            </div>
          </div>
          
          {/* Preço por m² */}
          {property.area && (
            <div className="text-right bg-white rounded-xl px-4 py-3 shadow-sm">
              <p className="text-xs text-slate-600 mb-1">Preço/m²</p>
              <p className="text-xl font-bold text-slate-900">
                {formatCurrency(Math.round(property.price / property.area))}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
