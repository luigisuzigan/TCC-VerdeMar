import { MapPin, DollarSign, Home, Sliders, Bed, Search, Maximize2, Sparkles } from 'lucide-react';

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

  const getStyleText = () => {
    if (filters.styles?.length > 0) {
      if (filters.styles.length === 1) {
        return filters.styles[0];
      }
      return `${filters.styles.length} estilos`;
    }
    return 'Estilo';
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
      case 'style':
        return filters.styles?.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/50 overflow-hidden backdrop-blur-sm">
      <div className="flex items-stretch overflow-x-auto">
        {/* Location Filter */}
        <button
          onClick={() => onFilterClick('location')}
          className={`group relative flex-1 min-w-[140px] px-2 sm:px-3 lg:px-4 py-3.5 transition-all duration-200 border-r border-slate-100 ${
            hasActiveFilter('location') 
              ? 'bg-gradient-to-br from-cyan-50 to-blue-50' 
              : 'hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg transition-all flex-shrink-0 ${
              hasActiveFilter('location') 
                ? 'bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/30' 
                : 'bg-slate-100 group-hover:bg-cyan-50'
            }`}>
              <MapPin className={`w-4 h-4 transition-colors ${
                hasActiveFilter('location') ? 'text-white' : 'text-slate-500 group-hover:text-cyan-600'
              }`} />
            </div>
            <div className="text-left min-w-0 flex-1">
              <div className="text-xs font-medium text-slate-500 mb-0.5 hidden sm:block">Localização</div>
              <div className={`text-sm font-bold truncate transition-colors ${
                hasActiveFilter('location') 
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent' 
                  : 'text-slate-700'
              }`}>
                {getLocationText()}
              </div>
            </div>
          </div>
        </button>

        {/* Price Filter */}
        <button
          onClick={() => onFilterClick('price')}
          className={`group relative flex-1 min-w-[140px] px-2 sm:px-3 lg:px-4 py-3.5 transition-all duration-200 border-r border-slate-100 ${
            hasActiveFilter('price') 
              ? 'bg-gradient-to-br from-cyan-50 to-blue-50' 
              : 'hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg transition-all flex-shrink-0 ${
              hasActiveFilter('price') 
                ? 'bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/30' 
                : 'bg-slate-100 group-hover:bg-cyan-50'
            }`}>
              <DollarSign className={`w-4 h-4 transition-colors ${
                hasActiveFilter('price') ? 'text-white' : 'text-slate-500 group-hover:text-cyan-600'
              }`} />
            </div>
            <div className="text-left min-w-0 flex-1">
              <div className="text-xs font-medium text-slate-500 mb-0.5 hidden sm:block">Preço</div>
              <div className={`text-sm font-bold truncate transition-colors ${
                hasActiveFilter('price') 
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent' 
                  : 'text-slate-700'
              }`}>
                {getPriceText()}
              </div>
            </div>
          </div>
        </button>

        {/* Property Type Filter */}
        <button
          onClick={() => onFilterClick('propertyType')}
          className={`group relative flex-1 min-w-[120px] px-2 sm:px-3 lg:px-4 py-3.5 transition-all duration-200 border-r border-slate-100 ${
            hasActiveFilter('propertyType') 
              ? 'bg-gradient-to-br from-cyan-50 to-blue-50' 
              : 'hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg transition-all flex-shrink-0 ${
              hasActiveFilter('propertyType') 
                ? 'bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/30' 
                : 'bg-slate-100 group-hover:bg-cyan-50'
            }`}>
              <Home className={`w-4 h-4 transition-colors ${
                hasActiveFilter('propertyType') ? 'text-white' : 'text-slate-500 group-hover:text-cyan-600'
              }`} />
            </div>
            <div className="text-left min-w-0 flex-1">
              <div className="text-xs font-medium text-slate-500 mb-0.5 hidden sm:block">Tipo</div>
              <div className={`text-sm font-bold truncate transition-colors ${
                hasActiveFilter('propertyType') 
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent' 
                  : 'text-slate-700'
              }`}>
                {getPropertyTypeText()}
              </div>
            </div>
          </div>
        </button>

        {/* Area Filter */}
        <button
          onClick={() => onFilterClick('area')}
          className={`group relative flex-1 min-w-[120px] px-2 sm:px-3 lg:px-4 py-3.5 transition-all duration-200 border-r border-slate-100 ${
            hasActiveFilter('area') 
              ? 'bg-gradient-to-br from-cyan-50 to-blue-50' 
              : 'hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg transition-all flex-shrink-0 ${
              hasActiveFilter('area') 
                ? 'bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/30' 
                : 'bg-slate-100 group-hover:bg-cyan-50'
            }`}>
              <Maximize2 className={`w-4 h-4 transition-colors ${
                hasActiveFilter('area') ? 'text-white' : 'text-slate-500 group-hover:text-cyan-600'
              }`} />
            </div>
            <div className="text-left min-w-0 flex-1">
              <div className="text-xs font-medium text-slate-500 mb-0.5 hidden sm:block">Área</div>
              <div className={`text-sm font-bold truncate transition-colors ${
                hasActiveFilter('area') 
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent' 
                  : 'text-slate-700'
              }`}>
                {getAreaText()}
              </div>
            </div>
          </div>
        </button>

        {/* Rooms Filter */}
        <button
          onClick={() => onFilterClick('rooms')}
          className={`group relative flex-1 min-w-[140px] px-2 sm:px-3 lg:px-4 py-3.5 transition-all duration-200 border-r border-slate-100 ${
            hasActiveFilter('rooms') 
              ? 'bg-gradient-to-br from-cyan-50 to-blue-50' 
              : 'hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg transition-all flex-shrink-0 ${
              hasActiveFilter('rooms') 
                ? 'bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/30' 
                : 'bg-slate-100 group-hover:bg-cyan-50'
            }`}>
              <Bed className={`w-4 h-4 transition-colors ${
                hasActiveFilter('rooms') ? 'text-white' : 'text-slate-500 group-hover:text-cyan-600'
              }`} />
            </div>
            <div className="text-left min-w-0 flex-1">
              <div className="text-xs font-medium text-slate-500 mb-0.5 hidden sm:block">Quartos</div>
              <div className={`text-sm font-bold truncate transition-colors ${
                hasActiveFilter('rooms') 
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent' 
                  : 'text-slate-700'
              }`}>
                {getRoomsText()}
              </div>
            </div>
          </div>
        </button>

        {/* Style Filter */}
        <button
          onClick={() => onFilterClick('style')}
          className={`group relative flex-1 min-w-[120px] px-2 sm:px-3 lg:px-4 py-3.5 transition-all duration-200 border-r border-slate-100 ${
            hasActiveFilter('style') 
              ? 'bg-gradient-to-br from-cyan-50 to-blue-50' 
              : 'hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg transition-all flex-shrink-0 ${
              hasActiveFilter('style') 
                ? 'bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/30' 
                : 'bg-slate-100 group-hover:bg-cyan-50'
            }`}>
              <Sparkles className={`w-4 h-4 transition-colors ${
                hasActiveFilter('style') ? 'text-white' : 'text-slate-500 group-hover:text-cyan-600'
              }`} />
            </div>
            <div className="text-left min-w-0 flex-1">
              <div className="text-xs font-medium text-slate-500 mb-0.5 hidden sm:block">Estilo</div>
              <div className={`text-sm font-bold truncate transition-colors ${
                hasActiveFilter('style') 
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent' 
                  : 'text-slate-700'
              }`}>
                {getStyleText()}
              </div>
            </div>
          </div>
        </button>

        {/* More Filters Button */}
        <button
          onClick={() => onFilterClick('more')}
          className={`group relative flex-1 min-w-[80px] px-2 sm:px-3 lg:px-4 py-3.5 transition-all duration-200 border-r border-slate-100 ${
            hasActiveFilter('more') 
              ? 'bg-gradient-to-br from-cyan-50 to-blue-50' 
              : 'hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg transition-all flex-shrink-0 ${
              hasActiveFilter('more') 
                ? 'bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/30' 
                : 'bg-slate-100 group-hover:bg-cyan-50'
            }`}>
              <Sliders className={`w-4 h-4 transition-colors ${
                hasActiveFilter('more') ? 'text-white' : 'text-slate-500 group-hover:text-cyan-600'
              }`} />
            </div>
            <div className="text-left min-w-0 flex-1 hidden sm:block">
              <div className="text-xs font-medium text-slate-500 mb-0.5">Mais</div>
              <div className={`text-sm font-bold truncate transition-colors ${
                hasActiveFilter('more') 
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent' 
                  : 'text-slate-700'
              }`}>
                Filtros
              </div>
            </div>
          </div>
        </button>

        {/* Search Button */}
        <button
          onClick={() => onFilterClick('search')}
          className="flex items-center justify-center gap-2 px-4 sm:px-6 lg:px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold transition-all duration-200 shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 whitespace-nowrap min-w-fit"
        >
          <Search className="w-4 h-4 flex-shrink-0" />
          <span className="hidden sm:inline">Buscar</span>
        </button>
      </div>
    </div>
  );
}
