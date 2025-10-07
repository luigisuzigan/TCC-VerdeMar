import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Coloque estas imagens em /public:
// - /Praia1.png  (surf - primeiro slide)
// - /Praia2.png
// - /Praia3.png
// - /Praia4.png
const SLIDES = [
  { id: 1, img: '/Praia1.png', title: 'XXXXXXXXX', text: 'XXXXXXXXX', cta: 'XXXXXXXXX', to: '/explorar' },
  { id: 2, img: '/Praia2.png', title: 'XXXXXXXXX', text: 'XXXXXXXXX', cta: 'XXXXXXXXX', to: '/explorar' },
  { id: 3, img: '/Praia3.png', title: 'XXXXXXXXX', text: 'XXXXXXXXX', cta: 'XXXXXXXXX', to: '/explorar' },
  { id: 4, img: '/Praia4.png', title: 'XXXXXXXXX', text: 'XXXXXXXXX', cta: 'XXXXXXXXX', to: '/explorar' },
];

export default function Section1() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const DURATION = 15000; // 15s

  useEffect(() => {
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  function start() {
    stop();
    timerRef.current = setTimeout(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, DURATION);
  }
  function stop() {
    if (timerRef.current) clearTimeout(timerRef.current);
  }
  function goPrev() {
    stop();
    setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  }
  function goNext() {
    stop();
    setIndex((i) => (i + 1) % SLIDES.length);
  }

  return (
    <section className="relative w-full py-8">
      <div
        className="relative mx-auto h-[520px] w-[min(96vw,1400px)] overflow-hidden rounded-[28px] ring-1 ring-black/10 shadow-[0_25px_60px_rgba(0,0,0,.18)] md:h-[560px] lg:h-[600px]"
        onMouseEnter={stop}
        onMouseLeave={start}
      >
        {SLIDES.map((s, i) => {
          const active = i === index;
          return (
            <div
              key={s.id}
              className={[
                'absolute inset-0 transition-all duration-700',
                active ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]',
              ].join(' ')}
              aria-hidden={!active}
            >
              {/* Imagem de fundo ocupando a seção */}
              <img
                src={s.img}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
              {/* Degradê azul/verde (vibe Section6) */}
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/30 via-sky-500/22 to-transparent" />
              {/* Overlay escuro para legibilidade */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />

              {/* Conteúdo de texto (placeholder) */}
              <div className="relative z-10 flex h-full items-center">
                <div className="px-6 sm:px-10 md:px-14 lg:px-16">
                  <h2 className="max-w-[22ch] text-3xl font-extrabold leading-tight text-white drop-shadow md:text-5xl">
                    {s.title}
                  </h2>
                  <p className="mt-3 max-w-[60ch] text-sm text-white/90 md:text-base">
                    {s.text}
                  </p>
                  <div className="mt-6">
                    <Link
                      to={s.to}
                      className="inline-flex items-center rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                    >
                      {s.cta}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Setas para navegar */}
        <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 flex items-center gap-4">
          <button
            type="button"
            onClick={goPrev}
            className="grid size-11 place-items-center rounded-full bg-white/18 text-white ring-1 ring-white/45 backdrop-blur-sm transition hover:bg-white/28"
            aria-label="Slide anterior"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="grid size-11 place-items-center rounded-full bg-white/18 text-white ring-1 ring-white/45 backdrop-blur-sm transition hover:bg-white/28"
            aria-label="Próximo slide"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Indicador de progresso simples */}
        <div className="absolute bottom-6 left-6 right-6 z-10 hidden items-center gap-3 md:flex">
          <div className="h-[3px] flex-1 rounded bg-white/25">
            <div
              className="h-[3px] rounded bg-emerald-300 shadow-[0_0_0_1px_rgba(255,255,255,.35)] transition-[width]"
              style={{ width: `${((index + 1) / SLIDES.length) * 100}%` }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}