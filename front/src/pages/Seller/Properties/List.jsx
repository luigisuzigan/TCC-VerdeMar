import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../../api/client.js';
import { MoreVertical, Pencil, Trash2, Eye, EyeOff, Search } from 'lucide-react';

export default function SellerPropertiesList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [q, setQ] = useState('');
  const [city, setCity] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const navigate = useNavigate();

  async function load() {
    setLoading(true); setError('');
    try {
      // Fetch a chunk; server may support search/filters in the future. For now, fetch page and filter client-side.
      const { data } = await api.get('/properties', { params: { limit, offset, search: undefined, published: undefined } });
      setItems(data.items || []);
    } catch (e) {
      setError(e?.response?.data?.error || 'Falha ao carregar imóveis');
    } finally { setLoading(false); }
  }

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [limit, offset]);

  const cities = useMemo(() => {
    const set = new Set(items.map((i) => i.city).filter(Boolean));
    return Array.from(set).sort();
  }, [items]);

  const filtered = useMemo(() => {
    return items.filter((it) => {
      if (q && !`${it.title} ${it.city} ${it.country}`.toLowerCase().includes(q.toLowerCase())) return false;
      if (city && it.city !== city) return false;
      if (minPrice !== '' && Number(it.price) < Number(minPrice)) return false;
      if (maxPrice !== '' && Number(it.price) > Number(maxPrice)) return false;
      return true;
    });
  }, [items, q, city, minPrice, maxPrice]);

  function toggleMenu(id) { setMenuOpenId((cur) => (cur === id ? null : id)); }

  async function togglePublish(id, published) {
    try { await api.patch(`/properties/${id}/publish`, { published: !published }); load(); }
    catch { alert('Falha ao publicar/despublicar'); }
  }

  async function remove(id) {
    if (!confirm('Excluir este imóvel?')) return;
    try { await api.delete(`/properties/${id}`); load(); } catch { alert('Falha ao excluir'); }
  }

  const page = Math.floor(offset / limit) + 1;
  const pages = Math.max(1, Math.ceil((items.length || 0) / limit));

  return (
    <main className="mx-auto w-[min(96vw,1100px)] py-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-extrabold">Minhas Propriedades</h1>
        <button onClick={() => navigate('/seller/properties/new')} className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">Novo imóvel</button>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-3 rounded-2xl bg-white p-3 ring-1 ring-slate-200 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto_auto] lg:items-center">
        <div className="flex items-center gap-2 rounded-full bg-slate-50 px-3 py-2 ring-1 ring-slate-200">
          <Search size={16} className="text-slate-500" />
          <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Buscar por título, cidade, país" className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" />
        </div>
        <select value={city} onChange={(e)=>setCity(e.target.value)} className="rounded-full bg-white px-3 py-2 text-sm ring-1 ring-slate-200">
          <option value="">Todas as cidades</option>
          {cities.map((c)=> <option key={c} value={c}>{c}</option>)}
        </select>
        <input type="number" value={minPrice} min={0} onChange={(e)=>setMinPrice(e.target.value)} placeholder="Preço mín" className="rounded-full bg-white px-3 py-2 text-sm ring-1 ring-slate-200" />
        <input type="number" value={maxPrice} min={0} onChange={(e)=>setMaxPrice(e.target.value)} placeholder="Preço máx" className="rounded-full bg-white px-3 py-2 text-sm ring-1 ring-slate-200" />
      </div>

      {error && <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>}

      <div className="overflow-hidden rounded-2xl ring-1 ring-slate-200">
        {loading ? (
          <div className="p-6 text-sm text-slate-600">Carregando...</div>
        ) : filtered.length === 0 ? (
          <div className="p-6 text-sm text-slate-600">Nenhum imóvel encontrado</div>
        ) : (
          <ul className="divide-y">
            {filtered.map((it) => (
              <li key={it.id} className="group grid grid-cols-[auto_1fr_auto] items-center gap-3 p-3 hover:bg-slate-50">
                <img src={it.images?.[0] || '/praia1.jpg'} alt={it.title} className="h-12 w-16 rounded object-cover ring-1 ring-slate-200" onError={(e)=>{e.currentTarget.onerror=null;e.currentTarget.src='https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=400&auto=format&fit=crop';}} />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Link to={`/seller/properties/${it.id}`} className="font-semibold hover:underline">{it.title}</Link>
                    <span className={"inline-flex rounded-full px-2 py-0.5 text-[11px] ring-1 " + (it.published ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' : 'bg-slate-100 text-slate-700 ring-slate-200')}>{it.published ? 'Publicado' : 'Rascunho'}</span>
                  </div>
                  <div className="mt-0.5 text-xs text-slate-600">{it.city}{it.country ? `, ${it.country}`: ''} • R$ {Number(it.price).toLocaleString('pt-BR')}</div>
                </div>
                <div className="relative">
                  <button className="invisible inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-slate-200 group-hover:visible" onClick={() => toggleMenu(it.id)} aria-haspopup="menu" aria-expanded={menuOpenId===it.id}>
                    <MoreVertical size={18} />
                  </button>
                  {menuOpenId === it.id && (
                    <div className="absolute right-0 z-10 mt-2 w-40 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-slate-200" role="menu">
                      <button onClick={() => navigate(`/seller/properties/${it.id}`)} className="flex w-full items-center gap-2 px-3 py-2 hover:bg-slate-50"><Pencil size={16}/> Editar</button>
                      <button onClick={() => togglePublish(it.id, it.published)} className="flex w-full items-center gap-2 px-3 py-2 hover:bg-slate-50">{it.published ? <EyeOff size={16}/> : <Eye size={16}/>} {it.published ? 'Despublicar' : 'Publicar'}</button>
                      <button onClick={() => remove(it.id)} className="flex w-full items-center gap-2 px-3 py-2 text-rose-700 hover:bg-rose-50"><Trash2 size={16}/> Excluir</button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Paginação simples */}
      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="text-slate-600">{filtered.length} resultados</div>
        <div className="flex items-center gap-2">
          <button disabled={page<=1} onClick={()=>setOffset(Math.max(0, offset - limit))} className="rounded-full border px-3 py-1 disabled:opacity-50">Anterior</button>
          <span>Página {page}</span>
          <button disabled={filtered.length < limit} onClick={()=>setOffset(offset + limit)} className="rounded-full border px-3 py-1 disabled:opacity-50">Próxima</button>
          <select value={limit} onChange={(e)=>{setOffset(0); setLimit(Number(e.target.value));}} className="rounded-full border px-2 py-1">
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
    </main>
  );
}
