/**
 * Configuração de campos condicionais por tipo de imóvel
 * SIMPLIFICADO: Todos os campos disponíveis para todos os tipos
 * Se não aplicar, preencher com 0 e não aparecerá nos detalhes
 */

// Campos obrigatórios por tipo de imóvel
export const REQUIRED_FIELDS = {
  // NENHUM CAMPO CONDICIONAL OBRIGATÓRIO
  // Apenas campos básicos são obrigatórios (validados nas rotas)
};

// Campos que NÃO devem ser preenchidos (não aplicáveis) por tipo
export const HIDDEN_FIELDS = {
  // NENHUM CAMPO ESCONDIDO
  // Todos os campos aparecem para todos os tipos
  // Se não aplicar, preencher com 0
};

// Campos opcionais por tipo (podem ou não ser preenchidos)
export const OPTIONAL_FIELDS = {
  // Todos os campos são opcionais para todos os tipos
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
 * SIMPLIFICADO: Não valida mais campos condicionais
 * @param {string} type - Tipo do imóvel
 * @param {Object} data - Dados do imóvel
 * @returns {Array} Array de erros (sempre vazio agora)
 */
export function validatePropertyFields(type, data) {
  // Não validar mais campos condicionais
  // Todos os campos são aceitos para todos os tipos
  return [];
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
