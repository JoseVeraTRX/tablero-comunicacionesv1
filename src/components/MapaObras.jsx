import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet"; 

// 📌 Corrección de íconos por defecto en React-Leaflet
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetinaUrl,
  iconUrl: iconUrl,
  shadowUrl: shadowUrl,
});

// 📌 Función para asignar color según el estado
const getColorByEstado = (estado) => {
  const estadoColores = {
    "Proyectado": "#fd7e14", // Naranja
    "En Ejecucion": "#007bff",  // Azul 
    "Suspendido": "#dc3545",  // Rojo
    "Ejecutado": "#28a745",  // Verde
  };

  return estadoColores[estado] || "#6c757d"; // Gris por defecto si no se reconoce el estado
};

// 📌 Función para crear un marcador circular con el color del estado
const getCircleIcon = (estado) => {
  const color = getColorByEstado(estado);

  return L.divIcon({
    className: "custom-marker",
    html: `<div style="
      width: 10px;
      height: 10px;
      background-color: ${color};
      border-radius: 50%;
      border: 1px solid white;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    "></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9], // Centra el marcador
    popupAnchor: [0, -10],
  });
};

// 📌 Componente para centrar el mapa según los marcadores
const ChangeView = ({ bounds }) => {
  const map = useMap();
  if (bounds.isValid()) {
    map.flyToBounds(bounds, { padding: [50, 50] });
  }
  return null;
};

// 📌 Componente principal del Mapa
const MapaObras = ({ obrasParaMostrar = [] }) => {
  const initialCenter = [6.2442, -75.5812];
  const initialZoom = 12;

  const bounds = L.latLngBounds(
    obrasParaMostrar.map((obra) => [
      obra.geometry.coordinates[1], 
      obra.geometry.coordinates[0],
    ])
  );

  return (
    <MapContainer
      center={initialCenter}
      zoom={initialZoom}
      minZoom={11}  // Aquí defines el nivel mínimo de zoom permitido
      style={{ height: "calc(100vh - 150px)", width: "100%" }}
      scrollWheelZoom={true}
      whenCreated={(mapInstance) => {
        if (bounds.isValid()) {
          mapInstance.fitBounds(bounds, { padding: [50, 50] });
        }
      }}
    >
      <TileLayer
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {obrasParaMostrar.map((obra) => (
        <Marker
          key={obra.properties.ID}
          position={[
            obra.geometry.coordinates[1],
            obra.geometry.coordinates[0],
          ]}
          icon={getCircleIcon(obra.properties?.["Estado del Proyecto"])}
        >
          <Popup>
            <strong>{obra.properties?.["Nombre del Proyecto"] || "Sin Nombre"}</strong><br />
            <strong>Categoría:</strong> {obra.properties?.Categoria || "N/A"}<br />
            <strong>Grupo:</strong> {obra.properties?.["Grupo del Proyecto"] || "N/A"}<br />
            <strong>Estado:</strong> {obra.properties?.["Estado del Proyecto"] || "N/A"}<br />
            <strong>Comuna:</strong> {obra.properties?.Comuna || "N/A"}<br />
            <strong>Barrio:</strong> {obra.properties?.["Nombre Barrio"] || "N/A"}<br />
            <strong>Dirección:</strong> {obra.properties?.Direccion || "N/A"}
          </Popup>
        </Marker>
      ))}

      {bounds.isValid() && <ChangeView bounds={bounds} />}
    </MapContainer>
  );
};

export default MapaObras;
