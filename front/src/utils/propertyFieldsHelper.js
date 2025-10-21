/**
 * Helper para gerenciar campos condicionais de propriedades no frontend
 * Sincronizado com back/src/config/propertyFieldsConfig.js
 */

// Campos obrigatórios por tipo de imóvel
const REQUIRED_FIELDS = {
  // Residenciais
  'Apartamento': ['floor', 'totalFloors', 'condoFee', 'beds', 'baths', 'parkingSpaces'],
  'Casa': ['beds', 'baths', 'parkingSpaces'],
  'Sobrado': ['beds', 'baths', 'parkingSpaces'],
  'Cobertura': ['floor', 'totalFloors', 'condoFee', 'beds', 'baths', 'suites', 'parkingSpaces'],
  'Kitnet / Studio / Loft': ['baths'],
  'Condomínio residencial': ['condoFee', 'totalFloors'],
  'Chácara': [],
  'Sítio / Fazenda': [],
  
  // Terrenos
  'Terreno residencial': ['area'],
  'Terreno comercial': ['area'],
  'Terreno misto': ['area'],
  'Terreno rural': ['area'],
  'Terreno em condomínio': ['area', 'condoFee'],
  
  // Comerciais
  'Sala comercial / Escritório': ['area', 'floor', 'totalFloors', 'condoFee', 'parkingSpaces'],
  'Loja / Ponto comercial': ['area', 'parkingSpaces'],
  'Prédio comercial': ['area', 'totalFloors', 'parkingSpaces'],
  'Galpão comercial': ['area', 'parkingSpaces'],
  'Hotel / Pousada': ['beds', 'baths'],
  
  // Industriais
  'Galpão industrial': ['area', 'parkingSpaces'],
  'Condomínio industrial': ['area'],
  'Terreno industrial': ['area'],
  'Fábrica / Armazém': ['area', 'parkingSpaces'],
  
  // Especiais
  'Loteamento': ['area'],
  'Área / Gleba': ['area'],
  'Empreendimento em construção': [],
  'Imóvel de uso misto': ['beds', 'baths']
};

// Campos que NÃO devem ser exibidos por tipo
const HIDDEN_FIELDS = {
  'Casa': ['floor', 'totalFloors'],
  'Sobrado': ['floor'],
  'Kitnet / Studio / Loft': ['suites'],
  'Chácara': ['floor', 'totalFloors', 'condoFee'],
  'Sítio / Fazenda': ['floor', 'totalFloors', 'condoFee'],
  
  'Terreno residencial': ['beds', 'baths', 'suites', 'floor', 'totalFloors', 'parkingSpaces'],
  'Terreno comercial': ['beds', 'baths', 'suites', 'floor', 'totalFloors', 'parkingSpaces'],
  'Terreno misto': ['beds', 'baths', 'suites', 'floor', 'totalFloors', 'parkingSpaces'],
  'Terreno rural': ['beds', 'baths', 'suites', 'floor', 'totalFloors', 'parkingSpaces', 'condoFee'],
  'Terreno em condomínio': ['beds', 'baths', 'suites', 'floor', 'totalFloors', 'parkingSpaces'],
  
  'Sala comercial / Escritório': ['beds', 'suites'],
  'Loja / Ponto comercial': ['beds', 'baths', 'suites', 'totalFloors'],
  'Prédio comercial': ['beds', 'baths', 'suites'],
  'Galpão comercial': ['beds', 'baths', 'suites', 'floor', 'totalFloors', 'condoFee'],
  
  'Galpão industrial': ['beds', 'baths', 'suites', 'floor', 'totalFloors', 'condoFee'],
  'Condomínio industrial': ['beds', 'baths', 'suites', 'floor', 'totalFloors'],
  'Terreno industrial': ['beds', 'baths', 'suites', 'floor', 'totalFloors', 'parkingSpaces', 'condoFee'],
  'Fábrica / Armazém': ['beds', 'baths', 'suites', 'floor', 'totalFloors', 'condoFee'],
  
  'Loteamento': ['beds', 'baths', 'suites', 'floor', 'totalFloors', 'parkingSpaces', 'condoFee'],
  'Área / Gleba': ['beds', 'baths', 'suites', 'floor', 'totalFloors', 'parkingSpaces', 'condoFee']
};

/**
 * Verifica se um campo deve ser exibido para determinado tipo
 * @param {string} type - Tipo do imóvel
 * @param {string} field - Nome do campo
 * @returns {boolean}
 */
export function shouldShowField(type, field) {
  if (!type) return true; // Se não tem tipo, mostra tudo
  const hidden = HIDDEN_FIELDS[type] || [];
  return !hidden.includes(field);
}

/**
 * Verifica se um campo é obrigatório para determinado tipo
 * @param {string} type - Tipo do imóvel
 * @param {string} field - Nome do campo
 * @returns {boolean}
 */
export function isFieldRequired(type, field) {
  if (!type) return false;
  const required = REQUIRED_FIELDS[type] || [];
  return required.includes(field);
}

/**
 * Retorna configuração completa de campos para um tipo
 * @param {string} type - Tipo do imóvel
 * @returns {Object} { required: [], hidden: [] }
 */
export function getFieldsConfig(type) {
  return {
    required: REQUIRED_FIELDS[type] || [],
    hidden: HIDDEN_FIELDS[type] || []
  };
}

/**
 * Retorna lista de campos a serem exibidos no PropertyDetails
 * @param {string} type - Tipo do imóvel
 * @param {Object} property - Objeto do imóvel completo
 * @returns {Object} Objeto com seções e campos a exibir
 */
export function getPropertyDetailsFields(type, property) {
  const config = getFieldsConfig(type);
  
  return {
    // Características básicas (sempre mostrar se tiver valor)
    basics: {
      area: property.area,
      ...(shouldShowField(type, 'beds') && property.beds && { beds: property.beds }),
      ...(shouldShowField(type, 'baths') && property.baths && { baths: property.baths }),
      ...(shouldShowField(type, 'suites') && property.suites && { suites: property.suites }),
      ...(shouldShowField(type, 'parkingSpaces') && property.parkingSpaces && { parkingSpaces: property.parkingSpaces })
    },
    
    // Estrutura do prédio
    building: {
      ...(shouldShowField(type, 'floor') && property.floor && { floor: property.floor }),
      ...(shouldShowField(type, 'totalFloors') && property.totalFloors && { totalFloors: property.totalFloors }),
      ...(property.yearBuilt && { yearBuilt: property.yearBuilt }),
      ...(property.propertyCondition && { propertyCondition: property.propertyCondition })
    },
    
    // Custos mensais/anuais
    costs: {
      price: property.price,
      ...(shouldShowField(type, 'condoFee') && property.condoFee && { condoFee: property.condoFee }),
      ...(property.iptu && { iptu: property.iptu })
    }
  };
}

/**
 * Formata valores para exibição
 */
export const formatters = {
  price: (value) => new Intl.NumberFormat('pt-BR', { 
    style: 'currency', 
    currency: 'BRL' 
  }).format(value),
  
  area: (value) => `${value} m²`,
  beds: (value) => `${value} quarto${value !== 1 ? 's' : ''}`,
  baths: (value) => `${value} banheiro${value !== 1 ? 's' : ''}`,
  suites: (value) => `${value} suíte${value !== 1 ? 's' : ''}`,
  parkingSpaces: (value) => `${value} vaga${value !== 1 ? 's' : ''}`,
  floor: (value) => `${value}º andar`,
  totalFloors: (value) => `${value} andares`,
  yearBuilt: (value) => `Construído em ${value}`,
  condoFee: (value) => `${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}/mês`,
  iptu: (value) => `${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}/ano`
};

/**
 * Labels descritivos para cada campo
 */
export const fieldLabels = {
  area: 'Área',
  beds: 'Quartos',
  baths: 'Banheiros',
  suites: 'Suítes',
  parkingSpaces: 'Vagas',
  floor: 'Andar',
  totalFloors: 'Total de Andares',
  yearBuilt: 'Ano de Construção',
  propertyCondition: 'Estado',
  condoFee: 'Condomínio',
  iptu: 'IPTU',
  price: 'Preço'
};

/**
 * Tipos de imóveis agrupados por categoria
 */
export const PROPERTY_TYPES_BY_CATEGORY = {
  'Residencial': [
    'Casa',
    'Sobrado',
    'Apartamento',
    'Kitnet / Studio / Loft',
    'Cobertura',
    'Condomínio residencial',
    'Chácara',
    'Sítio / Fazenda'
  ],
  'Comercial': [
    'Sala comercial / Escritório',
    'Loja / Ponto comercial',
    'Prédio comercial',
    'Galpão comercial',
    'Hotel / Pousada'
  ],
  'Industrial': [
    'Galpão industrial',
    'Condomínio industrial',
    'Terreno industrial',
    'Fábrica / Armazém'
  ],
  'Terreno': [
    'Terreno residencial',
    'Terreno comercial',
    'Terreno misto',
    'Terreno rural',
    'Terreno em condomínio'
  ],
  'Especial': [
    'Loteamento',
    'Área / Gleba',
    'Empreendimento em construção',
    'Imóvel de uso misto'
  ]
};
