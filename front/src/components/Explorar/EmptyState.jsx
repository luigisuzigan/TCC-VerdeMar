import { Home } from 'lucide-react';import { Home } from 'lucide-react';



export default function EmptyState({ onClearFilters }) {export default function EmptyState({ onClearFilters }) {

  return (  return (

    <div className="text-center py-12">    <div className="text-center py-16 px-4">

      <Home className="w-16 h-16 text-slate-300 mx-auto mb-4" />      <div className="max-w-md mx-auto">

      <h3 className="text-lg font-semibold text-slate-900 mb-2">        <div className="w-24 h-24 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">

        Nenhum imóvel encontrado          <Home className="w-12 h-12 text-cyan-600" />

      </h3>        </div>

      <p className="text-slate-600 mb-4">        

        Tente ajustar seus filtros para ver mais resultados        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-blue-700 mb-3">

      </p>          Nenhum imóvel encontrado

      <button        </h3>

        onClick={onClearFilters}        

        className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"        <p className="text-gray-600 mb-6 text-lg">

      >          Não encontramos imóveis que correspondam aos seus critérios de busca.

        Limpar filtros          Tente ajustar os filtros para ver mais resultados.

      </button>        </p>

    </div>        

  );        <button

}          onClick={onClearFilters}

          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          Limpar todos os filtros
        </button>
      </div>
    </div>
  );
}
