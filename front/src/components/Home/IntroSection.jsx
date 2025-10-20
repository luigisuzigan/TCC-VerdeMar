import React, { useEffect, useRef } from 'react';

export default function IntroSection() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (textRef.current) observer.observe(textRef.current);
    if (imageRef.current) observer.observe(imageRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 to-white py-20"
    >
      {/* Background decorativo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Texto - Lado Esquerdo */}
          <div 
            ref={textRef}
            className="opacity-0 transition-all duration-1000 ease-out space-y-8"
          >
            {/* Badge/Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Novidade VerdeMar
            </div>

            {/* Título Principal */}
            <div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                  Imóveis
                </span>
                <br />
                <span className="text-slate-800">
                  é nossa praia
                </span>
              </h2>
              
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full" />
            </div>

            {/* Descrição */}
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl">
              Encontre o imóvel perfeito com facilidade e segurança. 
              Navegue por milhares de opções cuidadosamente selecionadas, 
              desde apartamentos modernos até casas de praia dos seus sonhos.
            </p>

            {/* Features List */}
            <div className="space-y-4">
              {[
                { icon: '🏖️', text: 'Imóveis à beira-mar selecionados' },
                { icon: '🔍', text: 'Busca inteligente e personalizada' },
                { icon: '✨', text: 'Experiência premium do início ao fim' },
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 text-slate-700"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-base md:text-lg">{item.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href="/explorar"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Explorar Imóveis
                <svg 
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              
              <a 
                href="#saiba-mais"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-700 rounded-full font-semibold border-2 border-slate-200 hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
              >
                Saiba Mais
              </a>
            </div>
          </div>

          {/* Imagem/Visual - Lado Direito */}
          <div 
            ref={imageRef}
            className="opacity-0 transition-all duration-1000 ease-out delay-300 relative"
          >
            {/* Card de Imóvel Mockup */}
            <div className="relative">
              {/* Imagem Principal */}
              <div className="rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                <img 
                  src="/Home/hero.jpg" 
                  alt="Imóvel VerdeMar"
                  className="w-full h-[500px] object-cover"
                />
                
                {/* Overlay com info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Info Card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 mb-1">
                        Casa de Praia Premium
                      </h3>
                      <p className="text-sm text-slate-600">
                        Balneário Camboriú, SC
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-600">A partir de</p>
                      <p className="text-2xl font-bold text-blue-600">
                        R$ 850k
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <span>3 quartos</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                      </svg>
                      <span>120m²</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>Vista mar</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Elementos decorativos flutuantes */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500 rounded-2xl opacity-20 blur-xl animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-teal-500 rounded-2xl opacity-20 blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Stats Cards */}
            <div className="absolute -left-6 top-20 bg-white rounded-2xl shadow-xl p-4 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">+500</p>
                  <p className="text-sm text-slate-600">Imóveis</p>
                </div>
              </div>
            </div>

            <div className="absolute -right-6 bottom-32 bg-white rounded-2xl shadow-xl p-4 animate-float" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">98%</p>
                  <p className="text-sm text-slate-600">Satisfação</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        .opacity-0 {
          transform: translateY(30px);
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
