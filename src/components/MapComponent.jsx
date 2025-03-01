import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import "./MapComponent.css";

// Red Marker for Mines
const redIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

// Component to Center Map on a Selected Mine
const FlyToMine = ({ selectedMine }) => {
    const map = useMap();
    useEffect(() => {
        if (selectedMine) {
            map.flyTo([selectedMine.lat, selectedMine.lng], 8, { animate: true });
        }
    }, [selectedMine, map]);
    return null;
};

// Heatmap Layer Component
const HeatmapLayer = ({ points }) => {
    const map = useMap();
    useEffect(() => {
        const heatLayer = L.heatLayer(points, {
            radius: 25,
            blur: 15,
            maxZoom: 10,
            gradient: { 0.2: "blue", 0.5: "yellow", 0.8: "orange", 1.0: "red" },
        }).addTo(map);

        return () => {
            map.removeLayer(heatLayer);
        };
    }, [points, map]);

    return null;
};

const MapComponent = ({ coalMines, searchQuery, setSearchQuery }) => {
    const [filteredMines, setFilteredMines] = useState(coalMines);
    const [selectedMine, setSelectedMine] = useState(null);
    const [heatmapEnabled, setHeatmapEnabled] = useState(false);

    // Update Filtered Mines
    useEffect(() => {
        setFilteredMines(coalMines);
    }, [coalMines]);

    // Handle Search Query
    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredMines(coalMines);
            setSelectedMine(null);
        } else {
            const result = coalMines.find((mine) =>
                mine.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredMines(result ? [result] : []);
            setSelectedMine(result || null);
        }
    }, [searchQuery, coalMines]);

    // Convert mines to Heatmap Points
    const heatmapData = filteredMines.map((mine) => [mine.lat, mine.lng, 0.5]);

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

                {/* Heatmap Toggle Handling */}
                {heatmapEnabled && heatmapData.length > 0 ? <HeatmapLayer points={heatmapData} /> : null}

                {!heatmapEnabled && filteredMines.length > 0 ? (
                    filteredMines.map((mine, index) => (
                        <Marker key={index} position={[mine.lat, mine.lng]} icon={redIcon}>
                            <Popup>
                                <strong>{mine.name}</strong><br />
                                ⛏ {mine.mineral} | 🏢 {mine.company} <br />
                                📍 {mine.state} | 🔄 {mine.project}
                            </Popup>
                        </Marker>
                    ))
                ) : !heatmapEnabled ? (
                    <div className="no-mines-message">❌ No mines found matching the search or filters.</div>
                ) : null}
            </MapContainer>

            {/* Small Pill-Shaped Heatmap Toggle (Now Properly Positioned) */}
            <div className="heatmap-toggle">
                <label className="switch">
                    <input 
                        type="checkbox" 
                        checked={heatmapEnabled} 
                        onChange={() => setHeatmapEnabled(!heatmapEnabled)} 
                    />
                    <span className="slider"></span>
                </label>
                <span className="toggle-label">{heatmapEnabled ? "Heatmap 🔥" : "Heatmap ❄️"}</span>
            </div>
        </div>
    );
};

export default MapComponent;