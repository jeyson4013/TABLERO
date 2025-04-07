import React from "react";
import obrasData from "../data/obras.json";
import "../styles.css";
import Icono4 from "./svg/Icons4";

const FiltroBarrio = ({ onSelectComuna }) => {
  // Obtener lista única de comunas del JSON
  const comunasUnicas = [
    ...new Set(obrasData.features.map((obra) => obra.properties.comuna)),
  ];
  
  return (
    <div className="filtro-container">
      <label htmlFor="comuna"> <Icono4></Icono4>    Selecciona una Comuna:</label>
      <select id="comuna" onChange={(e) => onSelectComuna(e.target.value)}>
        <option value="">Todas las comunas</option>
        {comunasUnicas.map((comuna, index) => (
          <option key={index} value={comuna}>
            {comuna}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FiltroBarrio;
