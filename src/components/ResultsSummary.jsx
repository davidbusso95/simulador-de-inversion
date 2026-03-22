import Card from './ui/Card';
import { formatCurrency, formatPercentage } from '../utils/formatters';
import { TrendingUp, Wallet, PiggyBank, Percent } from 'lucide-react';
import './ResultsSummary.css';

/**
 * Componente que muestra el resumen de resultados de la inversión
 * @param {Object} data - Datos de resultados del cálculo
 */
const ResultsSummary = ({ data }) => {
  if (!data) {
    return (
      <Card title="Resumen de Inversión" icon={<TrendingUp size={20} />}>
        <div className="results-placeholder">
          <p>Ingresa los parámetros y calcula tu inversión</p>
        </div>
      </Card>
    );
  }

  const {
    finalValue,
    totalContributed,
    totalGain,
    totalReturn,
    years,
  } = data;

  return (
    <Card 
      title="Resumen de Inversión" 
      icon={<TrendingUp size={20} />}
      className="results-summary-card"
    >
      <div className="results-grid">
        <div className="result-item result-primary">
          <div className="result-icon">
            <Wallet size={24} />
          </div>
          <div className="result-content">
            <span className="result-label">Capital Final</span>
            <span className="result-value">{formatCurrency(finalValue)}</span>
            <span className="result-subtitle">Después de {years} años</span>
          </div>
        </div>

        <div className="result-item">
          <div className="result-icon">
            <PiggyBank size={20} />
          </div>
          <div className="result-content">
            <span className="result-label">Total invertido</span>
            <span className="result-value">{formatCurrency(totalContributed)}</span>
          </div>
        </div>

        <div className="result-item result-gain">
          <div className="result-icon">
            <TrendingUp size={20} />
          </div>
          <div className="result-content">
            <span className="result-label">Ganancia total</span>
            <span className="result-value">+{formatCurrency(totalGain)}</span>
          </div>
        </div>

        <div className="result-item">
          <div className="result-icon">
            <Percent size={20} />
          </div>
          <div className="result-content">
            <span className="result-label">Rendimiento</span>
            <span className="result-value">{formatPercentage(totalReturn)}</span>
            <span className="result-subtitle">Rentabilidad total</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ResultsSummary;