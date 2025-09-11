const Novidades = () => {
  return (
    <div className="container py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8 text-[var(--color-primary-900)]">
          Novidades
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          Fique por dentro das últimas oportunidades e lançamentos.
        </p>
        
        <div className="bg-white rounded-xl shadow-lg p-12 border border-gray-100">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-[var(--color-primary-100)] to-[var(--color-primary-200)] rounded-full flex items-center justify-center">
            <div className="text-[var(--color-primary-600)] text-2xl">⭐</div>
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Fique Atento</h2>
          <p className="text-gray-600">
            Em breve você encontrará aqui todas as novidades do mercado imobiliário, 
            lançamentos exclusivos, promoções especiais e oportunidades únicas 
            no litoral brasileiro.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Novidades;