import PropTypes from 'prop-types';
import './Button.css';

/**
 * Componente Button reutilizable
 * @param {string} children - Contenido del botón
 * @param {string} variant - Variante del botón (primary, secondary, danger, ghost)
 * @param {string} size - Tamaño del botón (sm, md, lg)
 * @param {boolean} disabled - Si el botón está deshabilitado
 * @param {Function} onClick - Función al hacer click
 * @param {string} type - Tipo de botón (button, submit, reset)
 * @param {string} className - Clases adicionales
 * @param {string} ariaLabel - Accessibility label
 */
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ariaLabel,
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size} ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'ghost']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
};

export default Button;