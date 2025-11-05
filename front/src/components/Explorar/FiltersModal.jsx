import { Dialog } from '@headlessui/react';
import { X, Maximize2, Car, Waves, Dumbbell, Trees, Building2, Calendar, DollarSign, Home, Mountain, Wind } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function FiltersModal({ isOpen, onClose, filters, onApplyFilters }) {
  const [localFilters, setLocalFilters] = useState(filters);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  
  // Estados para vagas de garagem (mesmo sistema do RoomsModal)
  const [parkingMode, setParkingMode] = useState('min');
  const [parkingMin, setParkingMin] = useState('');
  const [parkingMax, setParkingMax] = useState('');
  const [parkingExact, setParkingExact] = useState('');

  // ✅ FIX: Sincronizar localFilters quando filters externos mudarem
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const updateLocalFilter = (key, value) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  // Verificar se o tipo selecionado precisa de andar
  const needsFloorFilter = () => {
    const types = localFilters.propertyTypes || filters.propertyTypes || [];
    return types.includes('apartamento') || types.includes('cobertura');
  };

  const handleApply = () => {
    const result = { ...localFilters };
    
    // Adicionar vagas baseado no modo selecionado
    if (parkingMode === 'min' && parkingMin) {
      result.parkingSpaces = parseInt(parkingMin);
    } else if (parkingMode === 'exact' && parkingExact) {
      result.parkingExact = parseInt(parkingExact);
    } else if (parkingMode === 'range' && parkingMin && parkingMax) {
      result.parkingMin = parseInt(parkingMin);
      result.parkingMax = parseInt(parkingMax);
    }
    
    onApplyFilters(result);
  };

  const handleReset = () => {
    setLocalFilters({});
    setParkingMode('min');
    setParkingMin('');
    setParkingMax('');
    setParkingExact('');
    onApplyFilters({});
  };

  // Comodidades resumidas (apenas as mais populares)
  const resumedAmenities = [
    { name: 'Piscina', icon: Waves },
    { name: 'Academia', icon: Dumbbell },
    { name: 'Churrasqueira', icon: '🍖' },
    { name: 'Jardim', icon: Trees },
    { name: 'Ar Condicionado', icon: '❄️' },
    { name: 'Varanda', icon: '🪟' },
    { name: 'Pet Friendly', icon: '🐾' },
    { name: 'Portaria 24h', icon: '🛡️' },
    { name: 'Salão de Festas', icon: '🎉' },
    { name: 'Playground', icon: '🎪' },
    { name: 'Elevador', icon: '🛗' },
    { name: 'Garagem Coberta', icon: Car },
  ];

  // Todas as comodidades organizadas por categoria
  const allAmenitiesByCategory = {
    '🏊 Lazer': [
      { name: 'Piscina', icon: Waves },
      { name: 'Piscina Aquecida', icon: '🏊' },
      { name: 'Hidromassagem', icon: '♨️' },
      { name: 'Academia', icon: Dumbbell },
      { name: 'Sauna', icon: '♨️' },
      { name: 'Churrasqueira', icon: '🍖' },
      { name: 'Área Gourmet', icon: '🍽️' },
      { name: 'Jardim', icon: Trees },
      { name: 'Varanda', icon: '🪟' },
      { name: 'Sacada', icon: '🏞️' },
      { name: 'Quadra Esportiva', icon: '🏀' },
      { name: 'Salão de Festas', icon: '🎉' },
      { name: 'Playground', icon: '🎪' },
      { name: 'Salão de Jogos', icon: '🎮' },
    ],
    '🌐 Tecnologia': [
      { name: 'WiFi', icon: '📡' },
      { name: 'Fibra Óptica', icon: '🌐' },
      { name: 'Smart TV', icon: '📺' },
      { name: 'Automação', icon: '🤖' },
      { name: 'Interfone', icon: '📞' },
      { name: 'Vídeo Porteiro', icon: '📹' },
      { name: 'Portão Eletrônico', icon: '🚪' },
    ],
    '❄️ Climatização': [
      { name: 'Ar Condicionado', icon: '❄️' },
      { name: 'Ar-condicionado Central', icon: '❄️' },
      { name: 'Aquecimento', icon: '🔥' },
      { name: 'Aquecedor Solar', icon: '☀️' },
      { name: 'Ventilador Teto', icon: '🌀' },
      { name: 'Lareira', icon: '🔥' },
    ],
    '🚗 Garagem': [
      { name: 'Garagem Coberta', icon: Car },
      { name: 'Garagem Descoberta', icon: '🅿️' },
      { name: 'Vaga Visitantes', icon: '🚗' },
      { name: 'Carregador Elétrico', icon: '⚡' },
    ],
    '🍳 Cozinha': [
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
    '🔒 Segurança': [
      { name: 'Portaria 24h', icon: '🛡️' },
      { name: 'Segurança 24h', icon: '👮' },
      { name: 'Câmeras', icon: '📹' },
      { name: 'CFTV', icon: '📺' },
      { name: 'Alarme', icon: '🚨' },
      { name: 'Cerca Elétrica', icon: '⚡' },
      { name: 'Porta Blindada', icon: '🚪' },
      { name: 'Cofre', icon: '🔐' },
    ],
    '♿ Acessibilidade': [
      { name: 'Elevador', icon: '🛗' },
      { name: 'Elevador Social', icon: '🛗' },
      { name: 'Acessível Cadeirantes', icon: '♿' },
      { name: 'Rampa', icon: '♿' },
      { name: 'Banheiro Adaptado', icon: '🚻' },
    ],
    '🐕 Pets': [
      { name: 'Pet Friendly', icon: '🐾' },
      { name: 'Aceita Cães', icon: '🐕' },
      { name: 'Aceita Gatos', icon: '🐈' },
      { name: 'Pet Place', icon: '🐾' },
    ],
    '🏠 Acabamentos': [
      { name: 'Armários Embutidos', icon: '🗄️' },
      { name: 'Closet', icon: '👔' },
      { name: 'Piso Porcelanato', icon: '◻️' },
      { name: 'Piso Laminado', icon: '◻️' },
      { name: 'Gesso', icon: '⬜' },
    ],
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      {/* Full-screen container */}
      <div className="fixed inset-0 flex items-start justify-center overflow-y-auto">
        <Dialog.Panel className="w-full max-w-5xl bg-white rounded-b-2xl shadow-2xl">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
            <Dialog.Title className="text-xl font-bold text-slate-900">
              Mais Filtros
            </Dialog.Title>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[calc(100vh-180px)] overflow-y-auto">
            <div className="space-y-8">
              
              {/* === SEÇÃO: CARACTERÍSTICAS DO IMÓVEL === */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Home size={20} className="text-blue-600" />
                  Características do Imóvel
                </h3>
                <div className="space-y-6">

                  {/* Area */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-3">
                      <div className="flex items-center gap-2">
                        <Maximize2 size={18} />
                        Área (m²)
                      </div>
                    </label>
                    <div className="grid grid-cols-2 gap-3 max-w-md">
                      <input
                        type="number"
                        placeholder="Mínimo"
                        value={localFilters.areaMin || ''}
                        onChange={(e) => updateLocalFilter('areaMin', e.target.value)}
                        className="px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="number"
                        placeholder="Máximo"
                        value={localFilters.areaMax || ''}
                        onChange={(e) => updateLocalFilter('areaMax', e.target.value)}
                        className="px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Vagas de Garagem - NOVO SISTEMA */}
                  <div className="pb-6 border-b border-slate-200">
                    <label className="flex items-center gap-2 text-base font-bold text-slate-900 mb-4">
                      <Car size={22} className="text-blue-600" />
                      Vagas de Garagem
                    </label>

                    {/* Modo de filtro */}
                    <div className="flex gap-2 mb-4 max-w-md">
                      <button
                        type="button"
                        onClick={() => setParkingMode('min')}
                        className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                          parkingMode === 'min'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        Mínimo
                      </button>
                      <button
                        type="button"
                        onClick={() => setParkingMode('exact')}
                        className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                          parkingMode === 'exact'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        Exato
                      </button>
                      <button
                        type="button"
                        onClick={() => setParkingMode('range')}
                        className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                          parkingMode === 'range'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        Entre
                      </button>
                    </div>

                    {/* Inputs baseados no modo */}
                    {parkingMode === 'min' && (
                      <div className="max-w-md">
                        <div className="grid grid-cols-5 gap-2 mb-3">
                          {[1, 2, 3, 4, 5].map((num) => (
                            <button
                              type="button"
                              key={num}
                              onClick={() => setParkingMin(num.toString())}
                              className={`px-3 py-2.5 border-2 rounded-lg font-bold text-sm transition-all ${
                                parkingMin === num.toString()
                                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                                  : 'border-slate-200 hover:border-blue-300'
                              }`}
                            >
                              {num}+
                            </button>
                          ))}
                        </div>
                        <input
                          type="number"
                          placeholder="Ou digite..."
                          value={parkingMin}
                          onChange={(e) => setParkingMin(e.target.value)}
                          className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    )}

                    {parkingMode === 'exact' && (
                      <div className="max-w-md">
                        <div className="grid grid-cols-5 gap-2 mb-3">
                          {[1, 2, 3, 4, 5].map((num) => (
                            <button
                              type="button"
                              key={num}
                              onClick={() => setParkingExact(num.toString())}
                              className={`px-3 py-2.5 border-2 rounded-lg font-bold text-sm transition-all ${
                                parkingExact === num.toString()
                                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                                  : 'border-slate-200 hover:border-blue-300'
                              }`}
                            >
                              {num}
                            </button>
                          ))}
                        </div>
                        <input
                          type="number"
                          placeholder="Exatamente..."
                          value={parkingExact}
                          onChange={(e) => setParkingExact(e.target.value)}
                          className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    )}

                    {parkingMode === 'range' && (
                      <div className="grid grid-cols-2 gap-3 max-w-md">
                        <div>
                          <label className="block text-xs text-slate-600 mb-2">De</label>
                          <input
                            type="number"
                            placeholder="Min"
                            value={parkingMin}
                            onChange={(e) => setParkingMin(e.target.value)}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-600 mb-2">Até</label>
                          <input
                            type="number"
                            placeholder="Max"
                            value={parkingMax}
                            onChange={(e) => setParkingMax(e.target.value)}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Andar - CONDICIONAL */}
                  {needsFloorFilter() && (
                    <div className="pb-6 border-b border-slate-200">
                      <label className="block text-sm font-semibold text-slate-900 mb-3">
                        <div className="flex items-center gap-2">
                          <Building2 size={18} />
                          Andar
                        </div>
                      </label>
                      <div className="grid grid-cols-2 gap-3 max-w-md">
                        <input
                          type="number"
                          placeholder="Mínimo"
                          value={localFilters.floorMin || ''}
                          onChange={(e) => updateLocalFilter('floorMin', e.target.value)}
                          className="px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="number"
                          placeholder="Máximo"
                          value={localFilters.floorMax || ''}
                          onChange={(e) => updateLocalFilter('floorMax', e.target.value)}
                          className="px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <p className="text-xs text-slate-500 mt-2">
                        💡 Este filtro aparece porque você selecionou Apartamento ou Cobertura
                      </p>
                    </div>
                  )}

                  {/* Ano de Construção */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar size={18} />
                        Ano de Construção Mínimo
                      </div>
                    </label>
                    <input
                      type="number"
                      placeholder="Ex: 2020"
                      min="1900"
                      max={new Date().getFullYear()}
                      value={localFilters.yearBuilt || ''}
                      onChange={(e) => updateLocalFilter('yearBuilt', e.target.value)}
                      className="w-full max-w-xs px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* === SEÇÃO: COMODIDADES DO IMÓVEL === */}
              <div className="border-t border-slate-200 pt-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Waves size={20} className="text-cyan-600" />
                  Comodidades do Imóvel
                </h3>
                
                {/* Modo Resumido */}
                {!showAllAmenities && (
                  <>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {resumedAmenities.map((amenity) => (
                        <label key={amenity.name} className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-3 rounded-lg border border-slate-200 transition-colors">
                          <input
                            type="checkbox"
                            checked={localFilters.amenities?.includes(amenity.name) || false}
                            onChange={(e) => {
                              const current = localFilters.amenities || [];
                              const updated = e.target.checked
                                ? [...current, amenity.name]
                                : current.filter(a => a !== amenity.name);
                              updateLocalFilter('amenities', updated);
                            }}
                            className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-slate-700 flex items-center gap-2 text-sm">
                            {typeof amenity.icon === 'string' ? (
                              <span className="text-lg">{amenity.icon}</span>
                            ) : (
                              <amenity.icon size={16} className="text-blue-600" />
                            )}
                            {amenity.name}
                          </span>
                        </label>
                      ))}
                    </div>
                    
                    {/* Botão Ver Mais */}
                    <div className="mt-4 text-center">
                      <button
                        type="button"
                        onClick={() => setShowAllAmenities(true)}
                        className="px-6 py-2 text-blue-600 font-semibold hover:bg-blue-50 rounded-lg transition-colors inline-flex items-center gap-2"
                      >
                        Ver mais comodidades
                        <span className="text-lg">▼</span>
                      </button>
                    </div>
                  </>
                )}

                {/* Modo Completo - Por Categorias */}
                {showAllAmenities && (
                  <>
                    <div className="space-y-6">
                      {Object.entries(allAmenitiesByCategory).map(([category, amenities]) => (
                        <div key={category}>
                          <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                            <span className="text-lg">{category.split(' ')[0]}</span>
                            <span>{category.split(' ').slice(1).join(' ')}</span>
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {amenities.map((amenity) => (
                              <label key={amenity.name} className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-3 rounded-lg border border-slate-200 transition-colors">
                                <input
                                  type="checkbox"
                                  checked={localFilters.amenities?.includes(amenity.name) || false}
                                  onChange={(e) => {
                                    const current = localFilters.amenities || [];
                                    const updated = e.target.checked
                                      ? [...current, amenity.name]
                                      : current.filter(a => a !== amenity.name);
                                    updateLocalFilter('amenities', updated);
                                  }}
                                  className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-slate-700 flex items-center gap-2 text-sm">
                                  {typeof amenity.icon === 'string' ? (
                                    <span className="text-lg">{amenity.icon}</span>
                                  ) : (
                                    <amenity.icon size={16} className="text-blue-600" />
                                  )}
                                  {amenity.name}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Botão Ver Menos */}
                    <div className="mt-6 text-center">
                      <button
                        type="button"
                        onClick={() => setShowAllAmenities(false)}
                        className="px-6 py-2 text-blue-600 font-semibold hover:bg-blue-50 rounded-lg transition-colors inline-flex items-center gap-2"
                      >
                        Ver menos comodidades
                        <span className="text-lg">▲</span>
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* === SEÇÃO: CONDIÇÕES NATURAIS === */}
              <div className="border-t border-slate-200 pt-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Mountain size={20} className="text-green-600" />
                  Condições Naturais
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {[
                    { name: 'Vista para o Mar', icon: '🌊' },
                    { name: 'Vista para Montanha', icon: '⛰️' },
                    { name: 'Pé na Areia', icon: '🏖️' },
                    { name: 'Frente para o Mar', icon: '🌅' },
                    { name: 'Área Verde', icon: '🌳' },
                    { name: 'Lago', icon: '🏞️' },
                    { name: 'Rio', icon: '🏞️' },
                    { name: 'Mata Nativa', icon: '🌲' },
                    { name: 'Sol da Manhã', icon: '🌄' },
                    { name: 'Sol da Tarde', icon: '🌇' },
                    { name: 'Ventilação Natural', icon: Wind },
                    { name: 'Iluminação Natural', icon: '☀️' },
                  ].map((condition) => (
                    <label key={condition.name} className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-3 rounded-lg border border-slate-200 transition-colors">
                      <input
                        type="checkbox"
                        checked={localFilters.naturalConditions?.includes(condition.name) || false}
                        onChange={(e) => {
                          const current = localFilters.naturalConditions || [];
                          const updated = e.target.checked
                            ? [...current, condition.name]
                            : current.filter(c => c !== condition.name);
                          updateLocalFilter('naturalConditions', updated);
                        }}
                        className="w-5 h-5 rounded border-slate-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-slate-700 flex items-center gap-2 text-sm">
                        {typeof condition.icon === 'string' ? (
                          <span className="text-lg">{condition.icon}</span>
                        ) : (
                          <condition.icon size={16} className="text-green-600" />
                        )}
                        {condition.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-between">
            <button
              onClick={handleReset}
              className="px-6 py-3 text-slate-700 font-semibold hover:bg-slate-100 rounded-xl transition-colors"
            >
              Limpar tudo
            </button>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-6 py-3 border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleApply}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
              >
                Aplicar filtros
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

