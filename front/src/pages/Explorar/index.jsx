import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../../api/client.js';
import PropertyCard from '../../components/Explorar/Section1.jsx';
import FiltersBar from '../../components/Explorar/TopFilters.jsx';

export default function Explorar() {
  const [params] = useSearchParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const query = useMemo(() => {
    const q = new URLSearchParams();
    if (params.get('search')) q.set('search', params.get('search'));
    if (params.get('type')) q.set('type', params.get('type'));
    if (params.get('minPrice')) q.set('minPrice', params.get('minPrice'));
    if (params.get('maxPrice')) q.set('maxPrice', params.get('maxPrice'));
    if (params.get('country')) q.set('country', params.get('country'));
    q.set('published', 'true');
    q.set('limit', '24');
    return q.toString();
  }, [params]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    (async () => {
      try {
        const { data } = await api.get(`/properties?${query}`);
        if (!active) return;
        const arr = Array.isArray(data?.items)
          ? data.items
          : Array.isArray(data)
            ? data
            : [];
        setItems(arr);
      } catch (e) {
        if (!active) return;
        setItems([]);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [query]);

  return (
    <main className="mx-auto w-[min(96vw,1400px)] py-8 sm:py-10">
      {/* Filtros topo (estilo chips/inputs como no print) */}
      <FiltersBar />

      {/* Header e sort */}
      <div className="mt-6 flex items-end justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900">Explorar imóveis</h1>
          <p className="mt-1 text-[13px] text-slate-600">
            {loading ? 'Carregando...' : `Encontrados ${items?.length || 0} imóveis`}
          </p>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <label className="text-[12px] font-medium text-slate-600">Sort by:</label>
          <select className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm">
            <option value="default">Default</option>
            <option value="price-asc">Menor preço</option>
            <option value="price-desc">Maior preço</option>
          </select>
        </div>
      </div>

      {/* Grid de cards no estilo do layout */}
      <section className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
          : items.map((it) => <PropertyCard key={it.id} item={it} />)}
      </section>
    </main>
  );
}

function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl ring-1 ring-slate-200 bg-white">
      <div className="h-[180px] w-full animate-pulse bg-slate-200" />
      <div className="space-y-2 p-4">
        <div className="h-4 w-2/3 rounded bg-slate-200" />
        <div className="h-3 w-1/2 rounded bg-slate-200" />
        <div className="mt-3 flex gap-2">
          <div className="h-6 w-16 rounded-full bg-slate-200" />
          <div className="h-6 w-16 rounded-full bg-slate-200" />
          <div className="h-6 w-16 rounded-full bg-slate-200" />
        </div>
      </div>
    </div>
  );
}