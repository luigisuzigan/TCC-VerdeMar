const cards = [
    {
        img: 'https://source.unsplash.com/random/400x180/?beach-lifestyle',
        title: 'Top 5 Praias para Viver com Qualidade de Vida',
        text: 'Descubra os destinos litorâneos que oferecem o melhor em bem-estar e infraestrutura.'
    },
    {
        img: 'https://source.unsplash.com/random/400x180/?beach-investment-tips',
        title: 'Investir em Imóveis de Praia: Guia Completo',
        text: 'Saiba por que o mercado imobiliário litorâneo é uma excelente opção para o seu patrimônio.'
    },
    {
        img: 'https://source.unsplash.com/random/400x180/?buzios-travel',
        title: 'Guia Completo de Búzios: Onde Viver e o que Fazer',
        text: 'Explore as belezas e o charme de um dos destinos mais cobiçados do Rio de Janeiro.'
    }
];

export default function BlogSection() {
    return (
        <section className="container py-12">
            <h2 className="text-2xl font-semibold mb-6">Dicas e Destinos do Litoral</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {cards.map((c, i) => (
                    <article key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
                        <img src={c.img} alt="" className="w-full h-44 object-cover" />
                        <div className="p-4">
                            <h3 className="font-medium text-gray-900">{c.title}</h3>
                            <p className="text-sm text-gray-600 mt-2">{c.text}</p>
                            <a href="#" className="inline-flex text-emerald-700 text-sm font-medium mt-3">Ler artigo →</a>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
