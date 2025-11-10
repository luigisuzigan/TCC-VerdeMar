import { validatePropertyFields } from './src/config/propertyFieldsConfig.js';

console.log('🧪 Testando validação de campos...\n');

// Teste 1: Casa COM todos os campos obrigatórios
console.log('=== Teste 1: Casa COM parkingSpaces ===');
const testCasa = {
  title: 'Casa Teste',
  city: 'Florianópolis',
  country: 'Brasil',
  price: 100000,
  area: 50,
  beds: 2,
  baths: 1,
  parkingSpaces: 1 // Campo obrigatório para Casa
};
const errorsCasa = validatePropertyFields('Casa', testCasa);
console.log('Dados:', testCasa);
console.log('Erros:', errorsCasa);
console.log('✅ Válido:', errorsCasa.length === 0);

console.log('\n=== Teste 2: Casa SEM parkingSpaces ===');
const testCasaSem = {
  title: 'Casa Teste 2',
  city: 'Florianópolis',
  country: 'Brasil',
  price: 100000,
  area: 50,
  beds: 2,
  baths: 1
  // parkingSpaces ausente - deveria dar erro
};
const errorsCasaSem = validatePropertyFields('Casa', testCasaSem);
console.log('Dados:', testCasaSem);
console.log('Erros:', errorsCasaSem);
console.log('❌ Esperado erro:', errorsCasaSem.length > 0);

console.log('\n=== Teste 3: Apartamento COM campos obrigatórios ===');
const testApto = {
  title: 'Apartamento Teste',
  city: 'Florianópolis',
  country: 'Brasil',
  price: 150000,
  area: 60,
  beds: 2,
  baths: 1,
  parkingSpaces: 1,
  floor: 3,
  totalFloors: 10,
  condoFee: 300
};
const errorsApto = validatePropertyFields('Apartamento', testApto);
console.log('Dados:', testApto);
console.log('Erros:', errorsApto);
console.log('✅ Válido:', errorsApto.length === 0);

console.log('\n=== Teste 4: Terreno residencial (não deveria ter beds/baths) ===');
const testTerreno = {
  title: 'Terreno Teste',
  city: 'Florianópolis',
  country: 'Brasil',
  price: 80000,
  area: 500,
  beds: 0, // Não deveria ter
  baths: 0 // Não deveria ter
};
const errorsTerreno = validatePropertyFields('Terreno residencial', testTerreno);
console.log('Dados:', testTerreno);
console.log('Erros:', errorsTerreno);
console.log('❌ Deveria ter erros (beds/baths não aplicáveis):', errorsTerreno.length > 0);

console.log('\n✅ Testes concluídos!');
