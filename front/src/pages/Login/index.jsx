import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 300)); // pequena simulação de atraso

    try {
      await login({ email, password, remember });
      navigate('/');
    } catch (err) {
      setError(err?.response?.data?.error || err?.message || 'Falha no login');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className="relative min-h-dvh bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1521207418485-99c705420785?q=80&w=1600&auto=format&fit=crop')",
      }}
    >
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />

      <div className="relative z-10 grid min-h-[calc(100dvh-56px)] place-items-center px-4 py-8">
        <div className="w-full max-w-[460px] rounded-2xl border border-gray-200 bg-white/95 p-8 shadow-sm">
          <h1 className="text-center text-2xl font-semibold text-gray-900">Entrar</h1>

          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
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

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-blue-600 py-2.5 text-white font-medium hover:bg-blue-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Continue with email'}
            </button>

            {/* Opções sociais removidas */}
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Não tem uma conta?{' '}
            <Link to="/register" className="font-medium text-blue-600 hover:underline">Registrar</Link>
          </p>
        </div>
      </div>
    </main>
  );
}