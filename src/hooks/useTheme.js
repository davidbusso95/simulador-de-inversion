import { useState, useEffect, useCallback } from 'react';

/**
 * Hook para manejar el tema (claro/oscuro) de la aplicación
 * Persiste la preferencia en localStorage
 * @returns {[string, Function]} - [tema actual, función para cambiar tema]
 */
export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem('theme');
      if (stored) return stored;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const setThemeByName = useCallback((themeName) => {
    if (themeName === 'light' || themeName === 'dark') {
      setTheme(themeName);
    }
  }, []);

  return { theme, toggleTheme, setThemeByName, isDark: theme === 'dark' };
};

export default useTheme;