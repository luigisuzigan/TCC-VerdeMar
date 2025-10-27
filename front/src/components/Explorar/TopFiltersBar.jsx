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
        };
        return labels[filters.propertyTypes[0]] || filters.propertyTypes[0];
      }
      return `${filters.propertyTypes.length} tipos`;
    }
    return 'Selecione';
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
    <div className="bg-white rounded-full shadow-lg border border-slate-200/80 p-1.5 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-0">
        {/* Location Filter */}
        <button
          onClick={() => onFilterClick('location')}
          className={`group relative flex-1 px-6 py-3.5 rounded-full transition-all duration-300 hover:bg-slate-50 ${
            hasActiveFilter('location') ? 'bg-slate-50' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            <MapPin className={`w-5 h-5 transition-colors ${
              hasActiveFilter('location') ? 'text-emerald-600' : 'text-slate-400'
            }`} />
            <div className="text-left">
              <div className="text-xs font-semibold text-slate-900">Localização</div>
              <div className={`text-sm transition-colors ${
                hasActiveFilter('location') ? 'text-emerald-600 font-medium' : 'text-slate-500'
              }`}>
                {getLocationText()}
              </div>
            </div>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-slate-200"></div>
        </button>

        {/* Price Filter */}
        <button
          onClick={() => onFilterClick('price')}
          className={`group relative flex-1 px-6 py-3.5 rounded-full transition-all duration-300 hover:bg-slate-50 ${
            hasActiveFilter('price') ? 'bg-slate-50' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            <DollarSign className={`w-5 h-5 transition-colors ${
              hasActiveFilter('price') ? 'text-emerald-600' : 'text-slate-400'
            }`} />
            <div className="text-left">
              <div className="text-xs font-semibold text-slate-900">Preço</div>
              <div className={`text-sm transition-colors ${
                hasActiveFilter('price') ? 'text-emerald-600 font-medium' : 'text-slate-500'
              }`}>
                {getPriceText()}
              </div>
            </div>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-slate-200"></div>
        </button>

        {/* Property Type Filter */}
        <button
          onClick={() => onFilterClick('propertyType')}
          className={`group relative flex-1 px-6 py-3.5 rounded-full transition-all duration-300 hover:bg-slate-50 ${
            hasActiveFilter('propertyType') ? 'bg-slate-50' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            <Home className={`w-5 h-5 transition-colors ${
              hasActiveFilter('propertyType') ? 'text-emerald-600' : 'text-slate-400'
            }`} />
            <div className="text-left">
              <div className="text-xs font-semibold text-slate-900">Tipo</div>
              <div className={`text-sm transition-colors ${
                hasActiveFilter('propertyType') ? 'text-emerald-600 font-medium' : 'text-slate-500'
              }`}>
                {getPropertyTypeText()}
              </div>
            </div>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-slate-200"></div>
        </button>

        {/* Area Filter */}
        <button
          onClick={() => onFilterClick('area')}
          className={`group relative flex-1 px-6 py-3.5 rounded-full transition-all duration-300 hover:bg-slate-50 ${
            hasActiveFilter('area') ? 'bg-slate-50' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            <Maximize2 className={`w-5 h-5 transition-colors ${
              hasActiveFilter('area') ? 'text-emerald-600' : 'text-slate-400'
            }`} />
            <div className="text-left">
              <div className="text-xs font-semibold text-slate-900">Área</div>
              <div className={`text-sm transition-colors ${
                hasActiveFilter('area') ? 'text-emerald-600 font-medium' : 'text-slate-500'
              }`}>
                {getAreaText()}
              </div>
            </div>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-slate-200 hidden lg:block"></div>
        </button>

        {/* Rooms Filter - Hidden on mobile */}
        <button
          onClick={() => onFilterClick('rooms')}
          className={`group relative hidden lg:flex flex-1 px-6 py-3.5 rounded-full transition-all duration-300 hover:bg-slate-50 ${
            hasActiveFilter('rooms') ? 'bg-slate-50' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            <Bed className={`w-5 h-5 transition-colors ${
              hasActiveFilter('rooms') ? 'text-emerald-600' : 'text-slate-400'
            }`} />
            <div className="text-left">
              <div className="text-xs font-semibold text-slate-900">Quartos</div>
              <div className={`text-sm transition-colors ${
                hasActiveFilter('rooms') ? 'text-emerald-600 font-medium' : 'text-slate-500'
              }`}>
                {getRoomsText()}
              </div>
            </div>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-slate-200"></div>
        </button>

        {/* More Filters Button */}
        <button
          onClick={() => onFilterClick('more')}
          className="group px-5 py-3.5 rounded-full transition-all duration-300 hover:bg-slate-50"
        >
          <Sliders className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
        </button>

        {/* Search Button */}
        <button
          onClick={() => onFilterClick('search')}
          className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:scale-105 active:scale-95"
        >
          <Search className="w-5 h-5" />
          <span className="hidden sm:inline">Buscar</span>
        </button>
      </div>
    </div>
  );
}
