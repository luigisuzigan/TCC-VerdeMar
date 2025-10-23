import { Dialog } from '@headlessui/react';
import { X, BedDouble, Bath, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function RoomsModal({ isOpen, onClose, filters, onApply }) {
  // Estados para quartos
  const [bedroomsMode, setBedroomsMode] = useState('min'); // 'min', 'exact', 'range'
  const [bedroomsMin, setBedroomsMin] = useState(filters.bedrooms || '');
  const [bedroomsMax, setBedroomsMax] = useState('');
  const [bedroomsExact, setBedroomsExact] = useState('');

  // Estados para banheiros
  const [bathroomsMode, setBathroomsMode] = useState('min');
  const [bathroomsMin, setBathroomsMin] = useState(filters.bathrooms || '');
  const [bathroomsMax, setBathroomsMax] = useState('');
  const [bathroomsExact, setBathroomsExact] = useState('');

  // Estados para suítes
  const [suitesMode, setSuitesMode] = useState('min');
  const [suitesMin, setSuitesMin] = useState(filters.suites || '');
  const [suitesMax, setSuitesMax] = useState('');
  const [suitesExact, setSuitesExact] = useState('');

  const handleApply = () => {
    const result = {};
    
    // Quartos
    if (bedroomsMode === 'min' && bedroomsMin) {
      result.bedrooms = parseInt(bedroomsMin);
    } else if (bedroomsMode === 'exact' && bedroomsExact) {
      result.bedroomsExact = parseInt(bedroomsExact);
    } else if (bedroomsMode === 'range' && bedroomsMin && bedroomsMax) {
      result.bedroomsMin = parseInt(bedroomsMin);
      result.bedroomsMax = parseInt(bedroomsMax);
    }

    // Banheiros
    if (bathroomsMode === 'min' && bathroomsMin) {
      result.bathrooms = parseInt(bathroomsMin);
    } else if (bathroomsMode === 'exact' && bathroomsExact) {
      result.bathroomsExact = parseInt(bathroomsExact);
    } else if (bathroomsMode === 'range' && bathroomsMin && bathroomsMax) {
      result.bathroomsMin = parseInt(bathroomsMin);
      result.bathroomsMax = parseInt(bathroomsMax);
    }

    // Suítes
    if (suitesMode === 'min' && suitesMin) {
      result.suites = parseInt(suitesMin);
    } else if (suitesMode === 'exact' && suitesExact) {
      result.suitesExact = parseInt(suitesExact);
    } else if (suitesMode === 'range' && suitesMin && suitesMax) {
      result.suitesMin = parseInt(suitesMin);
      result.suitesMax = parseInt(suitesMax);
    }

    onApply(result);
  };

  const handleReset = () => {
    setBedroomsMode('min');
    setBedroomsMin('');
    setBedroomsMax('');
    setBedroomsExact('');
    setBathroomsMode('min');
    setBathroomsMin('');
    setBathroomsMax('');
    setBathroomsExact('');
    setSuitesMode('min');
    setSuitesMin('');
    setSuitesMax('');
    setSuitesExact('');
    onApply({});
  };

  const quickNumbers = [1, 2, 3, 4, 5];

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-xl bg-white rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
            <Dialog.Title className="text-xl font-bold text-slate-900">
              Quartos, Banheiros e Suítes
            </Dialog.Title>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            {/* ===== QUARTOS ===== */}
            <div className="pb-6 border-b border-slate-200">
              <label className="flex items-center gap-2 text-base font-bold text-slate-900 mb-4">
                <BedDouble size={22} className="text-blue-600" />
                Quartos
              </label>

              {/* Modo de filtro */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setBedroomsMode('min')}
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                    bedroomsMode === 'min'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Mínimo
                </button>
                <button
                  onClick={() => setBedroomsMode('exact')}
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                    bedroomsMode === 'exact'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Exato
                </button>
                <button
                  onClick={() => setBedroomsMode('range')}
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                    bedroomsMode === 'range'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Entre
                </button>
              </div>

              {/* Inputs baseados no modo */}
              {bedroomsMode === 'min' && (
                <div>
                  <div className="grid grid-cols-5 gap-2 mb-3">
                    {quickNumbers.map((num) => (
                      <button
                        key={num}
                        onClick={() => setBedroomsMin(num.toString())}
                        className={`px-3 py-2.5 border-2 rounded-lg font-bold text-sm transition-all ${
                          bedroomsMin === num.toString()
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                            : 'border-slate-200 hover:border-blue-300'
                        }`}
                      >
                        {num}+
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    placeholder="Ou digite..."
                    value={bedroomsMin}
                    onChange={(e) => setBedroomsMin(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              {bedroomsMode === 'exact' && (
                <div>
                  <div className="grid grid-cols-5 gap-2 mb-3">
                    {quickNumbers.map((num) => (
                      <button
                        key={num}
                        onClick={() => setBedroomsExact(num.toString())}
                        className={`px-3 py-2.5 border-2 rounded-lg font-bold text-sm transition-all ${
                          bedroomsExact === num.toString()
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                            : 'border-slate-200 hover:border-blue-300'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    placeholder="Exatamente..."
                    value={bedroomsExact}
                    onChange={(e) => setBedroomsExact(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              {bedroomsMode === 'range' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-600 mb-2">De</label>
                    <input
                      type="number"
                      placeholder="Min"
                      value={bedroomsMin}
                      onChange={(e) => setBedroomsMin(e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-600 mb-2">Até</label>
                    <input
                      type="number"
                      placeholder="Max"
                      value={bedroomsMax}
                      onChange={(e) => setBedroomsMax(e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* ===== BANHEIROS ===== */}
            <div className="pb-6 border-b border-slate-200">
              <label className="flex items-center gap-2 text-base font-bold text-slate-900 mb-4">
                <Bath size={22} className="text-blue-600" />
                Banheiros
              </label>

              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setBathroomsMode('min')}
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                    bathroomsMode === 'min'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Mínimo
                </button>
                <button
                  onClick={() => setBathroomsMode('exact')}
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                    bathroomsMode === 'exact'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Exato
                </button>
                <button
                  onClick={() => setBathroomsMode('range')}
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                    bathroomsMode === 'range'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Entre
                </button>
              </div>

              {bathroomsMode === 'min' && (
                <div>
                  <div className="grid grid-cols-5 gap-2 mb-3">
                    {quickNumbers.map((num) => (
                      <button
                        key={num}
                        onClick={() => setBathroomsMin(num.toString())}
                        className={`px-3 py-2.5 border-2 rounded-lg font-bold text-sm transition-all ${
                          bathroomsMin === num.toString()
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                            : 'border-slate-200 hover:border-blue-300'
                        }`}
                      >
                        {num}+
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    placeholder="Ou digite..."
                    value={bathroomsMin}
                    onChange={(e) => setBathroomsMin(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              {bathroomsMode === 'exact' && (
                <div>
                  <div className="grid grid-cols-5 gap-2 mb-3">
                    {quickNumbers.map((num) => (
                      <button
                        key={num}
                        onClick={() => setBathroomsExact(num.toString())}
                        className={`px-3 py-2.5 border-2 rounded-lg font-bold text-sm transition-all ${
                          bathroomsExact === num.toString()
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                            : 'border-slate-200 hover:border-blue-300'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    placeholder="Exatamente..."
                    value={bathroomsExact}
                    onChange={(e) => setBathroomsExact(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              {bathroomsMode === 'range' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-600 mb-2">De</label>
                    <input
                      type="number"
                      placeholder="Min"
                      value={bathroomsMin}
                      onChange={(e) => setBathroomsMin(e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-600 mb-2">Até</label>
                    <input
                      type="number"
                      placeholder="Max"
                      value={bathroomsMax}
                      onChange={(e) => setBathroomsMax(e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* ===== SUÍTES ===== */}
            <div>
              <label className="flex items-center gap-2 text-base font-bold text-slate-900 mb-4">
                <Sparkles size={22} className="text-blue-600" />
                Suítes
              </label>

              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setSuitesMode('min')}
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                    suitesMode === 'min'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Mínimo
                </button>
                <button
                  onClick={() => setSuitesMode('exact')}
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                    suitesMode === 'exact'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Exato
                </button>
                <button
                  onClick={() => setSuitesMode('range')}
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                    suitesMode === 'range'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Entre
                </button>
              </div>

              {suitesMode === 'min' && (
                <div>
                  <div className="grid grid-cols-5 gap-2 mb-3">
                    {quickNumbers.map((num) => (
                      <button
                        key={num}
                        onClick={() => setSuitesMin(num.toString())}
                        className={`px-3 py-2.5 border-2 rounded-lg font-bold text-sm transition-all ${
                          suitesMin === num.toString()
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                            : 'border-slate-200 hover:border-blue-300'
                        }`}
                      >
                        {num}+
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    placeholder="Ou digite..."
                    value={suitesMin}
                    onChange={(e) => setSuitesMin(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              {suitesMode === 'exact' && (
                <div>
                  <div className="grid grid-cols-5 gap-2 mb-3">
                    {quickNumbers.map((num) => (
                      <button
                        key={num}
                        onClick={() => setSuitesExact(num.toString())}
                        className={`px-3 py-2.5 border-2 rounded-lg font-bold text-sm transition-all ${
                          suitesExact === num.toString()
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                            : 'border-slate-200 hover:border-blue-300'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    placeholder="Exatamente..."
                    value={suitesExact}
                    onChange={(e) => setSuitesExact(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              {suitesMode === 'range' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-600 mb-2">De</label>
                    <input
                      type="number"
                      placeholder="Min"
                      value={suitesMin}
                      onChange={(e) => setSuitesMin(e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-600 mb-2">Até</label>
                    <input
                      type="number"
                      placeholder="Max"
                      value={suitesMax}
                      onChange={(e) => setSuitesMax(e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 px-6 py-4 flex items-center gap-3">
            <button
              onClick={handleReset}
              className="px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Limpar
            </button>
            <button
              onClick={handleApply}
              className="flex-1 px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Aplicar
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
