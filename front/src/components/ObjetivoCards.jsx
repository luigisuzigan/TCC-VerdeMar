import './index.css';

const ObjetivoCards = () => {
    return (
        <section className="action-section container">
            <h2>Qual é o Seu Objetivo?</h2>
            <div className="card-grid">
                <div className="card">
                    <img src="https://source.unsplash.com/random/400x220/?beach-house-luxury" alt="Comprar Imóvel" />
                    <div className="card-content">
                        <h3>Comprar</h3>
                        <p>Encontre a casa dos seus sonhos, onde o mar encontra você.</p>
                        <a href="#" className="button">Ver Imóveis</a>
                    </div>
                </div>
                <div className="card">
                    <img src="https://source.unsplash.com/random/400x220/?beach-apartment-rent" alt="Alugar Imóvel" />
                    <div className="card-content">
                        <h3>Alugar</h3>
                        <p>Viva a praia o ano todo ou desfrute de uma temporada inesquecível.</p>
                        <a href="#" className="button">Ver Aluguéis</a>
                    </div>
                </div>
                <div className="card">
                    <img src="https://source.unsplash.com/random/400x220/?beach-land-investment" alt="Investir em Imóvel" />
                    <div className="card-content">
                        <h3>Investir</h3>
                        <p>Construa seu futuro patrimônio com as melhores oportunidades no litoral.</p>
                        <a href="#" className="button">Ver Oportunidades</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ObjetivoCards;
