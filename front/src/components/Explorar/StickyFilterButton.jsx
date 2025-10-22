import { Sliders, X } from 'lucide-react';

export default function StickyFilterButton({ onClick, filterCount, isOpen, onClose }) {
  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-30 animate-in slide-in-from-top duration-300">
      {isOpen ? (
        // Botão de Fechar (quando painel está aberto)
        <button
          onClick={onClose}
          className="flex items-center gap-3 px-6 py-3 bg-red-500 text-white border border-red-600 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 hover:bg-red-600"
        >
          <X size={18} />
          <span className="font-semibold">Fechar Filtros</span>
        </button>
      ) : (
        // Botão de Abrir (quando painel está fechado)
        <button
          onClick={onClick}
          className="flex items-center gap-3 px-6 py-3 bg-white border border-slate-300 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
        >
          <Sliders size={18} className="text-slate-700" />
          <span className="font-semibold text-slate-900">Filtros</span>
          {filterCount > 0 && (
            <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-full">
              {filterCount}
            </span>
          )}
        </button>
      )}
    </div>
  );
}
