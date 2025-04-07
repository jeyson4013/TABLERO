import React, { useState, useEffect } from "react";
import MapaObras from "./components/MapaObras";
import RadarObras from "./components/RadarObras";
import HistogramaEstados from "./components/HistogramaEstados";
import TreeMapObras from "./components/TreeMapObras";
import obrasData from "./data/obras.json";
import Header from "./components/Header";
import Paneles from "./components/Paneles"; // Asegúrate que Paneles ahora acepta props
import FiltroBarrio from "./components/FiltroBarrio";
import Summary from "./components/Summary"; // Asegúrate que Summary ahora usa las clases correctas
import "./styles.css";
import Icono2 from "./components/svg/Icons2";
import Icono3 from "./components/svg/icons3";
import Icono5 from "./components/svg/Icons5";

const App = () => {
  // Estado y lógica modo oscuro
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);
  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  // --- Lógica existente para filtrar y procesar datos ---
  const [comunaSeleccionada, setComunaSeleccionada] = useState("");

  const obrasFiltradas = comunaSeleccionada
    ? obrasData.features.filter(
        (obra) => obra.properties.comuna === comunaSeleccionada
      )
    : obrasData.features;

  // --- Cálculos para los paneles (YA EXISTENTES EN TU CÓDIGO) ---
  const total = obrasFiltradas.length;
  const ejecucion = obrasFiltradas.filter(
    (obra) => obra.properties.estado === "En Ejecucion"
  ).length;
  const proyectado = obrasFiltradas.filter(
    (obra) => obra.properties.estado === "Proyectado"
  ).length;
  const finalizadas = obrasFiltradas.filter(
    (obra) => obra.properties.estado === "Finalizada"
  ).length;
  // --- Fin Cálculos para los paneles ---

  // --- Otros cálculos (Radar, Histograma, Resumen - YA EXISTENTES) ---
   const categoriasUnicas = [
    ...new Set(obrasFiltradas.map((obra) => obra.properties.categoria)),
  ];
  const radarData = categoriasUnicas.map((categoria) => ({
    categoria,
    cantidad: obrasFiltradas.filter(
      (obra) => obra.properties.categoria === categoria
    ).length,
  }));

  const estadosUnicos = [
    ...new Set(obrasFiltradas.map((obra) => obra.properties.estado)),
  ];
  const histogramaData = estadosUnicos.map((estado) => ({
    estado,
    cantidad: obrasFiltradas.filter(
      (obra) => obra.properties.estado === estado
    ).length,
  }));

  const resumen = {
    total,
    estados: estadosUnicos.map((estado) => ({
      estado,
      cantidad: obrasFiltradas.filter(
        (obra) => obra.properties.estado === estado
      ).length,
    })),
    categorias: categoriasUnicas.map((categoria) => ({
      categoria,
      cantidad: obrasFiltradas.filter(
        (obra) => obra.properties.categoria === categoria
      ).length,
    })),
  };
  // --- Fin Otros cálculos ---


  return (
    <div className="dashboard-container">
      <div className="header-container">
        <Header />
        <button onClick={toggleDarkMode} className="modo-btn">
          {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
        </button>
      </div>

      {/* 📋 Paneles de resumen - Pasar props */}
      {/* ***** CAMBIO REALIZADO AQUÍ ***** */}
      <div className="paneles-container">
        <Paneles
          total={total}                   // Prop 'total' recibe la variable 'total'
          ejecucion={ejecucion}           // Prop 'ejecucion' recibe la variable 'ejecucion'
          proyectado={proyectado}         // Prop 'proyectado' recibe la variable 'proyectado'
          finalizadas={finalizadas}       // Prop 'finalizadas' recibe la variable 'finalizadas'
        />
      </div>
      {/* ***** FIN DEL CAMBIO ***** */}


      <div className="filtro-container">
        <FiltroBarrio onSelectComuna={setComunaSeleccionada} />
      </div>

      <div className="map-container">
        <MapaObras comunaSeleccionada={comunaSeleccionada} />
      </div>

      <div className="summary-container">
        {/* Asegúrate que Summary fue refactorizado como en el paso anterior */}
        <Summary data={resumen} />
      </div>

      <div className="chart-container"> 
        <div className="chart-item">
          <h3 className="widget-title"><Icono3></Icono3> Obras por Categoría</h3>
          <RadarObras data={radarData} />
        </div>
        <div className="chart-item">
          <h3 className="widget-title"><Icono2></Icono2> Obras por Estado</h3>
          <HistogramaEstados data={histogramaData} />
        </div>
        <div className="chart-item"> 
          <h3 className="widget-title"><Icono5></Icono5> Obras por Categoría (Visualización TreeMap)</h3>
          {/* Revisa si TreeMap usa radarData o necesita otros datos */}
          <TreeMapObras data={radarData} />
        </div>
      </div>
    </div>
  );
};

export default App;