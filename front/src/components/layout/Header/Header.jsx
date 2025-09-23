import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import UserMenu from './UserMenu';

export default function Header({ transparentOnTop = false }) {
  const [scrolled, setScrolled] = useState(false);

  const THRESHOLD = 8;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const nav = [
    { label: 'Home', to: '/' },
    { label: 'Explorar', to: '/explorar' },
    { label: 'Blog', to: '/blog' },
    { label: 'Novidades', to: '/novidades' },
    { label: 'Sobre', to: '/sobre' },
  ];

  const isTransparent = transparentOnTop && !scrolled;

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200',
        isTransparent
          ? 'bg-transparent border-transparent shadow-none'
          : 'bg-white/95 backdrop-blur border-slate-200 shadow-[0_6px_18px_rgba(2,48,71,.10)]',
      ].join(' ')}
    >
      <div className="mx-auto flex h-[68px] w-[min(96vw,1280px)] items-center justify-between gap-4">
        {/* Logo esquerda */}
        <Link to="/" className="flex items-center gap-2 pl-3" aria-label="Início">
          <img src="/Logo.png" alt="Logo Verde Mar" className="h-25 w-25 object-contain" />
        </Link>

        {/* Navegação central */}
        <nav
          className={[
            'hidden md:flex items-center justify-center gap-8 text-[0.95rem] font-semibold',
            isTransparent ? 'text-white' : 'text-slate-900',
          ].join(' ')}
        >
          {nav.map((item) => (
            <NavLink
              key={item.to}
              end={item.to === '/'}
              to={item.to}
              className={({ isActive }) =>
                [
                  'px-1 py-1 transition relative',
                  isTransparent
                    ? isActive
                      ? 'text-white'
                      : 'text-white/80 hover:text-white'
                    : isActive
                      ? 'text-slate-900'
                      : 'text-slate-600 hover:text-slate-900',
                ].join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Ações direita: User Menu */}
        <div className="flex items-center gap-3 pr-3">
          <UserMenu inverted={isTransparent} />
        </div>
      </div>

      {/* Onda sutil na base do header (decorativo) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[-1px]">
        <svg viewBox="0 0 1440 40" className="w-full h-6">
          <defs>
            <linearGradient id="waveGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={isTransparent ? '#FFFFFF' : '#E0F7FA'} stopOpacity={isTransparent ? 0.5 : 0.8} />
              <stop offset="100%" stopColor="#E0F7FA" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,20 C180,40 360,0 540,20 C720,40 900,0 1080,20 C1260,40 1440,0 1440,0 L1440,40 L0,40 Z"
            fill="url(#waveGrad)"
          />
        </svg>
      </div>
    </header>
  );
}