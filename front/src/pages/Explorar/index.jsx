import { useState } from 'react';
import ExploreFiltersBar from '../../components/Explorar/TopFilters';
import PropertyCard from '../../components/Explorar/Section1';

// MOCK de propriedades – substitua pelo seu fetch depois
const PROPERTIES = [
  {
    id: '1',
    city: 'Ilha Comprida',
    country: 'Brasil',
    title: 'Lakeside Motel Waterfront',
    description: 'Vista panorâmica, deck privativo e interior minimalista.',
    price: 1200,
    rating: 4.56,
    reviews: 1533,
    area: 180,
    beds: 3,
    baths: 2,
    guests: 6,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600047509807-ba8f99b0beb8?q=80&w=1200&auto=format&fit=crop',
    ]
  },
  {
    id: '2',
    city: 'Atibaia',
    country: 'Brasil',
    title: 'Cabana Miralle I',
    description: 'Cabana rústica com fachada de vidro e pôr do sol incrível.',
    price: 7290,
    rating: 4.91,
    reviews: 126,
    area: 95,
    beds: 2,
    baths: 2,
    guests: 4,
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop',
    ]
  },
  {
    id: '3',
    city: 'Angra dos Reis',
    country: 'Brasil',
    title: 'Ilha Privada',
    description: 'Experiência exclusiva em ilha particular paradisíaca.',
    price: 30000,
    rating: 4.83,
    reviews: 89,
    area: 650,
    beds: 8,
    baths: 7,
    guests: 16,
    images: [
      'https://images.unsplash.com/photo-1505691723518-36a5ac3b2d8d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1200&auto=format&fit=crop',
    ]
  },
  {
    id: '4',
    city: 'Santa Teresa',
    country: 'Brasil',
    title: 'Mansão histórica com piscina',
    description: 'Arquitetura clássica restaurada + jardins tropicais.',
    price: 30000,
    rating: 4.50,
    reviews: 67,
    area: 520,
    beds: 6,
    baths: 5,
    guests: 12,
    images: [
      'https://images.unsplash.com/photo-1502003148287-a82ef80a6abc?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599423300746-b62533397364?q=80&w=1200&auto=format&fit=crop',
    ]
  },
  {
    id: '5',
    city: 'Paraty',
    country: 'Brasil',
    title: 'Villa Colonial',
    description: 'Charme histórico e design contemporâneo integrado.',
    price: 9800,
    rating: 4.72,
    reviews: 145,
    area: 240,
    beds: 4,
    baths: 3,
    guests: 8,
    images: [
      'https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154206-2b0c82d10613?q=80&w=1200&auto=format&fit=crop',
    ]
  },
  {
    id: '6',
    city: 'Florianópolis',
    country: 'Brasil',
    title: 'Beach House Pé na Areia',
    description: 'Saída direto para a praia e varanda panorâmica.',
    price: 6400,
    rating: 4.88,
    reviews: 211,
    area: 210,
    beds: 4,
    baths: 4,
    guests: 10,
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200&auto=format&fit=crop',
    ]
  },
  {
    id: '7',
    city: 'Ilhabela',
    country: 'Brasil',
    title: 'Chalé Aconchegante',
    description: 'Vista para a mata atlântica e deck suspenso.',
    price: 2100,
    rating: 4.93,
    reviews: 98,
    area: 110,
    beds: 3,
    baths: 2,
    guests: 6,
    images: [
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1200&auto=format&fit=crop',
    ]
  },
  {
    id: '8',
    city: 'Búzios',
    country: 'Brasil',
    title: 'Casa Azul Marítima',
    description: 'Piscina de borda infinita e pôr-do-sol cinematográfico.',
    price: 11200,
    rating: 4.81,
    reviews: 54,
    area: 300,
    beds: 5,
    baths: 5,
    guests: 12,
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502003148287-a82ef80a6abc?q=80&w=1200&auto=format&fit=crop',
    ]
  }
];

export default function Explorar() {
  const [items, setItems] = useState(PROPERTIES);

  function handleSearch(filters) {
    // Filtro muito simples (mock). Depois substitui por chamada ao back.
    setItems(
      PROPERTIES.filter(p =>
        filters.location
          ? (p.city + p.country).toLowerCase().includes(filters.location.toLowerCase())
          : true
      )
    );
  }

  return (
    <main className="pb-20">
      {/* HERO */}
      <section className="relative h-[300px] w-full overflow-hidden bg-slate-900 md:h-[340px]">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop"
          className="absolute inset-0 h-full w-full object-cover"
          alt="Explore hero"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/60" />
        <div className="relative mx-auto flex h-full w-[min(96vw,1400px)] flex-col justify-end pb-6 md:pb-10">
          <h1 className="mb-4 text-left text-3xl font-extrabold tracking-tight text-white drop-shadow md:text-4xl">
            Explore destinos incríveis
          </h1>
          <ExploreFiltersBar onSearch={handleSearch} />
        </div>
      </section>

      {/* GRID */}
      <section className="mx-auto mt-10 w-[min(96vw,1400px)]">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-medium text-slate-600">
            {items.length} resultados
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map(item => (
            <PropertyCard key={item.id} data={item} />
          ))}
        </div>

        {items.length === 0 && (
          <div className="mt-14 text-center text-sm text-slate-500">
            Nenhum imóvel encontrado com esse filtro.
          </div>
        )}
      </section>
    </main>
  );
}