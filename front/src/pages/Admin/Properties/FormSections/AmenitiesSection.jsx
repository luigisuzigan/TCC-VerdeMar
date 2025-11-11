import { useState } from 'react';
import { 
  Sparkles, Waves, Wifi, Snowflake, Car, ChefHat, Shield, 
  Accessibility, Dog, Building, Droplets, Bed, Home, ChevronDown, X 
} from 'lucide-react';

const AMENITIES_BY_CATEGORY = {
  lazer: {
    name: "🏊 Lazer e Área Externa",
    icon: Waves,
    color: "blue",
    items: [
      "Piscina", "Piscina Aquecida", "Hidromassagem / Jacuzzi", "Academia / Fitness",
      "Sauna", "Spa", "Churrasqueira", "Área Gourmet", "Forno de Pizza",
      "Jardim", "Varanda", "Sacada", "Terraço", "Deck", "Gazebo / Pergolado",
      "Quadra Poliesportiva", "Quadra de Tênis", "Campo de Futebol",
      "Playground", "Salão de Jogos", "Salão de Festas", 
      "Sala de Cinema / Home Theater", "Brinquedoteca"
    ]
  },
  tecnologia: {
    name: "🌐 Tecnologia e Conectividade",
    icon: Wifi,
    color: "purple",
    items: [
      "WiFi", "Internet Fibra Óptica", "TV a Cabo", "Smart TV",
      "Sistema de Som Integrado", "Automação Residencial / Smart Home",
      "Interfone", "Vídeo Porteiro", "Portão Eletrônico"
    ]
  },
  climatizacao: {
    name: "❄️ Climatização",
    icon: Snowflake,
    color: "cyan",
    items: [
      "Ar-condicionado", "Ar-condicionado Central", "Ar-condicionado Split",
      "Aquecedor", "Aquecedor a Gás", "Aquecedor Solar",
      "Ventilador de Teto", "Lareira", "Lareira a Lenha", "Lareira a Gás"
    ]
  },
  estacionamento: {
    name: "🚗 Estacionamento e Garagem",
    icon: Car,
    color: "slate",
    items: [
      "Garagem Coberta", "Garagem Descoberta", "1 Vaga", "2 Vagas",
      "3 Vagas", "4+ Vagas", "Vaga para Visitantes", "Carregador para Carro Elétrico"
    ]
  },
  cozinha: {
    name: "🍳 Cozinha e Eletrodomésticos",
    icon: ChefHat,
    color: "orange",
    items: [
      "Cozinha Equipada", "Cozinha Planejada", "Cozinha Gourmet",
      "Ilha / Bancada Americana", "Geladeira", "Freezer", "Fogão", "Cooktop",
      "Forno Elétrico", "Forno a Gás", "Micro-ondas", "Lava-louças",
      "Máquina de Lavar Roupa", "Máquina de Secar Roupa", "Adega Climatizada",
      "Coifa / Depurador", "Purificador de Água", "Filtro de Água"
    ]
  },
  seguranca: {
    name: "🔒 Segurança",
    icon: Shield,
    color: "red",
    items: [
      "Portaria 24h", "Segurança 24h", "Câmeras de Segurança",
      "Circuito Fechado de TV (CFTV)", "Alarme", "Cerca Elétrica",
      "Muros Altos", "Grades nas Janelas", "Porta Blindada", "Cofre"
    ]
  },
  acessibilidade: {
    name: "♿ Acessibilidade",
    icon: Accessibility,
    color: "indigo",
    items: [
      "Elevador", "Elevador Social", "Elevador de Serviço",
      "Acessível para Cadeirantes", "Rampa de Acesso",
      "Banheiro Adaptado", "Corrimãos"
    ]
  },
  pets: {
    name: "🐕 Pets e Família",
    icon: Dog,
    color: "pink",
    items: [
      "Aceita Pets", "Aceita Cães", "Aceita Gatos",
      "Pet Place / Área para Pets", "Playground Infantil", "Área Kids"
    ]
  },
  condominio: {
    name: "🏢 Condomínio e Infraestrutura",
    icon: Building,
    color: "violet",
    items: [
      "Salão de Festas do Condomínio", "Academia do Condomínio",
      "Piscina do Condomínio", "Espaço Coworking", "Bicicletário",
      "Lavanderia Coletiva", "Depósito / Closet Privativo", "Zelador / Síndico"
    ]
  },
  agua: {
    name: "🌊 Água e Utilidades",
    icon: Droplets,
    color: "sky",
    items: [
      "Caixa d'água", "Cisterna", "Aquecimento Solar",
      "Bomba d'água", "Gerador", "Energia Solar / Painéis Fotovoltaicos"
    ]
  },
  quartos: {
    name: "🛏️ Quartos e Banheiros",
    icon: Bed,
    color: "rose",
    items: [
      "Suíte Master", "Closet", "Banheira", "Box Blindex",
      "Ducha", "Armários Embutidos", "Guarda-roupas Embutido"
    ]
  },
  estrutura: {
    name: "🏠 Estrutura e Acabamentos",
    icon: Home,
    color: "amber",
    items: [
      "Pé-direito Alto", "Piso Frio", "Piso Laminado",
      "Piso de Madeira", "Piso Porcelanato", "Gesso / Sancas",
      "Molduras / Rodatetos", "Papel de Parede", "Pintura Nova"
    ]
  }
};

const colorClasses = {
  blue: {
    bg: "from-blue-50 to-blue-100",
    border: "border-blue-500",
    text: "text-blue-700",
    badge: "bg-blue-100 text-blue-700",
    checkbox: "border-blue-500 bg-blue-50 text-blue-700"
  },
  purple: {
    bg: "from-purple-50 to-purple-100",
    border: "border-purple-500",
    text: "text-purple-700",
    badge: "bg-purple-100 text-purple-700",
    checkbox: "border-purple-500 bg-purple-50 text-purple-700"
  },
  cyan: {
    bg: "from-cyan-50 to-cyan-100",
    border: "border-cyan-500",
    text: "text-cyan-700",
    badge: "bg-cyan-100 text-cyan-700",
    checkbox: "border-cyan-500 bg-cyan-50 text-cyan-700"
  },
  slate: {
    bg: "from-slate-50 to-slate-100",
    border: "border-slate-500",
    text: "text-slate-700",
    badge: "bg-slate-100 text-slate-700",
    checkbox: "border-slate-500 bg-slate-50 text-slate-700"
  },
  orange: {
    bg: "from-orange-50 to-orange-100",
    border: "border-orange-500",
    text: "text-orange-700",
    badge: "bg-orange-100 text-orange-700",
    checkbox: "border-orange-500 bg-orange-50 text-orange-700"
  },
  red: {
    bg: "from-red-50 to-red-100",
    border: "border-red-500",
    text: "text-red-700",
    badge: "bg-red-100 text-red-700",
    checkbox: "border-red-500 bg-red-50 text-red-700"
  },
  indigo: {
    bg: "from-indigo-50 to-indigo-100",
    border: "border-indigo-500",
    text: "text-indigo-700",
    badge: "bg-indigo-100 text-indigo-700",
    checkbox: "border-indigo-500 bg-indigo-50 text-indigo-700"
  },
  pink: {
    bg: "from-pink-50 to-pink-100",
    border: "border-pink-500",
    text: "text-pink-700",
    badge: "bg-pink-100 text-pink-700",
    checkbox: "border-pink-500 bg-pink-50 text-pink-700"
  },
  violet: {
    bg: "from-violet-50 to-violet-100",
    border: "border-violet-500",
    text: "text-violet-700",
    badge: "bg-violet-100 text-violet-700",
    checkbox: "border-violet-500 bg-violet-50 text-violet-700"
  },
  sky: {
    bg: "from-sky-50 to-sky-100",
    border: "border-sky-500",
    text: "text-sky-700",
    badge: "bg-sky-100 text-sky-700",
    checkbox: "border-sky-500 bg-sky-50 text-sky-700"
  },
  rose: {
    bg: "from-rose-50 to-rose-100",
    border: "border-rose-500",
    text: "text-rose-700",
    badge: "bg-rose-100 text-rose-700",
    checkbox: "border-rose-500 bg-rose-50 text-rose-700"
  },
  amber: {
    bg: "from-amber-50 to-amber-100",
    border: "border-amber-500",
    text: "text-amber-700",
    badge: "bg-amber-100 text-amber-700",
    checkbox: "border-amber-500 bg-amber-50 text-amber-700"
  }
};

export default function AmenitiesSection({ 
  selectedAmenities, 
  toggleAmenity, 
  setSelectedAmenities
}) {
  const [openCategories, setOpenCategories] = useState([]);

  const toggleCategory = (categoryKey) => {
    setOpenCategories(prev => 
      prev.includes(categoryKey)
        ? prev.filter(k => k !== categoryKey)
        : [...prev, categoryKey]
    );
  };

  const getSelectedInCategory = (items) => {
    return items.filter(item => selectedAmenities.includes(item)).length;
  };

  const totalSelected = selectedAmenities.length;
  const totalCategories = Object.keys(AMENITIES_BY_CATEGORY).length;

  return (
    <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* Header com gradiente teal-cyan */}
      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles size={32} className="text-white" />
            <div>
              <h2 className="text-3xl font-bold text-white">
                ✅ COMODIDADES DO IMÓVEL
              </h2>
              <p className="text-teal-50 text-sm mt-1">
                Selecione todas as comodidades disponíveis
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              <p className="text-white font-bold text-lg">{totalSelected}</p>
              <p className="text-teal-50 text-xs">de 200+ opções</p>
            </div>
          </div>
        </div>
        
        {totalSelected > 0 && (
          <button
            type="button"
            onClick={() => setSelectedAmenities([])}
            className="mt-4 px-4 py-2 bg-white/20 backdrop-blur-sm border-2 border-white text-white rounded-lg hover:bg-white/30 transition-all flex items-center gap-2 font-medium"
          >
            <X size={16} />
            Limpar Todas ({totalSelected})
          </button>
        )}
      </div>

      {/* Resumo */}
      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 px-8 py-4 border-b-2 border-teal-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-teal-700 font-medium">
            📦 {totalCategories} categorias disponíveis
          </span>
          <span className="text-cyan-700 font-medium">
            ✅ {totalSelected} comodidades selecionadas
          </span>
        </div>
      </div>

      {/* Acordeão de Categorias */}
      <div className="p-6 space-y-3">
        {Object.entries(AMENITIES_BY_CATEGORY).map(([key, category]) => {
          const isOpen = openCategories.includes(key);
          const selectedCount = getSelectedInCategory(category.items);
          const Icon = category.icon;
          const colors = colorClasses[category.color];

          return (
            <div key={key} className="border-2 border-slate-200 rounded-xl overflow-hidden">
              {/* Header da Categoria */}
              <button
                type="button"
                onClick={() => toggleCategory(key)}
                className={`w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r ${colors.bg} border-l-4 ${colors.border} hover:shadow-md transition-all`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={24} className={colors.text} />
                  <span className={`font-bold text-lg ${colors.text}`}>
                    {category.name}
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  {selectedCount > 0 && (
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${colors.badge}`}>
                      {selectedCount} {selectedCount === 1 ? 'selecionada' : 'selecionadas'}
                    </span>
                  )}
                  <ChevronDown 
                    size={20} 
                    className={`${colors.text} transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </div>
              </button>

              {/* Conteúdo da Categoria (Grid de Checkboxes) */}
              {isOpen && (
                <div className="p-6 bg-white border-t-2 border-slate-100">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {category.items.map(item => {
                      const isSelected = selectedAmenities.includes(item);
                      
                      return (
                        <label
                          key={item}
                          className={`relative flex items-start gap-3 px-4 py-3 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                            isSelected
                              ? colors.checkbox
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleAmenity(item)}
                            className="mt-0.5 w-5 h-5 rounded border-slate-300 cursor-pointer"
                          />
                          <span className={`text-sm font-medium leading-tight ${
                            isSelected ? colors.text : 'text-slate-700'
                          }`}>
                            {item}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
