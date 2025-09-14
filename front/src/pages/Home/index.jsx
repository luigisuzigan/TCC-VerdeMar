import HeroSection from '../../components/HeroSection';
import ObjetivoCards from '../../components/ObjetivoCards';
import EstilosVidaCards from '../../components/EstilosVidaCards';
import Testimonials from '../../components/Testimonials';
import BlogSection from '../../components/BlogSection';
import NearbyProperties from '../../components/section1'; // Section 1 — Imóveis próximos

function Home() {
  return (
    <>
      {/* Header agora vem do MainLayout */}
      <HeroSection />
      <NearbyProperties />
      <ObjetivoCards />
      <EstilosVidaCards />
      <Testimonials />
      <BlogSection />
    </>
  );
}

export default Home;