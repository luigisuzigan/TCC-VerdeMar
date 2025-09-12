import { Calendar, Clock, Users, MapPin } from 'lucide-react';

export default function SearchBar({ className = '' }) {
  return (
    <div className={`w-full bg-white/95 backdrop-blur border border-gray-200 rounded-2xl shadow-lg ${className}`}>
      <form className="grid grid-cols-1 sm:grid-cols-5 gap-3 p-4">
        <label className="flex items-center gap-3 rounded-xl px-3 py-2 bg-white sm:col-span-2 border border-gray-200">
          <MapPin className="size-5 text-emerald-700" aria-hidden="true" />
          <input
            type="text"
            placeholder="Type Destination"
            className="w-full outline-none placeholder:text-gray-500"
            aria-label="Destino"
          />
        </label>
        <label className="flex items-center gap-3 rounded-xl px-3 py-2 bg-white border border-gray-200">
          <Calendar className="size-5 text-emerald-700" aria-hidden="true" />
          <input type="date" className="w-full outline-none" aria-label="Data de partida" />
        </label>
        <label className="flex items-center gap-3 rounded-xl px-3 py-2 bg-white border border-gray-200">
          <Clock className="size-5 text-emerald-700" aria-hidden="true" />
          <select className="w-full outline-none" aria-label="Duração">
            <option>3 dias</option>
            <option>7 dias</option>
            <option>15 dias</option>
          </select>
        </label>
        <label className="flex items-center gap-3 rounded-xl px-3 py-2 bg-white border border-gray-200">
          <Users className="size-5 text-emerald-700" aria-hidden="true" />
          <input type="number" min={1} defaultValue={2} className="w-full outline-none" aria-label="Hóspedes" />
        </label>
        <div className="sm:col-span-5 flex justify-end">
          <button type="submit" className="inline-flex items-center gap-2 px-6 py-2 rounded-xl bg-emerald-700 text-white font-medium shadow hover:bg-emerald-800">
            Explore Now
          </button>
        </div>
      </form>
    </div>
  );
}
