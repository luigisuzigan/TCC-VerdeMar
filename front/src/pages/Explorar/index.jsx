const Explorar = () => {
  return (
    <div className="container py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8 text-[var(--color-primary-900)]">
          Explorar Propriedades
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          Descubra as melhores oportunidades imobiliárias no litoral brasileiro.
        </p>
        
        <div className="bg-white rounded-xl shadow-lg p-12 border border-gray-100">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-[var(--color-primary-100)] to-[var(--color-primary-200)] rounded-full flex items-center justify-center">
            <div className="text-[var(--color-primary-600)] text-2xl">🏖️</div>
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Em Breve</h2>
          <p className="text-gray-600">
            Nossa seção de exploração de propriedades estará disponível em breve. 
            Aqui você poderá navegar por uma ampla seleção de casas, apartamentos, 
            terrenos e imóveis comerciais em localizações privilegiadas no litoral.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Explorar;