export default function PriceAndStats({ property, formatCurrency }) {
  // Construir endereço completo com país
  const getFullAddress = () => {
    const parts = [];
    
    if (property.address) parts.push(property.address);
    if (property.city) parts.push(property.city);
    if (property.state) parts.push(property.state);
    if (property.zipCode) parts.push(property.zipCode);
    if (property.country) parts.push(property.country);
    
    return parts.join(', ') || 'Endereço não disponível';
  };

  return (
    <div className="mb-6">
      {/* Preço Principal */}
      <div className="flex items-baseline gap-4 mb-4">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
          {formatCurrency(property.price)}
        </h1>
        {property.totalArea && (
          <span className="text-xl text-slate-600">
            {formatCurrency(Math.round(property.price / property.totalArea))}/m²
          </span>
        )}
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
  );
}
