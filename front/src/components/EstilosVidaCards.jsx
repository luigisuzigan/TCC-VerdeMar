const items = [
    {
        img: 'https://source.unsplash.com/random/400x180/?beach-surf',
        title: 'Surf e Aventura',
        text: 'Perfeito para quem busca emoções fortes e contato direto com a natureza.'
    },
    {
        img: 'https://source.unsplash.com/random/400x180/?beach-relax',
        title: 'Relax e Bem-estar',
        text: 'Ambientes tranquilos para uma vida leve, com qualidade e saúde em foco.'
    },
    {
        img: 'https://source.unsplash.com/random/400x180/?beach-family',
        title: 'Família e Comunidade',
        text: 'Bairros acolhedores com escolas, praças e serviços para toda a família.'
    }
];

export default function EstilosVidaCards() {
    return (
        <section className="container py-12">
            <h2 className="text-2xl font-semibold mb-6">Estilos de Vida no Litoral</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((c, i) => (
                    <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <img src={c.img} alt="" className="w-full h-44 object-cover" />
                        <div className="p-4">
                            <h3 className="font-medium text-gray-900">{c.title}</h3>
                            <p className="text-sm text-gray-600 mt-2">{c.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
