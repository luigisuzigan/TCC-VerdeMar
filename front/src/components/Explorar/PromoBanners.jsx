import { Link } from 'react-router-dom';

/**
 * Editar os banners aqui:
 * - title: título grande
 * - subtitle: linha menor
 * - cta: texto do botão
 * - to: rota/URL
 * - img: imagem de fundo
 * - tone: 'light' ou 'dark' (muda contraste)
 * - badge: opcional (ex.: "20% OFF" / "Novo" / "Investir")
 */
const BANNERS = [
  {
    id: 'escape',
    title: 'ESCAPE\nPARA O PARAÍSO',
    subtitle: 'Reserve agora e garanta condições especiais em imóveis à beira‑mar.',
    cta: 'Ver oportunidades',
    to: '/explorar?destaque=paraiso',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop',
    tone: 'light',
    badge: 'Oferta limitada'
  },
  {
    id: 'adventure',
    title: 'A VENTURA\nCOMEÇA AQUI',
    subtitle: 'Terrenos, casas de retiro e experiências em locais exclusivos.',
    cta: 'Explorar agora',
    to: '/explorar?tag=aventura',
    img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop',
    tone: 'dark',
    badge: 'Novo'
  },
  // Exemplo de terceiro banner (descomente se quiser 3 colunas)
  // {
  //   id: 'invest',
  //   title: 'INVISTA\nNO LITORAL',
  //   subtitle: 'Retorno consistente e valorização acima da média nacional.',
  //   cta: 'Simular retorno',
  //   to: '/explorar?foco=investir',
  //   img: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1600&auto=format&fit=crop',
  //   tone: 'light',
  //   badge: 'Investimento'
  // }
];

export default function PromoBanners({
  banners = BANNERS,
  maxWidth = 'min(96vw,1280px)',
  rounded = '28px',
  aspect = 'aspect-[16/9] md:aspect-[7/3]' // ajuste da proporção
}) {
  return (
    <section
      className="mx-auto mt-14"
      style={{ width: maxWidth }}
    >
      {/* Título opcional (remova se não quiser) */}
      {/* <h2 className="mb-6 text-2xl font-semibold text-slate-800">Encontre seu estilo</h2> */}

      <div
        className={[
          'grid gap-6',
          // 2 banners: 1-2 col; 3 banners vira 3 no lg
          banners.length === 2
            ? 'md:grid-cols-2'
            : 'md:grid-cols-2 lg:grid-cols-3'
        ].join(' ')}
      >
        {banners.map(b => (
          <BannerCard key={b.id} data={b} rounded={rounded} aspect={aspect} />
        ))}
      </div>
    </section>
  );
}

function BannerCard({ data, rounded, aspect }) {
  const { title, subtitle, cta, to, img, tone, badge } = data;

  const isLight = tone === 'light';

  return (
    <div
      className={[
        'relative overflow-hidden group',
        aspect,
        'ring-1 ring-slate-200/70 shadow-[0_8px_24px_-4px_rgba(15,23,42,.15)]'
      ].join(' ')}
      style={{ borderRadius: rounded }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition scale-105 group-hover:scale-110 duration-[600ms]"
        style={{ backgroundImage: `url(${img})` }}
        aria-hidden="true"
      />
      {/* Overlay */}
      <div
        className={[
          'absolute inset-0',
          isLight
            ? 'bg-gradient-to-br from-black/10 via-black/30 to-black/60'
            : 'bg-gradient-to-br from-black/60 via-black/50 to-black/70'
        ].join(' ')}
      />
      {/* Conteúdo */}
      <div className="relative z-10 flex h-full flex-col justify-end p-6 sm:p-7">
        {badge && (
          <span className="mb-3 inline-block rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur ring-1 ring-white/30">
            {badge}
          </span>
        )}
        <h3
          className={[
            'whitespace-pre-line font-extrabold leading-[1.05]',
            'text-white drop-shadow',
            'text-2xl sm:text-3xl'
          ].join(' ')}
        >
          {title}
        </h3>
        {subtitle && (
          <p className="mt-3 max-w-[420px] text-sm font-medium text-white/85">
            {subtitle}
          </p>
        )}
        <div className="mt-5">
          <Link
            to={to}
            className={[
              'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2',
              isLight
                ? 'bg-white text-slate-900 hover:bg-slate-100 focus:ring-white/60 focus:ring-offset-slate-900/30'
                : 'bg-emerald-500 text-white hover:bg-emerald-400 focus:ring-emerald-300 focus:ring-offset-emerald-900/30'
            ].join(' ')}
          >
            {cta}
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}