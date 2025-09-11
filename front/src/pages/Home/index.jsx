
import HeroSection from '../../components/HeroSection';
import ObjetivoCards from '../../components/ObjetivoCards';
import EstilosVidaCards from '../../components/EstilosVidaCards';
import Testimonials from '../../components/Testimonials';
import BlogSection from '../../components/BlogSection';

export default function Home() {
    return (
        <>
            <HeroSection />
            <ObjetivoCards />
            <EstilosVidaCards />
            <Testimonials />
            <BlogSection />
        </>
    );
}
