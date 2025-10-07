import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  Star,
  Ruler,
  BedDouble,
  Bath,
  Users,
  MapPin,
  Waves
} from 'lucide-react';

export default function PropertyCard({ data }) {
  const {
    id,
    city = '',
    country = '',
    title = '',
    description = '',
    price = 0,
    currency = 'BRL',
    images = [],
    rating = 0,
    reviews = 0,
    area,
    beds,
    baths,
    guests,
    type // EX.: 'Casa de praia', 'Apartamento', 'Pousada'
  } = data;

  const [index, setIndex] = useState(0);
  const [fav, setFav] = useState(false);

  const fmtPrice = useMemo(() => {
    try {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency
      }).format(price);
    } catch {
      return `R$ ${price}`;
    }
  }, [price, currency]);

  function prev(e) {
    e.stopPropagation();
    if (!images.length) return;
    setIndex(i => (i - 1 + images.length) % images.length);
  }
  function next(e) {
    e.stopPropagation();
    if (!images.length) return;
    setIndex(i => (i + 1) % images.length);
  }

  return (
    <Link to={id ? `/property/${id}` : '#'} className="block">
    <article className="group overflow-hidden rounded-3xl bg-white ring-1 ring-slate-200 shadow-sm transition hover:shadow-lg">
      {/* Imagem / slider */}
      <div className="relative mt-4 px-4">
        <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-slate-100 sm:h-56">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={title}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                i === index ? 'opacity-100' : 'opacity-0'
              }`}
              loading="lazy"
            />
          ))}

          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1 text-slate-700 shadow ring-1 ring-slate-200 backdrop-blur hover:bg-white"
                aria-label="Imagem anterior"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1 text-slate-700 shadow ring-1 ring-slate-200 backdrop-blur hover:bg-white"
                aria-label="Próxima imagem"
              >
                <ChevronRight size={16} />
              </button>

              <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
                {images.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 w-1.5 rounded-full ${
                      i === index ? 'bg-white shadow-md ring-1 ring-black/20' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Favorito */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setFav(f => !f);
            }}
            className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-700 ring-1 ring-slate-200 hover:bg-white"
            aria-label="Favoritar"
          >
            <Heart size={18} className={fav ? 'fill-rose-500 text-rose-500' : ''} />
          </button>

          {/* Overlay praiano (vidro com degrade turquesa) */}
          <div className="pointer-events-none absolute inset-x-2 bottom-2 rounded-2xl bg-gradient-to-r from-teal-500/20 via-sky-500/18 to-cyan-500/20 px-4 py-3 text-white backdrop-blur-md ring-1 ring-white/40">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[14px] font-semibold drop-shadow line-clamp-1">
                  {title || `${city}${country ? `, ${country}` : ''}`}
                </div>
                <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-white/90">
                  <MapPin size={12} className="opacity-90" />
                  <span className="truncate">{city}{city && country ? ', ' : ''}{country}</span>
                </div>
              </div>
              <div className="shrink-0 text-[16px] font-extrabold drop-shadow">{fmtPrice}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Corpo */}
      <div className="px-4 pb-4 pt-3">
        {/* Rating */}
        {rating ? (
          <div className="flex items-center gap-1 text-[11px] font-medium text-slate-600">
            <Star size={12} className="fill-amber-400 text-amber-400" />
            <span>{rating.toFixed(2)}</span>
            {typeof reviews === 'number' && (
              <span className="text-slate-400">({reviews} reviews)</span>
            )}
          </div>
        ) : null}

        {/* Atributos principais */}
        <div className="mt-3 flex flex-wrap gap-2">
          {type && <Badge icon={<Waves size={12} />}>{type}</Badge>}
          {area && <Badge icon={<Ruler size={12} />}>{area} m²</Badge>}
          {beds && <Badge icon={<BedDouble size={12} />}>{beds} quartos</Badge>}
          {baths && <Badge icon={<Bath size={12} />}>{baths} banh.</Badge>}
          {guests && <Badge icon={<Users size={12} />}>{guests} hóspedes</Badge>}
        </div>

        {/* CTA */}
        <div className="mt-3">
          <button
            type="button"
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 text-[13px] font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
          >
            Buy Now
          </button>
        </div>
      </div>
    </article>
    </Link>
  );
}

function Badge({ icon, children }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700 ring-1 ring-slate-200">
      {icon}
      <span>{children}</span>
    </span>
  );
}