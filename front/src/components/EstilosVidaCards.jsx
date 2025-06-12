import './index.css';

const EstilosVidaCards = () => {
    return (
        <section className="category-section container">
            <h2>Explore Diferentes Estilos de Vida na Praia</h2>
            <div className="card-grid">
                <div className="card">
                    <img src="https://source.unsplash.com/random/400x220/?luxury-beach-villa" alt="Casas de Luxo" />
                    <div className="card-content">
                        <h3>Casas de Luxo</h3>
                        <p>O que há de melhor em conforto e exclusividade à beira-mar.</p>
                        <a href="#" className="button">Ver Mais</a>
                    </div>
                </div>
                <div className="card">
                    <img src="https://source.unsplash.com/random/400x220/?oceanfront-apartment" alt="Apartamentos Pé na Areia" />
                    <div className="card-content">
                        <h3>Apartamentos Pé na Areia</h3>
                        <p>Acorde com a brisa do mar e a vista deslumbrante.</p>
                        <a href="#" className="button">Ver Mais</a>
                    </div>
                </div>
                <div className="card">
                    <img src="https://source.unsplash.com/random/400x220/?beach-land-view" alt="Terrenos para Construir" />
                    <div className="card-content">
                        <h3>Terrenos para Construir</h3>
                        <p>Crie o lar dos seus sonhos do zero, com a sua cara.</p>
                        <a href="#" className="button">Ver Mais</a>
                    </div>
                </div>
                <div className="card">
                    <img src="https://source.unsplash.com/random/400x220/?beach-seasonal-rental" alt="Imóveis para Temporada" />
                    <div className="card-content">
                        <h3>Imóveis para Temporada</h3>
                        <p>Escapadas perfeitas para curtir feriados e férias com estilo.</p>
                        <a href="#" className="button">Ver Mais</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EstilosVidaCards;
