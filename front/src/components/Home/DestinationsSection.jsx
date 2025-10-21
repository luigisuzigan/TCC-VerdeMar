import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

export default function DestinationsSection() {
  const destinations = [
    {
      name: 'Litoral de São Paulo',
      region: 'SP',
      properties: '350+',
      image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&q=80',
      highlights: ['Guarujá', 'Santos', 'Ubatuba'],
    },
    {
      name: 'Rio de Janeiro',
      region: 'RJ',
      properties: '280+',
      image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&q=80',
      highlights: ['Copacabana', 'Ipanema', 'Búzios'],
    },
    {
      name: 'Santa Catarina',
      region: 'SC',
      properties: '420+',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
      highlights: ['Florianópolis', 'Balneário', 'Bombinhas'],
    },
    {
      name: 'Bahia',
      region: 'BA',
      properties: '190+',
      image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=800&q=80',
      highlights: ['Porto Seguro', 'Morro de SP', 'Trancoso'],
    },
    {
      name: 'Nordeste',
      region: 'CE/PE/RN',
      properties: '240+',
      image: 'https://images.unsplash.com/photo-1624394546256-c221e00986df?w=800&q=80',
      highlights: ['Fortaleza', 'Recife', 'Natal'],
    },
    {
      name: 'Paraná',
      region: 'PR',
      properties: '150+',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      highlights: ['Guaratuba', 'Matinhos', 'Pontal'],
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-4">
            <MapPin size={16} />
            Explore o Brasil
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Destinos Populares
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Descubra imóveis incríveis nas melhores regiões litorâneas do Brasil
          </p>
        </div>

        {/* Grid de Destinos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, index) => (
            <Link
              key={index}
              to={`/explorar?region=${dest.region}`}
              className="group relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${dest.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                {/* Badge com quantidade */}
                <div className="absolute top-6 right-6 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-slate-800">
                  {dest.properties} imóveis
                </div>

                {/* Info */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {dest.name}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {dest.highlights.map((place, i) => (
                      <span 
                        key={i}
                        className="text-xs px-2 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full"
                      >
                        {place}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-teal-400 font-medium">
                    <span>Explorar região</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/explorar"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-full font-semibold hover:shadow-xl transition-all hover:scale-105"
          >
            Ver Todos os Destinos
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
