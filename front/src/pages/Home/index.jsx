import HeroSection from '../../components/HeroSection';
import PromoBanners from '../../components/Home/PromoBanners';
import ObjetivoCards from '../../components/ObjetivoCards';
import EstilosVidaCards from '../../components/EstilosVidaCards';
import Testimonials from '../../components/Testimonials';
import BlogSection from '../../components/BlogSection';
// import NearbyProperties from '../../components/section1'; // removido por enquanto

function Home() {
  return (
    <>
      <HeroSection />
      <PromoBanners />
      {/* Você pode recolocar depois ou mover: */}
      {/* <NearbyProperties /> */}
      <ObjetivoCards />
      <EstilosVidaCards />
      <Testimonials />
      <BlogSection />
    </>
  );
}

export default Home;