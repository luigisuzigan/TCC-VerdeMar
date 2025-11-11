import { DollarSign, Building2, FileText, Shield, Info, Calculator } from 'lucide-react';

export default function PriceSection({ model, update }) {
  // Calcular valores para o resumo
  const condominio = parseFloat(model.condoFee) || 0;
  const iptuAnual = parseFloat(model.iptu) || 0;
  const seguro = parseFloat(model.homeInsurance) || 0;
  
  const iptuMensal = iptuAnual / 12;
  const totalMensal = condominio + iptuMensal + seguro;
  
  // Verificar se deve mostrar resumo
  const mostrarResumo = condominio > 0 || iptuAnual > 0 || seguro > 0;

  return (
    <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* Header com gradiente amarelo-dourado */}
      <div className="bg-gradient-to-r from-amber-500 to-yellow-500 px-8 py-6 text-center">
        <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
          <DollarSign size={32} />
          💰 PREÇO E CUSTOS MENSAIS
        </h2>
        <p className="text-amber-50 text-sm mt-2">Valor de venda e custos mensais do imóvel</p>
      </div>

      {/* Conteúdo */}
      <div className="p-8 space-y-6">
        
        {/* 1. VALOR DE VENDA */}
        <div>
          <label className="flex items-center justify-between mb-3">
            <span className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <DollarSign size={20} className="text-amber-600" />
              💵 Valor de Venda
            </span>
            <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full font-semibold">
              Obrigatório
            </span>
          </label>
          <input 
            type="number"
            step="1"
            value={model.price || ''}
            onChange={(e) => update('price', e.target.value)}
            placeholder="850000"
            className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-lg font-semibold"
            required
          />
          <p className="text-sm text-slate-500 mt-2">
            💡 Digite apenas números, sem pontos ou vírgulas
          </p>
        </div>

        {/* Divisor */}
        <div className="border-t border-slate-200"></div>

        {/* 2. CUSTOS MENSAIS */}
        <div>
          <label className="flex items-center justify-between mb-3">
            <span className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Calculator size={20} className="text-slate-600" />
              💵 Custos Mensais do Imóvel
            </span>
            <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-semibold">
              Opcional
            </span>
          </label>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Condomínio */}
            <div className="bg-white rounded-xl p-5 border-2 border-slate-200 hover:border-amber-400 transition-colors">
              <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <Building2 size={18} className="text-amber-600" />
                🏢 Condomínio (R$/mês)
              </label>
              <input 
                type="number"
                step="0.01"
                value={model.condoFee || ''}
                onChange={(e) => update('condoFee', e.target.value)}
                placeholder="850,00"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-lg font-medium"
              />
            </div>

            {/* IPTU */}
            <div className="bg-white rounded-xl p-5 border-2 border-slate-200 hover:border-amber-400 transition-colors">
              <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <FileText size={18} className="text-amber-600" />
                📋 IPTU (R$/ano)
              </label>
              <input 
                type="number"
                step="0.01"
                value={model.iptu || ''}
                onChange={(e) => update('iptu', e.target.value)}
                placeholder="1440,00"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-lg font-medium"
              />
              <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                <Info size={12} />
                Valor anual, será dividido por 12
              </p>
            </div>

            {/* Seguro */}
            <div className="bg-white rounded-xl p-5 border-2 border-slate-200 hover:border-amber-400 transition-colors">
              <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <Shield size={18} className="text-amber-600" />
                🛡️ Seguro (R$/mês)
              </label>
              <input 
                type="number"
                step="0.01"
                value={model.homeInsurance || ''}
                onChange={(e) => update('homeInsurance', e.target.value)}
                placeholder="150,00"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-lg font-medium"
              />
            </div>
          </div>
        </div>

        {/* 3. RESUMO COMPACTO (só aparece se tiver custos preenchidos) */}
        {mostrarResumo && (
          <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl p-6 text-white">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Calculator size={20} />
              📊 Resumo de Custos Mensais
            </h3>
            <div className="text-4xl font-extrabold mb-4">
              R$ {totalMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="space-y-1 text-sm">
              {condominio > 0 && (
                <div className="flex justify-between">
                  <span>🏢 Condomínio:</span>
                  <span className="font-semibold">R$ {condominio.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              )}
              {iptuAnual > 0 && (
                <div className="flex justify-between">
                  <span>📋 IPTU (mensal):</span>
                  <span className="font-semibold">R$ {iptuMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              )}
              {seguro > 0 && (
                <div className="flex justify-between">
                  <span>�️ Seguro:</span>
                  <span className="font-semibold">R$ {seguro.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              )}
            </div>
            <p className="text-xs text-emerald-100 mt-4 flex items-center gap-1">
              <Info size={12} />
              Custo mensal total que o comprador pagará
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
