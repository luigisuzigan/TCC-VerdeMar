import { CheckSquare, Square } from 'lucide-react';

export default function AmenitiesSection({ 
  selectedAmenities, 
  toggleAmenity, 
  setSelectedAmenities,
  AMENITIES_LIST 
}) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <CheckSquare size={24} className="text-emerald-600" />
        7. Comodidades e Amenidades
      </h2>
      
      <div className="mb-4">
        <p className="text-sm text-slate-600 mb-3">
          Selecione as comodidades disponíveis no imóvel (piscina, churrasqueira, etc.)
        </p>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm font-medium text-slate-700">
            {selectedAmenities.length} {selectedAmenities.length === 1 ? 'selecionada' : 'selecionadas'}
          </span>
          {selectedAmenities.length > 0 && (
            <button
              type="button"
              onClick={() => setSelectedAmenities([])}
              className="text-xs text-red-600 hover:text-red-700 font-medium"
            >
              Limpar todas
            </button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-96 overflow-y-auto p-2">
        {AMENITIES_LIST.map(amenity => (
          <button
            key={amenity}
            type="button"
            onClick={() => toggleAmenity(amenity)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all text-left ${
              selectedAmenities.includes(amenity)
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            {selectedAmenities.includes(amenity) ? (
              <CheckSquare size={16} className="text-emerald-600 flex-shrink-0" />
            ) : (
              <Square size={16} className="text-slate-400 flex-shrink-0" />
            )}
            <span className="text-xs font-medium line-clamp-2">{amenity}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
