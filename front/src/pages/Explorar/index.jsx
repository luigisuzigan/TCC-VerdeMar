import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { MapPin, DollarSign, Home, Maximize2, X, Star } from 'lucide-react';
import { api } from '../../api/client.js';
import { parseFiltersFromUrl, getFilterDescriptions, countActiveFilters, filtersToUrlParams } from '../../utils/filterHelpers.js';
import FavoriteButton from '../../components/FavoriteButton';
import ActiveFilters from '../../components/Explorar/ActiveFilters.jsx';
import Pagination from '../../components/Explorar/Pagination.jsx';
import TopFiltersBar from '../../components/Explorar/TopFiltersBar.jsx';
import FiltersModal from '../../components/Explorar/FiltersModal.jsx';
import FloatingMapWindow from '../../components/Explorar/FloatingMapWindow.jsx';
import PriceModal from '../../components/Explorar/Modals/PriceModal.jsx';
import PropertyTypeModal from '../../components/Explorar/Modals/PropertyTypeModal.jsx';
import RoomsModal from '../../components/Explorar/Modals/RoomsModal.jsx';
import AreaModal from '../../components/Explorar/Modals/AreaModal.jsx';
import StyleModal from '../../components/Explorar/Modals/StyleModal.jsx';
import LocationModal from '../../components/Search/Modals/LocationModal.jsx';

export default function Explorar() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [showPropertyTypeModal, setShowPropertyTypeModal] = useState(false);
  const [showRoomsModal, setShowRoomsModal] = useState(false);
  const [showAreaModal, setShowAreaModal] = useState(false);
  const [showStyleModal, setShowStyleModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showFloatingMap, setShowFloatingMap] = useState(false);
  const [filteredPropertyIds, setFilteredPropertyIds] = useState(null); // IDs das propriedades filtradas por área
  const [allProperties, setAllProperties] = useState([]); // Todas as propriedades para o mapa
  const [showMapToast, setShowMapToast] = useState(false); // Toast de feedback do mapa
  const [mapToastMessage, setMapToastMessage] = useState('');
  const itemsPerPage = 24;
  const topFiltersRef = useRef(null);

  // Capturar filteredPropertyIds do state da navegação
  useEffect(() => {
    if (location.state?.filteredPropertyIds) {
      console.log('🔍 Recebido filteredPropertyIds da navegação:', location.state.filteredPropertyIds.length);
      setFilteredPropertyIds(location.state.filteredPropertyIds);
    }
  }, [location.state]);

  // Parse filters from URL on mount
  useEffect(() => {
    const parsed = parseFiltersFromUrl(searchParams);
    setFilters(parsed);
  }, [searchParams]);

  // Fetch all properties for map (once on mount)
  useEffect(() => {
    (async () => {
      try {
        console.log('🔄 Buscando propriedades para o mapa...');
        const { data } = await api.get(`/properties?published=true&limit=1000&_t=${Date.now()}`);
        const arr = Array.isArray(data?.items) ? data.items : Array.isArray(data) ? data : [];
        console.log('✅ Propriedades carregadas para o mapa:', arr.length);
        
        // Mostrar algumas propriedades no console para debug
        if (arr.length > 0) {
          console.log('📍 Primeiras 3 propriedades:', arr.slice(0, 3).map(p => ({
            id: p.id,
            title: p.title,
            lat: p.latitude,
            lng: p.longitude,
            price: p.price
          })));
        }
        
        setAllProperties(arr);
      } catch (e) {
        console.error('❌ Erro ao buscar propriedades para o mapa:', e);
        console.error('⚠️ Backend offline - aguarde reinício do servidor');
        console.log('💡 Dica: Verifique se o backend está rodando na porta 4000');
        setAllProperties([]);
      }
    })();
  }, []);

  // Manual search trigger
  const [shouldSearch, setShouldSearch] = useState(false);

  // Fetch properties only when shouldSearch is true
  useEffect(() => {
    if (!shouldSearch) return; // Only fetch when explicitly triggered
    
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
        if (active) {
          setLoading(false);
          setShouldSearch(false); // Reset search trigger
        }
      }
    })();
    
    return () => { active = false; };
  }, [shouldSearch, filters, currentPage, filteredPropertyIds]); // Depend on shouldSearch instead of filters

  // Trigger initial search on mount
  useEffect(() => {
    setShouldSearch(true);
  }, []); // Only once on mount

  // Build API query from filters
  const buildApiQuery = (filters) => {
    const params = new URLSearchParams();
    params.set('published', 'true');
    params.set('limit', '24');
    params.set('_t', Date.now()); // Timestamp para evitar cache
    
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
    
    // Update URL but DON'T trigger search
    const params = filtersToUrlParams(newFilters);
    navigate(`/explorar?${params.toString()}`, { replace: true });
    // Note: No setShouldSearch(true) here - only when clicking "Buscar" button
  };

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    
    // Update URL but DON'T trigger search
    const params = filtersToUrlParams(newFilters);
    navigate(`/explorar?${params.toString()}`, { replace: true });
    // Note: No setShouldSearch(true) here - only when clicking "Buscar" button
  };

  const handleFilterClick = (filterType) => {
    // Open specific modal based on filter type
    switch (filterType) {
      case 'search':
        // Trigger search when clicking "Buscar" button
        console.log('🔍 Botão Buscar clicado - disparando busca');
        setShouldSearch(true);
        break;
      case 'location':
        setShowFloatingMap(true);
        break;
      case 'price':
        setShowPriceModal(true);
        break;
      case 'propertyType':
        setShowPropertyTypeModal(true);
        break;
      case 'area':
        setShowAreaModal(true);
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

  const handleLocationApply = (locationText, propertyIds, boundary) => {
    try {
      console.log('=== handleLocationApply chamado ===');
      console.log('📝 locationText:', locationText);
      console.log('🏠 propertyIds:', propertyIds?.length || 0);
      console.log('📍 boundary:', boundary ? 'Sim' : 'Não');
      
      // Se tem área desenhada e IDs de propriedades
      if (boundary && propertyIds && propertyIds.length > 0) {
        console.log('✅ Filtro de ÁREA DESENHADA ativo - Mostrando', propertyIds.length, 'imóveis');
        setFilteredPropertyIds(propertyIds);
        
        // Mostrar toast de feedback
        setMapToastMessage(`🎯 ${propertyIds.length} ${propertyIds.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'} na área desenhada`);
        setShowMapToast(true);
        setTimeout(() => setShowMapToast(false), 4000);
        
        // Limpar filtro de texto se existir
        const newFilters = { ...filters };
        delete newFilters.location;
        setFilters(newFilters);
        setCurrentPage(1);
        
        const params = filtersToUrlParams(newFilters);
        navigate(`/explorar?${params.toString()}`, { replace: true });
      } 
      // Se só tem texto de busca (cidade/bairro)
      else if (locationText && !boundary) {
        console.log('📍 Busca por texto:', locationText);
        setFilteredPropertyIds(null);
        updateFilter('location', locationText);
      }
      // Limpar tudo
      else {
        console.log('🧹 Limpando todos os filtros de localização');
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

  const handleAreaApply = (areaFilters) => {
    const newFilters = { ...filters, ...areaFilters };
    applyFilters(newFilters);
    setShowAreaModal(false);
  };

  const removeFilter = (key, value) => {
    // Se estiver removendo a área desenhada no mapa
    if (key === 'mapArea') {
      setFilteredPropertyIds(null);
      setCurrentPage(1);
      setShouldSearch(true); // Buscar novamente sem o filtro de área
      return;
    }
    
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
    setFilteredPropertyIds(null); // Clear area filter too
    setCurrentPage(1);
    navigate('/explorar', { replace: true });
    // Note: No setShouldSearch(true) - user needs to click "Buscar" to search again
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeFiltersCount = countActiveFilters(filters);
  const filterDescriptions = getFilterDescriptions(filters);

  return (
    <main className="mx-auto max-w-[1600px] px-4 py-8">
      {/* Top Filters Bar */}
      <div ref={topFiltersRef} className="mb-6">
        <TopFiltersBar
          filters={filters}
          onFilterClick={handleFilterClick}
        />
      </div>

      {/* Active Filters Pills */}
      <ActiveFilters
        filters={filters}
        filteredPropertyIds={filteredPropertyIds}
        onRemove={removeFilter}
        onClearAll={clearAllFilters}
      />

      {/* Main Content */}
      <div className="mt-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Title Section */}
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-1">
                Explorar Imóveis
              </h1>
              <div className="flex items-center gap-2">
                <p className="text-slate-600">
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Carregando...
                    </span>
                  ) : (
                    <>
                      <span className="font-semibold text-slate-900">{totalItems || 0}</span> {totalItems === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-slate-700 whitespace-nowrap">
                Ordenar por:
              </label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-700 hover:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all cursor-pointer shadow-sm hover:shadow-md"
                >
                  <option value="default">Padrão</option>
                  <option value="price-asc">Menor preço</option>
                  <option value="price-desc">Maior preço</option>
                  <option value="area-desc">Maior área</option>
                  <option value="area-asc">Menor área</option>
                  <option value="newest">Mais recentes</option>
                </select>
                {/* Custom arrow */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
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
        isOpenExternal={showFloatingMap}
        onCloseExternal={() => setShowFloatingMap(false)}
        hideButton={true}
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

      <AreaModal
        isOpen={showAreaModal}
        onClose={() => setShowAreaModal(false)}
        filters={filters}
        onApply={handleAreaApply}
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

      <LocationModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        location={filters.location || filters.city || ''}
        onApply={(locationText, propertyIds, boundary) => {
          handleLocationApply(locationText, propertyIds, boundary);
          setShowLocationModal(false);
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

      {/* Toast de Feedback do Mapa */}
      {showMapToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[10000] animate-in slide-in-from-top duration-300">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border-2 border-blue-400">
            <div className="w-3 h-3 rounded-full bg-white animate-pulse"></div>
            <span className="font-semibold text-lg">{mapToastMessage}</span>
          </div>
        </div>
      )}
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
        {/* Favorite Button */}
        <div className="absolute top-3 right-3">
          <FavoriteButton property={property} size="sm" />
        </div>
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