import React from "react";
import "../styles.css";
import Icono2 from "./svg/Icons2";
import Icono3 from "./svg/icons3";

const Summary = ({ data }) => {
  return (
    // <div className="summary-container"> // Contenedor ya está en App.jsx
    <>
      
      <h3 className="widget-title">Resumen General</h3> {/* Añadir clase */}
      <div className="summary-content"> {/* Contenedor opcional para contenido */}

        <div className="summary-list-item">
          <span className="label">Total de obras:</span>
          <span className="value highlight">{data.total}</span> {/* Puedes usar 'highlight' para acento */}
        </div>

       <h4 className="widget-subtitle"><Icono2></Icono2>  Estado:</h4> {/* Clase opcional para subtítulo */}
        {data.estados.map((e, i) => (
          <div key={`estado-${i}`} className="summary-list-item">
            <span className="label">{e.estado}:</span>
            <span className="value">{e.cantidad}</span>
          </div>
        ))}
              
        <h4 className="widget-subtitle"><Icono3></Icono3> Categoría:</h4> {/* Clase opcional para subtítulo */}
        {data.categorias.map((c, i) => (
          <div key={`cat-${i}`} className="summary-list-item">
            <span className="label">{c.categoria}:</span>
            <span className="value">{c.cantidad}</span>
          </div>
        ))}
      </div>
    </>
    // </div>
  );
};

export default Summary;

// Podrías añadir en styles.css:
// .summary-container .widget-subtitle { margin-top: 1rem; font-weight: 600; color: var(--color-text-primary); }
