// utils/cssUtils.js (o similar)
export const getColorFromCSS = (variableName, fallbackColor = '#cccccc') => {
    // Asegurarse de que se ejecuta en el navegador
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      try {
        // Obtener el estilo computado del elemento raíz (:root)
        const style = getComputedStyle(document.documentElement);
        // Obtener el valor de la variable y quitar espacios extra
        const colorValue = style.getPropertyValue(variableName).trim();
        // Devolver el valor si no está vacío, si no, el fallback
        return colorValue || fallbackColor;
      } catch (error) {
        console.error(`Error reading CSS variable ${variableName}:`, error);
        return fallbackColor;
      }
    }
    // Devolver fallback si no estamos en el navegador (SSR, etc.)
    return fallbackColor;
  };