import React, { useState } from "react";

const bgUrl = "/Home/hero.jpg";

export default function HeroSection() {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");

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
          Explore the World, One
          <br />
          Journey at a Time.
        </h1>
        
        {/* Subtítulo */}
        <p className="mb-10 text-base text-white/90 sm:text-lg md:text-xl">
          Our travel agency offers personalized travel experiences that connect you with
          <br className="hidden sm:block" />
          the most stunning destinations around the world.
        </p>

        {/* Search Box */}
        <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow-xl">
          {/* Tabs */}
          <div className="mb-6 flex flex-wrap gap-2">
            <button className="rounded-full bg-emerald-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">
              All Residence
            </button>
            <button className="rounded-full bg-slate-100 px-6 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">
              Rent
            </button>
            <button className="rounded-full bg-slate-100 px-6 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">
              Sell
            </button>
            <button className="rounded-full bg-slate-100 px-6 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">
              Apartment
            </button>
            <button className="rounded-full bg-slate-100 px-6 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">
              Villa
            </button>
          </div>

          {/* Search Fields */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
            {/* Location */}
            <div className="flex flex-col">
              <label className="mb-1 text-left text-sm font-semibold text-slate-700">
                Location
              </label>
              <input
                type="text"
                placeholder="Enter a destination"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            {/* Check-in */}
            <div className="flex flex-col">
              <label className="mb-1 text-left text-sm font-semibold text-slate-700">
                Check-in
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            {/* Check-out */}
            <div className="flex flex-col">
              <label className="mb-1 text-left text-sm font-semibold text-slate-700">
                Check-out
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            {/* Participant */}
            <div className="flex flex-col">
              <label className="mb-1 text-left text-sm font-semibold text-slate-700">
                Participant
              </label>
              <input
                type="text"
                placeholder="Add guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            {/* Search Button */}
            <div className="flex flex-col justify-end">
              <button className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-2.5 font-semibold text-white shadow-lg transition hover:bg-emerald-700">
                <svg 
                  viewBox="0 0 24 24" 
                  className="h-5 w-5" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                </svg>
                Search Residence
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
