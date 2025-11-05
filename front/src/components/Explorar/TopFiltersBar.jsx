import { MapPin, DollarSign, Home, Sliders, Bed, Search, Maximize2 } from 'lucide-react';

export default function TopFiltersBar({ filters, onFilterClick }) {
  const getLocationText = () => {
    if (filters.location) return filters.location;
    if (filters.city) return filters.city;
    return 'Localização';
  };

  const getPriceText = () => {
    if (filters.priceMin && filters.priceMax) {
      return `R$ ${formatPrice(filters.priceMin)} - R$ ${formatPrice(filters.priceMax)}`;
    }
    if (filters.priceMin) {
      return `A partir de R$ ${formatPrice(filters.priceMin)}`;
    }
    if (filters.priceMax) {
      return `Até R$ ${formatPrice(filters.priceMax)}`;
    }
    return 'Preço';
  };

  const getPropertyTypeText = () => {
    if (filters.propertyTypes?.length > 0) {
      if (filters.propertyTypes.length === 1) {
        const labels = {
          casa: 'Casa',
          apartamento: 'Apartamento',
          cobertura: 'Cobertura',
          terreno: 'Terreno',
          kitnet: 'Kitnet',
          sobrado: 'Sobrado',
          chacara: 'Chácara',
          comercial: 'Comercial',
          loft: 'Loft',
        };
        return labels[filters.propertyTypes[0]] || filters.propertyTypes[0];
      }
      return `${filters.propertyTypes.length} tipos`;
    }
    return 'Tipo de imóvel';
  };

  const getAreaText = () => {
    if (filters.areaMin && filters.areaMax) {
      return `${filters.areaMin} - ${filters.areaMax}m²`;
    }
    if (filters.areaMin) {
      return `A partir de ${filters.areaMin}m²`;
    }
    if (filters.areaMax) {
      return `Até ${filters.areaMax}m²`;
    }
    return 'Área';
  };

  const getRoomsText = () => {
    const parts = [];
    if (filters.bedrooms) parts.push(`${filters.bedrooms}+ quartos`);
    if (filters.bathrooms) parts.push(`${filters.bathrooms}+ banheiros`);
    if (parts.length > 0) return parts.join(', ');
    return 'Quartos e banheiros';
  };

  const formatPrice = (value) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
    return value;
  };

  const hasActiveFilter = (type) => {
    switch(type) {
      case 'location':
        return filters.location || filters.city;
      case 'price':
        return filters.priceMin || filters.priceMax;
      case 'propertyType':
        return filters.propertyTypes?.length > 0;
      case 'area':
        return filters.areaMin || filters.areaMax;
      case 'rooms':
        return filters.bedrooms || filters.bathrooms;
      default:
        return false;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl border border-slate-200/80 overflow-hidden">
      <div className="flex items-stretch">
        {/* Location Filter */}
        <button
          onClick={() => onFilterClick('location')}
          className={`group relative flex-1 px-5 py-4 transition-all duration-200 hover:bg-slate-50 border-r border-slate-200 ${
            hasActiveFilter('location') ? 'bg-slate-50' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            <MapPin className={`w-5 h-5 flex-shrink-0 transition-colors ${
              hasActiveFilter('location') ? 'text-blue-600' : 'text-slate-400'
            }`} />
            <div className="text-left min-w-0">
              <div className="text-xs font-medium text-slate-500 mb-0.5">Localização</div>
              <div className={`text-sm font-semibold truncate transition-colors ${
                hasActiveFilter('location') ? 'text-slate-900' : 'text-slate-600'
              }`}>
                {getLocationText()}
              </div>
            </div>
          </div>
        </button>

        {/* Price Filter */}
        <button
          onClick={() => onFilterClick('price')}
          className={`group relative flex-1 px-5 py-4 transition-all duration-200 hover:bg-slate-50 border-r border-slate-200 ${
            hasActiveFilter('price') ? 'bg-slate-50' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            <DollarSign className={`w-5 h-5 flex-shrink-0 transition-colors ${
              hasActiveFilter('price') ? 'text-blue-600' : 'text-slate-400'
            }`} />
            <div className="text-left min-w-0">
              <div className="text-xs font-medium text-slate-500 mb-0.5">Preço</div>
              <div className={`text-sm font-semibold truncate transition-colors ${
                hasActiveFilter('price') ? 'text-slate-900' : 'text-slate-600'
              }`}>
                {getPriceText()}
              </div>
            </div>
          </div>
        </button>

        {/* Property Type Filter */}
        <button
          onClick={() => onFilterClick('propertyType')}
          className={`group relative flex-1 px-5 py-4 transition-all duration-200 hover:bg-slate-50 border-r border-slate-200 ${
            hasActiveFilter('propertyType') ? 'bg-slate-50' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            <Home className={`w-5 h-5 flex-shrink-0 transition-colors ${
              hasActiveFilter('propertyType') ? 'text-blue-600' : 'text-slate-400'
            }`} />
            <div className="text-left min-w-0">
              <div className="text-xs font-medium text-slate-500 mb-0.5">Tipo</div>
              <div className={`text-sm font-semibold truncate transition-colors ${
                hasActiveFilter('propertyType') ? 'text-slate-900' : 'text-slate-600'
              }`}>
                {getPropertyTypeText()}
              </div>
            </div>
          </div>
        </button>

        {/* Area Filter */}
        <button
          onClick={() => onFilterClick('area')}
          className={`group relative flex-1 px-5 py-4 transition-all duration-200 hover:bg-slate-50 border-r border-slate-200 ${
            hasActiveFilter('area') ? 'bg-slate-50' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            <Maximize2 className={`w-5 h-5 flex-shrink-0 transition-colors ${
              hasActiveFilter('area') ? 'text-blue-600' : 'text-slate-400'
            }`} />
            <div className="text-left min-w-0">
              <div className="text-xs font-medium text-slate-500 mb-0.5">Área</div>
              <div className={`text-sm font-semibold truncate transition-colors ${
                hasActiveFilter('area') ? 'text-slate-900' : 'text-slate-600'
              }`}>
                {getAreaText()}
              </div>
            </div>
          </div>
        </button>

        {/* Rooms Filter */}
        <button
          onClick={() => onFilterClick('rooms')}
          className={`group relative flex-1 px-5 py-4 transition-all duration-200 hover:bg-slate-50 border-r border-slate-200 ${
            hasActiveFilter('rooms') ? 'bg-slate-50' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            <Bed className={`w-5 h-5 flex-shrink-0 transition-colors ${
              hasActiveFilter('rooms') ? 'text-blue-600' : 'text-slate-400'
            }`} />
            <div className="text-left min-w-0">
              <div className="text-xs font-medium text-slate-500 mb-0.5">Quartos</div>
              <div className={`text-sm font-semibold truncate transition-colors ${
                hasActiveFilter('rooms') ? 'text-slate-900' : 'text-slate-600'
              }`}>
                {getRoomsText()}
              </div>
            </div>
          </div>
        </button>

        {/* More Filters Button */}
        <button
          onClick={() => onFilterClick('more')}
          className="group px-5 py-4 transition-all duration-200 hover:bg-slate-50 border-r border-slate-200"
        >
          <Sliders className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
        </button>

        {/* Search Button */}
        <button
          onClick={() => onFilterClick('search')}
          className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-200"
        >
          <span>Search</span>
        </button>
      </div>
    </div>
  );
}
