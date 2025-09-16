/**
 * StoryStackSection
 * Inspiração na segunda referência (imagens sobrepostas e blocos coloridos).
 * Inclui uma faixa com “efeito rasgado” (torn edge) usando SVG.
 *
 * AJUSTES RÁPIDOS:
 * - background principal: bg-teal-900/?? ou gradient
 * - imagens: blocks[]
 * - cores overlay/accent: classes accent-*
 */

const blocks = [
  {
    id: 'surf',
    title: 'Surf & Ondas',
    text: 'As melhores praias para praticar surf o ano todo, com águas cristalinas e picos consistentes.',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
    accent: 'bg-emerald-400'
  },
  {
    id: 'refugio',
    title: 'Refúgios Exclusivos',
    text: 'Bangôs, eco-lodges e casas isoladas para desconectar com conforto.',
    img: 'https://images.unsplash.com/photo-1528498833236-6d61b02ae160?q=80&w=1200&auto=format&fit=crop',
    accent: 'bg-cyan-400'
  },
  {
    id: 'experiencias',
    title: 'Experiências & Lifestyle',
    text: 'Yoga ao nascer do sol, trilhas costeiras, gastronomia local e mergulho.',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop',
    accent: 'bg-sky-400'
  }
];

export default function StoryStackSection() {
  return (
    <section className="mt-24">
      {/* Faixa com rasgo superior */}
      <div className="relative">
        <TornTop />
        <div className="relative z-10 mx-auto w-[min(96vw,1280px)] py-20">
          <div className="max-w-3xl">
            <h2 className="text-[clamp(2rem,3vw,2.9rem)] font-extrabold leading-tight tracking-tight text-slate-900">
              Vida ativa, natureza e equilíbrio.
            </h2>
            <p className="mt-4 text-slate-600 max-w-xl">
              Uma curadoria de experiências e estilos de vida que fazem do litoral muito mais do que um destino:
              é um jeito de viver. Explore categorias e descubra o que combina com você.
            </p>
          </div>

          {/* Blocos em camadas */}
          <div className="mt-14 grid gap-10 lg:grid-cols-3">
            {blocks.map((b, i) => (
              <LayeredCard key={b.id} data={b} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LayeredCard({ data, index }) {
  const { title, text, img, accent } = data;

  return (
    <div className="relative h-[420px] group">
      {/* Retângulo colorido de fundo deslocado */}
      <div
        className={[
          'absolute inset-0 rounded-3xl translate-x-4 translate-y-6 opacity-90 blur-[0.5px]',
          accent
        ].join(' ')}
        aria-hidden="true"
      />
      {/* Card principal */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden ring-1 ring-slate-200 bg-white shadow-xl flex flex-col">
        <div className="relative flex-1">
          <img
            src={img}
            alt=""
            className="absolute inset-0 h-full w-full object-cover brightness-95 saturate-110 transition duration-[1200ms] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/5" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-white text-xl font-bold drop-shadow">{title}</h3>
          </div>
        </div>
        <div className="p-5">
          <p className="text-sm text-slate-600 leading-relaxed">{text}</p>
          <button
            type="button"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-slate-700"
          >
            Explorar
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function TornTop() {
  return (
    <div className="relative">
      {/* Faixa de fundo (areia / claro) */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-white" />
      {/* "Rasgo" superior (pode duplicar para inferior se quiser) */}
      <div className="absolute -top-8 left-0 right-0 h-10 overflow-hidden pointer-events-none">
        <svg
          viewBox="0 0 1440 80"
          className="w-full h-full"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,40 C180,10 360,70 540,40 C720,10 900,70 1080,40 C1260,10 1440,55 1440,55 L1440,0 L0,0 Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </div>
  );
}