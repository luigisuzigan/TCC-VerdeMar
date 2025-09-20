
export default function ObjetivoCards(){
    return (
    <section className="container mx-auto max-w-6xl px-4 py-16">
      <h2 className="mb-10 text-center text-3xl font-extrabold text-gray-800">
        Qual é o Seu Objetivo?
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* Comprar */}
        <div className="flex flex-col overflow-hidden rounded-xl shadow-lg transition hover:shadow-2xl">
          <img
            src="https://source.unsplash.com/random/400x220/?beach-house-luxury"
            alt="Comprar Imóvel"
            className="h-56 w-full object-cover sm:h-52"
          />
          <div className="flex flex-1 flex-col bg-white p-6">
            <h3 className="mb-2 text-xl font-semibold text-gray-900">Comprar</h3>
            <p className="flex-1 text-gray-600">
              Encontre a casa dos seus sonhos, onde o mar encontra você.
            </p>
            <a
              href="#"
              className="mt-4 inline-block self-start rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Ver Imóveis
            </a>
          </div>
        </div>

        {/* Alugar */}
        <div className="flex flex-col overflow-hidden rounded-xl shadow-lg transition hover:shadow-2xl">
          <img
            src="https://source.unsplash.com/random/400x220/?beach-apartment-rent"
            alt="Alugar Imóvel"
            className="h-56 w-full object-cover sm:h-52"
          />
          <div className="flex flex-1 flex-col bg-white p-6">
            <h3 className="mb-2 text-xl font-semibold text-gray-900">Alugar</h3>
            <p className="flex-1 text-gray-600">
              Viva a praia o ano todo ou desfrute de uma temporada inesquecível.
            </p>
            <a
              href="#"
              className="mt-4 inline-block self-start rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Ver Aluguéis
            </a>
          </div>
        </div>

        {/* Investir */}
        <div className="flex flex-col overflow-hidden rounded-xl shadow-lg transition hover:shadow-2xl">
          <img
            src="https://source.unsplash.com/random/400x220/?beach-land-investment"
            alt="Investir em Imóvel"
            className="h-56 w-full object-cover sm:h-52"
          />
          <div className="flex flex-1 flex-col bg-white p-6">
            <h3 className="mb-2 text-xl font-semibold text-gray-900">Investir</h3>
            <p className="flex-1 text-gray-600">
              Construa seu futuro patrimônio com as melhores oportunidades no
              litoral.
            </p>
            <a
              href="#"
              className="mt-4 inline-block self-start rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Ver Oportunidades
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

