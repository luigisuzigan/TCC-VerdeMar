import { useEffect, useState } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import {
  Home as HomeIcon,
  Search,
  BookOpenText,
  Sparkles,
  Info,
} from 'lucide-react';
import UserMenu from './UserMenu';

export default function Header({ transparentOnTop = false }) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const THRESHOLD = 8;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const nav = [
    { label: 'Home', to: '/', Icon: HomeIcon },
    { label: 'Explorar', to: '/explorar', Icon: Search },
    { label: 'Blog', to: '/blog', Icon: BookOpenText },
    { label: 'Novidades', to: '/novidades', Icon: Sparkles },
    { label: 'Sobre', to: '/sobre', Icon: Info },
  ];

  const isTransparent = transparentOnTop && !scrolled;

  const newLocal = <Link
    to="/"
    className="flex items-center gap-2 pl-2 md:pl-3 font-extrabold text-lg tracking-tight"
    aria-label="Início"
  >
    <img
      src="/Logo.png"
      alt="Logo Verde Mar"
      className="h-12 md:h-14 lg:h-16 w-auto object-contain transition-[filter,transform] duration-300 hover:brightness-110 hover:scale-[1.02]" />
  </Link>;
  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200',
        isTransparent
          ? 'bg-transparent border-transparent shadow-none'
          : 'bg-white/95 backdrop-blur border-slate-200 shadow-[0_6px_18px_rgba(2,48,71,.10)]',
      ].join(' ')}
    >
      <div className="mx-auto flex h-[68px] w-[min(96vw,1280px)] items-center justify-between gap-6">
        {newLocal}

        <nav
          className={[
            'flex items-center gap-3 md:gap-4 text-sm font-medium',
            isTransparent ? 'text-white' : 'text-slate-800',
          ].join(' ')}
          aria-label="Navegação principal"
        >
          {nav.map((item) => (
            <IconNavItem
              key={item.to}
              to={item.to}
              label={item.label}
              Icon={item.Icon}
              active={location.pathname === item.to}
              inverted={isTransparent}
            />
          ))}
        </nav>

        <div className="flex items-center gap-4 pr-2 md:pr-3">
          <UserMenu inverted={isTransparent} />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-[-1px]">
        <svg viewBox="0 0 1440 40" className="w-full h-6">
          <defs>
            <linearGradient id="waveGrad" x1="0" x2="0" y1="0" y2="1">
              <stop
                offset="0%"
                stopColor={isTransparent ? '#FFFFFF' : '#E0F7FA'}
                stopOpacity={isTransparent ? 0.5 : 0.8}
              />
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

function IconNavItem({ to, label, Icon, active, inverted }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className="relative group flex items-center"
      aria-current={active ? 'page' : undefined}
    >
      <div
        className={[
          'relative inline-flex items-center justify-center rounded-full transition-colors h-11 w-11',
          active
            ? inverted
              ? 'bg-white/15 text-white'
              : 'bg-slate-900/5 text-slate-900'
            : inverted
              ? 'text-white/80 hover:text-white hover:bg-white/15'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100',
        ].join(' ')}
      >
        <Icon size={20} />
        {active && (
          <span
            className={[
              'pointer-events-none absolute -bottom-[6px] left-1/2 h-[3px] w-8 -translate-x-1/2 rounded-full',
              inverted
                ? 'bg-white/80 shadow-[0_0_0_1px_rgba(255,255,255,.4)]'
                : 'bg-emerald-500 shadow-[0_0_0_1px_rgba(16,185,129,.4)]',
            ].join(' ')}
          />
        )}
      </div>

      {active && (
        <span
          className={[
            'ml-2 hidden whitespace-nowrap text-[0.9rem] font-semibold md:inline-block',
            inverted ? 'text-white' : 'text-slate-900',
          ].join(' ')}
        >
          {label}
        </span>
      )}

      {!active && (
        <span
          className={[
            'pointer-events-none absolute left-1/2 top-[110%] z-10 -translate-x-1/2 select-none whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-semibold opacity-0 shadow-lg ring-1 transition-all duration-150 scale-90',
            inverted
              ? 'bg-white/90 text-slate-900 ring-white/40 backdrop-blur-sm'
              : 'bg-slate-900 text-white ring-slate-900/30',
            'group-hover:opacity-100 group-hover:scale-100 group-focus-within:opacity-100 group-focus-within:scale-100',
          ].join(' ')}
          role="tooltip"
        >
          {label}
        </span>
      )}
    </NavLink>
  );
}