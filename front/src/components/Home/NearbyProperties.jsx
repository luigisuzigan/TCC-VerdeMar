import React, { useEffect, useState, useRef } from 'react';
import { api } from '../../api/client';
import { Link } from 'react-router-dom';

export default function NearbyProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const response = await api.get(`/properties?limit=10&published=true&_t=${Date.now()}`);
        setProperties(response.data.items || []);
      } catch (error) {
        console.error('Erro ao carregar imóveis:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProperties();
  }, []);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = container.offsetWidth / getCardsPerView();
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });

    // Atualizar índice
    if (direction === 'right') {
      setCurrentIndex(prev => Math.min(prev + 1, properties.length - getCardsPerView()));
    } else {
      setCurrentIndex(prev => Math.max(prev - 1, 0));
    }
  };

  const getCardsPerView = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <div className="h-8 bg-slate-200 rounded w-64 mx-auto mb-4 animate-pulse" />
            <div className="h-4 bg-slate-200 rounded w-96 mx-auto animate-pulse" />
          </div>
          <div className="flex gap-6 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-slate-100 rounded-3xl h-[450px] min-w-[350px] animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex < properties.length - getCardsPerView();

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-600 rounded-full text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Imóveis em Destaque
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Próximos de Você
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Descubra imóveis incríveis nas melhores localizações, 
            prontos para realizar o seu sonho
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Botão Esquerda */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-blue-50 hover:scale-110 transition-all duration-300 group"
              aria-label="Anterior"
            >
              <svg className="w-6 h-6 text-slate-700 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {properties.map((property) => (
              <div key={property.id} className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                <PropertyCard property={property} />
              </div>
            ))}
          </div>

          {/* Botão Direita */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-blue-50 hover:scale-110 transition-all duration-300 group"
              aria-label="Próximo"
            >
              <svg className="w-6 h-6 text-slate-700 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {/* Indicadores */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(properties.length / getCardsPerView()) }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentIndex(i);
                const container = scrollContainerRef.current;
                if (container) {
                  const cardWidth = container.offsetWidth / getCardsPerView();
                  container.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
                }
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                Math.floor(currentIndex / getCardsPerView()) === i
                  ? 'w-8 bg-blue-600'
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Ir para página ${i + 1}`}
            />
          ))}
        </div>

        {/* Ver Mais */}
        <div className="text-center mt-12">
          <Link
            to="/explorar"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Ver Todos os Imóveis
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

function PropertyCard({ property }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const firstImage = property.images?.[0] || '/Home/hero.jpg';
  const price = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: property.currency || 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(property.price);

  // Abreviar preço (ex: R$ 850k)
  const formatShortPrice = (value) => {
    if (value >= 1000000) {
      return `R$ ${(value / 1000000).toFixed(1)}mi`;
    }
    if (value >= 1000) {
      return `R$ ${(value / 1000).toFixed(0)}k`;
    }
    return price;
  };

  return (
    <Link
      to={`/property/${property.id}`}
      className="group block h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] h-full">
        {/* Imagem */}
        <div className="relative h-[450px] overflow-hidden">
          <img
            src={firstImage}
            alt={property.title}
            className={`w-full h-full object-cover transition-transform duration-700 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Info Card - Estilo exato da imagem */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md p-5 m-4 rounded-2xl shadow-xl">
          <div className="flex items-start justify-between mb-3">
            {/* Título e Localização */}
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-800 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
                {property.title}
              </h3>
              <p className="text-sm text-slate-600 mb-3">
                {property.city}, {property.country}
              </p>
            </div>

            {/* Preço - Lado direito */}
            <div className="text-right ml-4">
              <p className="text-xs text-slate-500 mb-0.5">A partir de</p>
              <p className="text-2xl font-bold text-blue-600 whitespace-nowrap">
                {formatShortPrice(property.price)}
              </p>
            </div>
          </div>

          {/* Características - Ícones menores */}
          <div className="flex items-center gap-3 text-sm text-slate-600">
            {property.beds > 0 && (
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="whitespace-nowrap">{property.beds} {property.beds === 1 ? 'quarto' : 'quartos'}</span>
              </div>
            )}
            
            {property.baths > 0 && (
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
                <span className="whitespace-nowrap">{property.baths} {property.baths === 1 ? 'banheiro' : 'banheiros'}</span>
              </div>
            )}
            
            {property.totalArea > 0 && (
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                <span className="whitespace-nowrap">{property.totalArea}m²</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
