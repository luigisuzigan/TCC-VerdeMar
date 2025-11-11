import { CheckCircle, Eye, EyeOff, Sparkles, Info } from 'lucide-react';

export default function PublicationSection({ model, update }) {
  return (
    <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-6 text-center">
        <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-3">
          <CheckCircle size={28} />
          9. Status de Publicação
        </h2>
        <p className="text-emerald-50 text-sm mt-2">
          Controle a visibilidade do imóvel na plataforma
        </p>
      </div>

      {/* Conteúdo */}
      <div className="p-8 space-y-4">
        {/* Toggle de Publicação */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input 
            id="pub" 
            type="checkbox" 
            className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
            checked={!!model.published} 
            onChange={(e) => update('published', e.target.checked)} 
          />
          <span className="text-lg font-semibold text-slate-900">
            {model.published ? 'Imóvel Publicado (visível)' : 'Imóvel em Rascunho (oculto)'}
          </span>
        </label>

        <p className="text-sm text-slate-600">
          {model.published 
            ? 'Este imóvel está visível para todos os usuários na plataforma' 
            : 'Marque a opção acima para tornar o imóvel visível'}
        </p>

        {/* Info Card */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
          <p className="text-sm font-semibold text-blue-900 mb-1">
            Campos obrigatórios antes de publicar
          </p>
          <p className="text-xs text-blue-700">
            Certifique-se de preencher: Título, Categoria, Tipo, Cidade, Estado, CEP, Preço e Área.
          </p>
        </div>
      </div>
    </div>
  );
}
