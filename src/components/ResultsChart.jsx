import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import Card from './ui/Card';
import { formatCurrency } from '../utils/formatters';
import { LineChart } from 'lucide-react';
import './ResultsChart.css';

/**
 * Componente de gráfico de área que muestra la evolución de la inversión
 * @param {Array} data - Datos anuales de la inversión
 */
const ResultsChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <Card title="Evolución de la Inversión" icon={<LineChart size={20} />}>
        <div className="chart-placeholder">
          <p>No hay datos para mostrar</p>
        </div>
      </Card>
    );
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-year">Año {label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="tooltip-item" style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card 
      title="Evolución de la Inversión" 
      icon={<LineChart size={20} />}
      className="results-chart-card"
    >
      <div className="chart-container" role="img" aria-label="Gráfico de crecimiento de inversión">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorContributed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis 
              dataKey="year" 
              stroke="var(--color-text-secondary)"
              tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="var(--color-text-secondary)"
              tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '1rem' }}
              formatter={(value) => <span style={{ color: 'var(--color-text)' }}>{value}</span>}
            />
            <Area
              type="monotone"
              dataKey="balance"
              name="Capital total"
              stroke="#6366f1"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorBalance)"
              animationDuration={1000}
            />
            <Area
              type="monotone"
              dataKey="contributed"
              name="Invertido"
              stroke="#10b981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorContributed)"
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default ResultsChart;