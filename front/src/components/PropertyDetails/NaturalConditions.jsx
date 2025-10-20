import { useState } from 'react';
import { 
  Waves, Wind, Sun, Thermometer, Trees, Mountain, 
  Sunrise, Moon, Leaf, Droplets, X, Eye
} from 'lucide-react';

/**
 * Componente para exibir Condições Naturais
 * Mostra características ambientais do imóvel
 */
export default function NaturalConditions({ property }) {
  const [showModal, setShowModal] = useState(false);

  // Parse das condições naturais
  const conditionsArray = typeof property.naturalConditions === 'string' 
    ? JSON.parse(property.naturalConditions || '[]')
    : property.naturalConditions || [];

  if (conditionsArray.length === 0) return null;

  // Categorias de condições naturais
  const categories = {
    vista: {
      icon: Eye,
      label: 'Vista e Localização',
      color: 'blue',
      keywords: ['Vista', 'Frente', 'Pé na areia', 'Panorâmica', 'Desobstruída'],
    },
    ventilacao: {
      icon: Wind,
      label: 'Ventilação',
      color: 'cyan',
      keywords: ['Ventilação', 'Brisa', 'Circulação', 'Arejado', 'Janelas', 'Cruzada'],
    },
    iluminacao: {
      icon: Sun,
      label: 'Iluminação Solar',
      color: 'yellow',
      keywords: ['Sol', 'Iluminação', 'Claridade', 'Face', 'Claraboias'],
    },
    clima: {
      icon: Thermometer,
      label: 'Clima',
      color: 'orange',
      keywords: ['Clima', 'Temperatura', 'Fresco', 'Quente', 'Sombra', 'Microclima'],
    },
    natureza: {
      icon: Trees,
      label: 'Natureza',
      color: 'green',
      keywords: ['Área verde', 'Arborizado', 'Jardim', 'Mata', 'Árvores', 'Pomar', 'Horta', 'Fauna', 'Pássaros', 'Ecossistema'],
    },
    topografia: {
      icon: Mountain,
      label: 'Topografia',
      color: 'stone',
      keywords: ['Terreno', 'Declive', 'Aclive', 'Elevado', 'Plano', 'Solo'],
    },
    especiais: {
      icon: Sunrise,
      label: 'Características Especiais',
      color: 'amber',
      keywords: ['Nascer', 'Pôr do sol', 'Céu', 'Noite', 'Silêncio', 'Privacidade', 'Exclusividade'],
    },
    praia: {
      icon: Waves,
      label: 'Proximidade com Praia',
      color: 'blue',
      keywords: ['praia', 'Caminhada', 'Acesso', 'Som das ondas'],
    },
    agua: {
      icon: Droplets,
      label: 'Água e Recursos',
      color: 'cyan',
      keywords: ['Água', 'Poço', 'Rio', 'Córrego', 'Cachoeira', 'Lagos'],
    },
    proximidade: {
      icon: Leaf,
      label: 'Proximidade à Natureza',
      color: 'emerald',
      keywords: ['Próximo', 'Rua arborizada', 'Bairro', 'Ciclovia', 'Calçadão', 'Orla'],
    },
  };

  // Categorizar condições
  const categorizedConditions = {};
  const uncategorized = [];

  conditionsArray.forEach(condition => {
    let found = false;
    for (const [key, category] of Object.entries(categories)) {
      if (category.keywords.some(keyword => condition.includes(keyword))) {
        if (!categorizedConditions[key]) {
          categorizedConditions[key] = [];
        }
        categorizedConditions[key].push(condition);
        found = true;
        break;
      }
    }
    if (!found) {
      uncategorized.push(condition);
    }
  });

  // Pegar apenas a PRINCIPAL de cada categoria
  const mainConditions = Object.entries(categorizedConditions).map(([key, items]) => ({
    category: key,
    ...categories[key],
    main: items[0],
    total: items.length,
    items: items,
  }));

  return (
    <>
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">Condições Naturais</h3>
            <p className="text-sm text-emerald-700">{conditionsArray.length} características ambientais</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
          >
            <Leaf size={16} />
            Ver todas
          </button>
        </div>

        {/* Grid de principais condições */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {mainConditions.map(({ category, icon: Icon, label, color, main, total }) => (
            <div
              key={category}
              className="flex items-center gap-3 p-4 bg-white rounded-xl border border-green-200 hover:shadow-md transition-shadow"
            >
              <div className={`flex-shrink-0 w-10 h-10 bg-${color}-100 rounded-lg flex items-center justify-center`}>
                <Icon className={`w-5 h-5 text-${color}-600`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-500 uppercase mb-1">{label}</p>
                <p className="text-sm font-medium text-slate-900">{main}</p>
                {total > 1 && (
                  <p className="text-xs text-emerald-600 mt-1">+{total - 1}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal com TODAS as condições */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-gradient-to-r from-green-50 to-emerald-50">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Condições Naturais</h2>
                <p className="text-sm text-emerald-700 mt-1">
                  {conditionsArray.length} características ambientais
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white transition-colors"
              >
                <X size={20} className="text-slate-600" />
              </button>
            </div>

            {/* Conteúdo */}
            <div className="flex-1 overflow-y-auto p-6">
              {Object.entries(categorizedConditions).map(([key, items]) => {
                const category = categories[key];
                const Icon = category.icon;
                
                return (
                  <div key={key} className="mb-8 last:mb-0">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 bg-${category.color}-100 rounded-lg flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 text-${category.color}-600`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{category.label}</h3>
                        <p className="text-xs text-slate-500">{items.length} itens</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200"
                        >
                          <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></div>
                          <span className="text-sm text-slate-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {uncategorized.length > 0 && (
                <div className="mt-8 pt-8 border-t border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Outras Condições</h3>
                  <div className="flex flex-wrap gap-2">
                    {uncategorized.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-green-50 text-slate-700 text-sm rounded-lg border border-green-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-200 bg-slate-50">
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
