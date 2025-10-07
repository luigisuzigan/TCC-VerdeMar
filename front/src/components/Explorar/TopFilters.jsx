import { useEffect, useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

export default function FiltersBar() {
  const [params, setParams] = useSearchParams();

  const initial = useMemo(() => ({
    search: params.get('search') || '',
    type: params.get('type') || '',
    minPrice: params.get('minPrice') || '',
    maxPrice: params.get('maxPrice') || '',
    country: params.get('country') || '',
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
    setParams(next, { replace: true });
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 shadow-sm">
      <div className="grid gap-3 md:grid-cols-5">
        {/* Search */}
        <div className="md:col-span-2">
          <label className="mb-1 block text-[12px] font-semibold text-slate-600">Find Property</label>
          <div className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2">
            <Search size={16} className="text-slate-500" />
            <input
              value={form.search}
              onChange={(e) => setForm((s) => ({ ...s, search: e.target.value }))}
              onKeyDown={(e) => e.key === 'Enter' && apply()}
              placeholder="Ex.: pé na areia"
              className="w-full outline-none text-sm"
            />
          </div>
        </div>

        {/* Type */}
        <div>
          <label className="mb-1 block text-[12px] font-semibold text-slate-600">Type</label>
          <select
            value={form.type}
            onChange={(e) => setForm((s) => ({ ...s, type: e.target.value }))}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
          >
            <option value="">Todos</option>
            <option value="condominio">Condomínio</option>
            <option value="casa">Casa</option>
            <option value="apartamento">Apartamento</option>
          </select>
        </div>

        {/* Price */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="mb-1 block text-[12px] font-semibold text-slate-600">Min Price</label>
            <input
              inputMode="numeric"
              value={form.minPrice}
              onChange={(e) => setForm((s) => ({ ...s, minPrice: e.target.value }))}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
              placeholder="0"
            />
          </div>
          <div>
            <label className="mb-1 block text-[12px] font-semibold text-slate-600">Max Price</label>
            <input
              inputMode="numeric"
              value={form.maxPrice}
              onChange={(e) => setForm((s) => ({ ...s, maxPrice: e.target.value }))}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
              placeholder="1000000"
            />
          </div>
        </div>

        {/* Country */}
        <div>
          <label className="mb-1 block text-[12px] font-semibold text-slate-600">Country</label>
          <input
            value={form.country}
            onChange={(e) => setForm((s) => ({ ...s, country: e.target.value }))}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
            placeholder="Brasil"
          />
        </div>
      </div>

      <div className="mt-3 flex justify-end">
        <button
          type="button"
          onClick={apply}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow hover:brightness-110"
        >
          <SlidersHorizontal size={16} />
          Filtrar
        </button>
      </div>
    </div>
  );
}