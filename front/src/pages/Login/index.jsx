import React from 'react';
import Header from '../../components/Header';

function Login() {
  return (
    <>
      <Header />
      <div className="p-8">
        <h1 className="text-4xl font-bold text-[#1e645a] mb-4">Login</h1>
        <p className="text-gray-600 text-lg">
          Faça login para acessar sua conta e gerenciar suas preferências.
        </p>
      </div>
    </>
  );
}

export default Login;