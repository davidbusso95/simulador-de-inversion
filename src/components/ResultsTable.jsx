import Card from './ui/Card';
import { formatCurrency } from '../utils/formatters';
import { Table } from 'lucide-react';
import './ResultsTable.css';

/**
 * Componente de tabla que muestra el detalle año por año
 * @param {Array} data - Datos anuales de la inversión
 */
const ResultsTable = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <Card title="Detalle Anual" icon={<Table size={20} />}>
        <div className="table-placeholder">
          <p>No hay datos para mostrar</p>
        </div>
      </Card>
    );
  }

  return (
    <Card 
      title="Detalle Anual" 
      icon={<Table size={20} />}
      className="results-table-card"
    >
      <div className="table-wrapper">
        <table className="results-table" role="table" aria-label="Tabla de crecimiento anual">
          <thead>
            <tr>
              <th scope="col">Año</th>
              <th scope="col" className="text-right">Capital Total</th>
              <th scope="col" className="text-right">Total Invertido</th>
              <th scope="col" className="text-right">Ganancia</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.year}>
                <td>
                  <span className="year-badge">Año {row.year}</span>
                </td>
                <td className="text-right font-semibold">
                  {formatCurrency(row.balance)}
                </td>
                <td className="text-right text-secondary">
                  {formatCurrency(row.contributed)}
                </td>
                <td className="text-right text-success">
                  +{formatCurrency(row.interest)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ResultsTable;