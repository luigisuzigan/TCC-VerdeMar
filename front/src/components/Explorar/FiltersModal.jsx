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

  // ✅ APENAS condições que EXISTEM no banco de dados (18 valores reais)
    const naturalConditionsByCategory = {
    'Vista e Localização': [
      { name: 'Vista para o mar', icon: '🌊' },
      { name: 'Vista panorâmica do mar', icon: '🌊' },
      { name: 'Frente para o mar', icon: '🌅' },
      { name: 'Pé na areia', icon: '🏖️' },
      { name: 'Vista para a praia', icon: '🏖️' },
      { name: 'Vista para a montanha', icon: '⛰️' },
      { name: 'Vista para o lago', icon: '🏞️' },
      { name: 'Vista para o rio', icon: '🏞️' },
      { name: 'Vista para a cidade', icon: '🏙️' },
      { name: 'Vista para a natureza', icon: '🌳' },
      { name: 'Vista para o verde', icon: '🌳' },
      { name: 'Vista para o parque', icon: '🏞️' },
      { name: 'Vista desobstruída', icon: '👁️' },
      { name: 'Vista privilegiada', icon: '✨' },
    ],
    'Ventilação e Ar': [
      { name: 'Ventilação natural', icon: '💨' },
      { name: 'Ventilação cruzada', icon: '💨' },
      { name: 'Brisa marítima', icon: '🌊' },
      { name: 'Brisa constante', icon: '💨' },
      { name: 'Circulação de ar excelente', icon: '🌀' },
      { name: 'Ambientes arejados', icon: '🪟' },
      { name: 'Janelas amplas', icon: '🪟' },
      { name: 'Portas de vidro', icon: '🚪' },
    ],
    'Iluminação Solar': [
      { name: 'Sol da manhã', icon: '🌄' },
      { name: 'Sol da tarde', icon: '🌇' },
      { name: 'Sol o dia todo', icon: '☀️' },
      { name: 'Muito sol', icon: '☀️' },
      { name: 'Iluminação natural abundante', icon: '💡' },
      { name: 'Claridade natural', icon: '✨' },
      { name: 'Face norte', icon: '🧭' },
      { name: 'Face sul', icon: '🧭' },
      { name: 'Face leste', icon: '🧭' },
      { name: 'Face oeste', icon: '🧭' },
      { name: 'Claraboias / Luz zenital', icon: '💡' },
    ],
    'Clima e Conforto': [
      { name: 'Clima ameno', icon: '🌡️' },
      { name: 'Clima tropical', icon: '🌴' },
      { name: 'Temperatura agradável', icon: '🌡️' },
      { name: 'Fresco no verão', icon: '❄️' },
      { name: 'Quente no inverno', icon: '🔥' },
      { name: 'Sombra natural de árvores', icon: '🌳' },
      { name: 'Microclima agradável', icon: '🌡️' },
    ],
    'Natureza e Verde': [
      { name: 'Área verde', icon: '🌳' },
      { name: 'Arborizado', icon: '🌲' },
      { name: 'Jardim natural', icon: '🌿' },
      { name: 'Mata nativa', icon: '🌲' },
      { name: 'Árvores frutíferas', icon: '🍊' },
      { name: 'Pomar', icon: '🍎' },
      { name: 'Horta', icon: '🥬' },
      { name: 'Contato com a natureza', icon: '🌿' },
      { name: 'Fauna local', icon: '🦜' },
      { name: 'Pássaros', icon: '🐦' },
      { name: 'Borboletas', icon: '🦋' },
      { name: 'Ecossistema preservado', icon: '🌍' },
    ],
    'Terreno e Topografia': [
      { name: 'Terreno plano', icon: '▬' },
      { name: 'Terreno em declive', icon: '⛰️' },
      { name: 'Terreno em aclive', icon: '⛰️' },
      { name: 'Elevado / Ponto alto', icon: '🏔️' },
      { name: 'Vista de cima', icon: '👁️' },
      { name: 'Solo firme', icon: '🪨' },
      { name: 'Solo drenado', icon: '💧' },
    ],
    'Características Especiais': [
      { name: 'Nascer do sol', icon: '🌅' },
      { name: 'Pôr do sol', icon: '🌇' },
      { name: 'Céu estrelado', icon: '⭐' },
      { name: 'Noite tranquila', icon: '🌙' },
      { name: 'Silêncio / Ambiente calmo', icon: '🤫' },
      { name: 'Privacidade', icon: '🔒' },
      { name: 'Área isolada', icon: '🏝️' },
      { name: 'Exclusividade', icon: '💎' },
      { name: 'Som das ondas', icon: '🌊' },
      { name: 'Acesso direto à praia', icon: '🏖️' },
    ],
    'Sustentabilidade': [
      { name: 'Casa sustentável', icon: '🌱' },
      { name: 'Bioconstrução', icon: '🏡' },
      { name: 'Materiais naturais', icon: '🪵' },
      { name: 'Captação de água da chuva', icon: '💧' },
      { name: 'Compostagem', icon: '♻️' },
      { name: 'Fossa ecológica', icon: '🌱' },
      { name: 'Biodigestor', icon: '🔬' },
      { name: 'Energia renovável', icon: '⚡' },
      { name: 'Baixo impacto ambiental', icon: '🌍' },
      { name: 'Água de nascente / Poço artesiano', icon: '💧' },
    ],
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-md" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="relative bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 px-8 py-5 overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white rounded-full blur-3xl animate-pulse"></div>
            </div>
            
            <div className="relative flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/40 shadow-lg">
                  <Filter className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <Dialog.Title className="text-xl font-bold text-white drop-shadow-md flex items-center gap-2">
                    Mais Filtros
                    <Sparkles size={18} className="text-cyan-200" />
                  </Dialog.Title>
                  <p className="text-white/90 text-sm mt-0.5">Refine sua busca</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2.5 text-white/90 hover:text-white hover:bg-white/20 rounded-xl transition-all backdrop-blur-sm flex-shrink-0"
              >
                <X size={22} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-8">
              
              {/* Vagas de Garagem e Ano de Construção - LADO A LADO */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Vagas de Garagem */}
                <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl p-5 border-2 border-slate-200">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <Car size={20} className="text-emerald-600" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">Vagas de Garagem</h3>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">Mínimo de vagas</label>
                    <input
                      type="number"
                      min="0"
                      value={parkingSpaces === 0 ? '' : parkingSpaces}
                      onChange={(e) => handleInputChange(e.target.value)}
                      placeholder="Ex: 2"
                      className="w-full px-4 py-2.5 text-sm font-semibold text-slate-900 bg-white border-2 border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                    />
                  </div>
                </div>

                {/* Ano de Construção */}
                <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl p-5 border-2 border-slate-200">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center">
                      <Calendar size={20} className="text-cyan-600" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">Ano de Construção</h3>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">Ano mínimo</label>
                    <input
                      type="number"
                      placeholder="Ex: 2020"
                      min="1900"
                      max={new Date().getFullYear()}
                      value={localFilters.yearBuilt || ''}
                      onChange={(e) => updateLocalFilter('yearBuilt', e.target.value)}
                      className="w-full px-4 py-2.5 text-sm font-semibold text-slate-900 bg-white border-2 border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
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
                <div className="space-y-4">
                  {Object.entries(amenitiesByCategory).map(([category, items]) => (
                    <div key={category} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                      {/* Header da Categoria */}
                      <div className="bg-gradient-to-r from-slate-600 to-slate-700 px-4 py-3">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <Waves size={16} className="text-white" />
                          {category}
                        </h4>
                        <p className="text-xs text-slate-200 mt-0.5">{items.length} opções</p>
                      </div>
                      
                      {/* Items da Categoria */}
                      <div className="p-4 bg-slate-50">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {items.map((item) => (
                            <label key={item.name} className="flex items-center gap-2 cursor-pointer hover:bg-white p-2 rounded-lg transition-colors border border-transparent hover:border-slate-300">
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
                    </div>
                  ))}
                </div>
              </div>

              {/* Condições Naturais */}
              <div className="border-t border-slate-200 pt-6">
                <div className="space-y-4">
                  {Object.entries(naturalConditionsByCategory).map(([category, items]) => (
                    <div key={category} className="bg-white border border-green-200 rounded-xl overflow-hidden">
                      {/* Header da Categoria */}
                      <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-3">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <Mountain size={16} className="text-white" />
                          {category}
                        </h4>
                        <p className="text-xs text-green-100 mt-0.5">{items.length} opções</p>
                      </div>
                      
                      {/* Items da Categoria */}
                      <div className="p-4 bg-green-50">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {items.map((item) => (
                            <label key={item.name} className="flex items-center gap-2 cursor-pointer hover:bg-white p-2 rounded-lg transition-colors border border-transparent hover:border-green-300">
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

