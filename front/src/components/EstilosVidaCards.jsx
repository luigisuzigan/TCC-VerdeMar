const EstilosVidaCards = () => {
    return (
        <section className="py-16 container">
            <h2 className="text-center text-3xl font-bold text-[var(--color-primary-900)] mb-10">
                Explore Diferentes Estilos de Vida na Praia
            </h2>
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl text-center">
                    <img 
                        src="https://source.unsplash.com/random/400x220/?luxury-beach-villa" 
                        alt="Casas de Luxo" 
                        className="w-full h-56 object-cover"
                    />
                    <div className="p-5">
                        <h3 className="text-xl font-semibold text-[var(--color-primary-900)] mb-3">
                            Casas de Luxo
                        </h3>
                        <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                            O que há de melhor em conforto e exclusividade à beira-mar.
                        </p>
                        <a 
                            href="#" 
                            className="inline-block bg-[var(--color-secondary-500)] text-white px-6 py-3 rounded-lg font-bold text-sm transition-colors duration-200 hover:bg-[var(--color-secondary-600)]"
                        >
                            Ver Mais
                        </a>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl text-center">
                    <img 
                        src="https://source.unsplash.com/random/400x220/?oceanfront-apartment" 
                        alt="Apartamentos Pé na Areia" 
                        className="w-full h-56 object-cover"
                    />
                    <div className="p-5">
                        <h3 className="text-xl font-semibold text-[var(--color-primary-900)] mb-3">
                            Apartamentos Pé na Areia
                        </h3>
                        <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                            Acorde com a brisa do mar e a vista deslumbrante.
                        </p>
                        <a 
                            href="#" 
                            className="inline-block bg-[var(--color-secondary-500)] text-white px-6 py-3 rounded-lg font-bold text-sm transition-colors duration-200 hover:bg-[var(--color-secondary-600)]"
                        >
                            Ver Mais
                        </a>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl text-center">
                    <img 
                        src="https://source.unsplash.com/random/400x220/?beach-land-view" 
                        alt="Terrenos para Construir" 
                        className="w-full h-56 object-cover"
                    />
                    <div className="p-5">
                        <h3 className="text-xl font-semibold text-[var(--color-primary-900)] mb-3">
                            Terrenos para Construir
                        </h3>
                        <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                            Crie o lar dos seus sonhos do zero, com a sua cara.
                        </p>
                        <a 
                            href="#" 
                            className="inline-block bg-[var(--color-secondary-500)] text-white px-6 py-3 rounded-lg font-bold text-sm transition-colors duration-200 hover:bg-[var(--color-secondary-600)]"
                        >
                            Ver Mais
                        </a>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl text-center">
                    <img 
                        src="https://source.unsplash.com/random/400x220/?beach-seasonal-rental" 
                        alt="Imóveis para Temporada" 
                        className="w-full h-56 object-cover"
                    />
                    <div className="p-5">
                        <h3 className="text-xl font-semibold text-[var(--color-primary-900)] mb-3">
                            Imóveis para Temporada
                        </h3>
                        <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                            Escapadas perfeitas para curtir feriados e férias com estilo.
                        </p>
                        <a 
                            href="#" 
                            className="inline-block bg-[var(--color-secondary-500)] text-white px-6 py-3 rounded-lg font-bold text-sm transition-colors duration-200 hover:bg-[var(--color-secondary-600)]"
                        >
                            Ver Mais
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EstilosVidaCards;
