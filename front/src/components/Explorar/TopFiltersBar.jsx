import { useState } from 'react';
import { MapPin, DollarSign, Home, Sliders, Search, Sparkles } from 'lucide-react';

export default function TopFiltersBar({ filters, onFilterClick, onSearch }) {
  const [searchText, setSearchText] = useState('');

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
    return 'Tipo de imóvel';
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
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return value;
  };

  const handleSearch = () => {
    if (onSearch) onSearch(searchText);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-4">
      <div className="flex flex-wrap items-center gap-3">
        {/* Search Input */}
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Buscar por endereço, bairro..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Location Filter - NOVO */}
        <button
          onClick={() => onFilterClick('location')}
          className={`flex items-center gap-2 px-4 py-3 border rounded-xl hover:bg-slate-50 transition-colors ${
            filters.location || filters.city
              ? 'border-blue-600 bg-blue-50 text-blue-700'
              : 'border-slate-300 text-slate-700'
          }`}
        >
          <MapPin size={18} />
          <span className="font-medium whitespace-nowrap">{getLocationText()}</span>
        </button>

        {/* Price Filter */}
        <button
          onClick={() => onFilterClick('price')}
          className={`flex items-center gap-2 px-4 py-3 border rounded-xl hover:bg-slate-50 transition-colors ${
            filters.priceMin || filters.priceMax
              ? 'border-blue-600 bg-blue-50 text-blue-700'
              : 'border-slate-300 text-slate-700'
          }`}
        >
          <DollarSign size={18} />
          <span className="font-medium whitespace-nowrap">{getPriceText()}</span>
        </button>

        {/* Property Type Filter */}
        <button
          onClick={() => onFilterClick('propertyType')}
          className={`flex items-center gap-2 px-4 py-3 border rounded-xl hover:bg-slate-50 transition-colors ${
            filters.propertyTypes?.length > 0
              ? 'border-blue-600 bg-blue-50 text-blue-700'
              : 'border-slate-300 text-slate-700'
          }`}
        >
          <Home size={18} />
          <span className="font-medium whitespace-nowrap">{getPropertyTypeText()}</span>
        </button>

        {/* Style Filter - MOVIDO PARA DEPOIS DO TIPO */}
        <button
          onClick={() => onFilterClick('style')}
          className={`hidden lg:flex items-center gap-2 px-4 py-3 border rounded-xl hover:bg-slate-50 transition-colors ${
            filters.styles?.length > 0
              ? 'border-blue-600 bg-blue-50 text-blue-700'
              : 'border-slate-300 text-slate-700'
          }`}
        >
          <Sparkles size={18} />
          <span className="font-medium whitespace-nowrap">{getStyleText()}</span>
        </button>

        {/* Rooms Filter */}
        <button
          onClick={() => onFilterClick('rooms')}
          className={`hidden xl:flex items-center gap-2 px-4 py-3 border rounded-xl hover:bg-slate-50 transition-colors ${
            filters.bedrooms || filters.bathrooms
              ? 'border-blue-600 bg-blue-50 text-blue-700'
              : 'border-slate-300 text-slate-700'
          }`}
        >
          <span className="font-medium whitespace-nowrap">{getRoomsText()}</span>
        </button>

        {/* More Filters Button */}
        <button
          onClick={() => onFilterClick('more')}
          className="flex items-center gap-2 px-4 py-3 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors text-slate-700"
        >
          <Sliders size={18} />
          <span className="font-medium">Mais filtros</span>
        </button>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-sm"
        >
          Buscar
        </button>
      </div>
    </div>
  );
}
