import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';
import {
  ChevronRight,
  User2,
  Settings,
  HelpCircle,
  LogOut,
  Heart,
  Bell,
  Sparkles,
  Sun,
  Moon,
} from 'lucide-react';

const USER_KEY = 'user';
const TOKEN_KEY = 'token';

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || '{}');
  } catch {
    return {};
  }
}

function getToken() {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY) || '';
}

function initials(name) {
  if (!name) return 'U';
  const parts = name.trim().split(' ').filter(Boolean);
  const a = parts[0]?.[0] || '';
  const b = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (a + b).toUpperCase();
}

export default function UserMenu({ inverted = false, requireAuth = false }) {
  const navigate = useNavigate();
  const { user: authedUser, logout: ctxLogout, isAdmin, isSeller } = useAuth();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  const isAuthed = Boolean(authedUser);
  const user = isAuthed ? authedUser : null;

  const name = user?.name || 'Usuário';
  const email = user?.email || 'user@example.com';
  const avatarUrl = user?.avatar;

  // Contadores mock
  const counts = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('vm_counts') || '{}');
    } catch {
      return {};
    }
  }, []);
  const favCount = counts.favorites ?? 2;
  const notifCount = counts.notifications ?? 3;

  // Fechar ao clicar fora / ESC
  const panelRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (!open) return;
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    function onEsc(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, [open]);

  function toggleTheme() {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next);
    const root = document.documentElement;
    if (next === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  }

  function logout() { ctxLogout(); setOpen(false); navigate('/login'); }

  const triggerClasses = [
    'inline-flex items-center gap-2 rounded-full p-1 pr-2 ring-1 transition',
    inverted
      ? 'bg-white/15 ring-white/40 text-white hover:bg-white/25'
      : 'bg-sky-50 text-sky-700 ring-sky-200 hover:bg-sky-100'
  ].join(' ');

  return (
    <div className="relative">
      {/* Botão (avatar) no header */}
      <button
        ref={btnRef}
        type="button"
        onClick={() => {
          if (requireAuth && !isAuthed) return; // bloqueia abrir sem login
          setOpen((s) => !s);
        }}
        className={triggerClasses}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-disabled={requireAuth && !isAuthed}
      >
        <div className="relative grid size-8 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-emerald-400 to-sky-500 text-white text-xs font-bold">
          {avatarUrl && isAuthed ? (
            <img 
              src={avatarUrl} 
              alt="" 
              className="h-full w-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <span style={{ display: avatarUrl && isAuthed ? 'none' : 'flex' }}>{initials(name)}</span>
        </div>
        <span className={['hidden text-sm font-semibold sm:inline', inverted ? 'text-white' : 'text-slate-800'].join(' ')}>
          {name.split(' ')[0]}
        </span>
      </button>

      {/* Dropdown */}
  {open && isAuthed && (
        <div
          ref={panelRef}
          className="absolute right-0 z-50 mt-3 w-80 origin-top-right rounded-2xl bg-white p-3 shadow-xl ring-1 ring-slate-200"
          role="menu"
        >
          {/* Cabeçalho */}
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200">
            <div className="relative grid size-10 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-emerald-400 to-sky-500 text-white text-sm font-bold">
              {avatarUrl ? (
                <img 
                  src={avatarUrl} 
                  alt="" 
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <span style={{ display: avatarUrl ? 'none' : 'flex' }}>{initials(name)}</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[15px] font-semibold text-slate-900">{name}</div>
              <div className="truncate text-xs text-slate-500">{email}</div>
            </div>
            <span className="ml-auto inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
              Online
            </span>
          </div>

          {/* Ações principais: apenas Painel, Configurações, Notificações e Log out */}
          <div className="mt-3 space-y-1">
            {/* Painel */}
            {isAdmin ? (
              <MenuItem to="/admin/properties" icon={<Settings size={16} />} label="Painel" onChoose={() => setOpen(false)} />
            ) : isSeller ? (
              <MenuItem to="/seller" icon={<Settings size={16} />} label="Painel" onChoose={() => setOpen(false)} />
            ) : (
              <MenuItem to="/account" icon={<User2 size={16} />} label="Painel" onChoose={() => setOpen(false)} />
            )}

            {/* Configurações */}
            <MenuItem to="/settings" icon={<Settings size={16} />} label="Configurações" onChoose={() => setOpen(false)} />

            {/* Notificações */}
            <MenuItem to="/notifications" icon={<Bell size={16} className="text-amber-500" />} label="Notificações" badge={notifCount} onChoose={() => setOpen(false)} />
          </div>

          <Divider />

          {/* Sessão */}
          {isAuthed ? (
            <button
              type="button"
              onClick={logout}
              className="flex w-full items-center justify-between rounded-xl px-2 py-2 text-left text-sm text-rose-700 hover:bg-rose-50"
            >
              <span className="inline-flex items-center gap-2">
                <LogOut size={16} />
                Log out
              </span>
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}

function Divider() {
  return <div className="my-3 h-px w-full bg-slate-200" />;
}

function MenuItem({ to = '#', icon, label, badge, onChoose }) {
  return (
    <Link to={to} className="block" onClick={onChoose}>
      <div className="flex w-full items-center justify-between rounded-xl px-2 py-2 text-sm hover:bg-slate-50">
        <span className="inline-flex items-center gap-2 text-slate-800">
          {icon} {label}
        </span>
        <span className="inline-flex items-center gap-2">
          {typeof badge === 'number' && (
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600 ring-1 ring-slate-200">
              {badge}
            </span>
          )}
          <ChevronRight size={16} className="text-slate-400" />
        </span>
      </div>
    </Link>
  );
}