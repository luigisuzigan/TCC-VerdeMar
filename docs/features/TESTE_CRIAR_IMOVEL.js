/**
 * Script para testar criação de imóvel manualmente
 * 
 * Para usar:
 * 1. Certifique-se que o backend está rodando (localhost:4000)
 * 2. Abra o navegador em http://localhost:5173/admin/properties/new
 * 3. Abra o console do navegador (F12)
 * 4. Cole este código e execute
 */

// Dados mínimos para teste
const testData = {
  title: "Casa de Teste Admin",
  description: "Imóvel de teste criado via formulário admin",
  category: "Residencial",
  type: "Casa",
  price: 450000,
  currency: "BRL",
  city: "Florianópolis",
  state: "SC",
  country: "Brasil",
  area: 120,
  beds: 3,
  baths: 2,
  guests: 6,
  published: true,
  featured: false
};

console.log("📋 Dados de teste:", testData);
console.log("\n✅ Campos obrigatórios preenchidos:");
console.log("  - Título:", testData.title);
console.log("  - Cidade:", testData.city);
console.log("  - Preço:", testData.price);
console.log("  - Área:", testData.area);
console.log("  - Hóspedes:", testData.guests);

console.log("\n📝 Para testar no formulário:");
console.log("1. Preencha o título:", testData.title);
console.log("2. Selecione a categoria:", testData.category);
console.log("3. Selecione o tipo:", testData.type);
console.log("4. Preencha a cidade:", testData.city);
console.log("5. Preencha o preço:", testData.price);
console.log("6. Preencha a área:", testData.area);
console.log("7. Preencha os quartos:", testData.beds);
console.log("8. Preencha os banheiros:", testData.baths);
console.log("9. Preencha os hóspedes:", testData.guests);
console.log("10. Clique em 'Criar Imóvel'");

console.log("\n💡 Dica: Se aparecer erro, copie a mensagem e envie para análise");
