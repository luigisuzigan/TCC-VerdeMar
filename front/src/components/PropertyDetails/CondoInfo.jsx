import { FileText } from 'lucide-react';

/**
 * Componente para exibir informações de Condomínio
 * Inclui apenas: Condição do imóvel (se aplicável)
 */
export default function CondoInfo({ property, formatCurrency }) {
  const { propertyCondition } = property;

  // Se não tem nenhuma info, não exibe
  if (!propertyCondition) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
      <h3 className="text-xl font-bold text-slate-900 mb-4">Condição do Imóvel</h3>

      <div className="grid grid-cols-1 gap-4">
        {/* Condição do Imóvel */}
        <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div className="flex-shrink-0 w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-slate-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Condição</p>
            <p className="text-lg font-bold text-slate-900">{propertyCondition}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
