/**
 * Utilidades para cálculos financieros
 * Cálculo de interés compuesto con aportes mensuales
 */

/**
 * Calcula el crecimiento de una inversión con interés compuesto
 * @param {number} initialAmount - Monto inicial de la inversión
 * @param {number} monthlyContribution - Aporte mensual
 * @param {number} annualRate - Tasa de interés anual (en porcentaje)
 * @param {number} years - Número de años
 * @returns {Array} Array de objetos con el detalle por año
 */
export const calculateCompoundInterest = (initialAmount, monthlyContribution, annualRate, years) => {
  const monthlyRate = annualRate / 100 / 12;
  const results = [];
  
  let totalBalance = initialAmount;
  let totalContributed = initialAmount;

  for (let year = 1; year <= years; year++) {
    for (let month = 1; month <= 12; month++) {
      totalBalance = (totalBalance + monthlyContribution) * (1 + monthlyRate);
      totalContributed += monthlyContribution;
    }

    results.push({
      year,
      balance: parseFloat(totalBalance.toFixed(2)),
      contributed: parseFloat(totalContributed.toFixed(2)),
      interest: parseFloat((totalBalance - totalContributed).toFixed(2)),
    });
  }

  return results;
};

/**
 * Calcula el valor final de una inversión
 * @param {number} initialAmount - Monto inicial
 * @param {number} monthlyContribution - Aporte mensual
 * @param {number} annualRate - Tasa anual
 * @param {number} years - Años
 * @returns {number} Valor final
 */
export const calculateFinalValue = (initialAmount, monthlyContribution, annualRate, years) => {
  const results = calculateCompoundInterest(initialAmount, monthlyContribution, annualRate, years);
  return results.length > 0 ? results[results.length - 1].balance : initialAmount;
};

/**
 * Calcula la ganancia total
 * @param {number} initialAmount - Monto inicial
 * @param {number} monthlyContribution - Aporte mensual
 * @param {number} years - Años
 * @param {number} finalValue - Valor final
 * @returns {number} Ganancia total
 */
export const calculateTotalGain = (initialAmount, monthlyContribution, years, finalValue) => {
  const totalContributed = initialAmount + (monthlyContribution * 12 * years);
  return parseFloat((finalValue - totalContributed).toFixed(2));
};

/**
 * Calcula el rendimiento total en porcentaje
 * @param {number} totalContributed - Total invertido
 * @param {number} finalValue - Valor final
 * @returns {number} Porcentaje de rendimiento
 */
export const calculateTotalReturn = (totalContributed, finalValue) => {
  if (totalContributed === 0) return 0;
  return parseFloat((((finalValue - totalContributed) / totalContributed) * 100).toFixed(2));
};