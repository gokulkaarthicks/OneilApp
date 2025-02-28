import React, { useState } from "react";
import MapComponent from "./components/MapComponent";
import ChartComponent from "./components/ChartComponent";
import PieChartComponent from "./components/PieChartComponent";
import LineChartComponent from "./components/LineChartComponent";
import Sidebar from "./components/Sidebar";
import "./App.css";

// Dummy data with more details
const coalMinesData = [
    { name: "Mine A", lat: 37.7749, lng: -122.4194, state: "California", mineral: "Coal", company: "MiningCorp", project: "Exploration", type: "Active" },
    { name: "Mine B", lat: 34.0522, lng: -118.2437, state: "California", mineral: "Gold", company: "GoldDiggers Ltd.", project: "Extraction", type: "Abandoned" },
    { name: "Mine C", lat: 40.7128, lng: -74.0060, state: "New York", mineral: "Iron", company: "Steel Industries", project: "Processing", type: "Reclaimed" },
    { name: "Mine D", lat: 41.8781, lng: -87.6298, state: "Illinois", mineral: "Copper", company: "MetalX Corp", project: "Exploration", type: "Active" },
    { name: "Mine E", lat: 39.7392, lng: -104.9903, state: "Colorado", mineral: "Coal", company: "MiningCorp", project: "Refining", type: "Abandoned" },
    { name: "Mine F", lat: 35.6895, lng: -105.9378, state: "New Mexico", mineral: "Silver", company: "SilverStream", project: "Extraction", type: "Active" },
    { name: "Mine G", lat: 32.7767, lng: -96.7970, state: "Texas", mineral: "Uranium", company: "Nuclear Resources", project: "Processing", type: "Reclaimed" }
];

// Unique filter options
const states = ["All", ...new Set(coalMinesData.map(mine => mine.state))];
const minerals = ["All", ...new Set(coalMinesData.map(mine => mine.mineral))];
const companies = ["All", ...new Set(coalMinesData.map(mine => mine.company))];
const projects = ["All", ...new Set(coalMinesData.map(mine => mine.project))];

function App() {
    const [filters, setFilters] = useState({
        state: "All",
        mineral: "All",
        company: "All",
        project: "All"
    });

    const filteredMines = coalMinesData.filter(mine => 
        (filters.state === "All" || mine.state === filters.state) &&
        (filters.mineral === "All" || mine.mineral === filters.mineral) &&
        (filters.company === "All" || mine.company === filters.company) &&
        (filters.project === "All" || mine.project === filters.project)
    );

    const mineStats = {
        "Active": filteredMines.filter(m => m.type === "Active").length,
        "Abandoned": filteredMines.filter(m => m.type === "Abandoned").length,
        "Reclaimed": filteredMines.filter(m => m.type === "Reclaimed").length
    };

    return (
        <div className="app-container">
            <Sidebar states={states} minerals={minerals} companies={companies} projects={projects} filters={filters} setFilters={setFilters} />
            <div className="map-visualization-container">
                <MapComponent coalMines={filteredMines} />
                <div className="visualizations">
                    <ChartComponent data={mineStats} />
                    <PieChartComponent data={mineStats} />
                    <LineChartComponent data={mineStats} />
                </div>
            </div>
        </div>
    );
}

export default App;