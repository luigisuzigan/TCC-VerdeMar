import { useState, useEffect } from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import StyleCard from './StyleCard';

/**
 * Seção mostrando diferentes estilos arquitetônicos disponíveis
 */
export default function Section7() {
  const [loading, setLoading] = useState(true);

  // Estilos em destaque (você pode buscar do backend depois)
  const featuredStyles = [
    {
      value: 'Moderno',
      name: 'Moderno',
      badge: '🏙️ Moderno',
      description: 'Design contemporâneo com linhas retas, minimalismo e tecnologia integrada',
      image: '/Home/styles/modern.jpg', // Você precisa adicionar essas imagens
      count: 45, // Depois você busca do backend
    },
    {
      value: 'Rústico',
      name: 'Rústico',
      badge: '🌾 Rústico',
      description: 'Charme natural com madeira, pedras e aconchego do campo',
      image: '/Home/styles/rustic.jpg',
      count: 28,
    },
    {
      value: 'Container',
      name: 'Container',
      badge: '📦 Container',
      description: 'Sustentável e moderno, construído com containers marítimos',
      image: '/Home/styles/container.jpg',
      count: 12,
    },
    {
      value: 'Luxo',
      name: 'Luxo',
      badge: '💎 Luxo',
      description: 'Alto padrão com acabamentos premium e exclusividade',
      image: '/Home/styles/luxury.jpg',
      count: 38,
    },
    {
      value: 'Industrial',
      name: 'Industrial',
      badge: '🏭 Industrial',
      description: 'Concreto aparente, tijolo à vista e pé-direito alto',
      image: '/Home/styles/industrial.jpg',
      count: 22,
    },
    {
      value: 'Tropical',
      name: 'Tropical',
      badge: '🌴 Tropical',
      description: 'Integração com a natureza e materiais naturais',
      image: '/Home/styles/tropical.jpg',
      count: 34,
    },
  ];

  useEffect(() => {
    // Simula carregamento
    setTimeout(() => setLoading(false), 500);
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="h-12 bg-slate-200 animate-pulse rounded-lg w-1/3 mx-auto mb-16" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 bg-slate-200 animate-pulse rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-4">
            <Sparkles size={18} className="text-blue-600" />
            <span className="text-sm font-semibold text-blue-600">Encontre seu estilo</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Estilos em Destaque
          </h2>
          
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Do clássico ao contemporâneo, do rústico ao ultramoderno. 
            Descubra o estilo perfeito para o seu novo lar.
          </p>
        </div>

        {/* Grid de estilos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {featuredStyles.map((style) => (
            <StyleCard key={style.value} style={style} />
          ))}
        </div>

        {/* Ver todos os estilos */}
        <div className="text-center">
          <Link
            to="/explorar"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors group"
          >
            Ver todos os imóveis
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
