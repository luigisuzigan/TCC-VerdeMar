import { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const CARDS_INIT = [
  {
    id: 'c1',
    title: 'YOSEMITE NATIONAL PARK',
    subtitle: 'Sierra Nevada • United States',
    img: '/Praia2.jng',
  },
  {
    id: 'c2',
    title: 'LOS LANCES BEACH',
    subtitle: 'Tarifa • Spain',
    img: '/Praia3.jng',
  },
  {
    id: 'c3',
    title: 'GÖREME VALLEY',
    subtitle: 'Cappadocia • Turkey',
    img: '/Praia4.jng',
  },
  {
    id: 'c4',
    title: 'SAINT ANTÔNIEN',
    subtitle: 'Switzerland Alps',
    img: '/Praia5.jng',
  },
];

export default function AfterHeroSection() {
  const [cards, setCards] = useState(CARDS_INIT);

  function prev() {
    setCards((arr) => {
      const copy = [...arr];
      const last = copy.pop();
      copy.unshift(last);
      return copy;
    });
  }
  function next() {
    setCards((arr) => {
      const copy = [...arr];
      const first = copy.shift();
      copy.push(first);
      return copy;
    });
  }

  return (
    <section className="relative w-full">
      <div className="relative mx-auto h-[560px] w-[min(96vw,1400px)] overflow-hidden rounded-[28px] ring-1 ring-black/10 shadow-[0_25px_60px_rgba(0,0,0,.20)]">
        {/* Fundo */}
        <img
          src="/Praia1.jng"
          alt="Fundo"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Gradiente para legibilidade */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.28)_25%,rgba(0,0,0,0.10)_55%,rgba(0,0,0,0.16)_100%)]" />

        {/* Conteúdo */}
        <div className="relative z-10 h-full px-6 sm:px-10 md:px-14">
          {/* Texto à esquerda */}
          <div className="absolute left-6 right-[48%] top-[72px] sm:left-10 md:left-14">
            <div className="mb-3 h-[2px] w-6 rounded bg-white/85" />
            <p className="text-[13px] font-medium text-white/90">Sahara Desert - Morocco</p>

            <h2 className="mt-2 text-[40px] font-black leading-[0.95] tracking-tight text-white drop-shadow md:text-[52px] lg:text-[58px]">
              MARRAKECH
              <br />
              MERZOUGA
            </h2>

            <p className="mt-4 max-w-[52ch] text-[13px] text-white/88 md:text-sm">
              Mauris malesuada nisi sit amet augue accumsan tincidunt. Maecenas tincidunt,
              velit ac porttitor pulvinar, tortor eros facilisis libero.
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

          {/* Cards à direita — menores, como no print */}
          <div className="pointer-events-none absolute right-6 top-[185px] hidden h-[300px] w-[54%] items-end justify-between gap-4 md:flex">
            {cards.slice(0, 4).map((c, idx) => (
              <div
                key={c.id}
                className={[
                  'pointer-events-auto relative w-[170px] overflow-hidden rounded-[18px] shadow-xl ring-1 ring-black/10',
                  // Centrais um pouco mais altas (290px) e extremos 270px
                  idx === 1 || idx === 2 ? 'h-[290px]' : 'h-[270px]',
                ].join(' ')}
              >
                <img src={c.img} alt={c.title} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/82 via-black/45 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <div className="text-[10px] font-semibold uppercase tracking-wide text-white/80">
                    {c.subtitle}
                  </div>
                  <div className="mt-1 text-[12px] font-extrabold leading-tight text-white drop-shadow">
                    {c.title}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Setas centralizadas acima da linha */}
          <div className="absolute bottom-[78px] left-1/2 z-20 -translate-x-1/2 flex items-center gap-4">
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

          {/* Linha de progresso e número */}
          <div className="absolute bottom-[46px] left-[140px] right-[110px] z-10 hidden items-center gap-3 md:flex">
            <div className="h-[3px] flex-1 rounded bg-white/28">
              <div className="h-[3px] w-[26%] rounded bg-amber-300 shadow-[0_0_0_1px_rgba(255,255,255,.35)]" />
            </div>
            <div className="ml-auto pr-1 text-[38px] font-extrabold tracking-tight text-white/95">
              03
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}