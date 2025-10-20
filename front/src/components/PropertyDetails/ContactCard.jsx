import { Shield } from 'lucide-react';

export default function ContactCard({ property, formatCurrency }) {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24 space-y-4">
        {/* Contact Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-lg">
          <div className="mb-6">
            <p className="text-sm text-slate-600 mb-1">Entre em contato</p>
            <p className="text-sm text-slate-500">Agende uma visita ou tire suas dúvidas</p>
          </div>

          <div className="space-y-3 mb-6">
            <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm">
              Solicitar tour
            </button>
            <button className="w-full py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Entrar em contato
            </button>
          </div>

          <div className="pt-4 border-t border-slate-200 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Código do imóvel</span>
              <span className="font-semibold text-slate-900">#{property.id}</span>
            </div>
            {property.city && (
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Cidade</span>
                <span className="font-medium text-slate-900">{property.city}</span>
              </div>
            )}
            {property.state && (
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Estado</span>
                <span className="font-medium text-slate-900">{property.state}</span>
              </div>
            )}
          </div>
        </div>

        {/* Monthly Payment Breakdown */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Custos mensais estimados</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Financiamento</span>
              <span className="font-semibold text-slate-900">
                {formatCurrency(Math.round(property.price * 0.0045))}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">IPTU</span>
              <span className="font-semibold text-slate-900">
                {formatCurrency(Math.round(property.price * 0.001))}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Condomínio</span>
              <span className="font-semibold text-slate-900">
                {property.hoa ? formatCurrency(property.hoa) : formatCurrency(Math.round(property.price * 0.0005))}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Seguro residencial</span>
              <span className="font-semibold text-slate-900">
                {formatCurrency(Math.round(property.price * 0.0015))}
              </span>
            </div>
            <div className="pt-3 border-t border-slate-300 flex items-center justify-between">
              <span className="font-semibold text-slate-900">Total estimado</span>
              <span className="text-xl font-bold text-slate-900">
                {formatCurrency(Math.round(property.price * 0.0065))}
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-4">
            * Valores estimados. Consulte um especialista para cálculos precisos.
          </p>
        </div>

        {/* Trust Badge */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Shield className="text-emerald-600 flex-shrink-0 mt-1" size={20} />
            <div>
              <h3 className="font-semibold text-emerald-900 text-sm mb-1">
                Informação verificada
              </h3>
              <p className="text-xs text-emerald-700">
                Este imóvel foi verificado pela nossa equipe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
