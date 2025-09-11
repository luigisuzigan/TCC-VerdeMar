const BlogSection = () => {
    return (
        <section className="py-16 bg-neutral-50">
            <div className="container">
                <h2 className="text-4xl font-bold text-ocean-950 text-center mb-12 text-balance">
                    Dicas e Destinos do Litoral
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <article className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
                        <img 
                            src="https://source.unsplash.com/random/400x180/?beach-lifestyle" 
                            alt="Artigo 1" 
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-ocean-950 mb-3">
                                Top 5 Praias para Viver com Qualidade de Vida
                            </h3>
                            <p className="text-neutral-600 text-sm mb-4 line-clamp-3">
                                Descubra os destinos litorâneos que oferecem o melhor em bem-estar e infraestrutura.
                            </p>
                            <a 
                                href="#" 
                                className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors duration-300"
                            >
                                Ler Artigo →
                            </a>
                        </div>
                    </article>
                    <article className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
                        <img 
                            src="https://source.unsplash.com/random/400x180/?beach-investment-tips" 
                            alt="Artigo 2" 
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-ocean-950 mb-3">
                                Investir em Imóveis de Praia: Guia Completo
                            </h3>
                            <p className="text-neutral-600 text-sm mb-4 line-clamp-3">
                                Saiba por que o mercado imobiliário litorâneo é uma excelente opção para o seu patrimônio.
                            </p>
                            <a 
                                href="#" 
                                className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors duration-300"
                            >
                                Ler Artigo →
                            </a>
                        </div>
                    </article>
                    <article className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
                        <img 
                            src="https://source.unsplash.com/random/400x180/?buzios-travel" 
                            alt="Artigo 3" 
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-ocean-950 mb-3">
                                Guia Completo de Búzios: Onde Viver e o que Fazer
                            </h3>
                            <p className="text-neutral-600 text-sm mb-4 line-clamp-3">
                                Explore as belezas e o charme de um dos destinos mais cobiçados do Rio de Janeiro.
                            </p>
                            <a 
                                href="#" 
                                className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors duration-300"
                            >
                                Ler Artigo →
                            </a>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
