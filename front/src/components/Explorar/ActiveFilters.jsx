import { X, Trash2, MapPin, Filter } from 'lucide-react';
import './ActiveFilters.module.css';

export default function ActiveFilters({ filters, onRemove, onClearAll, filteredPropertyIds }) {
  const getFilterItems = () => {
    const items = [];

    // Área Desenhada no Mapa (prioridade máxima)
    if (filteredPropertyIds && filteredPropertyIds.length > 0) {
      items.push({
        key: 'map-area',
        label: `${filteredPropertyIds.length} ${filteredPropertyIds.length === 1 ? 'imóvel' : 'imóveis'} na área selecionada`,
        icon: MapPin,
        iconColor: 'text-emerald-600',
        color: 'emerald',
        featured: true,
        onRemove: () => {
          if (onRemove) {
            onRemove('mapArea', null);
          }
        },
      });
    }

    // Location (cidade/bairro)
    if (filters.location) {
      items.push({
        key: 'location',
        label: filters.location,
        icon: MapPin,
        iconColor: 'text-blue-600',
        color: 'blue',
        onRemove: () => onRemove('location', ''),
      });
    }

    // Property Types
    if (filters.propertyTypes?.length > 0) {
      filters.propertyTypes.forEach((type) => {
        items.push({
          key: `type-${type}`,
          label: getPropertyTypeLabel(type),
          icon: null,
          emoji: '🏠',
          iconColor: 'text-purple-600',
          color: 'purple',
          onRemove: () => {
            const updated = filters.propertyTypes.filter((t) => t !== type);
            onRemove('propertyTypes', updated);
          },
        });
      });
    }

    // Price Range
    if (filters.priceMin || filters.priceMax) {
      let label = '';
      if (filters.priceMin && filters.priceMax) {
        label = `${formatCurrency(filters.priceMin)} - ${formatCurrency(filters.priceMax)}`;
      } else if (filters.priceMin) {
        label = `A partir de ${formatCurrency(filters.priceMin)}`;
      } else {
        label = `Até ${formatCurrency(filters.priceMax)}`;
      }
      items.push({
        key: 'price',
        label,
        icon: null,
        emoji: '💰',
        iconColor: 'text-green-600',
        color: 'green',
        onRemove: () => {
          // ✅ FIX: Remover ambos de uma vez criando novo objeto
          onRemove('priceRange', { priceMin: '', priceMax: '' });
        },
      });
    }

    // Area
    if (filters.areaMin || filters.areaMax) {
      let label = '';
      if (filters.areaMin && filters.areaMax) {
        label = `${filters.areaMin}m² - ${filters.areaMax}m²`;
      } else if (filters.areaMin) {
        label = `A partir de ${filters.areaMin}m²`;
      } else {
        label = `Até ${filters.areaMax}m²`;
      }
      items.push({
        key: 'area',
        label,
        icon: null,
        emoji: '📐',
        iconColor: 'text-amber-600',
        color: 'amber',
        onRemove: () => {
          // ✅ FIX: Remover ambos de uma vez criando novo objeto
          onRemove('areaRange', { areaMin: '', areaMax: '' });
        },
      });
    }

    // Bedrooms
    if (filters.bedrooms) {
      items.push({
        key: 'bedrooms',
        label: `${filters.bedrooms}+ quarto${filters.bedrooms > 1 ? 's' : ''}`,
        icon: null,
        emoji: '🛏',
        iconColor: 'text-rose-600',
        color: 'rose',
        onRemove: () => onRemove('bedrooms', null),
      });
    }

    // Bathrooms
    if (filters.bathrooms) {
      items.push({
        key: 'bathrooms',
        label: `${filters.bathrooms}+ banheiro${filters.bathrooms > 1 ? 's' : ''}`,
        icon: null,
        emoji: '🚿',
        iconColor: 'text-cyan-600',
        color: 'cyan',
        onRemove: () => onRemove('bathrooms', null),
      });
    }

    // Parking
    if (filters.parkingSpaces !== null && filters.parkingSpaces !== undefined) {
      items.push({
        key: 'parking',
        label: `${filters.parkingSpaces}${filters.parkingSpaces > 0 ? '+' : ''} vaga${filters.parkingSpaces !== 1 ? 's' : ''}`,
        icon: null,
        emoji: '🚗',
        iconColor: 'text-slate-600',
        color: 'slate',
        onRemove: () => onRemove('parkingSpaces', null),
      });
    }

    // Suites
    if (filters.suites !== null && filters.suites !== undefined) {
      items.push({
        key: 'suites',
        label: `${filters.suites}${filters.suites > 0 ? '+' : ''} suíte${filters.suites !== 1 ? 's' : ''}`,
        icon: null,
        emoji: '🛁',
        iconColor: 'text-indigo-600',
        color: 'indigo',
        onRemove: () => onRemove('suites', null),
      });
    }

    // Amenities
    if (filters.amenities?.length > 0) {
      filters.amenities.forEach((amenity) => {
        items.push({
          key: `amenity-${amenity}`,
          label: amenity,
          icon: null,
          emoji: '✨',
          iconColor: 'text-violet-600',
          color: 'violet',
          onRemove: () => {
            const updated = filters.amenities.filter((a) => a !== amenity);
            onRemove('amenities', updated);
          },
        });
      });
    }

    // Condo Amenities
    if (filters.condoAmenities?.length > 0) {
      filters.condoAmenities.forEach((amenity) => {
        items.push({
          key: `condo-${amenity}`,
          label: amenity,
          icon: null,
          emoji: '🏢',
          iconColor: 'text-sky-600',
          color: 'sky',
          onRemove: () => {
            const updated = filters.condoAmenities.filter((a) => a !== amenity);
            onRemove('condoAmenities', updated);
          },
        });
      });
    }

    // Property Condition
    if (filters.propertyCondition) {
      items.push({
        key: 'condition',
        label: getConditionLabel(filters.propertyCondition),
        icon: null,
        emoji: '🏗',
        iconColor: 'text-orange-600',
        color: 'orange',
        onRemove: () => onRemove('propertyCondition', ''),
      });
    }

    return items;
  };

  const filterItems = getFilterItems();

  if (filterItems.length === 0) return null;

  // Cores para os chips - Estilo Premium
  const getColorClasses = (color, featured = false) => {
    if (featured) {
      return 'bg-white border-2 border-emerald-500 text-emerald-700 hover:bg-emerald-50 hover:shadow-lg shadow-emerald-100/50';
    }
    
    const colors = {
      emerald: 'bg-white border border-emerald-300/60 text-slate-700 hover:border-emerald-400 hover:bg-emerald-50/50 hover:shadow-md',
      blue: 'bg-white border border-blue-300/60 text-slate-700 hover:border-blue-400 hover:bg-blue-50/50 hover:shadow-md',
      purple: 'bg-white border border-purple-300/60 text-slate-700 hover:border-purple-400 hover:bg-purple-50/50 hover:shadow-md',
      green: 'bg-white border border-green-300/60 text-slate-700 hover:border-green-400 hover:bg-green-50/50 hover:shadow-md',
      amber: 'bg-white border border-amber-300/60 text-slate-700 hover:border-amber-400 hover:bg-amber-50/50 hover:shadow-md',
      rose: 'bg-white border border-rose-300/60 text-slate-700 hover:border-rose-400 hover:bg-rose-50/50 hover:shadow-md',
      cyan: 'bg-white border border-cyan-300/60 text-slate-700 hover:border-cyan-400 hover:bg-cyan-50/50 hover:shadow-md',
      slate: 'bg-white border border-slate-300/60 text-slate-700 hover:border-slate-400 hover:bg-slate-50/50 hover:shadow-md',
      indigo: 'bg-white border border-indigo-300/60 text-slate-700 hover:border-indigo-400 hover:bg-indigo-50/50 hover:shadow-md',
      violet: 'bg-white border border-violet-300/60 text-slate-700 hover:border-violet-400 hover:bg-violet-50/50 hover:shadow-md',
      sky: 'bg-white border border-sky-300/60 text-slate-700 hover:border-sky-400 hover:bg-sky-50/50 hover:shadow-md',
      orange: 'bg-white border border-orange-300/60 text-slate-700 hover:border-orange-400 hover:bg-orange-50/50 hover:shadow-md',
    };
    return colors[color] || colors.slate;
  };

  const featuredItems = filterItems.filter(item => item.featured);
  const regularItems = filterItems.filter(item => !item.featured);

  return (
    <div className="filtersContainer bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
      {/* Header com fundo sutil */}
      <div className="bg-gradient-to-r from-slate-50 to-slate-100/50 px-6 py-4 border-b border-slate-200/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-md shadow-emerald-200/50">
              <Filter className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                Filtros Aplicados
                <span className="badge inline-flex items-center justify-center min-w-[24px] h-6 px-2 bg-emerald-500 text-white text-xs font-bold rounded-full shadow-sm">
                  {filterItems.length}
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Clique para remover
              </p>
            </div>
          </div>
          <button
            onClick={onClearAll}
            className="rippleEffect inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-rose-600 hover:text-white bg-white hover:bg-rose-500 border border-rose-300 hover:border-rose-500 rounded-xl transition-all duration-300 group shadow-sm hover:shadow-md"
          >
            <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            <span className="hidden sm:inline">Limpar tudo</span>
            <span className="sm:hidden">Limpar</span>
          </button>
        </div>
      </div>

      {/* Container de Chips */}
      <div className="px-6 py-5">
        {/* Featured Filters (Área Desenhada) */}
        {featuredItems.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2.5">
              {featuredItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.key}
                    onClick={item.onRemove}
                    className={`
                      filterChip rippleEffect
                      inline-flex items-center gap-2.5 px-4 py-2.5
                      rounded-xl text-sm font-semibold
                      transition-all duration-300 ease-out
                      transform hover:scale-[1.02] active:scale-[0.98]
                      ${getColorClasses(item.color, item.featured)}
                      group relative overflow-hidden
                    `}
                    title={`Clique para remover: ${item.label}`}
                  >
                    {IconComponent && (
                      <IconComponent className={`w-4 h-4 ${item.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                    )}
                    {item.emoji && (
                      <span className="text-lg leading-none">{item.emoji}</span>
                    )}
                    <span className="leading-none font-medium">{item.label}</span>
                    <div className="ml-1 w-5 h-5 rounded-full bg-emerald-500/10 group-hover:bg-emerald-500/20 flex items-center justify-center transition-colors duration-300">
                      <X className="w-3 h-3 text-emerald-600 group-hover:rotate-90 transition-all duration-300" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Regular Filters */}
        <div className="flex flex-wrap gap-2">
          {regularItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.key}
                onClick={item.onRemove}
                className={`
                  filterChip rippleEffect
                  inline-flex items-center gap-2 px-3.5 py-2
                  rounded-xl text-sm font-medium
                  transition-all duration-300 ease-out
                  transform hover:scale-[1.02] active:scale-[0.98]
                  ${getColorClasses(item.color)}
                  group relative overflow-hidden
                `}
                title={`Clique para remover: ${item.label}`}
              >
                {IconComponent && (
                  <IconComponent className={`w-3.5 h-3.5 ${item.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                )}
                {item.emoji && (
                  <span className="text-base leading-none opacity-80">{item.emoji}</span>
                )}
                <span className="leading-none">{item.label}</span>
                <X className="w-3 h-3 text-slate-400 group-hover:text-slate-600 group-hover:rotate-90 transition-all duration-300" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Helper functions
function formatCurrency(value) {
  if (!value) return 'R$ 0';
  const num = Number(value);
  if (num >= 1000000) {
    return `R$ ${(num / 1000000).toFixed(1).replace('.', ',')}M`;
  } else if (num >= 1000) {
    return `R$ ${(num / 1000).toFixed(0)}k`;
  }
  return `R$ ${new Intl.NumberFormat('pt-BR').format(num)}`;
}

// Helper functions
function getPropertyTypeLabel(type) {
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
  return labels[type] || type;
}

function getConditionLabel(condition) {
  const labels = {
    novo: 'Novo/Na planta',
    seminovo: 'Seminovo',
    usado: 'Usado (bom estado)',
    reformar: 'A reformar',
  };
  return labels[condition] || condition;
}

function formatNumber(value) {
  if (!value) return '0';
  return new Intl.NumberFormat('pt-BR').format(value);
}
