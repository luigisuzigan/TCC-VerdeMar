import React from "react";

const HeroSection = () => {
  return (
    <section
      className="relative min-h-[560px] px-6 md:px-8 py-28 md:py-32 text-white text-center"
      aria-label="Descubra imóveis no litoral"
    >
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/40 to-black/60 rounded-b-[30px]" />

      <div className="relative max-w-2xl mx-auto flex flex-col items-center gap-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight drop-shadow-sm">
          Encontre seu lugar à beira-mar
        </h1>
        <p className="text-base md:text-lg font-normal leading-relaxed text-white/90">
          Casas, apartamentos e mais. Viva o melhor do litoral com conforto e praticidade.
        </p>
        <button className="bg-white text-gray-900 px-8 py-3 rounded-full shadow-lg hover:bg-gray-100 transition">
          Explorar imóveis
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
