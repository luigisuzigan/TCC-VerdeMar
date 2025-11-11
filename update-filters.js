// Script para atualizar FiltersModal.jsx com as 79 condições naturais
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'front', 'src', 'components', 'Explorar', 'FiltersModal.jsx');

const newNaturalConditions = `  const naturalConditionsByCategory = {
    'Vista e Localização': [
      { name: 'Vista para o mar', icon: '🌊' },
      { name: 'Vista panorâmica do mar', icon: '🌊' },
      { name: 'Frente para o mar', icon: '🌅' },
      { name: 'Pé na areia', icon: '🏖️' },
      { name: 'Vista para a praia', icon: '🏖️' },
      { name: 'Vista para a montanha', icon: '⛰️' },
      { name: 'Vista para o lago', icon: '🏞️' },
      { name: 'Vista para o rio', icon: '🏞️' },
      { name: 'Vista para a cidade', icon: '🏙️' },
      { name: 'Vista para a natureza', icon: '🌳' },
      { name: 'Vista para o verde', icon: '🌳' },
      { name: 'Vista para o parque', icon: '🏞️' },
      { name: 'Vista desobstruída', icon: '👁️' },
      { name: 'Vista privilegiada', icon: '✨' },
    ],
    'Ventilação e Ar': [
      { name: 'Ventilação natural', icon: '💨' },
      { name: 'Ventilação cruzada', icon: '💨' },
      { name: 'Brisa marítima', icon: '🌊' },
      { name: 'Brisa constante', icon: '💨' },
      { name: 'Circulação de ar excelente', icon: '🌀' },
      { name: 'Ambientes arejados', icon: '🪟' },
      { name: 'Janelas amplas', icon: '🪟' },
      { name: 'Portas de vidro', icon: '🚪' },
    ],
    'Iluminação Solar': [
      { name: 'Sol da manhã', icon: '🌄' },
      { name: 'Sol da tarde', icon: '🌇' },
      { name: 'Sol o dia todo', icon: '☀️' },
      { name: 'Muito sol', icon: '☀️' },
      { name: 'Iluminação natural abundante', icon: '💡' },
      { name: 'Claridade natural', icon: '✨' },
      { name: 'Face norte', icon: '🧭' },
      { name: 'Face sul', icon: '🧭' },
      { name: 'Face leste', icon: '🧭' },
      { name: 'Face oeste', icon: '🧭' },
      { name: 'Claraboias / Luz zenital', icon: '💡' },
    ],
    'Clima e Conforto': [
      { name: 'Clima ameno', icon: '🌡️' },
      { name: 'Clima tropical', icon: '🌴' },
      { name: 'Temperatura agradável', icon: '🌡️' },
      { name: 'Fresco no verão', icon: '❄️' },
      { name: 'Quente no inverno', icon: '🔥' },
      { name: 'Sombra natural de árvores', icon: '🌳' },
      { name: 'Microclima agradável', icon: '🌡️' },
    ],
    'Natureza e Verde': [
      { name: 'Área verde', icon: '🌳' },
      { name: 'Arborizado', icon: '🌲' },
      { name: 'Jardim natural', icon: '🌿' },
      { name: 'Mata nativa', icon: '🌲' },
      { name: 'Árvores frutíferas', icon: '🍊' },
      { name: 'Pomar', icon: '🍎' },
      { name: 'Horta', icon: '🥬' },
      { name: 'Contato com a natureza', icon: '🌿' },
      { name: 'Fauna local', icon: '🦜' },
      { name: 'Pássaros', icon: '🐦' },
      { name: 'Borboletas', icon: '🦋' },
      { name: 'Ecossistema preservado', icon: '🌍' },
    ],
    'Terreno e Topografia': [
      { name: 'Terreno plano', icon: '▬' },
      { name: 'Terreno em declive', icon: '⛰️' },
      { name: 'Terreno em aclive', icon: '⛰️' },
      { name: 'Elevado / Ponto alto', icon: '🏔️' },
      { name: 'Vista de cima', icon: '👁️' },
      { name: 'Solo firme', icon: '🪨' },
      { name: 'Solo drenado', icon: '💧' },
    ],
    'Características Especiais': [
      { name: 'Nascer do sol', icon: '🌅' },
      { name: 'Pôr do sol', icon: '🌇' },
      { name: 'Céu estrelado', icon: '⭐' },
      { name: 'Noite tranquila', icon: '🌙' },
      { name: 'Silêncio / Ambiente calmo', icon: '🤫' },
      { name: 'Privacidade', icon: '🔒' },
      { name: 'Área isolada', icon: '🏝️' },
      { name: 'Exclusividade', icon: '💎' },
      { name: 'Som das ondas', icon: '🌊' },
      { name: 'Acesso direto à praia', icon: '🏖️' },
    ],
    'Sustentabilidade': [
      { name: 'Casa sustentável', icon: '🌱' },
      { name: 'Bioconstrução', icon: '🏡' },
      { name: 'Materiais naturais', icon: '🪵' },
      { name: 'Captação de água da chuva', icon: '💧' },
      { name: 'Compostagem', icon: '♻️' },
      { name: 'Fossa ecológica', icon: '🌱' },
      { name: 'Biodigestor', icon: '🔬' },
      { name: 'Energia renovável', icon: '⚡' },
      { name: 'Baixo impacto ambiental', icon: '🌍' },
      { name: 'Água de nascente / Poço artesiano', icon: '💧' },
    ],
  };`;

try {
  let content = fs.readFileSync(filePath, 'utf8');
  
  const start = content.indexOf('const naturalConditionsByCategory = {');
  const end = content.indexOf('};', start) + 2;
  
  const before = content.substring(0, start);
  const after = content.substring(end);
  
  const newContent = before + newNaturalConditions + after;
  
  fs.writeFileSync(filePath, newContent, 'utf8');
  
  console.log('✅ FiltersModal.jsx atualizado com sucesso!');
  console.log('✅ Agora tem 79 condições naturais sincronizadas com o Admin Form');
  
} catch (error) {
  console.error('❌ Erro:', error.message);
}
