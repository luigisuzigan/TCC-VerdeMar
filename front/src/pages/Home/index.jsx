import HeroSection from '../../components/Home/HeroSection';
import IntroSection from '../../components/Home/IntroSection';
import PropertyTypesSection from '../../components/Home/PropertyTypesSection';
import FeaturedProperties from '../../components/Home/FeaturedProperties';
import DestinationsSection from '../../components/Home/DestinationsSection';
import NearbyProperties from '../../components/Home/NearbyProperties';
import Section7 from '../../components/Home/Section7';

function Home() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <NearbyProperties />
      <PropertyTypesSection /> {/* 💎 Nova: Tipos de Propriedades */}
      <FeaturedProperties /> {/* 🌟 Nova: Destaques da Semana */}
      <DestinationsSection /> {/* 📍 Nova: Destinos Populares */}
      <Section7 /> {/* 🎨 Estilos em Destaque */}
    </>
  );
}

export default Home;