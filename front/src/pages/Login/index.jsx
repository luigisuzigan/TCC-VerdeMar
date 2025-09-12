import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // Ajuste o endpoint conforme seu backend
      const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
      const { token, user } = res.data || {};
      if (!token) throw new Error('Resposta inválida do servidor.');
      localStorage.setItem('token', token);
      if (user) localStorage.setItem('user', JSON.stringify(user));
      navigate('/');
    } catch (err) {
      // Fallback mock (apenas para dev quando backend não estiver pronto)
      if (email === 'demo@verdemar.com' && password === '123456') {
        localStorage.setItem('token', 'dev-mock-token');
        localStorage.setItem('user', JSON.stringify({ email }));
        navigate('/');
      } else {
        const msg = err?.response?.data?.message || err?.message || 'Falha no login';
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-dvh overflow-hidden bg-gradient-to-b from-[#cfe9ff] via-[#eaf5ff] to-white">
      {/* Brand simples topo-esquerda */}
      <div className="pointer-events-none absolute left-6 top-6 z-10 select-none">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm ring-1 ring-black/5 backdrop-blur">
          <span className="inline-block h-6 w-6 rounded-md bg-gradient-to-br from-sky-300 to-blue-600 ring-1 ring-white/40" aria-hidden="true" />
          <span>Verde Mar</span>
        </div>
      </div>

      {/* Conteúdo central */}
      <div className="container mx-auto grid min-h-dvh place-items-center px-6 py-16">
        <div className="relative w-full max-w-[520px] rounded-[28px] border border-white/50 bg-white/60 p-6 shadow-[0_10px_30px_rgba(2,48,71,.12)] backdrop-blur-md">
          {/* Emblema no topo */}
          <div className="absolute left-1/2 -top-6 -translate-x-1/2">
            <div className="h-12 w-12 rounded-2xl bg-white shadow ring-1 ring-black/5 grid place-items-center">
              <span className="inline-block h-6 w-6 rounded-md bg-gradient-to-br from-sky-300 to-blue-600 ring-1 ring-white/40" aria-hidden="true" />
            </div>
          </div>

          <div className="pt-6 text-center">
            <h1 className="text-2xl font-bold text-slate-900">Entrar com e-mail</h1>
            <p className="mt-1 text-sm text-slate-600">Acesse sua conta para continuar.</p>
          </div>

          {/* Mensagem de erro */}
          {error && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Formulário */}
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <label className="block">
              <span className="sr-only">Email</span>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} aria-hidden="true" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full rounded-xl border border-slate-200 bg-white/90 px-10 py-3 text-[15px] text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                  autoComplete="email"
                  required
                  aria-label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </label>

            {/* Password + link */}
            <div>
              <label className="block">
                <span className="sr-only">Senha</span>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} aria-hidden="true" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Senha"
                    className="w-full rounded-xl border border-slate-200 bg-white/90 px-10 pr-10 py-3 text-[15px] text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                    autoComplete="current-password"
                    required
                    aria-label="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
              </label>
              <div className="mt-2 text-right">
                <a href="#" className="text-sm font-medium text-slate-600 hover:text-slate-800">
                  Esqueceu a senha?
                </a>
              </div>
            </div>

            {/* CTA */}
            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-full rounded-2xl bg-gradient-to-b from-neutral-900 to-black py-3.5 text-center text-[15px] font-semibold text-white shadow-[0_10px_20px_rgba(0,0,0,.25)] transition hover:brightness-110 active:translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>

            {/* Separador */}
            <div className="flex items-center gap-3 py-2">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
              <span className="text-xs font-medium text-slate-500">ou entre com</span>
              <span className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
            </div>

            {/* Socials (placeholders) */}
            <div className="grid grid-cols-3 gap-3">
              <button type="button" className="rounded-xl border border-slate-200 bg-white/90 py-2.5 text-sm font-semibold text-slate-800 shadow-sm hover:border-slate-300">Google</button>
              <button type="button" className="rounded-xl border border-slate-200 bg-white/90 py-2.5 text-sm font-semibold text-slate-800 shadow-sm hover:border-slate-300">Facebook</button>
              <button type="button" className="rounded-xl border border-slate-200 bg-white/90 py-2.5 text-sm font-semibold text-slate-800 shadow-sm hover:border-slate-300">Apple</button>
            </div>
          </form>

          {/* Rodapé */}
          <p className="mt-6 text-center text-sm text-slate-600">
            Não tem conta?{' '}
            <a href="/register" className="font-semibold text-blue-600 hover:text-blue-700">
              Crie uma agora
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}