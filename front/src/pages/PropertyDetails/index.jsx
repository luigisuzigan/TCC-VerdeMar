import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../api/client.js';

export default function PropertyDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const { data } = await api.get(`/properties/${id}`);
        setItem(data);
      } catch (e) {
        setError('Imóvel não encontrado');
      }
    }
    load();
  }, [id]);

  if (error) return <div className="p-6 text-rose-700">{error}</div>;
  if (!item) return <div className="p-6">Carregando...</div>;

  return (
    <main className="mx-auto w-[min(96vw,1200px)] py-8">
      <h1 className="mb-4 text-2xl font-bold">{item.title}</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          {(item.images || []).slice(0, 4).map((src, i) => (
            <img key={i} src={src} alt="" className="w-full rounded-md object-cover" />
          ))}
        </div>
        <div>
          <p className="text-slate-700">{item.description}</p>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <div><strong>Preço:</strong> R$ {Number(item.price).toLocaleString('pt-BR')}</div>
            <div><strong>Cidade:</strong> {item.city}</div>
            <div><strong>Quartos:</strong> {item.beds}</div>
            <div><strong>Banheiros:</strong> {item.baths}</div>
            <div><strong>Hóspedes:</strong> {item.guests}</div>
            <div><strong>Área:</strong> {item.area} m²</div>
          </div>
        </div>
      </div>
    </main>
  );
}