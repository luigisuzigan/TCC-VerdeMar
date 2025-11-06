import React, { useEffect, useState, useRef } from 'react';
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
  const [savedBoundary, setSavedBoundary] = useState(null); // Salvar área desenhada
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
        console.log('📊 filteredPropertyIds:', filteredPropertyIds?.length || 0);
        console.log('📊 filters completo:', JSON.stringify(filters, null, 2));
        
        // IMPORTANTE: Quando tem área desenhada no mapa (filteredPropertyIds)
        // Precisamos buscar TODOS os imóveis que atendem aos filtros normais
        // E depois filtrar pelos IDs que estão dentro da área
        const filtersToUse = filteredPropertyIds 
          ? { ...filters, location: undefined } // Remove location text quando tem área desenhada
          : filters;
        
        console.log('📊 Filtros que serão usados na query:', JSON.stringify(filtersToUse, null, 2));
        
        const query = buildApiQuery(filtersToUse);
        
        // Se tem filtro de área, buscar muitos resultados e filtrar no cliente
        // Isso é necessário porque o backend não sabe quais IDs estão na área
        const offset = filteredPropertyIds ? 0 : (currentPage - 1) * itemsPerPage;
        const limit = filteredPropertyIds ? 1000 : itemsPerPage;
        
        console.log('🔗 Query construída:', query);
        console.log('📄 Offset:', offset, 'Limit:', limit);
        console.log('🌐 URL completa:', `/properties?${query}&offset=${offset}&limit=${limit}`);
        
        const { data } = await api.get(`/properties?${query}&offset=${offset}&limit=${limit}`);
        if (!active) return;
        
        let arr = Array.isArray(data?.items) ? data.items : Array.isArray(data) ? data : [];
        console.log('✅ Propriedades recebidas da API (com filtros aplicados):', arr.length);
        
        if (arr.length > 0) {
          console.log('📦 Primeiros 3 imóveis (com filtros):', arr.slice(0, 3).map(p => ({
            id: p.id,
            title: p.title,
            price: p.price,
            beds: p.beds,
            baths: p.baths,
            amenities: p.amenities?.slice(0, 2)
          })));
        }
        
        // NOVO: Se tem filtro de área desenhada, filtrar apenas os IDs dentro da área
        // Isso combina os filtros do backend com o filtro de localização do mapa
        if (filteredPropertyIds && filteredPropertyIds.length > 0) {
          console.log('�️ Aplicando filtro de área: mostrando apenas imóveis dentro da área desenhada');
          console.log('🔍 IDs permitidos pela área:', filteredPropertyIds.length);
          
          const beforeFilter = arr.length;
          arr = arr.filter(item => filteredPropertyIds.includes(item.id));
          
          console.log(`✅ Filtro de área aplicado: ${beforeFilter} imóveis (com filtros) → ${arr.length} imóveis (com filtros + dentro da área)`);
          
          // Total é baseado nos IDs filtrados que passaram pelos filtros
          const totalInArea = arr.length;
          
          // Aplicar paginação local
          const startIndex = (currentPage - 1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          const paginatedArr = arr.slice(startIndex, endIndex);
          
          console.log(`📄 Paginação: mostrando ${paginatedArr.length} de ${totalInArea} imóveis (página ${currentPage})`);
          
          setItems(paginatedArr);
          setTotalItems(totalInArea);
        } else {
          // Sem filtro de área, usar resultado direto do backend
          console.log('✅ Sem filtro de área - usando resultado direto do backend');
          setItems(arr);
          setTotalItems(data?.total || arr.length);
        }
        
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
    console.log('🔧 buildApiQuery recebeu filters:', filters);
    
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
      console.log('💰 Adicionando minPrice:', filters.priceMin);
      params.set('minPrice', filters.priceMin);
    }
    if (filters.priceMax) {
      console.log('💰 Adicionando maxPrice:', filters.priceMax);
      params.set('maxPrice', filters.priceMax);
    }
    
    // Area
    if (filters.areaMin) {
      console.log('📏 Adicionando minArea:', filters.areaMin);
      params.set('minArea', filters.areaMin);
    }
    if (filters.areaMax) {
      console.log('📏 Adicionando maxArea:', filters.areaMax);
      params.set('maxArea', filters.areaMax);
    }
    
    // Property Types
    if (filters.propertyTypes?.length > 0) {
      console.log('🏠 Adicionando types:', filters.propertyTypes);
      params.set('types', filters.propertyTypes.join(','));
    }
    
    // Bedrooms
    if (filters.bedrooms) {
      console.log('🛏️ Adicionando minBedrooms:', filters.bedrooms);
      params.set('minBedrooms', filters.bedrooms);
    }
    
    // Bathrooms
    if (filters.bathrooms) {
      console.log('🚿 Adicionando minBathrooms:', filters.bathrooms);
      params.set('minBathrooms', filters.bathrooms);
    }
    
    // Parking
    if (filters.parkingSpaces !== null && filters.parkingSpaces !== undefined) {
      console.log('🚗 Adicionando minParkingSpaces:', filters.parkingSpaces);
      params.set('minParkingSpaces', filters.parkingSpaces);
    }
    
    // Suites
    if (filters.suites !== null && filters.suites !== undefined) {
      console.log('🛁 Adicionando minSuites:', filters.suites);
      params.set('minSuites', filters.suites);
    }
    
    // Amenities
    if (filters.amenities?.length > 0) {
      console.log('✨ Adicionando amenities:', filters.amenities);
      params.set('amenities', filters.amenities.join(','));
    }
    
    // Condo Amenities
    if (filters.condoAmenities?.length > 0) {
      console.log('🏢 Adicionando condoAmenities:', filters.condoAmenities);
      params.set('condoAmenities', filters.condoAmenities.join(','));
    }
    
    // Property Condition
    if (filters.propertyCondition) {
      console.log('🔨 Adicionando condition:', filters.propertyCondition);
      params.set('condition', filters.propertyCondition);
    }

    // Styles
    if (filters.styles?.length > 0) {
      console.log('🎨 Adicionando styles:', filters.styles);
      params.set('styles', filters.styles.join(','));
    }
    
    // Sorting
    if (sortBy !== 'default') {
      params.set('sortBy', sortBy);
    }
    
    const queryString = params.toString();
    console.log('🔧 Query final construída:', queryString);
    console.log('🔧 Parâmetros individuais:', Object.fromEntries(params.entries()));
    
    return queryString;
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
    console.log('⚙️ applyFilters chamado com:', newFilters);
    console.log('⚙️ Filters atuais ANTES do set:', filters);
    setFilters(newFilters);
    setCurrentPage(1);
    
    // Update URL but DON'T trigger search
    const params = filtersToUrlParams(newFilters);
    console.log('⚙️ URL params gerados:', params.toString());
    navigate(`/explorar?${params.toString()}`, { replace: true });
    console.log('⚙️ Filters salvos no estado - aguardando clique em Buscar');
    // Note: No setShouldSearch(true) here - only when clicking "Buscar" button
  };

  const handleFilterClick = (filterType) => {
    // Open specific modal based on filter type
    switch (filterType) {
      case 'search':
        // Trigger search when clicking "Buscar" button
        console.log('🔍 Botão Buscar clicado - disparando busca');
        console.log('📊 Filtros atuais:', filters);
        console.log('📍 Área desenhada:', filteredPropertyIds?.length || 0, 'imóveis');
        setShouldSearch(true);
        break;
      case 'location':
        console.log('📍 Abrindo mapa de localização');
        // Forçar fechamento primeiro, depois abrir (reset completo)
        setShowFloatingMap(false);
        setTimeout(() => {
          setShowFloatingMap(true);
        }, 10);
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
        setSavedBoundary(boundary); // Salvar boundary para reabrir o mapa
        
        // Limpar filtro de texto se existir
        const newFilters = { ...filters };
        delete newFilters.location;
        setFilters(newFilters);
        setCurrentPage(1);
        
        const params = filtersToUrlParams(newFilters);
        navigate(`/explorar?${params.toString()}`, { replace: true });
        
        // NÃO disparar busca aqui - só quando clicar em "Buscar"
      } 
      // Se só tem texto de busca (cidade/bairro)
      else if (locationText && !boundary) {
        console.log('📍 Busca por texto:', locationText);
        setFilteredPropertyIds(null);
        setSavedBoundary(null);
        updateFilter('location', locationText);
      }
      // Limpar tudo
      else {
        console.log('🧹 Limpando todos os filtros de localização');
        setFilteredPropertyIds(null);
        setSavedBoundary(null);
        const newFilters = { ...filters };
        delete newFilters.location;
        setFilters(newFilters);
        setCurrentPage(1);
        const params = filtersToUrlParams(newFilters);
        navigate(`/explorar?${params.toString()}`, { replace: true });
      }
      
      // Fechar o mapa após aplicar
      setShowFloatingMap(false);
    } catch (error) {
      console.error('Erro ao aplicar filtro de localização:', error);
    }
  };

  const handlePriceApply = (priceFilters) => {
    console.log('💰 handlePriceApply recebeu:', priceFilters);
    console.log('💰 Filters atuais ANTES:', filters);
    const newFilters = { ...filters, ...priceFilters };
    console.log('💰 Filters novos DEPOIS:', newFilters);
    applyFilters(newFilters);
    setShowPriceModal(false);
  };

  const handlePropertyTypeApply = (typeFilters) => {
    console.log('🏠 handlePropertyTypeApply recebeu:', typeFilters);
    console.log('🏠 Filters atuais ANTES:', filters);
    const newFilters = { ...filters, ...typeFilters };
    console.log('🏠 Filters novos DEPOIS:', newFilters);
    applyFilters(newFilters);
    setShowPropertyTypeModal(false);
  };

  const handleRoomsApply = (roomFilters) => {
    console.log('🛏️ handleRoomsApply recebeu:', roomFilters);
    console.log('🛏️ Filters atuais ANTES:', filters);
    const newFilters = { ...filters, ...roomFilters };
    console.log('🛏️ Filters novos DEPOIS:', newFilters);
    applyFilters(newFilters);
    setShowRoomsModal(false);
  };

  const handleAreaApply = (areaFilters) => {
    console.log('📏 handleAreaApply recebeu:', areaFilters);
    console.log('📏 Filters atuais ANTES:', filters);
    const newFilters = { ...filters, ...areaFilters };
    console.log('📏 Filters novos DEPOIS:', newFilters);
    applyFilters(newFilters);
    setShowAreaModal(false);
  };

  const removeFilter = (key, value) => {
    console.log('🗑️ removeFilter chamado:', key, value);
    
    // Se estiver removendo a área desenhada no mapa
    if (key === 'mapArea') {
      setFilteredPropertyIds(null);
      setSavedBoundary(null);
      setCurrentPage(1);
      setShouldSearch(true);
      return;
    }
    
    // ✅ FIX: Criar novo objeto de filtros e aplicar
    const newFilters = { ...filters };
    
    // ✅ FIX: Casos especiais de remoção de ranges (price, area)
    if (key === 'priceRange') {
      delete newFilters.priceMin;
      delete newFilters.priceMax;
    } else if (key === 'areaRange') {
      delete newFilters.areaMin;
      delete newFilters.areaMax;
    } 
    // Se o valor for null/undefined ou string vazia, deletar a chave
    else if (value === null || value === undefined || value === '') {
      delete newFilters[key];
    } else {
      newFilters[key] = value;
    }
    
    console.log('🔄 Novos filtros após remoção:', newFilters);
    
    setFilters(newFilters);
    setCurrentPage(1);
    
    // Atualizar URL
    const params = filtersToUrlParams(newFilters);
    navigate(`/explorar?${params.toString()}`, { replace: true });
    
    // ✅ FIX: Disparar busca após remover filtro
    setShouldSearch(true);
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
    setSavedBoundary(null); // Clear saved boundary
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
    <>
      {/* Hero Section com Imagem de Fundo - Full width sem margin */}
      <div className="relative w-full h-[200px] -mt-8 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 overflow-hidden">
        {/* Imagem de Fundo */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/Explorar.png')`,
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      </div>

      {/* Filters Bar - Card branco sobre a imagem (overlap) */}
      <div className="relative -mt-10 px-4 pb-6">
        <div ref={topFiltersRef} className="mx-auto max-w-6xl">
          <TopFiltersBar
            filters={filters}
            onFilterClick={handleFilterClick}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-[1600px] px-4 py-2">
        {/* Active Filters Pills */}
        <ActiveFilters
          filters={filters}
          filteredPropertyIds={filteredPropertyIds}
          onRemove={removeFilter}
          onClearAll={clearAllFilters}
        />

        <div className="mt-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Title Section */}
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Explorar Imóveis
              </h1>
              <div className="flex items-center gap-2">
                <p className="text-slate-600">
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-cyan-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Carregando...
                    </span>
                  ) : (
                    <>
                      <span className="font-bold text-cyan-600">{totalItems || 0}</span> {totalItems === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-md border border-slate-200">
              <label className="text-sm font-semibold text-slate-600 whitespace-nowrap">
                Ordenar por:
              </label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pl-3 pr-9 py-2 bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg text-sm font-bold text-cyan-700 hover:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all cursor-pointer"
                >
                  <option value="default">Padrão</option>
                  <option value="price-asc">Menor preço</option>
                  <option value="price-desc">Maior preço</option>
                  <option value="area-desc">Maior área</option>
                  <option value="area-asc">Menor área</option>
                  <option value="newest">Mais recentes</option>
                </select>
                {/* Custom arrow */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-cyan-600">
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
        initialBoundary={savedBoundary}
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

    </main>
    </>
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
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  
  const images = property.images || [];
  const hasMultipleImages = images.length > 1;

  const handlePrevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => prev === 0 ? images.length - 1 : prev - 1);
  };

  const handleNextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => prev === images.length - 1 ? 0 : prev + 1);
  };

  const handleDotClick = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  // Calcular quais dots mostrar (máximo 7)
  const getDotIndices = () => {
    if (images.length <= 7) {
      return images.map((_, i) => i);
    }
    
    const totalDots = 7;
    const current = currentImageIndex;
    const total = images.length;
    
    if (current < 3) {
      return [0, 1, 2, 3, 4, 5, total - 1];
    }
    if (current > total - 4) {
      return [0, total - 6, total - 5, total - 4, total - 3, total - 2, total - 1];
    }
    return [0, current - 2, current - 1, current, current + 1, current + 2, total - 1];
  };

  return (
    <Link
      to={`/property/${property.id}`}
      className="group block h-full"
    >
      <div className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] h-full">
        {/* Imagem */}
        <div className="relative h-[400px] overflow-hidden">
          <img
            src={images[currentImageIndex] || '/placeholder.svg'}
            alt={property.title}
            className="w-full h-full object-cover object-bottom transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              e.target.src = '/placeholder.svg';
            }}
          />

          {/* Overlay Gradient - Só na parte de baixo, mais baixo ainda */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

          {/* Navigation Arrows */}
          {hasMultipleImages && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-20"
              >
                <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={handleNextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-20"
              >
                <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {hasMultipleImages && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
              {getDotIndices().map((index, i) => (
                <button
                  key={index}
                  onClick={(e) => handleDotClick(e, index)}
                  className={`h-1.5 rounded-full transition-all ${
                    currentImageIndex === index 
                      ? 'bg-white w-6' 
                      : 'bg-white/60 w-1.5 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Favorite Button */}
          <div className="absolute top-4 right-4 z-20">
            <FavoriteButton property={property} size="sm" />
          </div>
        </div>

        {/* Info Card - Mais compacto */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md p-3 m-4 rounded-2xl shadow-xl z-10">
          <div className="flex items-start justify-between mb-2">
            {/* Título e Localização */}
            <div className="flex-1">
              <h3 className="text-base font-bold text-slate-800 mb-0.5 line-clamp-1 group-hover:text-blue-600 transition-colors">
                {property.title}
              </h3>
              <p className="text-xs text-slate-600 mb-2">
                {property.city}, {property.country || 'Brasil'}
              </p>
            </div>

            {/* Preço - Lado direito */}
            <div className="text-right ml-4">
              <p className="text-[10px] text-slate-500 mb-0.5">A partir de</p>
              <p className="text-xl font-bold text-blue-600 whitespace-nowrap">
                {formatShortPrice(property.price)}
              </p>
            </div>
          </div>

          {/* Características - Ícones */}
          <div className="flex items-center gap-2.5 text-xs text-slate-600">
            {property.beds > 0 && (
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="whitespace-nowrap">{property.beds} {property.beds === 1 ? 'quarto' : 'quartos'}</span>
              </div>
            )}

            {property.baths > 0 && (
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
                <span className="whitespace-nowrap">{property.baths} {property.baths === 1 ? 'banheiro' : 'banheiros'}</span>
              </div>
            )}

            {property.area > 0 && (
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                <span className="whitespace-nowrap">{property.area}m²</span>
              </div>
            )}

            {/* Rating */}
            {property.rating && (
              <div className="flex items-center gap-1.5 ml-auto">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400 flex-shrink-0" />
                <span className="whitespace-nowrap font-semibold">{property.rating}</span>
              </div>
            )}
          </div>
        </div>
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

// Helper function to format short price (ex: R$ 850k)
function formatShortPrice(value) {
  if (!value) return 'R$ 0';
  if (value >= 1000000) {
    return `R$ ${(value / 1000000).toFixed(1)}mi`;
  }
  if (value >= 1000) {
    return `R$ ${(value / 1000).toFixed(0)}k`;
  }
  return formatCurrency(value);
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
      <div className="h-[260px] bg-slate-200 animate-pulse" />
      <div className="p-3 space-y-2">
        <div className="h-6 bg-slate-200 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-slate-200 rounded animate-pulse w-1/2" />
        <div className="h-8 bg-slate-200 rounded animate-pulse w-2/3" />
        <div className="h-4 bg-slate-200 rounded animate-pulse w-1/3" />
      </div>
    </div>
  );
}