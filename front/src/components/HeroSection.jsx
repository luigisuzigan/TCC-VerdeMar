import { useEffect, useRef, useState } from 'react';
import { X, MapPin, CalendarDays, Clock, Users, Compass } from 'lucide-react';

function Chip({ label, active }) {
  return (
    <button
      type="button"
      className={[
        'rounded-full px-3 py-1.5 text-xs font-semibold',
        active ? 'bg-sky-50 text-sky-700 ring-1 ring-sky-200' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50',
      ].join(' ')}
      aria-pressed={active ? 'true' : 'false'}
    >
      {label}
    </button>
  );
}

function ExplorePanel({ open, onClose }) {
  const ref = useRef(null);

  // Fechar com ESC e clique fora
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose?.();
    }
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose?.();
    }
    if (open) {
      document.addEventListener('keydown', onKey);
      document.addEventListener('mousedown', onClick);
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open, onClose]);

  return (
    <div
      aria-hidden={!open}
      className={[
        'absolute left-1/2 bottom-[92px] z-40 w-[min(92vw,1040px)] -translate-x-1/2',
        open ? 'pointer-events-auto' : 'pointer-events-none',
      ].join(' ')}
    >
      <div
        ref={ref}
        className={[
          'rounded-2xl bg-white shadow-[0_30px_70px_rgba(2,48,71,.20)] ring-1 ring-slate-200 overflow-hidden',
          'transition duration-200 ease-out',
          open ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-[0.98]',
        ].join(' ')}
        role="dialog"
        aria-modal="true"
      >
        {/* Cabeçalho do popover */}
        <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3">
          <div className="text-sm font-semibold text-slate-900">Explorar opções</div>
          <div className="ml-3 hidden md:flex items-center gap-2">
            <Chip label="Popular" active />
            <Chip label="Trending" />
            <Chip label="Budget" />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-sky-600 px-3 py-2 text-sm font-semibold text-white hover:bg-sky-700 shadow-sm"
              onClick={onClose}
              title="Explorar"
            >
              <Compass size={16} />
              Explorar
            </button>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
              aria-label="Fechar"
              onClick={onClose}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Corpo com filtros simples (mock visual) */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr]">
          {/* Sidebar categorias */}
          <aside className="border-b lg:border-b-0 lg:border-r border-slate-200 p-3">
            <div className="text-xs font-semibold text-slate-500 mb-2">Categorias</div>
            <div className="grid gap-2">
              {['Internacional', 'Praia', 'Natureza', 'Cidades'].map((c, i) => (
                <button
                  key={c}
                  className={[
                    'w-full text-left rounded-lg border px-3 py-2 text-sm font-medium',
                    i === 0 ? 'border-sky-300 bg-sky-50 text-sky-800' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300',
                  ].join(' ')}
                >
                  {c}
                </button>
              ))}
            </div>
          </aside>

          {/* Conteúdo: cards de destino mock */}
          <div className="p-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                { title: 'Bali', img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop' },
                { title: 'Cancún', img: 'https://images.unsplash.com/photo-1493558103817-58b2924bce98?q=80&w=1200&auto=format&fit=crop' },
                { title: 'Noronha', img: 'https://images.unsplash.com/photo-1516375199440-499f02a5a3de?q=80&w=1200&auto=format&fit=crop' },
                { title: 'Malibu', img: 'https://images.unsplash.com/photo-1526481280698-8fcc13fd2410?q=80&w=1200&auto=format&fit=crop' },
                { title: 'Patagônia', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop' },
                { title: 'Iceland', img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop' },
                { title: 'Paris', img: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=1200&auto=format&fit=crop' },
                { title: 'NYC', img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop' },
              ].map((d) => (
                <button
                  key={d.title}
                  className="group relative overflow-hidden rounded-xl border border-slate-200 shadow-sm"
                  title={`Selecionar ${d.title}`}
                >
                  <img src={d.img} alt={d.title} className="h-[110px] w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" aria-hidden="true" />
                  <span className="absolute left-2 top-2 rounded-full bg-black/55 px-2 py-0.5 text-[10px] font-semibold text-white">
                    40+ pacotes
                  </span>
                  <div className="absolute left-2 bottom-2 text-xs font-semibold text-white drop-shadow">{d.title}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Rodapé com dica */}
        <div className="flex items-center justify-between border-t border-slate-200 px-4 py-2">
          <span className="text-xs text-slate-500">Pressione Esc para fechar</span>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-3 py-2 text-sm font-semibold text-white hover:bg-sky-700 shadow-sm"
            onClick={onClose}
          >
            <Compass size={16} />
            Explorar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative mx-auto mt-[88px] w-[min(94vw,1280px)] rounded-[28px] overflow-hidden shadow-[0_10px_30px_rgba(2,48,71,.15)]">
      {/* Fundo e overlay */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1920&auto=format&fit=crop')",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/45 via-black/25 to-black/55" />

      {/* Conteúdo hero */}
      <div className="px-6 sm:px-8 py-24 text-white text-center">
        <h1 className="mx-auto max-w-[900px] text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight drop-shadow">
          Construa seus sonhos à beira-mar
        </h1>
        <p className="mt-3 mx-auto max-w-[780px] text-white/95">
          Encontre casas, apartamentos, condomínios e fazendas no litoral com a curadoria Verde Mar.
        </p>

        {/* Botão Explorar bonito */}
        <div className="mt-8">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-white/95 px-6 py-3 font-semibold text-slate-900 shadow-[0_10px_20px_rgba(2,48,71,.25)] ring-1 ring-black/5 transition hover:bg-white"
          >
            <Compass size={18} />
            Explorar
          </button>
        </div>
      </div>

      {/* Barra rápida de busca visual (estática) */}
      <div className="absolute left-1/2 bottom-6 z-10 w-[min(92%,1040px)] -translate-x-1/2">
        <div className="rounded-2xl bg-white/95 shadow-[0_20px_40px_rgba(2,48,71,.18)] ring-1 ring-black/5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_140px]">
            <div className="flex items-center gap-2 px-5 py-4 border-b sm:border-b-0 lg:border-r border-slate-200">
              <MapPin size={16} className="text-sky-600" />
              <div>
                <div className="text-[12px] font-semibold text-slate-500">Destino</div>
                <div className="text-[15px] text-slate-900/85">Cidade ou destino</div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-5 py-4 border-b sm:border-b-0 lg:border-r border-slate-200">
              <CalendarDays size={16} className="text-sky-600" />
              <div>
                <div className="text-[12px] font-semibold text-slate-500">Check‑in</div>
                <div className="text-[15px] text-slate-900/85">Selecione a data</div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-5 py-4 border-b sm:border-b-0 lg:border-r border-slate-200">
              <Clock size={16} className="text-sky-600" />
              <div>
                <div className="text-[12px] font-semibold text-slate-500">Check‑out</div>
                <div className="text-[15px] text-slate-900/85">Selecione a data</div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-5 py-4 border-b lg:border-b-0 lg:border-r border-slate-200">
              <Users size={16} className="text-sky-600" />
              <div>
                <div className="text-[12px] font-semibold text-slate-500">Hóspedes</div>
                <div className="text-[15px] text-slate-900/85">2 adultos, 0 crianças</div>
              </div>
            </div>
            <div className="p-3 lg:p-2 flex">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="w-full lg:w-auto lg:min-w-[120px] h-12 ml-auto rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold shadow-[0_10px_20px_rgba(2,132,199,.35)] transition inline-flex items-center justify-center gap-2 px-5"
              >
                <Compass size={16} />
                Explorar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popover de Explorar com efeito suave */}
      <ExplorePanel open={open} onClose={() => setOpen(false)} />
    </section>
  );
}











// export default function HeroSection() {
//   return (
//     <section className="relative mx-auto mt-6 w-[min(94vw,1280px)] rounded-[28px] bg-sky-600/10 p-3">
//       {/* Cartão do hero (estilo Tripso) */}
//       <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-b from-sky-500 to-cyan-600">
//         {/* Fundo imagem + overlay */}
//         <div
//           className="absolute inset-0 -z-10 bg-cover bg-center"
//           style={{
//             backgroundImage:
//               "url('https://images.unsplash.com/photo-1526483360412-f4dbaf036963?q=80&w=1920&auto=format&fit=crop')",
//           }}
//           aria-hidden="true"
//         />
//         <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_70%_10%,rgba(255,255,255,0.55),transparent)]" />

//         {/* Conteúdo textual */}
//         <div className="px-6 sm:px-10 pt-14 pb-36 text-white">
//           <h1 className="max-w-[780px] text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight drop-shadow">
//             Explore o mundo inteiro e curta sua beleza
//           </h1>
//           <p className="mt-3 max-w-[680px] text-white/95">
//             Encontre e registre suas experiências pelo mundo, com as melhores ofertas.
//           </p>
//         </div>

//         {/* Caixa de busca ancorada (abas + campos) */}
//         <div className="absolute left-1/2 bottom-6 w-[min(92%,1040px)] -translate-x-1/2">
//           <div className="rounded-2xl bg-white/95 shadow-[0_20px_40px_rgba(2,48,71,.18)] ring-1 ring-black/5">
//             {/* Abas */}
//             <div className="flex flex-wrap items-center gap-2 px-3 sm:px-4 py-3 border-b border-slate-200">
//               {[
//                 { name: 'Hospedagens', active: true },
//                 { name: 'Voos' },
//                 { name: 'Ônibus' },
//                 { name: 'Carros' },
//                 { name: 'Cruzeiros' },
//               ].map((t) => (
//                 <button
//                   type="button"
//                   key={t.name}
//                   className={[
//                     'rounded-full px-3 py-1.5 text-sm font-semibold',
//                     t.active
//                       ? 'bg-sky-50 text-sky-700 ring-1 ring-sky-200'
//                       : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50',
//                   ].join(' ')}
//                 >
//                   {t.name}
//                 </button>
//               ))}
//               <div className="ml-auto hidden sm:block text-xs font-medium text-slate-500">
//                 Última pesquisa: Bali
//               </div>
//             </div>

//             {/* Campos */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_140px]">
//               {/* Destino */}
//               <div className="px-5 py-4 border-b sm:border-b-0 lg:border-r border-slate-200">
//                 <div className="text-[12px] font-semibold text-slate-500">Destino</div>
//                 <div className="text-[15px] text-slate-900/85">Cidade ou destino</div>
//               </div>
//               {/* Check-in */}
//               <div className="px-5 py-4 border-b sm:border-b-0 lg:border-r border-slate-200">
//                 <div className="text-[12px] font-semibold text-slate-500">Check‑in</div>
//                 <div className="text-[15px] text-slate-900/85">Selecione a data</div>
//               </div>
//               {/* Check-out */}
//               <div className="px-5 py-4 border-b sm:border-b-0 lg:border-r border-slate-200">
//                 <div className="text-[12px] font-semibold text-slate-500">Check‑out</div>
//                 <div className="text-[15px] text-slate-900/85">Selecione a data</div>
//               </div>
//               {/* Quartos e hóspedes */}
//               <div className="px-5 py-4 border-b lg:border-b-0 lg:border-r border-slate-200">
//                 <div className="text-[12px] font-semibold text-slate-500">Quartos & hóspedes</div>
//                 <div className="text-[15px] text-slate-900/85">1 quarto, 2 hóspedes</div>
//               </div>
//               {/* Botão buscar */}
//               <div className="p-3 lg:p-2 flex">
//                 <button
//                   type="button"
//                   className="w-full lg:w-auto lg:min-w-[120px] h-12 ml-auto rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold shadow-[0_10px_20px_rgba(2,132,199,.35)] transition inline-flex items-center justify-center gap-2 px-5"
//                 >
//                   <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor">
//                     <circle cx="11" cy="11" r="7" strokeWidth="2" />
//                     <path d="M21 21l-3.5-3.5" strokeWidth="2" strokeLinecap="round" />
//                   </svg>
//                   Buscar
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }






// ESSE ERA O QUE TAVA ANTES

// export default function HeroSection() {
//   return (
//     <section className="relative w-[min(94vw,1280px)] mx-auto my-7 rounded-[28px] overflow-hidden shadow-[0_10px_30px_rgba(2,48,71,.15)]">
//       {/* Fundo e overlay */}
//       <div
//         className="absolute inset-0 -z-10 bg-cover bg-center"
//         style={{
//           backgroundImage:
//             "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop')",
//         }}
//         aria-hidden="true"
//       />
//       <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/40 via-black/25 to-black/40" />

//       {/* Header dentro do hero */}
//       <div className="h-[72px] px-6 sm:px-8 flex items-center text-white">
//         <div className="w-full grid grid-cols-[1fr_auto_1fr] items-center gap-3">
//           {/* Brand */}
//           <a className="inline-flex items-center gap-2 font-bold" href="#" aria-label="Início">
//             <span className="size-10 rounded-xl bg-gradient-to-br from-sky-300 to-blue-600 ring-1 ring-white/30 shadow-inner" />
//             <span className="font-[700] tracking-wide">Trevilo</span>
//           </a>

//           {/* Nav central (desktop) */}
//           <nav className="hidden md:flex items-center justify-center gap-7 text-[0.95rem] font-semibold">
//             <a className="hover:underline underline-offset-4" href="#">Home</a>
//             <a className="hover:underline underline-offset-4" href="#">About Us</a>
//             <a className="hover:underline underline-offset-4" href="#">Service</a>
//             <a className="hover:underline underline-offset-4" href="#">Pricing</a>
//           </nav>

//           {/* Ações */}
//           <div className="flex justify-end items-center gap-2">
//             <button
//               type="button"
//               className="h-10 px-4 rounded-full font-semibold text-slate-900 bg-white/60 backdrop-blur hover:bg-white/75 transition"
//             >
//               Signup
//             </button>
//             <button
//               type="button"
//               className="h-10 px-4 rounded-full font-semibold text-white bg-[#2B7FFF] hover:bg-[#1E66FF] shadow-[0_6px_16px_rgba(43,127,255,.35)] transition"
//             >
//               Login
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Conteúdo central do hero */}
//       <div className="px-6 sm:px-8 pb-10 text-white text-center">
//         <div className="max-w-[760px] mx-auto pt-6 sm:pt-2">
//           <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider px-3 py-2 rounded-full bg-white/20 border border-white/30 backdrop-blur">
//             PONTON TREVILO
//           </span>

//           <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-[700] leading-tight drop-shadow">
//             Discover The Magic In Every Destination With Us!
//           </h1>
//           <p className="mt-3 text-white/95">
//             Enjoy exclusive offers and best prices for satisfying travel packages.
//           </p>

//           {/* Card de busca */}
//           <div className="mt-6 bg-white rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(2,48,71,.15)] mx-auto w-full max-w-[1040px]">
//             {/* Abas */}
//             <div className="flex items-center gap-2 px-3 sm:px-4 py-3 border-b border-slate-200 bg-slate-50">
//               <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold text-[#2B7FFF] bg-[#2B7FFF]/10 border border-[#2B7FFF]/30">
//                 <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor">
//                   <path d="M3 21h18M4 21V7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v14" strokeWidth="2" />
//                   <path d="M7 10h10M7 14h10M7 18h10" strokeWidth="2" />
//                 </svg>
//                 Hotel
//               </button>
//               <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold bg-white border border-slate-200">
//                 <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor">
//                   <path d="M2 12l9 2 9 6-3-7 3-7-9 6-9 2z" strokeWidth="2" />
//                 </svg>
//                 Flight
//               </button>
//               <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold bg-white border border-slate-200">
//                 <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor">
//                   <path d="M3 13l2-5h14l2 5v5H3v-5z" strokeWidth="2" />
//                   <circle cx="7.5" cy="18" r="1.5" />
//                   <circle cx="16.5" cy="18" r="1.5" />
//                 </svg>
//                 Car
//               </button>
//               <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold bg-white border border-slate-200">
//                 <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor">
//                   <rect x="3" y="5" width="18" height="16" rx="2" strokeWidth="2" />
//                   <path d="M8 3v4M16 3v4M3 11h18" strokeWidth="2" />
//                 </svg>
//                 Event
//               </button>
//             </div>

//             {/* Campos */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_140px]">
//               {/* Destination */}
//               <div className="px-5 py-4 border-b sm:border-b-0 lg:border-r border-slate-200">
//                 <div className="text-[12px] font-semibold text-slate-500">Destination</div>
//                 <div className="text-[15px] text-slate-900/85">City or Destination</div>
//               </div>

//               {/* Check-in */}
//               <div className="px-5 py-4 border-b sm:border-b-0 lg:border-r border-slate-200">
//                 <div className="text-[12px] font-semibold text-slate-500">Check-In</div>
//                 <div className="text-[15px] text-slate-900/85">Add Date</div>
//               </div>

//               {/* Check-out */}
//               <div className="px-5 py-4 border-b sm:border-b-0 lg:border-r border-slate-200">
//                 <div className="text-[12px] font-semibold text-slate-500">Check-Out</div>
//                 <div className="text-[15px] text-slate-900/85">Add Date</div>
//               </div>

//               {/* Travelers */}
//               <div className="px-5 py-4 border-b lg:border-b-0 lg:border-r border-slate-200">
//                 <div className="text-[12px] font-semibold text-slate-500">Travelers</div>
//                 <div className="text-[15px] text-slate-900/85">Add Guests</div>
//               </div>

//               {/* Botão */}
//               <div className="p-3 lg:p-2 flex">
//                 <button
//                   type="button"
//                   className="w-full lg:w-auto lg:min-w-[120px] h-12 ml-auto rounded-xl bg-[#2B7FFF] hover:bg-[#1E66FF] text-white font-semibold shadow-[0_10px_20px_rgba(43,127,255,.35)] transition inline-flex items-center justify-center gap-2 px-5"
//                 >
//                   <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor">
//                     <circle cx="11" cy="11" r="7" strokeWidth="2" />
//                     <path d="M21 21l-3.5-3.5" strokeWidth="2" strokeLinecap="round" />
//                   </svg>
//                   Search
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Respiro embaixo */}
//         <div className="h-6" />
//       </div>
//     </section>
//   );
// }