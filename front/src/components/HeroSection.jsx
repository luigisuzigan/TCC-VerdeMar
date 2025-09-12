export default function HeroSection() {
  return (
    <section className="relative w-[min(94vw,1280px)] mx-auto my-7 rounded-[28px] overflow-hidden shadow-[0_10px_30px_rgba(2,48,71,.15)]">
      {/* Fundo e overlay */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop')",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/40 via-black/25 to-black/40" />

      {/* Header dentro do hero */}
      <div className="h-[72px] px-6 sm:px-8 flex items-center text-white">
        <div className="w-full grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          {/* Brand */}
          <a className="inline-flex items-center gap-2 font-bold" href="#" aria-label="Início">
            <span className="size-10 rounded-xl bg-gradient-to-br from-sky-300 to-blue-600 ring-1 ring-white/30 shadow-inner" />
            <span className="font-[700] tracking-wide">Trevilo</span>
          </a>

          {/* Nav central (desktop) */}
          <nav className="hidden md:flex items-center justify-center gap-7 text-[0.95rem] font-semibold">
            <a className="hover:underline underline-offset-4" href="#">Home</a>
            <a className="hover:underline underline-offset-4" href="#">About Us</a>
            <a className="hover:underline underline-offset-4" href="#">Service</a>
            <a className="hover:underline underline-offset-4" href="#">Pricing</a>
          </nav>

          {/* Ações */}
          <div className="flex justify-end items-center gap-2">
            <button
              type="button"
              className="h-10 px-4 rounded-full font-semibold text-slate-900 bg-white/60 backdrop-blur hover:bg-white/75 transition"
            >
              Signup
            </button>
            <button
              type="button"
              className="h-10 px-4 rounded-full font-semibold text-white bg-[#2B7FFF] hover:bg-[#1E66FF] shadow-[0_6px_16px_rgba(43,127,255,.35)] transition"
            >
              Login
            </button>
          </div>
        </div>
      </div>

      {/* Conteúdo central do hero */}
      <div className="px-6 sm:px-8 pb-10 text-white text-center">
        <div className="max-w-[760px] mx-auto pt-6 sm:pt-2">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider px-3 py-2 rounded-full bg-white/20 border border-white/30 backdrop-blur">
            PONTON TREVILO
          </span>

          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-[700] leading-tight drop-shadow">
            Discover The Magic In Every Destination With Us!
          </h1>
          <p className="mt-3 text-white/95">
            Enjoy exclusive offers and best prices for satisfying travel packages.
          </p>

          {/* Card de busca */}
          <div className="mt-6 bg-white rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(2,48,71,.15)] mx-auto w-full max-w-[1040px]">
            {/* Abas */}
            <div className="flex items-center gap-2 px-3 sm:px-4 py-3 border-b border-slate-200 bg-slate-50">
              <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold text-[#2B7FFF] bg-[#2B7FFF]/10 border border-[#2B7FFF]/30">
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor">
                  <path d="M3 21h18M4 21V7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v14" strokeWidth="2" />
                  <path d="M7 10h10M7 14h10M7 18h10" strokeWidth="2" />
                </svg>
                Hotel
              </button>
              <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold bg-white border border-slate-200">
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor">
                  <path d="M2 12l9 2 9 6-3-7 3-7-9 6-9 2z" strokeWidth="2" />
                </svg>
                Flight
              </button>
              <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold bg-white border border-slate-200">
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor">
                  <path d="M3 13l2-5h14l2 5v5H3v-5z" strokeWidth="2" />
                  <circle cx="7.5" cy="18" r="1.5" />
                  <circle cx="16.5" cy="18" r="1.5" />
                </svg>
                Car
              </button>
              <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold bg-white border border-slate-200">
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor">
                  <rect x="3" y="5" width="18" height="16" rx="2" strokeWidth="2" />
                  <path d="M8 3v4M16 3v4M3 11h18" strokeWidth="2" />
                </svg>
                Event
              </button>
            </div>

            {/* Campos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_140px]">
              {/* Destination */}
              <div className="px-5 py-4 border-b sm:border-b-0 lg:border-r border-slate-200">
                <div className="text-[12px] font-semibold text-slate-500">Destination</div>
                <div className="text-[15px] text-slate-900/85">City or Destination</div>
              </div>

              {/* Check-in */}
              <div className="px-5 py-4 border-b sm:border-b-0 lg:border-r border-slate-200">
                <div className="text-[12px] font-semibold text-slate-500">Check-In</div>
                <div className="text-[15px] text-slate-900/85">Add Date</div>
              </div>

              {/* Check-out */}
              <div className="px-5 py-4 border-b sm:border-b-0 lg:border-r border-slate-200">
                <div className="text-[12px] font-semibold text-slate-500">Check-Out</div>
                <div className="text-[15px] text-slate-900/85">Add Date</div>
              </div>

              {/* Travelers */}
              <div className="px-5 py-4 border-b lg:border-b-0 lg:border-r border-slate-200">
                <div className="text-[12px] font-semibold text-slate-500">Travelers</div>
                <div className="text-[15px] text-slate-900/85">Add Guests</div>
              </div>

              {/* Botão */}
              <div className="p-3 lg:p-2 flex">
                <button
                  type="button"
                  className="w-full lg:w-auto lg:min-w-[120px] h-12 ml-auto rounded-xl bg-[#2B7FFF] hover:bg-[#1E66FF] text-white font-semibold shadow-[0_10px_20px_rgba(43,127,255,.35)] transition inline-flex items-center justify-center gap-2 px-5"
                >
                  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor">
                    <circle cx="11" cy="11" r="7" strokeWidth="2" />
                    <path d="M21 21l-3.5-3.5" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Respiro embaixo */}
        <div className="h-6" />
      </div>
    </section>
  );
}