import { Palette } from 'lucide-react';

/**
 * Componente para exibir o Estilo do imóvel
 * Exemplo: "Moderno", "Rústico", "Container"
 */
export default function PropertyStyle({ style }) {
  if (!style) return null;

  // Ícones/emojis por estilo
  const styleEmojis = {
    Moderno: '🏙️',
    Clássico: '🏛️',
    Rústico: '🪵',
    Industrial: '🏭',
    Minimalista: '⚪',
    Colonial: '🏰',
    Contemporâneo: '🎨',
    Tropical: '🌴',
    Container: '📦',
    'Steel Frame': '🔩',
    Madeira: '🌲',
    Sustentável: '♻️',
    Luxo: '💎',
    Compacto: '📐',
    Loft: '🏢',
  };

  const emoji = styleEmojis[style] || '🏠';

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 p-6 mb-6">
      <div className="flex items-center gap-4">
        {/* Emoji do estilo */}
        <div className="flex-shrink-0 w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm">
          <span className="text-3xl">{emoji}</span>
        </div>

        {/* Estilo */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Palette className="w-4 h-4 text-emerald-600" />
            <p className="text-sm text-emerald-700 font-medium">Estilo Arquitetônico</p>
          </div>
          <h3 className="text-xl font-bold text-slate-900">{style}</h3>
        </div>
      </div>
    </div>
  );
}
