import PropTypes from 'prop-types';
import './Input.css';

/**
 * Componente Input reutilizable con validación
 * @param {string} label - Etiqueta del input
 * @param {string} name - Nombre del input
 * @param {string} type - Tipo de input (text, number, etc)
 * @param {any} value - Valor del input
 * @param {Function} onChange - Función al cambiar
 * @param {string} placeholder - Placeholder
 * @param {string} error - Mensaje de error
 * @param {string} helpText - Texto de ayuda
 * @param {boolean} required - Si es requerido
 * @param {string} suffix - Sufijo (ej: %, $)
 * @param {string} prefix - Prefijo
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @param {number} step - Paso
 */
export const Input = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  helpText,
  required = false,
  suffix,
  prefix,
  min,
  max,
  step,
}) => {
  const inputId = `input-${name}`;
  const errorId = `error-${name}`;
  const helpId = `help-${name}`;

  return (
    <div className={`input-wrapper ${error ? 'input-error' : ''}`}>
      <label htmlFor={inputId} className="input-label">
        {label}
        {required && <span className="input-required" aria-hidden="true">*</span>}
      </label>
      
      <div className="input-container">
        {prefix && <span className="input-addon input-prefix">{prefix}</span>}
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`input-field ${prefix ? 'has-prefix' : ''} ${suffix ? 'has-suffix' : ''}`}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : helpText ? helpId : undefined}
          required={required}
          min={min}
          max={max}
          step={step}
        />
        {suffix && <span className="input-addon input-suffix">{suffix}</span>}
      </div>

      {error && (
        <span id={errorId} className="input-error-message" role="alert">
          {error}
        </span>
      )}
      
      {helpText && !error && (
        <span id={helpId} className="input-help-text">
          {helpText}
        </span>
      )}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  helpText: PropTypes.string,
  required: PropTypes.bool,
  suffix: PropTypes.string,
  prefix: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
};

export default Input;