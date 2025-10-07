import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../../api/client.js';

const empty = {
  title: '', description: '', price: 0, currency: 'BRL', city: '', country: '',
  area: 0, beds: 0, baths: 0, guests: 0, rating: 0, reviews: 0, images: [], published: false,
};

export default function SellerPropertyForm() {
  const { id } = useParams();
  const [model, setModel] = useState(empty);
  const [imagesText, setImagesText] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchItem() {
      if (!id) return;
      const { data } = await api.get(`/properties/${id}`);
      setModel(data);
      setImagesText((data.images || []).join('\n'));
    }
    fetchItem();
  }, [id]);

  function update(field, value) { setModel((m) => ({ ...m, [field]: value })); }

  async function submit(e) {
    e.preventDefault(); setSaving(true); setError('');
    try {
      const payload = { ...model, images: imagesText.split(/\n+/).map((s) => s.trim()).filter(Boolean) };
      if (id) await api.put(`/properties/${id}`, payload);
      else await api.post('/properties', payload);
      navigate('/seller/properties');
    } catch (e) {
      const msg = e?.response?.data?.error || e?.response?.data?.errors?.[0]?.msg || 'Erro ao salvar';
      setError(msg);
    } finally { setSaving(false); }
  }

  return (
    <main className="mx-auto w-[min(96vw,900px)] py-8">
      <h1 className="mb-4 text-2xl font-bold">{id ? 'Editar imóvel' : 'Novo imóvel'}</h1>
      {error && <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>}

      <form className="grid grid-cols-1 gap-4 md:grid-cols-2" onSubmit={submit}>
        <div className="md:col-span-2">
          <label className="block text-sm">Título</label>
          <input className="w-full rounded-md border px-3 py-2" value={model.title} onChange={(e)=>update('title', e.target.value)} required />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm">Descrição</label>
          <textarea className="w-full rounded-md border px-3 py-2" rows={4} value={model.description} onChange={(e)=>update('description', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm">Preço</label>
          <input type="number" className="w-full rounded-md border px-3 py-2" value={model.price} onChange={(e)=>update('price', Number(e.target.value))} min={0} required />
        </div>
        <div>
          <label className="block text-sm">Moeda</label>
          <select className="w-full rounded-md border px-3 py-2" value={model.currency} onChange={(e)=>update('currency', e.target.value)}>
            <option value="BRL">BRL</option>
          </select>
        </div>
        <div>
          <label className="block text-sm">Cidade</label>
          <input className="w-full rounded-md border px-3 py-2" value={model.city} onChange={(e)=>update('city', e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm">País</label>
          <input className="w-full rounded-md border px-3 py-2" value={model.country} onChange={(e)=>update('country', e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm">Área (m²)</label>
          <input type="number" className="w-full rounded-md border px-3 py-2" value={model.area} onChange={(e)=>update('area', Number(e.target.value))} min={0} />
        </div>
        <div>
          <label className="block text-sm">Quartos</label>
          <input type="number" className="w-full rounded-md border px-3 py-2" value={model.beds} onChange={(e)=>update('beds', Number(e.target.value))} min={0} />
        </div>
        <div>
          <label className="block text-sm">Banheiros</label>
          <input type="number" className="w-full rounded-md border px-3 py-2" value={model.baths} onChange={(e)=>update('baths', Number(e.target.value))} min={0} />
        </div>
        <div>
          <label className="block text-sm">Hóspedes</label>
          <input type="number" className="w-full rounded-md border px-3 py-2" value={model.guests} onChange={(e)=>update('guests', Number(e.target.value))} min={0} />
        </div>
        <div>
          <label className="block text-sm">Rating</label>
          <input type="number" step="0.01" className="w-full rounded-md border px-3 py-2" value={model.rating} onChange={(e)=>update('rating', Number(e.target.value))} min={0} max={5} />
        </div>
        <div>
          <label className="block text-sm">Reviews</label>
          <input type="number" className="w-full rounded-md border px-3 py-2" value={model.reviews} onChange={(e)=>update('reviews', Number(e.target.value))} min={0} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm">Imagens (uma URL por linha)</label>
          <textarea className="w-full rounded-md border px-3 py-2" rows={6} value={imagesText} onChange={(e)=>setImagesText(e.target.value)} />
        </div>
        <div className="flex items-center gap-2 md:col-span-2">
          <input id="pub" type="checkbox" checked={!!model.published} onChange={(e)=>update('published', e.target.checked)} />
          <label htmlFor="pub">Publicado</label>
        </div>
        <div className="md:col-span-2 flex gap-2">
          <button disabled={saving} className="rounded-md bg-emerald-600 px-4 py-2 text-white">{saving ? 'Salvando...' : 'Salvar'}</button>
          <button type="button" className="rounded-md border px-4 py-2" onClick={() => navigate('/seller/properties')}>Cancelar</button>
        </div>
      </form>
    </main>
  );
}
