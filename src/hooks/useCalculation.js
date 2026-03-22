import { useMemo } from 'react';
import {
  calculateCompoundInterest,
  calculateFinalValue,
  calculateTotalGain,
  calculateTotalReturn,
} from '../utils/calculationUtils';

/**
 * Hook para calcular el crecimiento de la inversión
 * @param {Object} params - Parámetros de inversión
 * @returns {Object} Resultados de los cálculos
 */
export const useCalculation = ({ initialAmount, monthlyContribution, annualRate, years }) => {
  const results = useMemo(() => {
    const parsedInitial = parseFloat(initialAmount) || 0;
    const parsedMonthly = parseFloat(monthlyContribution) || 0;
    const parsedRate = parseFloat(annualRate) || 0;
    const parsedYears = parseInt(years, 10) || 0;

    if (parsedInitial < 0 || parsedMonthly < 0 || parsedRate < 0 || parsedYears < 1) {
      return null;
    }

    const yearlyData = calculateCompoundInterest(
      parsedInitial,
      parsedMonthly,
      parsedRate,
      parsedYears
    );

    const finalValue = calculateFinalValue(
      parsedInitial,
      parsedMonthly,
      parsedRate,
      parsedYears
    );

    const totalContributed = parsedInitial + (parsedMonthly * 12 * parsedYears);
    const totalGain = calculateTotalGain(parsedInitial, parsedMonthly, parsedYears, finalValue);
    const totalReturn = calculateTotalReturn(totalContributed, finalValue);

    return {
      yearlyData,
      finalValue,
      totalContributed,
      totalGain,
      totalReturn,
      years: parsedYears,
    };
  }, [initialAmount, monthlyContribution, annualRate, years]);

  return results;
};

export default useCalculation;