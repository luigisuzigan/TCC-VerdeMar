const Testimonials = () => {
    return (
        <section className="py-16 bg-gradient-to-r from-primary-50 to-ocean-50">
            <div className="container">
                <h2 className="text-4xl font-bold text-ocean-950 text-center mb-12 text-balance">
                    O que Nossos Clientes Dizem
                </h2>
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
                        <div className="mb-6">
                            <svg 
                                className="w-12 h-12 mx-auto text-primary-400" 
                                fill="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                            </svg>
                        </div>
                        <blockquote className="text-lg md:text-xl text-neutral-700 italic mb-6 leading-relaxed">
                            "Encontrar nossa casa de praia foi muito mais fácil do que imaginávamos, graças à equipe incrível da Verde Mar. 
                            O atendimento foi impecável e encontramos exatamente o que procurávamos!"
                        </blockquote>
                        <cite className="text-ocean-950 font-semibold not-italic">
                            — Família Silva, Angra dos Reis
                        </cite>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
