import { useState, useEffect } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';
import Card from './ui/Card';
import { validateForm, sanitizeNumberInput } from '../utils/validationUtils';
import { Calculator } from 'lucide-react';
import './InvestmentForm.css';

/**
 * Componente de formulario para ingresar parámetros de inversión
 * @param {Function} onCalculate - Función llamada al calcular
 */
const InvestmentForm = ({ onCalculate }) => {
  const [formData, setFormData] = useState({
    initialAmount: '10000',
    monthlyContribution: '1000',
    annualRate: '8',
    years: '10',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitized = sanitizeNumberInput(value);
    setFormData((prev) => ({ ...prev, [name]: sanitized }));
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validation = validateForm(formData);
    const newErrors = {};
    let hasErrors = false;

    Object.keys(validation).forEach((field) => {
      if (!validation[field].valid) {
        newErrors[field] = validation[field].error;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onCalculate({
      initialAmount: parseFloat(formData.initialAmount),
      monthlyContribution: parseFloat(formData.monthlyContribution),
      annualRate: parseFloat(formData.annualRate),
      years: parseInt(formData.years, 10),
    });
  };

  useEffect(() => {
    onCalculate({
      initialAmount: parseFloat(formData.initialAmount) || 0,
      monthlyContribution: parseFloat(formData.monthlyContribution) || 0,
      annualRate: parseFloat(formData.annualRate) || 0,
      years: parseInt(formData.years, 10) || 1,
    });
  }, []);

  return (
    <Card 
      title="Parámetros de Inversión" 
      icon={<Calculator size={20} />}
      className="investment-form-card"
    >
      <form onSubmit={handleSubmit} className="investment-form">
        <Input
          label="Monto inicial"
          name="initialAmount"
          type="number"
          value={formData.initialAmount}
          onChange={handleChange}
          prefix="$"
          error={errors.initialAmount}
          helpText="Cantidad que invertirás al comenzar"
          required
          min={0}
          step={100}
        />

        <Input
          label="Aporte mensual"
          name="monthlyContribution"
          type="number"
          value={formData.monthlyContribution}
          onChange={handleChange}
          prefix="$"
          error={errors.monthlyContribution}
          helpText="Cantidad que agregarás cada mes"
          min={0}
          step={100}
        />

        <Input
          label="Tasa de interés anual"
          name="annualRate"
          type="number"
          value={formData.annualRate}
          onChange={handleChange}
          suffix="%"
          error={errors.annualRate}
          helpText="Rendimiento esperado por año"
          required
          min={0}
          max={100}
          step={0.1}
        />

        <Input
          label="Período de inversión"
          name="years"
          type="number"
          value={formData.years}
          onChange={handleChange}
          suffix="años"
          error={errors.years}
          helpText="Duración total de la inversión"
          required
          min={1}
          max={50}
          step={1}
        />

        <Button type="submit" variant="primary" size="lg" className="calculate-btn">
          Calcular Inversión
        </Button>
      </form>
    </Card>
  );
};

export default InvestmentForm;