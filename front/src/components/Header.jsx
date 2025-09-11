import { NavLink } from 'react-router-dom';

export default function Header() {
    return (
      <header className="w-full flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 text-[#1e645a] font-bold text-xl hover:text-[#1e645a]/80 transition">
          <i className="fas fa-leaf"></i>
          Verde Mar
        </NavLink>
  
        {/* Menu de navegação */}
        <nav className="flex gap-8 text-gray-700 font-medium text-base">
          <NavLink 
            to="/explorar" 
            className={({ isActive }) => 
              `hover:text-[#1e645a] transition pb-1 ${isActive ? 'text-[#1e645a] border-b-2 border-[#1e645a]' : ''}`
            }
          >
            Explorar
          </NavLink>
          <NavLink 
            to="/blog" 
            className={({ isActive }) => 
              `hover:text-[#1e645a] transition pb-1 ${isActive ? 'text-[#1e645a] border-b-2 border-[#1e645a]' : ''}`
            }
          >
            Blog
          </NavLink>
          <NavLink 
            to="/sobre" 
            className={({ isActive }) => 
              `hover:text-[#1e645a] transition pb-1 ${isActive ? 'text-[#1e645a] border-b-2 border-[#1e645a]' : ''}`
            }
          >
            Sobre
          </NavLink>
          <NavLink 
            to="/novidades" 
            className={({ isActive }) => 
              `hover:text-[#1e645a] transition pb-1 ${isActive ? 'text-[#1e645a] border-b-2 border-[#1e645a]' : ''}`
            }
          >
            Novidades
          </NavLink>
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
  