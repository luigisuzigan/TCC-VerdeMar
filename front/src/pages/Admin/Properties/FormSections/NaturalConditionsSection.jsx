import { 
  Leaf, Eye, Wind, Sun, Thermometer, Trees, Mountain, 
  Sparkles, Recycle, X 
} from 'lucide-react';

const NATURAL_CONDITIONS_BY_CATEGORY = {
  vista: {
    name: "🌊 Vista e Localização",
    icon: Eye,
    gradient: "from-blue-400 to-cyan-400",
    checkboxColor: "blue",
    items: [
      "Vista para o mar", "Vista panorâmica do mar", "Frente para o mar",
      "Pé na areia", "Vista para a praia", "Vista para a montanha",
      "Vista para o lago", "Vista para o rio", "Vista para a cidade",
      "Vista para a natureza", "Vista para o verde", "Vista para o parque",
      "Vista desobstruída", "Vista privilegiada"
    ]
  },
  ventilacao: {
    name: "💨 Ventilação e Ar",
    icon: Wind,
    gradient: "from-sky-400 to-teal-400",
    checkboxColor: "sky",
    items: [
      "Ventilação natural", "Ventilação cruzada", "Brisa marítima",
      "Brisa constante", "Circulação de ar excelente", "Ambientes arejados",
      "Janelas amplas", "Portas de vidro"
    ]
  },
  iluminacao: {
    name: "☀️ Iluminação Solar",
    icon: Sun,
    gradient: "from-yellow-400 to-orange-400",
    checkboxColor: "yellow",
    items: [
      "Sol da manhã", "Sol da tarde", "Sol o dia todo", "Muito sol",
      "Iluminação natural abundante", "Claridade natural",
      "Face norte", "Face sul", "Face leste", "Face oeste",
      "Claraboias / Luz zenital"
    ]
  },
  clima: {
    name: "🌡️ Clima e Conforto",
    icon: Thermometer,
    gradient: "from-amber-400 to-rose-400",
    checkboxColor: "amber",
    items: [
      "Clima ameno", "Clima tropical", "Temperatura agradável",
      "Fresco no verão", "Quente no inverno",
      "Sombra natural de árvores", "Microclima agradável"
    ]
  },
  natureza: {
    name: "🌳 Natureza e Verde",
    icon: Trees,
    gradient: "from-green-500 to-lime-400",
    checkboxColor: "green",
    items: [
      "Área verde", "Arborizado", "Jardim natural", "Mata nativa",
      "Árvores frutíferas", "Pomar", "Horta", "Contato com a natureza",
      "Fauna local", "Pássaros", "Borboletas", "Ecossistema preservado"
    ]
  },
  terreno: {
    name: "🏞️ Terreno e Topografia",
    icon: Mountain,
    gradient: "from-stone-400 to-slate-500",
    checkboxColor: "stone",
    items: [
      "Terreno plano", "Terreno em declive", "Terreno em aclive",
      "Elevado / Ponto alto", "Vista de cima", "Solo firme", "Solo drenado"
    ]
  },
  especiais: {
    name: "🌅 Características Especiais",
    icon: Sparkles,
    gradient: "from-purple-400 to-pink-400",
    checkboxColor: "purple",
    items: [
      "Nascer do sol", "Pôr do sol", "Céu estrelado", "Noite tranquila",
      "Silêncio / Ambiente calmo", "Privacidade", "Área isolada",
      "Exclusividade", "Som das ondas", "Acesso direto à praia"
    ]
  },
  sustentabilidade: {
    name: "🌿 Sustentabilidade",
    icon: Recycle,
    gradient: "from-emerald-500 to-green-600",
    checkboxColor: "emerald",
    items: [
      "Casa sustentável", "Bioconstrução", "Materiais naturais",
      "Captação de água da chuva", "Compostagem", "Fossa ecológica",
      "Biodigestor", "Energia renovável", "Baixo impacto ambiental",
      "Água de nascente / Poço artesiano"
    ]
  }
};

const checkboxColors = {
  blue: "checked:bg-blue-500 checked:border-blue-500 focus:ring-blue-500",
  sky: "checked:bg-sky-500 checked:border-sky-500 focus:ring-sky-500",
  yellow: "checked:bg-yellow-500 checked:border-yellow-500 focus:ring-yellow-500",
  amber: "checked:bg-amber-500 checked:border-amber-500 focus:ring-amber-500",
  green: "checked:bg-green-500 checked:border-green-500 focus:ring-green-500",
  stone: "checked:bg-stone-500 checked:border-stone-500 focus:ring-stone-500",
  purple: "checked:bg-purple-500 checked:border-purple-500 focus:ring-purple-500",
  emerald: "checked:bg-emerald-500 checked:border-emerald-500 focus:ring-emerald-500"
};

export default function NaturalConditionsSection({ 
  selectedNaturalConditions, 
  toggleNaturalCondition, 
  setSelectedNaturalConditions
}) {
  const getSelectedInCategory = (items) => {
    return items.filter(item => selectedNaturalConditions.includes(item)).length;
  };

  const totalSelected = selectedNaturalConditions.length;
  const totalCategories = Object.keys(NATURAL_CONDITIONS_BY_CATEGORY).length;
  
  // Calcular total de opções
  const totalOptions = Object.values(NATURAL_CONDITIONS_BY_CATEGORY)
    .reduce((acc, cat) => acc + cat.items.length, 0);

  return (
    <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* Header com gradiente verde-esmeralda */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Leaf size={32} className="text-white" />
            <div>
              <h2 className="text-3xl font-bold text-white">
                🌿 CONDIÇÕES NATURAIS
              </h2>
              <p className="text-green-50 text-sm mt-1">
                Características naturais e ambientais do imóvel
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              <p className="text-white font-bold text-lg">{totalSelected}</p>
              <p className="text-green-50 text-xs">de {totalOptions}+ opções</p>
            </div>
          </div>
        </div>
        
        {totalSelected > 0 && (
          <button
            type="button"
            onClick={() => setSelectedNaturalConditions([])}
            className="mt-4 px-4 py-2 bg-white/20 backdrop-blur-sm border-2 border-white text-white rounded-lg hover:bg-white/30 transition-all flex items-center gap-2 font-medium"
          >
            <X size={16} />
            Limpar Todas ({totalSelected})
          </button>
        )}
      </div>

      {/* Resumo */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-8 py-4 border-b-2 border-green-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-green-700 font-medium">
            🌳 {totalCategories} categorias disponíveis
          </span>
          <span className="text-emerald-700 font-medium">
            ✅ {totalSelected} condições selecionadas
          </span>
        </div>
      </div>

      {/* Grid de Cards de Categorias */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(NATURAL_CONDITIONS_BY_CATEGORY).map(([key, category]) => {
            const selectedCount = getSelectedInCategory(category.items);
            const Icon = category.icon;

            return (
              <div 
                key={key}
                className="rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden border-2 border-slate-200"
              >
                {/* Header do Card com Gradiente */}
                <div className={`bg-gradient-to-r ${category.gradient} px-6 py-6 text-center relative`}>
                  <Icon size={28} className="text-white mx-auto mb-2" />
                  <h3 className="text-lg font-bold text-white">
                    {category.name}
                  </h3>
                  {selectedCount > 0 && (
                    <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-700">
                      {selectedCount} ✓
                    </span>
                  )}
                  <span className="text-white/80 text-xs mt-1 block">
                    {category.items.length} opções
                  </span>
                </div>

                {/* Corpo do Card com Checkboxes */}
                <div className="p-6 bg-white">
                  <div className="grid grid-cols-2 gap-3">
                    {category.items.map(item => {
                      const isSelected = selectedNaturalConditions.includes(item);
                      
                      return (
                        <label
                          key={item}
                          className={`relative flex items-start gap-2 px-3 py-2.5 rounded-lg border-2 cursor-pointer transition-all ${
                            isSelected
                              ? 'border-current bg-opacity-10 shadow-sm'
                              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                          style={isSelected ? {
                            borderColor: `var(--gradient-start)`,
                            backgroundColor: `rgba(var(--gradient-start-rgb), 0.1)`
                          } : {}}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleNaturalCondition(item)}
                            className={`mt-0.5 w-4 h-4 rounded border-slate-300 cursor-pointer transition-all ${checkboxColors[category.checkboxColor]}`}
                          />
                          <span className={`text-xs leading-tight ${
                            isSelected ? 'font-semibold text-slate-800' : 'font-medium text-slate-600'
                          }`}>
                            {item}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
