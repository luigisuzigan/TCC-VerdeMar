import './index.css';

const BlogSection = () => {
    return (
        <section className="blog-section container">
            <h2>Dicas e Destinos do Litoral</h2>
            <div className="card-grid">
                <div className="blog-card">
                    <img src="https://source.unsplash.com/random/400x180/?beach-lifestyle" alt="Artigo 1" />
                    <div className="blog-content">
                        <h3>Top 5 Praias para Viver com Qualidade de Vida</h3>
                        <p>Descubra os destinos litorâneos que oferecem o melhor em bem-estar e infraestrutura.</p>
                        <a href="#" className="read-more">Ler Artigo</a>
                    </div>
                </div>
                <div className="blog-card">
                    <img src="https://source.unsplash.com/random/400x180/?beach-investment-tips" alt="Artigo 2" />
                    <div className="blog-content">
                        <h3>Investir em Imóveis de Praia: Guia Completo</h3>
                        <p>Saiba por que o mercado imobiliário litorâneo é uma excelente opção para o seu patrimônio.</p>
                        <a href="#" className="read-more">Ler Artigo</a>
                    </div>
                </div>
                <div className="blog-card">
                    <img src="https://source.unsplash.com/random/400x180/?buzios-travel" alt="Artigo 3" />
                    <div className="blog-content">
                        <h3>Guia Completo de Búzios: Onde Viver e o que Fazer</h3>
                        <p>Explore as belezas e o charme de um dos destinos mais cobiçados do Rio de Janeiro.</p>
                        <a href="#" className="read-more">Ler Artigo</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
