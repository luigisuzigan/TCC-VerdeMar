import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';
import { Link } from 'react-router-dom';

export default function NearbyProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const response = await api.get('/properties?limit=6&published=true');
        setProperties(response.data.items || []);
      } catch (error) {
        console.error('Erro ao carregar imóveis:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProperties();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <div className="h-8 bg-slate-200 rounded w-64 mx-auto mb-4 animate-pulse" />
            <div className="h-4 bg-slate-200 rounded w-96 mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-slate-100 rounded-3xl h-96 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
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

        {/* Grid de Imóveis */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
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
  }).format(property.price);

  return (
    <Link
      to={`/imovel/${property.id}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
        {/* Imagem */}
        <div className="relative h-80 overflow-hidden">
          <img
            src={firstImage}
            alt={property.title}
            className={`w-full h-full object-cover transition-transform duration-700 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          {/* Badge - Tipo do Imóvel */}
          {property.type && (
            <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-xs font-semibold text-slate-700 shadow-lg">
              {property.type}
            </div>
          )}

          {/* Rating */}
          {property.rating && (
            <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-xs font-semibold text-slate-700 shadow-lg flex items-center gap-1">
              <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              {property.rating.toFixed(1)}
            </div>
          )}
        </div>

        {/* Info Card */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md p-6 m-4 rounded-2xl shadow-xl transform transition-all duration-300">
          {/* Título e Localização */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
              {property.title}
            </h3>
            <p className="text-sm text-slate-600 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {property.city}, {property.country}
            </p>
          </div>

          {/* Características */}
          <div className="flex items-center gap-4 text-sm text-slate-600 mb-4 pb-4 border-b border-slate-200">
            {property.beds > 0 && (
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>{property.beds} quartos</span>
              </div>
            )}
            
            {property.baths > 0 && (
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
                <span>{property.baths} banheiros</span>
              </div>
            )}
            
            {property.area > 0 && (
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                <span>{property.area}m²</span>
              </div>
            )}
          </div>

          {/* Preço e CTA */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 mb-1">A partir de</p>
              <p className="text-2xl font-bold text-blue-600">
                {price}
              </p>
            </div>
            
            <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
              Ver detalhes
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
