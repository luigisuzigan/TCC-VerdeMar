export default function Description({ description }) {
  return (
    <div className="border-t border-slate-200 pt-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">Sobre este imóvel</h2>
      <p className="text-slate-700 leading-relaxed whitespace-pre-line">
        {description || 'Sem descrição disponível.'}
      </p>
    </div>
  );
}
