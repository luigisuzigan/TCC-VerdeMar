import { DollarSign, Building2, Home, Shield } from 'lucide-react';

/**
 * Componente para exibir a seção de valores financeiros
 * - Condomínio (condicional - só se houver)
 * - Estimativa de financiamento mensal
 * - Gasto total mensal (se houver condomínio)
 * - IPTU (se houver)
 * - Seguro estimado
 */
export default function ValuesSection({ property, formatCurrency }) {
  // Calcular financiamento mensal (0.65% do valor)
  const monthlyFinancing = Math.round(property.price * 0.0065);
  
  // Calcular IPTU mensal (se houver IPTU anual)
  const monthlyIptu = property.iptu ? Math.round(property.iptu / 12) : 0;
  
  // Usar seguro do banco OU calcular estimativa (0.03% do valor ao mês)
  const monthlyInsurance = property.homeInsurance || Math.round(property.price * 0.0003);
  
  // Calcular gasto total mensal
  const monthlyTotal = monthlyFinancing + 
                       (property.condoFee || 0) + 
                       monthlyIptu + 
                       monthlyInsurance;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl shadow-sm border border-blue-200 p-6 mb-6">
      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
        <DollarSign className="text-blue-600" size={24} />
        Valores e Custos
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Financiamento Estimado */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 text-slate-600 text-sm mb-2">
            <Home size={16} />
            <span className="font-medium">Financiamento Estimado</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {formatCurrency(monthlyFinancing)}
            <span className="text-sm text-slate-500 font-normal">/mês</span>
          </div>
        </div>

        {/* Condomínio - APENAS SE EXISTIR */}
        {property.condoFee && (
          <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-emerald-500">
            <div className="flex items-center gap-2 text-emerald-700 text-sm mb-2">
              <Building2 size={16} />
              <span className="font-medium">Condomínio</span>
            </div>
            <div className="text-2xl font-bold text-emerald-700">
              {formatCurrency(property.condoFee)}
              <span className="text-sm text-emerald-600 font-normal">/mês</span>
            </div>
          </div>
        )}

        {/* IPTU - SE EXISTIR */}
        {property.iptu && (
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 text-slate-600 text-sm mb-2">
              <Home size={16} />
              <span className="font-medium">IPTU</span>
            </div>
            <div className="text-xl font-bold text-slate-900">
              {formatCurrency(monthlyIptu)}
              <span className="text-sm text-slate-500 font-normal">/mês</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {formatCurrency(property.iptu)}/ano
            </div>
          </div>
        )}

        {/* Seguro Estimado ou Real */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 text-slate-600 text-sm mb-2">
            <Shield size={16} />
            <span className="font-medium">
              Seguro {property.homeInsurance ? 'Residencial' : 'Estimado'}
            </span>
          </div>
          <div className="text-xl font-bold text-slate-900">
            {formatCurrency(monthlyInsurance)}
            <span className="text-sm text-slate-500 font-normal">/mês</span>
          </div>
        </div>

        {/* Gasto Total Mensal - DESTACADO */}
        <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl p-4 shadow-lg md:col-span-2">
          <div className="flex items-center gap-2 text-white text-sm mb-2">
            <DollarSign size={16} />
            <span className="font-medium">Gasto Total Mensal Estimado</span>
          </div>
          <div className="text-3xl font-bold text-white">
            {formatCurrency(monthlyTotal)}
            <span className="text-sm text-blue-100 font-normal">/mês</span>
          </div>
          <div className="text-xs text-blue-100 mt-2">
            Inclui: Financiamento
            {property.condoFee && ' + Condomínio'}
            {property.iptu && ' + IPTU'}
            {' + Seguro'}
          </div>
        </div>
      </div>
    </div>
  );
}
