import React from "react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList
} from "recharts";
import "../styles.css";
import { getColorFromCSS } from "../components/Utils"; // <-- IMPORTAR HELPER

// Ya no hardcodeamos colores, leemos las variables CSS
const getBarColor = (estado) => {
    // Mapeamos estados a las variables CSS semánticas que definiste
    switch (estado) {
        case "Proyectado":
            // Usamos un color secundario o define una variable específica si prefieres
            return getColorFromCSS('--color-text-secondary', '#8884d8');
        case "En Ejecucion":
            return getColorFromCSS('--color-accent-secondary', '#82ca9d'); // Naranja (según tu CSS)
        case "Finalizada":
            return getColorFromCSS('--color-accent-primary', '#ffc658'); // Cyan (según tu CSS)
        // case "Suspendido": // Si tuvieras este estado
        //     return getColorFromCSS('--color-warning', '#f54242'); // Ejemplo, necesitarías definir --color-warning
        default:
            return "#a6a6a6"; // Un gris neutro como fallback final
    }
};

const HistogramaEstados = ({ data }) => {
    // Asegúrate que los datos que llegan aquí desde App.jsx tienen la estructura correcta { estado: 'NombreEstado', cantidad: N }
    const processedData = data.map(item => ({
        ...item,
        // Añadimos el color calculado a cada item de datos para que la prop 'fill' lo use
        fillColor: getBarColor(item.estado)
    }));

    return (
        <div className="histograma-container">
            {/* Título ahora se pone en App.jsx con .widget-title */}
            <ResponsiveContainer width="100%" height={350}>
                <BarChart
                    data={processedData} // Usamos los datos con el color ya añadido
                    margin={{ top: 15, right: 30, left: 0, bottom: 20 }} // Aumentado bottom margin para labels X
                    barSize={50}
                    // dataKey="estado" // No necesario si las barras se definen explícitamente abajo
                >
                    <CartesianGrid strokeDasharray="3 3" stroke={getColorFromCSS('--color-border')} />
                    {/* Usar variable CSS para el color del texto de los ejes */}
                    <XAxis
                      dataKey="estado"
                      tick={{ fill: getColorFromCSS('--color-text-secondary'), fontSize: 12 }}
                      // angle={-15} // Descomentar si los nombres son largos
                      // textAnchor="end" // Descomentar si los nombres son largos
                    />
                    <YAxis tick={{ fill: getColorFromCSS('--color-text-secondary'), fontSize: 12 }} />
                    <Tooltip
                      cursor={{ fill: 'rgba(204, 204, 204, 0.2)' }}
                      contentStyle={{
                        backgroundColor: getColorFromCSS('--color-surface'),
                        borderColor: getColorFromCSS('--color-border'),
                        color: getColorFromCSS('--color-text-primary'), // Color texto tooltip
                        borderRadius: 'var(--border-radius)'
                      }}
                    />
                    {/* Usamos la función fill que accede al color precalculado */}
                    <Bar
                        dataKey="cantidad"
                        fill={(entry) => entry.fillColor} // Accede al color calculado
                        isAnimationActive={false}
                    >
                        {/* Usar variable CSS para el color del texto de las etiquetas */}
                        <LabelList
                            dataKey="cantidad"
                            position="top"
                            fill={getColorFromCSS('--color-text-primary')}
                            fontSize={12}
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default HistogramaEstados;

/*const HistogramaEstados = ({ data }) => {
  return (
    <div className="histograma-container">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          barSize={50}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="estado" />
          <YAxis />
          <Tooltip />
          {data.map((entry, index) => (
            <Bar
              key={index}
              dataKey="cantidad"
              //data={[entry]}   //se comento este codigo para prueba y funciona en en las 3 colunas pero se ve triplicado el dato
              fill={getBarColor(entry.estado)}
              isAnimationActive={false}
            >
              <LabelList dataKey="cantidad" position="top" />
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HistogramaEstados;*/
