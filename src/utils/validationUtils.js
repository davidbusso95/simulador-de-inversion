/**
 * Utilidades de validación para el formulario
 */

export const VALIDATION_RULES = {
  initialAmount: {
    min: 0,
    max: 1000000000,
    message: 'El monto inicial debe estar entre 0 y 1,000,000,000',
  },
  monthlyContribution: {
    min: 0,
    max: 10000000,
    message: 'El aporte mensual debe estar entre 0 y 10,000,000',
  },
  annualRate: {
    min: 0,
    max: 100,
    message: 'La tasa de interés debe estar entre 0% y 100%',
  },
  years: {
    min: 1,
    max: 50,
    message: 'El período debe estar entre 1 y 50 años',
  },
};

/**
 * Valida que un valor sea un número válido
 * @param {any} value - Valor a validar
 * @returns {boolean}
 */
export const isValidNumber = (value) => {
  const num = parseFloat(value);
  return !isNaN(num) && isFinite(num);
};

/**
 * Sanitiza un input numérico
 * @param {string} value - Valor del input
 * @returns {number} Valor sanitizado
 */
export const sanitizeNumberInput = (value) => {
  if (typeof value === 'number') return value;
  const sanitized = String(value).replace(/[^0-9.-]/g, '');
  return parseFloat(sanitized) || 0;
};

/**
 * Valida el monto inicial
 * @param {number} value - Valor a validar
 * @returns {{ valid: boolean, error?: string }}
 */
export const validateInitialAmount = (value) => {
  const num = parseFloat(value);
  if (!isValidNumber(value)) {
    return { valid: false, error: 'Ingrese un monto válido' };
  }
  if (num < VALIDATION_RULES.initialAmount.min || num > VALIDATION_RULES.initialAmount.max) {
    return { valid: false, error: VALIDATION_RULES.initialAmount.message };
  }
  return { valid: true };
};

/**
 * Valida el aporte mensual
 * @param {number} value - Valor a validar
 * @returns {{ valid: boolean, error?: string }}
 */
export const validateMonthlyContribution = (value) => {
  const num = parseFloat(value);
  if (!isValidNumber(value)) {
    return { valid: false, error: 'Ingrese un valor válido' };
  }
  if (num < VALIDATION_RULES.monthlyContribution.min || num > VALIDATION_RULES.monthlyContribution.max) {
    return { valid: false, error: VALIDATION_RULES.monthlyContribution.message };
  }
  return { valid: true };
};

/**
 * Valida la tasa de interés anual
 * @param {number} value - Valor a validar
 * @returns {{ valid: boolean, error?: string }}
 */
export const validateAnnualRate = (value) => {
  const num = parseFloat(value);
  if (!isValidNumber(value)) {
    return { valid: false, error: 'Ingrese un porcentaje válido' };
  }
  if (num < VALIDATION_RULES.annualRate.min || num > VALIDATION_RULES.annualRate.max) {
    return { valid: false, error: VALIDATION_RULES.annualRate.message };
  }
  return { valid: true };
};

/**
 * Valida los años de inversión
 * @param {number} value - Valor a validar
 * @returns {{ valid: boolean, error?: string }}
 */
export const validateYears = (value) => {
  const num = parseInt(value, 10);
  if (!Number.isInteger(num)) {
    return { valid: false, error: 'Ingrese un número entero' };
  }
  if (num < VALIDATION_RULES.years.min || num > VALIDATION_RULES.years.max) {
    return { valid: false, error: VALIDATION_RULES.years.message };
  }
  return { valid: true };
};

/**
 * Valida todos los campos del formulario
 * @param {Object} formData - Datos del formulario
 * @returns {Object} Objeto con errores por campo
 */
export const validateForm = (formData) => {
  return {
    initialAmount: validateInitialAmount(formData.initialAmount),
    monthlyContribution: validateMonthlyContribution(formData.monthlyContribution),
    annualRate: validateAnnualRate(formData.annualRate),
    years: validateYears(formData.years),
  };
};