import React from 'react';
import Header from '../../components/Header';

function Novidades() {
  return (
    <>
      <Header />
      <div className="p-8">
        <h1 className="text-4xl font-bold text-[#1e645a] mb-4">Novidades</h1>
        <p className="text-gray-600 text-lg">
          Acompanhe os lançamentos mais recentes, novos empreendimentos 
          e oportunidades exclusivas no mercado imobiliário costeiro.
        </p>
      </div>
    </>
  );
}

export default Novidades;