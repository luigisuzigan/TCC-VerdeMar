import { useMemo, useState } from 'react';
import { Bath, BedDouble, MoveLeft, MoveRight, Ruler, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

/**
 * props:
 * - items?: Array de imóveis. Se não passar, usa MOCK abaixo.
 * - title?: Título da seção
 */
export default function NearbyCarousel({
  items = MOCK_ITEMS,
  title = 'Imóveis próximos'
}) {
  const perPage = 4;
  const pages = useMemo(() => chunk(items, perPage), [items]);
  const total = pages.length || 1;
  const [page, setPage] = useState(0);

  const prev = () => setPage(p => Math.max(0, p - 1));
  const next = () => setPage(p => Math.min(total - 1, p + 1));

  return (
    <section className="mx-auto mt-10 w-[min(96vw,1280px)]">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-[clamp(1.4rem,2.4vw,1.9rem)] font-extrabold tracking-tight text-slate-900">
            {title}
          </h2>
          <p className="mt-1 text-sm text-slate-500">Perto de você (localização aproximada)</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prev}
            disabled={page === 0}
            className={[
              'inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 transition',
              page === 0
                ? 'bg-slate-100 text-slate-400 ring-slate-200 cursor-not-allowed'
                : 'bg-white text-slate-700 ring-slate-300 hover:bg-slate-50'
            ].join(' ')}
            aria-label="Anterior"
          >
            <MoveLeft size={18} />
          </button>
          <button
            type="button"
            onClick={next}
            disabled={page >= total - 1}
            className={[
              'inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 transition',
              page >= total - 1
                ? 'bg-slate-100 text-slate-400 ring-slate-200 cursor-not-allowed'
                : 'bg-white text-slate-700 ring-slate-300 hover:bg-slate-50'
            ].join(' ')}
            aria-label="Próximo"
          >
            <MoveRight size={18} />
          </button>
        </div>
      </div>

      {/* Viewport do carrossel */}
      <div className="relative overflow-hidden rounded-[20px]">
        <div
          className="flex transition-transform duration-400 ease-out"
          style={{
            width: `${total * 100}%`,
            transform: `translateX(-${page * (100 / total)}%)`
          }}
        >
          {pages.map((group, idx) => (
            <div
              key={idx}
              className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
              style={{ width: `${100 / total}%` }}
            >
              {group.map((item) => (
                <PropertyCard key={item.id} item={item} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PropertyCard({ item }) {
  const {
    id,
    city,
    state,
    image,
    area,
    beds,
    baths,
    price,
    badge, // 'DESTAQUE' | 'NOVO' | undefined
    highlightPrice // boolean (faz pill verde no preço)
  } = item;

  return (
    <article className="group relative overflow-hidden rounded-[22px] ring-1 ring-slate-200 bg-slate-100 shadow-[0_6px_20px_rgba(15,23,42,.08)]">
      {/* Imagem */}
      <div className="relative aspect-[4/3]">
        <img
          src={image}
          alt={`${city}, ${state}`}
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
        />
        {/* Overlay de cor (degradê para leitura do texto) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/55" />
        {/* Badge */}
        {badge && (
          <span className="absolute left-3 top-3 rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-extrabold tracking-wide text-white shadow ring-1 ring-white/20">
            {badge}
          </span>
        )}
        {/* Conteúdo inferior da imagem */}
        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <h3 className="text-[17px] font-bold drop-shadow">
            {city}, {state}
          </h3>

          <div className="mt-2 flex flex-wrap items-center gap-3 text-[13px] text-white/90">
            <span className="inline-flex items-center gap-1">
              <Ruler size={15} className="opacity-90" /> {area} m²
            </span>
            <span className="inline-flex items-center gap-1">
              <BedDouble size={15} className="opacity-90" /> {beds}
            </span>
            <span className="inline-flex items-center gap-1">
              <Bath size={15} className="opacity-90" /> {baths}
            </span>

            {/* CTA flutuante (opcional) */}
            <Link
              to={`/property/${id}`}
              className="ml-auto inline-flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-1.5 text-[12px] font-semibold text-slate-900 shadow hover:bg-white"
            >
              Ver detalhes
            </Link>
          </div>
        </div>
      </div>

      {/* Barra inferior com preço */}
      <div className="flex items-center justify-between px-4 py-3 bg-white">
        <div className="inline-flex items-center gap-2 text-[13px] font-bold text-slate-800">
          <Tag size={15} className="text-emerald-600" />
          {currency.format(price)}
        </div>

        {highlightPrice ? (
          <div className="rounded-full bg-emerald-600 px-3 py-1 text-[12px] font-semibold text-white">
            {currency.format(price)}
          </div>
        ) : null}
      </div>
    </article>
  );
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

/* ----------------- MOCK DATA (substitua por dados reais depois) ----------------- */
const MOCK_ITEMS = [
  {
    id: 1,
    city: 'Porto Seguro',
    state: 'BA',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
    area: 220,
    beds: 3,
    baths: 2,
    price: 1200000
  },
  {
    id: 2,
    city: 'Ilhéus',
    state: 'BA',
    image:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop',
    area: 500,
    beds: 4,
    baths: 3,
    price: 600000,
    badge: 'DESTAQUE'
  },
  {
    id: 3,
    city: 'Paraty',
    state: 'RJ',
    image:
      'https://images.unsplash.com/photo-1523419409543-14f0bf93ba06?q=80&w=1200&auto=format&fit=crop',
    area: 400,
    beds: 4,
    baths: 3,
    price: 1200000,
    highlightPrice: true
  },
  {
    id: 4,
    city: 'Natal',
    state: 'RN',
    image:
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1200&auto=format&fit=crop',
    area: 180,
    beds: 2,
    baths: 2,
    price: 750000,
    badge: 'NOVO'
  },
  // Mais itens para paginar:
  {
    id: 5,
    city: 'Florianópolis',
    state: 'SC',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
    area: 260,
    beds: 3,
    baths: 2,
    price: 980000
  },
  {
    id: 6,
    city: 'Ubatuba',
    state: 'SP',
    image:
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1200&auto=format&fit=crop',
    area: 320,
    beds: 3,
    baths: 3,
    price: 1120000
  },
  {
    id: 7,
    city: 'Itacaré',
    state: 'BA',
    image:
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop',
    area: 210,
    beds: 3,
    baths: 2,
    price: 870000
  },
  {
    id: 8,
    city: 'Búzios',
    state: 'RJ',
    image:
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1200&auto=format&fit=crop',
    area: 350,
    beds: 4,
    baths: 4,
    price: 1450000
  }
];