import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';
import PropertyTypeModal from '../Explorar/Modals/PropertyTypeModal';
import FloatingMapWindow from '../Explorar/FloatingMapWindow';
import PriceModal from '../Explorar/Modals/PriceModal';
import FiltersModal from '../Explorar/FiltersModal';
import StyleModal from '../Explorar/Modals/StyleModal';
import RoomsModal from '../Explorar/Modals/RoomsModal';
import { api } from '../../api/client';

export default function QuickSearch() {
  const navigate = useNavigate();
  const [allProperties, setAllProperties] = useState([]);
  const [filters, setFilters] = useState({
    propertyTypes: [],
    location: '',
    priceMin: '',
    priceMax: '',
    areaMin: '',
    areaMax: '',
    styles: [], // NOVO: Estilos
    // Filtros avançados
    bedrooms: null,
    bathrooms: null,
    parkingSpaces: null,
    suites: null,
    amenities: [],
    condoAmenities: [],
    propertyCondition: '',
  });

  const [activeModal, setActiveModal] = useState(null);
  const [showFloatingMap, setShowFloatingMap] = useState(false);

  // Buscar todas as propriedades para o mapa
  useEffect(() => {
    (async () => {
      try {
        console.log('🔄 [QuickSearch] Buscando propriedades para o mapa...');
        const { data } = await api.get(`/properties?published=true&limit=1000&_t=${Date.now()}`);
        const arr = Array.isArray(data?.items) ? data.items : Array.isArray(data) ? data : [];
        console.log('✅ [QuickSearch] Propriedades carregadas:', arr.length);
        setAllProperties(arr);
      } catch (e) {
        console.error('❌ [QuickSearch] Erro ao buscar propriedades:', e);
        setAllProperties([]);
      }
    })();
  }, []);

  const handleLocationApply = (boundary, propertyIds) => {
    console.log('📍 [QuickSearch] Área selecionada:', { boundary, propertyIds });
    setShowFloatingMap(false);
    
    if (propertyIds && propertyIds.length > 0) {
      // Navegar para Explorar com os IDs filtrados
      const params = new URLSearchParams();
      params.append('mapFilter', 'true');
      
      // Incluir outros filtros existentes
      if (filters.propertyTypes.length > 0) {
        params.append('types', filters.propertyTypes.join(','));
      }
      if (filters.priceMin) params.append('priceMin', filters.priceMin);
      if (filters.priceMax) params.append('priceMax', filters.priceMax);
      if (filters.styles && filters.styles.length > 0) {
        params.append('styles', filters.styles.join(','));
      }
      if (filters.bedrooms) params.append('bedrooms', filters.bedrooms);
      if (filters.bathrooms) params.append('bathrooms', filters.bathrooms);
      
      navigate(`/explorar?${params.toString()}`, { 
        state: { filteredPropertyIds: propertyIds } 
      });
    }
  };

  const handleSearch = () => {
    console.log('Buscando com filtros:', filters);
    
    // Criar query params para a URL
    const params = new URLSearchParams();
    
    if (filters.propertyTypes.length > 0) {
      params.append('types', filters.propertyTypes.join(','));
    }
    if (filters.location) {
      params.append('location', filters.location);
    }
    if (filters.priceMin) {
      params.append('priceMin', filters.priceMin);
    }
    if (filters.priceMax) {
      params.append('priceMax', filters.priceMax);
    }
    if (filters.areaMin) {
      params.append('areaMin', filters.areaMin);
    }
    if (filters.areaMax) {
      params.append('areaMax', filters.areaMax);
    }
    if (filters.bedrooms) {
      params.append('bedrooms', filters.bedrooms);
    }
    if (filters.bathrooms) {
      params.append('bathrooms', filters.bathrooms);
    }
    if (filters.parkingSpaces !== null) {
      params.append('parking', filters.parkingSpaces);
    }
    if (filters.suites !== null) {
      params.append('suites', filters.suites);
    }
    if (filters.amenities.length > 0) {
      params.append('amenities', filters.amenities.join(','));
    }
    if (filters.condoAmenities.length > 0) {
      params.append('condoAmenities', filters.condoAmenities.join(','));
    }
    if (filters.propertyCondition) {
      params.append('condition', filters.propertyCondition);
    }
    if (filters.styles && filters.styles.length > 0) {
      params.append('styles', filters.styles.join(','));
    }
    
    // Navegar para página de explorar com filtros
    navigate(`/explorar?${params.toString()}`);
  };

  const getPropertyTypeLabel = () => {
    if (filters.propertyTypes.length === 0) return 'Tipo do imóvel';
    if (filters.propertyTypes.length === 1) return filters.propertyTypes[0];
    return `${filters.propertyTypes.length} tipos`;
  };

  const getPriceLabel = () => {
    if (!filters.priceMin && !filters.priceMax) return 'Faixa de preço';
    if (filters.priceMin && filters.priceMax) {
      return `R$ ${formatPrice(filters.priceMin)} - R$ ${formatPrice(filters.priceMax)}`;
    }
    if (filters.priceMin) return `Acima de R$ ${formatPrice(filters.priceMin)}`;
    return `Até R$ ${formatPrice(filters.priceMax)}`;
  };

  const getAreaLabel = () => {
    if (!filters.areaMin && !filters.areaMax) return 'Tamanho (m²)';
    if (filters.areaMin && filters.areaMax) {
      return `${filters.areaMin} - ${filters.areaMax} m²`;
    }
    if (filters.areaMin) return `Acima de ${filters.areaMin} m²`;
    return `Até ${filters.areaMax} m²`;
  };

  const getStyleLabel = () => {
    if (!filters.styles || filters.styles.length === 0) return 'Estilo';
    if (filters.styles.length === 1) return filters.styles[0];
    return `${filters.styles.length} estilos`;
  };

  const getRoomsLabel = () => {
    const parts = [];
    if (filters.bedrooms) parts.push(`${filters.bedrooms}+ quartos`);
    if (filters.bathrooms) parts.push(`${filters.bathrooms}+ banheiros`);
    if (parts.length > 0) return parts.join(', ');
    return 'Quartos e banheiros';
  };

  const formatPrice = (value) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Container da busca */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-4 md:p-6">
        {/* Grid dos campos de busca */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-4">
          {/* Tipo do Imóvel */}
          <SearchField
            label="Tipo do Imóvel"
            value={getPropertyTypeLabel()}
            onClick={() => setActiveModal('propertyType')}
            icon="🏠"
          />

          {/* Localização */}
          <SearchField
            label="Localização"
            value={filters.location || 'Cidade, bairro...'}
            onClick={() => setShowFloatingMap(true)}
            icon="📍"
          />

          {/* Preço */}
          <SearchField
            label="Preço"
            value={getPriceLabel()}
            onClick={() => setActiveModal('price')}
            icon="💰"
          />

          {/* Estilo - NOVO */}
          <SearchField
            label="Estilo"
            value={getStyleLabel()}
            onClick={() => setActiveModal('style')}
            icon="✨"
          />

          {/* Quartos - NOVO */}
          <SearchField
            label="Quartos e Banheiros"
            value={getRoomsLabel()}
            onClick={() => setActiveModal('rooms')}
            icon="�️"
          />
        </div>

        {/* Botões de ação */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveModal('advanced')}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <SlidersHorizontal size={18} />
            Mais Filtros
          </button>

          <button
            onClick={handleSearch}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-lg shadow-emerald-600/30"
          >
            <Search size={18} />
            Buscar Imóveis
          </button>
        </div>
      </div>

      {/* Modais */}
      <PropertyTypeModal
        isOpen={activeModal === 'propertyType'}
        onClose={() => setActiveModal(null)}
        filters={filters}
        onApply={(newFilters) => {
          setFilters({ ...filters, ...newFilters });
          setActiveModal(null);
        }}
      />

      {/* Mapa Flutuante - substituindo LocationModal */}
      <FloatingMapWindow
        onApply={handleLocationApply}
        initialSearchText={filters.location || ''}
        initialBoundary={null}
        allProperties={allProperties}
        isOpenExternal={showFloatingMap}
        onCloseExternal={() => setShowFloatingMap(false)}
        hideButton={true}
      />

      <PriceModal
        isOpen={activeModal === 'price'}
        onClose={() => setActiveModal(null)}
        filters={filters}
        onApply={(newFilters) => {
          setFilters({ ...filters, ...newFilters });
          setActiveModal(null);
        }}
      />

      <FiltersModal
        isOpen={activeModal === 'advanced'}
        onClose={() => setActiveModal(null)}
        filters={filters}
        onApplyFilters={(newFilters) => {
          setFilters(newFilters);
          setActiveModal(null);
        }}
      />

      <StyleModal
        isOpen={activeModal === 'style'}
        onClose={() => setActiveModal(null)}
        filters={filters}
        onApply={(newFilters) => {
          setFilters({ ...filters, ...newFilters });
          setActiveModal(null);
        }}
      />

      <RoomsModal
        isOpen={activeModal === 'rooms'}
        onClose={() => setActiveModal(null)}
        filters={filters}
        onApply={(newFilters) => {
          setFilters({ ...filters, ...newFilters });
          setActiveModal(null);
        }}
      />
    </div>
  );
}

function SearchField({ label, value, onClick, icon }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-start px-4 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-emerald-400 rounded-lg transition-all text-left group"
    >
      <span className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-1.5">
        <span>{icon}</span>
        {label}
      </span>
      <span className="text-sm font-semibold text-slate-800 truncate w-full group-hover:text-emerald-600 transition-colors">
        {value}
      </span>
    </button>
  );
}
