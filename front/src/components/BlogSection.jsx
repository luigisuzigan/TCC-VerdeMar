const BlogSection = () => {
    return (
        <section className="py-16 container">
            <h2 className="text-center text-3xl font-bold text-[var(--color-primary-900)] mb-10">
                Dicas e Destinos do Litoral
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <article className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <img 
                        src="https://source.unsplash.com/random/400x180/?beach-lifestyle" 
                        alt="Artigo 1" 
                        className="w-full h-44 object-cover"
                    />
                    <div className="p-5">
                        <h3 className="text-left text-xl font-semibold text-[var(--color-primary-900)] mb-3">
                            Top 5 Praias para Viver com Qualidade de Vida
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                            Descubra os destinos litorâneos que oferecem o melhor em bem-estar e infraestrutura.
                        </p>
                        <a 
                            href="#" 
                            className="text-[var(--color-primary-500)] font-bold text-sm hover:text-[var(--color-primary-600)] hover:underline transition-colors duration-200"
                        >
                            Ler Artigo
                        </a>
                    </div>
                </article>
                <article className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <img 
                        src="https://source.unsplash.com/random/400x180/?beach-investment-tips" 
                        alt="Artigo 2" 
                        className="w-full h-44 object-cover"
                    />
                    <div className="p-5">
                        <h3 className="text-left text-xl font-semibold text-[var(--color-primary-900)] mb-3">
                            Investir em Imóveis de Praia: Guia Completo
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                            Saiba por que o mercado imobiliário litorâneo é uma excelente opção para o seu patrimônio.
                        </p>
                        <a 
                            href="#" 
                            className="text-[var(--color-primary-500)] font-bold text-sm hover:text-[var(--color-primary-600)] hover:underline transition-colors duration-200"
                        >
                            Ler Artigo
                        </a>
                    </div>
                </article>
                <article className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <img 
                        src="https://source.unsplash.com/random/400x180/?buzios-travel" 
                        alt="Artigo 3" 
                        className="w-full h-44 object-cover"
                    />
                    <div className="p-5">
                        <h3 className="text-left text-xl font-semibold text-[var(--color-primary-900)] mb-3">
                            Guia Completo de Búzios: Onde Viver e o que Fazer
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                            Explore as belezas e o charme de um dos destinos mais cobiçados do Rio de Janeiro.
                        </p>
                        <a 
                            href="#" 
                            className="text-[var(--color-primary-500)] font-bold text-sm hover:text-[var(--color-primary-600)] hover:underline transition-colors duration-200"
                        >
                            Ler Artigo
                        </a>
                    </div>
                </article>
            </div>
        </section>
    );
};

export default BlogSection;
