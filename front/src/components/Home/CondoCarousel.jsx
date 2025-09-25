import { useMemo, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CondoCard from './CondoCard';

const MOCK_CONDOS = [
  {
    id: 'c1',
    name: 'El Nido',
    city: 'Palawan',
    state: 'Region',
    tag: 'Beach paradise',
    rating: 4.81,
    reviews: 1260,
    priceMin: 4999,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'c2',
    name: 'Baguio City',
    city: 'Benguet',
    state: 'Region',
    tag: 'Mount Getaway',
    rating: 4.61,
    reviews: 950,
    priceMin: 3200,
    image: 'https://images.unsplash.com/photo-1526485797145-8b2f7cf7b2b1?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'c3',
    name: 'Siargao',
    city: 'Surigao del Norte',
    state: 'Region',
    tag: 'Surf & Chill',
    rating: 4.90,
    reviews: 2100,
    priceMin: 5500,
    image: 'https://images.unsplash.com/photo-1502082553048-a0e08e17b6b9?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'c4',
    name: 'Vigan',
    city: 'Ilocos Sur',
    state: 'Region',
    tag: 'Heritage City',
    rating: 4.70,
    reviews: 780,
    priceMin: 4250,
    image: 'https://images.unsplash.com/photo-1502003148287-a82ef80a6abc?q=80&w=1200&auto=format&fit=crop'
  },
  // adicione mais se quiser
];

export default function CondoCarousel({
  title = 'Top Condomínios',
  subtitle = 'Dos refúgios na praia aos destinos históricos, descubra onde será sua próxima estadia.',
  items = MOCK_CONDOS
}) {
  const scroller = useRef(null);

  const canScroll = useMemo(() => items.length > 0, [items]);

  const scrollBy = (dir) => {
    if (!scroller.current) return;
    const el = scroller.current;
    const amount = Math.min(320, Math.floor(el.clientWidth * 0.9));
    el.scrollTo({
      left: dir === 'left' ? el.scrollLeft - amount : el.scrollLeft + amount,
      behavior: 'smooth'
    });
  };

  return (
    <section className="mx-auto mt-10 w-[min(96vw,1400px)] rounded-[28px] bg-slate-50 p-4 ring-1 ring-slate-200 sm:p-6">
      <div className="grid items-end gap-4 sm:grid-cols-2">
        <h2 className="text-lg font-extrabold text-slate-900 sm:text-xl">{title}</h2>
        <p className="text-sm text-slate-600">{subtitle}</p>
      </div>

      <div className="relative mt-5">
        {/* fades laterais */}
        <span className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-slate-50 to-transparent" />
        <span className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-slate-50 to-transparent" />

        {/* carrossel */}
        <div
          ref={scroller}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pt-1 pr-10"
          style={{ scrollBehavior: 'smooth' }}
        >
          {items.map((c) => (
            <div key={c.id} className="snap-start">
              <CondoCard condo={c} />
            </div>
          ))}
        </div>

        {/* setas */}
        {canScroll && (
          <div className="pointer-events-none absolute -bottom-2 right-2 z-20 flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollBy('left')}
              className="pointer-events-auto grid size-10 place-items-center rounded-full bg-white text-slate-700 ring-1 ring-slate-200 shadow hover:bg-slate-50"
              aria-label="Anterior"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scrollBy('right')}
              className="pointer-events-auto grid size-10 place-items-center rounded-full bg-white text-slate-700 ring-1 ring-slate-200 shadow hover:bg-slate-50"
              aria-label="Próximo"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="hidden sm:block" />
        <Link
          to="/explorar?tipo=condominios"
          className="inline-flex items-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow hover:brightness-110"
        >
          Ver mais
        </Link>
      </div>
    </section>
  );
}