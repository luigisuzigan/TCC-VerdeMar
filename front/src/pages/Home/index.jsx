import Header from '../../components/Header';
import HeroSection from '../../components/HeroSection';
import ObjetivoCards from '../../components/ObjetivoCards';
import EstilosVidaCards from '../../components/EstilosVidaCards';
import Testimonials from '../../components/Testimonials';
import BlogSection from '../../components/BlogSection';
import NearbyProperties from '../../components/section1';

function Home() {
    return (
        <>
            <Header />
            <HeroSection />
            <NearbyProperties />
            <NearbyProperties />
            <ObjetivoCards />
            <EstilosVidaCards />
            <Testimonials />
            <BlogSection />
        </>
    );
}

export default Home;