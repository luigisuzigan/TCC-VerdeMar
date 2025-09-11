import React from 'react';
import Header from '../../components/Header';

function Explorar() {
  return (
    <>
      <Header />
      <div className="p-8">
        <h1 className="text-4xl font-bold text-[#1e645a] mb-4">Explorar</h1>
        <p className="text-gray-600 text-lg">
          Descubra as melhores oportunidades imobiliárias na região costeira.
          Explore apartamentos, casas e terrenos com vista para o mar.
        </p>
      </div>
    </>
  );
}

export default Explorar;