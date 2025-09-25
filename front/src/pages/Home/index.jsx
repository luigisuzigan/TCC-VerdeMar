import HeroSection from '../../components/Home/HeroSection';
import Section1 from '../../components/Home/Section1';
import Section2 from '../../components/Home/Section2';
import Section3 from '../../components/Home/Section3';
import Section4 from '../../components/Home/Section4';
import Section5 from '../../components/Home/Section5';
import Section6 from '../../components/Home/Section6';
import CondoCarousel from '../../components/Home/CondoCarousel';

function Home() {
  return (
    <>
      <HeroSection />
      <Section1 />
      {/* Você pode recolocar depois ou mover: */}
      {/* <NearbyProperties /> */}
      <Section2 />
      <CondoCarousel />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
    </>
  );
}

export default Home;