import { Heart, BedDouble, Bath, Ruler, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

function formatPriceBRL(value, currency = 'BRL') {
  try {
    if (currency === 'BRL') return new Intl.NumberFormat('pt-BR', { style: 'currency', currency }).format(value || 0);
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value || 0);
  } catch {
    return `R$ ${Number(value || 0).toLocaleString('pt-BR')}`;
  }
}

export default function PropertyCard({ item }) {
  const {
    id,
    title,
    city,
    country,
    images = [],
    price,
    currency = 'BRL',
    beds,
    baths,
    guests,
    area,
  } = item || {};

  const img = images[0] || 'https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1200&auto=format&fit=crop';

  return (
    <article className="group overflow-hidden rounded-2xl ring-1 ring-slate-200 bg-white shadow-sm hover:shadow-md transition">
      <div className="relative">
        <Link to={`/property/${id}`} className="block relative aspect-[16/10] w-full">
          <img
            src={img}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
        </Link>

        {/* Favorite */}
        <button
          type="button"
          className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-white/90 text-slate-800 ring-1 ring-slate-200 shadow hover:bg-white"
          aria-label="Favoritar"
        >
          <Heart size={18} />
        </button>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <Link to={`/property/${id}`} className="min-w-0">
            <h3 className="truncate text-[15px] font-extrabold text-slate-900">{title}</h3>
            <p className="mt-0.5 truncate text-[12px] text-slate-600">{[city, country].filter(Boolean).join(', ')}</p>
          </Link>
          <div className="shrink-0 text-[13px] font-extrabold text-slate-900">
            {formatPriceBRL(price, currency)}
          </div>
        </div>

        {/* Specs */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Spec icon={<Users size={14} />} label={guests} />
          <Spec icon={<BedDouble size={14} />} label={beds} />
          <Spec icon={<Bath size={14} />} label={baths} />
          <Spec icon={<Ruler size={14} />} label={area ? `${area} m²` : undefined} />
        </div>
      </div>
    </article>
  );
}

function Spec({ icon, label }) {
  if (label === undefined || label === null || label === '') return null;
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-700 ring-1 ring-slate-200">
      {icon}
      {label}
    </span>
  );
}