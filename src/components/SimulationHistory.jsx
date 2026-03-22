import { useState } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import { formatCurrency, formatPercentage, formatDate } from '../utils/formatters';
import { History, Trash2, RotateCcw } from 'lucide-react';
import './SimulationHistory.css';

/**
 * Componente que muestra el historial de simulaciones guardadas
 * @param {Array} simulations - Lista de simulaciones guardadas
 * @param {Function} onDelete - Función para eliminar una simulación
 * @param {Function} onClearAll - Función para limpiar todo el historial
 * @param {Function} onRestore - Función para restaurar una simulación
 */
const SimulationHistory = ({ simulations, onDelete, onClearAll, onRestore }) => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (!simulations || simulations.length === 0) {
    return (
      <Card title="Historial" icon={<History size={20} />}>
        <div className="history-placeholder">
          <History size={40} strokeWidth={1} />
          <p>No hay simulaciones guardadas</p>
          <span className="history-hint">Guarda una simulación para ver el historial</span>
        </div>
      </Card>
    );
  }

  return (
    <Card 
      title={`Historial (${simulations.length})`} 
      icon={<History size={20} />}
      action={
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClearAll}
          ariaLabel="Limpiar historial"
        >
          <Trash2 size={16} />
        </Button>
      }
      className="history-card"
    >
      <div className="history-list">
        {simulations.map((sim, index) => (
          <div 
            key={sim.id || index} 
            className={`history-item ${expandedId === (sim.id || index) ? 'expanded' : ''}`}
          >
            <div 
              className="history-item-header"
              onClick={() => toggleExpand(sim.id || index)}
              role="button"
              tabIndex={0}
              aria-expanded={expandedId === (sim.id || index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  toggleExpand(sim.id || index);
                }
              }}
            >
              <div className="history-item-info">
                <span className="history-item-title">
                  {formatCurrency(sim.initialAmount)} + {formatCurrency(sim.monthlyContribution)}/mes
                </span>
                <span className="history-item-meta">
                  {sim.annualRate}% por {sim.years} años • {formatDate(sim.date)}
                </span>
              </div>
              <div className="history-item-result">
                <span className="history-result-value">{formatCurrency(sim.finalValue)}</span>
                <span className="history-result-return">{formatPercentage(sim.totalReturn)}</span>
              </div>
            </div>
            
            {expandedId === (sim.id || index) && (
              <div className="history-item-details">
                <div className="history-details-grid">
                  <div className="detail">
                    <span className="detail-label">Total invertido</span>
                    <span className="detail-value">{formatCurrency(sim.totalContributed)}</span>
                  </div>
                  <div className="detail">
                    <span className="detail-label">Ganancia</span>
                    <span className="detail-value text-success">+{formatCurrency(sim.totalGain)}</span>
                  </div>
                </div>
                <div className="history-item-actions">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onRestore(sim)}
                    ariaLabel="Restaurar simulación"
                  >
                    <RotateCcw size={14} />
                    Restaurar
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onDelete(sim.id || index)}
                    ariaLabel="Eliminar simulación"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SimulationHistory;