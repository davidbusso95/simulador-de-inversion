/**
 * Utilidades de formateo para displaying datos
 */

/**
 * Formatea un número como moneda (pesos/dólares)
 * @param {number} value - Valor a formatear
 * @param {string} currency - Símbolo de moneda (default: $)
 * @returns {string} Valor formateado
 */
export const formatCurrency = (value, currency = '$') => {
  if (value === null || value === undefined || isNaN(value)) {
    return `${currency}0`;
  }
  return `${currency}${value.toLocaleString('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

/**
 * Formatea un número como porcentaje
 * @param {number} value - Valor a formatear
 * @returns {string} Porcentaje formateado
 */
export const formatPercentage = (value) => {
  if (value === null || value === undefined || isNaN(value)) {
    return '0%';
  }
  return `${value.toFixed(2)}%`;
};

/**
 * Formatea un número con separadores de miles
 * @param {number} value - Valor a formatear
 * @returns {string} Valor formateado
 */
export const formatNumber = (value) => {
  if (value === null || value === undefined || isNaN(value)) {
    return '0';
  }
  return value.toLocaleString('es-AR');
};

/**
 * Formatea una fecha
 * @param {Date} date - Fecha a formatear
 * @returns {string} Fecha formateada
 */
export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Trunca un texto si es muy largo
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @returns {string} Texto truncado
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};