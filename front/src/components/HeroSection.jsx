import './index.css';


const HeroSection = () => {
    return (
        <header className="hero-section">
            <video autoPlay muted loop className="hero-video">
                <source src="https://assets.mixkit.co/videos/preview/mixkit-waves-at-the-beach-1499-large.mp4" type="video/mp4" />
                Seu navegador não suporta o vídeo.
            </video>
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <h1>Sua Próxima Aventura Começa Aqui</h1>
                <p>Imóveis à Beira-Mar, Seu Sonho Realizado</p>
                <div className="search-bar">
                    <input type="text" placeholder="Localização (Ex: Búzios, Guarujá)" />
                    <select>
                        <option value="">Tipo de Imóvel</option>
                        <option value="casa">Casa</option>
                        <option value="apartamento">Apartamento</option>
                        <option value="terreno">Terreno</option>
                        <option value="cobertura">Cobertura</option>
                    </select>
                    <button className="button">Buscar</button>
                </div>
            </div>
        </header>
    );
};

export default HeroSection;
