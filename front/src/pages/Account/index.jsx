import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Sparkles,
  ChevronRight,
  Star,
  MapPin,
  CalendarRange,
  Camera,
  Film,
} from 'lucide-react';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=1600&auto=format&fit=crop';

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem('user') || '{}');
  } catch {
    return {};
  }
}

function initials(name) {
  if (!name) return 'U';
  const parts = name.trim().split(' ').filter(Boolean);
  const a = parts[0]?.[0] || '';
  const b = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (a + b).toUpperCase();
}

export default function Account() {
  const user = useMemo(() => getStoredUser(), []);
  const name = user?.name || 'Usuário VerdeMar';
  const email = user?.email || 'user@verdemar.com';
  const avatarUrl = user?.avatar;

  // MOCKS simples
  const favoritos = [
    {
      id: 'fav1',
      img: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=600&auto=format&fit=crop',
      title: 'Casa Moderna com Vista',
      location: 'Armação dos Búzios, RJ',
      rating: 4.7,
    },
    {
      id: 'fav2',
      img: 'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=600&auto=format&fit=crop',
      title: 'Chalé Aconchegante',
      location: 'Ilhabela, SP',
      rating: 4.9,
    },
    {
      id: 'fav3',
      img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=600&auto=format&fit=crop',
      title: 'Beach House Pé na Areia',
      location: 'Florianópolis, SC',
      rating: 4.8,
    },
  ];

  const comprados = [
    {
      id: 'cmp1',
      title: 'Residência Camellia',
      price: 'R$ 1.250.000',
      date: '2024-11-12',
      location: 'Ubatuba, SP',
    },
    {
      id: 'cmp2',
      title: 'Villa do Mirante',
      price: 'R$ 980.000',
      date: '2024-06-03',
      location: 'Guarujá, SP',
    },
  ];

  const recomendados = [
    {
      id: 'rec1',
      img: 'https://images.unsplash.com/photo-1505692714131-347e2436f805?q=80&w=600&auto=format&fit=crop',
      title: 'Unique Stay',
      price: 'R$ 3.200/noite',
    },
    {
      id: 'rec2',
      img: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=600&auto=format&fit=crop',
      title: 'Litoral Norte',
      price: 'R$ 1.850/noite',
    },
    {
      id: 'rec3',
      img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600&auto=format&fit=crop',
      title: 'Piscina e Vista',
      price: 'R$ 2.640/noite',
    },
  ];

  return (
    <main className="pb-16 pt-[84px]">
      <div className="mx-auto w-[min(98vw,1400px)] space-y-6">
        {/* HERO - ocupa a faixa inteira do topo */}
        <section className="relative overflow-hidden rounded-3xl ring-1 ring-slate-200 shadow-sm">
          {/* Ajuste de altura: deixe alto para dar o impacto do visual da imagem */}
          <div className="relative h-[50vh] min-h-[360px] max-h-[560px] w-full">
            <img
              src={HERO_IMAGE}
              alt="Foto destaque"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            {/* Gradiente para legibilidade (como na referência, mais forte à esquerda) */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />

            {/* Texto à esquerda (título/legenda, estilo referência) */}
            <div className="absolute left-6 bottom-6 md:left-10 md:bottom-10 text-white drop-shadow">
              <p className="text-[12px] md:text-sm opacity-85">North Hollywood, CA 91601</p>
              <h2 className="mt-1 text-[clamp(1.6rem,3.2vw,2.4rem)] font-extrabold">
                Camellia Avenue
                <span className="ml-2 font-black opacity-90">5420/71</span>
              </h2>

              {/* Mini plantas como placeholders */}
              <div className="mt-4 flex items-center gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="rounded-xl bg-white/10 px-3 py-2 text-[11px] ring-1 ring-white/25">
                    Floor {i}
                  </div>
                ))}
              </div>
            </div>

            {/* Botões no topo direito (Street View / 3D Tour) */}
            <div className="absolute right-4 top-4 flex flex-col items-end gap-2">
              <button className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 text-xs font-semibold text-slate-800 ring-1 ring-slate-200 hover:bg-white">
                <Camera size={14} />
                Street View
              </button>
              <button className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 text-xs font-semibold text-slate-800 ring-1 ring-slate-200 hover:bg-white">
                <Film size={14} />
                3D Tour
              </button>
            </div>

            {/* Cartão do usuário fixo à direita (avatar + nome + email) */}
            <div className="absolute right-4 bottom-4 md:right-6 md:bottom-6">
              <div className="flex items-center gap-3 rounded-2xl bg-white/95 p-3 ring-1 ring-slate-200 shadow">
                <div className="relative h-16 w-16 overflow-hidden rounded-full bg-gradient-to-br from-emerald-400 to-sky-500 text-white font-bold text-xl flex items-center justify-center">
                  {avatarUrl ? (
                    <img 
                      src={avatarUrl} 
                      alt="" 
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <span style={{ display: avatarUrl ? 'none' : 'flex' }}>{initials(name)}</span>
                </div>
                <div className="min-w-0">
                  <div className="truncate text-[15px] font-semibold text-slate-900">{name}</div>
                  <div className="truncate text-[11px] text-slate-500">{email}</div>
                </div>
              </div>
            </div>

            {/* Indicador de progresso (decorativo, como a barrinha da ref) */}
            <div className="absolute left-1/2 bottom-2 -translate-x-1/2 w-28 h-1 rounded-full bg-white/50" />
          </div>
        </section>

        {/* Caixas abaixo (Favoritos, Comprados, Recomendados) */}
        <section className="grid gap-4 lg:grid-cols-12">
          {/* Favoritos */}
          <div className="lg:col-span-5 rounded-3xl bg-white p-5 ring-1 ring-slate-200 shadow-sm">
            <HeaderCard
              icon={<Heart className="text-rose-500" size={18} />}
              title="Favoritos"
              count={favoritos.length}
              cta="Ver todos"
            />
            <div className="mt-4 space-y-3">
              {favoritos.map((f) => (
                <RowItem
                  key={f.id}
                  img={f.img}
                  title={f.title}
                  subtitle={f.location}
                  right={
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600">
                      <Star size={14} /> {f.rating}
                    </span>
                  }
                />
              ))}
            </div>
          </div>

          {/* Imóveis comprados */}
          <div className="lg:col-span-4 rounded-3xl bg-white p-5 ring-1 ring-slate-200 shadow-sm">
            <HeaderCard
              icon={<ShoppingBag className="text-indigo-600" size={18} />}
              title="Imóveis comprados"
              count={comprados.length}
              cta="Ver comprovantes"
            />
            <div className="mt-4 space-y-4">
              {comprados.map((c) => (
                <div key={c.id} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <div className="text-[15px] font-semibold text-slate-900">{c.title}</div>
                  <div className="mt-1 text-xs text-slate-500">{c.location}</div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="font-extrabold text-emerald-700">{c.price}</span>
                    <span className="text-xs text-slate-500">Data: {new Date(c.date).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recomendados */}
          <div className="lg:col-span-3 rounded-3xl bg-white p-5 ring-1 ring-slate-200 shadow-sm">
            <HeaderCard
              icon={<Sparkles className="text-emerald-600" size={18} />}
              title="Recomendados"
              count={recomendados.length}
              cta="Atualizar"
            />
            <div className="mt-4 grid gap-3">
              {recomendados.map((r) => (
                <div key={r.id} className="overflow-hidden rounded-2xl ring-1 ring-slate-200 bg-slate-50">
                  <div className="relative aspect-[16/10]">
                    <img src={r.img} alt={r.title} className="absolute inset-0 h-full w-full object-cover" />
                  </div>
                  <div className="p-3">
                    <div className="truncate text-[14px] font-semibold text-slate-900">{r.title}</div>
                    <div className="mt-1 text-xs font-semibold text-sky-700">{r.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Atalhos (opcional) */}
        <section className="rounded-3xl bg-white p-5 ring-1 ring-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-[15px] font-semibold text-slate-900">Atalhos</div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <ShortcutCard title="Minhas visitas" subtitle="3 agendadas" />
            <ShortcutCard title="Mensagens" subtitle="2 não lidas" />
            <ShortcutCard title="Buscas salvas" subtitle="4 filtros" />
            <ShortcutCard title="Notificações" subtitle="Configurar alertas" />
          </div>
        </section>

        {/* Rodapé de navegação simples */}
        <div className="flex justify-end">
          <Link to="/explorar" className="inline-flex items-center gap-1 text-sm font-semibold text-sky-700 hover:underline">
            Explorar imóveis
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </main>
  );
}

/* -------- Subcomponentes -------- */

function HeaderCard({ icon, title, count, cta }) {
  return (
    <div className="flex items-center justify-between">
      <div className="inline-flex items-center gap-2">
        <div className="grid place-items-center rounded-xl bg-slate-100 p-2">{icon}</div>
        <div className="text-[15px] font-semibold text-slate-900">{title}</div>
        {typeof count === 'number' && (
          <span className="ml-2 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
            {count}
          </span>
        )}
      </div>
      <button className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900">
        {cta} <ChevronRight size={14} />
      </button>
    </div>
  );
}

function RowItem({ img, title, subtitle, right }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200">
      <div className="size-12 overflow-hidden rounded-xl">
        <img src={img} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[14px] font-semibold text-slate-900">{title}</div>
        <div className="truncate text-xs text-slate-500">{subtitle}</div>
      </div>
      {right}
    </div>
  );
}

function ShortcutCard({ title, subtitle }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
      <div className="text-[14px] font-semibold text-slate-900">{title}</div>
      <div className="mt-1 text-xs text-slate-500">{subtitle}</div>
    </div>
  );
}