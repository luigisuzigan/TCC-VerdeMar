const Testimonials = () => {
    return (
        <section className="py-16 bg-gradient-to-r from-[var(--color-primary-50)] to-[var(--color-primary-100)]">
            <div className="container">
                <h2 className="text-center text-3xl font-bold text-[var(--color-primary-900)] mb-10">
                    O que Nossos Clientes Dizem
                </h2>
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                        <p className="text-lg italic text-gray-700 mb-6 leading-relaxed">
                            "Encontrar nossa casa de praia foi muito mais fácil do que imaginávamos, graças à equipe incrível da Ondas de Oportunidades. 
                            O atendimento foi impecável e encontramos exatamente o que procurávamos!"
                        </p>
                        <span className="font-bold text-[var(--color-primary-900)]">
                            - Família Silva, Angra dos Reis
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
