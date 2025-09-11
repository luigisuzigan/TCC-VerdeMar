import React from 'react';
import Header from '../../components/Header';

function Sobre() {
  return (
    <>
      <Header />
      <div className="p-8">
        <h1 className="text-4xl font-bold text-[#1e645a] mb-4">Sobre</h1>
        <p className="text-gray-600 text-lg">
          Conheça nossa história e missão. Somos especialistas em conectar 
          pessoas aos seus sonhos de viver próximo ao mar.
        </p>
      </div>
    </>
  );
}

export default Sobre;