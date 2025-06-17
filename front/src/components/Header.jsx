export default function Header() {
    return (
      <header className="w-full flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 rounded-t-[30px]">
        {/* Logo */}
        <div className="flex items-center gap-2 text-[#1e645a] font-bold text-xl">
          <i className="fas fa-leaf"></i>
          Verde Mar
        </div>
  
        {/* Menu de navegação */}
        <nav className="hidden md:flex gap-8 text-gray-700 font-medium text-base">
          <a href="#" className="hover:text-[#1e645a] transition">Home</a>
          <a href="#" className="hover:text-[#1e645a] transition">Discover</a>
          <a href="#" className="hover:text-[#1e645a] transition">Activities</a>
          <a href="#" className="hover:text-[#1e645a] transition">About</a>
          <a href="#" className="hover:text-[#1e645a] transition">Contact</a>
        </nav>
  
        {/* Ícones */}
        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-[#1e645a] text-xl">
            <i className="fas fa-search"></i>
          </button>
          <button className="text-gray-300 hover:text-[#1e645a] text-2xl">
            <i className="fas fa-user-circle"></i>
          </button>
        </div>
      </header>
    );
  }
  