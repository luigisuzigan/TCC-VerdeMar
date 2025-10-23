import { Link } from 'react-router-dom';

export default function Sobre() {
  const stats = [
    { value: '1.2K+', label: 'IMÓVEIS ATIVOS' },
    { value: '850+', label: 'CLIENTES SATISFEITOS' },
    { value: '4.9', label: 'AVALIAÇÃO MÉDIA' },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white text-sm font-medium mb-6">
            IMÓVEIS & LIFESTYLE
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Realizando Sonhos<br />Imobiliários
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Encontre seu refúgio perfeito em qualquer lugar do Brasil
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/explorar"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-full font-semibold hover:shadow-xl transition-all hover:scale-105"
            >
              EXPLORAR IMÓVEIS
            </Link>
            <Link
              to="/contato"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold border border-white/30 hover:bg-white/20 transition-all"
            >
              FALE CONOSCO
            </Link>
          </div>
        </div>
      </section>

      {/* About Section with Photo Collage */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Photo Collage */}
            <div className="relative h-[600px]">
              {/* Main large photo */}
              <div 
                className="absolute top-0 left-0 w-3/5 h-3/5 rounded-2xl shadow-2xl overflow-hidden transform -rotate-2"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              
              {/* Top right photo */}
              <div 
                className="absolute top-8 right-0 w-2/5 h-2/5 rounded-xl shadow-xl overflow-hidden transform rotate-3"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />

              {/* Bottom left small photo */}
              <div 
                className="absolute bottom-12 left-4 w-2/5 h-1/3 rounded-xl shadow-xl overflow-hidden transform -rotate-3"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />

              {/* Bottom right photo */}
              <div 
                className="absolute bottom-0 right-4 w-2/5 h-2/5 rounded-xl shadow-xl overflow-hidden transform rotate-2"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </div>

            {/* Text Content */}
            <div>
              <div className="inline-block px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-4">
                QUEM SOMOS
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Sua Ponte para os Sonhos Imobiliários
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                A VerdeMar nasceu da paixão por conectar pessoas aos melhores imóveis em todo o Brasil. 
                Combinamos tecnologia de ponta com atendimento humanizado para tornar sua jornada inesquecível.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Seja para investir, morar ou relaxar, nossa missão é transformar o sonho da 
                casa ideal em realidade, com transparência, segurança e dedicação em cada detalhe.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <div key={index}>
                    <div className="text-3xl font-bold text-teal-600 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-slate-600 font-medium uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section with Background */}
      <section className="relative py-32 px-4 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-slate-900/75" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Encontre sua força, descubra<br />seu lar ideal
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Cada imóvel que apresentamos é cuidadosamente selecionado. Cada cliente, 
            atendido com dedicação exclusiva. Acreditamos que encontrar o lar perfeito 
            é mais que uma transação – é realizar um sonho.
          </p>
          <Link
            to="/explorar"
            className="inline-block px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full font-semibold hover:shadow-2xl transition-all hover:scale-105"
          >
            DESCUBRA MAIS
          </Link>
        </div>
      </section>
    </main>
  );
}