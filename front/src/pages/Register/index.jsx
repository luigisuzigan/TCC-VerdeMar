import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const USERS_KEY = 'vm_users';
const TOKEN_KEY = 'token';
const USER_KEY = 'user';

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch {
    return [];
  }
}
function setUsers(arr) {
  localStorage.setItem(USERS_KEY, JSON.stringify(arr));
}
function findUser(email) {
  return getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
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
      if (findUser(email)) throw new Error('Este email já está cadastrado.');

      const users = getUsers();
      users.push({ name: name.trim(), email, password });
      setUsers(users);

      // já entra após cadastro
      localStorage.setItem(TOKEN_KEY, 'mock-token');
      localStorage.setItem(USER_KEY, JSON.stringify({ name: name.trim(), email }));
      navigate('/');
    } catch (err) {
      setError(err?.message || 'Falha ao cadastrar');
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
        <div className="w-full max-w-[520px] rounded-2xl border border-gray-200 bg-white/95 p-8 shadow-sm">
          <h1 className="text-center text-2xl font-semibold text-gray-900">Create your account</h1>

          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label htmlFor="name" className="text-sm text-gray-700">Nome</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-gray-900 outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="text-sm text-gray-700">Email</label>
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
              <label htmlFor="password" className="text-sm text-gray-700">Senha</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
                className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-gray-900 outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="confirm" className="text-sm text-gray-700">Confirmar senha</label>
              <input
                id="confirm"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-gray-900 outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-blue-600 py-2.5 text-white font-medium hover:bg-blue-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create account'}
            </button>

            <p className="text-center text-sm text-gray-600">
              Já tem conta?{' '}
              <Link to="/login" className="font-medium text-blue-600 hover:underline">Entrar</Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}