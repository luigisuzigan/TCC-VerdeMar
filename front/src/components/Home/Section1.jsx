import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const SLIDES = [
  {
    id: 'c1',
    title: 'YOSEMITE NATIONAL PARK',
    subtitle: 'Sierra Nevada • United States',
    img: '/Teste/Praia1.jpg',
    kicker: 'Sahara Desert - Morocco',
    headline: 'Aqui é sua praia',
    description: 'Descrição da primeira imagem (pode alterar depois).',
  },
  {
    id: 'c2',
    title: 'LOS LANCES BEACH',
    subtitle: 'Tarifa • Spain',
    img: '/Teste/Praia2.jpg',
    kicker: 'Tarifa • Spain',
    headline: 'Los Lances Beach',
    description: 'Descrição da Los Lances Beach.',
  },
  {
    id: 'c3',
    title: 'GÖREME VALLEY',
    subtitle: 'Cappadocia • Turkey',
    img: '/Teste/Praia3.jpg',
    kicker: 'Cappadocia • Turkey',
    headline: 'Göreme Valley',
    description: 'Descrição da Göreme Valley.',
  },
  {
    id: 'c4',
    title: 'SAINT ANTÔNIEN',
    subtitle: 'Switzerland Alps',
    img: '/Teste/Praia4.jpg', // corrigido
    kicker: 'Switzerland Alps',
    headline: 'Saint Antônien',
    description: 'Descrição de Saint Antônien.',
  },
];


export default function AfterHeroSection() {
  // índice da imagem de fundo (independente dos cards)
  const [current, setCurrent] = useState(0);
  const total = SLIDES.length;

  // cards visíveis: sempre as próximas imagens, excluindo a atual de fundo
  const maxCards = Math.min(4, Math.max(0, total - 1));
  const visibleCards = Array.from({ length: maxCards }, (_, i) => SLIDES[(current + 1 + i) % total]);

  // troca imediata (sem efeito)
  const prev = () => setCurrent((i) => (i - 1 + total) % total);
  const next = () => setCurrent((i) => (i + 1) % total);

  // autoplay 15s
  useEffect(() => {
    if (total <= 1) return;
    const id = setInterval(() => setCurrent((i) => (i + 1) % total), 15000);
    return () => clearInterval(id);
  }, [total]);

  const active = SLIDES[current];

  return (
    <section className="relative w-full">
      {/* wrapper com padding lateral mínimo */}
      <div className="px-2 sm:px-3 md:px-4">
        {/* hero */}
        <div className="relative h-[560px] w-full overflow-hidden">
          {/* fundo independente */}
          <img
            src={active.img}
            alt={active.title}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* gradiente para legibilidade */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.28)_25%,rgba(0,0,0,0.10)_55%,rgba(0,0,0,0.16)_100%)]" />

          {/* conteúdo */}
          <div className="relative z-10 h-full px-3 sm:px-5 md:px-6">
            {/* texto à esquerda (do slide atual) */}
            <div className="absolute left-6 right-[48%] top-[72px] sm:left-10 md:left-14">
              <div className="mb-3 h-[2px] w-6 rounded bg-white/85" />
              <p className="text-[13px] font-medium text-white/90">
                {active.kicker || active.subtitle}
              </p>

              <h2 className="mt-2 text-[40px] font-black leading-[0.95] tracking-tight text-white drop-shadow md:text-[52px] lg:text-[58px]">
                {active.headline || active.title}
              </h2>

              <p className="mt-4 max-w-[52ch] text-[13px] text-white/88 md:text-sm">
                {active.description || ''}
              </p>

              <div className="mt-6 flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-full bg-amber-300 text-white shadow ring-1 ring-white/30">
                  <MapPin size={18} />
                </span>
                <Link
                  to="/explorar"
                  className="inline-flex items-center rounded-full border border-white/35 bg-white/10 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm transition hover:bg-white/18"
                >
                  Discover Location
                </Link>
              </div>
            </div>

            {/* cards à direita — nunca inclui o slide atual */}
            <div className="pointer-events-none absolute right-10 top-[185px] hidden h-[300px] w-[52%] md:flex">
              <div className="relative ml-auto flex items-end justify-between gap-4">
                {visibleCards.map((c) => (
                  <div
                    key={c.id}
                    className="group pointer-events-auto relative h-[290px] w-[170px] overflow-hidden rounded-[20px] shadow-[0_12px_28px_rgba(0,0,0,0.35)] transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
                  >
                    <img src={c.img} alt={c.title} className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 via-black/50 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <div className="text-[10px] font-semibold uppercase tracking-wide text-white/85">
                        {c.subtitle}
                      </div>
                      <div className="mt-1 text-[12px] font-extrabold leading-tight text-white drop-shadow">
                        {c.title}
                      </div>
                    </div>
                  </div>
                ))}

                {/* setas embaixo do primeiro card */}
                <div className="pointer-events-auto absolute -bottom-14 left-[85px] z-20 flex -translate-x-1/2 items-center gap-4">
                  <button
                    type="button"
                    onClick={prev}
                    className="grid size-11 place-items-center rounded-full bg-white/18 text-white ring-1 ring-white/45 backdrop-blur-sm transition hover:bg-white/28"
                    aria-label="Anterior"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="grid size-11 place-items-center rounded-full bg-white/18 text-white ring-1 ring-white/45 backdrop-blur-sm transition hover:bg-white/28"
                    aria-label="Próximo"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}