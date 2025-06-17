export default function HeroSection(){
  return (
   <header className="relative h-[85vh] w-full overflow-hidden">
      {/* imagem de fundo */}
      <img
        src="https://images.unsplash.com/photo-1667845638389-31a149a50bf7?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Costão rochoso à beira-mar"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* overlay em gradiente + blur */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/20 backdrop-blur-[2px]" />

      {/* conteúdo */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 px-4 text-center text-white">
        <h1 className="max-w-4xl text-4xl font-extrabold leading-tight drop-shadow sm:text-6xl">
          Sua Próxima Aventura<br className="hidden sm:block" /> Começa Aqui
        </h1>

        <p className="max-w-xl text-lg font-medium drop-shadow sm:text-2xl">
          Imóveis à Beira-Mar, Seu Sonho Realizado
        </p>

        {/* barra de busca */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex w-full max-w-2xl flex-col items-stretch gap-3 sm:flex-row"
        >
          <input
            type="text"
            placeholder="Localização (Ex: Búzios, Guarujá)"
            className="h-12 w-full flex-1 rounded-full bg-white/80 px-4 text-gray-900 placeholder-gray-500 outline-none ring-2 ring-transparent transition focus:bg-white focus:ring-blue-500"
          />

          <select
            defaultValue=""
            className="h-12 flex-1 cursor-pointer rounded-full bg-white/80 px-4 text-gray-900 outline-none ring-2 ring-transparent transition focus:bg-white focus:ring-blue-500"
          >
            <option value="" disabled hidden>
              Tipo de Imóvel
            </option>
            <option value="casa">Casa</option>
            <option value="apartamento">Apartamento</option>
            <option value="terreno">Terreno</option>
            <option value="cobertura">Cobertura</option>
          </select>

          <button
            type="submit"
            className="h-12 rounded-full bg-blue-600 px-8 font-semibold text-white shadow transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
          >
            Buscar
          </button>
        </form>
      </div>
    </header>
  );
};