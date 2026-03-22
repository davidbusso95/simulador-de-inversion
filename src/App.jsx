import { useState, useCallback } from 'react';
import Header from './components/Header';
import InvestmentForm from './components/InvestmentForm';
import ResultsSummary from './components/ResultsSummary';
import ResultsChart from './components/ResultsChart';
import ResultsTable from './components/ResultsTable';
import SimulationHistory from './components/SimulationHistory';
import Button from './components/ui/Button';
import { useTheme } from './hooks/useTheme';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useCalculation } from './hooks/useCalculation';
import './styles/global.css';
import './styles/app.css';

/**
 * Componente principal de la aplicación
 * Encargado de orquestar el estado global y la interacción entre componentes
 */
const App = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  
  const [formParams, setFormParams] = useState({
    initialAmount: 10000,
    monthlyContribution: 1000,
    annualRate: 8,
    years: 10,
  });

  const [simulations, setSimulations] = useLocalStorage('investment-simulations', []);

  const calculationData = useCalculation(formParams);

  const handleCalculate = useCallback((params) => {
    setFormParams(params);
  }, []);

  const handleSaveSimulation = useCallback(() => {
    if (!calculationData) return;

    const newSimulation = {
      id: Date.now(),
      date: new Date().toISOString(),
      initialAmount: formParams.initialAmount,
      monthlyContribution: formParams.monthlyContribution,
      annualRate: formParams.annualRate,
      years: formParams.years,
      finalValue: calculationData.finalValue,
      totalContributed: calculationData.totalContributed,
      totalGain: calculationData.totalGain,
      totalReturn: calculationData.totalReturn,
    };

    setSimulations((prev) => [newSimulation, ...prev].slice(0, 20));
  }, [calculationData, formParams, setSimulations]);

  const handleDeleteSimulation = useCallback((id) => {
    setSimulations((prev) => prev.filter((sim) => sim.id !== id));
  }, [setSimulations]);

  const handleClearHistory = useCallback(() => {
    setSimulations([]);
  }, [setSimulations]);

  const handleRestoreSimulation = useCallback((simulation) => {
    setFormParams({
      initialAmount: simulation.initialAmount,
      monthlyContribution: simulation.monthlyContribution,
      annualRate: simulation.annualRate,
      years: simulation.years,
    });
  }, []);

  return (
    <div className="app">
      <Header isDark={isDark} onToggleTheme={toggleTheme} />
      
      <main className="app-main">
        <div className="app-grid">
          <aside className="sidebar">
            <InvestmentForm onCalculate={handleCalculate} />
            
            {calculationData && (
              <div className="save-section">
                <p>Guarda esta simulación para consultarla después</p>
                <Button 
                  variant="primary" 
                  size="sm" 
                  onClick={handleSaveSimulation}
                  ariaLabel="Guardar simulación actual"
                >
                  Guardar
                </Button>
              </div>
            )}
          </aside>

          <section className="results-section" aria-label="Resultados de inversión">
            <ResultsSummary data={calculationData} />
            <div className="chart-table-wrapper">
              <ResultsChart data={calculationData?.yearlyData} />
              <ResultsTable data={calculationData?.yearlyData} />
            </div>
          </section>

          <aside className="history-section">
            <SimulationHistory 
              simulations={simulations}
              onDelete={handleDeleteSimulation}
              onClearAll={handleClearHistory}
              onRestore={handleRestoreSimulation}
            />
          </aside>
        </div>
      </main>

      <footer className="footer" role="contentinfo">
        <p>© {new Date().getFullYear()} Simulador de Inversión. Calcula tu futuro financiero.</p>
      </footer>
    </div>
  );
};

export default App;