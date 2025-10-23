import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { MapPin, DollarSign, Home, Maximize2, X, Star } from 'lucide-react';
import { api } from '../../api/client.js';
import { parseFiltersFromUrl, getFilterDescriptions, countActiveFilters, filtersToUrlParams } from '../../utils/filterHelpers.js';
import ActiveFilters from '../../components/Explorar/ActiveFilters.jsx';
import Pagination from '../../components/Explorar/Pagination.jsx';
import TopFiltersBar from '../../components/Explorar/TopFiltersBar.jsx';
import StickyFilterButton from '../../components/Explorar/StickyFilterButton.jsx';
import FiltersModal from '../../components/Explorar/FiltersModal.jsx';
import FloatingMapWindow from '../../components/Explorar/FloatingMapWindow.jsx';
import PriceModal from '../../components/Explorar/Modals/PriceModal.jsx';
import PropertyTypeModal from '../../components/Explorar/Modals/PropertyTypeModal.jsx';
import RoomsModal from '../../components/Explorar/Modals/RoomsModal.jsx';
import StyleModal from '../../components/Explorar/Modals/StyleModal.jsx';

export default function Explorar() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [showStickyButton, setShowStickyButton] = useState(false);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [showPropertyTypeModal, setShowPropertyTypeModal] = useState(false);
  const [showRoomsModal, setShowRoomsModal] = useState(false);
  const [showStyleModal, setShowStyleModal] = useState(false);
  const [filteredPropertyIds, setFilteredPropertyIds] = useState(null); // IDs das propriedades filtradas por área
  const [allProperties, setAllProperties] = useState([]); // Todas as propriedades para o mapa
  const itemsPerPage = 24;
  const topFiltersRef = useRef(null);

  // Parse filters from URL on mount
  useEffect(() => {
    const parsed = parseFiltersFromUrl(searchParams);
    setFilters(parsed);
  }, [searchParams]);

  // Fetch all properties for map (once on mount)
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/properties?published=true&limit=1000');
        const arr = Array.isArray(data?.items) ? data.items : Array.isArray(data) ? data : [];
        setAllProperties(arr);
      } catch (e) {
        console.error('Erro ao buscar todas propriedades para o mapa:', e);
      }
    })();
  }, []);

  // Detect scroll to show/hide sticky button
  useEffect(() => {
    const handleScroll = () => {
      if (topFiltersRef.current) {
        const rect = topFiltersRef.current.getBoundingClientRect();
        setShowStickyButton(rect.bottom < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch properties when filters change
  useEffect(() => {
    let active = true;
    setLoading(true);
    
    (async () => {
      try {
        console.log('=== useEffect FETCH iniciado ===');
        console.log('filteredPropertyIds:', filteredPropertyIds);
        console.log('filters:', filters);
        
        // Se tem filtro de área desenhada, NÃO usar filtro de location
        const filtersToUse = filteredPropertyIds 
          ? { ...filters, location: undefined } // Remove location quando tem IDs filtrados
          : filters;
        
        const query = buildApiQuery(filtersToUse);
        const offset = filteredPropertyIds ? 0 : (currentPage - 1) * itemsPerPage;
        const limit = filteredPropertyIds ? 1000 : itemsPerPage; // Buscar mais se tem filtro de área
        
        console.log('Query final:', query);
        console.log('Offset:', offset, 'Limit:', limit);
        console.log('URL completa:', `/properties?${query}&offset=${offset}&limit=${limit}`);
        
        const { data } = await api.get(`/properties?${query}&offset=${offset}&limit=${limit}`);
        if (!active) return;
        
        let arr = Array.isArray(data?.items) ? data.items : Array.isArray(data) ? data : [];
        console.log('✅ Propriedades recebidas da API:', arr.length);
        console.log('Primeiros 3 IDs da API:', arr.slice(0, 3).map(p => p.id));
        
        // Se tem filtro de área desenhada, filtrar apenas os IDs selecionados
        if (filteredPropertyIds && filteredPropertyIds.length > 0) {
          console.log('🔍 Filtrando por IDs:', filteredPropertyIds);
          const before = arr.length;
          arr = arr.filter(item => filteredPropertyIds.includes(item.id));
          console.log(`Filtrou ${before} → ${arr.length} imóveis`);
          console.log('IDs encontrados:', arr.map(p => p.id));
          
          // Aplicar paginação local
          const startIndex = (currentPage - 1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          arr = arr.slice(startIndex, endIndex);
          console.log(`📄 Página ${currentPage}: mostrando ${arr.length} imóveis`);
        }
        
        console.log('✅ setItems com', arr.length, 'imóveis');
        setItems(arr);
        setTotalItems(filteredPropertyIds ? filteredPropertyIds.length : (data?.total || arr.length));
      } catch (e) {
        if (!active) return;
        console.error('❌ Erro no fetch de propriedades:', e);
        setItems([]);
        setTotalItems(0);
      } finally {
        if (active) setLoading(false);
      }
    })();
    
    return () => { active = false; };
  }, [filters, currentPage, filteredPropertyIds]);

  // Build API query from filters
  const buildApiQuery = (filters) => {
    const params = new URLSearchParams();
    params.set('published', 'true');
    params.set('limit', '24');
    
    // Location
    if (filters.location) {
      console.log('🔍 Filtro de localização (city):', filters.location);
      params.set('city', filters.location);
    }
    
    // Price Range
    if (filters.priceMin) {
      params.set('minPrice', filters.priceMin);
    }
    if (filters.priceMax) {
      params.set('maxPrice', filters.priceMax);
    }
    
    // Area
    if (filters.areaMin) {
      params.set('minArea', filters.areaMin);
    }
    if (filters.areaMax) {
      params.set('maxArea', filters.areaMax);
    }
    
    // Property Types
    if (filters.propertyTypes?.length > 0) {
      params.set('types', filters.propertyTypes.join(','));
    }
    
    // Bedrooms
    if (filters.bedrooms) {
      params.set('minBedrooms', filters.bedrooms);
    }
    
    // Bathrooms
    if (filters.bathrooms) {
      params.set('minBathrooms', filters.bathrooms);
    }
    
    // Parking
    if (filters.parkingSpaces !== null && filters.parkingSpaces !== undefined) {
      params.set('minParkingSpaces', filters.parkingSpaces);
    }
    
    // Suites
    if (filters.suites !== null && filters.suites !== undefined) {
      params.set('minSuites', filters.suites);
    }
    
    // Amenities
    if (filters.amenities?.length > 0) {
      params.set('amenities', filters.amenities.join(','));
    }
    
    // Condo Amenities
    if (filters.condoAmenities?.length > 0) {
      params.set('condoAmenities', filters.condoAmenities.join(','));
    }
    
    // Property Condition
    if (filters.propertyCondition) {
      params.set('condition', filters.propertyCondition);
    }
    
    // Sorting
    if (sortBy !== 'default') {
      params.set('sortBy', sortBy);
    }
    
    return params.toString();
  };

  // Sort items locally (fallback if backend doesn't support sorting)
  const sortedItems = [...items].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return (a.price || 0) - (b.price || 0);
      case 'price-desc':
        return (b.price || 0) - (a.price || 0);
      case 'area-desc':
        return (b.area || 0) - (a.area || 0);
      case 'area-asc':
        return (a.area || 0) - (b.area || 0);
      case 'newest':
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      default:
        return 0;
    }
  });

  const updateFilter = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page on filter change
    
    // Update URL
    const params = filtersToUrlParams(newFilters);
    navigate(`/explorar?${params.toString()}`, { replace: true });
  };

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    
    const params = filtersToUrlParams(newFilters);
    navigate(`/explorar?${params.toString()}`, { replace: true });
  };

  const handleFilterClick = (filterType) => {
    // Open specific modal based on filter type
    switch (filterType) {
      case 'location':
        // Não faz nada - agora é controlado pelo botão flutuante
        break;
      case 'price':
        setShowPriceModal(true);
        break;
      case 'propertyType':
        setShowPropertyTypeModal(true);
        break;
      case 'rooms':
        setShowRoomsModal(true);
        break;
      case 'style':
        setShowStyleModal(true);
        break;
      case 'more':
        setShowFiltersModal(true);
        break;
      default:
        setShowFiltersModal(true);
    }
  };

  const handleLocationApply = (locationText, propertyIds) => {
    try {
      console.log('=== handleLocationApply chamado ===');
      console.log('locationText:', locationText);
      console.log('propertyIds:', propertyIds);
      
      // Se tem IDs de propriedades (área desenhada)
      if (propertyIds && propertyIds.length > 0) {
        console.log('✅ Filtro de área ATIVO - IDs:', propertyIds);
        setFilteredPropertyIds(propertyIds);
        
        // Limpar filtro de texto
        const newFilters = { ...filters };
        delete newFilters.location;
        setFilters(newFilters);
        setCurrentPage(1);
        
        const params = filtersToUrlParams(newFilters);
        navigate(`/explorar?${params.toString()}`, { replace: true });
      } 
      // Se só tem texto (busca por cidade)
      else if (locationText) {
        console.log('📍 Aplicando busca por texto:', locationText);
        setFilteredPropertyIds(null);
        updateFilter('location', locationText);
      }
      // Se limpar tudo
      else {
        console.log('❌ Limpando filtro de localização');
        setFilteredPropertyIds(null);
        const newFilters = { ...filters };
        delete newFilters.location;
        setFilters(newFilters);
        setCurrentPage(1);
        const params = filtersToUrlParams(newFilters);
        navigate(`/explorar?${params.toString()}`, { replace: true });
      }
    } catch (error) {
      console.error('Erro ao aplicar filtro de localização:', error);
    }
  };

  const handlePriceApply = (priceFilters) => {
    const newFilters = { ...filters, ...priceFilters };
    applyFilters(newFilters);
    setShowPriceModal(false);
  };

  const handlePropertyTypeApply = (typeFilters) => {
    const newFilters = { ...filters, ...typeFilters };
    applyFilters(newFilters);
    setShowPropertyTypeModal(false);
  };

  const handleRoomsApply = (roomFilters) => {
    const newFilters = { ...filters, ...roomFilters };
    applyFilters(newFilters);
    setShowRoomsModal(false);
  };

  const handleSearch = (searchText) => {
    if (searchText) {
      updateFilter('search', searchText);
    }
  };

  const removeFilter = (key, value) => {
    updateFilter(key, value);
  };

  const clearFilter = (key) => {
    const newFilters = { ...filters };
    delete newFilters[key];
    setFilters(newFilters);
    
    // Se limpar filtro de localização, limpar também os IDs filtrados
    if (key === 'location') {
      setFilteredPropertyIds(null);
      setCurrentPage(1); // Reset página para forçar novo fetch
    }
    
    const params = filtersToUrlParams(newFilters);
    navigate(`/explorar?${params.toString()}`, { replace: true });
  };

  const clearAllFilters = () => {
    setFilters({});
    setCurrentPage(1);
    navigate('/explorar', { replace: true });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeFiltersCount = countActiveFilters(filters);
  const filterDescriptions = getFilterDescriptions(filters);

  return (
    <main className="mx-auto max-w-[1600px] px-4 py-8">
      {/* Sticky Filter Button - Shows when scrolled */}
      {showStickyButton && (
        <StickyFilterButton
          onClick={() => setShowFiltersModal(true)}
          onClose={() => setShowFiltersModal(false)}
          filterCount={activeFiltersCount}
          isOpen={showFiltersModal}
        />
      )}

      {/* Top Filters Bar */}
      <div ref={topFiltersRef} className="mb-6">
        <TopFiltersBar
          filters={filters}
          onFilterClick={handleFilterClick}
          onSearch={handleSearch}
        />
      </div>

      {/* Active Filters Pills */}
      <ActiveFilters
        filters={filters}
        onRemove={removeFilter}
        onClearAll={clearAllFilters}
      />

      {/* Main Content */}
      <div className="mt-6">
        {/* Header */}
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Explorar Imóveis
            </h1>
            <p className="text-slate-600">
              {loading ? 'Carregando...' : `${items?.length || 0} imóveis encontrados`}
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-slate-600">
              Ordenar por:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:border-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value="default">Padrão</option>
              <option value="price-asc">Menor preço</option>
              <option value="price-desc">Maior preço</option>
              <option value="area-desc">Maior área</option>
              <option value="area-asc">Menor área</option>
              <option value="newest">Mais recentes</option>
            </select>
          </div>
        </div>

        {/* Property Grid - 3 por linha */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <PropertyCardSkeleton key={i} />)
            : sortedItems.map((property) => <PropertyCard key={property.id} property={property} />)}
        </div>

        {/* Pagination */}
        {!loading && totalItems > 0 && (
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(totalItems / itemsPerPage)}
              onPageChange={handlePageChange}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
            />
          </div>
        )}

        {/* Empty State */}
        {!loading && items.length === 0 && (
          <div className="text-center py-12">
            <Home className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Nenhum imóvel encontrado
            </h3>
            <p className="text-slate-600 mb-4">
              Tente ajustar seus filtros para ver mais resultados
            </p>
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      <FloatingMapWindow
        onApply={handleLocationApply}
        initialSearchText={filters.location || ''}
        initialBoundary={null}
        allProperties={allProperties}
      />

      <PriceModal
        isOpen={showPriceModal}
        onClose={() => setShowPriceModal(false)}
        filters={filters}
        onApply={handlePriceApply}
      />

      <PropertyTypeModal
        isOpen={showPropertyTypeModal}
        onClose={() => setShowPropertyTypeModal(false)}
        filters={filters}
        onApply={handlePropertyTypeApply}
      />

      <RoomsModal
        isOpen={showRoomsModal}
        onClose={() => setShowRoomsModal(false)}
        filters={filters}
        onApply={handleRoomsApply}
      />

      <StyleModal
        isOpen={showStyleModal}
        onClose={() => setShowStyleModal(false)}
        filters={filters}
        onApply={(newFilters) => {
          applyFilters({ ...filters, ...newFilters });
          setShowStyleModal(false);
        }}
      />

      {/* Filters Modal */}
      <FiltersModal
        isOpen={showFiltersModal}
        onClose={() => setShowFiltersModal(false)}
        filters={filters}
        onApplyFilters={(newFilters) => {
          applyFilters(newFilters);
          setShowFiltersModal(false);
        }}
      />
    </main>
  );
}

// Filter Section Component (não mais usado mas mantido para compatibilidade)
function FilterSection({ title, icon, children, onClear, hasValue }) {
  return (
    <div className="border-b border-slate-200 pb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-slate-900 font-medium">
          {icon}
          <span>{title}</span>
        </div>
        {hasValue && (
          <button
            onClick={onClear}
            className="text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

// Property Card Component
function PropertyCard({ property }) {
  return (
    <Link 
      to={`/property/${property.id}`}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-slate-200 group cursor-pointer block"
    >
      {/* Image */}
      <div className="relative h-[220px] overflow-hidden">
        <img
          src={property.images?.[0] || '/placeholder.jpg'}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-slate-700 shadow-sm">
            {getPropertyTypeLabel(property.type)}
          </span>
        </div>
        {/* Bookmark */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            // TODO: Implementar favoritar
          }}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-slate-50 shadow-sm transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-bold text-slate-900 text-lg mb-1 truncate">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1 text-sm text-slate-600 mb-3">
          <MapPin className="w-4 h-4 text-blue-600" />
          <span>{property.city || property.address || 'Localização'}</span>
        </div>

        {/* Details */}
        <div className="flex items-center gap-3 text-xs text-slate-600 mb-3">
          {property.beds && (
            <span className="flex items-center gap-1">
              🛏️ {property.beds} quartos
            </span>
          )}
          {property.baths && (
            <span className="flex items-center gap-1">
              🚿 {property.baths} banheiros
            </span>
          )}
          {property.area && (
            <span className="flex items-center gap-1">
              📏 {property.area} m²
            </span>
          )}
        </div>

        {/* Price */}
        <div className="mb-3">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-emerald-600">
              {formatCurrency(property.price)}
            </span>
          </div>
        </div>

        {/* Rating */}
        {property.rating && (
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-slate-900">
              {property.rating}
            </span>
            <span className="text-slate-500 text-sm">/5</span>
          </div>
        )}
      </div>
    </Link>
  );
}

// Helper function to format currency
function formatCurrency(value) {
  if (!value) return 'R$ 0';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
  }).format(value);
}

// Helper function to get property type label
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
  return labels[type] || type || 'Imóvel';
}

// Skeleton Loader
function PropertyCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200">
      <div className="h-[220px] bg-slate-200 animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-6 bg-slate-200 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-slate-200 rounded animate-pulse w-1/2" />
        <div className="h-8 bg-slate-200 rounded animate-pulse w-2/3" />
        <div className="h-4 bg-slate-200 rounded animate-pulse w-1/3" />
      </div>
    </div>
  );
}