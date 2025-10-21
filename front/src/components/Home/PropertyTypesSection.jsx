import { Link } from 'react-router-dom';
import { Home, Building2, TreePine, Castle, LandPlot, Building } from 'lucide-react';

export default function PropertyTypesSection() {
  const propertyTypes = [
    {
      icon: Home,
      title: 'Casas de Luxo',
      description: 'Casas sofisticadas com acabamento premium',
      count: '380+',
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      filter: 'type=Casa',
    },
    {
      icon: Building2,
      title: 'Apartamentos',
      description: 'Modernos e com vista privilegiada',
      count: '520+',
      color: 'teal',
      gradient: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-600',
      filter: 'type=Apartamento',
    },
    {
      icon: Building,
      title: 'Coberturas',
      description: 'Exclusividade e vista panorâmica',
      count: '95+',
      color: 'purple',
      gradient: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      filter: 'type=Cobertura',
    },
    {
      icon: TreePine,
      title: 'Chalés',
      description: 'Aconchego em meio à natureza',
      count: '140+',
      color: 'green',
      gradient: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      filter: 'type=Chalé',
    },
    {
      icon: Castle,
      title: 'Condomínios',
      description: 'Segurança e infraestrutura completa',
      count: '280+',
      color: 'amber',
      gradient: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      filter: 'type=Condomínio',
    },
    {
      icon: LandPlot,
      title: 'Terrenos',
      description: 'Invista e construa seu sonho',
      count: '220+',
      color: 'rose',
      gradient: 'from-rose-500 to-rose-600',
      bgColor: 'bg-rose-50',
      textColor: 'text-rose-600',
      filter: 'type=Terreno',
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium mb-4">
            <Home size={16} />
            Categorias
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Tipos de Propriedades
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Encontre o imóvel perfeito para seu estilo de vida
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {propertyTypes.map((type, index) => {
            const IconComponent = type.icon;
            return (
              <Link
                key={index}
                to={`/explorar?${type.filter}`}
                className="group relative bg-white rounded-2xl p-8 border-2 border-slate-100 hover:border-transparent hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Background Gradient on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-16 h-16 ${type.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors`}>
                    <IconComponent 
                      size={32} 
                      className={`${type.textColor} group-hover:text-white transition-colors`}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-white transition-colors">
                    {type.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 mb-4 group-hover:text-white/80 transition-colors">
                    {type.description}
                  </p>

                  {/* Count + Arrow */}
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-semibold ${type.textColor} group-hover:text-white transition-colors`}>
                      {type.count} imóveis
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-white/20 flex items-center justify-center transition-all group-hover:translate-x-1">
                      <svg 
                        className={`w-4 h-4 ${type.textColor} group-hover:text-white transition-colors`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-teal-50 rounded-3xl">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">1.6K+</div>
              <div className="text-slate-600">Imóveis Disponíveis</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-teal-600 mb-2">200+</div>
              <div className="text-slate-600">Cidades Atendidas</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">5K+</div>
              <div className="text-slate-600">Clientes Felizes</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-600 mb-2">4.9★</div>
              <div className="text-slate-600">Avaliação Média</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
