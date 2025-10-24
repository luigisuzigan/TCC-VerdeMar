import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Building2, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/layout/Header/Header';

const menuItems = [
  { path: '/admin', icon: Home, label: 'Dashboard', exact: true },
  { path: '/admin/properties', icon: Building2, label: 'Imóveis' },
  { path: '/admin/users', icon: Users, label: 'Usuários' },
  { path: '/admin/settings', icon: Settings, label: 'Configurações' },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path, exact) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Principal do Site */}
      <Header transparentOnTop={false} />

      {/* Sidebar Desktop */}
      <aside className="fixed left-0 top-[68px] z-40 h-[calc(100vh-68px)] w-20 bg-slate-900 hidden lg:block">
        <div className="flex h-full flex-col">
          {/* Logo Admin */}
          <div className="flex h-20 items-center justify-center border-b border-slate-800">
            <Link to="/admin" className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-600 text-white font-bold text-xl">
              VM
            </Link>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 py-6">
            <ul className="space-y-2 px-3">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path, item.exact);
                
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex flex-col items-center justify-center gap-1 rounded-xl p-3 transition-all ${
                        active
                          ? 'bg-emerald-600 text-white'
                          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                      }`}
                      title={item.label}
                    >
                      <Icon size={24} />
                      <span className="text-[10px] font-medium">{item.label.split(' ')[0]}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout */}
          <div className="border-t border-slate-800 p-3">
            <button
              onClick={handleLogout}
              className="flex w-full flex-col items-center justify-center gap-1 rounded-xl p-3 text-slate-400 transition-all hover:bg-slate-800 hover:text-white"
              title="Sair"
            >
              <LogOut size={24} />
              <span className="text-[10px] font-medium">Sair</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <>
          <div 
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="fixed left-0 top-[68px] z-50 h-[calc(100vh-68px)] w-64 bg-slate-900 lg:hidden">
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex h-20 items-center justify-between px-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-600 text-white font-bold">
                    VM
                  </div>
                  <span className="text-white font-bold text-lg">VerdeMar</span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Menu Items */}
              <nav className="flex-1 py-6">
                <ul className="space-y-1 px-3">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path, item.exact);
                    
                    return (
                      <li key={item.path}>
                        <Link
                          to={item.path}
                          onClick={() => setSidebarOpen(false)}
                          className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                            active
                              ? 'bg-emerald-600 text-white'
                              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          <Icon size={20} />
                          <span className="font-medium">{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Logout */}
              <div className="border-t border-slate-800 p-3">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-slate-400 transition-all hover:bg-slate-800 hover:text-white"
                >
                  <LogOut size={20} />
                  <span className="font-medium">Sair</span>
                </button>
              </div>
            </div>
          </aside>
        </>
      )}

      {/* Main Content */}
      <div className="lg:ml-20 pt-[68px]">
        {/* Top Bar Admin (abaixo do header principal) */}
        <header className="sticky top-[68px] z-30 bg-white border-b border-slate-200">
          <div className="flex h-16 items-center justify-between px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-slate-600 hover:text-slate-900"
            >
              <Menu size={24} />
            </button>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-slate-900">Administrador</p>
                <p className="text-xs text-slate-500">Painel de controle</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
