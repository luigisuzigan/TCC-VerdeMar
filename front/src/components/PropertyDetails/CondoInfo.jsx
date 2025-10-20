import { Building2, DollarSign, FileText, Calendar } from 'lucide-react';

/**
 * Componente para exibir informações de Condomínio e Custos
 * Inclui: Valor do condomínio, IPTU, Andar, Ano de construção
 */
export default function CondoInfo({ property, formatCurrency }) {
  const { condoFee, iptu, floor, totalFloors, yearBuilt, propertyCondition } = property;

  // Se não tem nenhuma info, não exibe
  if (!condoFee && !iptu && !floor && !yearBuilt && !propertyCondition) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
      <h3 className="text-xl font-bold text-slate-900 mb-4">Informações Adicionais</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Valor do Condomínio */}
        {condoFee && (
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-blue-600 uppercase mb-1">Condomínio</p>
              <p className="text-lg font-bold text-slate-900">{formatCurrency(condoFee)}<span className="text-sm text-slate-500 font-normal">/mês</span></p>
            </div>
          </div>
        )}

        {/* IPTU */}
        {iptu && (
          <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200">
            <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-amber-600 uppercase mb-1">IPTU</p>
              <p className="text-lg font-bold text-slate-900">{formatCurrency(iptu)}<span className="text-sm text-slate-500 font-normal">/ano</span></p>
            </div>
          </div>
        )}

        {/* Andar */}
        {floor && (
          <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl border border-purple-200">
            <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-purple-600 uppercase mb-1">Andar</p>
              <p className="text-lg font-bold text-slate-900">
                {floor}º andar
                {totalFloors && <span className="text-sm text-slate-500 font-normal"> de {totalFloors}</span>}
              </p>
            </div>
          </div>
        )}

        {/* Ano de Construção */}
        {yearBuilt && (
          <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
            <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-emerald-600 uppercase mb-1">Ano de Construção</p>
              <p className="text-lg font-bold text-slate-900">{yearBuilt}</p>
            </div>
          </div>
        )}

        {/* Condição do Imóvel */}
        {propertyCondition && (
          <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex-shrink-0 w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Condição</p>
              <p className="text-lg font-bold text-slate-900">{propertyCondition}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
