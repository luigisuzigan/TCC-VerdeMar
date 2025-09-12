function CategoryCard({ title, subtitle = "131 stays", img, tall = false, alt }) {
  return (
    <a
      href="#"
      className={[
        "group relative block overflow-hidden rounded-2xl bg-slate-200 shadow-sm ring-1 ring-black/5",
        "transition-shadow hover:shadow-lg"
      ].join(" ")}
      style={{
        // Altos: proporção mais vertical; Menores: mais horizontal
        aspectRatio: tall ? "4 / 5" : "16 / 10"
      }}
    >
      <img
        src={img}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" aria-hidden="true" />
      <div className="absolute left-4 right-4 bottom-4 text-white drop-shadow-sm">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-xs text-white/85 mt-1">{subtitle}</p>
      </div>
    </a>
  );
}

export default function ExploreGallery() {
  return (
    <section className="container mx-auto px-6 pb-12">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Coluna esquerda: card alto */}
        <div>
          <CategoryCard
            tall
            title="Outdoor getaways"
            img="https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1600&auto=format&fit=crop"
            alt="Chalé de madeira iluminado ao entardecer com árvores ao redor"
          />
        </div>

        {/* Coluna central: dois cards menores empilhados */}
        <div className="grid gap-6">
          <CategoryCard
            title="Unique stays"
            img="https://images.unsplash.com/photo-1505692714131-347e2436f805?q=80&w=1600&auto=format&fit=crop"
            alt="Casa moderna com vista para montanhas ao pôr do sol"
          />
          <CategoryCard
            title="Entire homes"
            img="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop"
            alt="Casa inteira cercada por árvores com janelas grandes"
          />
        </div>

        {/* Coluna direita: card alto */}
        <div>
          <CategoryCard
            tall
            title="Pets allowed"
            img="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1600&auto=format&fit=crop"
            alt="Cachorro sentado em uma cama em quarto aconchegante"
          />
        </div>
      </div>
    </section>
  );
}