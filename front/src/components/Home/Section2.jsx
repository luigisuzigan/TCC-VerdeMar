export default function MarketingHeaderBar() {
  return (
    <div className="relative mx-auto mt-[72px] w-[min(96vw,1280px)] h-[140px] overflow-hidden rounded-3xl ring-1 ring-black/10 shadow-md">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/videos/praia-poster.jpg"
      >
        <source src="/videos/praia-loop.webm" type="video/webm" />
        <source src="/videos/praia-loop.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/10" />
      <div className="relative z-10 flex h-full items-center px-8">
        <div className="flex-1">
          <h3 className="text-lg md:text-xl font-bold text-white">
            Encontre seu imóvel dos sonhos no litoral.
          </h3>
          <p className="mt-1 text-xs md:text-sm text-white/80">
            Imóveis verificados • Consultoria especializada • Oferta atualizada
          </p>
        </div>
        <div className="flex gap-3">
          <a
            href="/explorar"
            className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-400"
          >
            Explorar
          </a>
          <a
            href="/contato"
            className="rounded-full bg-white/15 px-5 py-2 text-sm font-semibold text-white backdrop-blur hover:bg-white/25"
          >
            Falar
          </a>
        </div>
      </div>
    </div>
  );
}