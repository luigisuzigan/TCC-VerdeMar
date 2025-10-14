import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { MapPin, DollarSign, Home, Maximize2, X, Star } from 'lucide-react';
import { api } from '../../api/client.js';
import { parseFiltersFromUrl, getFilterDescriptions, countActiveFilters, filtersToUrlParams } from '../../utils/filterHelpers.js';
import MobileFilters from '../../components/Explorar/MobileFilters.jsx';
import ActiveFilters from '../../components/Explorar/ActiveFilters.jsx';
import Pagination from '../../components/Explorar/Pagination.jsx';

export default function Explorar() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 24;

  // Parse filters from URL on mount
  useEffect(() => {
    const parsed = parseFiltersFromUrl(searchParams);
    setFilters(parsed);
  }, [searchParams]);

  // Fetch properties when filters change
  useEffect(() => {
    let active = true;
    setLoading(true);
    
    (async () => {
      try {
        const query = buildApiQuery(filters);
        const offset = (currentPage - 1) * itemsPerPage;
        const { data } = await api.get(`/properties?${query}&offset=${offset}`);
        if (!active) return;
        
        const arr = Array.isArray(data?.items) ? data.items : Array.isArray(data) ? data : [];
        setItems(arr);
        setTotalItems(data?.total || arr.length);
      } catch (e) {
        if (!active) return;
        setItems([]);
        setTotalItems(0);
      } finally {
        if (active) setLoading(false);
      }
    })();
    
    return () => { active = false; };
  }, [filters, currentPage]);

  // Build API query from filters
  const buildApiQuery = (filters) => {
    const params = new URLSearchParams();
    params.set('published', 'true');
    params.set('limit', '24');
    
    // Location
    if (filters.location) {
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

  const removeFilter = (key, value) => {
    updateFilter(key, value);
  };

  const clearFilter = (key) => {
    const newFilters = { ...filters };
    delete newFilters[key];
    setFilters(newFilters);
    
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
      {/* Mobile Filters Button */}
      <MobileFilters
        filters={filters}
        updateFilter={updateFilter}
        clearFilter={clearFilter}
        clearAllFilters={clearAllFilters}
        activeFiltersCount={activeFiltersCount}
      />

      <div className="flex gap-8">
        {/* Sidebar de Filtros */}
        <aside className="hidden lg:block w-[280px] flex-shrink-0">
          <div className="sticky top-24">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900">Custom Filter</h2>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Filtros ativos */}
            {filterDescriptions.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {filterDescriptions.map((desc, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                  >
                    {desc}
                  </span>
                ))}
              </div>
            )}

            <div className="space-y-6">
              {/* Location Filter */}
              <FilterSection
                title="Location"
                icon={<MapPin className="w-4 h-4" />}
                onClear={() => clearFilter('location')}
                hasValue={!!filters.location}
              >
                <input
                  type="text"
                  placeholder="Buscar localização..."
                  value={filters.location || ''}
                  onChange={(e) => updateFilter('location', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <div className="mt-2 space-y-1">
                  {['Jakarta, Indonesia', 'Semarang, Indonesia'].map((loc) => (
                    <label key={loc} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer hover:bg-slate-50 p-2 rounded">
                      <input
                        type="checkbox"
                        checked={filters.location === loc}
                        onChange={(e) => updateFilter('location', e.target.checked ? loc : '')}
                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      {loc}
                    </label>
                  ))}
                </div>
              </FilterSection>

              {/* Price Range Filter */}
              <FilterSection
                title="Price Range"
                icon={<DollarSign className="w-4 h-4" />}
                onClear={() => {
                  clearFilter('priceMin');
                  clearFilter('priceMax');
                }}
                hasValue={!!(filters.priceMin || filters.priceMax)}
              >
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm cursor-pointer hover:bg-slate-50 p-2 rounded">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={!filters.priceMin && filters.priceMax === 1000}
                      onChange={() => {
                        updateFilter('priceMin', '');
                        updateFilter('priceMax', 1000);
                      }}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    Under $1.000
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer hover:bg-slate-50 p-2 rounded">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={filters.priceMin === 1000 && filters.priceMax === 15000}
                      onChange={() => {
                        updateFilter('priceMin', 1000);
                        updateFilter('priceMax', 15000);
                      }}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    $1.000 - $15.000
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer hover:bg-slate-50 p-2 rounded">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={filters.priceMin === 15000 && !filters.priceMax}
                      onChange={() => {
                        updateFilter('priceMin', 15000);
                        updateFilter('priceMax', '');
                      }}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    More Than $15.000
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer hover:bg-slate-50 p-2 rounded">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={!filters.priceMin && !filters.priceMax}
                      onChange={() => {
                        updateFilter('priceMin', '');
                        updateFilter('priceMax', '');
                      }}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    Custom
                  </label>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="$10K"
                    value={filters.priceMin || ''}
                    onChange={(e) => updateFilter('priceMin', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  />
                  <input
                    type="number"
                    placeholder="$50K"
                    value={filters.priceMax || ''}
                    onChange={(e) => updateFilter('priceMax', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
              </FilterSection>

              {/* Land Area Filter */}
              <FilterSection
                title="Land Area"
                icon={<Maximize2 className="w-4 h-4" />}
                onClear={() => {
                  clearFilter('areaMin');
                  clearFilter('areaMax');
                }}
                hasValue={!!(filters.areaMin || filters.areaMax)}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.areaMin || ''}
                    onChange={(e) => updateFilter('areaMin', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  />
                  <span className="text-slate-500 text-sm">sq ft</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.areaMax || ''}
                    onChange={(e) => updateFilter('areaMax', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  />
                  <span className="text-slate-500 text-sm">sq ft</span>
                </div>
              </FilterSection>

              {/* Type of Place Filter */}
              <FilterSection
                title="Type Of Place"
                icon={<Home className="w-4 h-4" />}
                onClear={() => clearFilter('propertyTypes')}
                hasValue={!!(filters.propertyTypes?.length > 0)}
              >
                <div className="space-y-2">
                  {[
                    { id: 'casa', label: 'Single Family Home' },
                    { id: 'apartamento', label: 'Condo/Townhouse' },
                    { id: 'comercial', label: 'Apartment' },
                    { id: 'terreno', label: 'Bungalow' },
                  ].map((type) => (
                    <label key={type.id} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-slate-50 p-2 rounded">
                      <input
                        type="checkbox"
                        checked={filters.propertyTypes?.includes(type.id) || false}
                        onChange={(e) => {
                          const current = filters.propertyTypes || [];
                          const updated = e.target.checked
                            ? [...current, type.id]
                            : current.filter(t => t !== type.id);
                          updateFilter('propertyTypes', updated);
                        }}
                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      {type.label}
                    </label>
                  ))}
                </div>
              </FilterSection>

              {/* Amenities Filter */}
              <FilterSection
                title="Amenities"
                onClear={() => clearFilter('amenities')}
                hasValue={!!(filters.amenities?.length > 0)}
              >
                <div className="space-y-2">
                  {[
                    'Parking',
                    'Pet Allowed',
                    'Garden',
                    'Gym & Fitness',
                    'Swimming Pool',
                    'Home Theater',
                  ].map((amenity) => (
                    <label key={amenity} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-slate-50 p-2 rounded">
                      <input
                        type="checkbox"
                        checked={filters.amenities?.includes(amenity) || false}
                        onChange={(e) => {
                          const current = filters.amenities || [];
                          const updated = e.target.checked
                            ? [...current, amenity]
                            : current.filter(a => a !== amenity);
                          updateFilter('amenities', updated);
                        }}
                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      {amenity}
                    </label>
                  ))}
                </div>
              </FilterSection>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
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
            <div className="hidden md:flex items-center gap-2">
              <label className="text-sm font-medium text-slate-600">
                Ordenar por:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:border-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
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

          {/* Active Filters Pills */}
          <ActiveFilters
            filters={filters}
            onRemove={removeFilter}
            onClearAll={clearAllFilters}
          />

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
      </div>
    </main>
  );
}

// Filter Section Component
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