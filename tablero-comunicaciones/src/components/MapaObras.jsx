import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import obrasData from "../data/obras.json";

const MapaObras = ({ comunaSeleccionada }) => {
  const position = [6.2442, -75.5812]; // Centro de Medellín

  // Filtrar obras según comuna seleccionada
  const obrasFiltradas = comunaSeleccionada
    ? obrasData.features.filter((obra) => obra.properties.comuna === comunaSeleccionada)
    : obrasData.features;

  return (
    <MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {obrasFiltradas.map((obra, idx) => (
        <Marker key={idx} position={[obra.geometry.coordinates[1], obra.geometry.coordinates[0]]}>
          <Popup>
            <strong>{obra.properties.nombre}</strong><br />
            <strong>Categoría:</strong> {obra.properties.categoria}<br />
            <strong>Estado:</strong> {obra.properties.estado}<br />
            <strong>Comuna:</strong> {obra.properties.comuna}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapaObras;

