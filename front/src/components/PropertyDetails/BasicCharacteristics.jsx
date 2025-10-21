import { BedDouble, Bath, Maximize2 } from 'lucide-react';

/**
 * Componente que exibe as características básicas do imóvel (área, quartos, banheiros)
 * Posicionado logo após a categoria
 */
export default function BasicCharacteristics({ property }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
      <h3 className="text-lg font-bold text-slate-900 mb-4">Características Básicas</h3>
      
      {/* Stats Inline (bd | ba | sqft) */}
      <div className="flex items-center gap-4 text-lg flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <BedDouble size={20} className="text-blue-600" />
          </div>
          <div>
            <span className="font-semibold text-slate-900 block">{property.beds || 0}</span>
            <span className="text-sm text-slate-600">quartos</span>
          </div>
        </div>
        
        <span className="text-slate-300 hidden sm:block">|</span>
        
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
            <Bath size={20} className="text-emerald-600" />
          </div>
          <div>
            <span className="font-semibold text-slate-900 block">{property.baths || 0}</span>
            <span className="text-sm text-slate-600">banheiros</span>
          </div>
        </div>
        
        <span className="text-slate-300 hidden sm:block">|</span>
        
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Maximize2 size={20} className="text-purple-600" />
          </div>
          <div>
            <span className="font-semibold text-slate-900 block">{property.area || 0}</span>
            <span className="text-sm text-slate-600">m²</span>
          </div>
        </div>
      </div>
    </div>
  );
}
