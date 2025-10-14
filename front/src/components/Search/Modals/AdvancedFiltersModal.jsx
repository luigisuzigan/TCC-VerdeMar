import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';

const AMENITIES = [
  { id: 'sacada', label: 'Sacada/Varanda' },
  { id: 'churrasqueira', label: 'Churrasqueira' },
  { id: 'area_servico', label: 'Área de serviço' },
  { id: 'despensa', label: 'Despensa' },
  { id: 'closet', label: 'Closet' },
  { id: 'escritorio', label: 'Escritório/Home office' },
  { id: 'vista_mar', label: 'Vista para o mar' },
  { id: 'mobiliado', label: 'Mobiliado' },
  { id: 'semi_mobiliado', label: 'Semi-mobiliado' },
  { id: 'ar_condicionado', label: 'Ar condicionado' },
];

const CONDO_AMENITIES = [
  { id: 'piscina', label: 'Piscina' },
  { id: 'academia', label: 'Academia' },
  { id: 'salao_festas', label: 'Salão de festas' },
  { id: 'quadra', label: 'Quadra esportiva' },
  { id: 'playground', label: 'Playground' },
  { id: 'elevador', label: 'Elevador' },
  { id: 'portaria', label: 'Portaria 24h' },
  { id: 'seguranca', label: 'Segurança/Câmeras' },
  { id: 'area_verde', label: 'Área verde/Jardim' },
  { id: 'salao_jogos', label: 'Salão de jogos' },
  { id: 'aceita_pets', label: 'Aceita pets' },
];

const PROPERTY_CONDITIONS = [
  { id: 'novo', label: 'Novo/Na planta' },
  { id: 'seminovo', label: 'Seminovo' },
  { id: 'usado', label: 'Usado (bom estado)' },
  { id: 'reformar', label: 'A reformar' },
];

export default function AdvancedFiltersModal({ isOpen, onClose, filters, onApply }) {
  const [localFilters, setLocalFilters] = useState({
    bedrooms: filters.bedrooms || null,
    bathrooms: filters.bathrooms || null,
    parkingSpaces: filters.parkingSpaces || null,
    suites: filters.suites || null,
    amenities: filters.amenities || [],
    condoAmenities: filters.condoAmenities || [],
    propertyCondition: filters.propertyCondition || '',
  });

  const handleNumberSelect = (field, value) => {
    setLocalFilters({
      ...localFilters,
      [field]: localFilters[field] === value ? null : value,
    });
  };

  const toggleAmenity = (field, amenityId) => {
    const current = localFilters[field];
    if (current.includes(amenityId)) {
      setLocalFilters({
        ...localFilters,
        [field]: current.filter((id) => id !== amenityId),
      });
    } else {
      setLocalFilters({
        ...localFilters,
        [field]: [...current, amenityId],
      });
    }
  };

  const handleApply = () => {
    onApply(localFilters);
  };

  const handleClearAll = () => {
    setLocalFilters({
      bedrooms: null,
      bathrooms: null,
      parkingSpaces: null,
      suites: null,
      amenities: [],
      condoAmenities: [],
      propertyCondition: '',
    });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      {/* Container centralizado */}
      <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
        <Dialog.Panel className="mx-auto max-w-3xl w-full bg-white rounded-2xl shadow-2xl my-8">
          {/* Header */}
          <div className="sticky top-0 bg-white flex items-center justify-between p-6 border-b border-slate-200 rounded-t-2xl z-10">
            <Dialog.Title className="text-xl font-bold text-slate-900">
              Filtros Avançados
            </Dialog.Title>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content - Scrollable */}
          <div className="p-6 max-h-[calc(100vh-250px)] overflow-y-auto">
            {/* Quartos */}
            <FilterSection title="Quartos" icon="🛏️">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <NumberButton
                    key={num}
                    number={num}
                    selected={localFilters.bedrooms === num}
                    onClick={() => handleNumberSelect('bedrooms', num)}
                    suffix="+"
                  />
                ))}
              </div>
            </FilterSection>

            {/* Banheiros */}
            <FilterSection title="Banheiros" icon="🚿">
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((num) => (
                  <NumberButton
                    key={num}
                    number={num}
                    selected={localFilters.bathrooms === num}
                    onClick={() => handleNumberSelect('bathrooms', num)}
                    suffix="+"
                  />
                ))}
              </div>
            </FilterSection>

            {/* Vagas de Garagem */}
            <FilterSection title="Vagas de Garagem" icon="🚗">
              <div className="flex gap-2">
                {[0, 1, 2, 3, 4].map((num) => (
                  <NumberButton
                    key={num}
                    number={num}
                    selected={localFilters.parkingSpaces === num}
                    onClick={() => handleNumberSelect('parkingSpaces', num)}
                    suffix={num === 0 ? '' : '+'}
                  />
                ))}
              </div>
            </FilterSection>

            {/* Suítes */}
            <FilterSection title="Suítes" icon="🛁">
              <div className="flex gap-2">
                {[0, 1, 2, 3].map((num) => (
                  <NumberButton
                    key={num}
                    number={num}
                    selected={localFilters.suites === num}
                    onClick={() => handleNumberSelect('suites', num)}
                    suffix={num === 0 ? '' : '+'}
                  />
                ))}
              </div>
            </FilterSection>

            {/* Comodidades do Imóvel */}
            <FilterSection title="Comodidades do Imóvel" icon="✨">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {AMENITIES.map((amenity) => (
                  <CheckboxButton
                    key={amenity.id}
                    label={amenity.label}
                    checked={localFilters.amenities.includes(amenity.id)}
                    onChange={() => toggleAmenity('amenities', amenity.id)}
                  />
                ))}
              </div>
            </FilterSection>

            {/* Comodidades do Condomínio */}
            <FilterSection title="Comodidades do Condomínio" icon="🏢">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {CONDO_AMENITIES.map((amenity) => (
                  <CheckboxButton
                    key={amenity.id}
                    label={amenity.label}
                    checked={localFilters.condoAmenities.includes(amenity.id)}
                    onChange={() => toggleAmenity('condoAmenities', amenity.id)}
                  />
                ))}
              </div>
            </FilterSection>

            {/* Estado do Imóvel */}
            <FilterSection title="Estado do Imóvel" icon="🏗️">
              <div className="grid grid-cols-2 gap-2">
                {PROPERTY_CONDITIONS.map((condition) => (
                  <button
                    key={condition.id}
                    onClick={() =>
                      setLocalFilters({
                        ...localFilters,
                        propertyCondition:
                          localFilters.propertyCondition === condition.id
                            ? ''
                            : condition.id,
                      })
                    }
                    className={[
                      'px-4 py-2.5 text-sm font-medium rounded-lg border-2 transition-all',
                      localFilters.propertyCondition === condition.id
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50',
                    ].join(' ')}
                  >
                    {condition.label}
                  </button>
                ))}
              </div>
            </FilterSection>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white flex items-center gap-3 p-6 border-t border-slate-200 rounded-b-2xl">
            <button
              onClick={handleClearAll}
              className="px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Limpar Tudo
            </button>
            <button
              onClick={handleApply}
              className="flex-1 px-6 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
            >
              Aplicar Filtros
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

function FilterSection({ title, icon, children }) {
  return (
    <div className="mb-6 last:mb-0">
      <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
        <span>{icon}</span>
        {title}
      </h3>
      {children}
    </div>
  );
}

function NumberButton({ number, selected, onClick, suffix = '' }) {
  return (
    <button
      onClick={onClick}
      className={[
        'px-5 py-2.5 text-sm font-semibold rounded-lg border-2 transition-all min-w-[60px]',
        selected
          ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
          : 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50',
      ].join(' ')}
    >
      {number}{suffix}
    </button>
  );
}

function CheckboxButton({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500 cursor-pointer"
      />
      <span className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors">
        {label}
      </span>
    </label>
  );
}
