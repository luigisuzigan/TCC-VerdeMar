
import HeroSection from '../../components/HeroSection';
import ObjetivoCards from '../../components/ObjetivoCards';
import EstilosVidaCards from '../../components/EstilosVidaCards';
import Testimonials from '../../components/Testimonials';
import BlogSection from '../../components/BlogSection';
import Footer from '../../components/Footer';
import Header from '../../components/Header';


function App() {
    return (
        <>
            <Header/>
            <HeroSection />
            <ObjetivoCards />
            <EstilosVidaCards />
            <Testimonials />
            <BlogSection />
            <Footer />
        </>
    );
}

export default App;
