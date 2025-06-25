import React from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "../../assets/gps.png";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const Map = ({ lat, lon, universityName, universityLocation }) => {
  const customIcon = new L.Icon({
    iconUrl: markerIconPng,
    iconSize: [40, 40],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
  return (
    <div>
      <MapContainer
        center={[lat, lon]}
        zoom={15}
        scrollWheelZoom={true}
        className="h-[300px] z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker icon={customIcon} position={[lat, lon]}>
          <Popup>
            {universityName} <br /> {universityLocation}.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
