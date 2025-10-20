import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * Card individual de estilo arquitetônico
 */
export default function StyleCard({ style }) {
  return (
    <Link
      to={`/explorar?style=${encodeURIComponent(style.value)}`}
      className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
    >
      {/* Imagem de fundo */}
      <div className="aspect-[4/3] relative">
        <img
          src={style.image}
          alt={style.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Badge do estilo */}
        <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full">
          <span className="text-sm font-semibold text-slate-900">{style.badge}</span>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-300 transition-colors">
              {style.name}
            </h3>
            <p className="text-sm text-gray-200 mb-3 line-clamp-2">
              {style.description}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-300">
            {style.count} imóveis disponíveis
          </span>
          <div className="flex items-center gap-2 text-white group-hover:gap-3 transition-all">
            <span className="text-sm font-semibold">Ver mais</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Borda de hover */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400 rounded-2xl transition-colors pointer-events-none" />
    </Link>
  );
}
