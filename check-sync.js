const fs = require('fs');
const path = require('path');

// Ler Admin Form
const adminPath = path.join(__dirname, 'front', 'src', 'pages', 'Admin', 'Properties', 'FormSections', 'NaturalConditionsSection.jsx');
const adminContent = fs.readFileSync(adminPath, 'utf8');

// Ler FiltersModal
const filtersPath = path.join(__dirname, 'front', 'src', 'components', 'Explorar', 'FiltersModal.jsx');
const filtersContent = fs.readFileSync(filtersPath, 'utf8');

// Extrair todas as opções do Admin
const adminOptions = [];
const adminMatches = adminContent.matchAll(/"([^"]+)"/g);
for (const match of adminMatches) {
  const value = match[1];
  // Filtrar apenas as condições naturais (ignorar outros valores)
  if (value.includes('Vista') || value.includes('Ventilação') || value.includes('Sol') || 
      value.includes('Clima') || value.includes('Área') || value.includes('Terreno') ||
      value.includes('Pôr') || value.includes('Casa') || value.includes('Brisa') ||
      value.includes('Iluminação') || value.includes('Face') || value.includes('Arborizado') ||
      value.includes('Jardim') || value.includes('Pássaros') || value.includes('Ecossistema') ||
      value.includes('Solo') || value.includes('Nascer') || value.includes('Noite') ||
      value.includes('Silêncio') || value.includes('Privacidade') || value.includes('Som') ||
      value.includes('Acesso') || value.includes('Bioconstrução') || value.includes('Materiais') ||
      value.includes('Captação') || value.includes('Compostagem') || value.includes('Fossa') ||
      value.includes('Biodigestor') || value.includes('Energia') || value.includes('Baixo') ||
      value.includes('Água') || value.includes('Frente') || value.includes('Pé na') ||
      value.includes('lago') || value.includes('rio') || value.includes('cidade') ||
      value.includes('natureza') || value.includes('verde') || value.includes('parque') ||
      value.includes('desobstruída') || value.includes('privilegiada') || value.includes('cruzada') ||
      value.includes('constante') || value.includes('excelente') || value.includes('arejados') ||
      value.includes('amplas') || value.includes('Portas') || value.includes('tarde') ||
      value.includes('dia todo') || value.includes('Muito sol') || value.includes('abundante') ||
      value.includes('Claridade') || value.includes('norte') || value.includes('sul') ||
      value.includes('leste') || value.includes('oeste') || value.includes('Claraboias') ||
      value.includes('tropical') || value.includes('Temperatura') || value.includes('Fresco') ||
      value.includes('Quente') || value.includes('Sombra') || value.includes('Microclima') ||
      value.includes('Mata') || value.includes('Árvores') || value.includes('Pomar') ||
      value.includes('Horta') || value.includes('Contato') || value.includes('Fauna') ||
      value.includes('Borboletas') || value.includes('declive') || value.includes('aclive') ||
      value.includes('Elevado') || value.includes('cima') || value.includes('firme') ||
      value.includes('estrelado') || value.includes('calmo') || value.includes('isolada') ||
      value.includes('Exclusividade') || value.includes('ondas') || value.includes('praia')) {
    if (!adminOptions.includes(value)) {
      adminOptions.push(value);
    }
  }
}

// Extrair todas as opções do FiltersModal
const filterOptions = [];
const filterMatches = filtersContent.matchAll(/name: '([^']+)'/g);
for (const match of filterMatches) {
  const value = match[1];
  // Apenas condições naturais (mesmo filtro)
  if (value.includes('Vista') || value.includes('Ventilação') || value.includes('Sol') || 
      value.includes('Clima') || value.includes('Área') || value.includes('Terreno') ||
      value.includes('Pôr') || value.includes('Casa') || value.includes('Brisa') ||
      value.includes('Iluminação') || value.includes('Face') || value.includes('Arborizado') ||
      value.includes('Jardim') || value.includes('Pássaros') || value.includes('Ecossistema') ||
      value.includes('Solo') || value.includes('Nascer') || value.includes('Noite') ||
      value.includes('Silêncio') || value.includes('Privacidade') || value.includes('Som') ||
      value.includes('Acesso') || value.includes('Bioconstrução') || value.includes('Materiais') ||
      value.includes('Captação') || value.includes('Compostagem') || value.includes('Fossa') ||
      value.includes('Biodigestor') || value.includes('Energia') || value.includes('Baixo') ||
      value.includes('Água') || value.includes('Frente') || value.includes('Pé na') ||
      value.includes('lago') || value.includes('rio') || value.includes('cidade') ||
      value.includes('natureza') || value.includes('verde') || value.includes('parque') ||
      value.includes('desobstruída') || value.includes('privilegiada') || value.includes('cruzada') ||
      value.includes('constante') || value.includes('excelente') || value.includes('arejados') ||
      value.includes('amplas') || value.includes('Portas') || value.includes('tarde') ||
      value.includes('dia todo') || value.includes('Muito sol') || value.includes('abundante') ||
      value.includes('Claridade') || value.includes('norte') || value.includes('sul') ||
      value.includes('leste') || value.includes('oeste') || value.includes('Claraboias') ||
      value.includes('tropical') || value.includes('Temperatura') || value.includes('Fresco') ||
      value.includes('Quente') || value.includes('Sombra') || value.includes('Microclima') ||
      value.includes('Mata') || value.includes('Árvores') || value.includes('Pomar') ||
      value.includes('Horta') || value.includes('Contato') || value.includes('Fauna') ||
      value.includes('Borboletas') || value.includes('declive') || value.includes('aclive') ||
      value.includes('Elevado') || value.includes('cima') || value.includes('firme') ||
      value.includes('estrelado') || value.includes('calmo') || value.includes('isolada') ||
      value.includes('Exclusividade') || value.includes('ondas') || value.includes('praia')) {
    if (!filterOptions.includes(value)) {
      filterOptions.push(value);
    }
  }
}

console.log('\n═══════════════════════════════════════════════════════');
console.log('🔍 VERIFICAÇÃO DE SINCRONIZAÇÃO');
console.log('═══════════════════════════════════════════════════════\n');

console.log(`📋 Admin Form: ${adminOptions.length} opções`);
console.log(`🔍 FiltersModal: ${filterOptions.length} opções\n`);

// Verificar diferenças
const inAdminNotInFilter = adminOptions.filter(opt => !filterOptions.includes(opt));
const inFilterNotInAdmin = filterOptions.filter(opt => !adminOptions.includes(opt));

if (inAdminNotInFilter.length === 0 && inFilterNotInAdmin.length === 0) {
  console.log('✅ PERFEITO! 100% SINCRONIZADO!');
  console.log('✅ Admin Form e FiltersModal têm exatamente as mesmas opções!\n');
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
