/**
 * Configuração de campos condicionais por tipo de imóvel
 * Define quais campos são obrigatórios, opcionais ou não aplicáveis para cada tipo
 */

// Campos obrigatórios por tipo de imóvel
export const REQUIRED_FIELDS = {
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

// Campos que NÃO devem ser preenchidos (não aplicáveis) por tipo
export const HIDDEN_FIELDS = {
  // Residenciais
  'Casa': ['floor', 'totalFloors'],
  'Sobrado': ['floor'],
  'Kitnet / Studio / Loft': ['suites'],
  'Chácara': ['floor', 'totalFloors', 'condoFee'],
  'Sítio / Fazenda': ['floor', 'totalFloors', 'condoFee'],
  
  // Terrenos (não têm quartos, banheiros, etc)
  'Terreno residencial': ['beds', 'baths', 'suites', 'floor', 'totalFloors', 'parkingSpaces'],
  'Terreno comercial': ['beds', 'baths', 'suites', 'floor', 'totalFloors', 'parkingSpaces'],
  'Terreno misto': ['beds', 'baths', 'suites', 'floor', 'totalFloors', 'parkingSpaces'],
  'Terreno rural': ['beds', 'baths', 'suites', 'floor', 'totalFloors', 'parkingSpaces', 'condoFee'],
  'Terreno em condomínio': ['beds', 'baths', 'suites', 'floor', 'totalFloors', 'parkingSpaces'],
  
  // Comerciais
  'Sala comercial / Escritório': ['beds', 'suites'],
  'Loja / Ponto comercial': ['beds', 'baths', 'suites', 'totalFloors'],
  'Prédio comercial': ['beds', 'baths', 'suites'],
  'Galpão comercial': ['beds', 'baths', 'suites', 'floor', 'totalFloors', 'condoFee'],
  
  // Industriais
  'Galpão industrial': ['beds', 'baths', 'suites', 'floor', 'totalFloors', 'condoFee'],
  'Condomínio industrial': ['beds', 'baths', 'suites', 'floor', 'totalFloors'],
  'Terreno industrial': ['beds', 'baths', 'suites', 'floor', 'totalFloors', 'parkingSpaces', 'condoFee'],
  'Fábrica / Armazém': ['beds', 'baths', 'suites', 'floor', 'totalFloors', 'condoFee'],
  
  // Especiais
  'Loteamento': ['beds', 'baths', 'suites', 'floor', 'totalFloors', 'parkingSpaces', 'condoFee'],
  'Área / Gleba': ['beds', 'baths', 'suites', 'floor', 'totalFloors', 'parkingSpaces', 'condoFee']
};

// Campos opcionais por tipo (podem ou não ser preenchidos)
export const OPTIONAL_FIELDS = {
  'Casa': ['suites', 'condoFee', 'iptu', 'yearBuilt', 'propertyCondition'],
  'Sobrado': ['suites', 'totalFloors', 'condoFee', 'iptu', 'yearBuilt', 'propertyCondition'],
  'Kitnet / Studio / Loft': ['beds', 'floor', 'condoFee', 'parkingSpaces', 'iptu'],
  'Loja / Ponto comercial': ['baths', 'floor', 'condoFee', 'iptu'],
  // ... adicione mais conforme necessário
};

/**
 * Retorna a configuração de campos para um tipo específico de imóvel
 * @param {string} type - Tipo do imóvel
 * @returns {Object} Objeto com arrays de campos required, hidden e optional
 */
export function getFieldsForPropertyType(type) {
  return {
    required: REQUIRED_FIELDS[type] || [],
    hidden: HIDDEN_FIELDS[type] || [],
    optional: OPTIONAL_FIELDS[type] || []
  };
}

/**
 * Valida se os campos fornecidos estão corretos para o tipo de imóvel
 * @param {string} type - Tipo do imóvel
 * @param {Object} data - Dados do imóvel
 * @returns {Array} Array de erros (vazio se tudo OK)
 */
export function validatePropertyFields(type, data) {
  const config = getFieldsForPropertyType(type);
  const errors = [];
  
  // Verificar campos obrigatórios
  config.required.forEach(field => {
    if (data[field] === undefined || data[field] === null || data[field] === '') {
      // Permitir 0 como valor válido
      if (data[field] !== 0) {
        errors.push({
          field,
          message: `Campo "${field}" é obrigatório para ${type}`,
          type: 'required'
        });
      }
    }
  });
  
  // Verificar campos que não devem existir
  config.hidden.forEach(field => {
    if (data[field] !== undefined && data[field] !== null && data[field] !== '' && data[field] !== 0) {
      errors.push({
        field,
        message: `Campo "${field}" não se aplica a ${type}`,
        type: 'not_applicable'
      });
    }
  });
  
  return errors;
}

/**
 * Verifica se um campo é obrigatório para determinado tipo
 * @param {string} type - Tipo do imóvel
 * @param {string} field - Nome do campo
 * @returns {boolean}
 */
export function isFieldRequired(type, field) {
  const required = REQUIRED_FIELDS[type] || [];
  return required.includes(field);
}

/**
 * Verifica se um campo deve ser ocultado para determinado tipo
 * @param {string} type - Tipo do imóvel
 * @param {string} field - Nome do campo
 * @returns {boolean}
 */
export function isFieldHidden(type, field) {
  const hidden = HIDDEN_FIELDS[type] || [];
  return hidden.includes(field);
}

/**
 * Retorna lista de todos os tipos de imóveis disponíveis
 * @returns {Array<string>}
 */
export function getAllPropertyTypes() {
  return Object.keys(REQUIRED_FIELDS);
}

/**
 * Retorna tipos de imóveis agrupados por categoria
 * @returns {Object}
 */
export function getPropertyTypesByCategory() {
  return {
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
}
