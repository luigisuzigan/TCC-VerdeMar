import { useMemo, useState } from 'react';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const TABS = [
  { key: 'condominios', label: 'Condomínios' },
  { key: 'casas', label: 'Casas de praia' },
  { key: 'apartamentos', label: 'Apartamentos' },
];

// MOCK – troque pelos dados da API quando tiver
const DATA = {
  condominios: [
    { id: 'c1', title: 'Ilha das Conchas', region: 'Guarujá, SP', price: 980, img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop' },
    { id: 'c2', title: 'Costa Azul', region: 'Florianópolis, SC', price: 1250, img: 'https://images.unsplash.com/photo-1600585154206-2b0c82d10613?q=80&w=1200&auto=format&fit=crop' },
    { id: 'c3', title: 'Vista Atlântica', region: 'Ilhabela, SP', price: 830, img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop' },
    { id: 'c4', title: 'Mar Aberto', region: 'Búzios, RJ', price: 1120, img: 'https://images.unsplash.com/photo-1502003148287-a82ef80a6abc?q=80&w=1200&auto=format&fit=crop' },
    { id: 'c5', title: 'Porto do Sol', region: 'Ubatuba, SP', price: 720, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop' },
    { id: 'c6', title: 'Praia Verde', region: 'Cabo Frio, RJ', price: 890, img: 'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop' },
    { id: 'c7', title: 'Brisa do Mar', region: 'Porto de Galinhas, PE', price: 980, img: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1200&auto=format&fit=crop' },
    { id: 'c8', title: 'Oceania Club', region: 'Natal, RN', price: 1050, img: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1200&auto=format&fit=crop' },
  ],
  casas: [
    { id: 'h1', title: 'Casa Pé na Areia', region: 'Barra da Lagoa, SC', price: 1400, img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200&auto=format&fit=crop' },
    { id: 'h2', title: 'Villa das Ondas', region: 'Itacaré, BA', price: 1750, img: 'https://images.unsplash.com/photo-1505691723518-36a5ac3b2d8d?q=80&w=1200&auto=format&fit=crop' },
    { id: 'h3', title: 'Refúgio Azul', region: 'Paraty, RJ', price: 1280, img: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=1200&auto=format&fit=crop' },
    { id: 'h4', title: 'Mirante do Mar', region: 'Trancoso, BA', price: 2200, img: 'https://images.unsplash.com/photo-1600047509807-ba8f99b0beb8?q=80&w=1200&auto=format&fit=crop' },
    { id: 'h5', title: 'Solar Atlântico', region: 'Arraial do Cabo, RJ', price: 950, img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop' },
    { id: 'h6', title: 'Jardim do Litoral', region: 'Ilha Comprida, SP', price: 890, img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1200&auto=format&fit=crop' },
    { id: 'h7', title: 'Canto da Areia', region: 'Bombinhas, SC', price: 1100, img: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1200&auto=format&fit=crop' },
    { id: 'h8', title: 'Fazenda do Mar', region: 'Barra Grande, PI', price: 1600, img: 'https://images.unsplash.com/photo-1502003148287-a82ef80a6abc?q=80&w=1200&auto=format&fit=crop' },
  ],
  apartamentos: [
    { id: 'a1', title: 'Studio Vista-Mar', region: 'Copacabana, RJ', price: 540, img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop' },
    { id: 'a2', title: 'Apê Beira-Mar', region: 'Santos, SP', price: 620, img: 'https://images.unsplash.com/photo-1597047084890-89b7f7b27c5d?q=80&w=1200&auto=format&fit=crop' },
    { id: 'a3', title: 'Loft na Orla', region: 'Maceió, AL', price: 480, img: 'https://images.unsplash.com/photo-1544989164-31dc3c645987?q=80&w=1200&auto=format&fit=crop' },
    { id: 'a4', title: 'Garden na Praia', region: 'João Pessoa, PB', price: 710, img: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop' },
    { id: 'a5', title: '2q Vista Livre', region: 'Vitória, ES', price: 560, img: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop' },
    { id: 'a6', title: 'Cobertura Atlântica', region: 'Balneário Camboriú, SC', price: 2200, img: 'https://images.unsplash.com/photo-1544989164-28187fa2156f?q=80&w=1200&auto=format&fit=crop' },
    { id: 'a7', title: '1q na areia', region: 'Guarapari, ES', price: 430, img: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1200&auto=format&fit=crop' },
    { id: 'a8', title: 'Studio Orla Norte', region: 'Salvador, BA', price: 510, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop' },
  ],
};

function formatBRL(v) {
  try {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);
  } catch {
    return `R$ ${v}`;
  }
}

export default function TravelChoice() {
  const [tab, setTab] = useState('condominios');
  const list = useMemo(() => DATA[tab] ?? [], [tab]);

  return (
    <section className="mx-auto w-[min(96vw,1400px)] py-12">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-[28px]">
          Encontre as melhores opções no litoral
        </h2>
        <p className="mx-auto mt-3 max-w-[60ch] text-sm text-slate-600">
          Do studio pé na areia aos condomínios completos, escolha seu próximo destino no Verde Mar.
        </p>

        {/* Tabs */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={[
                'rounded-full px-4 py-2 text-sm font-semibold ring-1 transition',
                tab === t.key
                  ? 'bg-slate-900 text-white ring-slate-900'
                  : 'bg-white text-slate-700 ring-slate-200 hover:bg-slate-50',
              ].join(' ')}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((item) => (
          <TravelCard key={item.id} item={item} />
        ))}
      </div>

      {/* CTA opcional */}
      <div className="mt-8 text-center">
        <Link
          to={`/explorar?categoria=${tab}`}
          className="inline-flex items-center rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white shadow hover:brightness-110"
        >
          Ver mais
        </Link>
      </div>
    </section>
  );
}

function TravelCard({ item }) {
  return (
    <Link 
      to={`/property/${item.id}`}
      className="group relative overflow-hidden rounded-[18px] bg-white shadow-sm ring-1 ring-slate-200 block cursor-pointer"
    >
      <div className="relative aspect-[3/4] w-full">
        <img
          src={item.img}
          alt={item.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute right-3 top-3">
          <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-slate-800 ring-1 ring-slate-200 backdrop-blur">
            A partir de <span className="font-bold">{formatBRL(item.price)}</span>
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="flex items-center gap-1 text-[11px] font-medium text-white/90">
            <MapPin size={12} className="opacity-90" />
            <span>{item.region}</span>
          </div>
          <h3 className="mt-1 text-[15px] font-extrabold leading-tight text-white drop-shadow">
            {item.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}