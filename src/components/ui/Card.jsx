import PropTypes from 'prop-types';
import './Card.css';

/**
 * Componente Card reutilizable
 * @param {string} title - Título de la tarjeta
 * @param {node} children - Contenido
 * @param {string} className - Clases adicionales
 * @param {string} icon - Icono (opcional)
 * @param {string} action - Contenido de acción (opcional)
 */
export const Card = ({ title, children, className = '', icon, action }) => {
  return (
    <div className={`card ${className}`}>
      {(title || icon || action) && (
        <div className="card-header">
          <div className="card-title-container">
            {icon && <span className="card-icon">{icon}</span>}
            {title && <h3 className="card-title">{title}</h3>}
          </div>
          {action && <div className="card-action">{action}</div>}
        </div>
      )}
      <div className="card-content">{children}</div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  icon: PropTypes.node,
  action: PropTypes.node,
};

export default Card;