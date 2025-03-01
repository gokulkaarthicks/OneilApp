import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./MapComponent.css";

// Professional red marker for Leaflet
const redIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

// Component to fly to a selected mine
const FlyToMine = ({ selectedMine }) => {
    const map = useMap();
    useEffect(() => {
        if (selectedMine) {
            map.flyTo([selectedMine.lat, selectedMine.lng], 8, { animate: true });
        }
    }, [selectedMine, map]);
    return null;
};

const MapComponent = ({ coalMines, searchQuery, setSearchQuery }) => {
    const [filteredMines, setFilteredMines] = useState(coalMines);
    const [selectedMine, setSelectedMine] = useState(null);

    // Update filtered mines when filters change
    useEffect(() => {
        setFilteredMines(coalMines);
    }, [coalMines]);

    // Handle search query
    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredMines(coalMines);
            setSelectedMine(null);
        } else {
            const result = coalMines.find(mine =>
                mine.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredMines(result ? [result] : []);
            setSelectedMine(result || null);
        }
    }, [searchQuery, coalMines]);

    return (
        <div className="map-wrapper">
            {/* Search Bar Overlay */}
            <input 
                type="text" 
                placeholder="🔍 Search Mine by Name..." 
                className="map-search-bar"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            <MapContainer center={[39.8283, -98.5795]} zoom={5} className="map-container">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {selectedMine && <FlyToMine selectedMine={selectedMine} />}
                
                {filteredMines.length > 0 ? (
                    filteredMines.map((mine, index) => (
                        <Marker key={index} position={[mine.lat, mine.lng]} icon={redIcon}>
                            <Popup>
                                <strong>{mine.name}</strong><br />
                                ⛏ {mine.mineral} | 🏢 {mine.company} <br />
                                📍 {mine.state} | 🔄 {mine.project}
                            </Popup>
                        </Marker>
                    ))
                ) : (
                    <div className="no-mines-message">
                        ❌ No mines found matching the search or filters.
                    </div>
                )}
            </MapContainer>
        </div>
    );
};

export default MapComponent;