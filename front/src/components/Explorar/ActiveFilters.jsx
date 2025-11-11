import { X, Trash2, MapPin, Filter, ChevronDown, ChevronUp, Folder, FolderOpen } from 'lucide-react';
import { useState } from 'react';
import './ActiveFilters.module.css';

export default function ActiveFilters({ filters, onRemove, onRemoveMultiple, onClearAll, filteredPropertyIds }) {
  const [expandedGroups, setExpandedGroups] = useState({});

  const toggleGroup = (groupKey) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupKey]: !prev[groupKey]
    }));
  };

  const getFilterGroups = () => {
    const groups = [];
    const standalone = [];

    // Área Desenhada no Mapa (standalone - não agrupa)
    if (filteredPropertyIds && filteredPropertyIds.length > 0) {
      standalone.push({
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

    // Location (standalone)
    if (filters.location && !(filteredPropertyIds && filteredPropertyIds.length > 0)) {
      standalone.push({
        key: 'location',
        label: filters.location,
        icon: MapPin,
        iconColor: 'text-blue-600',
        color: 'blue',
        onRemove: () => onRemove('location', ''),
      });
    }

    // GRUPO: Tipo de Imóvel + Estilo
    const typeStyleItems = [];
    if (filters.propertyTypes?.length > 0) {
      filters.propertyTypes.forEach((type) => {
        typeStyleItems.push({
          key: `type-${type}`,
          label: getPropertyTypeLabel(type),
          emoji: '🏠',
          onRemove: () => {
            const updated = filters.propertyTypes.filter((t) => t !== type);
            onRemove('propertyTypes', updated);
          },
        });
      });
    }
    if (filters.styles?.length > 0) {
      filters.styles.forEach((style) => {
        typeStyleItems.push({
          key: `style-${style}`,
          label: style,
          emoji: '✨',
          onRemove: () => {
            const updated = filters.styles.filter((s) => s !== style);
            onRemove('styles', updated);
          },
        });
      });
    }
    if (typeStyleItems.length > 0) {
      groups.push({
        key: 'type-style',
        label: 'Categoria & Estilo',
        emoji: '🏠',
        color: 'purple',
        items: typeStyleItems,
        onRemoveAll: () => {
          onRemoveMultiple(['propertyTypes', 'styles']);
        }
      });
    }

    // GRUPO: Áreas (Área Construída + Área Total)
    const areaItems = [];
    if (filters.areaMin || filters.areaMax) {
      let label = 'Área Construída: ';
      if (filters.areaMin && filters.areaMax) {
        label += `${filters.areaMin}-${filters.areaMax}m²`;
      } else if (filters.areaMin) {
        label += `Acima de ${filters.areaMin}m²`;
      } else {
        label += `Até ${filters.areaMax}m²`;
      }
      areaItems.push({
        key: 'area-built',
        label,
        emoji: '📐',
        onRemove: () => onRemove('areaRange', { areaMin: '', areaMax: '' }),
      });
    }
    if (filters.totalAreaMin || filters.totalAreaMax) {
      let label = 'Área Total: ';
      if (filters.totalAreaMin && filters.totalAreaMax) {
        label += `${filters.totalAreaMin}-${filters.totalAreaMax}m²`;
      } else if (filters.totalAreaMin) {
        label += `Acima de ${filters.totalAreaMin}m²`;
      } else {
        label += `Até ${filters.totalAreaMax}m²`;
      }
      areaItems.push({
        key: 'area-total',
        label,
        emoji: '📏',
        onRemove: () => onRemove('totalAreaRange', { totalAreaMin: '', totalAreaMax: '' }),
      });
    }
    if (areaItems.length > 0) {
      groups.push({
        key: 'areas',
        label: 'Áreas',
        emoji: '📐',
        color: 'amber',
        items: areaItems,
        onRemoveAll: () => {
          onRemoveMultiple(['areaRange', 'totalAreaRange']);
        }
      });
    }

    // Price Range (standalone)
    if (filters.priceMin || filters.priceMax) {
      let label = '';
      if (filters.priceMin && filters.priceMax) {
        label = `${formatCurrency(filters.priceMin)} - ${formatCurrency(filters.priceMax)}`;
      } else if (filters.priceMin) {
        label = `A partir de ${formatCurrency(filters.priceMin)}`;
      } else {
        label = `Até ${formatCurrency(filters.priceMax)}`;
      }
      standalone.push({
        key: 'price',
        label,
        emoji: '💰',
        color: 'green',
        onRemove: () => onRemove('priceRange', { priceMin: '', priceMax: '' }),
      });
    }

    // GRUPO: Quartos (Quartos + Banheiros + Suítes)
    const roomItems = [];
    if (filters.bedrooms) {
      roomItems.push({
        key: 'bedrooms',
        label: `${filters.bedrooms}+ quarto${filters.bedrooms > 1 ? 's' : ''}`,
        emoji: '🛏',
        onRemove: () => onRemove('bedrooms', null),
      });
    }
    if (filters.bathrooms) {
      roomItems.push({
        key: 'bathrooms',
        label: `${filters.bathrooms}+ banheiro${filters.bathrooms > 1 ? 's' : ''}`,
        emoji: '🚿',
        onRemove: () => onRemove('bathrooms', null),
      });
    }
    if (filters.suites !== null && filters.suites !== undefined) {
      roomItems.push({
        key: 'suites',
        label: `${filters.suites}+ suíte${filters.suites !== 1 ? 's' : ''}`,
        emoji: '🛁',
        onRemove: () => onRemove('suites', null),
      });
    }
    if (roomItems.length > 0) {
      groups.push({
        key: 'rooms',
        label: 'Quartos & Banheiros',
        emoji: '🛏',
        color: 'rose',
        items: roomItems,
        onRemoveAll: () => {
          onRemoveMultiple(['bedrooms', 'bathrooms', 'suites']);
        }
      });
    }

    // GRUPO: Mais Filtros (Amenities, Natural Conditions, Parking, Year, Condition)
    const moreFiltersItems = [];
    
    if (filters.parkingSpaces !== null && filters.parkingSpaces !== undefined) {
      moreFiltersItems.push({
        key: 'parking',
        label: `${filters.parkingSpaces}${filters.parkingSpaces > 0 ? '+' : ''} vaga${filters.parkingSpaces !== 1 ? 's' : ''}`,
        emoji: '🚗',
        onRemove: () => onRemove('parkingSpaces', null),
      });
    }

    if (filters.yearBuilt) {
      moreFiltersItems.push({
        key: 'yearBuilt',
        label: `Construído após ${filters.yearBuilt}`,
        emoji: '📅',
        onRemove: () => onRemove('yearBuilt', null),
      });
    }

    if (filters.amenities?.length > 0) {
      filters.amenities.forEach((amenity) => {
        moreFiltersItems.push({
          key: `amenity-${amenity}`,
          label: amenity,
          emoji: '✨',
          onRemove: () => {
            const updated = filters.amenities.filter((a) => a !== amenity);
            onRemove('amenities', updated);
          },
        });
      });
    }

    if (filters.condoAmenities?.length > 0) {
      filters.condoAmenities.forEach((amenity) => {
        moreFiltersItems.push({
          key: `condo-${amenity}`,
          label: amenity,
          emoji: '🏢',
          onRemove: () => {
            const updated = filters.condoAmenities.filter((a) => a !== amenity);
            onRemove('condoAmenities', updated);
          },
        });
      });
    }

    if (filters.naturalConditions?.length > 0) {
      filters.naturalConditions.forEach((condition) => {
        moreFiltersItems.push({
          key: `natural-${condition}`,
          label: condition,
          emoji: '🌿',
          onRemove: () => {
            const updated = filters.naturalConditions.filter((c) => c !== condition);
            onRemove('naturalConditions', updated);
          },
        });
      });
    }

    if (filters.propertyCondition) {
      moreFiltersItems.push({
        key: 'condition',
        label: getConditionLabel(filters.propertyCondition),
        emoji: '🏗',
        onRemove: () => onRemove('propertyCondition', ''),
      });
    }

    if (moreFiltersItems.length > 0) {
      groups.push({
        key: 'more-filters',
        label: 'Mais Filtros',
        emoji: '⚙️',
        color: 'violet',
        items: moreFiltersItems,
        onRemoveAll: () => {
          onRemoveMultiple(['parkingSpaces', 'yearBuilt', 'amenities', 'condoAmenities', 'naturalConditions', 'propertyCondition']);
        }
      });
    }

    return { groups, standalone };
  };

  const { groups, standalone } = getFilterGroups();

  if (groups.length === 0 && standalone.length === 0) return null;

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

  // Separar standalone featured (área do mapa) dos outros
  const featuredStandalone = standalone.filter(item => item.featured);
  const regularStandalone = standalone.filter(item => !item.featured);

  return (
    <div className="filtersContainer bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
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
                  {groups.reduce((acc, g) => acc + g.items.length, 0) + standalone.length}
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Clique para remover ou expandir pastas
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
      <div className="px-6 py-5 space-y-3">
        {/* Featured Standalone (Área do Mapa) */}
        {featuredStandalone.length > 0 && (
          <div className="flex flex-wrap gap-2.5">
            {featuredStandalone.map((item) => {
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
        )}

        {/* Groups (Pastas) */}
        {groups.map((group) => {
          const isExpanded = expandedGroups[group.key];
          const FolderIcon = isExpanded ? FolderOpen : Folder;
          const ChevronIcon = isExpanded ? ChevronUp : ChevronDown;

          return (
            <div key={group.key} className="space-y-2">
              {/* Group Header (Pasta Fechada) */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleGroup(group.key)}
                  className={`
                    flex-1 inline-flex items-center gap-2.5 px-4 py-2.5
                    rounded-xl text-sm font-semibold
                    transition-all duration-300 ease-out
                    transform hover:scale-[1.01] active:scale-[0.99]
                    ${getColorClasses(group.color)}
                    group relative overflow-hidden
                  `}
                  title={`Clique para ${isExpanded ? 'recolher' : 'expandir'}`}
                >
                  <FolderIcon className={`w-4 h-4 text-${group.color}-600 group-hover:scale-110 transition-transform duration-300`} />
                  <span className="text-lg leading-none">{group.emoji}</span>
                  <span className="leading-none font-medium flex-1 text-left">{group.label}</span>
                  <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-slate-200 text-slate-700 text-xs font-bold rounded-full">
                    {group.items.length}
                  </span>
                  <ChevronIcon className={`w-4 h-4 text-${group.color}-600 transition-transform duration-300`} />
                </button>
                <button
                  onClick={group.onRemoveAll}
                  className="w-9 h-9 rounded-xl bg-rose-50 hover:bg-rose-500 border border-rose-300 hover:border-rose-500 flex items-center justify-center transition-all duration-300 group"
                  title="Remover todos deste grupo"
                >
                  <X className="w-4 h-4 text-rose-600 group-hover:text-white group-hover:rotate-90 transition-all duration-300" />
                </button>
              </div>

              {/* Group Items (Quando Expandido) */}
              {isExpanded && (
                <div className="pl-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <button
                      key={item.key}
                      onClick={item.onRemove}
                      className={`
                        filterChip rippleEffect
                        inline-flex items-center gap-2 px-3 py-2
                        rounded-lg text-sm font-medium
                        transition-all duration-300 ease-out
                        transform hover:scale-[1.02] active:scale-[0.98]
                        ${getColorClasses(group.color)}
                        group relative overflow-hidden
                      `}
                      title={`Clique para remover: ${item.label}`}
                    >
                      {item.emoji && (
                        <span className="text-base leading-none">{item.emoji}</span>
                      )}
                      <span className="leading-none">{item.label}</span>
                      <X className="w-3 h-3 group-hover:rotate-90 transition-all duration-300" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Regular Standalone (Location, Price) */}
        {regularStandalone.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {regularStandalone.map((item) => {
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
                    ${getColorClasses(item.color)}
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
                  <div className="ml-1 w-5 h-5 rounded-full bg-slate-200 group-hover:bg-slate-300 flex items-center justify-center transition-colors duration-300">
                    <X className="w-3 h-3 text-slate-600 group-hover:rotate-90 transition-all duration-300" />
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// Helper: Formatar preços
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

// Helper: Labels de tipo de imóvel
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

// Helper: Labels de condição
function getConditionLabel(condition) {
  const labels = {
    novo: 'Novo/Na planta',
    seminovo: 'Seminovo',
    usado: 'Usado (bom estado)',
    reformar: 'A reformar',
  };
  return labels[condition] || condition;
}

// Helper: Formatar números
function formatNumber(value) {
  if (!value) return '0';
  return new Intl.NumberFormat('pt-BR').format(value);
}
