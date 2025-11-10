import { BadgeDollarSign } from 'lucide-react';

export default function PriceSection({ model, update, area, price }) {
  return (
    <div className="bg-white rounded-xl p-6 border-l-4 border-l-green-500 border border-slate-200 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
        <BadgeDollarSign size={28} className="text-green-600" />
        4. Preço e Área
        <span className="ml-auto text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
          Obrigatório
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Preço (R$)
          </label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => update('price', e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-xl font-semibold"
            min={0}
            placeholder="450000"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Moeda
          </label>
          <select
            value={model.currency}
            onChange={(e) => update('currency', e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="BRL">BRL - Real</option>
            <option value="USD">USD - Dólar</option>
            <option value="EUR">EUR - Euro</option>
          </select>
        </div>
      </div>

      {/* Display formatado do preço */}
      {price > 0 && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6 border border-green-200">
          <p className="text-sm text-green-700 mb-2 font-medium">Preço de Venda:</p>
          <p className="text-4xl font-extrabold text-green-700">
            R$ {parseFloat(price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          {area > 0 && (
            <p className="text-sm text-green-600 mt-2">
              Preço por m²: R$ {(parseFloat(price) / parseFloat(area)).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          )}
        </div>
      )}

      {/* Área */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Área Total (m²)
        </label>
        <input
          type="number"
          step="0.01"
          value={area}
          onChange={(e) => update('area', e.target.value)}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
          min={0}
          placeholder="85.50"
          required
        />
      </div>
    </div>
  );
}
