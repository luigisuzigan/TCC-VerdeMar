import { Link } from 'react-router-dom';
import { Umbrella, Waves, ShieldCheck, Ship, ChevronRight } from 'lucide-react';

const BEACH_IMG =
  'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1600&auto=format&fit=crop';

export default function BeachInfo() {
  return (
    <section className="relative mx-auto w-[min(96vw,1400px)] py-10 sm:py-12">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        {/* Bloco da imagem com artes/overlays */}
        <div className="relative">
          {/* blobs decorativos */}
          <div className="pointer-events-none absolute -left-10 top-10 h-40 w-40 rounded-full bg-sky-300/40 blur-3xl" />
          <div className="pointer-events-none absolute -right-6 bottom-10 h-36 w-36 rounded-full bg-emerald-300/40 blur-3xl" />

          <div className="relative overflow-hidden rounded-[28px] ring-1 ring-white/20 shadow-xl">
            <div className="relative aspect-[16/11] w-full bg-slate-200 md:aspect-[4/3]">
              <img
                src={BEACH_IMG}
                alt="Praia paradisíaca"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              {/* Glass overlay sutil para legibilidade */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-black/0 to-black/10" />
            </div>
          </div>
        </div>

        {/* Bloco de conteúdo */}
        <div className="pt-6 lg:pt-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Litoral brasileiro</p>

          <h2 className="mt-2 text-balance text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
            Imóveis
            <span className="bg-gradient-to-r from-emerald-600 via-sky-600 to-emerald-600 bg-clip-text px-2 text-transparent">
              é nossa praia
            </span>
          </h2>

          <p className="mt-3 max-w-[56ch] text-sm text-slate-600">
            Curadoria de casas e experiências à beira‑mar. Anúncios verificados, atendimento humano e as melhores
            recomendações para aproveitar cada onda, cada pôr do sol e cada cantinho do litoral.
          </p>

          {/* Chips informativos */}
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <InfoChip icon={<Waves size={16} />} title="Mais de 120 praias" desc="Do Norte ao Sul" />
            <InfoChip icon={<Umbrella size={16} />} title="Stay & relax" desc="Hospedagens selecionadas" />
            <InfoChip icon={<Ship size={16} />} title="Passeios e tours" desc="Barcos e trilhas" />
            <InfoChip icon={<ShieldCheck size={16} />} title="Verificado" desc="Segurança e suporte" />
          </div>

          {/* CTAs */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              to="/explorar"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-emerald-500"
            >
              Explorar imóveis
              <ChevronRight size={16} />
            </Link>
            <Link
              to="/sobre"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900/5 px-5 py-3 text-sm font-semibold text-slate-800 ring-1 ring-slate-200 hover:bg-slate-900/10"
            >
              Saiba mais
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoChip({ icon, title, desc }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-white px-4 py-3 ring-1 ring-slate-200 shadow-sm">
      <span className="mt-0.5 grid size-7 place-items-center rounded-full bg-sky-50 text-sky-700 ring-1 ring-sky-200">
        {icon}
      </span>
      <div>
        <div className="text-[13px] font-semibold text-slate-900">{title}</div>
        <div className="text-[11px] font-medium text-slate-500">{desc}</div>
      </div>
    </div>
  );
}