import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X, SlidersHorizontal } from 'lucide-react';

export default function MobileFilters({ filters, updateFilter, clearFilter, clearAllFilters, activeFiltersCount }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botão Mobile */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 transition-colors"
      >
        <SlidersHorizontal className="w-5 h-5" />
        <span className="font-medium">Filtros</span>
        {activeFiltersCount > 0 && (
          <span className="flex items-center justify-center w-6 h-6 bg-white text-emerald-600 rounded-full text-xs font-bold">
            {activeFiltersCount}
          </span>
        )}
      </button>

      {/* Modal */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 lg:hidden">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-end">
          <Dialog.Panel className="w-full bg-white rounded-t-3xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Dialog.Title className="text-xl font-bold text-slate-900">
                  Filtros
                </Dialog.Title>
                {activeFiltersCount > 0 && (
                  <span className="flex items-center justify-center w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full text-xs font-bold">
                    {activeFiltersCount}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content - mesmos filtros da sidebar */}
            <div className="p-6 space-y-6">
              {/* Location */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Localização</h3>
                <input
                  type="text"
                  placeholder="Buscar localização..."
                  value={filters.location || ''}
                  onChange={(e) => updateFilter('location', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Faixa de Preço</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 text-sm cursor-pointer hover:bg-slate-50 p-3 rounded-lg">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={!filters.priceMin && filters.priceMax === 1000}
                      onChange={() => {
                        updateFilter('priceMin', '');
                        updateFilter('priceMax', 1000);
                      }}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    Até R$ 1.000
                  </label>
                  <label className="flex items-center gap-3 text-sm cursor-pointer hover:bg-slate-50 p-3 rounded-lg">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={filters.priceMin === 1000 && filters.priceMax === 15000}
                      onChange={() => {
                        updateFilter('priceMin', 1000);
                        updateFilter('priceMax', 15000);
                      }}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    R$ 1.000 - R$ 15.000
                  </label>
                  <label className="flex items-center gap-3 text-sm cursor-pointer hover:bg-slate-50 p-3 rounded-lg">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={filters.priceMin === 15000 && !filters.priceMax}
                      onChange={() => {
                        updateFilter('priceMin', 15000);
                        updateFilter('priceMax', '');
                      }}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    Acima de R$ 15.000
                  </label>
                </div>
              </div>

              {/* Property Types */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Tipo de Imóvel</h3>
                <div className="space-y-2">
                  {[
                    { id: 'casa', label: 'Casa' },
                    { id: 'apartamento', label: 'Apartamento' },
                    { id: 'comercial', label: 'Comercial' },
                    { id: 'terreno', label: 'Terreno' },
                  ].map((type) => (
                    <label key={type.id} className="flex items-center gap-3 text-sm cursor-pointer hover:bg-slate-50 p-3 rounded-lg">
                      <input
                        type="checkbox"
                        checked={filters.propertyTypes?.includes(type.id) || false}
                        onChange={(e) => {
                          const current = filters.propertyTypes || [];
                          const updated = e.target.checked
                            ? [...current, type.id]
                            : current.filter(t => t !== type.id);
                          updateFilter('propertyTypes', updated);
                        }}
                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      {type.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Comodidades</h3>
                <div className="space-y-2">
                  {[
                    'Estacionamento',
                    'Pet Allowed',
                    'Jardim',
                    'Academia',
                    'Piscina',
                    'Home Theater',
                  ].map((amenity) => (
                    <label key={amenity} className="flex items-center gap-3 text-sm cursor-pointer hover:bg-slate-50 p-3 rounded-lg">
                      <input
                        type="checkbox"
                        checked={filters.amenities?.includes(amenity) || false}
                        onChange={(e) => {
                          const current = filters.amenities || [];
                          const updated = e.target.checked
                            ? [...current, amenity]
                            : current.filter(a => a !== amenity);
                          updateFilter('amenities', updated);
                        }}
                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      {amenity}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 flex gap-3">
              <button
                onClick={clearAllFilters}
                className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
              >
                Limpar Tudo
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Aplicar Filtros
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
