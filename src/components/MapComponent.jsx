import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MapComponent.css";

const MapComponent = ({ coalMines }) => {
    return (
        <div className="map-wrapper">
            <MapContainer center={[39.8283, -98.5795]} zoom={5} className="map-container">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {coalMines.map((mine, index) => (
                    <Marker key={index} position={[mine.lat, mine.lng]}>
                        <Popup>{mine.name}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapComponent;