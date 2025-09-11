import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User2 } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Explorar', path: '/explorar' },
    { name: 'Blog', path: '/blog' },
    { name: 'Sobre', path: '/sobre' },
    { name: 'Novidades', path: '/novidades' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-fixed transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
      data-scrolled={isScrolled}
    >
      <div className="container">
        <div className="flex items-center justify-between h-[76px]">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 text-xl font-bold transition-colors duration-300"
            aria-label="Verde Mar - Página inicial"
          >
            <div 
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center"
              style={{ background: 'var(--gradient-primary)' }}
            >
              <span className="text-white text-sm font-bold">VM</span>
            </div>
            <span className={`transition-colors duration-300 ${
              isScrolled ? 'text-ocean-950' : 'text-white'
            }`}>
              Verde Mar
            </span>
          </Link>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center gap-8" role="navigation">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative font-medium transition-colors duration-300 hover:text-primary-600 ${
                    isScrolled 
                      ? 'text-neutral-700 hover:text-primary-600' 
                      : 'text-white/90 hover:text-white'
                  } ${
                    isActive ? 'text-primary-600' : ''
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.name}
                  {isActive && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Avatar */}
          <button
            className={`p-2 rounded-full transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
              isScrolled 
                ? 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50' 
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
            aria-label="Menu do usuário"
          >
            <User2 size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}