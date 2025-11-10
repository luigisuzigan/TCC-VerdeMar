import { MapPin, Info } from 'lucide-react';

export default function LocationSection({ model, update }) {
  return (
    <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-6 border-2 border-emerald-200 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
        <MapPin size={28} className="text-emerald-600" />
        3. Localização
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Endereço - Full Width */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Endereço Completo
          </label>
          <input
            type="text"
            value={model.address}
            onChange={(e) => update('address', e.target.value)}
            className="w-full px-4 py-3 bg-white border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Rua, Avenida, número, complemento"
          />
        </div>

        {/* Cidade */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Cidade
            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium ml-2">
              Obrigatório
            </span>
          </label>
          <input
            type="text"
            value={model.city}
            onChange={(e) => update('city', e.target.value)}
            className="w-full px-4 py-3 bg-white border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Ex: Balneário Camboriú"
            required
          />
        </div>

        {/* Bairro */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Bairro
          </label>
          <input
            type="text"
            value={model.neighborhood}
            onChange={(e) => update('neighborhood', e.target.value)}
            className="w-full px-4 py-3 bg-white border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Ex: Centro"
          />
        </div>

        {/* Estado */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Estado (UF)
            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium ml-2">
              Obrigatório
            </span>
          </label>
          <input
            type="text"
            value={model.state}
            onChange={(e) => update('state', e.target.value.toUpperCase())}
            className="w-full px-4 py-3 bg-white border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 uppercase"
            placeholder="SC"
            maxLength={2}
            required
          />
        </div>

        {/* País */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            País
            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium ml-2">
              Obrigatório
            </span>
          </label>
          <input
            type="text"
            value={model.country}
            onChange={(e) => update('country', e.target.value)}
            className="w-full px-4 py-3 bg-white border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Brasil"
            required
          />
        </div>

        {/* CEP */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            CEP
            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium ml-2">
              Obrigatório
            </span>
          </label>
          <input
            type="text"
            value={model.zipCode}
            onChange={(e) => update('zipCode', e.target.value)}
            className="w-full px-4 py-3 bg-white border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="88330-000"
            required
          />
        </div>

        {/* Latitude */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1">
            Latitude
            <Info size={14} className="text-slate-400 cursor-help" title="Coordenada geográfica para o mapa" />
          </label>
          <input
            type="number"
            step="any"
            value={model.latitude}
            onChange={(e) => update('latitude', e.target.value)}
            className="w-full px-4 py-3 bg-white border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="-26.9906"
          />
        </div>

        {/* Longitude */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1">
            Longitude
            <Info size={14} className="text-slate-400 cursor-help" title="Coordenada geográfica para o mapa" />
          </label>
          <input
            type="number"
            step="any"
            value={model.longitude}
            onChange={(e) => update('longitude', e.target.value)}
            className="w-full px-4 py-3 bg-white border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="-48.6480"
          />
        </div>
      </div>
    </div>
  );
}
