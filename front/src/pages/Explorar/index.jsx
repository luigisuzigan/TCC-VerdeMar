import { MapPin, CalendarDays, Users, Search as SearchIcon, ChevronLeft, ChevronRight, Heart, Star } from 'lucide-react';

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

const PROPERTIES = [
  {
    id: 1,
    location: 'Ilha Comprida, Brasil',
    title: 'Lakeside Motel Waterfront',
    price: 1200,
    rating: 4.5,
    reviews: 1533,
    img: 'https://images.unsplash.com/photo-1505691723518-36a5ac3b2b8f?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 2,
    location: 'Atibaia, Brasil',
    title: 'Cabana Miralle I',
    price: 729,
    rating: 4.91,
    reviews: 136,
    img: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 3,
    location: 'Angra dos Reis, Brasil',
    title: 'Ilha Privada',
    price: 3000,
    rating: 4.93,
    reviews: 42,
    img: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 4,
    location: 'Santa Teresa, Brasil',
    title: 'Mansão incrível com piscina',
    price: 3000,
    rating: 4.5,
    reviews: 88,
    img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 5,
    location: 'Porto de Galinhas, Brasil',
    title: 'Mar às portas',
    price: 820,
    rating: 4.7,
    reviews: 221,
    img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 6,
    location: 'Portogalo, Brasil',
    title: 'Vista Baía Ilha Grande',
    price: 3000,
    rating: 4.93,
    reviews: 59,
    img: 'https://images.unsplash.com/photo-1505820013142-f86a3439c5b2?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 7,
    location: 'El Edén, Colômbia',
    title: 'Villa Daniela Deluxe',
    price: 3000,
    rating: 4.9,
    reviews: 101,
    img: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 8,
    location: 'Búzios, Brasil',
    title: 'Casa pé na areia',
    price: 2100,
    rating: 4.8,
    reviews: 312,
    img: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1200&auto=format&fit=crop',
  },
];

export default function Explorar() {
  return (
    <main className="mx-auto w-[min(96vw,1280px)] pb-16">
      {/* Banner topo + barra de pesquisa sobreposta */}
      <div className="relative mt-2">
        {/* AJUSTES DO TAMANHO/RAIO DO BANNER: mude h-[260px] e rounded-[28px] */}
        <div className="h-[260px] rounded-[28px] overflow-hidden ring-1 ring-white/70 shadow-[0_10px_30px_rgba(2,48,71,.12)]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop')",
            }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30" aria-hidden="true" />
          {/* Texto opcional no banner */}
          <div className="relative h-full grid place-content-center text-center text-white px-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold drop-shadow">Encontre o seu lugar no litoral</h1>
              <p className="mt-2 text-white/95">Busque por casas, apartamentos e fazendas à beira-mar</p>
            </div>
          </div>
        </div>

        {/* Barra de pesquisa “pill” (sobreposta). Distância do banner: ajuste bottom-[-28px] */}
        <div className="absolute left-1/2 bottom-[-28px] w-full -translate-x-1/2 px-4">
          <div className="mx-auto w-full max-w-[1080px] rounded-full bg-white/95 ring-1 ring-black/5 shadow-[0_20px_50px_rgba(2,48,71,.15)]">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Espaço para caber a barra sobreposta */}
      <div className="h-16" />

      {/* Grid de cards — 4 por linha no desktop */}
      <section className="mt-4">
        {/* PARA 4 COLUNAS NO DESKTOP: use lg:grid-cols-4 */}
        {/* Se quiser 4 já no md, troque para md:grid-cols-4 */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {PROPERTIES.map((p) => (
            <PropertyCard key={p.id} {...p} />
          ))}
        </div>
      </section>
    </main>
  );
}

function SearchBar() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr_1fr_140px]">
      <Field icon={<MapPin size={16} className="text-sky-700" />} label="Destino" value="Melbourne" leftRounded />
      <Field icon={<CalendarDays size={16} className="text-sky-700" />} label="Check‑in" value="Mar 18, 2022" />
      <Field icon={<CalendarDays size={16} className="text-sky-700" />} label="Check‑out" value="Mar 20, 2022" />
      <Field icon={<Users size={16} className="text-sky-700" />} label="Hóspedes" value="2 adultos, 1 quarto" rightDashed />
      <div className="p-2 md:p-2.5 flex">
        <button
          type="button"
          className="w-full md:w-auto md:min-w-[120px] h-11 ml-auto rounded-full bg-sky-600 hover:bg-sky-700 text-white font-semibold shadow-[0_10px_20px_rgba(2,132,199,.35)] transition inline-flex items-center justify-center gap-2 px-5"
        >
          <SearchIcon size={16} />
          Buscar
        </button>
      </div>
    </div>
  );
}

function Field({ icon, label, value, leftRounded, rightDashed }) {
  return (
    <div
      className={[
        'flex items-center gap-2 bg-white px-4 py-3',
        'border-t md:border-t-0 md:border-r',
        rightDashed ? 'md:border-dashed' : 'md:border-solid',
        'border-slate-200',
        leftRounded ? 'rounded-l-full' : '',
      ].join(' ')}
    >
      {icon}
      <div className="min-w-0">
        <div className="text-[12px] font-semibold text-slate-500">{label}</div>
        <div className="truncate text-[15px] text-slate-900/85">{value}</div>
      </div>
    </div>
  );
}

function PropertyCard({ img, location, title, price, rating, reviews }) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-2 shadow-sm hover:shadow-md transition">
      {/* Imagem com proporção fixa p/ padronizar a grade */}
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
        <img src={img} alt={title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
        {/* Navegação fake (esq/dir) */}
        <button
          type="button"
          className="absolute left-2 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-700 ring-1 ring-slate-200 hover:bg-white"
          title="Anterior"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-700 ring-1 ring-slate-200 hover:bg-white"
          title="Próxima"
        >
          <ChevronRight size={18} />
        </button>

        {/* Favorito */}
        <button
          type="button"
          className="absolute right-2 bottom-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-700 ring-1 ring-slate-200 hover:bg-white"
          title="Favoritar"
        >
          <Heart size={16} />
        </button>
      </div>

      <div className="px-2 pt-3">
        <div className="text-[12px] text-slate-600">{location}</div>

        <div className="mt-1 flex items-center gap-1 text-[12px] text-slate-700">
          <Star size={14} className="text-amber-500 fill-amber-400" />
          <span className="font-medium">{rating.toFixed(2)}</span>
          <span className="text-slate-500">({reviews} reviews)</span>
        </div>

        <div className="mt-2 text-[13px] text-emerald-700 font-semibold">
          {currency.format(price).replace(/\s/g, '')}
        </div>

        <div className="text-[13px] text-slate-800">{title}</div>
      </div>
    </article>
  );
}