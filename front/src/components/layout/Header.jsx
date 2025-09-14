import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Header({ transparentOnTop = false }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isTransparent = transparentOnTop && !scrolled;
  return (
    <header
      className={[
        'sticky top-0 z-50 transition-colors',
        isTransparent
          ? 'bg-transparent border-transparent'
          : 'bg-white/80 backdrop-blur border-b border-gray-200',
      ].join(' ')}
    >
      <div className="container h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-emerald-800">
          <span aria-hidden>🌊</span>
          <span className="sr-only">Ir para a página inicial</span>
          <span className="not-sr-only">VerdeMar</span>
        </Link>

        <nav
          className={[
            'hidden md:flex items-center gap-6 text-sm',
            isTransparent ? 'text-white drop-shadow' : 'text-gray-700',
          ].join(' ')}
        >
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
          <Link
            to="/login"
            className={[
              'hidden sm:inline-flex text-sm',
              isTransparent ? 'text-white hover:opacity-90' : 'text-gray-700 hover:text-emerald-800',
            ].join(' ')}
          >
            Entrar
          </Link>
          <Link
            to="/register"
            className={[
              'inline-flex rounded-full text-sm px-4 py-2',
              isTransparent
                ? 'bg-white/20 text-white ring-1 ring-white/40 backdrop-blur hover:bg-white/30'
                : 'bg-emerald-700 text-white hover:bg-emerald-800',
            ].join(' ')}
          >
            Começar
          </Link>
        </div>
      </div>
    </header>
  );
}
