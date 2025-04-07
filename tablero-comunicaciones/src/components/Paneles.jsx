import React from "react";
import "../styles.css"; // Asegúrate de que la ruta al CSS sea correcta

// Recibe los datos como props (total, ejecucion, proyectado, finalizadas)
const Paneles = ({ total, ejecucion, proyectado, finalizadas }) => {

  // Estructura de datos para mapear y generar los paneles
  const panelData = [
    { label: "Obras Totales", value: total, type: "total" }, // 'type' se usa para la clase CSS
    { label: "En Ejecución", value: ejecucion, type: "ejecucion" },
    { label: "Proyectadas", value: proyectado, type: "proyectado" },
    { label: "Finalizadas", value: finalizadas, type: "finalizadas" },
  ];

  return (
    // Usamos un Fragmento <> porque el contenedor .paneles-container ya está en App.jsx
    <>
      {panelData.map((panel, index) => (
        // Generamos cada tarjeta de panel
        <div key={index} className={`panel-card ${panel.type}`}>
          {/* 
             Usamos las clases 'value' y 'label' que espera el CSS.
             Añadimos la clase dinámica basada en 'panel.type' (ej., 'ejecucion')
             al div principal para permitir estilos específicos (como colores de acento).
          */}
          <span className="value">
            {/* Mostramos 'N/A' si el valor no está definido */}
            {panel.value !== undefined ? panel.value : 'N/A'}
          </span>
          <span className="label">
            {panel.label}
          </span>
        </div>
      ))}
    </>
  );
};

export default Paneles;