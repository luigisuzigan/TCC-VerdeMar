import { Link } from 'react-router-dom';
import {
  Heart,
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  Star
} from 'lucide-react';

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'USD' });

// Dados de exemplo (substitua por dados reais depois)
const MOCK = {
  count: 262,
  list: [
    {
      id: '1',
      title: 'Hillary Gross',
      address: '22 Goldhawk Road, London W12 8DH, UK',
      price: 1879000,
      priceSuffix: '/day',
      area: 250,
      beds: 3,
      baths: 2,
      img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop',
      tag: null
    },
    {
      id: '2',
      title: 'Robinan Villa',
      address: '22 Goldhawk Road, London W12 8DH, UK',
      price: 2254000,
      priceSuffix: '/day',
      area: 250,
      beds: 3,
      baths: 2,
      img: 'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop',
      tag: { label: 'Hot Spot', color: 'bg-purple-500' }
    },
    {
      id: '3',
      title: 'Marochydorr',
      address: '22 Goldhawk Road, London W12 8DH, UK',
      price: 3213000,
      priceSuffix: '/day',
      area: 250,
      beds: 3,
      baths: 2,
      img: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1200&auto=format&fit=crop',
      tag: null
    },
    {
      id: '4',
      title: 'Sunnyshine',
      address: '22 Goldhawk Road, London W12 8DH, UK',
      price: 3214000,
      priceSuffix: '/day',
      area: 250,
      beds: 3,
      baths: 2,
      img: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1200&auto=format&fit=crop',
      tag: null
    }
  ],
  featured: {
    id: 'F1',
    title: 'Hillary Gross',
    address: '22 Goldhawk Road, London W12 8DH, UK',
    price: 2254000,
    priceSuffix: '',
    area: 250,
    beds: 3,
    baths: 5,
    rating: 4.8,
    votes: '2k+',
    images: [
      'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1200&auto=format&fit=crop'
    ]
  }
};

export default function ResultsCardsSection({ data = MOCK }) {
  const { count, list, featured } = data;

  return (
    <section className="mx-auto mt-6 w-[min(98vw,1400px)]">
      <h2 className="text-[clamp(1.2rem,2vw,1.4rem)] font-extrabold tracking-tight text-slate-900">
        Search results ({count})
      </h2>

      <div className="mt-4 grid gap-6 lg:grid-cols-12">
        {/* Coluna esquerda: lista */}
        <div className="lg:col-span-5">
          <div className="space-y-4">
            {list.map((item, idx) => (
              <ResultListCard key={item.id} data={item} highlight={idx === 1} />
            ))}
          </div>
        </div>

        {/* Coluna direita: mapa + destaque */}
        <div className="lg:col-span-7 space-y-4">
          <MapPreview price={list[1]?.price} />
          <FeaturedCard data={featured} />
        </div>
      </div>
    </section>
  );
}

/* ----------------- Subcomponentes ----------------- */

function ResultListCard({ data, highlight }) {
  const { id, title, address, price, priceSuffix, area, beds, baths, img, tag } = data;

  return (
    <article className="relative flex items-stretch gap-4 rounded-2xl bg-white ring-1 ring-slate-200/70 p-3 shadow-sm hover:shadow-md transition">
      <div className="relative h-[92px] w-[120px] overflow-hidden rounded-xl">
        <img src={img} alt={title} className="h-full w-full object-cover" />
        {tag && (
          <span className={`absolute left-2 top-2 rounded-md px-2 py-1 text-[10px] font-bold text-white ${tag.color}`}>
            {tag.label}
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-2">
          <Link
            to={`/property/${id}`}
            className="text-[15px] font-extrabold text-sky-700 hover:text-sky-600"
          >
            {currency.format(price)}
            {priceSuffix && <span className="text-slate-400 font-semibold"> {priceSuffix}</span>}
          </Link>
          <button
            type="button"
            className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700 ring-1 ring-slate-200 hover:bg-slate-200"
            aria-label="Favoritar"
          >
            <Heart size={16} />
          </button>
        </div>

        <h3 className="mt-1 text-[15px] font-bold text-slate-900 leading-tight">{title}</h3>
        <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-slate-500">
          <MapPin size={12} /> {address}
        </p>

        <div className="mt-2 flex flex-wrap gap-2">
          <Pill>
            <Ruler size={14} /> {area}m²
          </Pill>
          <Pill>
            <BedDouble size={14} /> {beds} beds
          </Pill>
          {typeof baths === 'number' && (
            <Pill>
              <Bath size={14} /> {baths} baths
            </Pill>
          )}
        </div>
      </div>

      {highlight && <div className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-purple-400/40" />}
    </article>
  );
}

function MapPreview({ price }) {
  return (
    <div className="relative h-[180px] w-full overflow-hidden rounded-2xl bg-[url('https://tile.openstreetmap.org/5/16/10.png')] bg-cover bg-center ring-1 ring-slate-200">
      <div className="absolute inset-0 bg-emerald-700/20 mix-blend-multiply" />
      <div className="absolute left-1/2 top-1/2 w-max -translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-slate-800 shadow">
        22 Goldhawk Road • {price ? currency.format(price) : '$2,254,000'}
      </div>
    </div>
  );
}

function FeaturedCard({ data }) {
  const { id, title, address, price, priceSuffix, area, beds, baths, rating, votes, images = [] } = data;
  const [main, ...thumbs] = images;

  return (
    <article className="rounded-2xl bg-white ring-1 ring-slate-200/70 p-3 shadow-sm">
      <div className="grid gap-3 md:grid-cols-12">
        {/* Foto principal */}
        <div className="relative md:col-span-8 overflow-hidden rounded-xl">
          <img src={main} alt={title} className="h-[260px] w-full object-cover md:h-[340px]" />
          <button
            type="button"
            className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 ring-1 ring-slate-200"
            aria-label="Favoritar"
          >
            <Heart size={18} />
          </button>
          <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-800 ring-1 ring-slate-200">
            <Star size={14} className="text-amber-500" />
            {rating} • {votes}
          </div>
        </div>

        {/* Thumbs */}
        <div className="md:col-span-4 grid grid-rows-3 gap-3">
          {thumbs.slice(0, 3).map((src, i) => (
            <div key={i} className="overflow-hidden rounded-xl">
              <img src={src} alt="" className="h-[100px] w-full object-cover md:h-[104px]" />
            </div>
          ))}
        </div>
      </div>

      {/* Info abaixo */}
      <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="flex items-center gap-2 text-[11px] text-slate-500">
            <MapPin size={12} /> {address}
          </p>
          <h3 className="mt-0.5 text-[16px] font-extrabold text-slate-900">{title}</h3>

          <div className="mt-2 flex flex-wrap gap-2">
            <Pill>
              <Ruler size={14} /> {area}m²
            </Pill>
            <Pill>
              <BedDouble size={14} /> {beds} beds
            </Pill>
            <Pill>
              <Bath size={14} /> {baths} baths
            </Pill>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to={`/property/${id}`}
            className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500"
          >
            Book Now
          </Link>
          <div className="text-[14px] font-extrabold text-sky-700">
            {currency.format(price)} <span className="text-slate-400 font-semibold">{priceSuffix}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-700 ring-1 ring-slate-200">
      {children}
    </span>
  );
}