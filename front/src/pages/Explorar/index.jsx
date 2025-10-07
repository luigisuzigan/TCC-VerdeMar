import { useEffect, useState } from 'react';
import ExploreFiltersBar from '../../components/Explorar/TopFilters';
import PropertyCard from '../../components/Explorar/Section1';
import { api } from '../../api/client.js';

export default function Explorar() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function load(filters = {}) {
    setLoading(true); setError('');
    try {
      const { data } = await api.get('/properties', { params: { search: filters.location || '', published: true } });
      setItems(data.items || []);
    } catch (e) {
      setError('Falha ao carregar imóveis');
    } finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  function handleSearch(filters) { load(filters); }

  return (
    <main className="pb-20">
      {/* HERO */}
      <section className="relative h-[300px] w-full overflow-hidden bg-slate-900 md:h-[340px]">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop"
          className="absolute inset-0 h-full w-full object-cover"
          alt="Explore hero"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/60" />
        <div className="relative mx-auto flex h-full w-[min(96vw,1400px)] flex-col justify-end pb-6 md:pb-10">
          <h1 className="mb-4 text-left text-3xl font-extrabold tracking-tight text-white drop-shadow md:text-4xl">
            Explore destinos incríveis
          </h1>
          <ExploreFiltersBar onSearch={handleSearch} />
        </div>
      </section>

      {/* GRID */}
      <section className="mx-auto mt-10 w-[min(96vw,1400px)]">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-medium text-slate-600">
            {items.length} resultados
          </p>
        </div>

        {loading ? (
          <div>Carregando...</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map(item => (
              <PropertyCard key={item.id} data={item} />
            ))}
          </div>
        )}

        {!loading && items.length === 0 && (
          <div className="mt-14 text-center text-sm text-slate-500">
            Nenhum imóvel encontrado com esse filtro.
          </div>
        )}
        {error && <div className="mt-4 text-center text-sm text-rose-700">{error}</div>}
      </section>
    </main>
  );
}