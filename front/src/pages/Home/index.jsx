import React from 'react';

export default function HomePage() {
  return (
    <div className="font-sans bg-white text-gray-800">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-4 shadow-md">
        <div className="flex items-center gap-2">
          <img src="/logo-verdemar.png" alt="Logo Verde Mar" className="h-8" />
          <h1 className="text-xl font-bold">Verde Mar</h1>
        </div>
        <nav className="hidden md:flex gap-6">
          <a href="#" className="hover:text-teal-600">Home</a>
          <a href="#" className="hover:text-teal-600">Discover</a>
          <a href="#" className="hover:text-teal-600">Activities</a>
          <a href="#" className="hover:text-teal-600">About</a>
          <a href="#" className="hover:text-teal-600">Contact</a>
        </nav>
        <div>
          <button className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300">
            <i className="fas fa-user"></i>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full h-[400px] bg-cover bg-center rounded-b-2xl overflow-hidden mt-4 border-2 border-blue-500 mx-4"
        style={{ backgroundImage: `url('/bg-hero-verdemar.jpg')` }}>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white text-center px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">BUILD YOUR DREAMS</h2>
          <p className="text-sm md:text-base max-w-xl">Search your houses, apartments, condominiums, farms and other places to buy</p>
          <div className="mt-6">
            <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition">Search</button>
          </div>
        </div>
      </section>

      {/* Property Sections */}
      <section className="mt-12 px-6">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold">Beach Homes</h3>
          <p className="text-gray-500 text-sm">Plan and book our perfect trip with expert advice, travel tips, destination information and inspiration from us</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={`/beach${i + 1}.jpg`} alt="Beach Home" className="h-40 w-full object-cover" />
              <div className="p-4">
                <p className="font-bold text-lg text-gray-800">${(Math.random() * 5000000 + 2000000).toFixed(0)}</p>
                <p className="text-sm text-gray-500">{Math.floor(Math.random() * 2000)} properties</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 px-6 pb-16">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold">Apartamentos</h3>
          <p className="text-gray-500 text-sm">Plan and book our perfect trip with expert advice, travel tips, destination information and inspiration from us</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={`/apartment${i + 1}.jpg`} alt="Apartment" className="h-40 w-full object-cover" />
              <div className="p-4">
                <p className="font-bold text-lg text-gray-800">${(Math.random() * 5000000 + 2000000).toFixed(0)}</p>
                <p className="text-sm text-gray-500">{Math.floor(Math.random() * 2000)} properties</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
