import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
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
      // Persist token (padrão: localStorage). Poderíamos trocar para sessionStorage quando remember=false.
      (remember ? localStorage : sessionStorage).setItem('token', token);
      if (user) localStorage.setItem('user', JSON.stringify(user));
      navigate('/');
    } catch (err) {
      // Fallback mock (apenas para dev quando backend não estiver pronto)
      if (email === 'demo@verdemar.com' && password === '123456') {
        (remember ? localStorage : sessionStorage).setItem('token', 'dev-mock-token');
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
    <main
      className="relative min-h-dvh bg-cover bg-center"
      style={{
        // Você pode trocar esta imagem depois
        backgroundImage:
          "url('https://images.unsplash.com/photo-1521207418485-99c705420785?q=80&w=1600&auto=format&fit=crop')",
      }}
    >
      {/* overlay leve */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />

      {/* Brand simples topo-esquerda */}
      <div className="relative z-10 p-4">
        <div className="inline-flex items-center gap-2 text-slate-800 font-semibold">
          <span className="inline-block h-5 w-5 rounded-md bg-slate-800" aria-hidden="true" />
          <span>Verde Mar</span>
        </div>
      </div>

      {/* Conteúdo central */}
      <div className="relative z-10 grid min-h-[calc(100dvh-56px)] place-items-center px-4 py-8">
        <div className="w-full max-w-[460px] rounded-2xl border border-gray-200 bg-white/95 p-8 shadow-sm">
          <h1 className="text-center text-2xl font-semibold text-gray-900">Sign in</h1>

          {/* Mensagem de erro */}
          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm text-gray-700">Email address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-gray-900 outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label htmlFor="password" className="text-sm text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-gray-900 outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            {/* Remember + forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2 text-gray-700">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                />
                Keep me signed in
              </label>
              <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
            </div>

            {/* Primary CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-blue-600 py-2.5 text-white font-medium hover:bg-blue-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Continue with email'}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 py-1 text-xs text-gray-500">
              <span className="h-px flex-1 bg-gray-200" />
              <span>or use one of these options</span>
              <span className="h-px flex-1 bg-gray-200" />
            </div>

            {/* Socials */}
            <div className="grid grid-cols-1 gap-3">
              <button type="button" className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white py-2.5 text-sm font-medium text-gray-800 hover:bg-gray-50">
                {/* simple G */}
                <span className="inline-block size-4 rounded-sm bg-gradient-to-br from-yellow-400 via-red-500 to-blue-600" aria-hidden="true" />
                Continue with Google
              </button>
              <button type="button" className="inline-flex items-center justify-center gap-2 rounded-md bg-[#1877F2] py-2.5 text-sm font-medium text-white hover:brightness-105">
                <span className="inline-block size-4 rounded-sm bg-white" aria-hidden="true" />
                Continue with Facebook
              </button>
            </div>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="font-medium text-blue-600 hover:underline">Register</a>
          </p>
        </div>
      </div>
    </main>
  );
}