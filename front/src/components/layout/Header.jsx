import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/explorar', label: 'Explorar' },
    { path: '/blog', label: 'Blog' },
    { path: '/sobre', label: 'Sobre' },
    { path: '/novidades', label: 'Novidades' },
  ];

  const isActiveLink = (path) => location.pathname === path;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        isScrolled
          ? 'h-[66px] bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200/50'
          : 'h-[76px] bg-transparent backdrop-blur-sm'
      }`}
    >
      <div className="container flex items-center justify-between h-full">
        {/* Logo */}
        <Link 
          to="/" 
          className={`flex items-center gap-2 font-bold text-xl transition-colors duration-300 ${
            isScrolled ? 'text-[var(--color-primary-500)]' : 'text-white'
          }`}
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-secondary-500)]"></div>
          Verde Mar
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative px-1 py-2 font-medium transition-colors duration-300 ${
                isScrolled ? 'text-gray-700 hover:text-[var(--color-primary-500)]' : 'text-white hover:text-white/80'
              } ${
                isActiveLink(item.path) ? 'text-[var(--color-primary-500)]' : ''
              }`}
            >
              {item.label}
              {isActiveLink(item.path) && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-primary-500)] rounded-full"></div>
              )}
            </Link>
          ))}
        </nav>

        {/* User Avatar */}
        <div className="flex items-center">
          <button 
            className={`p-2 rounded-full transition-colors duration-300 ${
              isScrolled 
                ? 'text-gray-600 hover:text-[var(--color-primary-500)] hover:bg-gray-100' 
                : 'text-white hover:text-white/80 hover:bg-white/10'
            }`}
          >
            <User size={24} />
          </button>
        </div>

        {/* Mobile menu button (for future implementation) */}
        <button 
          className={`md:hidden p-2 rounded-md ${
            isScrolled ? 'text-gray-600' : 'text-white'
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;