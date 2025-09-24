import { useState, useMemo } from 'react';
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  Star,
  Ruler,
  BedDouble,
  Bath,
  Users
} from 'lucide-react';

export default function PropertyCard({ data }) {
  const {
    id,
    city,
    country,
    title,
    description,
    price,
    currency = 'BRL',
    images = [],
    rating,
    reviews,
    area,
    beds,
    baths,
    guests,
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
    setIndex(i => (i - 1 + images.length) % images.length);
  }
  function next(e) {
    e.stopPropagation();
    setIndex(i => (i + 1) % images.length);
  }

  return (
    <article className="group overflow-hidden rounded-3xl bg-white ring-1 ring-slate-200 shadow-sm transition hover:shadow-lg">
      {/* Localização top (fora da imagem igual na referência) */}
      <div className="px-4 pt-4 text-[11px] font-medium text-slate-600">
        {city}, {country}
      </div>

      {/* Imagem / slider */}
      <div className="relative mt-1 px-4">
        <div className="relative h-44 w-full overflow-hidden rounded-2xl bg-slate-100">
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

          {/* Botão favorito */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setFav(f => !f);
            }}
            className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-700 ring-1 ring-slate-200 hover:bg-white"
            aria-label="Favoritar"
          >
            <Heart
              size={18}
              className={fav ? 'fill-rose-500 text-rose-500' : ''}
            />
          </button>
        </div>
      </div>

      {/* Corpo */}
      <div className="px-4 pb-4 pt-3">
        {/* Rating */}
        <div className="flex items-center gap-1 text-[11px] font-medium text-slate-600">
          <Star size={12} className="fill-amber-400 text-amber-400" />
          <span>{rating.toFixed(2)}</span>
          <span className="text-slate-400">({reviews} reviews)</span>
        </div>

        {/* Preço */}
        <div className="mt-1 text-[13px] font-extrabold text-slate-900">
          {fmtPrice}
          <span className="text-xs font-medium text-slate-500"> /noite</span>
        </div>

        {/* Título */}
        <h3 className="mt-1 line-clamp-1 text-sm font-semibold text-slate-900">
          {title}
        </h3>

        {/* Descrição */}
        <p className="mt-1 line-clamp-2 text-[11px] text-slate-500">
          {description}
        </p>

        {/* Linha de atributos */}
        <div className="mt-3 flex flex-wrap gap-2">
          {area && (
            <Badge icon={<Ruler size={12} />}>{area}m²</Badge>
          )}
            {beds && (
            <Badge icon={<BedDouble size={12} />}>{beds}q</Badge>
          )}
          {baths && (
            <Badge icon={<Bath size={12} />}>{baths}b</Badge>
          )}
          {guests && (
            <Badge icon={<Users size={12} />}>{guests} hóspedes</Badge>
          )}
        </div>
      </div>
    </article>
  );
}

function Badge({ icon, children }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-medium text-slate-600 ring-1 ring-slate-200">
      {icon} {children}
    </span>
  );
}