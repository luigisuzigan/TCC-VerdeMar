import { MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CondoCard({ condo }) {
  const {
    id, // ID do imóvel para o link
    name,
    city,
    state,
    region, // opcional, se quiser algo como "Benguet, Region"
    tag,    // ex.: "Beach paradise"
    rating = 0,
    reviews = 0,
    priceMin = 0,
    image,
  } = condo;

  const priceFmt = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(priceMin);

  return (
    <Link 
      to={`/property/${id}`}
      className="group relative h-[280px] w-[240px] overflow-hidden rounded-2xl ring-1 ring-slate-200 bg-white shadow-sm block cursor-pointer"
    >
      {/* imagem */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition group-hover:scale-[1.02]"
          loading="lazy"
        />
      </div>

      {/* etiqueta preço ("starts at") */}
      <div className="absolute left-4 top-4">
        <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-slate-800 ring-1 ring-slate-200 backdrop-blur">
          a partir de {priceFmt}
        </span>
      </div>

      {/* overlay para leitura */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/35 to-transparent" />

      {/* conteúdo inferior */}
      <div className="absolute inset-x-0 bottom-0 p-3 text-white">
        <h3 className="text-[15px] font-extrabold leading-tight drop-shadow">{name}</h3>

        <div className="mt-1 flex items-center gap-2 text-[11px] font-medium opacity-95">
          {tag && <span className="rounded-full bg-white/15 px-2 py-0.5 ring-1 ring-white/20">{tag}</span>}
          <span className="inline-flex items-center gap-1">
            <Star size={12} className="text-amber-400 fill-amber-400" />
            {rating.toFixed(2)} <span className="opacity-80">({reviews} reviews)</span>
          </span>
        </div>

        <div className="mt-1 flex items-center gap-1 text-[11px] opacity-95">
          <MapPin size={12} />
          <span>{city}{state ? `, ${state}` : ''}{region ? ` • ${region}` : ''}</span>
        </div>
      </div>
    </Link>
  );
}