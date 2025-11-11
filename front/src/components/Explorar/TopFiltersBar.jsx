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
    if (filters.totalAreaMin && filters.totalAreaMax) {
      return `${filters.totalAreaMin} - ${filters.totalAreaMax}m²`;
    }
    if (filters.totalAreaMin) {
      return `A partir de ${filters.totalAreaMin}m²`;
    }
    if (filters.totalAreaMax) {
      return `Até ${filters.totalAreaMax}m²`;
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
        return filters.totalAreaMin || filters.totalAreaMax;
      case 'rooms':
        return filters.bedrooms || filters.bathrooms;
      default:
        return false;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
      <div className="flex items-stretch">
        {/* Location Filter */}
        <button
          onClick={() => onFilterClick('location')}
          className={`group relative flex-1 px-6 py-5 transition-all duration-200 border-r border-slate-100 ${
            hasActiveFilter('location') ? 'bg-blue-50/30' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-slate-100 transition-colors ${
              hasActiveFilter('location') ? 'text-blue-600' : 'text-slate-500 group-hover:text-blue-600'
            }`}>
              <MapPin className="w-5 h-5 flex-shrink-0 transition-colors" />
            </div>
            <div className="text-left min-w-0">
              <div className="text-xs font-semibold text-slate-500 mb-0.5">Localização</div>
              <div className={`text-sm font-bold truncate ${
                hasActiveFilter('location') ? 'text-slate-900' : 'text-slate-700'
              }`}>
                {getLocationText()}
              </div>
            </div>
          </div>
        </button>

        {/* Price Filter */}
        <button
          onClick={() => onFilterClick('price')}
          className={`group relative flex-1 px-6 py-5 transition-all duration-200 border-r border-slate-100 ${
            hasActiveFilter('price') ? 'bg-blue-50/30' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-slate-100 transition-colors ${
              hasActiveFilter('price') ? 'text-blue-600' : 'text-slate-500 group-hover:text-blue-600'
            }`}>
              <DollarSign className="w-5 h-5 flex-shrink-0 transition-colors" />
            </div>
            <div className="text-left min-w-0">
              <div className="text-xs font-semibold text-slate-500 mb-0.5">Preço</div>
              <div className={`text-sm font-bold truncate ${
                hasActiveFilter('price') ? 'text-slate-900' : 'text-slate-700'
              }`}>
                {getPriceText()}
              </div>
            </div>
          </div>
        </button>

        {/* Property Type Filter */}
        <button
          onClick={() => onFilterClick('propertyType')}
          className={`group relative flex-1 px-6 py-5 transition-all duration-200 border-r border-slate-100 ${
            hasActiveFilter('propertyType') ? 'bg-blue-50/30' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-slate-100 transition-colors ${
              hasActiveFilter('propertyType') ? 'text-blue-600' : 'text-slate-500 group-hover:text-blue-600'
            }`}>
              <Home className="w-5 h-5 flex-shrink-0 transition-colors" />
            </div>
            <div className="text-left min-w-0">
              <div className="text-xs font-semibold text-slate-500 mb-0.5">Tipo</div>
              <div className={`text-sm font-bold truncate ${
                hasActiveFilter('propertyType') ? 'text-slate-900' : 'text-slate-700'
              }`}>
                {getPropertyTypeText()}
              </div>
            </div>
          </div>
        </button>

        {/* Area Filter */}
        <button
          onClick={() => onFilterClick('area')}
          className={`group relative flex-1 px-6 py-5 transition-all duration-200 border-r border-slate-100 ${
            hasActiveFilter('area') ? 'bg-blue-50/30' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-slate-100 transition-colors ${
              hasActiveFilter('area') ? 'text-blue-600' : 'text-slate-500 group-hover:text-blue-600'
            }`}>
              <Maximize2 className="w-5 h-5 flex-shrink-0 transition-colors" />
            </div>
            <div className="text-left min-w-0">
              <div className="text-xs font-semibold text-slate-500 mb-0.5">Área</div>
              <div className={`text-sm font-bold truncate ${
                hasActiveFilter('area') ? 'text-slate-900' : 'text-slate-700'
              }`}>
                {getAreaText()}
              </div>
            </div>
          </div>
        </button>

        {/* Rooms Filter */}
        <button
          onClick={() => onFilterClick('rooms')}
          className={`group relative flex-1 px-6 py-5 transition-all duration-200 border-r border-slate-100 ${
            hasActiveFilter('rooms') ? 'bg-blue-50/30' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-slate-100 transition-colors ${
              hasActiveFilter('rooms') ? 'text-blue-600' : 'text-slate-500 group-hover:text-blue-600'
            }`}>
              <Bed className="w-5 h-5 flex-shrink-0 transition-colors" />
            </div>
            <div className="text-left min-w-0">
              <div className="text-xs font-semibold text-slate-500 mb-0.5">Quartos</div>
              <div className={`text-sm font-bold truncate ${
                hasActiveFilter('rooms') ? 'text-slate-900' : 'text-slate-700'
              }`}>
                {getRoomsText()}
              </div>
            </div>
          </div>
        </button>

        {/* More Filters Button */}
        <button
          onClick={() => onFilterClick('more')}
          className="group px-6 py-5 transition-all duration-200 border-r border-slate-100"
        >
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-slate-100 text-slate-500 group-hover:text-blue-600 transition-colors">
              <Sliders className="w-5 h-5 transition-colors" />
            </div>
            <span className="text-xs font-semibold text-slate-500 hidden xl:block">Mais Filtros</span>
          </div>
        </button>

        {/* Search Button */}
        <button
          onClick={() => onFilterClick('search')}
          className="flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Search className="w-5 h-5" />
          <span className="hidden sm:inline">Buscar</span>
        </button>
      </div>
    </div>
  );
}
