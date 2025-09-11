import React from "react";

const HeroSection = () => {
  return (
    <section className="relative bg-cover bg-center bg-no-repeat min-h-[70vh] px-8 py-32 text-white text-center overflow-hidden"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')" }}
    >
      {/* Enhanced gradient overlay */}
      <div 
        className="absolute inset-0 z-0 rounded-b-[30px]"
        style={{ background: 'linear-gradient(135deg, rgba(26, 54, 93, 0.8) 0%, rgba(13, 148, 136, 0.7) 50%, rgba(242, 130, 52, 0.6) 100%)' }}
      ></div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-8">
        <h1 className="text-5xl md:text-6xl font-bold tracking-wide text-balance leading-tight font-display">
          <span style={{ background: 'var(--gradient-hero)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3))' }}>
            BUILD YOUR DREAMS
          </span>
        </h1>
        <p className="text-xl font-normal leading-relaxed text-white/90 max-w-2xl">
          Search your houses, apartments, condominiums, farms and other places to buy
        </p>
        <button className="bg-white text-ocean-950 px-12 py-4 rounded-full shadow-xl hover:shadow-2xl hover:bg-neutral-50 transition-all duration-300 font-semibold text-lg">
          Search
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
