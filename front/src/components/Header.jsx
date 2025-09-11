import { NavLink } from 'react-router-dom';
import { User } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Explorar', path: '/explorar' },
  { label: 'Blog', path: '/blog' },
  { label: 'Sobre', path: '/sobre' },
  { label: 'Novidades', path: '/novidades' }
];

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 rounded-t-[30px]">
      {/* Logo */}
      <NavLink to="/" className="flex items-center gap-2 text-[#1e645a] font-bold text-xl hover:text-[#219EBC] transition">
        🌿 Verde Mar
      </NavLink>

      {/* Menu de navegação */}
      <nav className="flex gap-8 text-gray-700 font-medium text-base" aria-label="Navegação principal">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `hover:text-[#219EBC] transition px-2 py-1 ${
                isActive 
                  ? 'text-[#219EBC] border-b-2 border-[#219EBC]' 
                  : ''
              }`
            }
            aria-current={({ isActive }) => isActive ? 'page' : undefined}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Usuário */}
      <NavLink 
        to="/login" 
        className={({ isActive }) =>
          `flex items-center gap-2 text-gray-500 hover:text-[#219EBC] transition ${
            isActive ? 'text-[#219EBC]' : ''
          }`
        }
        aria-label="Área do usuário"
      >
        <User size={20} />
        <span className="hidden sm:inline">Usuário</span>
      </NavLink>
    </header>
  );
}
  