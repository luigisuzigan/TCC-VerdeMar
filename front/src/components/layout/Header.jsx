import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="container h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-emerald-800">
          <span aria-hidden>🌊</span>
          <span className="sr-only">Ir para a página inicial</span>
          <span className="not-sr-only">VerdeMar</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          {[
            { to: '/', label: 'Home' },
            { to: '/explorar', label: 'Explorar' },
            { to: '/blog', label: 'Blog' },
            { to: '/novidades', label: 'Novidades' },
            { to: '/sobre', label: 'Sobre' },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-1 py-2 hover:text-emerald-800 transition ${isActive ? 'text-emerald-800' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/login" className="hidden sm:inline-flex text-sm text-gray-700 hover:text-emerald-800">Entrar</Link>
          <Link to="/register" className="inline-flex rounded-full bg-emerald-700 text-white text-sm px-4 py-2 hover:bg-emerald-800">
            Começar
          </Link>
        </div>
      </div>
    </header>
  );
}
