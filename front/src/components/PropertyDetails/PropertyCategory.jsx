import { Home, Building2, Factory, MapPin, Sparkles } from 'lucide-react';

/**
 * Componente para exibir Categoria e Tipo do imóvel
 * Exemplo: "Residencial - Casa"
 */
export default function PropertyCategory({ category, type }) {
  // Ícones por categoria
  const categoryIcons = {
    Residencial: Home,
    Comercial: Building2,
    Industrial: Factory,
    Terreno: MapPin,
    Especial: Sparkles,
  };

  const Icon = categoryIcons[category] || Home;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
      <div className="flex items-center gap-4">
        {/* Ícone da categoria */}
        <div className="flex-shrink-0 w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center">
          <Icon className="w-7 h-7 text-emerald-600" />
        </div>

        {/* Categoria e Tipo */}
        <div className="flex-1">
          <p className="text-sm text-slate-500 font-medium mb-1">Categoria</p>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-slate-900">{category || 'Residencial'}</span>
            <span className="text-slate-400">•</span>
            <span className="text-lg text-slate-700">{type || 'Apartamento'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
