import Button from './ui/Button';
import { TrendingUp, Sun, Moon } from 'lucide-react';
import './Header.css';

/**
 * Componente Header con logo, título y controls de tema
 * @param {boolean} isDark - Si el tema actual es oscuro
 * @param {Function} onToggleTheme - Función para cambiar tema
 */
const Header = ({ isDark, onToggleTheme }) => {
  return (
    <header className="header" role="banner">
      <div className="header-brand">
        <div className="header-logo">
          <TrendingUp size={28} strokeWidth={2.5} />
        </div>
        <div className="header-text">
          <h1 className="header-title">Simulador de Inversión</h1>
          <span className="header-subtitle">Calcula tu crecimiento financiero</span>
        </div>
      </div>

      <nav className="header-nav" aria-label="Navegación principal">
        <Button
          variant="ghost"
          onClick={onToggleTheme}
          ariaLabel={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          className="theme-toggle"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </Button>
      </nav>
    </header>
  );
};

export default Header;