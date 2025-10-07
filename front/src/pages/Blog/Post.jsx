import { useParams, Link } from 'react-router-dom';
import { BLOGS } from '../../data/blogs.js';

export default function BlogPost() {
  const { slug } = useParams();
  const post = BLOGS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main className="mx-auto w-[min(96vw,900px)] px-4 py-12">
        <h1 className="text-2xl font-extrabold">Post não encontrado</h1>
        <p className="mt-2 text-slate-600">O conteúdo que você procura pode ter sido removido ou não existe.</p>
        <Link to="/blog" className="mt-4 inline-block text-emerald-700 underline">Voltar para o blog</Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-[min(96vw,900px)] px-4 py-10">
      <header className="mb-6">
        <div className="text-[12px] font-semibold uppercase tracking-wide text-slate-500">{post.category} • {formatDate(post.date)} • {post.readingTime} min read</div>
        <h1 className="mt-1 text-3xl font-extrabold">{post.title}</h1>
      </header>

      <img src={post.image} alt={post.title} className="mb-6 h-80 w-full rounded-[18px] object-cover ring-1 ring-slate-200" />

      <article className="prose prose-slate max-w-none">
        <p>
          Este é um texto de demonstração do post. Substitua por conteúdo real quando integrar com sua API.
          Enquanto isso, mantemos o foco no layout e navegação. Aproveite para validar estilos, tipografia e
          responsividade com Tailwind.
        </p>
        <p>
          Dica: mantenha parágrafos curtos, intertítulos claros e imagens otimizadas. Para trechos de código ou listas,
          use elementos semânticos HTML para garantir acessibilidade e boa leitura.
        </p>
      </article>

      <div className="mt-8">
        <Link to="/blog" className="text-emerald-700 underline">← Voltar para o blog</Link>
      </div>
    </main>
  );
}

function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  } catch {
    return iso;
  }
}
