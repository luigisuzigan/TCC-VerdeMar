//nearbyproperties

import { MapPin, Heart, Tag } from 'lucide-react';

const chips = [
  'Rústico',
  'Imóvel vazio',
  'Luxo',
  'Pé na areia',
  'Vista mar',
  'Aceita pets',
];

const items = [
  {
    title: 'Casa Rústica com Varanda',
    city: 'Búzios, RJ',
    distanceKm: 2.1,
    price: 'R$ 2.500.000',
    type: 'Rústico',
    img: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop',
    alt: 'Casa rústica com varanda de madeira e jardim',
  },
  {
    title: 'Apartamento Vista-Mar',
    city: 'Cabo Frio, RJ',
    distanceKm: 3.4,
    price: 'R$ 850.000',
    type: 'Vista mar',
    img: 'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600&auto=format&fit=crop',
    alt: 'Apartamento moderno com vista para o mar',
  },
  {
    title: 'Casa Pé na Areia',
    city: 'Arraial do Cabo, RJ',
    distanceKm: 1.8,
    price: 'R$ 1.750.000',
    type: 'Pé na areia',
    img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1600&auto=format&fit=crop',
    alt: 'Casa térrea com acesso direto à praia',
  },
  {
    title: 'Cobertura Minimalista',
    city: 'Angra dos Reis, RJ',
    distanceKm: 5.2,
    price: 'R$ 3.200.000',
    type: 'Luxo',
    img: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=1600&auto=format&fit=crop',
    alt: 'Cobertura minimalista com piscina e deck',
  },
  {
    title: 'Casa Ampla (Vazia)',
    city: 'Saquarema, RJ',
    distanceKm: 4.0,
    price: 'R$ 980.000',
    type: 'Imóvel vazio',
    img: 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?q=80&w=1600&auto=format&fit=crop',
    alt: 'Casa ampla com interiores vazios e iluminação natural',
  },
  {
    title: 'Chalé Pet Friendly',
    city: 'Ilhabela, SP',
    distanceKm: 6.7,
    price: 'R$ 1.150.000',
    type: 'Aceita pets',
    img: 'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600&auto=format&fit=crop',
    alt: 'Chalé aconchegante com deck em madeira',
  },
];

function Chip({ label, active }) {
  return (
    <button
      type="button"
      className={[
        'px-4 py-2 rounded-full text-sm font-semibold transition',
        active
          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
          : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300',
      ].join(' ')}
      aria-pressed={active ? 'true' : 'false'}
    >
      {label}
    </button>
  );
}

function Card({ data }) {
  return (
    <a
      href="#"
      className="group relative block overflow-hidden rounded-2xl bg-gray-200 shadow-sm ring-1 ring-black/5 transition hover:shadow-lg"
    >
      <img
        src={data.img}
        alt={data.alt}
        className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" aria-hidden="true" />

      {/* Tag tipo */}
      <div className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-900 shadow-sm">
        <Tag size={14} />
        {data.type}
      </div>

      {/* Botão favorito */}
      <button
        type="button"
        className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-sm transition hover:scale-[1.05]"
        aria-label="Favoritar"
      >
        <Heart size={18} />
      </button>

      {/* Texto inferior */}
      <div className="absolute left-4 right-4 bottom-4 text-white drop-shadow-sm">
        <h3 className="text-lg font-semibold">{data.title}</h3>
        <p className="mt-1 text-xs text-white/85 inline-flex items-center gap-1">
          <MapPin size={14} />
          {data.city} • {data.distanceKm.toFixed(1)} km
        </p>
        <div className="mt-2 inline-flex rounded-lg bg-white/90 px-3 py-1 text-xs font-bold text-gray-900 shadow-sm">
          a partir de {data.price}
        </div>
      </div>
    </a>
  );
}

export default function NearbyProperties() {
  return (
    <section className="container mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">Imóveis próximos</h2>
          <p className="text-sm text-gray-600">Perto de você (localização aproximada)</p>
        </div>
        {/* Chips (estáticos) */}
        <div className="flex flex-wrap gap-2">
          {chips.map((c, i) => (
            <Chip key={c} label={c} active={i === 0} />
          ))}
        </div>
      </div>

      {/* Grid de cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <Card key={it.title} data={it} />
        ))}
      </div>
    </section>
  );
}