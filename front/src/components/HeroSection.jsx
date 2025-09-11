import React from "react";

const HeroSection = () => {
  return (
    <section className="relative bg-cover bg-center bg-no-repeat min-h-[550px] px-8 py-32 text-white text-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')" }}
    >
      {/* Overlay with gradient for better header readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/60 z-0 rounded-b-[30px]"></div>

      <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center gap-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-wide drop-shadow">BUILD YOUR DREAMS</h1>
        <p className="text-lg font-normal leading-relaxed">Search your houses, apartments, condominiums, farms and other places to buy</p>
        <button className="bg-white text-gray-800 px-10 py-3 rounded-full shadow-lg hover:bg-gray-100 transition-all">
          Search
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
