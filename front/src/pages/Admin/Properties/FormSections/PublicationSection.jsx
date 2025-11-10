import { CheckCircle, CheckSquare, HelpCircle, Info } from 'lucide-react';

export default function PublicationSection({ model, update }) {
  return (
    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-emerald-200 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
        <CheckCircle size={28} className="text-emerald-600" />
        9. Status de Publicação
      </h2>
      
      <div className="bg-white rounded-xl p-6 border border-emerald-200">
        <label className="flex items-start gap-4 cursor-pointer group">
          <div className={`mt-1 w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all ${
            model.published 
              ? 'bg-emerald-600 border-emerald-600 shadow-lg shadow-emerald-200' 
              : 'border-slate-300 group-hover:border-slate-400 bg-slate-50'
          }`}>
            {model.published ? (
              <CheckCircle size={28} className="text-white" />
            ) : (
              <CheckSquare size={28} className="text-slate-400" />
            )}
          </div>
          <input 
            id="pub" 
            type="checkbox" 
            className="sr-only"
            checked={!!model.published} 
            onChange={(e) => update('published', e.target.checked)} 
          />
          <div className="flex-1">
            <span className="text-lg font-bold text-slate-900 block mb-1">
              {model.published ? '✅ Imóvel Publicado' : '📋 Imóvel em Rascunho'}
            </span>
            <span className="text-sm text-slate-600 block">
              {model.published 
                ? 'Este imóvel está visível para todos os usuários na plataforma' 
                : 'Marque para tornar o imóvel visível para os usuários'}
            </span>
            {!model.published && (
              <span className="text-xs text-amber-600 block mt-2 flex items-center gap-1">
                <Info size={14} />
                Rascunhos não aparecem nas buscas
              </span>
            )}
          </div>
        </label>
      </div>

      {/* Info Card */}
      <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
        <HelpCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-blue-900 mb-1">
            Campos obrigatórios antes de publicar
          </p>
          <p className="text-xs text-blue-700">
            Certifique-se de preencher: <strong>Título, Categoria, Tipo, Cidade, Estado, País, CEP, Preço</strong> e <strong>Área</strong> antes de marcar como publicado.
          </p>
        </div>
      </div>
    </div>
  );
}
