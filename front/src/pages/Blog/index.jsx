import { Link } from 'react-router-dom';
import LatestBlogs from '../../components/Blog/LatestBlogs.jsx';
import { BLOGS } from '../../data/blogs.js';

export default function Blog() {
  const posts = BLOGS;

  return (
    <main>
      <section className="mx-auto w-[min(96vw,1200px)] px-4 py-12">
        <h1 className="text-3xl font-extrabold">Blog Verde Mar</h1>
        <p className="mt-2 max-w-2xl text-slate-600">Roteiros, dicas e inspirações para você viajar melhor pelo litoral.</p>

        {/* Grid de cards */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <article key={p.id} className="group overflow-hidden rounded-[18px] ring-1 ring-slate-200">
              <Link to={`/blog/${p.slug}`} className="block">
                <div className="relative">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-48 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop';
                    }}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition group-hover:opacity-100" />
                </div>
                <div className="p-4">
                  <div className="text-[12px] font-semibold uppercase tracking-wide text-slate-500">
                    {p.category} • {formatDate(p.date)} • {p.readingTime} min read
                  </div>
                  <h3 className="mt-1 line-clamp-1 font-extrabold">{p.title}</h3>
                  <p className="mt-1 line-clamp-2 text-slate-600">{p.excerpt}</p>
                  <span className="mt-2 inline-flex items-center text-sm font-semibold text-emerald-700 group-hover:underline">Ler mais →</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Latest Blogs section */}
      <LatestBlogs posts={posts} />
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
