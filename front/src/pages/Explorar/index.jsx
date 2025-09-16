import TopFilters from '../../components/Explorar/TopFilters';

// Você pode reutilizar seu array PROPERTIES anterior:
const PROPERTIES = [
  // ... seus itens (id, img, title, etc)
];

export default function Explorar() {
  function handleSearch(filters) {
    // Aqui você conecta com sua API futuramente.
    // Ex: montar query string e fazer fetch.
    console.log('Executar busca com ->', filters);
  }

  return (
    <main className="pb-24">
      <TopFilters onSearch={handleSearch} />

      {/* Conteúdo / grid depois do topo */}
      <div className="mx-auto mt-10 w-[min(98vw,1400px)]">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {PROPERTIES.map(p => (
            <div
              key={p.id}
              className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="relative aspect-[4/3]">
                <img
                  src={p.img}
                  alt={p.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-slate-800 text-sm">{p.title}</h3>
                {p.address && (
                  <p className="mt-1 text-[11px] text-slate-500">{p.address}</p>
                )}
                <div className="mt-2 text-sm font-bold text-emerald-600">
                  {p.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}