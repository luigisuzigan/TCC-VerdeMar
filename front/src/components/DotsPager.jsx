export default function DotsPager({ total = 4, active = 2 }) {
  return (
    <div className="container mx-auto px-6">
      <div className="flex items-center justify-center gap-2 py-4">
        {Array.from({ length: total }).map((_, i) => {
          const isActive = i + 1 === active;
          return (
            <span
              key={i}
              aria-label={isActive ? `Slide ${i + 1}, atual` : `Ir para slide ${i + 1}`}
              className={[
                "inline-block rounded-full transition-all",
                isActive ? "w-6 h-2 bg-slate-900/80" : "w-2 h-2 bg-slate-300"
              ].join(" ")}
            />
          );
        })}
      </div>
    </div>
  );
}