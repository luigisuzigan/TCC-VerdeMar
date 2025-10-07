import { Link } from 'react-router-dom';

export default function LatestBlogs({ posts = [] }) {
  if (!posts.length) return null;
  const [featured, ...rest] = posts;
  const right = rest.slice(0, 3);

  return (
    <section className="mx-auto w-[min(96vw,1200px)] py-14">
      <header className="mb-6">
        <h2 className="text-2xl font-extrabold tracking-tight">Read Our Latest Travel Blog & Tips Here</h2>
        <p className="mt-2 text-slate-600 max-w-2xl">Dicas práticas, roteiros e inspirações para sua próxima viagem pelo litoral brasileiro.</p>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        {/* Destaque à esquerda */}
        <Link to={`/blog/${featured.slug}`} className="group relative block overflow-hidden rounded-[18px] ring-1 ring-slate-200">
          <img
            src={featured.image}
            alt={featured.title}
            className="h-80 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop';
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-7">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/80">
              {featured.category} • {formatMeta(featured)}
            </div>
            <h3 className="text-xl font-extrabold text-white drop-shadow">{featured.title}</h3>
            <p className="mt-2 line-clamp-2 max-w-xl text-white/85">{featured.excerpt}</p>
            <span className="mt-3 inline-flex items-center text-sm font-semibold text-white/90 underline-offset-4 group-hover:underline">Read more →</span>
          </div>
        </Link>

        {/* 3 posts à direita */}
        <div className="grid content-start gap-4">
          {right.map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="group grid grid-cols-[120px_1fr] gap-4 overflow-hidden rounded-[18px] ring-1 ring-slate-200">
              <img
                src={post.image}
                alt={post.title}
                className="h-[120px] w-[120px] object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop';
                }}
              />
              <div className="py-3 pr-3">
                <div className="text-[12px] font-semibold uppercase tracking-wide text-slate-500">{post.category} • {formatMeta(post)}</div>
                <h4 className="mt-1 line-clamp-1 font-extrabold">{post.title}</h4>
                <p className="mt-1 line-clamp-2 text-slate-600">{post.excerpt}</p>
                <span className="mt-2 inline-flex items-center text-sm font-semibold text-emerald-700 group-hover:underline">Read more →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function formatMeta(p) {
  return `${formatDate(p.date)} • ${p.readingTime} min read`;
}

function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  } catch {
    return iso;
  }
}
