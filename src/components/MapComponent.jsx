import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./MapComponent.css";

// Use the default professional red marker from Leaflet
const redIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png",
    iconSize: [25, 41], // Default Leaflet marker size
    iconAnchor: [12, 41], // Center the marker correctly
    popupAnchor: [1, -34],
    shadowSize: [41, 41], // Shadow size
});

const MapComponent = ({ coalMines }) => {
    return (
        <div className="map-wrapper">
            <MapContainer center={[39.8283, -98.5795]} zoom={5} className="map-container">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {coalMines.map((mine, index) => (
                    <Marker key={index} position={[mine.lat, mine.lng]} icon={redIcon}>
                        <Popup>{mine.name}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapComponent;