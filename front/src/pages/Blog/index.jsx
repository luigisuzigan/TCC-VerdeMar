import React from 'react';
import Header from '../../components/Header';

function Blog() {
  return (
    <>
      <Header />
      <div className="p-8">
        <h1 className="text-4xl font-bold text-[#1e645a] mb-4">Blog</h1>
        <p className="text-gray-600 text-lg">
          Fique por dentro das últimas tendências do mercado imobiliário, 
          dicas de investimento e novidades sobre a vida no litoral.
        </p>
      </div>
    </>
  );
}

export default Blog;