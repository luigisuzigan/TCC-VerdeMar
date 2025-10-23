import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [role, setRole] = useState('USER');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 300));

    try {
      if (!name.trim()) throw new Error('Informe seu nome.');
      if (!email) throw new Error('Informe um email válido.');
      if (password.length < 6) throw new Error('A senha deve ter pelo menos 6 caracteres.');
      if (password !== confirm) throw new Error('As senhas não conferem.');
      await register({ name: name.trim(), email, password, role });
      navigate('/');
    } catch (err) {
      const msg = err?.response?.data?.error || err?.response?.data?.errors?.[0]?.msg || err?.message;
      setError(msg || 'Falha ao cadastrar');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-dvh bg-gradient-to-br from-emerald-50 to-sky-50">
      {/* Voltar para Home */}
      <Link
        to="/"
        className="fixed left-4 top-4 z-50 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200 shadow hover:bg-white"
      >
        <ArrowLeft size={16} /> Voltar para Home
      </Link>

      <div className="mx-auto max-w-[1400px] min-h-dvh p-3 md:p-6">
        {/* Container combinando as duas colunas e ocupando quase a tela inteira */}
        <div className="grid min-h-[calc(100dvh-1.5rem)] overflow-hidden rounded-[36px] ring-1 ring-slate-200 md:grid-cols-2">
          {/* Coluna esquerda: formulário */}
          <div className="flex items-center bg-white/98 p-8 md:p-12">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <div className="text-emerald-800 text-lg font-semibold">verdemar</div>
                <h1 className="mt-4 text-4xl font-extrabold leading-tight text-slate-900">
                  Criar sua conta
                </h1>
              </div>

              {error && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <input
                    id="name"
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full rounded-full border border-slate-300 bg-slate-100 px-4 py-3 text-slate-900 outline-none focus:border-emerald-500 focus:bg-white"
                  />
                </div>

                <div>
                  <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    className="w-full rounded-full border border-slate-300 bg-slate-100 px-4 py-3 text-slate-900 outline-none focus:border-emerald-500 focus:bg-white"
                  />
                </div>

                <div>
                  <input
                    id="password"
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                    className="w-full rounded-full border border-slate-300 bg-slate-100 px-4 py-3 text-slate-900 outline-none focus:border-emerald-500 focus:bg-white"
                  />
                </div>

                <div>
                  <input
                    id="confirm"
                    type="password"
                    placeholder="Confirmar senha"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                    className="w-full rounded-full border border-slate-300 bg-slate-100 px-4 py-3 text-slate-900 outline-none focus:border-emerald-500 focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 w-full rounded-full bg-emerald-800 py-3 text-white font-semibold hover:brightness-110 transition disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? 'Criando...' : 'Criar conta'}
                </button>

                <p className="pt-2 text-center text-sm text-slate-600">
                  Já tem conta?{' '}
                  <Link to="/login" className="font-semibold text-emerald-800 hover:underline">Entrar</Link>
                </p>
              </form>
            </div>
          </div>

          {/* Coluna direita: imagem ocupa toda a altura */}
          <div className="relative hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1600&auto=format&fit=crop"
              alt="Paisagem"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </main>
  );
}