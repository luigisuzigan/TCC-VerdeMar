import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  BedDouble,
  Bath,
  Ruler,
  Star,
  MapPin,
  Heart,
  MoveLeft,
  MoveRight,
} from 'lucide-react';

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

const PROPERTIES = [
  {
    id: 1,
    title: 'TR-7 Beach House',
    location: 'Praia do Forte, BA',
    price: 2190000,
    area: 265,
    beds: 3,
    baths: 2,
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1200&auto=format&fit=crop',
    tag: 'HOT',
  },
  {
    id: 2,
    title: 'Glass Ocean Villa',
    location: 'Búzios, RJ',
    price: 2980000,
    area: 320,
    beds: 4,
    baths: 4,
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1200&auto=format&fit=crop',
    tag: 'PREMIUM',
  },
  {
    id: 3,
    title: 'Costa Norte Residence',
    location: 'Florianópolis, SC',
    price: 1750000,
    area: 210,
    beds: 3,
    baths: 2,
    rating: 4.6,
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
    tag: null,
  },
  {
    id: 4,
    title: 'Atlântico Blue',
    location: 'Natal, RN',
    price: 1490000,
    area: 180,
    beds: 2,
    baths: 2,
    rating: 4.5,
    image:
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1200&auto=format&fit=crop',
    tag: 'NOVO',
  },
  {
    id: 5,
    title: 'Mirage Shore',
    location: 'Porto de Galinhas, PE',
    price: 2590000,
    area: 300,
    beds: 4,
    baths: 3,
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1200&auto=format&fit=crop',
    tag: null,
  },
  {
    id: 6,
    title: 'Sunset Cliff',
    location: 'Arraial do Cabo, RJ',
    price: 1890000,
    area: 220,
    beds: 3,
    baths: 2,
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop',
    tag: null,
  },
  {
    id: 7,
    title: 'Maré Alta Loft',
    location: 'Itacaré, BA',
    price: 990000,
    area: 120,
    beds: 2,
    baths: 2,
    rating: 4.4,
    image:
      'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?q=80&w=1200&auto=format&fit=crop',
    tag: 'OFERTA',
  },
  {
    id: 8,
    title: 'Blue Horizon',
    location: 'Ubatuba, SP',
    price: 1320000,
    area: 160,
    beds: 3,
    baths: 2,
    rating: 4.6,
    image:
      'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1200&auto=format&fit=crop',
    tag: null,
  },
];

export default function Section5({
  title = 'EXTRAORDINARY REAL ESTATE',
  subtitle = 'This are the extraordinary real estate to find on earth!',
  items = PROPERTIES,
}) {
  const trackRef = useRef(null);

  const scrollByAmount = (dir = 1) => {
    const el = trackRef.current;
    if (!el) return;
    const step = Math.min(360, el.clientWidth * 0.8);
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <section className="relative mx-auto mt-14 w-[min(96vw,1280px)]">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="max-w-2xl">
          <div className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-[12px] font-semibold tracking-wide text-slate-700 ring-1 ring-slate-200">
            Featured
          </div>
          <h2 className="mt-3 text-[clamp(1.6rem,3.2vw,2.4rem)] font-extrabold leading-tight text-slate-900">
            THIS ARE THE <span className="text-sky-600">EXTRAORDINARY</span> REAL ESTATE <br className="hidden sm:block" />
            TO FIND ON <span className="text-sky-600">EARTH</span>!
          </h2>
          <p className="mt-2 text-[15px] text-slate-600">{subtitle}</p>
        </div>

        {/* Bolha de métrica */}
        <div className="hidden sm:flex items-center gap-3 rounded-2xl bg-white/70 px-4 py-3 text-slate-900 backdrop-blur-md ring-1 ring-slate-200 shadow-[0_8px_24px_rgba(2,6,23,0.08)]">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-sky-100 text-sky-700 text-[13px] font-bold">
            BRL
          </div>
          <div>
            <div className="text-[12px] text-slate-500">Orçamento</div>
            <div className="text-[15px] font-semibold">{currency.format(2000000)}</div>
          </div>
        </div>
      </div>

      {/* Barra de ações */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <button className="rounded-full bg-sky-50 px-3 py-1.5 text-[13px] font-medium text-sky-700 ring-1 ring-sky-200 hover:bg-sky-100">
            Mais recentes
          </button>
          <button className="rounded-full bg-slate-50 px-3 py-1.5 text-[13px] font-medium text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100">
            Melhor avaliados
          </button>
          <button className="rounded-full bg-slate-50 px-3 py-1.5 text-[13px] font-medium text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100">
            Próximos da praia
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollByAmount(-1)}
            className="grid h-10 w-10 place-items-center rounded-full bg-white/80 text-slate-700 ring-1 ring-slate-200 backdrop-blur hover:bg-white"
            aria-label="Anterior"
          >
            <MoveLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scrollByAmount(1)}
            className="grid h-10 w-10 place-items-center rounded-full bg-white/80 text-slate-700 ring-1 ring-slate-200 backdrop-blur hover:bg-white"
            aria-label="Próximo"
          >
            <MoveRight className="h-5 w-5" />
          </button>

          <Link
            to="/explorar"
            className="ml-2 rounded-full bg-slate-900 px-4 py-2 text-[13px] font-semibold text-white hover:bg-slate-800"
          >
            VER TODOS
          </Link>
        </div>
      </div>

      {/* Carrossel */}
      <div className="relative">
        {/* Fades laterais */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-white to-transparent" />

        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto scroll-smooth px-1 pb-2"
          style={{
            scrollSnapType: 'x mandatory',
          }}
        >
          {items.map((p) => (
            <PropertyCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PropertyCard({ p }) {
  return (
    <article
      className={[
        'snap-start shrink-0',
        'w-[240px] sm:w-[260px] lg:w-[280px]',
        'rounded-3xl bg-white/70 backdrop-blur-xl',
        'ring-1 ring-slate-200 shadow-[0_12px_30px_rgba(2,6,23,0.08)]',
        'overflow-hidden',
      ].join(' ')}
    >
      <div className="relative">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={p.image}
            alt={p.title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
            loading="lazy"
          />
          {p.tag && (
            <span className="absolute left-3 top-3 rounded-full bg-sky-600/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
              {p.tag}
            </span>
          )}
          <button
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/85 text-slate-700 ring-1 ring-slate-200 hover:bg-white"
            aria-label="Favoritar"
          >
            <Heart className="h-4.5 w-4.5" />
          </button>

          {/* Bolha de rating */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[12px] font-semibold text-slate-800 ring-1 ring-slate-200">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            {p.rating.toFixed(1)}
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="line-clamp-1 text-[16px] font-semibold text-slate-900">{p.title}</h3>
        <div className="mt-1 flex items-center gap-1.5 text-[13px] text-slate-600">
          <MapPin className="h-4 w-4 text-slate-400" />
          <span className="line-clamp-1">{p.location}</span>
        </div>

        <div className="mt-3 flex items-center justify-between text-[13px] text-slate-600">
          <span className="inline-flex items-center gap-1">
            <Ruler className="h-4 w-4 text-slate-400" /> {p.area} m²
          </span>
          <span className="inline-flex items-center gap-1">
            <BedDouble className="h-4 w-4 text-slate-400" /> {p.beds}
          </span>
          <span className="inline-flex items-center gap-1">
            <Bath className="h-4 w-4 text-slate-400" /> {p.baths}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-[15px] font-extrabold tracking-tight text-slate-900">
            {currency.format(p.price)}
          </div>
          <Link
            to={`/property/${p.id}`}
            className="rounded-full bg-sky-600 px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-sky-700"
          >
            Ver detalhes
          </Link>
        </div>
      </div>
    </article>
  );
}