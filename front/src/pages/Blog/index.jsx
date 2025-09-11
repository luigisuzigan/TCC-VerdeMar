const Blog = () => {
  return (
    <div className="container py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8 text-[var(--color-primary-900)]">
          Blog Verde Mar
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          Dicas, tendências e insights sobre o mercado imobiliário litorâneo.
        </p>
        
        <div className="bg-white rounded-xl shadow-lg p-12 border border-gray-100">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-[var(--color-primary-100)] to-[var(--color-primary-200)] rounded-full flex items-center justify-center">
            <div className="text-[var(--color-primary-600)] text-2xl">📝</div>
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Em Breve</h2>
          <p className="text-gray-600">
            Nosso blog estará disponível em breve com conteúdo exclusivo sobre 
            investimentos imobiliários, guias de destinos litorâneos, tendências 
            do mercado e muito mais.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blog;