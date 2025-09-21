import TopFilters from '../../components/Explorar/TopFilters';
import ResultsCardsSection from '../../components/Explorar/Section1';

export default function Explorar() {
  function handleSearch(filters) {
    // Conectar com sua API futuramente.
    console.log('Executar busca com ->', filters);
  }

  return (
    <main className="pb-16">
      {/* Section 1: Filtros (já existente) */}
      <TopFilters onSearch={handleSearch} />

      {/* Section 2: Cards (lista à esquerda + destaque/mapa à direita) */}
      <ResultsCardsSection />
    </main>
  );
}