import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

/**
 * Componente de topo do Explorar inspirado no mock:
 * - Tabs principal (Buy / Rent / Commercial / On sale + quick search)
 * - Ações direita (Other services, List your property)
 * - Filtros em bloco interno cinza claro
 *
 * COMO LIGAR À API:
 * - Coletar todos os estados e montar query params no handleSearch
 * - Ex: /api/properties?mode=rent&type=villa&priceMin=...&priceMax=...
 */

const PROPERTY_TYPES = [
  { value: 'villa', label: 'Villa House' },
  { value: 'house', label: 'House' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'penthouse', label: 'Penthouse' },
  { value: 'studio', label: 'Studio' },
];

const QUICK_TAGS = [
  'Area', 'District', 'Metro', 'FNS', 'Class A', 'B', 'B+', 'C'
];

export default function TopFilters({ onSearch }) {
  // Tabs principal
  const [mainTab, setMainTab] = useState('buy'); // buy | rent | commercial | sale
  // Sub toggle (Rent / Sale) dentro do painel
  const [dealType, setDealType] = useState('rent'); // rent | sale

  // Campos
  const [propertyType, setPropertyType] = useState('villa');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [areaMin, setAreaMin] = useState('');
  const [areaMax, setAreaMax] = useState('');
  const [location, setLocation] = useState('');
  const [quickSearch, setQuickSearch] = useState('');
  const [displayTotalPrice, setDisplayTotalPrice] = useState(true);

  const [activeTags, setActiveTags] = useState([]);

  function toggleTag(tag) {
    setActiveTags(t =>
      t.includes(tag) ? t.filter(x => x !== tag) : [...t, tag]
    );
  }

  function handleSearch(e) {
    e?.preventDefault();
    const payload = {
      mainTab,
      dealType,
      propertyType,
      priceMin,
      priceMax,
      areaMin,
      areaMax,
      location,
      quickSearch,
      displayTotalPrice,
      tags: activeTags
    };
    // Chame callback se passado
    onSearch?.(payload);
    // Console para teste
    console.log('SEARCH PAYLOAD:', payload);
  }

  return (
    <div className="mx-auto mt-4 w-[min(98vw,1400px)] rounded-[32px] bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,.08)] ring-1 ring-slate-200 px-6 py-6 md:py-7">
      {/* Breadcrumb simples (opcional) */}
      <div className="text-[11px] font-medium text-slate-500 mb-3">
        Home page &gt; Explorar
      </div>

      {/* HEADER SUPERIOR */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        {/* Tabs principal + busca rápida */}
        <div className="flex flex-1 flex-wrap items-center gap-3">
          <MainTab
            label="Buy"
            value="buy"
            current={mainTab}
            onChange={setMainTab}
          />
          <MainTab
            label="Rent"
            value="rent"
            current={mainTab}
            onChange={setMainTab}
          />
            <MainTab
              label="Commercial"
              value="commercial"
              current={mainTab}
              onChange={setMainTab}
            />
          <MainTab
            label="On sale"
            value="sale"
            current={mainTab}
            onChange={setMainTab}
          />
          {/* Quick search small input */}
          <div className="relative">
            <input
              type="text"
              value={quickSearch}
              onChange={e => setQuickSearch(e.target.value)}
              placeholder="Quick search"
              className="h-10 w-[190px] rounded-full border border-slate-300 bg-white px-4 pr-10 text-sm outline-none focus:border-emerald-500"
            />
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
          </div>
        </div>

        {/* Ações direita */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <button
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Other services
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>
          <button
            type="button"
            className="inline-flex h-10 items-center rounded-full bg-slate-900 px-5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            List your property
          </button>
        </div>
      </div>

      {/* TÍTULO */}
      <div className="mt-6">
        <h1 className="text-[clamp(1.6rem,2.6vw,2.25rem)] font-extrabold tracking-tight text-slate-900">
          Explorar imóveis no litoral
        </h1>
      </div>

      {/* BARRA: DISPLAY TOTAL PRICE */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <div className="flex items-center gap-3">
          <div className="text-sm font-medium text-slate-700">
            Display Total Price
          </div>
          <label className="inline-flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={displayTotalPrice}
              onChange={e => setDisplayTotalPrice(e.target.checked)}
            />
            <span className="relative h-6 w-11 rounded-full bg-slate-300 transition peer-checked:bg-emerald-500">
              <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow transition peer-checked:translate-x-5" />
            </span>
            <span className="text-xs text-slate-500">
              Inclui taxas
            </span>
          </label>
        </div>
      </div>

      {/* PAINEL DE FILTROS PRINCIPAL */}
      <form
        onSubmit={handleSearch}
        className="mt-5 rounded-2xl bg-slate-50 px-5 py-5 ring-1 ring-slate-200/70"
      >
        {/* Toggle Rent / Sale */}
        <div className="flex flex-wrap items-center gap-3">
          <ToggleDeal
            label="Rent"
            value="rent"
            current={dealType}
            onChange={setDealType}
          />
          <ToggleDeal
            label="Sale"
            value="sale"
            current={dealType}
            onChange={setDealType}
          />
        </div>

        {/* LINHA DE CAMPOS */}
        <div className="mt-5 grid gap-4 md:grid-cols-5">
          {/* Tipo de propriedade */}
          <FieldWrapper label="Tipo de Propriedade">
            <select
              value={propertyType}
              onChange={e => setPropertyType(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500"
            >
              {PROPERTY_TYPES.map(pt => (
                <option key={pt.value} value={pt.value}>
                  {pt.label}
                </option>
              ))}
            </select>
          </FieldWrapper>

          {/* Faixa de preço */}
            <FieldWrapper label="Preço (R$ / mês)">
            <div className="flex gap-2">
              <input
                type="number"
                inputMode="numeric"
                min={0}
                placeholder="Mín"
                value={priceMin}
                onChange={e => setPriceMin(e.target.value)}
                className="w-1/2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500"
              />
              <input
                type="number"
                inputMode="numeric"
                min={0}
                placeholder="Máx"
                value={priceMax}
                onChange={e => setPriceMax(e.target.value)}
                className="w-1/2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500"
              />
            </div>
          </FieldWrapper>

          {/* Área */}
          <FieldWrapper label="Área (m²)">
            <div className="flex gap-2">
              <input
                type="number"
                min={0}
                placeholder="De"
                value={areaMin}
                onChange={e => setAreaMin(e.target.value)}
                className="w-1/2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500"
              />
              <input
                type="number"
                min={0}
                placeholder="Até"
                value={areaMax}
                onChange={e => setAreaMax(e.target.value)}
                className="w-1/2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500"
              />
            </div>
          </FieldWrapper>

          {/* Localização */}
          <FieldWrapper label="Localização">
            <input
              type="text"
              placeholder="Cidade / endereço"
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500"
            />
          </FieldWrapper>

          {/* Botão principal */}
          <div className="flex items-end">
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-emerald-700"
            >
              <Search size={16} />
              Buscar Imóveis
            </button>
          </div>
        </div>

        {/* TAGS RÁPIDAS */}
        <div className="mt-5 flex flex-wrap gap-2">
          {QUICK_TAGS.map(tag => {
            const active = activeTags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={[
                  'rounded-full border px-3 py-1.5 text-xs font-medium transition',
                  active
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-100'
                ].join(' ')}
              >
                {tag}
              </button>
            );
          })}

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100"
            >
              All Filters
              <SlidersHorizontal size={14} className="text-slate-500" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

/* ----------------- Subcomponentes ----------------- */

function MainTab({ label, value, current, onChange }) {
  const active = current === value;
  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={[
        'h-10 rounded-full px-5 text-sm font-semibold transition ring-1',
        active
          ? 'bg-slate-900 text-white ring-slate-900'
          : 'bg-slate-100 text-slate-700 ring-transparent hover:bg-slate-200'
      ].join(' ')}
    >
      {label}
    </button>
  );
}

function ToggleDeal({ label, value, current, onChange }) {
  const active = current === value;
  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={[
        'rounded-full px-4 py-1.5 text-xs font-semibold ring-1 transition',
        active
          ? 'bg-slate-900 text-white ring-slate-900'
          : 'bg-white text-slate-600 ring-slate-300 hover:bg-slate-100'
      ].join(' ')}
    >
      {label}
    </button>
  );
}

function FieldWrapper({ label, children }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[12px] font-semibold text-slate-600">{label}</span>
      {children}
    </label>
  );
}