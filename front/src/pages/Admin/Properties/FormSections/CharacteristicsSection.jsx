import { Home, Ruler, Bed, Bath, Crown, Car, Info, Building2, DoorOpen } from 'lucide-react';

export default function CharacteristicsSection({ 
  model, 
  update, 
  selectedType 
}) {
  // Formatar número com separador de milhares
  const formatNumber = (value) => {
    if (!value) return '';
    const num = value.toString().replace(/\D/g, '');
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };
  
  // Remover formatação
  const unformatNumber = (value) => {
    return value.replace(/\./g, '');
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* Header com gradiente roxo-violeta */}
      <div className="bg-gradient-to-r from-purple-500 to-violet-500 px-8 py-6 text-center">
        <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
          <Home size={32} />
          🏠 CARACTERÍSTICAS DO IMÓVEL
        </h2>
        <p className="text-purple-50 text-sm mt-2">Áreas, cômodos e estrutura do imóvel</p>
      </div>

      <div className="p-8 space-y-6">
        
        {/* 1. ÁREA TOTAL - MINIMALISTA TIPO DASHBOARD */}
        <div>
          <div className="grid grid-cols-1 gap-6">
            {/* Área Total - Destaque Principal */}
            <div className="bg-white rounded-xl p-8 border-2 border-slate-200 hover:border-green-300 transition-all shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Ruler size={24} className="text-white" />
                </div>
                <div>
                  <label className="block text-lg font-bold text-slate-900">
                    Área Total do Terreno
                  </label>
                  <span className="text-sm text-slate-500">Tamanho completo do lote em m²</span>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-3 mt-6">
                <input 
                  type="text"
                  value={formatNumber(model.totalArea || '')}
                  onChange={(e) => {
                    const value = unformatNumber(e.target.value);
                    update('totalArea', value);
                  }}
                  placeholder="___"
                  className="w-40 text-5xl font-black text-green-600 border-0 border-b-4 border-green-200 focus:border-green-500 focus:outline-none focus:ring-0 placeholder:text-slate-200 text-center pb-2"
                  required
                />
                <span className="text-4xl font-bold text-slate-600 flex-shrink-0">m²</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divisor */}
        <div className="border-t border-slate-200"></div>

        {/* 2. CÔMODOS - MINIMALISTA TIPO DASHBOARD */}
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Quartos - Minimalista */}
            <div className="bg-white rounded-xl p-4 border-2 border-slate-200 hover:border-blue-300 transition-all shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Bed size={16} className="text-white" />
                </div>
                <label className="text-xs font-bold text-slate-700">
                  Quartos
                </label>
              </div>
              <input 
                type="text"
                value={model.beds || ''}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  update('beds', value);
                }}
                placeholder="__"
                className="w-full text-4xl font-black text-blue-600 border-0 border-b-4 border-blue-200 focus:border-blue-500 focus:outline-none focus:ring-0 placeholder:text-slate-200 text-center pb-2"
              />
            </div>

            {/* Suítes - Minimalista */}
            <div className="bg-white rounded-xl p-4 border-2 border-slate-200 hover:border-purple-300 transition-all shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Crown size={16} className="text-white" />
                </div>
                <label className="text-xs font-bold text-slate-700">
                  Suítes
                </label>
              </div>
              <input 
                type="text"
                value={model.suites || ''}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  update('suites', value);
                }}
                placeholder="__"
                className="w-full text-4xl font-black text-purple-600 border-0 border-b-4 border-purple-200 focus:border-purple-500 focus:outline-none focus:ring-0 placeholder:text-slate-200 text-center pb-2"
              />
            </div>

            {/* Banheiros - Minimalista */}
            <div className="bg-white rounded-xl p-4 border-2 border-slate-200 hover:border-cyan-300 transition-all shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
                  <Bath size={16} className="text-white" />
                </div>
                <label className="text-xs font-bold text-slate-700">
                  Banheiros
                </label>
              </div>
              <input 
                type="text"
                value={model.baths || ''}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  update('baths', value);
                }}
                placeholder="__"
                className="w-full text-4xl font-black text-cyan-600 border-0 border-b-4 border-cyan-200 focus:border-cyan-500 focus:outline-none focus:ring-0 placeholder:text-slate-200 text-center pb-2"
              />
            </div>

            {/* Vagas - Minimalista */}
            <div className="bg-white rounded-xl p-4 border-2 border-slate-200 hover:border-orange-300 transition-all shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Car size={16} className="text-white" />
                </div>
                <label className="text-xs font-bold text-slate-700">
                  Vagas
                </label>
              </div>
              <input 
                type="text"
                value={model.parkingSpaces || ''}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  update('parkingSpaces', value);
                }}
                placeholder="__"
                className="w-full text-4xl font-black text-orange-600 border-0 border-b-4 border-orange-200 focus:border-orange-500 focus:outline-none focus:ring-0 placeholder:text-slate-200 text-center pb-2"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200"></div>

        {/* 3. ANDARES - MINIMALISTA E ELEGANTE */}
        <div>
          <label className="flex items-center justify-between mb-4">
            <span className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Building2 size={20} className="text-slate-600" />
              🏗️ Informações de Andares
            </span>
            <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-semibold">
              Opcional
            </span>
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Andar do Imóvel - MINIMALISTA */}
            <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-6 border-2 border-slate-200 hover:border-slate-300 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-slate-600 rounded-xl flex items-center justify-center shadow-md">
                  <Building2 size={24} className="text-white" />
                </div>
                <div>
                  <label className="block text-base font-bold text-slate-900">
                    Andar do Imóvel
                  </label>
                  <span className="text-xs text-slate-600">Para apartamentos/salas</span>
                </div>
              </div>
              
              <input 
                type="text"
                value={model.floor || ''}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  update('floor', value);
                }}
                className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all text-4xl font-bold text-slate-900 text-center bg-white placeholder:text-slate-300"
                placeholder="5"
              />
              <p className="text-xs text-slate-500 mt-2 text-center">
                💡 0 = térreo
              </p>
            </div>

            {/* Total de Andares - MINIMALISTA */}
            <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-6 border-2 border-slate-200 hover:border-slate-300 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center shadow-md">
                  <Building2 size={24} className="text-white" />
                </div>
                <div>
                  <label className="block text-base font-bold text-slate-900">
                    Total de Andares
                  </label>
                  <span className="text-xs text-slate-600">Prédio ou casa</span>
                </div>
              </div>
              
              <input 
                type="text"
                value={model.totalFloors || ''}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  update('totalFloors', value);
                }}
                className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all text-4xl font-bold text-slate-900 text-center bg-white placeholder:text-slate-300"
                placeholder="12"
              />
              <p className="text-xs text-slate-500 mt-2 text-center">
                💡 Andares do prédio ou sobrado
              </p>
            </div>
          </div>

          {/* Info */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mt-4">
            <p className="text-xs text-blue-700 leading-relaxed">
              <strong>🏢 Apartamento/Sala:</strong> "Andar" = em qual andar está? | "Total" = quantos andares tem o prédio?<br/>
              <strong>🏠 Sobrado:</strong> "Total" = quantos andares tem a casa?<br/>
              <strong>🏡 Casa:</strong> "Total" = opcional, informe se tiver mais de 1 andar<br/>
              <strong>🏗️ Terreno:</strong> Defina como 0 se não aplicável
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
