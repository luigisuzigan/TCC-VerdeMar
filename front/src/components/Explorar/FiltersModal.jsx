import { Dialog } from '@headlessui/react';
import { X, Car, Waves, Dumbbell, Trees, Building2, Calendar, Mountain, Wind, Sparkles, Filter } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function FiltersModal({ isOpen, onClose, filters, onApplyFilters }) {
  const [localFilters, setLocalFilters] = useState(filters);
  const [parkingSpaces, setParkingSpaces] = useState(filters.parkingSpaces || 0);

  useEffect(() => {
    setLocalFilters(filters);
    setParkingSpaces(filters.parkingSpaces || 0);
  }, [filters]);

  const updateLocalFilter = (key, value) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleInputChange = (value) => {
    const num = parseInt(value) || 0;
    if (num >= 0) {
      setParkingSpaces(num);
    }
  };

  // Verificar se o tipo selecionado precisa de andar
  const needsFloorFilter = () => {
    const types = localFilters.propertyTypes || filters.propertyTypes || [];
    return types.includes('apartamento') || types.includes('cobertura');
  };

  const handleApply = () => {
    const result = { ...localFilters };
    if (parkingSpaces > 0) result.parkingSpaces = parkingSpaces;
    onApplyFilters(result);
  };

  const handleReset = () => {
    setLocalFilters({});
    setParkingSpaces(0);
    onApplyFilters({});
  };

  // Comodidades organizadas por categoria
  const amenitiesByCategory = {
    'Lazer e Área Externa': [
      { name: 'Piscina', icon: '🏊' },
      { name: 'Piscina Aquecida', icon: '🏊' },
      { name: 'Hidromassagem', icon: '♨️' },
      { name: 'Academia', icon: '💪' },
      { name: 'Sauna', icon: '♨️' },
      { name: 'Spa', icon: '🧖' },
      { name: 'Churrasqueira', icon: '🍖' },
      { name: 'Área Gourmet', icon: '🍽️' },
      { name: 'Forno de Pizza', icon: '🍕' },
      { name: 'Jardim', icon: '🌳' },
      { name: 'Varanda', icon: '🏞️' },
      { name: 'Sacada', icon: '🏞️' },
      { name: 'Terraço', icon: '🏙️' },
      { name: 'Deck', icon: '🪵' },
      { name: 'Gazebo', icon: '⛺' },
      { name: 'Quadra Esportiva', icon: '🏀' },
      { name: 'Salão de Festas', icon: '🎉' },
      { name: 'Playground', icon: '🎪' },
      { name: 'Salão de Jogos', icon: '🎮' },
      { name: 'Home Theater', icon: '🎬' },
    ],
    'Tecnologia': [
      { name: 'WiFi', icon: '📡' },
      { name: 'Fibra Óptica', icon: '🌐' },
      { name: 'Smart TV', icon: '📺' },
      { name: 'Automação', icon: '🤖' },
      { name: 'Interfone', icon: '📞' },
      { name: 'Vídeo Porteiro', icon: '📹' },
      { name: 'Portão Eletrônico', icon: '🚪' },
    ],
    'Climatização': [
      { name: 'Ar Condicionado', icon: '❄️' },
      { name: 'Ar Central', icon: '❄️' },
      { name: 'Aquecimento', icon: '🔥' },
      { name: 'Aquecedor Solar', icon: '☀️' },
      { name: 'Ventilador Teto', icon: '🌀' },
      { name: 'Lareira', icon: '🔥' },
    ],
    'Estacionamento': [
      { name: 'Garagem Coberta', icon: '🚗' },
      { name: 'Garagem Descoberta', icon: '🅿️' },
      { name: 'Vaga Visitantes', icon: '🚗' },
      { name: 'Carregador Elétrico', icon: '⚡' },
    ],
    'Cozinha': [
      { name: 'Cozinha Equipada', icon: '🍳' },
      { name: 'Cozinha Planejada', icon: '🏠' },
      { name: 'Cozinha Gourmet', icon: '👨‍🍳' },
      { name: 'Geladeira', icon: '🧊' },
      { name: 'Fogão', icon: '🔥' },
      { name: 'Micro-ondas', icon: '📦' },
      { name: 'Lava-louças', icon: '🍽️' },
      { name: 'Máquina Lavar', icon: '🧺' },
      { name: 'Adega', icon: '🍷' },
    ],
    'Segurança': [
      { name: 'Portaria 24h', icon: '🛡️' },
      { name: 'Segurança 24h', icon: '👮' },
      { name: 'Câmeras', icon: '📹' },
      { name: 'CFTV', icon: '📺' },
      { name: 'Alarme', icon: '🚨' },
      { name: 'Cerca Elétrica', icon: '⚡' },
      { name: 'Porta Blindada', icon: '🚪' },
      { name: 'Cofre', icon: '🔐' },
    ],
    'Acessibilidade': [
      { name: 'Elevador', icon: '🛗' },
      { name: 'Elevador Social', icon: '🛗' },
      { name: 'Acessível Cadeirantes', icon: '♿' },
      { name: 'Rampa', icon: '♿' },
      { name: 'Banheiro Adaptado', icon: '🚻' },
    ],
    'Pets': [
      { name: 'Pet Friendly', icon: '🐾' },
      { name: 'Aceita Cães', icon: '🐕' },
      { name: 'Aceita Gatos', icon: '🐈' },
      { name: 'Pet Place', icon: '🐾' },
    ],
    'Acabamentos': [
      { name: 'Armários Embutidos', icon: '🗄️' },
      { name: 'Closet', icon: '👔' },
      { name: 'Piso Porcelanato', icon: '◻️' },
      { name: 'Piso Laminado', icon: '◻️' },
      { name: 'Gesso', icon: '⬜' },
    ],
  };

  const naturalConditionsByCategory = {
    'Vista e Localização': [
      { name: 'Vista para o Mar', icon: '🌊' },
      { name: 'Vista Panorâmica do Mar', icon: '🌊' },
      { name: 'Frente para o Mar', icon: '🌅' },
      { name: 'Pé na Areia', icon: '🏖️' },
      { name: 'Vista para a Praia', icon: '🏖️' },
      { name: 'Vista para Montanha', icon: '⛰️' },
      { name: 'Vista para Lago', icon: '🏞️' },
      { name: 'Vista para Rio', icon: '🏞️' },
      { name: 'Vista para Cidade', icon: '🏙️' },
      { name: 'Vista para Natureza', icon: '🌳' },
      { name: 'Vista Desobstruída', icon: '👁️' },
      { name: 'Vista Privilegiada', icon: '✨' },
    ],
    'Ventilação e Ar': [
      { name: 'Ventilação Natural', icon: '💨' },
      { name: 'Ventilação Cruzada', icon: '💨' },
      { name: 'Brisa Marítima', icon: '🌊' },
      { name: 'Brisa Constante', icon: '💨' },
      { name: 'Circulação de Ar', icon: '🌀' },
      { name: 'Ambientes Arejados', icon: '🪟' },
    ],
    'Iluminação Solar': [
      { name: 'Sol da Manhã', icon: '🌄' },
      { name: 'Sol da Tarde', icon: '🌇' },
      { name: 'Sol o Dia Todo', icon: '☀️' },
      { name: 'Muito Sol', icon: '☀️' },
      { name: 'Iluminação Natural', icon: '💡' },
      { name: 'Claridade Natural', icon: '✨' },
      { name: 'Face Norte', icon: '🧭' },
      { name: 'Face Sul', icon: '🧭' },
      { name: 'Face Leste', icon: '🧭' },
      { name: 'Face Oeste', icon: '🧭' },
    ],
    'Clima e Conforto': [
      { name: 'Clima Ameno', icon: '🌡️' },
      { name: 'Clima Tropical', icon: '🌴' },
      { name: 'Temperatura Agradável', icon: '🌡️' },
      { name: 'Fresco no Verão', icon: '❄️' },
      { name: 'Sombra Natural', icon: '🌳' },
      { name: 'Microclima', icon: '🌡️' },
    ],
    'Natureza e Verde': [
      { name: 'Área Verde', icon: '🌳' },
      { name: 'Arborizado', icon: '🌲' },
      { name: 'Jardim Natural', icon: '🌿' },
      { name: 'Mata Nativa', icon: '🌲' },
      { name: 'Árvores Frutíferas', icon: '🍊' },
      { name: 'Pomar', icon: '🍎' },
      { name: 'Horta', icon: '🥬' },
      { name: 'Contato com Natureza', icon: '🌿' },
      { name: 'Fauna Local', icon: '🦜' },
      { name: 'Pássaros', icon: '🐦' },
      { name: 'Ecossistema Preservado', icon: '🌍' },
    ],
    'Terreno': [
      { name: 'Terreno Plano', icon: '▬' },
      { name: 'Terreno em Declive', icon: '⛰️' },
      { name: 'Terreno em Aclive', icon: '⛰️' },
      { name: 'Elevado', icon: '🏔️' },
      { name: 'Solo Firme', icon: '🪨' },
      { name: 'Solo Drenado', icon: '💧' },
    ],
    'Características Especiais': [
      { name: 'Nascer do Sol', icon: '🌅' },
      { name: 'Pôr do Sol', icon: '🌇' },
      { name: 'Céu Estrelado', icon: '⭐' },
      { name: 'Noite Tranquila', icon: '🌙' },
      { name: 'Silêncio', icon: '🤫' },
      { name: 'Privacidade', icon: '🔒' },
      { name: 'Área Isolada', icon: '🏝️' },
      { name: 'Exclusividade', icon: '💎' },
      { name: 'Som das Ondas', icon: '🌊' },
      { name: 'Acesso à Praia', icon: '🏖️' },
    ],
    'Sustentabilidade': [
      { name: 'Casa Sustentável', icon: '🌱' },
      { name: 'Bioconstrução', icon: '🏡' },
      { name: 'Materiais Naturais', icon: '🪵' },
      { name: 'Captação de Água', icon: '💧' },
      { name: 'Compostagem', icon: '♻️' },
      { name: 'Fossa Ecológica', icon: '🌱' },
      { name: 'Energia Renovável', icon: '⚡' },
      { name: 'Baixo Impacto', icon: '🌍' },
      { name: 'Poço Artesiano', icon: '💧' },
    ],
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-md" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="relative bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 px-6 py-4 overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white rounded-full blur-3xl animate-pulse"></div>
            </div>
            
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/40 shadow-lg">
                  <Filter className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <Dialog.Title className="text-lg font-bold text-white drop-shadow-md flex items-center gap-2">
                    Mais Filtros
                    <Sparkles size={16} className="text-cyan-200" />
                  </Dialog.Title>
                  <p className="text-white/90 text-xs mt-0.5">Refine sua busca</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-white/90 hover:text-white hover:bg-white/20 rounded-lg transition-all backdrop-blur-sm"
              >
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-8">
              
              {/* Vagas de Garagem e Ano de Construção - LADO A LADO */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Vagas de Garagem */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Car size={20} className="text-emerald-600" />
                    <h3 className="text-base font-bold text-slate-900">Vagas de Garagem</h3>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-sm text-slate-600">Mínimo de vagas</span>
                    <input
                      type="number"
                      min="0"
                      value={parkingSpaces === 0 ? '' : parkingSpaces}
                      onChange={(e) => handleInputChange(e.target.value)}
                      placeholder="0"
                      className="w-16 h-10 text-center text-lg font-bold text-slate-900 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                    />
                  </div>
                </div>

                {/* Ano de Construção */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar size={20} className="text-emerald-600" />
                    <h3 className="text-base font-bold text-slate-900">Ano de Construção</h3>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Ano mínimo</label>
                    <input
                      type="number"
                      placeholder={`Ex: ${new Date().getFullYear() - 5}`}
                      min="1900"
                      max={new Date().getFullYear()}
                      value={localFilters.yearBuilt || ''}
                      onChange={(e) => updateLocalFilter('yearBuilt', e.target.value)}
                      className="w-full px-3 py-2 text-sm border-2 border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Andar - CONDICIONAL */}
              {needsFloorFilter() && (
                <div className="border-t border-slate-200 pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Building2 size={20} className="text-emerald-600" />
                    <h3 className="text-base font-bold text-slate-900">Andar</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3 max-w-sm">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">Mínimo</label>
                      <input
                        type="number"
                        placeholder="0"
                        value={localFilters.floorMin || ''}
                        onChange={(e) => updateLocalFilter('floorMin', e.target.value)}
                        className="w-full px-3 py-2 text-sm border-2 border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">Máximo</label>
                      <input
                        type="number"
                        placeholder="20"
                        value={localFilters.floorMax || ''}
                        onChange={(e) => updateLocalFilter('floorMax', e.target.value)}
                        className="w-full px-3 py-2 text-sm border-2 border-slate-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">Para apartamentos e coberturas</p>
                </div>
              )}

              {/* Comodidades */}
              <div className="border-t border-slate-200 pt-6">
                <div className="flex items-center gap-2 mb-5">
                  <Waves size={20} className="text-emerald-600" />
                  <h3 className="text-base font-bold text-slate-900">Comodidades</h3>
                </div>
                
                <div className="space-y-5">
                  {Object.entries(amenitiesByCategory).map(([category, items]) => (
                    <div key={category} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                      <h4 className="text-sm font-bold text-slate-700 mb-3 pb-2 border-b border-slate-300">{category}</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {items.map((item) => (
                          <label key={item.name} className="flex items-center gap-2 cursor-pointer hover:bg-white p-2 rounded-lg transition-colors">
                            <input
                              type="checkbox"
                              checked={localFilters.amenities?.includes(item.name) || false}
                              onChange={(e) => {
                                const current = localFilters.amenities || [];
                                const updated = e.target.checked
                                  ? [...current, item.name]
                                  : current.filter(a => a !== item.name);
                                updateLocalFilter('amenities', updated);
                              }}
                              className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                            />
                            <span className="text-sm text-slate-700 flex items-center gap-1.5">
                              <span>{item.icon}</span>
                              {item.name}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Condições Naturais */}
              <div className="border-t border-slate-200 pt-6">
                <div className="flex items-center gap-2 mb-5">
                  <Mountain size={20} className="text-green-600" />
                  <h3 className="text-base font-bold text-slate-900">Natureza & Vista</h3>
                </div>
                
                <div className="space-y-5">
                  {Object.entries(naturalConditionsByCategory).map(([category, items]) => (
                    <div key={category} className="bg-green-50 rounded-xl p-4 border border-green-200">
                      <h4 className="text-sm font-bold text-green-700 mb-3 pb-2 border-b border-green-300">{category}</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {items.map((item) => (
                          <label key={item.name} className="flex items-center gap-2 cursor-pointer hover:bg-white p-2 rounded-lg transition-colors">
                            <input
                              type="checkbox"
                              checked={localFilters.naturalConditions?.includes(item.name) || false}
                              onChange={(e) => {
                                const current = localFilters.naturalConditions || [];
                                const updated = e.target.checked
                                  ? [...current, item.name]
                                  : current.filter(c => c !== item.name);
                                updateLocalFilter('naturalConditions', updated);
                              }}
                              className="w-4 h-4 rounded border-slate-300 text-green-600 focus:ring-green-500"
                            />
                            <span className="text-sm text-slate-700 flex items-center gap-1.5">
                              <span>{item.icon}</span>
                              {item.name}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 pb-6 flex items-center gap-3 border-t border-slate-200 pt-4">
            <button
              onClick={handleReset}
              className="px-5 py-2.5 text-sm font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all"
            >
              Limpar
            </button>
            <button
              onClick={handleApply}
              className="flex-1 px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 rounded-lg shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 transition-all transform hover:scale-[1.02]"
            >
              Aplicar Filtros
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

