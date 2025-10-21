import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Home, Maximize, Bath, BedDouble, ChevronLeft, ChevronRight } from 'lucide-react';

export default function FeaturedProperties() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Dados mockados - depois pode vir da API
  const featuredProperties = [
    {
      id: 1,
      title: 'Cobertura Duplex Frente Mar',
      location: 'Balneário Camboriú, SC',
      price: 2500000,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      bedrooms: 4,
      bathrooms: 3,
      area: 280,
      type: 'Cobertura',
      featured: true,
    },
    {
      id: 2,
      title: 'Casa de Luxo com Piscina',
      location: 'Guarujá, SP',
      price: 1800000,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
      bedrooms: 5,
      bathrooms: 4,
      area: 350,
      type: 'Casa',
      featured: true,
    },
    {
      id: 3,
      title: 'Apartamento Vista Panorâmica',
      location: 'Copacabana, RJ',
      price: 1200000,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      bedrooms: 3,
      bathrooms: 2,
      area: 180,
      type: 'Apartamento',
      featured: true,
    },
    {
      id: 4,
      title: 'Chalé Rústico à Beira-Mar',
      location: 'Ubatuba, SP',
      price: 950000,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      bedrooms: 3,
      bathrooms: 2,
      area: 220,
      type: 'Chalé',
      featured: true,
    },
    {
      id: 5,
      title: 'Mansão Moderna com Cinema',
      location: 'Florianópolis, SC',
      price: 3200000,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      bedrooms: 6,
      bathrooms: 5,
      area: 450,
      type: 'Casa',
      featured: true,
    },
    {
      id: 6,
      title: 'Apartamento Compacto Moderno',
      location: 'Santos, SP',
      price: 680000,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      bedrooms: 2,
      bathrooms: 2,
      area: 95,
      type: 'Apartamento',
      featured: true,
    },
  ];

  const itemsPerView = 3;
  const maxIndex = Math.max(0, featuredProperties.length - itemsPerView);

  const next = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-600 rounded-full text-sm font-medium mb-4">
              <Star size={16} fill="currentColor" />
              Seleção Especial
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Destaques da Semana
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl">
              Imóveis premium cuidadosamente selecionados para você
            </p>
          </div>

          {/* Navigation Buttons - Desktop */}
          <div className="hidden md:flex gap-2">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg flex items-center justify-center text-slate-600 hover:text-blue-600 transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg flex items-center justify-center text-slate-600 hover:text-blue-600 transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-out gap-6"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / itemsPerView + 2)}%)` 
            }}
          >
            {featuredProperties.map((property) => (
              <div
                key={property.id}
                className="flex-shrink-0 w-full md:w-[calc(33.333%-16px)]"
              >
                <Link
                  to={`/property/${property.id}`}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full">
                        DESTAQUE
                      </span>
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-semibold rounded-full">
                        {property.type}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-2xl font-bold text-white">
                        {formatPrice(property.price)}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {property.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-slate-600 mb-4">
                      <MapPin size={16} />
                      <span className="text-sm">{property.location}</span>
                    </div>

                    {/* Features */}
                    <div className="flex items-center gap-4 text-sm text-slate-600 pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-1">
                        <BedDouble size={16} />
                        <span>{property.bedrooms} quartos</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath size={16} />
                        <span>{property.bathrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Maximize size={16} />
                        <span>{property.area}m²</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Dots - Mobile */}
        <div className="flex justify-center gap-2 mt-8 md:hidden">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentIndex === index ? 'bg-blue-600 w-8' : 'bg-slate-300'
              }`}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/explorar"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-700 rounded-full font-semibold border-2 border-slate-200 hover:border-blue-500 hover:text-blue-600 transition-all"
          >
            Ver Todos os Imóveis
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
