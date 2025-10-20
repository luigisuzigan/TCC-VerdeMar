import { BedDouble, Bath, Maximize2 } from 'lucide-react';

export default function PriceAndStats({ property, formatCurrency }) {
  // Construir endereço completo
  const getFullAddress = () => {
    const parts = [];
    
    if (property.address) parts.push(property.address);
    if (property.city) parts.push(property.city);
    if (property.state) parts.push(property.state);
    if (property.zipCode) parts.push(property.zipCode);
    
    return parts.join(', ') || 'Endereço não disponível';
  };

  return (
    <div>
      {/* Header - Preço e Endereço (estilo Zillow) */}
      <div className="mb-6">
        {/* Preço Principal */}
        <div className="flex items-baseline gap-4 mb-4">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
            {formatCurrency(property.price)}
          </h1>
          {property.area && (
            <span className="text-xl text-slate-600">
              {formatCurrency(Math.round(property.price / property.area))}/m²
            </span>
          )}
        </div>

        {/* Stats Inline (bd | ba | sqft) */}
        <div className="flex items-center gap-4 mb-4 text-lg">
          <div className="flex items-center gap-2">
            <BedDouble size={20} className="text-slate-600" />
            <span className="font-semibold text-slate-900">{property.beds || 0}</span>
            <span className="text-slate-600">quartos</span>
          </div>
          <span className="text-slate-400">|</span>
          <div className="flex items-center gap-2">
            <Bath size={20} className="text-slate-600" />
            <span className="font-semibold text-slate-900">{property.baths || 0}</span>
            <span className="text-slate-600">banheiros</span>
          </div>
          <span className="text-slate-400">|</span>
          <div className="flex items-center gap-2">
            <Maximize2 size={20} className="text-slate-600" />
            <span className="font-semibold text-slate-900">{property.area || 0}</span>
            <span className="text-slate-600">m²</span>
          </div>
        </div>

        {/* Endereço Completo */}
        <p className="text-xl text-slate-900 mb-1">
          {getFullAddress()}
        </p>

        {/* Tipo de Imóvel */}
        {property.type && (
          <p className="text-base text-slate-600">
            {property.type}
          </p>
        )}
      </div>

      {/* Estimativa Mensal e Info Extra */}
      <div className="flex flex-wrap items-center gap-6 py-4 border-y border-slate-200">
        <div>
          <p className="text-sm text-slate-600">Estimativa mensal</p>
          <p className="text-2xl font-bold text-blue-600">
            {formatCurrency(Math.round(property.price * 0.0065))}/mês
          </p>
        </div>

        {/* Gasto Total Mensal (se houver condomínio) */}
        {property.condoFee && (
          <>
            <div className="h-8 w-px bg-slate-300"></div>
            <div>
              <p className="text-sm text-slate-600">Gasto total mensal</p>
              <p className="text-2xl font-bold text-emerald-600">
                {formatCurrency(Math.round(property.price * 0.0065) + property.condoFee)}/mês
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Financiamento + Condomínio
              </p>
            </div>
          </>
        )}

        {property.rating > 0 && (
          <>
            <div className="h-8 w-px bg-slate-300"></div>
            <div>
              <p className="text-sm text-slate-600">Avaliação do Imóvel</p>
              <p className="text-lg font-semibold text-slate-900">
                ⭐ {property.rating.toFixed(1)}/10
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
