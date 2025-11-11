const fs = require('fs');
const path = require('path');

// Contar manualmente as 79 opções do Admin Form
const ADMIN_FORM_OPTIONS = [
  // Vista e Localização (14)
  "Vista para o mar", "Vista panorâmica do mar", "Frente para o mar",
  "Pé na areia", "Vista para a praia", "Vista para a montanha",
  "Vista para o lago", "Vista para o rio", "Vista para a cidade",
  "Vista para a natureza", "Vista para o verde", "Vista para o parque",
  "Vista desobstruída", "Vista privilegiada",
  
  // Ventilação e Ar (8)
  "Ventilação natural", "Ventilação cruzada", "Brisa marítima",
  "Brisa constante", "Circulação de ar excelente", "Ambientes arejados",
  "Janelas amplas", "Portas de vidro",
  
  // Iluminação Solar (11)
  "Sol da manhã", "Sol da tarde", "Sol o dia todo", "Muito sol",
  "Iluminação natural abundante", "Claridade natural",
  "Face norte", "Face sul", "Face leste", "Face oeste",
  "Claraboias / Luz zenital",
  
  // Clima e Conforto (7)
  "Clima ameno", "Clima tropical", "Temperatura agradável",
  "Fresco no verão", "Quente no inverno",
  "Sombra natural de árvores", "Microclima agradável",
  
  // Natureza e Verde (12)
  "Área verde", "Arborizado", "Jardim natural", "Mata nativa",
  "Árvores frutíferas", "Pomar", "Horta", "Contato com a natureza",
  "Fauna local", "Pássaros", "Borboletas", "Ecossistema preservado",
  
  // Terreno e Topografia (7)
  "Terreno plano", "Terreno em declive", "Terreno em aclive",
  "Elevado / Ponto alto", "Vista de cima", "Solo firme", "Solo drenado",
  
  // Características Especiais (10)
  "Nascer do sol", "Pôr do sol", "Céu estrelado", "Noite tranquila",
  "Silêncio / Ambiente calmo", "Privacidade", "Área isolada",
  "Exclusividade", "Som das ondas", "Acesso direto à praia",
  
  // Sustentabilidade (10)
  "Casa sustentável", "Bioconstrução", "Materiais naturais",
  "Captação de água da chuva", "Compostagem", "Fossa ecológica",
  "Biodigestor", "Energia renovável", "Baixo impacto ambiental",
  "Água de nascente / Poço artesiano"
];

// Ler FiltersModal
const filtersPath = path.join(__dirname, 'front', 'src', 'components', 'Explorar', 'FiltersModal.jsx');
const filtersContent = fs.readFileSync(filtersPath, 'utf8');

// Extrair opções do FiltersModal
const filterOptions = [];
const filterMatches = filtersContent.matchAll(/{ name: '([^']+)', icon:/g);
for (const match of filterMatches) {
  filterOptions.push(match[1]);
}

console.log('\n═══════════════════════════════════════════════════════');
console.log('🔍 VERIFICAÇÃO PRECISA DE SINCRONIZAÇÃO');
console.log('═══════════════════════════════════════════════════════\n');

console.log(`📋 Admin Form: ${ADMIN_FORM_OPTIONS.length} opções`);
console.log(`🔍 FiltersModal: ${filterOptions.length} opções\n`);

// Verificar diferenças
const inAdminNotInFilter = ADMIN_FORM_OPTIONS.filter(opt => !filterOptions.includes(opt));
const inFilterNotInAdmin = filterOptions.filter(opt => !ADMIN_FORM_OPTIONS.includes(opt));

if (inAdminNotInFilter.length === 0 && inFilterNotInAdmin.length === 0) {
  console.log('✅✅✅ PERFEITO! 100% SINCRONIZADO! ✅✅✅');
  console.log('✅ Admin Form e FiltersModal têm EXATAMENTE as mesmas 79 opções!\n');
  console.log('📊 Distribuição:');
  console.log('   🌊 Vista e Localização: 14 opções');
  console.log('   💨 Ventilação e Ar: 8 opções');
  console.log('   ☀️ Iluminação Solar: 11 opções');
  console.log('   🌡️ Clima e Conforto: 7 opções');
  console.log('   🌳 Natureza e Verde: 12 opções');
  console.log('   🏞️ Terreno e Topografia: 7 opções');
  console.log('   ✨ Características Especiais: 10 opções');
  console.log('   ♻️ Sustentabilidade: 10 opções');
  console.log('   ─────────────────────────');
  console.log('   📝 TOTAL: 79 opções\n');
} else {
  if (inAdminNotInFilter.length > 0) {
    console.log(`❌ No Admin mas NÃO no Filtro (${inAdminNotInFilter.length}):`);
    inAdminNotInFilter.forEach(opt => console.log(`   - "${opt}"`));
    console.log('');
  }
  
  if (inFilterNotInAdmin.length > 0) {
    console.log(`❌ No Filtro mas NÃO no Admin (${inFilterNotInAdmin.length}):`);
    inFilterNotInAdmin.forEach(opt => console.log(`   - "${opt}"`));
    console.log('');
  }
}

console.log('═══════════════════════════════════════════════════════\n');
