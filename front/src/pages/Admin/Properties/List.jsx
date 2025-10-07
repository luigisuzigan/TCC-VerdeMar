import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../../api/client.js';

export default function AdminPropertiesList() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const navigate = useNavigate();

  const page = useMemo(() => Math.floor(offset / limit) + 1, [offset, limit]);
  const pages = useMemo(() => Math.max(1, Math.ceil(total / limit)), [total, limit]);

  async function load() {
    setLoading(true); setError('');
    try {
      const { data } = await api.get('/properties', { params: { search: q, limit, offset, published: undefined } });
      setItems(data.items || []);
      setTotal(data.total || 0);
    } catch (e) {
      setError(e?.response?.data?.error || 'Falha ao carregar imóveis');
    } finally { setLoading(false); }
  }

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [limit, offset]);

  function search(e) { e.preventDefault(); setOffset(0); load(); }

  async function togglePublish(id, published) {
    try {
      await api.patch(`/properties/${id}/publish`, { published: !published });
      load();
    } catch (e) { alert('Falha ao publicar/despublicar'); }
  }

  async function remove(id) {
    if (!confirm('Deseja excluir este imóvel?')) return;
    try { await api.delete(`/properties/${id}`); load(); } catch { alert('Falha ao excluir'); }
  }

  return (
    <main className="mx-auto w-[min(96vw,1100px)] py-8">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Imóveis</h1>
        <Link to="/admin/properties/new" className="rounded-md bg-emerald-600 px-4 py-2 text-white">Novo</Link>
      </div>

      <form onSubmit={search} className="mb-4 flex items-center gap-2">
        <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Buscar por título, cidade, país"
               className="w-full rounded-md border px-3 py-2" />
        <button className="rounded-md border px-4 py-2">Buscar</button>
      </form>

      {error && <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>}

      <div className="overflow-auto rounded-lg ring-1 ring-slate-200">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <Th>Título</Th>
              <Th>Cidade</Th>
              <Th className="text-right">Preço</Th>
              <Th className="text-center">Publicado</Th>
              <Th>Ações</Th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><Td colSpan={5}>Carregando...</Td></tr>
            ) : items.length === 0 ? (
              <tr><Td colSpan={5}>Nenhum imóvel encontrado</Td></tr>
            ) : (
              items.map((it) => (
                <tr key={it.id} className="border-t">
                  <Td className="font-medium">{it.title}</Td>
                  <Td>{it.city}</Td>
                  <Td className="text-right">R$ {Number(it.price).toLocaleString('pt-BR')}</Td>
                  <Td className="text-center">
                    <span className={["inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1",
                      it.published ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' : 'bg-slate-100 text-slate-700 ring-slate-200'].join(' ')}>
                      {it.published ? 'Publicado' : 'Rascunho'}
                    </span>
                  </Td>
                  <Td>
                    <div className="flex items-center gap-2">
                      <button onClick={() => togglePublish(it.id, it.published)} className="rounded-md border px-3 py-1">
                        {it.published ? 'Despublicar' : 'Publicar'}
                      </button>
                      <Link to={`/admin/properties/${it.id}`} className="rounded-md border px-3 py-1">Editar</Link>
                      <button onClick={() => remove(it.id)} className="rounded-md border px-3 py-1 text-rose-700">Excluir</button>
                    </div>
                  </Td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-slate-600">{total} resultados</div>
        <div className="flex items-center gap-2">
          <button disabled={page<=1} onClick={()=>setOffset(Math.max(0, offset - limit))} className="rounded-md border px-3 py-1 disabled:opacity-50">Anterior</button>
          <span className="text-sm">Página {page} de {pages}</span>
          <button disabled={page>=pages} onClick={()=>setOffset(offset + limit)} className="rounded-md border px-3 py-1 disabled:opacity-50">Próxima</button>
          <select value={limit} onChange={(e)=>{setOffset(0); setLimit(Number(e.target.value));}} className="rounded-md border px-2 py-1 text-sm">
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
    </main>
  );
}

function Th({ children, className = '' }) { return <th className={["px-3 py-2 text-left font-semibold", className].join(' ')}>{children}</th>; }
function Td({ children, className = '', colSpan }) { return <td className={["px-3 py-2", className].join(' ')} colSpan={colSpan}>{children}</td>; }
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../../api/client.js';

export default function AdminPropertiesList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [error, setError] = useState('');

  async function load() {
    setLoading(true); setError('');
    try {
      const { data } = await api.get('/properties', { params: { search: q, published: undefined, limit: 100, offset: 0 } });
      setItems(data.items || []);
    } catch (e) {
      setError(e?.response?.data?.error || 'Falha ao carregar');
    } finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  async function togglePublish(id, published) {
    await api.patch(`/properties/${id}/publish`, { published: !published });
    load();
  }

  async function remove(id) {
    if (!confirm('Excluir este imóvel?')) return;
    await api.delete(`/properties/${id}`);
    load();
  }

  return (
    <main className="mx-auto w-[min(96vw,1200px)] py-8">
      <div className="mb-6 flex items-center gap-3">
        <h1 className="text-2xl font-bold">Imóveis</h1>
        <Link to="/admin/properties/new" className="ml-auto rounded-md bg-emerald-600 px-4 py-2 text-white">Novo</Link>
      </div>

      <div className="mb-4 flex gap-2">
        <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Buscar..." className="w-64 rounded-md border px-3 py-2" />
        <button onClick={load} className="rounded-md border px-4 py-2">Buscar</button>
      </div>

      {error && <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>}
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <div className="overflow-x-auto rounded-md border">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-2 text-left">Título</th>
                <th className="p-2 text-left">Cidade</th>
                <th className="p-2 text-left">Preço (BRL)</th>
                <th className="p-2 text-left">Publicado</th>
                <th className="p-2 text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.id} className="border-t">
                  <td className="p-2">{it.title}</td>
                  <td className="p-2">{it.city} / {it.country}</td>
                  <td className="p-2">{Number(it.price).toLocaleString('pt-BR')}</td>
                  <td className="p-2">{it.published ? 'Sim' : 'Não'}</td>
                  <td className="p-2 space-x-2">
                    <Link to={`/admin/properties/${it.id}`} className="rounded border px-2 py-1">Editar</Link>
                    <button onClick={() => togglePublish(it.id, it.published)} className="rounded border px-2 py-1">
                      {it.published ? 'Despublicar' : 'Publicar'}
                    </button>
                    <button onClick={() => remove(it.id)} className="rounded border px-2 py-1 text-rose-700">Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
