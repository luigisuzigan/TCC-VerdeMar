import HeroSection from '../../components/Home/HeroSection';
import Section1 from '../../components/Home/Section1';
import Section2 from '../../components/Home/Section2';
import Section3 from '../../components/Home/Section3';
import Section4 from '../../components/Home/Section4';
import Section5 from '../../components/Home/Section5';
// import NearbyProperties from '../../components/section1'; // removido por enquanto

function Home() {
  return (
    <>
      <HeroSection />
      <Section1 />
      {/* Você pode recolocar depois ou mover: */}
      {/* <NearbyProperties /> */}
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
    </>
  );
}

export default Home;