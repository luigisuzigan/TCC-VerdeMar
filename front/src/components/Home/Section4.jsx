import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Maximize2, MapPin, Star, MoveLeft, MoveRight, ChevronRight } from 'lucide-react';

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ALTERE AQUI O LINK DO "VER MAIS" (rota da página Novidades):
export const VER_MAIS_URL = '/novidades';
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

const CONDOS = [
  {
    id: 'c1',
    title: 'Heyday Luxury Suites',
    location: 'Thirasia, Perissa',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'c2',
    title: 'Iconic Santorini',
    location: 'Imerovigli, Imerovigli',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'c3',
    title: 'Meroviglia Boutique Hotel',
    location: 'Imerovigli, Imerovigli',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'c4',
    title: 'Blue Horizon Condos',
    location: 'Ubatuba, SP',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'c5',
    title: 'Maré Alta Residence',
    location: 'Itacaré, BA',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'c6',
    title: 'Costa Norte Villas',
    location: 'Florianópolis, SC',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
  },
];

export default function CondominiosCarousel({
  title = 'Condomínios',
  items = CONDOS,
  moreUrl = VER_MAIS_URL, // você pode sobrescrever via prop se quiser
}) {
  const trackRef = useRef(null);

  const scrollStep = (dir = 1) => {
    const el = trackRef.current;
    if (!el) return;
    // Tenta rolar "quase 1 tela" para dar aquele passo suave
    const step = Math.max(320, Math.floor(el.clientWidth * 0.9));
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  // Lista com um "card final" de Ver Mais do mesmo tamanho
  const list = [...items, { id: '__see_more__' }];

  return (
    <section className="mx-auto mt-12 w-[min(96vw,1280px)]">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-[clamp(1.4rem,2.4vw,1.9rem)] font-extrabold tracking-tight text-slate-900">
            {title}
          </h2>
          <p className="mt-1 text-sm text-slate-500">Seleções especiais de condomínios</p>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => scrollStep(-1)}
            className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-slate-700 ring-1 ring-slate-200 backdrop-blur hover:bg-white"
            aria-label="Anterior"
          >
            <MoveLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scrollStep(1)}
            className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-slate-700 ring-1 ring-slate-200 backdrop-blur hover:bg-white"
            aria-label="Próximo"
          >
            <MoveRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="relative">
        {/* Fades laterais */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-white to-transparent" />

        {/* Track */}
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-1 pb-2 scroll-smooth"
        >
          {list.map((item) =>
            item.id === '__see_more__' ? (
              <SeeMoreCard key="see-more" to={moreUrl} />
            ) : (
              <CondoCard key={item.id} condo={item} />
            )
          )}
        </div>
      </div>
    </section>
  );
}

function CondoCard({ condo }) {
  const { title, location, rating, image } = condo;

  return (
    <article
      className={[
        'snap-start shrink-0',
        // Larguras pensadas para caber 3 cards no desktop
        'w-[280px] sm:w-[300px] lg:w-[340px]',
        'rounded-3xl bg-white/70 backdrop-blur',
        'ring-1 ring-slate-200 shadow-[0_12px_28px_rgba(2,6,23,0.10)]',
        'overflow-hidden relative',
      ].join(' ')}
    >
      {/* Imagem */}
      <div className="relative aspect-[4/3]">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
        />

        {/* Ícone topo-esquerda (condôminio) */}
        <div className="absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-slate-800 ring-1 ring-slate-200">
          <Building2 className="h-4.5 w-4.5" />
        </div>

        {/* Ícone topo-direita (expand) */}
        <button
          type="button"
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-slate-800 ring-1 ring-slate-200 hover:bg-white"
          aria-label="Visualizar"
        >
          <Maximize2 className="h-4.5 w-4.5" />
        </button>

        {/* Gradiente inferior para legibilidade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-900/70 via-slate-900/25 to-transparent" />
      </div>

      {/* Conteúdo sobre a imagem (parte inferior) */}
      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
        <h3 className="text-[18px] font-semibold drop-shadow line-clamp-1">{title}</h3>

        <div className="mt-1 flex items-center gap-2 text-[13px] text-white/95">
          <Stars rating={rating} />
          <span className="mx-1">•</span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-4 w-4 opacity-90" />
            <span className="line-clamp-1">{location}</span>
          </span>
        </div>
      </div>
    </article>
  );
}

function SeeMoreCard({ to }) {
  return (
    <Link
      to={to}
      className={[
        'snap-start shrink-0',
        'w-[280px] sm:w-[300px] lg:w-[340px]',
        'rounded-3xl ring-1 ring-slate-200 bg-gradient-to-br from-slate-50 to-slate-100',
        'grid place-items-center text-slate-800 relative overflow-hidden',
        'shadow-[0_12px_28px_rgba(2,6,23,0.08)]',
      ].join(' ')}
      aria-label="Ver mais condomínios"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.10),transparent_60%)]" />
      <div className="flex flex-col items-center gap-2">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-slate-900 text-white">
          <ChevronRight className="h-6 w-6" />
        </div>
        <div className="text-[15px] font-semibold">Ver mais condomínios</div>
        <div className="text-[12px] text-slate-500">Ir para Novidades</div>
      </div>
    </Link>
  );
}

function Stars({ rating = 0 }) {
  const full = Math.round(Math.min(5, Math.max(0, rating)));
  const arr = Array.from({ length: 5 }).map((_, i) => i < full);
  return (
    <span className="inline-flex items-center gap-1">
      {arr.map((on, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${on ? 'fill-yellow-400 text-yellow-400' : 'text-white/70'}`}
        />
      ))}
    </span>
  );
}