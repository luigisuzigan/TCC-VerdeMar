import { Link } from 'react-router-dom';
import { Home, Building2, Waves } from 'lucide-react';

const IMAGE_SRC = '/Teste'; // ajuste para /Teste.jpg/.png se precisar

const STYLES = [
  { id: 'rusticas', label: 'Rústicas', to: '/explorar?estilo=rustica', Icon: Home },
  { id: 'moderna', label: 'Modern', to: '/explorar?estilo=moderna', Icon: Building2 },
  { id: 'piscina', label: 'Casa Com Piscinas', to: '/explorar?feature=piscina', Icon: Waves },
];

export default function HomeStylesSimple({
  title = 'HOME STYLES',
  styles = STYLES,
  imageSrc = IMAGE_SRC,
}) {
  return (
    <section className="mx-auto mt-10 w-[min(96vw,1280px)]">
      <h2 className="mb-6 text-center text-[clamp(1.2rem,2.2vw,1.4rem)] font-bold tracking-wide text-slate-900">
        {title}
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {styles.map(({ id, label, to, Icon }) => (
          <div key={id} className="flex flex-col items-center">
            {/* Card com imagem */}
            <Link
              to={to}
              className={[
                'block w-full overflow-hidden rounded-xl ring-1 ring-slate-200 bg-slate-100',
                'shadow-[0_6px_20px_rgba(15,23,42,.10)] transition-transform hover:scale-[1.01]',
              ].join(' ')}
            >
              <div className="relative aspect-[16/9] sm:aspect-[5/3]">
                <img
                  src={imageSrc}
                  alt={label}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </Link>

            {/* Ícone + rótulo abaixo do card */}
            <Link
              to={to}
              className="mt-3 inline-flex flex-col items-center text-slate-900 hover:text-slate-700"
            >
              <Icon className="h-7 w-7" />
              <span className="mt-2 text-[15px] font-medium">{label}</span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}