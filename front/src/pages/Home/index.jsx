import HeroSection from '../../components/Home/HeroSection';
import IntroSection from '../../components/Home/IntroSection';
import NearbyProperties from '../../components/Home/NearbyProperties';
import Section7 from '../../components/Home/Section7';

function Home() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <NearbyProperties />
      <Section7 /> {/* 🎨 Estilos em Destaque */}
    </>
  );
}

export default Home;