const EstilosVidaCards = () => {
    return (
        <section className="py-16 bg-white">
            <div className="container">
                <h2 className="text-4xl font-bold text-ocean-950 text-center mb-12 text-balance">
                    Explore Diferentes Estilos de Vida na Praia
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
                        <img 
                            src="https://source.unsplash.com/random/400x220/?luxury-beach-villa" 
                            alt="Casas de Luxo" 
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6 text-center">
                            <h3 className="text-xl font-semibold text-ocean-950 mb-3">
                                Casas de Luxo
                            </h3>
                            <p className="text-neutral-600 text-sm mb-6">
                                O que há de melhor em conforto e exclusividade à beira-mar.
                            </p>
                            <a 
                                href="#" 
                                className="inline-block bg-secondary-500 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300 hover:bg-secondary-600"
                            >
                                Ver Mais
                            </a>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
                        <img 
                            src="https://source.unsplash.com/random/400x220/?oceanfront-apartment" 
                            alt="Apartamentos Pé na Areia" 
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6 text-center">
                            <h3 className="text-xl font-semibold text-ocean-950 mb-3">
                                Apartamentos Pé na Areia
                            </h3>
                            <p className="text-neutral-600 text-sm mb-6">
                                Acorde com a brisa do mar e a vista deslumbrante.
                            </p>
                            <a 
                                href="#" 
                                className="inline-block bg-secondary-500 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300 hover:bg-secondary-600"
                            >
                                Ver Mais
                            </a>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
                        <img 
                            src="https://source.unsplash.com/random/400x220/?beach-land-view" 
                            alt="Terrenos para Construir" 
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6 text-center">
                            <h3 className="text-xl font-semibold text-ocean-950 mb-3">
                                Terrenos para Construir
                            </h3>
                            <p className="text-neutral-600 text-sm mb-6">
                                Crie o lar dos seus sonhos do zero, com a sua cara.
                            </p>
                            <a 
                                href="#" 
                                className="inline-block bg-secondary-500 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300 hover:bg-secondary-600"
                            >
                                Ver Mais
                            </a>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
                        <img 
                            src="https://source.unsplash.com/random/400x220/?beach-seasonal-rental" 
                            alt="Imóveis para Temporada" 
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6 text-center">
                            <h3 className="text-xl font-semibold text-ocean-950 mb-3">
                                Imóveis para Temporada
                            </h3>
                            <p className="text-neutral-600 text-sm mb-6">
                                Escapadas perfeitas para curtir feriados e férias com estilo.
                            </p>
                            <a 
                                href="#" 
                                className="inline-block bg-secondary-500 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300 hover:bg-secondary-600"
                            >
                                Ver Mais
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EstilosVidaCards;
