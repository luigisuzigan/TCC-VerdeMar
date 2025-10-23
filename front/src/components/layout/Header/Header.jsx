import { useEffect, useState } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import {
  Home as HomeIcon,
  Search,
  Info,
} from 'lucide-react';
import UserMenu from './UserMenu';
import { useAuth } from '../../../context/AuthContext.jsx';

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
  const { user } = useAuth();
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
          'flex px-4 md:px-6 w-full items-center transition-[height] duration-200',
          'h-[68px]',
        ].join(' ')}
      >
        {/* Logo - largura fixa para manter centralização */}
        <div className="flex items-center w-[200px] md:w-[240px]">
          <Link
            to="/"
            className="flex items-center gap-2"
            aria-label="Início"
          >
            <img
              src="/Logo.png"
              alt="Logo Verde Mar"
              className="h-12 md:h-14 lg:h-16 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Navegação - Centralizada */}
        <nav
          className="flex-1 flex justify-center"
          aria-label="Navegação principal"
        >
          <div
            className={[
              'flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2.5 rounded-full transition-all duration-200',
              isTransparent
                ? 'bg-white/95 backdrop-blur shadow-lg'
                : 'bg-transparent',
            ].join(' ')}
          >
            {nav.map((item) => (
              <IconNavItem
                key={item.to}
                to={item.to}
                label={item.label}
                Icon={item.Icon}
                active={location.pathname === item.to}
                inverted={false}
                showLabel={hovered}
              />
            ))}
          </div>
        </nav>

        {/* Lado direito - largura fixa igual ao da logo para manter navegação centralizada */}
        <div className="flex items-center justify-end w-[200px] md:w-[240px]">
          {!user ? (
            <div className="flex items-center gap-3">
              {/* Botões quando NÃO está logado */}
              <Link
                to="/register"
                className={[
                  'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                  isTransparent 
                    ? 'bg-transparent text-white ring-1 ring-white/60 hover:bg-white/10' 
                    : 'bg-transparent text-slate-700 ring-1 ring-slate-300 hover:bg-slate-50'
                ].join(' ')}
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className={[
                  'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                  isTransparent 
                    ? 'bg-white/20 text-white ring-1 ring-white/40 hover:bg-white/30' 
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                ].join(' ')}
              >
                Login
              </Link>
            </div>
          ) : (
            /* Menu do usuário quando ESTÁ logado */
            <UserMenu inverted={isTransparent} />
          )}
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
      className="relative flex flex-col items-center justify-center px-2 md:px-3 h-10"
      aria-current={active ? 'page' : undefined}
      title={label}
    >
      {/* Container para manter o ícone fixo no centro */}
      <div className="flex flex-col items-center justify-center">
        {/* Ícone centralizado */}
        <div
          className={[
            'inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors',
            active
              ? 'text-emerald-600'
              : 'text-slate-600 hover:text-emerald-600',
          ].join(' ')}
        >
          <Icon size={20} strokeWidth={2} />
        </div>

        {/* Label aparece bem próximo no hover */}
        <span
          className={[
            'absolute top-[35px] select-none text-[10px] font-medium leading-none transition-all duration-150 whitespace-nowrap',
            showLabel ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none',
            active ? 'text-emerald-600' : 'text-slate-700',
          ].join(' ')}
        >
          {label}
        </span>
      </div>
    </NavLink>
  );
}