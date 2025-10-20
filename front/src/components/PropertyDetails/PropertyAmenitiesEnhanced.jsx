import { useState } from 'react';
import { 
  Waves, Wifi, Snowflake, Car, ChefHat, Shield, 
  Accessibility, PawPrint, Building, Droplets, BedDouble, 
  Home, X, Sparkles, Check, Dumbbell, Flame, Baby, 
  Gamepad2, PartyPopper, Trophy, UtensilsCrossed, Film,
  Cable, Tv, Phone, Video, Bell, Camera, Fan, Wind,
  Key, DoorOpen, Zap, Bike, Square, Package, Wine,
  Eye, CloudRain, Dog, Trees, Leaf, BookOpen, Users,
  WashingMachine, Bath, Lightbulb, Layers, Crown, Sun,
  MapPin, Apple, Grid3x3, Briefcase
} from 'lucide-react';

/**
 * Componente para exibir Amenidades de forma organizada por categorias
 * Cada categoria mostra sua principal amenidade
 * Botão "Ver todas" abre modal com lista completa organizada
 */
export default function PropertyAmenitiesEnhanced({ property }) {
  const [showModal, setShowModal] = useState(false);

  // Mapeamento de ícones específicos para cada amenidade
  const amenityIcons = {
    // Lazer
    'Piscina': Waves,
    'Piscina aquecida': Flame,
    'Piscina infantil': Baby,
    'Academia': Dumbbell,
    'Sauna': Flame,
    'Spa': Sparkles,
    'Salão de jogos': Gamepad2,
    'Salão de festas': PartyPopper,
    'Churrasqueira': Flame,
    'Playground': Baby,
    'Quadra poliesportiva': Trophy,
    'Quadra de tênis': Trophy,
    'Campo de futebol': Trophy,
    'Espaço gourmet': UtensilsCrossed,
    'Cinema': Film,
    'Jardim': Trees,
    'Varanda': Home,
    'Sacada': Home,
    'Deck': Home,
    
    // Tecnologia
    'Wi-Fi': Wifi,
    'WiFi': Wifi,
    'Internet fibra óptica': Cable,
    'Fibra': Cable,
    'Smart home': Home,
    'TV a cabo': Tv,
    'Interfone': Phone,
    'Videoporteiro': Video,
    'Portão Eletrônico': DoorOpen,
    
    // Climatização
    'Ar-condicionado': Snowflake,
    'AC': Snowflake,
    'Ar-condicionado central': Wind,
    'Ventilador de teto': Fan,
    'Aquecedor': Flame,
    'Lareira': Flame,
    
    // Garagem
    'Garagem coberta': Car,
    'Garagem descoberta': Car,
    'Garagem': Car,
    'Vaga privativa': Key,
    'Vaga para visitantes': Users,
    'Vaga': Car,
    'Box individual': Square,
    'Portão automático': DoorOpen,
    'Carregador elétrico': Zap,
    'Bicicletário': Bike,
    
    // Cozinha
    'Cozinha equipada': ChefHat,
    'Cozinha americana': ChefHat,
    'Cozinha': ChefHat,
    'Fogão': Flame,
    'Cooktop': Flame,
    'Forno elétrico': Square,
    'Forno': Square,
    'Micro-ondas': Square,
    'Geladeira': Square,
    'Lava-louças': Droplets,
    'Adega': Wine,
    'Dispensa': Package,
    'Coifa': Wind,
    
    // Segurança
    'Portaria 24h': Shield,
    'Portaria': Shield,
    'Segurança': Shield,
    'Porteiro eletrônico': Phone,
    'Circuito de câmeras': Camera,
    'CFTV': Camera,
    'Câmeras': Camera,
    'Cerca elétrica': Zap,
    'Alarme': Bell,
    'Controle de acesso': Key,
    'Vigia noturno': Eye,
    'Guarita': Shield,
    'Sistema anti-incêndio': Flame,
    'Detector de fumaça': CloudRain,
    'Grades': Shield,
    'Cofre': Key,
    
    // Acessibilidade
    'Acesso para cadeirantes': Accessibility,
    'Acessível': Accessibility,
    'Elevador': Accessibility,
    'Rampa de acesso': Accessibility,
    'Rampa': Accessibility,
    'Banheiro adaptado': Accessibility,
    'Banheiro Adaptado': Accessibility,
    'Portas largas': DoorOpen,
    'Corrimão': Home,
    'Corrimãos': Home,
    'Piso tátil': Grid3x3,
    'Vaga PCD': Accessibility,
    
    // Pets
    'Pet place': PawPrint,
    'Pets': PawPrint,
    'Aceita animais': Dog,
    'Cães': Dog,
    'Gatos': PawPrint,
    'Banho para pets': Droplets,
    'Área para passeio': Trees,
    'Pet shop próximo': PawPrint,
    'Veterinário próximo': PawPrint,
    
    // Condomínio
    'Salão de Festas': PartyPopper,
    'Espaço Gourmet': UtensilsCrossed,
    'Coworking': Briefcase,
    'Brinquedoteca': Baby,
    'Biblioteca': BookOpen,
    'Pomar': Apple,
    'Horta comunitária': Leaf,
    'Praça interna': MapPin,
    'Gazebo': Home,
    'Redário': Trees,
    'Lavanderia': WashingMachine,
    'Zelador': Users,
    'Academia do Condomínio': Dumbbell,
    'Piscina do Condomínio': Waves,
    
    // Utilidades
    'Área de serviço': Droplets,
    'Lavanderia coletiva': WashingMachine,
    'Tanque': Square,
    'Máquina de lavar': WashingMachine,
    'Máquina de secar': Wind,
    'Varal': Home,
    'Depósito': Package,
    'Armários embutidos': Square,
    'Closet': Home,
    'Aquecedor solar': Sun,
    'Caixa': Square,
    'Cisterna': Droplets,
    'Aquecimento Solar': Sun,
    'Bomba': Droplets,
    'Gerador': Zap,
    'Energia Solar': Sun,
    
    // Quartos
    'Suíte master': Crown,
    'Suíte': BedDouble,
    'Closet': Home,
    'Varanda no quarto': Home,
    'Banheira': Bath,
    'Box blindex': Square,
    'Box': Square,
    'Hidromassagem': Waves,
    'Ducha': Droplets,
    'Armários': Square,
    'Guarda-roupas': Square,
    
    // Acabamentos
    'Piso porcelanato': Square,
    'Porcelanato': Square,
    'Piso laminado': Layers,
    'Piso': Square,
    'Carpete de madeira': Layers,
    'Gesso': Layers,
    'Sanca de gesso': Crown,
    'Iluminação LED': Lightbulb,
    'Spots de luz': Lightbulb,
    'Papel de parede': Home,
    'Mármore': Crown,
    'Granito': Square,
    'Portas de madeira': DoorOpen,
    'Esquadrias de alumínio': Square,
    'Vidros temperados': Square,
    'Persianas': Home,
    'Cortinas': Home,
    'Molduras': Crown,
    'Pintura': Home,
    'Pé-direito': Home,
  };

  // Função para obter o ícone de uma amenidade
  const getAmenityIcon = (amenity) => {
    // Busca exata
    if (amenityIcons[amenity]) {
      return amenityIcons[amenity];
    }
    
    // Busca parcial (caso contenha a palavra-chave)
    for (const [key, icon] of Object.entries(amenityIcons)) {
      if (amenity.includes(key) || key.includes(amenity)) {
        return icon;
      }
    }
    
    // Ícone padrão
    return Check;
  };

  // Parse das amenidades
  const amenitiesArray = typeof property.amenities === 'string' 
    ? JSON.parse(property.amenities || '[]')
    : property.amenities || [];

  if (amenitiesArray.length === 0) return null;

  // Categorias de amenidades
  const categories = {
    lazer: {
      icon: Waves,
      label: 'Lazer',
      color: 'blue',
      keywords: ['Piscina', 'Academia', 'Sauna', 'Churrasqueira', 'Área Gourmet', 'Jardim', 'Varanda', 'Sacada', 'Deck', 'Quadra', 'Playground', 'Salão'],
    },
    tecnologia: {
      icon: Wifi,
      label: 'Tecnologia',
      color: 'purple',
      keywords: ['WiFi', 'Fibra', 'TV', 'Smart', 'Som', 'Automação', 'Interfone', 'Vídeo', 'Portão Eletrônico'],
    },
    climatizacao: {
      icon: Snowflake,
      label: 'Climatização',
      color: 'cyan',
      keywords: ['Ar-condicionado', 'AC', 'Aquecedor', 'Ventilador', 'Lareira'],
    },
    garagem: {
      icon: Car,
      label: 'Garagem',
      color: 'gray',
      keywords: ['Garagem', 'Vaga', 'Carregador'],
    },
    cozinha: {
      icon: ChefHat,
      label: 'Cozinha',
      color: 'orange',
      keywords: ['Cozinha', 'Geladeira', 'Fogão', 'Forno', 'Micro-ondas', 'Lava-louças', 'Máquina', 'Adega', 'Coifa'],
    },
    seguranca: {
      icon: Shield,
      label: 'Segurança',
      color: 'red',
      keywords: ['Portaria', 'Segurança', 'Câmeras', 'CFTV', 'Alarme', 'Cerca', 'Grades', 'Cofre'],
    },
    acessibilidade: {
      icon: Accessibility,
      label: 'Acessibilidade',
      color: 'indigo',
      keywords: ['Elevador', 'Acessível', 'Rampa', 'Banheiro Adaptado', 'Corrimãos'],
    },
    pets: {
      icon: PawPrint,
      label: 'Pets e Família',
      color: 'pink',
      keywords: ['Pets', 'Cães', 'Gatos', 'Pet Place', 'Playground', 'Kids'],
    },
    condominio: {
      icon: Building,
      label: 'Condomínio',
      color: 'emerald',
      keywords: ['Salão de Festas', 'Academia do Condomínio', 'Piscina do Condomínio', 'Coworking', 'Bicicletário', 'Lavanderia', 'Zelador'],
    },
    utilidades: {
      icon: Droplets,
      label: 'Utilidades',
      color: 'teal',
      keywords: ['Caixa', 'Cisterna', 'Aquecimento Solar', 'Bomba', 'Gerador', 'Energia Solar'],
    },
    quartos: {
      icon: BedDouble,
      label: 'Quartos',
      color: 'violet',
      keywords: ['Suíte', 'Closet', 'Banheira', 'Box', 'Ducha', 'Armários', 'Guarda-roupas'],
    },
    acabamentos: {
      icon: Home,
      label: 'Acabamentos',
      color: 'amber',
      keywords: ['Pé-direito', 'Piso', 'Porcelanato', 'Gesso', 'Molduras', 'Papel', 'Pintura'],
    },
  };

  // Categorizar amenidades
  const categorizedAmenities = {};
  const uncategorized = [];

  amenitiesArray.forEach(amenity => {
    let found = false;
    for (const [key, category] of Object.entries(categories)) {
      if (category.keywords.some(keyword => amenity.includes(keyword))) {
        if (!categorizedAmenities[key]) {
          categorizedAmenities[key] = [];
        }
        categorizedAmenities[key].push(amenity);
        found = true;
        break;
      }
    }
    if (!found) {
      uncategorized.push(amenity);
    }
  });

  // Pegar apenas a PRINCIPAL de cada categoria (primeira)
  const mainAmenities = Object.entries(categorizedAmenities).map(([key, items]) => ({
    category: key,
    ...categories[key],
    main: items[0],
    total: items.length,
    items: items,
  }));

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">Comodidades e Amenidades</h3>
            <p className="text-sm text-slate-500">{mainAmenities.length} categorias • {amenitiesArray.length} itens</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
          >
            <Sparkles size={16} />
            Ver todas
          </button>
        </div>

        {/* Grid de categorias - Cada uma com ícone, título e principal */}
        <div className="space-y-4">
          {mainAmenities.map(({ category, icon: Icon, label, color, main, total, items }) => (
            <div
              key={category}
              className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-md transition-shadow"
            >
              {/* Cabeçalho da categoria */}
              <div className="flex items-center gap-3 mb-3">
                <div className={`flex-shrink-0 w-10 h-10 bg-${color}-100 rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 text-${color}-600`} />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-slate-900">{label}</h4>
                  <p className="text-xs text-slate-500">
                    {total} {total === 1 ? 'item' : 'itens'}
                  </p>
                </div>
              </div>

              {/* Item principal */}
              <div className="ml-13 pl-3 border-l-2 border-emerald-300">
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-emerald-600 flex-shrink-0" />
                  <span className="text-sm text-slate-700 font-medium">{main}</span>
                </div>
                {total > 1 && (
                  <p className="text-xs text-slate-500 mt-1 ml-5">
                    e mais {total - 1} {total - 1 === 1 ? 'item' : 'itens'}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Outras amenidades não categorizadas */}
        {uncategorized.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-500 font-medium mb-2">Outras comodidades</p>
            <div className="flex flex-wrap gap-2">
              {uncategorized.slice(0, 5).map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-full"
                >
                  <Check size={12} className="text-emerald-600" />
                  {item}
                </span>
              ))}
              {uncategorized.length > 5 && (
                <span className="px-3 py-1 bg-slate-200 text-slate-600 text-xs rounded-full font-medium">
                  +{uncategorized.length - 5}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal com TODAS as amenidades */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header do Modal */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Todas as Comodidades</h2>
                <p className="text-sm text-slate-500 mt-1">
                  {amenitiesArray.length} amenidades disponíveis
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
              >
                <X size={20} className="text-slate-600" />
              </button>
            </div>

            {/* Conteúdo do Modal */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Categorias completas com ícones */}
              {Object.entries(categorizedAmenities).map(([key, items]) => {
                const category = categories[key];
                const Icon = category.icon;
                
                return (
                  <div key={key} className="mb-8 last:mb-0">
                    {/* Header da categoria com ícone e nome */}
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-slate-200">
                      <div className={`w-12 h-12 bg-${category.color}-100 rounded-xl flex items-center justify-center shadow-sm`}>
                        <Icon className={`w-6 h-6 text-${category.color}-600`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{category.label}</h3>
                        <p className="text-xs text-slate-500">{items.length} {items.length === 1 ? 'item' : 'itens'}</p>
                      </div>
                    </div>
                    
                    {/* Lista de itens com seus ícones específicos */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {items.map((item, idx) => {
                        const ItemIcon = getAmenityIcon(item);
                        return (
                          <div
                            key={idx}
                            className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors group"
                          >
                            <div className={`w-8 h-8 bg-${category.color}-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-${category.color}-200 transition-colors`}>
                              <ItemIcon size={16} className={`text-${category.color}-600`} />
                            </div>
                            <span className="text-sm text-slate-700 flex-1 mt-1">{item}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Outras amenidades não categorizadas */}
              {uncategorized.length > 0 && (
                <div className="mt-8 pt-8 border-t-2 border-slate-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center shadow-sm">
                      <Sparkles className="w-6 h-6 text-slate-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Outras Comodidades</h3>
                      <p className="text-xs text-slate-500">{uncategorized.length} {uncategorized.length === 1 ? 'item' : 'itens'}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {uncategorized.map((item, idx) => {
                      const ItemIcon = getAmenityIcon(item);
                      return (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors group"
                        >
                          <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-slate-200 transition-colors">
                            <ItemIcon size={16} className="text-slate-600" />
                          </div>
                          <span className="text-sm text-slate-700 flex-1 mt-1">{item}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Footer do Modal */}
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
