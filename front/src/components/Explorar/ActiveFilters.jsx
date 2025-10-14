import { X } from 'lucide-react';

export default function ActiveFilters({ filters, onRemove, onClearAll }) {
  const getFilterItems = () => {
    const items = [];

    // Property Types
    if (filters.propertyTypes?.length > 0) {
      filters.propertyTypes.forEach((type) => {
        items.push({
          key: `type-${type}`,
          label: getPropertyTypeLabel(type),
          onRemove: () => {
            const updated = filters.propertyTypes.filter((t) => t !== type);
            onRemove('propertyTypes', updated);
          },
        });
      });
    }

    // Location
    if (filters.location) {
      items.push({
        key: 'location',
        label: `📍 ${filters.location}`,
        onRemove: () => onRemove('location', ''),
      });
    }

    // Price Range
    if (filters.priceMin || filters.priceMax) {
      let label = '💰 ';
      if (filters.priceMin && filters.priceMax) {
        label += `R$ ${formatNumber(filters.priceMin)} - R$ ${formatNumber(filters.priceMax)}`;
      } else if (filters.priceMin) {
        label += `Acima de R$ ${formatNumber(filters.priceMin)}`;
      } else {
        label += `Até R$ ${formatNumber(filters.priceMax)}`;
      }
      items.push({
        key: 'price',
        label,
        onRemove: () => {
          onRemove('priceMin', '');
          onRemove('priceMax', '');
        },
      });
    }

    // Area
    if (filters.areaMin || filters.areaMax) {
      let label = '📏 ';
      if (filters.areaMin && filters.areaMax) {
        label += `${filters.areaMin} - ${filters.areaMax} m²`;
      } else if (filters.areaMin) {
        label += `Acima de ${filters.areaMin} m²`;
      } else {
        label += `Até ${filters.areaMax} m²`;
      }
      items.push({
        key: 'area',
        label,
        onRemove: () => {
          onRemove('areaMin', '');
          onRemove('areaMax', '');
        },
      });
    }

    // Bedrooms
    if (filters.bedrooms) {
      items.push({
        key: 'bedrooms',
        label: `🛏️ ${filters.bedrooms}+ quartos`,
        onRemove: () => onRemove('bedrooms', null),
      });
    }

    // Bathrooms
    if (filters.bathrooms) {
      items.push({
        key: 'bathrooms',
        label: `🚿 ${filters.bathrooms}+ banheiros`,
        onRemove: () => onRemove('bathrooms', null),
      });
    }

    // Parking
    if (filters.parkingSpaces !== null && filters.parkingSpaces !== undefined) {
      items.push({
        key: 'parking',
        label: `🚗 ${filters.parkingSpaces}${filters.parkingSpaces > 0 ? '+' : ''} vagas`,
        onRemove: () => onRemove('parkingSpaces', null),
      });
    }

    // Suites
    if (filters.suites !== null && filters.suites !== undefined) {
      items.push({
        key: 'suites',
        label: `🛁 ${filters.suites}${filters.suites > 0 ? '+' : ''} suítes`,
        onRemove: () => onRemove('suites', null),
      });
    }

    // Amenities
    if (filters.amenities?.length > 0) {
      filters.amenities.forEach((amenity) => {
        items.push({
          key: `amenity-${amenity}`,
          label: `✨ ${amenity}`,
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
          label: `🏢 ${amenity}`,
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
        label: `🏗️ ${getConditionLabel(filters.propertyCondition)}`,
        onRemove: () => onRemove('propertyCondition', ''),
      });
    }

    return items;
  };

  const filterItems = getFilterItems();

  if (filterItems.length === 0) return null;

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-700">
          Filtros Aplicados ({filterItems.length})
        </h3>
        <button
          onClick={onClearAll}
          className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
        >
          Limpar todos
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {filterItems.map((item) => (
          <button
            key={item.key}
            onClick={item.onRemove}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-300 rounded-full text-sm text-slate-700 hover:border-slate-400 hover:bg-slate-50 transition-colors group"
          >
            <span>{item.label}</span>
            <X className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
          </button>
        ))}
      </div>
    </div>
  );
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
