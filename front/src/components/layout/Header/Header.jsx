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

/**
 * Header “icon-first”:
 * - Ícones sempre visíveis.
 * - Labels aparecem para todos os itens quando o mouse está sobre o header (e desaparecem ao sair).
 * - Labels ficam dentro do header, logo abaixo dos ícones (sem tooltip externo).
 * - Indicador do ativo: apenas círculo destacado (sem texto).
 * - Sem a “ondinha” decorativa.
 */
export default function Header({ transparentOnTop = false }) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);

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

  return (
    <header
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={[
        'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200',
        isTransparent
          ? 'bg-transparent border-transparent shadow-none'
          : 'bg-white/95 backdrop-blur border-slate-200 shadow-[0_6px_18px_rgba(2,48,71,.10)]',
      ].join(' ')}
    >
      <div
        className={[
          'mx-auto flex w-[min(96vw,1280px)] items-center justify-between gap-6 transition-[height] duration-200',
          hovered ? 'h-[92px]' : 'h-[68px]',
        ].join(' ')}
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 pl-2 md:pl-3"
          aria-label="Início"
        >
          <img
            src="/Logo.png"
            alt="Logo Verde Mar"
            className="h-12 md:h-14 lg:h-16 w-auto object-contain"
          />
        </Link>

        {/* Navegação */}
        <nav
          className={[
            'flex items-end gap-3 md:gap-4 text-sm font-medium',
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
              showLabel={hovered}
            />
          ))}
        </nav>

        {/* Lado direito */}
        <div className="flex items-center gap-4 pr-2 md:pr-3">
          <UserMenu inverted={isTransparent} />
        </div>
      </div>
      {/* ondinha removida */}
    </header>
  );
}

function IconNavItem({ to, label, Icon, active, inverted, showLabel }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className="relative flex flex-col items-center px-1"
      aria-current={active ? 'page' : undefined}
      title={label}
    >
      {/* Ícone com círculo. No ativo, círculo destacado. */}
      <div
        className={[
          'inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors',
          active
            ? inverted
              ? 'bg-white/18 text-white ring-2 ring-white/65'
              : 'bg-slate-900/5 text-slate-900 ring-2 ring-emerald-400/80'
            : inverted
              ? 'text-white/80 hover:text-white hover:bg-white/12'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100',
        ].join(' ')}
      >
        <Icon size={20} strokeWidth={2} />
      </div>

      {/* Label dentro do header, logo abaixo do ícone.
         - Some quando não está em hover do header
         - Nunca aparece sozinho no ativo (respeita showLabel) */}
      <span
        className={[
          'mt-1 select-none text-[12px] font-semibold leading-none transition-all duration-150',
          showLabel ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1',
          inverted ? 'text-white/95' : 'text-slate-800',
        ].join(' ')}
      >
        {label}
      </span>
    </NavLink>
  );
}