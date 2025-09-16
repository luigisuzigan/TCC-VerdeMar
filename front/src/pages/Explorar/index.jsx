import { Search as SearchIcon } from "lucide-react";

// MOCK DATA
const categories = [
  "Apartments", "Condos", "Family House", "Town House"
];
const cities = ["Chicago", "Los Angeles", "Miami", "New York"];
const featured = {
  img: "https://images.unsplash.com/photo-1505691723518-36a5ac3b2b8f?q=80&w=1200&auto=format&fit=crop",
  title: "New Apartment Nice View",
  price: "R$ 7.600,00"
};
const properties = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  img: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1200&auto=format&fit=crop",
  title: `Property ${i + 1}`,
  address: "255 Blvd St, Florida City, FL",
  price: "R$ 3.200,00/mo",
  beds: 3,
  baths: 2,
  area: "1000 sqft",
  status: i % 3 === 0 ? "For Sale" : "For Rent",
}));

export default function Explorar() {
  return (
    <div className="bg-white min-h-screen">
      {/* MAPA TOPO */}
      <section className="relative w-full h-[280px] bg-slate-200 overflow-hidden">
        {/* Imagem do mapa (substitua por um componente de mapa real se quiser) */}
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop"
          alt="Mapa"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Barra de busca sobreposta */}
        <div className="absolute left-1/2 bottom-4 w-full max-w-3xl -translate-x-1/2">
          <form className="flex items-center gap-2 bg-white/95 shadow-lg ring-1 ring-slate-200 rounded-full px-4 py-2">
            <input
              type="text"
              placeholder="Enter an address, neighborhood, city, or ZIP code"
              className="flex-1 bg-transparent px-3 py-2 outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-5 py-2 text-white font-semibold shadow transition hover:bg-sky-700"
            >
              <SearchIcon size={16} />
              Search
            </button>
          </form>
        </div>
      </section>

      <main className="mx-auto w-[min(98vw,1400px)] flex gap-8 pt-12 pb-20">
        {/* FILTROS LATERAIS */}
        <aside className="hidden lg:block w-[240px] shrink-0">
          {/* Categorias */}
          <div className="mb-8">
            <h3 className="font-semibold text-slate-800 mb-2">Categories Property</h3>
            <ul className="space-y-2">
              {categories.map(cat => (
                <li key={cat}>
                  <button className="text-slate-600 hover:text-sky-700 px-2 py-1 rounded transition">{cat}</button>
                </li>
              ))}
            </ul>
          </div>
          {/* Cidades */}
          <div className="mb-8">
            <h3 className="font-semibold text-slate-800 mb-2">Cities</h3>
            <ul className="space-y-2">
              {cities.map(city => (
                <li key={city}>
                  <button className="text-slate-600 hover:text-sky-700 px-2 py-1 rounded transition">{city}</button>
                </li>
              ))}
            </ul>
          </div>
          {/* Destaque */}
          <div className="mb-8">
            <h3 className="font-semibold text-slate-800 mb-2">Featured Properties</h3>
            <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
              <img src={featured.img} alt="" className="w-full h-28 object-cover" />
              <div className="p-3">
                <div className="font-medium text-slate-700">{featured.title}</div>
                <div className="text-sky-700 font-semibold">{featured.price}</div>
              </div>
            </div>
          </div>
        </aside>

        {/* GRID DE PROPRIEDADES */}
        <section className="flex-1">
          {/* Header da grid */}
          <div className="mb-6 flex items-center justify-between">
            <span className="text-slate-500 text-sm">12,478 results</span>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-400">Sort by: <b className="text-slate-700">Newest</b></span>
              {/* Ícones de grid/lista */}
              <button className="inline-flex items-center justify-center size-8 rounded bg-slate-100 text-slate-600 mr-1">
                <svg width="18" height="18" fill="none"><rect x="2" y="2" width="6" height="6" rx="2" fill="currentColor"/><rect x="10" y="2" width="6" height="6" rx="2" fill="currentColor"/><rect x="2" y="10" width="6" height="6" rx="2" fill="currentColor"/><rect x="10" y="10" width="6" height="6" rx="2" fill="currentColor"/></svg>
              </button>
              <button className="inline-flex items-center justify-center size-8 rounded bg-slate-100 text-slate-400">
                <svg width="18" height="18" fill="none"><rect x="3" y="2.5" width="12" height="3" rx="1.5" fill="currentColor"/><rect x="3" y="7.5" width="12" height="3" rx="1.5" fill="currentColor"/><rect x="3" y="12.5" width="12" height="3" rx="1.5" fill="currentColor"/></svg>
              </button>
            </div>
          </div>
          {/* Grid 4 colunas */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {properties.map((p) => (
              <PropertyCard key={p.id} {...p} />
            ))}
          </div>
          {/* Paginação */}
          <div className="mt-10 flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((pg) => (
              <button key={pg} className={`px-3 py-1 rounded ${pg === 1 ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700'}`}>{pg}</button>
            ))}
            <span className="px-2 py-1 text-slate-400">...</span>
            <button className="px-3 py-1 rounded bg-slate-100 text-slate-700">25</button>
          </div>
        </section>
      </main>

      {/* FOOTER estilo Houzing */}
      <footer className="bg-slate-900 text-white pt-12 pb-6 mt-10">
        <div className="mx-auto w-[min(98vw,1400px)] grid grid-cols-2 md:grid-cols-4 gap-8 pb-8">
          <div>
            <h4 className="font-bold mb-2">Contact Us</h4>
            <p className="text-sm">329 Queenberry Street, North Melbourne VIC 3051, Australia</p>
            <p className="text-sm mt-1">support@houzing.com</p>
            <p className="text-sm mt-1">+1 562 867 5309</p>
          </div>
          <div>
            <h4 className="font-bold mb-2">Discover</h4>
            <ul className="space-y-1 text-sm">
              {cities.map(city => <li key={city}>{city}</li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">Lists by Category</h4>
            <ul className="space-y-1 text-sm">
              {categories.map(cat => <li key={cat}>{cat}</li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">Quick Links</h4>
            <ul className="space-y-1 text-sm">
              <li>About Us</li>
              <li>Terms & Conditions</li>
              <li>Support Center</li>
              <li>Contact Us</li>
            </ul>
            <div className="mt-4">
              <form className="flex">
                <input type="email" placeholder="Enter your email" className="flex-1 px-3 py-2 rounded-l bg-white text-slate-900" />
                <button className="bg-sky-600 px-4 py-2 rounded-r text-white font-semibold">Send</button>
              </form>
            </div>
          </div>
        </div>
        <div className="text-center text-xs text-slate-400 mt-4">
          &copy; 2025 VerdeMar. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

// Card de propriedade
function PropertyCard({ img, title, address, price, beds, baths, area, status }) {
  return (
    <article className="group rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-lg transition overflow-hidden">
      <div className="relative aspect-[4/3] bg-slate-100">
        <img src={img} alt={title} className="h-full w-full object-cover" />
        <span className={`absolute left-3 top-3 rounded px-2 py-1 text-xs font-semibold ${status === 'For Sale' ? 'bg-blue-600 text-white' : 'bg-emerald-500 text-white'}`}>{status}</span>
      </div>
      <div className="p-4">
        <div className="font-semibold text-slate-800">{title}</div>
        <div className="text-xs text-slate-500 mb-1">{address}</div>
        <div className="flex items-center gap-3 text-xs text-slate-600 mb-2">
          <span>{beds} Beds</span>
          <span>{baths} Baths</span>
          <span>{area}</span>
        </div>
        <div className="font-bold text-sky-700">{price}</div>
      </div>
    </article>
  );
}