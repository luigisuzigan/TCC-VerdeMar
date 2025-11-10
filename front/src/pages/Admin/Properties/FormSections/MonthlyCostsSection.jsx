import { BadgeDollarSign, Building2, FileText, Shield, CheckCircle, Info } from 'lucide-react';
import { shouldShowField, isFieldRequired } from '../../../../utils/propertyFieldsHelper';

export default function MonthlyCostsSection({ 
  model, 
  update, 
  selectedType,
  condoFee,
  iptu,
  homeInsurance
}) {
  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
        <BadgeDollarSign size={28} className="text-green-600" />
        5. Custos Mensais
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 5.1: Condomínio (Condicional) */}
        {shouldShowField(selectedType, 'condoFee') && (
          <div className="bg-white rounded-xl p-5 border border-green-200 hover:border-green-400 transition-colors">
            <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <Building2 size={18} className="text-green-600" />
              Condomínio (R$/mês)
              {isFieldRequired(selectedType, 'condoFee') && (
                <span className="ml-auto text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
                  Obrigatório
                </span>
              )}
            </label>
            <input
              type="number"
              step="0.01"
              value={condoFee}
              onChange={(e) => update('condoFee', e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg font-medium"
              placeholder="0,00"
              required={isFieldRequired(selectedType, 'condoFee')}
            />
          </div>
        )}

        {/* Card 5.2: IPTU */}
        <div className="bg-white rounded-xl p-5 border border-green-200 hover:border-green-400 transition-colors">
          <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <FileText size={18} className="text-green-600" />
            IPTU Anual (R$)
            <span className="ml-auto text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
              Opcional
            </span>
          </label>
          <input
            type="number"
            step="0.01"
            value={iptu}
            onChange={(e) => update('iptu', e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg font-medium"
            placeholder="0,00"
          />
          <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
            <Info size={12} />
            Valor anual, será dividido por 12
          </p>
        </div>

        {/* Card 5.3: Seguro */}
        <div className="bg-white rounded-xl p-5 border border-green-200 hover:border-green-400 transition-colors">
          <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <Shield size={18} className="text-green-600" />
            Seguro (R$/mês)
            <span className="ml-auto text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
              Opcional
            </span>
          </label>
          <input
            type="number"
            step="0.01"
            value={homeInsurance}
            onChange={(e) => update('homeInsurance', e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg font-medium"
            placeholder="0,00"
          />
        </div>
      </div>

      {/* Card 5.4: Resumo Total */}
      {(condoFee || iptu || homeInsurance) && (
        <div className="mt-6 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            <CheckCircle size={20} />
            Custo Mensal Total
          </h3>
          <div className="text-4xl font-extrabold mb-4">
            R$ {(
              parseFloat(condoFee || 0) +
              (parseFloat(iptu || 0) / 12) +
              parseFloat(homeInsurance || 0)
            ).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="space-y-1 text-sm">
            {condoFee && (
              <div className="flex justify-between">
                <span>Condomínio:</span>
                <span className="font-semibold">R$ {parseFloat(condoFee).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            )}
            {iptu && (
              <div className="flex justify-between">
                <span>IPTU (mensal):</span>
                <span className="font-semibold">R$ {(parseFloat(iptu) / 12).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            )}
            {homeInsurance && (
              <div className="flex justify-between">
                <span>Seguro:</span>
                <span className="font-semibold">R$ {parseFloat(homeInsurance).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
