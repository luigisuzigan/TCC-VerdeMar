import { useEffect, useMemo, useState } from 'react';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

export default function FiltersBar() {
  const [params, setParams] = useSearchParams();
  const [showAdvanced, setShowAdvanced] = useState(false);

  const initial = useMemo(() => ({
    search: params.get('search') || '',
    type: params.get('type') || '',
    minPrice: params.get('minPrice') || '',
    maxPrice: params.get('maxPrice') || '',
    country: params.get('country') || '',
    // Filtros avançados
    minBedrooms: params.get('minBedrooms') || '',
    minBathrooms: params.get('minBathrooms') || '',
    minSuites: params.get('minSuites') || '',
    minParkingSpaces: params.get('minParkingSpaces') || '',
    minArea: params.get('minArea') || '',
    maxArea: params.get('maxArea') || '',
    neighborhood: params.get('neighborhood') || '',
    minCondoFee: params.get('minCondoFee') || '',
    maxCondoFee: params.get('maxCondoFee') || '',
    minFloor: params.get('minFloor') || '',
    maxFloor: params.get('maxFloor') || '',
    minYearBuilt: params.get('minYearBuilt') || '',
    category: params.get('category') || '',
  }), [params]);

  const [form, setForm] = useState(initial);

  useEffect(() => {
    setForm(initial);
  }, [initial]);

  function apply() {
    const next = new URLSearchParams();
    if (form.search) next.set('search', form.search);
    if (form.type) next.set('type', form.type);
    if (form.minPrice) next.set('minPrice', form.minPrice);
    if (form.maxPrice) next.set('maxPrice', form.maxPrice);
    if (form.country) next.set('country', form.country);
    
    // Filtros avançados
    if (form.minBedrooms) next.set('minBedrooms', form.minBedrooms);
    if (form.minBathrooms) next.set('minBathrooms', form.minBathrooms);
    if (form.minSuites) next.set('minSuites', form.minSuites);
    if (form.minParkingSpaces) next.set('minParkingSpaces', form.minParkingSpaces);
    if (form.minArea) next.set('minArea', form.minArea);
    if (form.maxArea) next.set('maxArea', form.maxArea);
    if (form.neighborhood) next.set('neighborhood', form.neighborhood);
    if (form.minCondoFee) next.set('minCondoFee', form.minCondoFee);
    if (form.maxCondoFee) next.set('maxCondoFee', form.maxCondoFee);
    if (form.minFloor) next.set('minFloor', form.minFloor);
    if (form.maxFloor) next.set('maxFloor', form.maxFloor);
    if (form.minYearBuilt) next.set('minYearBuilt', form.minYearBuilt);
    if (form.category) next.set('category', form.category);
    
    setParams(next, { replace: true });
  }

  function clearFilters() {
    setForm({
      search: '',
      type: '',
      minPrice: '',
      maxPrice: '',
      country: '',
      minBedrooms: '',
      minBathrooms: '',
      minSuites: '',
      minParkingSpaces: '',
      minArea: '',
      maxArea: '',
      neighborhood: '',
      minCondoFee: '',
      maxCondoFee: '',
      minFloor: '',
      maxFloor: '',
      minYearBuilt: '',
      category: '',
    });
    setParams(new URLSearchParams(), { replace: true });
  }

  const hasAdvancedFilters = form.minBedrooms || form.minBathrooms || form.minSuites || 
                             form.minParkingSpaces || form.minArea || form.maxArea ||
                             form.neighborhood || form.minCondoFee || form.maxCondoFee ||
                             form.minFloor || form.maxFloor || form.minYearBuilt || form.category;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 shadow-sm">
      {/* Filtros Básicos */}
      <div className="grid gap-3 md:grid-cols-5">
        {/* Search */}
        <div className="md:col-span-2">
          <label className="mb-1 block text-[12px] font-semibold text-slate-600">Buscar Imóvel</label>
          <div className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2">
            <Search size={16} className="text-slate-500" />
            <input
              value={form.search}
              onChange={(e) => setForm((s) => ({ ...s, search: e.target.value }))}
              onKeyDown={(e) => e.key === 'Enter' && apply()}
              placeholder="Ex.: pé na areia, vista mar"
              className="w-full outline-none text-sm"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="mb-1 block text-[12px] font-semibold text-slate-600">Categoria</label>
          <select
            value={form.category}
            onChange={(e) => setForm((s) => ({ ...s, category: e.target.value }))}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
          >
            <option value="">Todas</option>
            <option value="Residencial">Residencial</option>
            <option value="Comercial">Comercial</option>
            <option value="Industrial">Industrial</option>
            <option value="Terreno">Terreno</option>
            <option value="Especial">Especial</option>
          </select>
        </div>

        {/* Type */}
        <div>
          <label className="mb-1 block text-[12px] font-semibold text-slate-600">Tipo</label>
          <select
            value={form.type}
            onChange={(e) => setForm((s) => ({ ...s, type: e.target.value }))}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
          >
            <option value="">Todos</option>
            <option value="Casa">Casa</option>
            <option value="Apartamento">Apartamento</option>
            <option value="Cobertura">Cobertura</option>
            <option value="Sobrado">Sobrado</option>
            <option value="Kitnet / Studio / Loft">Kitnet/Studio</option>
            <option value="Terreno residencial">Terreno</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="mb-1 block text-[12px] font-semibold text-slate-600">Preço Mín</label>
            <input
              type="number"
              value={form.minPrice}
              onChange={(e) => setForm((s) => ({ ...s, minPrice: e.target.value }))}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
              placeholder="0"
            />
          </div>
          <div>
            <label className="mb-1 block text-[12px] font-semibold text-slate-600">Preço Máx</label>
            <input
              type="number"
              value={form.maxPrice}
              onChange={(e) => setForm((s) => ({ ...s, maxPrice: e.target.value }))}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
              placeholder="999999999"
            />
          </div>
        </div>
      </div>

      {/* Botão Filtros Avançados */}
      <div className="mt-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
            hasAdvancedFilters 
              ? 'bg-blue-100 text-blue-700' 
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <SlidersHorizontal size={16} />
          Filtros Avançados
          <ChevronDown 
            size={16} 
            className={`transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
          />
          {hasAdvancedFilters && (
            <span className="ml-1 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
              •
            </span>
          )}
        </button>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={clearFilters}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Limpar
          </button>
          <button
            type="button"
            onClick={apply}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white shadow hover:brightness-110"
          >
            <Search size={16} />
            Buscar
          </button>
        </div>
      </div>

      {/* Filtros Avançados (Expansível) */}
      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-slate-200 grid gap-3 md:grid-cols-4">
          {/* Quartos */}
          <div>
            <label className="mb-1 block text-[12px] font-semibold text-slate-600">Min. Quartos</label>
            <input
              type="number"
              min="0"
              value={form.minBedrooms}
              onChange={(e) => setForm((s) => ({ ...s, minBedrooms: e.target.value }))}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
              placeholder="0"
            />
          </div>

          {/* Banheiros */}
          <div>
            <label className="mb-1 block text-[12px] font-semibold text-slate-600">Min. Banheiros</label>
            <input
              type="number"
              min="0"
              value={form.minBathrooms}
              onChange={(e) => setForm((s) => ({ ...s, minBathrooms: e.target.value }))}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
              placeholder="0"
            />
          </div>

          {/* Suítes */}
          <div>
            <label className="mb-1 block text-[12px] font-semibold text-slate-600">Min. Suítes</label>
            <input
              type="number"
              min="0"
              value={form.minSuites}
              onChange={(e) => setForm((s) => ({ ...s, minSuites: e.target.value }))}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
              placeholder="0"
            />
          </div>

          {/* Vagas */}
          <div>
            <label className="mb-1 block text-[12px] font-semibold text-slate-600">Min. Vagas</label>
            <input
              type="number"
              min="0"
              value={form.minParkingSpaces}
              onChange={(e) => setForm((s) => ({ ...s, minParkingSpaces: e.target.value }))}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
              placeholder="0"
            />
          </div>

          {/* Área */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="mb-1 block text-[12px] font-semibold text-slate-600">Área Mín (m²)</label>
              <input
                type="number"
                min="0"
                value={form.minArea}
                onChange={(e) => setForm((s) => ({ ...s, minArea: e.target.value }))}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                placeholder="0"
              />
            </div>
            <div>
              <label className="mb-1 block text-[12px] font-semibold text-slate-600">Área Máx (m²)</label>
              <input
                type="number"
                min="0"
                value={form.maxArea}
                onChange={(e) => setForm((s) => ({ ...s, maxArea: e.target.value }))}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                placeholder="9999"
              />
            </div>
          </div>

          {/* Bairro */}
          <div>
            <label className="mb-1 block text-[12px] font-semibold text-slate-600">Bairro</label>
            <input
              type="text"
              value={form.neighborhood}
              onChange={(e) => setForm((s) => ({ ...s, neighborhood: e.target.value }))}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
              placeholder="Ex: Centro"
            />
          </div>

          {/* Condomínio */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="mb-1 block text-[12px] font-semibold text-slate-600">Condo Mín</label>
              <input
                type="number"
                min="0"
                value={form.minCondoFee}
                onChange={(e) => setForm((s) => ({ ...s, minCondoFee: e.target.value }))}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                placeholder="0"
              />
            </div>
            <div>
              <label className="mb-1 block text-[12px] font-semibold text-slate-600">Condo Máx</label>
              <input
                type="number"
                min="0"
                value={form.maxCondoFee}
                onChange={(e) => setForm((s) => ({ ...s, maxCondoFee: e.target.value }))}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                placeholder="9999"
              />
            </div>
          </div>

          {/* Andar */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="mb-1 block text-[12px] font-semibold text-slate-600">Andar Mín</label>
              <input
                type="number"
                min="0"
                value={form.minFloor}
                onChange={(e) => setForm((s) => ({ ...s, minFloor: e.target.value }))}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                placeholder="0"
              />
            </div>
            <div>
              <label className="mb-1 block text-[12px] font-semibold text-slate-600">Andar Máx</label>
              <input
                type="number"
                min="0"
                value={form.maxFloor}
                onChange={(e) => setForm((s) => ({ ...s, maxFloor: e.target.value }))}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                placeholder="99"
              />
            </div>
          </div>

          {/* Ano de Construção */}
          <div>
            <label className="mb-1 block text-[12px] font-semibold text-slate-600">Ano Mín.</label>
            <input
              type="number"
              min="1900"
              max={new Date().getFullYear()}
              value={form.minYearBuilt}
              onChange={(e) => setForm((s) => ({ ...s, minYearBuilt: e.target.value }))}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
              placeholder="2000"
            />
          </div>
        </div>
      )}
    </div>
  );
}