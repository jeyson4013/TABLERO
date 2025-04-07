import React from "react";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, ResponsiveContainer
} from "recharts";
import "../styles.css";
import { getColorFromCSS } from "../components/Utils"; // <-- IMPORTAR HELPER

const RadarObras = ({ data }) => {
  // Leer el color principal para el radar desde las variables CSS
  const radarPrimaryColor = getColorFromCSS('--color-accent-primary', '#8884d8'); // Cyan o fallback
  const gridColor = getColorFromCSS('--color-border', '#e0e0e0');
  const textColor = getColorFromCSS('--color-text-secondary', '#666');

  return (
    // Añadimos ResponsiveContainer para mejor ajuste
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart
        cx="50%"
        cy="50%"
        outerRadius="80%"
        data={data}
        margin={{ top: 5, right: 5, bottom: 5, left: 5 }} // Añadido margen
      >
        <PolarGrid stroke={gridColor} />
        <PolarAngleAxis
          dataKey="categoria"
          tick={{ fill: textColor, fontSize: 12 }} // Color y tamaño texto ángulos
        />
        {/* Quitar PolarRadiusAxis si no quieres ver los números del radio */}
        <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={{ fill: textColor, fontSize: 10 }} />
        <Tooltip
           contentStyle={{
             backgroundColor: getColorFromCSS('--color-surface'),
             borderColor: getColorFromCSS('--color-border'),
             color: getColorFromCSS('--color-text-primary'),
             borderRadius: 'var(--border-radius)'
           }}
        />
        <Radar
          name="Obras" // Nombre más genérico
          dataKey="cantidad"
          stroke={radarPrimaryColor} // Usar color leído de CSS
          fill={radarPrimaryColor} // Usar color leído de CSS
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default RadarObras;