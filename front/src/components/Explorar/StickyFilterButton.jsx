import { Sliders } from 'lucide-react';

export default function StickyFilterButton({ onClick, filterCount }) {
  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-30 animate-in slide-in-from-top duration-300">
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
    </div>
  );
}
