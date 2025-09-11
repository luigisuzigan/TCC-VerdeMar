export default function Blog() {
  return (
    <div className="py-20">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-ocean-950 mb-6 text-balance">
            Blog
          </h1>
          <p className="text-xl text-neutral-600 mb-8">
            Dicas, tendências e insights sobre o mercado imobiliário litorâneo.
          </p>
          <div className="bg-gradient-to-r from-primary-50 to-ocean-50 rounded-2xl p-8 border border-primary-100">
            <p className="text-neutral-700">
              Em breve: artigos, guias e análises do mercado imobiliário.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}