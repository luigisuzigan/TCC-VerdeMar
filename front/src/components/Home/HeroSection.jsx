import React from "react";
import QuickSearch from "../Search/QuickSearch";

const bgUrl = "/Home/hero.jpg";

export default function HeroSection() {
  return (
    <section 
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden" 
      style={{ 
        backgroundImage: `url(${bgUrl})`, 
        backgroundSize: "cover", 
        backgroundPosition: "center" 
      }}
    >
      {/* Overlay escuro suave */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
      
      {/* Conteúdo */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 text-center text-white">
        {/* Título */}
        <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Encontre o Imóvel dos
          <br />
          Seus Sonhos
        </h1>
        
        {/* Subtítulo */}
        <p className="mb-10 text-base text-white/90 sm:text-lg md:text-xl">
          Descubra as melhores oportunidades imobiliárias em localizações privilegiadas
          <br className="hidden sm:block" />
          com conforto, segurança e qualidade de vida
        </p>

        {/* Search Component */}
        <QuickSearch />
      </div>
    </section>
  );
}
