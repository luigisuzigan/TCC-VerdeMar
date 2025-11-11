import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function Description({ description }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!description) {
    return (
      <div className="border-t border-slate-200 pt-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Sobre este imóvel</h2>
        <p className="text-slate-500 italic">Sem descrição disponível.</p>
      </div>
    );
  }

  const shouldShowToggle = description.length > 500;
  const displayText = (shouldShowToggle && !isExpanded) 
    ? description.substring(0, 500) + '...' 
    : description;

  return (
    <div className="border-t border-slate-200 pt-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">Sobre este imóvel</h2>
      <p className="text-slate-700 leading-relaxed whitespace-pre-line break-words">
        {displayText}
      </p>
      
      {shouldShowToggle && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
        >
          {isExpanded ? (
            <>
              <span>Ver menos</span>
              <ChevronUp size={20} />
            </>
          ) : (
            <>
              <span>Ver mais</span>
              <ChevronDown size={20} />
            </>
          )}
        </button>
      )}
    </div>
  );
}
