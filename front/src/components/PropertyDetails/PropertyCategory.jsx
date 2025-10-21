import { Home, Building2, Factory, MapPin, Sparkles, Palette } from 'lucide-react';

/**
 * Componente para exibir Categoria, Tipo e Estilo do imóvel
 * Exemplo: "Residencial - Casa - Moderno"
 */
export default function PropertyCategory({ category, type, style }) {
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
          
          {/* Estilo Arquitetônico (se existir) */}
          {style && (
            <div className="mt-3 pt-3 border-t border-slate-100">
              <p className="text-xs text-slate-500 font-medium mb-1">Estilo Arquitetônico</p>
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-purple-500" />
                <span className="text-base text-slate-900 font-semibold">{style}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
